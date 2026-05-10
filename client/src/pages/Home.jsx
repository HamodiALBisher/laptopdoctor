import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiClock, FiShield, FiWifi, FiAward, FiArrowRight, FiMonitor, FiHardDrive, FiCpu, FiSmartphone } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { Helmet } from 'react-helmet-async';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
};

export default function Home() {
  const { t } = useTranslation();

  const trustBadges = [
    { icon: FiClock, title: t('trust.sameDayTitle'), desc: t('trust.sameDayDesc') },
    { icon: FiShield, title: t('trust.privacyTitle'), desc: t('trust.privacyDesc') },
    { icon: FiWifi, title: t('trust.remoteTitle'), desc: t('trust.remoteDesc') },
    { icon: FiAward, title: t('trust.warrantyTitle'), desc: t('trust.warrantyDesc') }
  ];

  const servicePreview = [
    { icon: FiMonitor, name: t('services.laptopRepair'), desc: t('services.laptopRepairDesc') },
    { icon: FiHardDrive, name: t('services.dataRecovery'), desc: t('services.dataRecoveryDesc') },
    { icon: FiCpu, name: t('services.gamingRepair'), desc: t('services.gamingRepairDesc') },
    { icon: FiSmartphone, name: t('services.remote'), desc: t('services.remoteDesc') }
  ];

  const reviews = [
    { name: 'Ahmed K.', text: 'Incredible service! They recovered all my important files from a dead hard drive. Highly recommended!', rating: 5 },
    { name: 'Sarah M.', text: 'Fast and professional. My laptop was fixed in just 2 hours. Fair pricing too.', rating: 5 },
    { name: 'David L.', text: 'The remote support was amazing. They fixed my Windows issues without me leaving my house.', rating: 5 },
    { name: 'Nour A.', text: 'Best PC repair service in town. They upgraded my RAM and SSD, laptop feels brand new!', rating: 5 }
  ];

  const faqs = [
    { q: t('faq.q1'), a: t('faq.a1') },
    { q: t('faq.q2'), a: t('faq.a2') },
    { q: t('faq.q7'), a: t('faq.a7') }
  ];

  return (
    <>
      <Helmet>
        <title>LaptopDoctor - Professional PC & Laptop Repair</title>
        <meta name="description" content="Fast diagnostics, reliable repairs, secure data recovery, and smart backup solutions. Professional PC and laptop repair service." />
      </Helmet>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900" />
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 25% 50%, #d4a843 0%, transparent 50%), radial-gradient(circle at 75% 50%, #22d3ee 0%, transparent 50%)' }} />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(212,168,67,0.08)_0%,_transparent_70%)]" />
        
        <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20 text-gold text-sm font-medium mb-8">
              <FiShield className="text-base" />
              Trusted by 2,000+ customers
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              {t('hero.title').split(' ').map((word, i) => (
                <span key={i} className={i >= 1 && i <= 2 ? 'text-gold' : 'text-white'}>
                  {word}{' '}
                </span>
              ))}
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
              {t('hero.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/booking"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gold text-navy-900 font-bold rounded-xl hover:bg-gold-light transition-all shadow-lg shadow-gold/20 text-lg hover:shadow-gold/40 hover:scale-[1.02]"
              >
                {t('hero.bookRepair')} <FiArrowRight />
              </Link>
              <a
                href="https://wa.me/972500000000?text=Hello%20LaptopDoctor%2C%20I%20need%20help%20with%20my%20device"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-green-600 text-white font-bold rounded-xl hover:bg-green-500 transition-all shadow-lg text-lg hover:scale-[1.02]"
              >
                <FaWhatsapp size={20} /> {t('hero.whatsapp')}
              </a>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-navy-800 to-transparent" />
      </section>

      {/* Trust Badges */}
      <section className="py-20 bg-navy-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trustBadges.map((badge, i) => (
              <motion.div
                key={i}
                {...fadeInUp}
                transition={{ ...fadeInUp.transition, delay: i * 0.1 }}
                className="text-center p-8 rounded-2xl bg-navy-700/50 border border-navy-600 hover:border-gold/30 transition-all hover:bg-navy-700/80 hover:shadow-lg hover:shadow-gold/5"
              >
                <div className="w-14 h-14 rounded-xl bg-gold/10 flex items-center justify-center mx-auto mb-4">
                  <badge.icon className="text-gold text-2xl" />
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">{badge.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{badge.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Preview */}
      <section className="py-24 bg-navy-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div {...fadeInUp} className="text-center mb-14">
            <span className="text-gold text-sm font-semibold tracking-wider uppercase">What We Do</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-3 mb-4">{t('services.title')}</h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">{t('services.subtitle')}</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {servicePreview.map((svc, i) => (
              <motion.div
                key={i}
                {...fadeInUp}
                transition={{ ...fadeInUp.transition, delay: i * 0.1 }}
                className="text-center p-8 rounded-2xl bg-navy-800 border border-navy-700 hover:border-gold/30 transition-all group hover:shadow-lg hover:shadow-gold/5"
              >
                <div className="w-16 h-16 rounded-2xl bg-cyan-accent/10 flex items-center justify-center mx-auto mb-5 group-hover:bg-gold/10 transition-colors">
                  <svc.icon className="text-cyan-accent text-3xl group-hover:text-gold transition-colors" />
                </div>
                <h3 className="text-white font-semibold text-lg mb-3">{svc.name}</h3>
                <p className="text-gray-400 text-sm mb-5 leading-relaxed">{svc.desc}</p>
                <Link to="/services" className="text-gold text-sm font-medium hover:text-gold-light transition-colors inline-flex items-center gap-1">
                  Learn more <FiArrowRight />
                </Link>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/services" className="inline-flex items-center gap-2 px-8 py-3.5 border-2 border-gold text-gold rounded-xl hover:bg-gold hover:text-navy-900 transition-all font-semibold">
              View All Services <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* Before/After */}
      <section className="py-24 bg-navy-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div {...fadeInUp} className="text-center mb-14">
            <span className="text-cyan-accent text-sm font-semibold tracking-wider uppercase">Results</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-3 mb-4">Before & After</h2>
            <p className="text-gray-400 text-lg">See the difference our expert repairs make</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { before: 'Overheating & shutdowns', after: 'Clean & cool running', service: 'Thermal Cleaning' },
              { before: 'Blue screen errors', after: 'Stable & fast system', service: 'Windows Repair' },
              { before: 'Slow boot (2+ minutes)', after: 'Fast boot (15 seconds)', service: 'SSD Upgrade' }
            ].map((item, i) => (
              <motion.div
                key={i}
                {...fadeInUp}
                transition={{ ...fadeInUp.transition, delay: i * 0.15 }}
                className="rounded-2xl bg-navy-700/50 border border-navy-600 overflow-hidden hover:border-navy-500 transition-all hover:shadow-lg"
              >
                <div className="p-8">
                  <span className="inline-block text-xs font-semibold text-gold bg-gold/10 px-3 py-1.5 rounded-full mb-5">{item.service}</span>
                  <div className="space-y-5">
                    <div className="flex items-start gap-4">
                      <div className="w-3 h-3 mt-1.5 rounded-full bg-red-500 shrink-0 ring-4 ring-red-500/20" />
                      <div>
                        <p className="text-xs text-red-400 font-semibold uppercase tracking-wide mb-1">BEFORE</p>
                        <p className="text-gray-300">{item.before}</p>
                      </div>
                    </div>
                    <div className="border-l-2 border-dashed border-navy-500 ml-1.5 h-4" />
                    <div className="flex items-start gap-4">
                      <div className="w-3 h-3 mt-1.5 rounded-full bg-green-500 shrink-0 ring-4 ring-green-500/20" />
                      <div>
                        <p className="text-xs text-green-400 font-semibold uppercase tracking-wide mb-1">AFTER</p>
                        <p className="text-gray-300">{item.after}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-24 bg-navy-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div {...fadeInUp} className="text-center mb-14">
            <span className="text-gold text-sm font-semibold tracking-wider uppercase">Testimonials</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-3 mb-4">Customer Reviews</h2>
            <p className="text-gray-400 text-lg">What our customers say about us</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {reviews.map((review, i) => (
              <motion.div
                key={i}
                {...fadeInUp}
                transition={{ ...fadeInUp.transition, delay: i * 0.1 }}
                className="p-7 rounded-2xl bg-navy-800 border border-navy-700 hover:border-gold/20 transition-all hover:shadow-lg"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(review.rating)].map((_, j) => (
                    <span key={j} className="text-gold text-lg">&#9733;</span>
                  ))}
                </div>
                <p className="text-gray-300 text-sm mb-5 italic leading-relaxed">&ldquo;{review.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold font-bold text-sm">
                    {review.name.charAt(0)}
                  </div>
                  <p className="text-white font-semibold text-sm">{review.name}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Preview */}
      <section className="py-24 bg-navy-800">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <motion.div {...fadeInUp} className="text-center mb-14">
            <span className="text-cyan-accent text-sm font-semibold tracking-wider uppercase">Got Questions?</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-3 mb-4">{t('faq.title')}</h2>
          </motion.div>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                {...fadeInUp}
                transition={{ ...fadeInUp.transition, delay: i * 0.1 }}
                className="p-6 rounded-2xl bg-navy-700/50 border border-navy-600 hover:border-navy-500 transition-all"
              >
                <h3 className="text-white font-semibold mb-3 text-lg">{faq.q}</h3>
                <p className="text-gray-400 leading-relaxed">{faq.a}</p>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/faq" className="text-gold hover:text-gold-light transition-colors font-semibold inline-flex items-center gap-2 text-lg">
              View all FAQs <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-gold/10 via-navy-900 to-cyan-accent/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(212,168,67,0.1)_0%,_transparent_50%)]" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <motion.div {...fadeInUp}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-5">Ready to Fix Your Device?</h2>
            <p className="text-gray-300 mb-10 text-lg max-w-xl mx-auto">Book your repair now and get same-day diagnostics</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/booking" className="inline-flex items-center gap-2 px-10 py-4 bg-gold text-navy-900 font-bold rounded-xl hover:bg-gold-light transition-all text-lg shadow-lg shadow-gold/20 hover:shadow-gold/40 hover:scale-[1.02]">
                {t('hero.bookRepair')} <FiArrowRight />
              </Link>
              <a
                href="https://wa.me/972500000000?text=Hello%20LaptopDoctor%2C%20I%20need%20emergency%20repair"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-10 py-4 border-2 border-red-500 text-red-400 font-bold rounded-xl hover:bg-red-500 hover:text-white transition-all text-lg hover:scale-[1.02]"
              >
                Emergency Repair
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
