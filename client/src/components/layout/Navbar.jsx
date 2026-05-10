import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiGlobe, FiMonitor, FiUser, FiLogOut } from 'react-icons/fi';
import { useCustomerAuth } from '../../contexts/CustomerAuthContext';

const languages = [
  { code: 'en', label: 'English', dir: 'ltr' },
  { code: 'he', label: 'עברית', dir: 'rtl' },
  { code: 'ar', label: 'العربية', dir: 'rtl' }
];

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const { isLoggedIn, customer, logout } = useCustomerAuth();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

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

            <div className="w-px h-6 bg-navy-700 mx-2" />

            {/* Auth buttons */}
            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                >
                  <div className="w-7 h-7 rounded-full bg-gold/20 flex items-center justify-center">
                    <FiUser className="text-gold text-sm" />
                  </div>
                  <span className="max-w-[100px] truncate">{customer?.fullName?.split(' ')[0]}</span>
                </button>
                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-48 bg-navy-800 border border-navy-600 rounded-xl shadow-xl overflow-hidden"
                    >
                      <div className="px-4 py-3 border-b border-navy-700">
                        <p className="text-white text-sm font-medium truncate">{customer?.fullName}</p>
                        <p className="text-gray-500 text-xs truncate">{customer?.email}</p>
                      </div>
                      <Link
                        to="/my-repairs"
                        onClick={() => setUserMenuOpen(false)}
                        className="block px-4 py-2.5 text-sm text-gray-300 hover:bg-navy-700 hover:text-white transition-colors"
                      >
                        My Repairs
                      </Link>
                      <button
                        onClick={() => { logout(); setUserMenuOpen(false); }}
                        className="w-full text-left px-4 py-2.5 text-sm text-gray-300 hover:bg-navy-700 hover:text-white transition-colors flex items-center gap-2"
                      >
                        <FiLogOut className="text-xs" /> Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive('/login') ? 'text-gold bg-gold/10' : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 rounded-lg text-sm font-semibold bg-gold text-navy-900 hover:bg-gold-light transition-colors"
                >
                  Register
                </Link>
              </div>
            )}

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

              {/* Mobile auth */}
              <div className="border-t border-navy-700 pt-3 mt-2">
                {isLoggedIn ? (
                  <>
                    <div className="px-4 py-2 flex items-center gap-2 text-gray-400 text-sm">
                      <FiUser className="text-gold" /> {customer?.fullName}
                    </div>
                    <Link
                      to="/my-repairs"
                      onClick={() => setMobileOpen(false)}
                      className="block px-4 py-3 rounded-xl text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5"
                    >
                      My Repairs
                    </Link>
                    <button
                      onClick={() => { logout(); setMobileOpen(false); }}
                      className="w-full text-left px-4 py-3 rounded-xl text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 flex items-center gap-2"
                    >
                      <FiLogOut /> Logout
                    </button>
                  </>
                ) : (
                  <div className="flex gap-2 px-4 py-2">
                    <Link
                      to="/login"
                      onClick={() => setMobileOpen(false)}
                      className="flex-1 py-2.5 text-center rounded-lg text-sm font-medium bg-navy-700 text-gray-300 hover:bg-navy-600 transition-colors"
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setMobileOpen(false)}
                      className="flex-1 py-2.5 text-center rounded-lg text-sm font-semibold bg-gold text-navy-900 hover:bg-gold-light transition-colors"
                    >
                      Register
                    </Link>
                  </div>
                )}
              </div>

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
