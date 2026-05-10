import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { FiPackage, FiClock, FiCheckCircle, FiTool, FiAlertCircle, FiLogOut, FiUser, FiPlus } from 'react-icons/fi';
import { useCustomerAuth } from '../contexts/CustomerAuthContext';
import axios from 'axios';

const statusConfig = {
  'Pending': { color: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20', icon: FiClock },
  'Diagnosing': { color: 'text-blue-400 bg-blue-400/10 border-blue-400/20', icon: FiTool },
  'Waiting for Approval': { color: 'text-orange-400 bg-orange-400/10 border-orange-400/20', icon: FiAlertCircle },
  'In Repair': { color: 'text-cyan-400 bg-cyan-400/10 border-cyan-400/20', icon: FiTool },
  'Ready for Pickup': { color: 'text-green-400 bg-green-400/10 border-green-400/20', icon: FiPackage },
  'Completed': { color: 'text-green-500 bg-green-500/10 border-green-500/20', icon: FiCheckCircle }
};

const statusSteps = ['Pending', 'Diagnosing', 'Waiting for Approval', 'In Repair', 'Ready for Pickup', 'Completed'];

export default function MyRepairs() {
  const { customer, token, logout, isLoggedIn } = useCustomerAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }
    fetchBookings();
  }, [isLoggedIn]);

  const fetchBookings = async () => {
    try {
      const res = await axios.get('/api/customers/my-repairs', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBookings(res.data.bookings);
    } catch (err) {
      if (err.response?.status === 401) {
        logout();
        navigate('/login');
      } else {
        setError('Failed to load repairs');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getStepIndex = (status) => statusSteps.indexOf(status);

  return (
    <>
      <Helmet>
        <title>My Repairs - LaptopDoctor</title>
      </Helmet>

      <section className="pt-28 pb-24 bg-navy-900 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-10">
            <div>
              <h1 className="text-3xl font-bold text-white">My Repairs</h1>
              <p className="text-gray-400 mt-1 flex items-center gap-2">
                <FiUser className="text-gold" />
                {customer?.fullName} &middot; {customer?.email}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                to="/booking"
                className="px-4 py-2.5 bg-gold text-navy-900 font-semibold rounded-xl hover:bg-gold-light transition-all flex items-center gap-2 text-sm"
              >
                <FiPlus /> Book Repair
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2.5 bg-navy-800 border border-navy-700 text-gray-300 font-medium rounded-xl hover:text-white hover:border-navy-600 transition-all flex items-center gap-2 text-sm"
              >
                <FiLogOut /> Logout
              </button>
            </div>
          </div>

          {/* Content */}
          {loading ? (
            <div className="text-center py-20">
              <div className="w-10 h-10 border-2 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-gray-400">Loading your repairs...</p>
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <FiAlertCircle className="text-4xl text-red-400 mx-auto mb-4" />
              <p className="text-gray-400">{error}</p>
            </div>
          ) : bookings.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20 bg-navy-800 rounded-2xl border border-navy-700"
            >
              <FiPackage className="text-5xl text-gray-600 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-white mb-2">No repairs yet</h2>
              <p className="text-gray-400 mb-6">Book your first repair and track it here</p>
              <Link
                to="/booking"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gold text-navy-900 font-semibold rounded-xl hover:bg-gold-light transition-all"
              >
                <FiPlus /> Book a Repair
              </Link>
            </motion.div>
          ) : (
            <div className="space-y-4">
              {bookings.map((booking, i) => {
                const config = statusConfig[booking.status] || statusConfig['Pending'];
                const StatusIcon = config.icon;
                const isExpanded = expandedId === booking._id;
                const stepIdx = getStepIndex(booking.status);

                return (
                  <motion.div
                    key={booking._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="bg-navy-800 rounded-2xl border border-navy-700 overflow-hidden"
                  >
                    <button
                      onClick={() => setExpandedId(isExpanded ? null : booking._id)}
                      className="w-full p-6 text-left flex items-center justify-between hover:bg-navy-700/30 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${config.color}`}>
                          <StatusIcon className="text-lg" />
                        </div>
                        <div>
                          <div className="flex items-center gap-3">
                            <span className="text-gold font-mono font-semibold text-sm">{booking.requestId}</span>
                            <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${config.color}`}>
                              {booking.status}
                            </span>
                          </div>
                          <p className="text-gray-400 text-sm mt-1">
                            {booking.deviceType} — {booking.problemCategory} &middot; {new Date(booking.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <span className="text-gray-500 text-sm">{isExpanded ? '▲' : '▼'}</span>
                    </button>

                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="px-6 pb-6 border-t border-navy-700"
                      >
                        {/* Status Timeline */}
                        <div className="py-5">
                          <div className="flex items-center justify-between relative">
                            <div className="absolute top-4 left-0 right-0 h-0.5 bg-navy-700" />
                            {statusSteps.map((step, idx) => (
                              <div key={step} className="relative flex flex-col items-center z-10">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 ${
                                  idx <= stepIdx
                                    ? 'bg-gold border-gold text-navy-900'
                                    : 'bg-navy-800 border-navy-600 text-gray-500'
                                }`}>
                                  {idx <= stepIdx ? '✓' : idx + 1}
                                </div>
                                <span className={`text-[10px] mt-1.5 whitespace-nowrap ${
                                  idx <= stepIdx ? 'text-gold font-medium' : 'text-gray-600'
                                }`}>
                                  {step}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Details Grid */}
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="bg-navy-700/50 rounded-xl p-4">
                            <p className="text-gray-500 text-xs mb-1">Device</p>
                            <p className="text-white font-medium">{booking.deviceType}</p>
                            {booking.brandModel && <p className="text-gray-400 text-xs mt-0.5">{booking.brandModel}</p>}
                          </div>
                          <div className="bg-navy-700/50 rounded-xl p-4">
                            <p className="text-gray-500 text-xs mb-1">Urgency</p>
                            <p className={`font-medium ${booking.urgency === 'Emergency' ? 'text-red-400' : booking.urgency === 'Urgent' ? 'text-yellow-400' : 'text-white'}`}>
                              {booking.urgency}
                            </p>
                          </div>
                          <div className="bg-navy-700/50 rounded-xl p-4 col-span-2">
                            <p className="text-gray-500 text-xs mb-1">Problem Description</p>
                            <p className="text-gray-300">{booking.problemDescription}</p>
                          </div>
                          {booking.estimatedPrice && (
                            <div className="bg-navy-700/50 rounded-xl p-4">
                              <p className="text-gray-500 text-xs mb-1">Estimated Price</p>
                              <p className="text-gold font-semibold">{booking.estimatedPrice}</p>
                            </div>
                          )}
                          {booking.technicianNotes && (
                            <div className="bg-navy-700/50 rounded-xl p-4 col-span-2">
                              <p className="text-gray-500 text-xs mb-1">Technician Notes</p>
                              <p className="text-gray-300">{booking.technicianNotes}</p>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
