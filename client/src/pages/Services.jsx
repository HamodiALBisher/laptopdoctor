import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import {
  FiMonitor, FiHardDrive, FiCpu, FiDatabase, FiZap,
  FiSettings, FiShield, FiCloud, FiSave, FiWind,
  FiRefreshCw, FiSmartphone, FiGrid, FiBattery, FiWifi, FiServer, FiTool,
  FiSearch, FiX
} from 'react-icons/fi';

const services = [
  { key: 'laptopRepair', icon: FiMonitor, time: '1-3 hours', difficulty: 'Medium', category: 'repair' },
  { key: 'desktopRepair', icon: FiSettings, time: '1-4 hours', difficulty: 'Medium', category: 'repair' },
  { key: 'gamingRepair', icon: FiCpu, time: '2-5 hours', difficulty: 'Hard', category: 'repair' },
  { key: 'ssdHdd', icon: FiHardDrive, time: '30-60 min', difficulty: 'Easy', category: 'upgrade' },
  { key: 'ram', icon: FiZap, time: '15-30 min', difficulty: 'Easy', category: 'upgrade' },
  { key: 'windows', icon: FiGrid, time: '1-2 hours', difficulty: 'Easy', category: 'software' },
  { key: 'virus', icon: FiShield, time: '1-3 hours', difficulty: 'Medium', category: 'software' },
  { key: 'dataRecovery', icon: FiDatabase, time: '2-24 hours', difficulty: 'Hard', category: 'data' },
  { key: 'cloudBackup', icon: FiCloud, time: '30-60 min', difficulty: 'Easy', category: 'data' },
  { key: 'localBackup', icon: FiSave, time: '30-60 min', difficulty: 'Easy', category: 'data' },
  { key: 'thermal', icon: FiWind, time: '30-60 min', difficulty: 'Medium', category: 'maintenance' },
  { key: 'fan', icon: FiRefreshCw, time: '30-60 min', difficulty: 'Medium', category: 'maintenance' },
  { key: 'screen', icon: FiSmartphone, time: '1-3 hours', difficulty: 'Hard', category: 'repair' },
  { key: 'keyboard', icon: FiTool, time: '1-2 hours', difficulty: 'Medium', category: 'repair' },
  { key: 'battery', icon: FiBattery, time: '15-30 min', difficulty: 'Easy', category: 'repair' },
  { key: 'remote', icon: FiWifi, time: '30-90 min', difficulty: 'Easy', category: 'software' },
  { key: 'business', icon: FiServer, time: 'Varies', difficulty: 'Custom', category: 'software' }
];

const difficultyColor = {
  Easy: 'text-green-400 bg-green-400/10 border border-green-400/20',
  Medium: 'text-yellow-400 bg-yellow-400/10 border border-yellow-400/20',
  Hard: 'text-red-400 bg-red-400/10 border border-red-400/20',
  Custom: 'text-cyan-accent bg-cyan-accent/10 border border-cyan-accent/20'
};

const difficulties = ['All', 'Easy', 'Medium', 'Hard', 'Custom'];
const categories = [
  { key: 'all', label: 'All' },
  { key: 'repair', label: 'Repair' },
  { key: 'upgrade', label: 'Upgrade' },
  { key: 'software', label: 'Software' },
  { key: 'data', label: 'Data' },
  { key: 'maintenance', label: 'Maintenance' }
];
const sortOptions = [
  { key: 'default', label: 'Default' },
  { key: 'name-asc', label: 'Name A-Z' },
  { key: 'name-desc', label: 'Name Z-A' },
  { key: 'time-asc', label: 'Fastest First' },
  { key: 'time-desc', label: 'Slowest First' }
];

function parseTime(timeStr) {
  if (timeStr === 'Varies') return 999;
  const match = timeStr.match(/(\d+)/);
  return match ? parseInt(match[1]) : 500;
}

