import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { FiCheck, FiEye } from 'react-icons/fi';

export default function Accessibility() {
  const { t } = useTranslation();

  const measures = Array.from({ length: 9 }, (_, i) => t(`accessibilityPage.measure${i + 1}`));

  return (
    <>
      <Helmet>
        <title>Accessibility - LaptopDoctor</title>
        <meta name="description" content="LaptopDoctor accessibility statement and commitment to digital accessibility." />
      </Helmet>

      <section className="pt-28 pb-24 bg-navy-900 min-h-screen">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-14">
            <div className="w-16 h-16 rounded-2xl bg-cyan-accent/10 flex items-center justify-center mx-auto mb-6">
              <FiEye className="text-cyan-accent text-3xl" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{t('accessibilityPage.title')}</h1>
            <p className="text-gray-400 text-lg max-w-xl mx-auto leading-relaxed">{t('accessibilityPage.subtitle')}</p>
          </motion.div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-8 rounded-2xl bg-navy-800 border border-navy-700"
            >
              <p className="text-gray-300 leading-relaxed text-lg">{t('accessibilityPage.intro')}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-8 rounded-2xl bg-navy-800 border border-navy-700"
            >
              <h2 className="text-xl font-bold text-white mb-3">{t('accessibilityPage.measures')}</h2>
              <p className="text-gray-400 mb-6 leading-relaxed">{t('accessibilityPage.measuresDesc')}</p>
              <ul className="space-y-4">
                {measures.map((measure, i) => (
                  <li key={i} className="flex items-start gap-4 p-3 rounded-xl bg-navy-700/50 border border-navy-600/50">
                    <div className="w-8 h-8 rounded-lg bg-green-400/10 flex items-center justify-center shrink-0 mt-0.5">
                      <FiCheck className="text-green-400" />
                    </div>
                    <span className="text-gray-300 leading-relaxed">{measure}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-8 rounded-2xl bg-navy-800 border border-navy-700"
            >
              <h2 className="text-xl font-bold text-white mb-3">{t('accessibilityPage.feedback')}</h2>
              <p className="text-gray-300 leading-relaxed">{t('accessibilityPage.feedbackDesc')}</p>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
