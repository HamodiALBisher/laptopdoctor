import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { FiMail, FiLock, FiLogIn } from 'react-icons/fi';
import { useCustomerAuth } from '../contexts/CustomerAuthContext';
import axios from 'axios';

export default function Login() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { login } = useCustomerAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await axios.post('/api/customers/login', form);
      login(res.data.token, res.data.customer);
      navigate('/my-repairs');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Login - LaptopDoctor</title>
      </Helmet>

      <section className="pt-28 pb-24 bg-navy-900 min-h-screen flex items-center">
        <div className="max-w-md mx-auto px-4 sm:px-6 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">Welcome Back</h1>
            <p className="text-gray-400">Sign in to track your repairs and manage bookings</p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            onSubmit={handleSubmit}
            className="space-y-5 bg-navy-800 p-8 rounded-2xl border border-navy-700 shadow-xl"
          >
            {error && (
              <div className="p-4 rounded-xl bg-red-900/30 border border-red-500/30 text-red-400 text-sm">{error}</div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  id="email" name="email" type="email" required
                  value={form.email} onChange={handleChange}
                  className="w-full pl-11 pr-4 py-3 bg-navy-700 border border-navy-600 rounded-xl text-white focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-colors placeholder-gray-500"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">Password</label>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  id="password" name="password" type="password" required
                  value={form.password} onChange={handleChange}
                  className="w-full pl-11 pr-4 py-3 bg-navy-700 border border-navy-600 rounded-xl text-white focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-colors placeholder-gray-500"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit" disabled={loading}
              className="w-full py-3.5 bg-gold text-navy-900 font-bold rounded-xl hover:bg-gold-light transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-gold/20"
            >
              {loading ? 'Signing in...' : <><FiLogIn /> Sign In</>}
            </button>

            <p className="text-center text-gray-400 text-sm">
              Don't have an account?{' '}
              <Link to="/register" className="text-gold hover:text-gold-light font-semibold transition-colors">
                Create one
              </Link>
            </p>
          </motion.form>
        </div>
      </section>
    </>
  );
}
