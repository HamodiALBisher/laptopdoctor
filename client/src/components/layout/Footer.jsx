import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FiMonitor, FiPhone, FiMail, FiMapPin } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

export default function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy-900 border-t border-navy-700" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center gap-2 text-xl font-bold text-white mb-4">
              <FiMonitor className="text-gold text-2xl" />
              <span>Laptop<span className="text-gold">Doctor</span></span>
            </Link>
            <p className="text-gray-400 text-sm">{t('footer.tagline')}</p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">{t('nav.services')}</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/services" className="hover:text-gold transition-colors">{t('services.laptopRepair')}</Link></li>
              <li><Link to="/services" className="hover:text-gold transition-colors">{t('services.dataRecovery')}</Link></li>
              <li><Link to="/services" className="hover:text-gold transition-colors">{t('services.virus')}</Link></li>
              <li><Link to="/services" className="hover:text-gold transition-colors">{t('services.remote')}</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">{t('nav.contact')}</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-center gap-2"><FiPhone className="text-gold" /> +972-50-000-0000</li>
              <li className="flex items-center gap-2"><FiMail className="text-gold" /> info@laptopdoctor.com</li>
              <li className="flex items-center gap-2"><FiMapPin className="text-gold" /> {t('contact.locationValue')}</li>
              <li>
                <a
                  href="https://wa.me/972500000000?text=Hello%20LaptopDoctor"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-green-400 transition-colors"
                >
                  <FaWhatsapp className="text-green-400" /> WhatsApp
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Links</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/about" className="hover:text-gold transition-colors">{t('nav.about')}</Link></li>
              <li><Link to="/faq" className="hover:text-gold transition-colors">{t('nav.faq')}</Link></li>
              <li><Link to="/accessibility" className="hover:text-gold transition-colors">{t('nav.accessibility')}</Link></li>
              <li><Link to="/booking" className="hover:text-gold transition-colors">{t('nav.bookRepair')}</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-navy-700 text-center text-sm text-gray-500">
          <p>&copy; {year} LaptopDoctor. {t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  );
}
