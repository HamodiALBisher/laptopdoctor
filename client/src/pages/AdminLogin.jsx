import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { FiLock } from 'react-icons/fi';
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
      <section className="pt-24 pb-20 bg-navy-900 min-h-screen flex items-center">
        <div className="max-w-md mx-auto px-4 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-navy-800 p-8 rounded-2xl border border-navy-700"
          >
            <div className="text-center mb-8">
              <FiLock className="text-gold text-4xl mx-auto mb-3" />
              <h1 className="text-2xl font-bold text-white">{t('admin.login')}</h1>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-lg bg-red-900/30 border border-red-500/30 text-red-400 text-sm">{error}</div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="admin-email" className="block text-sm text-gray-300 mb-1">{t('admin.email')}</label>
                <input id="admin-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-navy-700 border border-navy-600 rounded-xl text-white focus:border-gold outline-none" />
              </div>
              <div>
                <label htmlFor="admin-password" className="block text-sm text-gray-300 mb-1">{t('admin.password')}</label>
                <input id="admin-password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-navy-700 border border-navy-600 rounded-xl text-white focus:border-gold outline-none" />
              </div>
              <button type="submit" disabled={loading}
                className="w-full py-3 bg-gold text-navy-900 font-bold rounded-xl hover:bg-gold-light transition-all disabled:opacity-50">
                {loading ? t('admin.loggingIn') : t('admin.loginButton')}
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </>
  );
}
