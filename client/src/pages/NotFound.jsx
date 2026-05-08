import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { FiHome, FiArrowRight } from 'react-icons/fi';

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <>
      <Helmet><title>404 - LaptopDoctor</title></Helmet>
      <section className="pt-24 pb-20 bg-navy-900 min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(212,168,67,0.05)_0%,_transparent_60%)]" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center px-4 sm:px-6 relative z-10"
        >
          <motion.h1
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-[10rem] sm:text-[12rem] font-bold text-gold/20 leading-none select-none"
          >
            404
          </motion.h1>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 -mt-8">{t('common.notFound')}</h2>
          <p className="text-gray-400 mb-10 max-w-md mx-auto text-lg leading-relaxed">{t('common.notFoundDesc')}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gold text-navy-900 font-bold rounded-xl hover:bg-gold-light transition-all shadow-lg shadow-gold/20 text-lg"
            >
              <FiHome /> {t('common.goHome')}
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-8 py-4 border-2 border-navy-600 text-gray-300 font-bold rounded-xl hover:border-gold hover:text-gold transition-all text-lg"
            >
              Browse Services <FiArrowRight />
            </Link>
          </div>
        </motion.div>
      </section>
    </>
  );
}
