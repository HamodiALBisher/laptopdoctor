import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { FiSearch } from 'react-icons/fi';
import axios from 'axios';

const statusSteps = ['Pending', 'Diagnosing', 'Waiting for Approval', 'In Repair', 'Ready for Pickup', 'Completed'];

function StatusTracker({ currentStatus }) {
  const { t } = useTranslation();
  const currentIndex = statusSteps.indexOf(currentStatus);

  return (
    <div className="flex flex-col gap-3 mt-4">
      {statusSteps.map((step, i) => {
        const isDone = i <= currentIndex;
        const isCurrent = i === currentIndex;
        return (
          <div key={step} className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${
              isCurrent ? 'bg-gold text-navy-900' : isDone ? 'bg-green-500 text-white' : 'bg-navy-600 text-gray-400'
            }`}>
              {isDone && !isCurrent ? '✓' : i + 1}
            </div>
            <div className={`text-sm font-medium ${isCurrent ? 'text-gold' : isDone ? 'text-green-400' : 'text-gray-500'}`}>
              {t(`tracking.status.${step}`)}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function TrackRepair() {
  const { t } = useTranslation();
  const [searchType, setSearchType] = useState('requestId');
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    setError('');
    setResults(null);

    try {
      const params = searchType === 'requestId' ? { requestId: query } : { phone: query };
      const res = await axios.get('/api/bookings/track', { params });
      setResults(res.data.bookings);
    } catch (err) {
      setError(err.response?.data?.error || t('common.error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Track Repair - LaptopDoctor</title>
        <meta name="description" content="Track your repair status with your phone number or request ID." />
      </Helmet>

      <section className="pt-24 pb-20 bg-navy-900 min-h-screen">
        <div className="max-w-2xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
            <h1 className="text-4xl font-bold text-white mb-3">{t('tracking.title')}</h1>
            <p className="text-gray-400">{t('tracking.subtitle')}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-navy-800 p-6 md:p-8 rounded-2xl border border-navy-700"
          >
            <div className="flex gap-2 mb-6">
              <button
                onClick={() => setSearchType('requestId')}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                  searchType === 'requestId' ? 'bg-gold text-navy-900' : 'bg-navy-700 text-gray-300 hover:bg-navy-600'
                }`}
              >
                {t('tracking.requestId')}
              </button>
              <button
                onClick={() => setSearchType('phone')}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                  searchType === 'phone' ? 'bg-gold text-navy-900' : 'bg-navy-700 text-gray-300 hover:bg-navy-600'
                }`}
              >
                {t('tracking.phone')}
              </button>
            </div>

            <form onSubmit={handleSearch} className="flex gap-3">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={searchType === 'requestId' ? 'LD-XXXXXXX-XXXX' : '+972...'}
                className="flex-1 px-4 py-3 bg-navy-700 border border-navy-600 rounded-xl text-white focus:border-gold outline-none transition-colors"
                aria-label={searchType === 'requestId' ? t('tracking.requestId') : t('tracking.phone')}
              />
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-gold text-navy-900 font-bold rounded-xl hover:bg-gold-light transition-all disabled:opacity-50"
              >
                {loading ? '...' : <FiSearch size={20} />}
              </button>
            </form>

            {error && (
              <div className="mt-4 p-3 rounded-lg bg-red-900/30 border border-red-500/30 text-red-400 text-sm">{error}</div>
            )}

            {results && results.length === 0 && (
              <div className="mt-6 text-center text-gray-400 py-8">{t('tracking.noResults')}</div>
            )}

            {results && results.length > 0 && (
              <div className="mt-6 space-y-6">
                {results.map((booking) => (
                  <div key={booking.requestId} className="p-5 rounded-xl bg-navy-700/50 border border-navy-600">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-xs text-gray-400">{t('booking.requestId')}</p>
                        <p className="text-lg font-bold text-gold">{booking.requestId}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-400">{booking.deviceType}</p>
                        <p className="text-sm text-gray-300">{booking.brandModel}</p>
                      </div>
                    </div>
                    <StatusTracker currentStatus={booking.status} />
                    <p className="text-xs text-gray-500 mt-4">
                      Submitted: {new Date(booking.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </>
  );
}
