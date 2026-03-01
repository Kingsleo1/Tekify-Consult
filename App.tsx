import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Services from './pages/Services';
import Booking from './pages/Booking';
import Contact from './pages/Contact';
import Team from './pages/Team';
import About from './pages/About';
import Portfolio from './pages/Portfolio';
import Blog from './pages/Blog';
import BlogPostDetail from './pages/BlogPostDetail';
import AITools from './pages/AITools';
import ServiceDetail from './pages/ServiceDetail';
import WhyTekifyDetail from './pages/WhyTekifyDetail';
import ProcessDetail from './pages/ProcessDetail';
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminBookings from './pages/admin/AdminBookings';
import AdminInvoices from './pages/admin/AdminInvoices';
import AdminReceipts from './pages/admin/AdminReceipts';
import AdminEmailLogs from './pages/admin/AdminEmailLogs';
import AdminServices from './pages/admin/AdminServices';
import AdminLogin from './pages/admin/AdminLogin';
import AdminCustomers from './pages/admin/AdminCustomers';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import { Toaster } from 'sonner';
import ChatWidget from './components/ChatWidget';

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:id" element={<ServiceDetail />} />
          <Route path="/why-tekify/:id" element={<WhyTekifyDetail />} />
          <Route path="/process/:id" element={<ProcessDetail />} />
          <Route path="/ai-tools" element={<AITools />} />
          <Route path="/team" element={<Team />} />
          <Route path="/about" element={<About />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogPostDetail />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="customers" element={<AdminCustomers />} />
            <Route path="bookings" element={<AdminBookings />} />
            <Route path="invoices" element={<AdminInvoices />} />
            <Route path="receipts" element={<AdminReceipts />} />
            <Route path="services" element={<AdminServices />} />
            <Route path="emails" element={<AdminEmailLogs />} />
          </Route>
        </Routes>
      </Layout>
      <ChatWidget />
      <Toaster position="top-right" richColors />
    </Router>
  );
};

export default App;