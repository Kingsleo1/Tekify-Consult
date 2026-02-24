import React from 'react';
import PageHero from '../components/PageHero';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen transition-colors duration-500">
      <PageHero 
        title="Privacy Policy"
        description="How we collect, use, and protect your personal information."
      />
      
      <div className="py-24 px-4">
        <div className="max-w-4xl mx-auto prose dark:prose-invert prose-slate lg:prose-xl">
          <section className="mb-12">
            <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white mb-6">1. Introduction</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Tekify Consult ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how your personal information is collected, used, and disclosed by Tekify Consult.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white mb-6">2. Information We Collect</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              We collect information that you provide directly to us when you:
            </p>
            <ul className="list-disc pl-6 text-slate-600 dark:text-slate-400 space-y-2">
              <li>Request a quote or book a service.</li>
              <li>Communicate with us via email, phone, or WhatsApp.</li>
              <li>Subscribe to our newsletter or updates.</li>
              <li>Interact with our TekiAlly AI assistant.</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white mb-6">3. How We Use Your Information</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 text-slate-600 dark:text-slate-400 space-y-2">
              <li>Provide, maintain, and improve our services.</li>
              <li>Process transactions and send related information, including confirmations and invoices.</li>
              <li>Send technical notices, updates, security alerts, and support messages.</li>
              <li>Respond to your comments, questions, and requests.</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white mb-6">4. Data Security</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              We implement a variety of security measures to maintain the safety of your personal information when you enter, submit, or access your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white mb-6">5. Your Rights</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Depending on your location, you may have the right to access, correct, or delete your personal data. Please contact us at privacy@tekify.com to exercise these rights.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white mb-6">6. Changes to This Policy</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
            </p>
          </section>

          <div className="mt-16 pt-8 border-t border-slate-200 dark:border-white/10 text-sm text-slate-500">
            Last updated: February 24, 2026
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
