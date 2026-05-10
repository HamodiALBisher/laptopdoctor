import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FiMonitor, FiPhone, FiMail, FiMapPin } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

export default function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy-900 border-t border-navy-700/50" role="contentinfo">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <Link to="/" className="flex items-center gap-2 text-xl font-bold text-white mb-4">
              <FiMonitor className="text-gold text-2xl" />
              <span>Laptop<span className="text-gold">Doctor</span></span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">{t('footer.tagline')}</p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">{t('nav.services')}</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link to="/services" className="hover:text-gold transition-colors">{t('services.laptopRepair')}</Link></li>
              <li><Link to="/services" className="hover:text-gold transition-colors">{t('services.dataRecovery')}</Link></li>
              <li><Link to="/services" className="hover:text-gold transition-colors">{t('services.virus')}</Link></li>
              <li><Link to="/services" className="hover:text-gold transition-colors">{t('services.remote')}</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">{t('nav.contact')}</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-center gap-3"><FiPhone className="text-gold shrink-0" /> +972-50-000-0000</li>
              <li className="flex items-center gap-3"><FiMail className="text-gold shrink-0" /> info@laptopdoctor.com</li>
              <li className="flex items-center gap-3"><FiMapPin className="text-gold shrink-0" /> {t('contact.locationValue')}</li>
              <li>
                <a
                  href="https://wa.me/972500000000?text=Hello%20LaptopDoctor"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 hover:text-green-400 transition-colors"
                >
                  <FaWhatsapp className="text-green-400 shrink-0" /> WhatsApp
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">Links</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link to="/about" className="hover:text-gold transition-colors">{t('nav.about')}</Link></li>
              <li><Link to="/faq" className="hover:text-gold transition-colors">{t('nav.faq')}</Link></li>
              <li><Link to="/accessibility" className="hover:text-gold transition-colors">{t('nav.accessibility')}</Link></li>
              <li><Link to="/booking" className="hover:text-gold transition-colors">{t('nav.bookRepair')}</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-navy-700/50 text-center text-sm text-gray-500">
          <p>&copy; {year} LaptopDoctor. {t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  );
}
