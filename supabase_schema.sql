-- SUPABASE SQL FOR TEKIFY CONSULT SYSTEM

-- 1. Services Table
CREATE TABLE IF NOT EXISTS tekify_services (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    price DECIMAL(12, 2) NOT NULL,
    category TEXT NOT NULL,
    bookable BOOLEAN DEFAULT TRUE,
    pricing_type TEXT CHECK (pricing_type IN ('fixed', 'custom')),
    delivery_time TEXT,
    features TEXT[], -- Array of features
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Migration: Change id from UUID to TEXT if it was created as UUID previously
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'tekify_services' AND column_name = 'id' AND data_type = 'uuid') THEN
        -- Drop foreign keys first
        ALTER TABLE tekify_bookings DROP CONSTRAINT IF EXISTS tekify_bookings_service_id_fkey;
        
        -- Alter columns
        ALTER TABLE tekify_services ALTER COLUMN id TYPE TEXT USING id::text;
        
        -- Also alter referencing tables if they exist
        IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'tekify_bookings' AND column_name = 'service_id' AND data_type = 'uuid') THEN
            ALTER TABLE tekify_bookings ALTER COLUMN service_id TYPE TEXT USING service_id::text;
        END IF;
        
        IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'tekify_invoice_items' AND column_name = 'service_id' AND data_type = 'uuid') THEN
            ALTER TABLE tekify_invoice_items ALTER COLUMN service_id TYPE TEXT USING service_id::text;
        END IF;
        
        -- Re-add foreign key if the table exists
        IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'tekify_bookings') THEN
            ALTER TABLE tekify_bookings ADD CONSTRAINT tekify_bookings_service_id_fkey FOREIGN KEY (service_id) REFERENCES tekify_services(id);
        END IF;
    END IF;
END $$;

-- Add missing columns to tekify_services if they don't exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'tekify_services' AND column_name = 'bookable') THEN
        ALTER TABLE tekify_services ADD COLUMN bookable BOOLEAN DEFAULT TRUE;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'tekify_services' AND column_name = 'pricing_type') THEN
        ALTER TABLE tekify_services ADD COLUMN pricing_type TEXT CHECK (pricing_type IN ('fixed', 'custom'));
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'tekify_services' AND column_name = 'delivery_time') THEN
        ALTER TABLE tekify_services ADD COLUMN delivery_time TEXT;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'tekify_services' AND column_name = 'features') THEN
        ALTER TABLE tekify_services ADD COLUMN features TEXT[];
    END IF;
END $$;

-- 2. Customers Table
CREATE TABLE IF NOT EXISTS tekify_customers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    company_name TEXT,
    address TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add address column if it doesn't exist (for existing tables)
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'tekify_customers' AND column_name = 'address') THEN
        ALTER TABLE tekify_customers ADD COLUMN address TEXT;
    END IF;
END $$;

-- 3. Bookings Table
CREATE TABLE IF NOT EXISTS tekify_bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_id UUID REFERENCES tekify_customers(id),
    service_id TEXT REFERENCES tekify_services(id),
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'cancelled', 'invoiced')),
    booking_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Invoices Table
CREATE TABLE IF NOT EXISTS tekify_invoices (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    invoice_number TEXT UNIQUE NOT NULL,
    customer_id UUID REFERENCES tekify_customers(id),
    booking_id UUID REFERENCES tekify_bookings(id),
    status TEXT DEFAULT 'unpaid' CHECK (status IN ('unpaid', 'paid', 'overdue', 'cancelled')),
    total_amount DECIMAL(12, 2) NOT NULL,
    tax_amount DECIMAL(12, 2) DEFAULT 0,
    due_date DATE,
    issued_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    paid_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add tax_amount and paid_at columns if they don't exist (for existing tables)
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'tekify_invoices' AND column_name = 'tax_amount') THEN
        ALTER TABLE tekify_invoices ADD COLUMN tax_amount DECIMAL(12, 2) DEFAULT 0;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'tekify_invoices' AND column_name = 'paid_at') THEN
        ALTER TABLE tekify_invoices ADD COLUMN paid_at TIMESTAMP WITH TIME ZONE;
    END IF;
END $$;

-- 5. Invoice Items (Price Lock Rule)
CREATE TABLE IF NOT EXISTS tekify_invoice_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    invoice_id UUID REFERENCES tekify_invoices(id) ON DELETE CASCADE,
    service_id TEXT, -- Not a hard FK to allow service deletion without breaking history
    service_name TEXT NOT NULL, -- Snapshotted
    unit_price DECIMAL(12, 2) NOT NULL, -- Snapshotted (Price Lock)
    quantity INTEGER DEFAULT 1,
    total DECIMAL(12, 2) NOT NULL
);

-- 6. Receipts Table
CREATE TABLE IF NOT EXISTS tekify_receipts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    receipt_number TEXT UNIQUE NOT NULL,
    invoice_id UUID REFERENCES tekify_invoices(id),
    payment_method TEXT,
    amount_paid DECIMAL(12, 2) NOT NULL,
    issued_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. Email Logs
CREATE TABLE IF NOT EXISTS tekify_email_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    recipient_email TEXT NOT NULL,
    subject TEXT NOT NULL,
    email_type TEXT CHECK (email_type IN ('invoice', 'receipt', 'booking_confirmation', 'general')),
    status TEXT DEFAULT 'sent' CHECK (status IN ('sent', 'failed', 'delivered')),
    error_message TEXT,
    sent_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE tekify_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE tekify_customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE tekify_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE tekify_invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE tekify_invoice_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE tekify_receipts ENABLE ROW LEVEL SECURITY;
