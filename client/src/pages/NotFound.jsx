import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { FiHome } from 'react-icons/fi';

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <>
      <Helmet><title>404 - LaptopDoctor</title></Helmet>
      <section className="pt-24 pb-20 bg-navy-900 min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center px-4"
        >
          <h1 className="text-8xl font-bold text-gold mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-white mb-4">{t('common.notFound')}</h2>
          <p className="text-gray-400 mb-8 max-w-md mx-auto">{t('common.notFoundDesc')}</p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gold text-navy-900 font-bold rounded-xl hover:bg-gold-light transition-all"
          >
            <FiHome /> {t('common.goHome')}
          </Link>
        </motion.div>
      </section>
    </>
  );
}
