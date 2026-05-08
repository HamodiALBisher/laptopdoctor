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
    { icon: FiUsers, title: t('about.whoWeAre'), desc: t('about.whoWeAreDesc'), color: 'text-cyan-accent', bg: 'bg-cyan-accent/10' },
    { icon: FiAward, title: t('about.experience'), desc: t('about.experienceDesc'), color: 'text-gold', bg: 'bg-gold/10' },
    { icon: FiShield, title: t('about.privacy'), desc: t('about.privacyDesc'), color: 'text-green-400', bg: 'bg-green-400/10' },
    { icon: FiSearch, title: t('about.honestDiagnosis'), desc: t('about.honestDiagnosisDesc'), color: 'text-blue-400', bg: 'bg-blue-400/10' },
    { icon: FiDollarSign, title: t('about.noCosts'), desc: t('about.noCostsDesc'), color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
    { icon: FiCheck, title: t('about.warranty'), desc: t('about.warrantyDesc'), color: 'text-purple-400', bg: 'bg-purple-400/10' }
  ];

  return (
    <>
      <Helmet>
        <title>About - LaptopDoctor</title>
        <meta name="description" content="Learn about LaptopDoctor - your trusted partner for professional PC and laptop repair." />
      </Helmet>

      <section className="pt-28 pb-24 bg-navy-900 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
            <span className="text-gold text-sm font-semibold tracking-wider uppercase">Who We Are</span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-4">{t('about.title')}</h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">{t('about.subtitle')}</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sections.map((section, i) => (
              <motion.div
                key={i}
                {...fadeInUp}
                transition={{ ...fadeInUp.transition, delay: i * 0.1 }}
                className="p-8 rounded-2xl bg-navy-800 border border-navy-700 hover:border-navy-600 transition-all hover:shadow-lg"
              >
                <div className={`w-14 h-14 rounded-2xl ${section.bg} flex items-center justify-center mb-5`}>
                  <section.icon className={`${section.color} text-2xl`} />
                </div>
                <h2 className="text-xl font-semibold text-white mb-3">{section.title}</h2>
                <p className="text-gray-400 leading-relaxed">{section.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