export default function Services() {
  const { t } = useTranslation();
  const [search, setSearch] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('default');

  const filtered = useMemo(() => {
    let result = services.filter(svc => {
      const name = t(`services.${svc.key}`).toLowerCase();
      const desc = t(`services.${svc.key}Desc`).toLowerCase();
      const q = search.toLowerCase();
      const matchesSearch = !q || name.includes(q) || desc.includes(q);
      const matchesDifficulty = difficultyFilter === 'All' || svc.difficulty === difficultyFilter;
      const matchesCategory = categoryFilter === 'all' || svc.category === categoryFilter;
      return matchesSearch && matchesDifficulty && matchesCategory;
    });

    if (sortBy === 'name-asc') {
      result.sort((a, b) => t(`services.${a.key}`).localeCompare(t(`services.${b.key}`)));
    } else if (sortBy === 'name-desc') {
      result.sort((a, b) => t(`services.${b.key}`).localeCompare(t(`services.${a.key}`)));
    } else if (sortBy === 'time-asc') {
      result.sort((a, b) => parseTime(a.time) - parseTime(b.time));
    } else if (sortBy === 'time-desc') {
      result.sort((a, b) => parseTime(b.time) - parseTime(a.time));
    }

    return result;
  }, [search, difficultyFilter, categoryFilter, sortBy, t]);

  const hasFilters = search || difficultyFilter !== 'All' || categoryFilter !== 'all' || sortBy !== 'default';

  const clearAll = () => {
    setSearch('');
    setDifficultyFilter('All');
    setCategoryFilter('all');
    setSortBy('default');
  };

  return (
    <>
      <Helmet>
        <title>Services - LaptopDoctor</title>
        <meta name="description" content="Comprehensive PC and laptop repair services including hardware repair, data recovery, virus removal, and more." />
      </Helmet>

      <section className="pt-28 pb-24 bg-navy-900 min-h-screen">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <span className="text-gold text-sm font-semibold tracking-wider uppercase">What We Offer</span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-4">{t('services.title')}</h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">{t('services.subtitle')}</p>
          </motion.div>

          {/* Search & Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mb-10 space-y-5"
          >
            {/* Search Bar */}
            <div className="relative max-w-xl mx-auto">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search services..."
                className="w-full pl-12 pr-10 py-3.5 bg-navy-800 border border-navy-700 rounded-xl text-white placeholder-gray-500 focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-colors"
              />
              {search && (
                <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors">
                  <FiX className="text-lg" />
                </button>
              )}
            </div>

            {/* Filter Row */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              {/* Category Filter */}
              <div className="flex flex-wrap items-center gap-2">
                {categories.map(cat => (
                  <button
                    key={cat.key}
                    onClick={() => setCategoryFilter(cat.key)}
                    className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
                      categoryFilter === cat.key
                        ? 'bg-gold text-navy-900'
                        : 'bg-navy-800 text-gray-400 border border-navy-700 hover:text-white hover:border-navy-600'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Sort Dropdown */}
              <div className="flex items-center gap-3">
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                  className="px-3.5 py-2 bg-navy-800 border border-navy-700 rounded-lg text-sm text-gray-300 focus:border-gold outline-none transition-colors cursor-pointer"
                >
                  {sortOptions.map(opt => (
                    <option key={opt.key} value={opt.key}>Sort: {opt.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Difficulty Filter */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              <span className="text-xs text-gray-500 uppercase tracking-wider mr-1">Difficulty:</span>
              {difficulties.map(d => (
                <button
                  key={d}
                  onClick={() => setDifficultyFilter(d)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                    difficultyFilter === d
                      ? d === 'All' ? 'bg-white/10 text-white border border-white/20'
                        : difficultyColor[d]
                      : 'bg-navy-800 text-gray-500 border border-navy-700 hover:text-gray-300 hover:border-navy-600'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>

            {/* Active Filters & Count */}
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">
                Showing <span className="text-white font-medium">{filtered.length}</span> of {services.length} services
              </p>
              {hasFilters && (
                <button onClick={clearAll} className="text-sm text-gold hover:text-gold-light transition-colors flex items-center gap-1">
                  <FiX className="text-xs" /> Clear filters
                </button>
              )}
            </div>
          </motion.div>

          {/* Service Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((svc) => (
                <motion.div
                  key={svc.key}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="group p-7 rounded-2xl bg-navy-800 border border-navy-700 hover:border-gold/30 transition-all hover:shadow-lg hover:shadow-gold/5"
                >
                  <div className="flex items-start justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-cyan-accent/10 flex items-center justify-center group-hover:bg-gold/10 transition-colors">
                      <svc.icon className="text-cyan-accent text-2xl group-hover:text-gold transition-colors" />
                    </div>
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${difficultyColor[svc.difficulty]}`}>
                      {svc.difficulty}
                    </span>
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-2">{t(`services.${svc.key}`)}</h3>
                  <p className="text-gray-400 text-sm mb-5 leading-relaxed">{t(`services.${svc.key}Desc`)}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-navy-700">
                    <span className="text-xs text-gray-500">
                      {t('services.estimatedTime')}: <span className="text-gray-300 font-medium">{svc.time}</span>
                    </span>
                    <Link
                      to="/booking"
                      className="text-sm font-semibold text-gold hover:text-gold-light transition-colors inline-flex items-center gap-1"
                    >
                      {t('services.bookService')} &rarr;
                    </Link>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* No Results */}
          {filtered.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <FiSearch className="text-4xl text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 text-lg mb-2">No services found</p>
              <p className="text-gray-500 text-sm mb-6">Try adjusting your search or filters</p>
              <button onClick={clearAll} className="px-6 py-2.5 bg-gold text-navy-900 font-semibold rounded-xl hover:bg-gold-light transition-all">
                Clear all filters
              </button>
            </motion.div>
          )}
        </div>
      </section>
    </>
  );
}
