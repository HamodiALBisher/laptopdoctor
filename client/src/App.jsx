import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from './contexts/AuthContext';
import { CustomerAuthProvider } from './contexts/CustomerAuthContext';
import { AccessibilityProvider } from './contexts/AccessibilityContext';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import AccessibilityWidget from './components/layout/AccessibilityWidget';
import ChatBot from './components/layout/ChatBot';

import Home from './pages/Home';
import Services from './pages/Services';
import Booking from './pages/Booking';
import TrackRepair from './pages/TrackRepair';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import Contact from './pages/Contact';
import About from './pages/About';
import FAQ from './pages/FAQ';
import Blog from './pages/Blog';
import Accessibility from './pages/Accessibility';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Register from './pages/Register';
import MyRepairs from './pages/MyRepairs';

import './i18n';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function LanguageDirection() {
  const { i18n } = useTranslation();
  useEffect(() => {
    const rtl = ['he', 'ar'].includes(i18n.language);
    document.documentElement.dir = rtl ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);
  return null;
}

export default function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <CustomerAuthProvider>
          <AccessibilityProvider>
            <Router>
              <ScrollToTop />
              <LanguageDirection />
              <a href="#main-content" className="skip-to-content">Skip to content</a>
              <Navbar />
              <main id="main-content" role="main">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/booking" element={<Booking />} />
                  <Route path="/track" element={<TrackRepair />} />
                  <Route path="/admin" element={<AdminLogin />} />
                  <Route path="/admin/dashboard" element={<AdminDashboard />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/faq" element={<FAQ />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/accessibility" element={<Accessibility />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/my-repairs" element={<MyRepairs />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
              <AccessibilityWidget />
              <ChatBot />
            </Router>
          </AccessibilityProvider>
        </CustomerAuthProvider>
      </AuthProvider>
    </HelmetProvider>
  );
}
