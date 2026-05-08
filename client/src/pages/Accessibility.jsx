import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { FiCheck } from 'react-icons/fi';

export default function Accessibility() {
  const { t } = useTranslation();

  const measures = Array.from({ length: 9 }, (_, i) => t(`accessibilityPage.measure${i + 1}`));

  return (
    <>
      <Helmet>
        <title>Accessibility - LaptopDoctor</title>
        <meta name="description" content="LaptopDoctor accessibility statement and commitment to digital accessibility." />
      </Helmet>

      <section className="pt-24 pb-20 bg-navy-900 min-h-screen">
        <div className="max-w-3xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{t('accessibilityPage.title')}</h1>
            <p className="text-gray-400 text-lg">{t('accessibilityPage.subtitle')}</p>
          </motion.div>

          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-6 rounded-2xl bg-navy-800 border border-navy-700"
            >
              <p className="text-gray-300 leading-relaxed">{t('accessibilityPage.intro')}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-6 rounded-2xl bg-navy-800 border border-navy-700"
            >
              <h2 className="text-xl font-semibold text-white mb-4">{t('accessibilityPage.measures')}</h2>
              <p className="text-gray-400 mb-4">{t('accessibilityPage.measuresDesc')}</p>
              <ul className="space-y-3">
                {measures.map((measure, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <FiCheck className="text-green-400 mt-1 shrink-0" />
                    <span className="text-gray-300">{measure}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-6 rounded-2xl bg-navy-800 border border-navy-700"
            >
              <h2 className="text-xl font-semibold text-white mb-4">{t('accessibilityPage.feedback')}</h2>
              <p className="text-gray-300 leading-relaxed">{t('accessibilityPage.feedbackDesc')}</p>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
