import { useState, useMemo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { FiCheckCircle, FiUpload, FiSend, FiSearch, FiX,
  FiCpu, FiMonitor, FiShield, FiDatabase, FiZap,
  FiSave, FiSmartphone, FiTool, FiBattery, FiWind, FiHelpCircle
} from 'react-icons/fi';
import { useCustomerAuth } from '../contexts/CustomerAuthContext';
import axios from 'axios';

const deviceTypes = ['Laptop', 'Desktop', 'Gaming PC', 'External HDD', 'SSD', 'Other'];
const urgencyLevels = ['Normal', 'Urgent', 'Emergency'];
const contactMethods = ['Phone', 'WhatsApp', 'Email'];

export default function Booking() {
  const { t } = useTranslation();
  const { customer, isLoggedIn } = useCustomerAuth();
  const [form, setForm] = useState({
    fullName: '', phone: '', email: '', city: '',
    deviceType: '', brandModel: '', problemCategory: '',
    problemDescription: '', urgency: 'Normal',
    preferredContact: 'Phone', privacyAgreed: false
  });

  useEffect(() => {
    if (isLoggedIn && customer) {
      setForm(prev => ({
        ...prev,
        fullName: customer.fullName || prev.fullName,
        email: customer.email || prev.email,
        phone: customer.phone || prev.phone
      }));
    }
  }, [isLoggedIn, customer]);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState('');

  const categories = [
    { key: 'hardware', icon: FiCpu },
    { key: 'software', icon: FiMonitor },
    { key: 'virus', icon: FiShield },
    { key: 'data', icon: FiDatabase },
    { key: 'upgrade', icon: FiZap },
    { key: 'backup', icon: FiSave },
    { key: 'screen', icon: FiSmartphone },
    { key: 'keyboard', icon: FiTool },
    { key: 'battery', icon: FiBattery },
    { key: 'overheating', icon: FiWind },
    { key: 'other', icon: FiHelpCircle }
  ];
  const [categorySearch, setCategorySearch] = useState('');

  const filteredCategories = useMemo(() => {
    if (!categorySearch) return categories;
    const q = categorySearch.toLowerCase();
    return categories.filter(c =>
      t(`booking.categories.${c.key}`).toLowerCase().includes(q) || c.key.includes(q)
    );
  }, [categorySearch, t]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        formData.append(key, String(value));
      });
      if (image) formData.append('image', image);

      const res = await axios.post('/api/bookings', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setSuccess(res.data);
    } catch (err) {
      const msg = err.response?.data?.errors?.[0]?.msg || err.response?.data?.error || t('common.error');
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="pt-28 pb-24 bg-navy-900 min-h-screen flex items-center">
        <div className="max-w-lg mx-auto px-4 sm:px-6 w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center p-10 rounded-2xl bg-navy-800 border border-green-500/30 shadow-lg shadow-green-500/5"
          >
            <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-6">
              <FiCheckCircle className="text-green-400 text-4xl" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">{t('booking.successTitle')}</h2>
            <p className="text-gray-400 mb-8">{t('booking.successMessage')}</p>
            <div className="bg-navy-700 rounded-xl p-6 mb-8">
              <p className="text-sm text-gray-400 mb-2">{t('booking.requestId')}</p>
              <p className="text-3xl font-bold text-gold">{success.requestId}</p>
              <p className="text-xs text-gray-500 mt-3">{t('booking.saveId')}</p>
            </div>
            <button
              onClick={() => { setSuccess(null); setForm({ fullName: '', phone: '', email: '', city: '', deviceType: '', brandModel: '', problemCategory: '', problemDescription: '', urgency: 'Normal', preferredContact: 'Phone', privacyAgreed: false }); setImage(null); }}
              className="px-8 py-3 bg-gold text-navy-900 font-bold rounded-xl hover:bg-gold-light transition-all"
            >
              {t('booking.newBooking')}
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Book a Repair - LaptopDoctor</title>
        <meta name="description" content="Book a professional PC or laptop repair. Fast diagnostics and reliable service." />
      </Helmet>

      <section className="pt-28 pb-24 bg-navy-900 min-h-screen">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <span className="text-gold text-sm font-semibold tracking-wider uppercase">Get Started</span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-4">{t('booking.title')}</h1>
            <p className="text-gray-400 text-lg">{t('booking.subtitle')}</p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            onSubmit={handleSubmit}
            className="space-y-6 bg-navy-800 p-8 md:p-10 rounded-2xl border border-navy-700 shadow-xl"
          >
            {error && (
              <div className="p-4 rounded-xl bg-red-900/30 border border-red-500/30 text-red-400 text-sm">{error}</div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-300 mb-2">{t('booking.fullName')} *</label>
                <input id="fullName" name="fullName" required value={form.fullName} onChange={handleChange}
                  className="w-full px-4 py-3 bg-navy-700 border border-navy-600 rounded-xl text-white focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-colors placeholder-gray-500" placeholder="John Doe" />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">{t('booking.phone')} *</label>
                <input id="phone" name="phone" type="tel" required value={form.phone} onChange={handleChange}
                  className="w-full px-4 py-3 bg-navy-700 border border-navy-600 rounded-xl text-white focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-colors placeholder-gray-500" placeholder="+972-50-000-0000" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">{t('booking.email')} *</label>
                <input id="email" name="email" type="email" required value={form.email} onChange={handleChange}
                  className="w-full px-4 py-3 bg-navy-700 border border-navy-600 rounded-xl text-white focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-colors placeholder-gray-500" placeholder="john@example.com" />
              </div>
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-300 mb-2">{t('booking.city')} *</label>
                <input id="city" name="city" required value={form.city} onChange={handleChange}
                  className="w-full px-4 py-3 bg-navy-700 border border-navy-600 rounded-xl text-white focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-colors placeholder-gray-500" placeholder="Tel Aviv" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="deviceType" className="block text-sm font-medium text-gray-300 mb-2">{t('booking.deviceType')} *</label>
                <select id="deviceType" name="deviceType" required value={form.deviceType} onChange={handleChange}
                  className="w-full px-4 py-3 bg-navy-700 border border-navy-600 rounded-xl text-white focus:border-gold outline-none transition-colors">
                  <option value="">{t('booking.selectDevice')}</option>
                  {deviceTypes.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="brandModel" className="block text-sm font-medium text-gray-300 mb-2">{t('booking.brandModel')}</label>
                <input id="brandModel" name="brandModel" value={form.brandModel} onChange={handleChange}
                  className="w-full px-4 py-3 bg-navy-700 border border-navy-600 rounded-xl text-white focus:border-gold outline-none transition-colors placeholder-gray-500"
                  placeholder="e.g. Dell Inspiron 15" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">{t('booking.problemCategory')} *</label>
              <div className="relative mb-3">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm" />
                <input
                  type="text"
                  value={categorySearch}
                  onChange={e => setCategorySearch(e.target.value)}
                  placeholder="Search categories..."
                  className="w-full pl-9 pr-8 py-2.5 bg-navy-700 border border-navy-600 rounded-lg text-white text-sm placeholder-gray-500 focus:border-gold outline-none transition-colors"
                />
                {categorySearch && (
                  <button type="button" onClick={() => setCategorySearch('')} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors">
                    <FiX className="text-sm" />
                  </button>
                )}
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {filteredCategories.map(c => (
                  <button
                    key={c.key}
                    type="button"
                    onClick={() => setForm(prev => ({ ...prev, problemCategory: c.key }))}
                    className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border text-xs font-medium transition-all ${
                      form.problemCategory === c.key
                        ? 'bg-gold/10 border-gold/40 text-gold'
                        : 'bg-navy-700 border-navy-600 text-gray-400 hover:border-navy-500 hover:text-gray-300'
                    }`}
                  >
                    <c.icon className={`text-lg ${form.problemCategory === c.key ? 'text-gold' : ''}`} />
                    {t(`booking.categories.${c.key}`)}
                  </button>
                ))}
              </div>
              {filteredCategories.length === 0 && (
                <p className="text-center text-gray-500 text-sm py-3">No categories found</p>
              )}
              <input type="hidden" name="problemCategory" value={form.problemCategory} required />
            </div>

            <div>
              <label htmlFor="problemDescription" className="block text-sm font-medium text-gray-300 mb-2">{t('booking.problemDescription')} *</label>
              <textarea id="problemDescription" name="problemDescription" required rows={4} value={form.problemDescription} onChange={handleChange}
                className="w-full px-4 py-3 bg-navy-700 border border-navy-600 rounded-xl text-white focus:border-gold outline-none transition-colors resize-none placeholder-gray-500" placeholder="Describe the issue in detail..." />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="urgency" className="block text-sm font-medium text-gray-300 mb-2">{t('booking.urgency')} *</label>
                <select id="urgency" name="urgency" value={form.urgency} onChange={handleChange}
                  className="w-full px-4 py-3 bg-navy-700 border border-navy-600 rounded-xl text-white focus:border-gold outline-none transition-colors">
                  {urgencyLevels.map(u => <option key={u} value={u}>{t(`booking.${u.toLowerCase()}`)}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="preferredContact" className="block text-sm font-medium text-gray-300 mb-2">{t('booking.preferredContact')} *</label>
                <select id="preferredContact" name="preferredContact" value={form.preferredContact} onChange={handleChange}
                  className="w-full px-4 py-3 bg-navy-700 border border-navy-600 rounded-xl text-white focus:border-gold outline-none transition-colors">
                  {contactMethods.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">{t('booking.uploadImage')}</label>
              <label className="flex items-center justify-center gap-3 px-4 py-5 bg-navy-700 border-2 border-dashed border-navy-500 rounded-xl cursor-pointer hover:border-gold/50 transition-colors group">
                <FiUpload className="text-gray-400 text-xl group-hover:text-gold transition-colors" />
                <span className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors">{image ? image.name : 'Click to upload an image'}</span>
                <input type="file" accept="image/*" className="hidden" onChange={(e) => setImage(e.target.files[0])} />
              </label>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-xl bg-navy-700/50 border border-navy-600">
              <input
                id="privacyAgreed"
                name="privacyAgreed"
                type="checkbox"
                checked={form.privacyAgreed}
                onChange={handleChange}
                required
                className="mt-0.5 w-5 h-5 rounded border-navy-600 bg-navy-700 text-gold focus:ring-gold"
              />
              <label htmlFor="privacyAgreed" className="text-sm text-gray-400 leading-relaxed">{t('booking.privacyAgree')}</label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gold text-navy-900 font-bold rounded-xl hover:bg-gold-light transition-all disabled:opacity-50 disabled:cursor-not-allowed text-lg flex items-center justify-center gap-2 shadow-lg shadow-gold/20 hover:shadow-gold/40"
            >
              {loading ? t('booking.submitting') : <>{t('booking.submit')} <FiSend /></>}
            </button>
          </motion.form>
        </div>
      </section>
    </>
  );
}
