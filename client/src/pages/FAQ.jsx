import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { FiChevronDown, FiHelpCircle } from 'react-icons/fi';

export default function FAQ() {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = Array.from({ length: 8 }, (_, i) => ({
    q: t(`faq.q${i + 1}`),
    a: t(`faq.a${i + 1}`)
  }));

  return (
    <>
      <Helmet>
        <title>FAQ - LaptopDoctor</title>
        <meta name="description" content="Frequently asked questions about LaptopDoctor repair services." />
      </Helmet>

      <section className="pt-28 pb-24 bg-navy-900 min-h-screen">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-14">
            <div className="w-16 h-16 rounded-2xl bg-gold/10 flex items-center justify-center mx-auto mb-6">
              <FiHelpCircle className="text-gold text-3xl" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{t('faq.title')}</h1>
            <p className="text-gray-400 text-lg max-w-xl mx-auto leading-relaxed">{t('faq.subtitle')}</p>
          </motion.div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="rounded-2xl bg-navy-800 border border-navy-700 overflow-hidden hover:border-navy-600 transition-all"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left group"
                  aria-expanded={openIndex === i}
                >
                  <div className="flex items-center gap-4">
                    <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold shrink-0 transition-colors ${openIndex === i ? 'bg-gold text-navy-900' : 'bg-navy-700 text-gray-400'}`}>
                      {i + 1}
                    </span>
                    <span className="text-white font-medium pr-4 group-hover:text-gold transition-colors">{faq.q}</span>
                  </div>
                  <FiChevronDown className={`text-gold shrink-0 transition-transform text-lg ${openIndex === i ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="px-6 pb-6 pl-[4.5rem] text-gray-400 leading-relaxed">{faq.a}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
