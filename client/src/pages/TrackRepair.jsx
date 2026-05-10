import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { FiSearch, FiCheck, FiClock, FiTool, FiPackage, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import axios from 'axios';

const statusSteps = [
  { key: 'Pending', icon: FiClock, color: 'yellow' },
  { key: 'Diagnosing', icon: FiSearch, color: 'blue' },
  { key: 'Waiting for Approval', icon: FiAlertCircle, color: 'purple' },
  { key: 'In Repair', icon: FiTool, color: 'orange' },
  { key: 'Ready for Pickup', icon: FiPackage, color: 'cyan' },
  { key: 'Completed', icon: FiCheckCircle, color: 'green' }
];

export default function TrackRepair() {
  const { t } = useTranslation();
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const res = await axios.get(`/api/bookings/${query.trim()}`);
      setResult(res.data);
    } catch (err) {
      setError(err.response?.data?.error || t('tracking.notFound'));
    } finally {
      setLoading(false);
    }
  };

  const currentStepIndex = result ? statusSteps.findIndex(s => s.key === result.status) : -1;

  return (
    <>
      <Helmet>
        <title>Track Repair - LaptopDoctor</title>
        <meta name="description" content="Track the status of your PC or laptop repair." />
      </Helmet>

      <section className="pt-28 pb-24 bg-navy-900 min-h-screen">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <span className="text-gold text-sm font-semibold tracking-wider uppercase">Real-Time Updates</span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-4">{t('tracking.title')}</h1>
            <p className="text-gray-400 text-lg">{t('tracking.subtitle')}</p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            onSubmit={handleSearch}
            className="mb-8"
          >
            <div className="relative">
              <FiSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t('tracking.placeholder')}
                className="w-full pl-14 pr-36 py-4 bg-navy-800 border border-navy-700 rounded-2xl text-white focus:border-gold focus:ring-1 focus:ring-gold outline-none text-lg placeholder-gray-500"
              />
              <button
                type="submit"
                disabled={loading}
                className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2.5 bg-gold text-navy-900 font-bold rounded-xl hover:bg-gold-light transition-all disabled:opacity-50 text-sm"
              >
                {loading ? t('tracking.searching') : t('tracking.search')}
              </button>
            </div>
          </motion.form>

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-center py-12 text-gray-400"
              >
                <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-4">
                  <FiAlertCircle className="text-red-400 text-2xl" />
                </div>
                <p className="text-red-400 font-medium">{error}</p>
              </motion.div>
            )}

            {result && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* Request info card */}
                <div className="p-7 rounded-2xl bg-navy-800 border border-navy-700">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">Request ID</p>
                      <p className="text-gold font-bold text-lg">{result.requestId}</p>
                    </div>
                    <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
                      result.status === 'Completed' ? 'bg-green-400/10 text-green-400 border border-green-400/20' :
                      result.status === 'Pending' ? 'bg-yellow-400/10 text-yellow-400 border border-yellow-400/20' :
                      'bg-blue-400/10 text-blue-400 border border-blue-400/20'
                    }`}>{result.status}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div><span className="text-gray-500">Device:</span> <span className="text-white font-medium ml-1">{result.deviceType}</span></div>
                    <div><span className="text-gray-500">Brand:</span> <span className="text-white font-medium ml-1">{result.brandModel || 'N/A'}</span></div>
                    {result.estimatedPrice && (
                      <div className="col-span-2"><span className="text-gray-500">Estimated Price:</span> <span className="text-gold font-semibold ml-1">{result.estimatedPrice}</span></div>
                    )}
                  </div>
                </div>

                {/* Status timeline */}
                <div className="p-7 rounded-2xl bg-navy-800 border border-navy-700">
                  <h3 className="text-lg font-bold text-white mb-6">Repair Progress</h3>
                  <div className="space-y-0">
                    {statusSteps.map((step, i) => {
                      const isCompleted = i <= currentStepIndex;
                      const isCurrent = i === currentStepIndex;
                      const isLast = i === statusSteps.length - 1;

                      return (
                        <div key={step.key} className="flex gap-4">
                          <div className="flex flex-col items-center">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all ${
                              isCurrent ? `bg-${step.color}-400/20 border-2 border-${step.color}-400 ring-4 ring-${step.color}-400/10` :
                              isCompleted ? 'bg-green-400/20 border-2 border-green-400' :
                              'bg-navy-700 border-2 border-navy-600'
                            }`}>
                              {isCompleted && !isCurrent ? (
                                <FiCheck className="text-green-400" />
                              ) : (
                                <step.icon className={isCurrent ? `text-${step.color}-400` : 'text-gray-500'} />
                              )}
                            </div>
                            {!isLast && (
                              <div className={`w-0.5 h-8 ${isCompleted && i < currentStepIndex ? 'bg-green-400/40' : 'bg-navy-600'}`} />
                            )}
                          </div>
                          <div className={`pb-8 ${isCurrent ? '' : ''}`}>
                            <p className={`font-medium ${isCurrent ? 'text-white' : isCompleted ? 'text-green-400' : 'text-gray-500'}`}>
                              {step.key}
                            </p>
                            {isCurrent && (
                              <p className="text-xs text-gray-500 mt-1">Current status</p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {result.technicianNotes && (
                  <div className="p-7 rounded-2xl bg-navy-800 border border-navy-700">
                    <h3 className="text-lg font-bold text-white mb-3">{t('tracking.techNotes')}</h3>
                    <p className="text-gray-300 leading-relaxed">{result.technicianNotes}</p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </>
  );
}
