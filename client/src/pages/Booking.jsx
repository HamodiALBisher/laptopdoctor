import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { FiCheckCircle, FiUpload } from 'react-icons/fi';
import axios from 'axios';

const deviceTypes = ['Laptop', 'Desktop', 'Gaming PC', 'External HDD', 'SSD', 'Other'];
const urgencyLevels = ['Normal', 'Urgent', 'Emergency'];
const contactMethods = ['Phone', 'WhatsApp', 'Email'];

export default function Booking() {
  const { t } = useTranslation();
  const [form, setForm] = useState({
    fullName: '', phone: '', email: '', city: '',
    deviceType: '', brandModel: '', problemCategory: '',
    problemDescription: '', urgency: 'Normal',
    preferredContact: 'Phone', privacyAgreed: false
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState('');

  const categories = [
    'hardware', 'software', 'virus', 'data', 'upgrade',
    'backup', 'screen', 'keyboard', 'battery', 'overheating', 'other'
  ];

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
      <div className="pt-24 pb-20 bg-navy-900 min-h-screen">
        <div className="max-w-lg mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center p-8 rounded-2xl bg-navy-800 border border-green-500/30"
          >
            <FiCheckCircle className="text-green-400 text-6xl mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">{t('booking.successTitle')}</h2>
            <p className="text-gray-400 mb-6">{t('booking.successMessage')}</p>
            <div className="bg-navy-700 rounded-xl p-4 mb-6">
              <p className="text-sm text-gray-400">{t('booking.requestId')}</p>
              <p className="text-2xl font-bold text-gold mt-1">{success.requestId}</p>
              <p className="text-xs text-gray-500 mt-2">{t('booking.saveId')}</p>
            </div>
            <button
              onClick={() => { setSuccess(null); setForm({ fullName: '', phone: '', email: '', city: '', deviceType: '', brandModel: '', problemCategory: '', problemDescription: '', urgency: 'Normal', preferredContact: 'Phone', privacyAgreed: false }); setImage(null); }}
              className="px-6 py-3 bg-gold text-navy-900 font-bold rounded-xl hover:bg-gold-light transition-all"
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

      <section className="pt-24 pb-20 bg-navy-900 min-h-screen">
        <div className="max-w-2xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <h1 className="text-4xl font-bold text-white mb-3">{t('booking.title')}</h1>
            <p className="text-gray-400">{t('booking.subtitle')}</p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            onSubmit={handleSubmit}
            className="space-y-5 bg-navy-800 p-6 md:p-8 rounded-2xl border border-navy-700"
          >
            {error && (
              <div className="p-3 rounded-lg bg-red-900/30 border border-red-500/30 text-red-400 text-sm">{error}</div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label htmlFor="fullName" className="block text-sm text-gray-300 mb-1">{t('booking.fullName')} *</label>
                <input id="fullName" name="fullName" required value={form.fullName} onChange={handleChange}
                  className="w-full px-4 py-3 bg-navy-700 border border-navy-600 rounded-xl text-white focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-colors" />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm text-gray-300 mb-1">{t('booking.phone')} *</label>
                <input id="phone" name="phone" type="tel" required value={form.phone} onChange={handleChange}
                  className="w-full px-4 py-3 bg-navy-700 border border-navy-600 rounded-xl text-white focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-colors" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label htmlFor="email" className="block text-sm text-gray-300 mb-1">{t('booking.email')} *</label>
                <input id="email" name="email" type="email" required value={form.email} onChange={handleChange}
                  className="w-full px-4 py-3 bg-navy-700 border border-navy-600 rounded-xl text-white focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-colors" />
              </div>
              <div>
                <label htmlFor="city" className="block text-sm text-gray-300 mb-1">{t('booking.city')} *</label>
                <input id="city" name="city" required value={form.city} onChange={handleChange}
                  className="w-full px-4 py-3 bg-navy-700 border border-navy-600 rounded-xl text-white focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-colors" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label htmlFor="deviceType" className="block text-sm text-gray-300 mb-1">{t('booking.deviceType')} *</label>
                <select id="deviceType" name="deviceType" required value={form.deviceType} onChange={handleChange}
                  className="w-full px-4 py-3 bg-navy-700 border border-navy-600 rounded-xl text-white focus:border-gold outline-none transition-colors">
                  <option value="">{t('booking.selectDevice')}</option>
                  {deviceTypes.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="brandModel" className="block text-sm text-gray-300 mb-1">{t('booking.brandModel')}</label>
                <input id="brandModel" name="brandModel" value={form.brandModel} onChange={handleChange}
                  className="w-full px-4 py-3 bg-navy-700 border border-navy-600 rounded-xl text-white focus:border-gold outline-none transition-colors"
                  placeholder="e.g. Dell Inspiron 15" />
              </div>
            </div>

            <div>
              <label htmlFor="problemCategory" className="block text-sm text-gray-300 mb-1">{t('booking.problemCategory')} *</label>
              <select id="problemCategory" name="problemCategory" required value={form.problemCategory} onChange={handleChange}
                className="w-full px-4 py-3 bg-navy-700 border border-navy-600 rounded-xl text-white focus:border-gold outline-none transition-colors">
                <option value="">{t('booking.selectCategory')}</option>
                {categories.map(c => <option key={c} value={c}>{t(`booking.categories.${c}`)}</option>)}
              </select>
            </div>

            <div>
              <label htmlFor="problemDescription" className="block text-sm text-gray-300 mb-1">{t('booking.problemDescription')} *</label>
              <textarea id="problemDescription" name="problemDescription" required rows={4} value={form.problemDescription} onChange={handleChange}
                className="w-full px-4 py-3 bg-navy-700 border border-navy-600 rounded-xl text-white focus:border-gold outline-none transition-colors resize-none" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label htmlFor="urgency" className="block text-sm text-gray-300 mb-1">{t('booking.urgency')} *</label>
                <select id="urgency" name="urgency" value={form.urgency} onChange={handleChange}
                  className="w-full px-4 py-3 bg-navy-700 border border-navy-600 rounded-xl text-white focus:border-gold outline-none transition-colors">
                  {urgencyLevels.map(u => <option key={u} value={u}>{t(`booking.${u.toLowerCase()}`)}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="preferredContact" className="block text-sm text-gray-300 mb-1">{t('booking.preferredContact')} *</label>
                <select id="preferredContact" name="preferredContact" value={form.preferredContact} onChange={handleChange}
                  className="w-full px-4 py-3 bg-navy-700 border border-navy-600 rounded-xl text-white focus:border-gold outline-none transition-colors">
                  {contactMethods.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-1">{t('booking.uploadImage')}</label>
              <label className="flex items-center gap-2 px-4 py-3 bg-navy-700 border border-navy-600 border-dashed rounded-xl cursor-pointer hover:border-gold transition-colors">
                <FiUpload className="text-gray-400" />
                <span className="text-gray-400 text-sm">{image ? image.name : 'Choose file...'}</span>
                <input type="file" accept="image/*" className="hidden" onChange={(e) => setImage(e.target.files[0])} />
              </label>
            </div>

            <div className="flex items-start gap-3">
              <input
                id="privacyAgreed"
                name="privacyAgreed"
                type="checkbox"
                checked={form.privacyAgreed}
                onChange={handleChange}
                required
                className="mt-1 w-4 h-4 rounded border-navy-600 bg-navy-700 text-gold focus:ring-gold"
              />
              <label htmlFor="privacyAgreed" className="text-sm text-gray-400">{t('booking.privacyAgree')}</label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gold text-navy-900 font-bold rounded-xl hover:bg-gold-light transition-all disabled:opacity-50 disabled:cursor-not-allowed text-lg"
            >
              {loading ? t('booking.submitting') : t('booking.submit')}
            </button>
          </motion.form>
        </div>
      </section>
    </>
  );
}
