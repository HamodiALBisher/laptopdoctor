import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { FiSearch, FiDownload, FiTrash2, FiAlertTriangle, FiX, FiChevronDown } from 'react-icons/fi';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

const statuses = ['Pending', 'Diagnosing', 'Waiting for Approval', 'In Repair', 'Ready for Pickup', 'Completed'];

export default function AdminDashboard() {
  const { t } = useTranslation();
  const { token, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [bookings, setBookings] = useState([]);
  const [stats, setStats] = useState({});
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [editData, setEditData] = useState({});

  const api = axios.create({
    headers: { Authorization: `Bearer ${token}` }
  });

  const fetchBookings = useCallback(async () => {
    try {
      const params = {};
      if (search) params.search = search;
      if (filterStatus !== 'all') params.status = filterStatus;
      const res = await api.get('/api/bookings', { params });
      setBookings(res.data.bookings);
      setStats(res.data.stats);
    } catch (err) {
      if (err.response?.status === 401) { logout(); navigate('/admin'); }
    } finally {
      setLoading(false);
    }
  }, [search, filterStatus, token]);

  useEffect(() => {
    if (!isAuthenticated) { navigate('/admin'); return; }
    fetchBookings();
  }, [isAuthenticated, fetchBookings]);

  const updateBooking = async (id, data) => {
    try {
      await api.patch(`/api/bookings/${id}`, data);
      fetchBookings();
      setSelectedBooking(null);
    } catch (err) {
      console.error('Update error:', err);
    }
  };

  const deleteBooking = async (id) => {
    if (!window.confirm(t('admin.confirmDelete'))) return;
    try {
      await api.delete(`/api/bookings/${id}`);
      fetchBookings();
      setSelectedBooking(null);
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  const exportCsv = async () => {
    try {
      const res = await api.get('/api/bookings/export/csv', { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const a = document.createElement('a');
      a.href = url;
      a.download = 'bookings.csv';
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Export error:', err);
    }
  };

  const statCards = [
    { label: t('admin.totalRequests'), value: stats.total || 0, color: 'text-white' },
    { label: t('admin.pending'), value: stats.pending || 0, color: 'text-yellow-400' },
    { label: t('admin.inProgress'), value: (stats.diagnosing || 0) + (stats.inRepair || 0), color: 'text-blue-400' },
    { label: t('admin.completed'), value: stats.completed || 0, color: 'text-green-400' },
    { label: t('admin.urgent'), value: stats.urgent || 0, color: 'text-red-400' }
  ];

  const statusColor = (s) => {
    const map = { Pending: 'bg-yellow-400/10 text-yellow-400', Diagnosing: 'bg-blue-400/10 text-blue-400', 'Waiting for Approval': 'bg-purple-400/10 text-purple-400', 'In Repair': 'bg-orange-400/10 text-orange-400', 'Ready for Pickup': 'bg-cyan-400/10 text-cyan-400', Completed: 'bg-green-400/10 text-green-400' };
    return map[s] || 'bg-gray-400/10 text-gray-400';
  };

  return (
    <>
      <Helmet><title>Admin Dashboard - LaptopDoctor</title></Helmet>
      <section className="pt-20 pb-20 bg-navy-900 min-h-screen">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-8 mt-4">
            <h1 className="text-2xl font-bold text-white">{t('admin.dashboard')}</h1>
            <div className="flex gap-3">
              <button onClick={exportCsv} className="flex items-center gap-2 px-4 py-2 bg-navy-700 text-gray-300 rounded-lg hover:bg-navy-600 text-sm">
                <FiDownload /> {t('admin.exportCsv')}
              </button>
              <button onClick={() => { logout(); navigate('/'); }} className="px-4 py-2 bg-red-900/30 text-red-400 rounded-lg hover:bg-red-900/50 text-sm">
                {t('admin.logout')}
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
            {statCards.map((card, i) => (
              <div key={i} className="p-4 rounded-xl bg-navy-800 border border-navy-700 text-center">
                <p className={`text-3xl font-bold ${card.color}`}>{card.value}</p>
                <p className="text-xs text-gray-400 mt-1">{card.label}</p>
              </div>
            ))}
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={t('admin.search')}
                className="w-full pl-10 pr-4 py-3 bg-navy-800 border border-navy-700 rounded-xl text-white focus:border-gold outline-none"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-3 bg-navy-800 border border-navy-700 rounded-xl text-white focus:border-gold outline-none"
              aria-label={t('admin.filterStatus')}
            >
              <option value="all">{t('admin.all')}</option>
              {statuses.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          {/* Bookings Table */}
          {loading ? (
            <div className="text-center py-20 text-gray-400">{t('common.loading')}</div>
          ) : bookings.length === 0 ? (
            <div className="text-center py-20 text-gray-400">{t('admin.noBookings')}</div>
          ) : (
            <div className="overflow-x-auto rounded-xl border border-navy-700">
              <table className="w-full text-sm">
                <thead className="bg-navy-800">
                  <tr className="text-left text-gray-400">
                    <th className="px-4 py-3">ID</th>
                    <th className="px-4 py-3">Name</th>
                    <th className="px-4 py-3">Phone</th>
                    <th className="px-4 py-3">Device</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Urgency</th>
                    <th className="px-4 py-3">Date</th>
                    <th className="px-4 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-navy-700">
                  {bookings.map((b) => (
                    <tr key={b._id} className="hover:bg-navy-800/50 transition-colors">
                      <td className="px-4 py-3 text-gold font-mono text-xs">{b.requestId}</td>
                      <td className="px-4 py-3 text-white">{b.fullName}</td>
                      <td className="px-4 py-3 text-gray-300">{b.phone}</td>
                      <td className="px-4 py-3 text-gray-300">{b.deviceType}</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs font-semibold px-2 py-1 rounded ${statusColor(b.status)}`}>
                          {b.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {b.isUrgent && <FiAlertTriangle className="text-red-400" />}
                        <span className={`text-xs ${b.urgency === 'Emergency' ? 'text-red-400' : b.urgency === 'Urgent' ? 'text-yellow-400' : 'text-gray-400'}`}>
                          {b.urgency}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-400 text-xs">{new Date(b.createdAt).toLocaleDateString()}</td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => { setSelectedBooking(b); setEditData({ status: b.status, technicianNotes: b.technicianNotes, estimatedPrice: b.estimatedPrice, isUrgent: b.isUrgent }); }}
                          className="text-xs text-gold hover:text-gold-light"
                        >
                          View / Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Detail Modal */}
          {selectedBooking && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60" onClick={() => setSelectedBooking(null)}>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-navy-800 rounded-2xl border border-navy-700 p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-bold text-white">{selectedBooking.requestId}</h2>
                  <button onClick={() => setSelectedBooking(null)} className="text-gray-400 hover:text-white"><FiX /></button>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-semibold text-gold mb-2">{t('admin.customerDetails')}</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div><span className="text-gray-400">Name:</span> <span className="text-white">{selectedBooking.fullName}</span></div>
                      <div><span className="text-gray-400">Phone:</span> <span className="text-white">{selectedBooking.phone}</span></div>
                      <div><span className="text-gray-400">Email:</span> <span className="text-white">{selectedBooking.email}</span></div>
                      <div><span className="text-gray-400">City:</span> <span className="text-white">{selectedBooking.city}</span></div>
                      <div><span className="text-gray-400">Contact:</span> <span className="text-white">{selectedBooking.preferredContact}</span></div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-gold mb-2">{t('admin.deviceInfo')}</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div><span className="text-gray-400">Device:</span> <span className="text-white">{selectedBooking.deviceType}</span></div>
                      <div><span className="text-gray-400">Brand:</span> <span className="text-white">{selectedBooking.brandModel || 'N/A'}</span></div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-gold mb-2">{t('admin.problemInfo')}</h3>
                    <p className="text-sm text-gray-300 mb-1">{selectedBooking.problemCategory}</p>
                    <p className="text-sm text-gray-400">{selectedBooking.problemDescription}</p>
                  </div>

                  <div className="border-t border-navy-700 pt-4 space-y-3">
                    <div>
                      <label className="block text-xs text-gray-400 mb-1">{t('admin.updateStatus')}</label>
                      <select
                        value={editData.status}
                        onChange={(e) => setEditData(prev => ({ ...prev, status: e.target.value }))}
                        className="w-full px-3 py-2 bg-navy-700 border border-navy-600 rounded-lg text-white text-sm focus:border-gold outline-none"
                      >
                        {statuses.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs text-gray-400 mb-1">{t('admin.techNotes')}</label>
                      <textarea
                        value={editData.technicianNotes}
                        onChange={(e) => setEditData(prev => ({ ...prev, technicianNotes: e.target.value }))}
                        rows={3}
                        className="w-full px-3 py-2 bg-navy-700 border border-navy-600 rounded-lg text-white text-sm focus:border-gold outline-none resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-gray-400 mb-1">{t('admin.estPrice')}</label>
                      <input
                        type="text"
                        value={editData.estimatedPrice}
                        onChange={(e) => setEditData(prev => ({ ...prev, estimatedPrice: e.target.value }))}
                        className="w-full px-3 py-2 bg-navy-700 border border-navy-600 rounded-lg text-white text-sm focus:border-gold outline-none"
                        placeholder="e.g. $50 - $100"
                      />
                    </div>

                    <label className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={editData.isUrgent}
                        onChange={(e) => setEditData(prev => ({ ...prev, isUrgent: e.target.checked }))}
                        className="w-4 h-4 rounded border-navy-600 bg-navy-700 text-gold"
                      />
                      {t('admin.markUrgent')}
                    </label>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={() => updateBooking(selectedBooking._id, editData)}
                      className="flex-1 py-2 bg-gold text-navy-900 font-bold rounded-lg hover:bg-gold-light transition-all text-sm"
                    >
                      Save Changes
                    </button>
                    <button
                      onClick={() => deleteBooking(selectedBooking._id)}
                      className="px-4 py-2 bg-red-900/30 text-red-400 rounded-lg hover:bg-red-900/50 transition-all text-sm"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
