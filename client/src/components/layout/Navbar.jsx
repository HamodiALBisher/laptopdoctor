import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiGlobe, FiMonitor } from 'react-icons/fi';
import { useAuth } from '../../contexts/AuthContext';

const languages = [
  { code: 'en', label: 'English', dir: 'ltr' },
  { code: 'he', label: 'עברית', dir: 'rtl' },
  { code: 'ar', label: 'العربية', dir: 'rtl' }
];

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const changeLanguage = (code) => {
    i18n.changeLanguage(code);
    localStorage.setItem('language', code);
    const lang = languages.find(l => l.code === code);
    document.documentElement.dir = lang?.dir || 'ltr';
    document.documentElement.lang = code;
    setLangOpen(false);
  };

  const navLinks = [
    { to: '/', label: t('nav.home') },
    { to: '/services', label: t('nav.services') },
    { to: '/booking', label: t('nav.bookRepair') },
    { to: '/track', label: t('nav.trackRepair') },
    { to: '/about', label: t('nav.about') },
    { to: '/faq', label: t('nav.faq') },
    { to: '/contact', label: t('nav.contact') },
    { to: '/blog', label: t('nav.blog') }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-navy-900/95 backdrop-blur-md border-b border-navy-700/50 shadow-lg shadow-black/20" role="navigation" aria-label="Main navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold text-white hover:text-gold transition-colors" aria-label="LaptopDoctor Home">
            <FiMonitor className="text-gold text-2xl" />
            <span>Laptop<span className="text-gold">Doctor</span></span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-0.5">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive(link.to)
                    ? 'text-gold bg-gold/10'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
              </Link>
            ))}

            <Link
              to={isAuthenticated ? '/admin/dashboard' : '/admin'}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                location.pathname.startsWith('/admin')
                  ? 'text-gold bg-gold/10'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              {isAuthenticated ? t('admin.dashboard') : t('nav.adminLogin')}
            </Link>

            <div className="w-px h-6 bg-navy-700 mx-2" />

            {/* Language switcher */}
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                aria-label="Change language"
                aria-expanded={langOpen}
              >
                <FiGlobe className="text-base" />
                <span className="uppercase text-xs font-semibold">{i18n.language}</span>
              </button>
              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-36 bg-navy-800 border border-navy-600 rounded-xl shadow-xl overflow-hidden"
                  >
                    {languages.map(lang => (
                      <button
                        key={lang.code}
                        onClick={() => changeLanguage(lang.code)}
                        className={`w-full px-4 py-2.5 text-left text-sm hover:bg-navy-700 transition-colors ${
                          i18n.language === lang.code ? 'text-gold bg-gold/5' : 'text-gray-300'
                        }`}
                      >
                        {lang.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 text-gray-300 hover:text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-navy-800 border-t border-navy-700 overflow-hidden"
          >
            <div className="px-4 py-3 space-y-1">
              {navLinks.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className={`block px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    isActive(link.to) ? 'text-gold bg-gold/10' : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to={isAuthenticated ? '/admin/dashboard' : '/admin'}
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 rounded-xl text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5"
              >
                {isAuthenticated ? t('admin.dashboard') : t('nav.adminLogin')}
              </Link>
              <div className="border-t border-navy-700 pt-3 mt-2">
                <div className="flex gap-2 px-4 py-2">
                  {languages.map(lang => (
                    <button
                      key={lang.code}
                      onClick={() => { changeLanguage(lang.code); setMobileOpen(false); }}
                      className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors ${
                        i18n.language === lang.code ? 'bg-gold text-navy-900' : 'bg-navy-700 text-gray-300 hover:bg-navy-600'
                      }`}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
