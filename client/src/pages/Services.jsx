import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import {
  FiMonitor, FiHardDrive, FiCpu, FiDatabase, FiZap,
  FiSettings, FiShield, FiCloud, FiSave, FiWind,
  FiRefreshCw, FiSmartphone, FiGrid, FiBattery, FiWifi, FiServer, FiTool
} from 'react-icons/fi';

const services = [
  { key: 'laptopRepair', icon: FiMonitor, time: '1-3 hours', difficulty: 'Medium' },
  { key: 'desktopRepair', icon: FiSettings, time: '1-4 hours', difficulty: 'Medium' },
  { key: 'gamingRepair', icon: FiCpu, time: '2-5 hours', difficulty: 'Hard' },
  { key: 'ssdHdd', icon: FiHardDrive, time: '30-60 min', difficulty: 'Easy' },
  { key: 'ram', icon: FiZap, time: '15-30 min', difficulty: 'Easy' },
  { key: 'windows', icon: FiGrid, time: '1-2 hours', difficulty: 'Easy' },
  { key: 'virus', icon: FiShield, time: '1-3 hours', difficulty: 'Medium' },
  { key: 'dataRecovery', icon: FiDatabase, time: '2-24 hours', difficulty: 'Hard' },
  { key: 'cloudBackup', icon: FiCloud, time: '30-60 min', difficulty: 'Easy' },
  { key: 'localBackup', icon: FiSave, time: '30-60 min', difficulty: 'Easy' },
  { key: 'thermal', icon: FiWind, time: '30-60 min', difficulty: 'Medium' },
  { key: 'fan', icon: FiRefreshCw, time: '30-60 min', difficulty: 'Medium' },
  { key: 'screen', icon: FiSmartphone, time: '1-3 hours', difficulty: 'Hard' },
  { key: 'keyboard', icon: FiTool, time: '1-2 hours', difficulty: 'Medium' },
  { key: 'battery', icon: FiBattery, time: '15-30 min', difficulty: 'Easy' },
  { key: 'remote', icon: FiWifi, time: '30-90 min', difficulty: 'Easy' },
  { key: 'business', icon: FiServer, time: 'Varies', difficulty: 'Custom' }
];

const difficultyColor = {
  Easy: 'text-green-400 bg-green-400/10 border border-green-400/20',
  Medium: 'text-yellow-400 bg-yellow-400/10 border border-yellow-400/20',
  Hard: 'text-red-400 bg-red-400/10 border border-red-400/20',
  Custom: 'text-cyan-accent bg-cyan-accent/10 border border-cyan-accent/20'
};

export default function Services() {
  const { t } = useTranslation();

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
            className="text-center mb-16"
          >
            <span className="text-gold text-sm font-semibold tracking-wider uppercase">What We Offer</span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-4">{t('services.title')}</h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">{t('services.subtitle')}</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((svc, i) => (
              <motion.div
                key={svc.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
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
          </div>
        </div>
      </section>
    </>
  );
}