ALTER TABLE tekify_email_logs ENABLE ROW LEVEL SECURITY;

-- Public read for services
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow public read for services') THEN
        CREATE POLICY "Allow public read for services" ON tekify_services FOR SELECT USING (true);
    END IF;
END $$;

-- Admin policies (assuming role 'service_role' or specific admin logic)
-- For this demo, we'll allow all operations if authenticated
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow all for authenticated' AND tablename = 'tekify_services') THEN
        CREATE POLICY "Allow all for authenticated" ON tekify_services FOR ALL USING (auth.role() = 'authenticated');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow all for authenticated customers') THEN
        CREATE POLICY "Allow all for authenticated customers" ON tekify_customers FOR ALL USING (auth.role() = 'authenticated');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow all for authenticated bookings') THEN
        CREATE POLICY "Allow all for authenticated bookings" ON tekify_bookings FOR ALL USING (auth.role() = 'authenticated');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow all for authenticated invoices') THEN
        CREATE POLICY "Allow all for authenticated invoices" ON tekify_invoices FOR ALL USING (auth.role() = 'authenticated');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow all for authenticated invoice_items') THEN
        CREATE POLICY "Allow all for authenticated invoice_items" ON tekify_invoice_items FOR ALL USING (auth.role() = 'authenticated');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow all for authenticated receipts') THEN
        CREATE POLICY "Allow all for authenticated receipts" ON tekify_receipts FOR ALL USING (auth.role() = 'authenticated');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow all for authenticated email_logs') THEN
        CREATE POLICY "Allow all for authenticated email_logs" ON tekify_email_logs FOR ALL USING (auth.role() = 'authenticated');
    END IF;
END $$;

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_bookings_customer ON tekify_bookings(customer_id);
CREATE INDEX IF NOT EXISTS idx_invoices_customer ON tekify_invoices(customer_id);
CREATE INDEX IF NOT EXISTS idx_invoices_status ON tekify_invoices(status);
CREATE INDEX IF NOT EXISTS idx_invoice_items_invoice ON tekify_invoice_items(invoice_id);

-- Initial Data Seed (Preload)
INSERT INTO tekify_services (id, name, price, category, bookable, pricing_type, features) VALUES
('dm-foundation', 'Foundation Visibility Plan', 150000, 'Digital Marketing', true, 'fixed', ARRAY['Instagram & Facebook management', '12 posts monthly (3 weekly)', 'Static & carousel designs', 'Caption writing + hashtags', 'Basic brand positioning', 'Community management (work hours)', 'Monthly performance report']),
('dm-growth', 'Brand Growth Plan', 220000, 'Digital Marketing', true, 'fixed', ARRAY['Instagram, Facebook & LinkedIn', '16 posts monthly (4 weekly)', 'Static + carousel + light motion graphics', 'Strategic content pillars', 'Advanced storytelling captions', 'Community management', 'Monthly analytics report']),
('dm-leadgen', 'Lead Generation Plan', 280000, 'Digital Marketing', true, 'fixed', ARRAY['Instagram, Facebook & LinkedIn', '20 posts monthly (5 weekly)', 'Short-form video (Reels)', 'Content calendar', 'Lead-focused strategy', 'Meta Ads management (ad spend excluded)', 'WhatsApp & DM conversion support', 'Monthly lead report']),
('dm-dominance', 'Market Dominance Plan', 350000, 'Digital Marketing', true, 'fixed', ARRAY['Full social media management', '24 premium posts monthly', 'High-quality Reels', 'Authority positioning', 'Paid ads optimization', 'Lead funnel setup', 'Priority community management', 'Detailed ROI report']),
('web-starter', 'Starter Website', 250000, 'Web Development', true, 'fixed', ARRAY['Up to 5 pages', 'Mobile responsive', 'Basic SEO setup', 'Contact form', '2 revision rounds']),
('web-business', 'Business Website', 450000, 'Web Development', true, 'fixed', ARRAY['Up to 10 pages', 'CMS integration', 'Blog setup', 'Speed optimization', 'Advanced SEO basics', '3 revisions']),
('web-pro-app', 'Professional Web App', 700000, 'Web/App Development', true, 'fixed', ARRAY['Custom dashboard', 'User authentication', 'Database integration', 'API integrations', 'Admin panel', 'Advanced UI/UX']),
('web-enterprise', 'Enterprise Solution', 1000000, 'Enterprise Development', true, 'custom', ARRAY['Full custom architecture', 'Advanced security', 'Scalable backend', 'Payment integrations', 'Multi-role system', 'Priority support', 'Custom timeline']),
('design-monthly', 'Graphic Design Monthly', 80000, 'Design', true, 'fixed', ARRAY['10–15 designs monthly', 'Social media creatives', 'Marketing flyers', 'Basic revisions']),
('logo-package', 'Logo Design Package', 50000, 'Branding', true, 'fixed', ARRAY['3 logo concepts', 'Unlimited revisions', 'PNG + SVG + PDF', 'Brand color guide']),
('seo-opt', 'SEO Optimization', 120000, 'Digital Marketing', true, 'fixed', ARRAY['On-page SEO', 'Technical audit', 'Keyword research', 'Basic backlink setup']),
('ads-mgmt', 'Paid Ads Management', 100000, 'Advertising', true, 'fixed', ARRAY['Meta ads setup', 'Campaign monitoring', 'Weekly optimization', 'Performance report'])
ON CONFLICT (id) DO UPDATE SET
name = EXCLUDED.name,
price = EXCLUDED.price,
category = EXCLUDED.category,
features = EXCLUDED.features;
