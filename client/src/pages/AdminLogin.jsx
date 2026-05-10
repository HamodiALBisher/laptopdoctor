import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { FiLock, FiMail, FiKey } from 'react-icons/fi';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

export default function AdminLogin() {
  const { t } = useTranslation();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await axios.post('/api/auth/login', { email, password });
      login(res.data.token, res.data.admin);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || t('common.error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet><title>Admin Login - LaptopDoctor</title></Helmet>
      <section className="pt-24 pb-20 bg-navy-900 min-h-screen flex items-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(212,168,67,0.05)_0%,_transparent_60%)]" />
        <div className="max-w-md mx-auto px-4 sm:px-6 w-full relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-navy-800 p-10 rounded-2xl border border-navy-700 shadow-2xl"
          >
            <div className="text-center mb-10">
              <div className="w-16 h-16 rounded-2xl bg-gold/10 flex items-center justify-center mx-auto mb-5">
                <FiLock className="text-gold text-3xl" />
              </div>
              <h1 className="text-2xl font-bold text-white">{t('admin.login')}</h1>
              <p className="text-gray-500 text-sm mt-2">Enter your admin credentials</p>
            </div>

            {error && (
              <div className="mb-6 p-4 rounded-xl bg-red-900/30 border border-red-500/30 text-red-400 text-sm">{error}</div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="admin-email" className="block text-sm font-medium text-gray-300 mb-2">{t('admin.email')}</label>
                <div className="relative">
                  <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input id="admin-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-11 pr-4 py-3.5 bg-navy-700 border border-navy-600 rounded-xl text-white focus:border-gold focus:ring-1 focus:ring-gold outline-none placeholder-gray-500" placeholder="admin@laptopdoctor.com" />
                </div>
              </div>
              <div>
                <label htmlFor="admin-password" className="block text-sm font-medium text-gray-300 mb-2">{t('admin.password')}</label>
                <div className="relative">
                  <FiKey className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input id="admin-password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-11 pr-4 py-3.5 bg-navy-700 border border-navy-600 rounded-xl text-white focus:border-gold focus:ring-1 focus:ring-gold outline-none placeholder-gray-500" placeholder="Enter password" />
                </div>
              </div>
              <button type="submit" disabled={loading}
                className="w-full py-4 bg-gold text-navy-900 font-bold rounded-xl hover:bg-gold-light transition-all disabled:opacity-50 text-lg shadow-lg shadow-gold/20 mt-2">
                {loading ? t('admin.loggingIn') : t('admin.loginButton')}
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </>
  );
}
