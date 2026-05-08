import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { FiPhone, FiMail, FiClock, FiMapPin } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
};

export default function Contact() {
  const { t } = useTranslation();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
    setForm({ name: '', email: '', message: '' });
  };

  const contactInfo = [
    { icon: FiPhone, label: t('contact.phone'), value: '+972-50-000-0000', href: 'tel:+972500000000' },
    { icon: FiMail, label: t('contact.email'), value: 'info@laptopdoctor.com', href: 'mailto:info@laptopdoctor.com' },
    { icon: FaWhatsapp, label: t('contact.whatsapp'), value: 'Chat on WhatsApp', href: 'https://wa.me/972500000000', color: 'text-green-400' },
    { icon: FiClock, label: t('contact.hours'), value: t('contact.hoursValue') },
    { icon: FiMapPin, label: t('contact.location'), value: t('contact.locationValue') }
  ];

  return (
    <>
      <Helmet>
        <title>Contact - LaptopDoctor</title>
        <meta name="description" content="Contact LaptopDoctor for professional PC and laptop repair services." />
      </Helmet>

      <section className="pt-24 pb-20 bg-navy-900 min-h-screen">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{t('contact.title')}</h1>
            <p className="text-gray-400 text-lg">{t('contact.subtitle')}</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-6">
              {contactInfo.map((item, i) => (
                <motion.div key={i} {...fadeInUp} transition={{ ...fadeInUp.transition, delay: i * 0.1 }}
                  className="flex items-start gap-4 p-4 rounded-xl bg-navy-800 border border-navy-700">
                  <item.icon className={`text-2xl shrink-0 mt-1 ${item.color || 'text-gold'}`} />
                  <div>
                    <p className="text-sm text-gray-400">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined}
                        rel="noopener noreferrer" className="text-white hover:text-gold transition-colors whitespace-pre-line">
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-white whitespace-pre-line">{item.value}</p>
                    )}
                  </div>
                </motion.div>
              ))}

              {/* Emergency CTA */}
              <motion.div {...fadeInUp} className="p-6 rounded-xl bg-red-900/20 border border-red-500/30">
                <h3 className="text-white font-semibold mb-2">{t('contact.emergency')}</h3>
                <p className="text-gray-400 text-sm mb-4">{t('contact.emergencyDesc')}</p>
                <a
                  href="https://wa.me/972500000000?text=EMERGENCY%20REPAIR%20NEEDED"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-500 transition-all"
                >
                  <FaWhatsapp /> {t('contact.emergencyButton')}
                </a>
              </motion.div>

              {/* Map */}
              <motion.div {...fadeInUp} className="rounded-xl overflow-hidden border border-navy-700 h-64">
                <iframe
                  title="LaptopDoctor Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3381.5!2d34.78!3d32.08!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzLCsDA0JzQ4LjAiTiAzNMKwNDYnNDguMCJF!5e0!3m2!1sen!2sil!4v1"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                />
              </motion.div>
            </div>

            {/* Contact Form */}
            <motion.div {...fadeInUp} transition={{ delay: 0.3 }}>
              <div className="bg-navy-800 p-8 rounded-2xl border border-navy-700">
                <h2 className="text-xl font-bold text-white mb-6">{t('contact.formTitle')}</h2>

                {sent && (
                  <div className="mb-4 p-3 rounded-lg bg-green-900/30 border border-green-500/30 text-green-400 text-sm">{t('contact.sent')}</div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="contact-name" className="block text-sm text-gray-300 mb-1">{t('contact.name')}</label>
                    <input id="contact-name" required value={form.name} onChange={(e) => setForm(p => ({ ...p, name: e.target.value }))}
                      className="w-full px-4 py-3 bg-navy-700 border border-navy-600 rounded-xl text-white focus:border-gold outline-none" />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="block text-sm text-gray-300 mb-1">{t('contact.email')}</label>
                    <input id="contact-email" type="email" required value={form.email} onChange={(e) => setForm(p => ({ ...p, email: e.target.value }))}
                      className="w-full px-4 py-3 bg-navy-700 border border-navy-600 rounded-xl text-white focus:border-gold outline-none" />
                  </div>
                  <div>
                    <label htmlFor="contact-message" className="block text-sm text-gray-300 mb-1">{t('contact.message')}</label>
                    <textarea id="contact-message" required rows={5} value={form.message} onChange={(e) => setForm(p => ({ ...p, message: e.target.value }))}
                      className="w-full px-4 py-3 bg-navy-700 border border-navy-600 rounded-xl text-white focus:border-gold outline-none resize-none" />
                  </div>
                  <button type="submit" className="w-full py-3 bg-gold text-navy-900 font-bold rounded-xl hover:bg-gold-light transition-all">
                    {t('contact.send')}
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
