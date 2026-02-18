import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Services from './pages/Services';
import Booking from './pages/Booking';
import Contact from './pages/Contact';
import About from './pages/About';
import Portfolio from './pages/Portfolio';
import Blog from './pages/Blog';
import AITools from './pages/AITools';
import ServiceDetail from './pages/ServiceDetail';
import WhyTekifyDetail from './pages/WhyTekifyDetail';
import ProcessDetail from './pages/ProcessDetail';
import TekiAlly from './components/TekiAlly';
import WhatsAppButton from './components/WhatsAppButton';

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
          <Route path="/about" element={<About />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Layout>
      <TekiAlly />
      <WhatsAppButton />
    </Router>
  );
};

export default App;