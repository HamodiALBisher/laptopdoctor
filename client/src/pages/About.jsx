import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { FiUsers, FiAward, FiShield, FiSearch, FiDollarSign, FiCheck } from 'react-icons/fi';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
};

export default function About() {
  const { t } = useTranslation();

  const sections = [
    { icon: FiUsers, title: t('about.whoWeAre'), desc: t('about.whoWeAreDesc') },
    { icon: FiAward, title: t('about.experience'), desc: t('about.experienceDesc') },
    { icon: FiShield, title: t('about.privacy'), desc: t('about.privacyDesc') },
    { icon: FiSearch, title: t('about.honestDiagnosis'), desc: t('about.honestDiagnosisDesc') },
    { icon: FiDollarSign, title: t('about.noCosts'), desc: t('about.noCostsDesc') },
    { icon: FiCheck, title: t('about.warranty'), desc: t('about.warrantyDesc') }
  ];

  return (
    <>
      <Helmet>
        <title>About - LaptopDoctor</title>
        <meta name="description" content="Learn about LaptopDoctor - your trusted partner for professional PC and laptop repair." />
      </Helmet>

      <section className="pt-24 pb-20 bg-navy-900 min-h-screen">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{t('about.title')}</h1>
            <p className="text-gray-400 text-lg">{t('about.subtitle')}</p>
          </motion.div>

          <div className="space-y-8">
            {sections.map((section, i) => (
              <motion.div
                key={i}
                {...fadeInUp}
                transition={{ ...fadeInUp.transition, delay: i * 0.1 }}
                className="flex flex-col md:flex-row items-start gap-5 p-6 rounded-2xl bg-navy-800 border border-navy-700"
              >
                <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center shrink-0">
                  <section.icon className="text-gold text-xl" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-white mb-2">{section.title}</h2>
                  <p className="text-gray-400 leading-relaxed">{section.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
