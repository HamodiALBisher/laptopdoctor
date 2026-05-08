import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { FiEye } from 'react-icons/fi';
import { useAccessibility } from '../../contexts/AccessibilityContext';

export default function AccessibilityWidget() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const {
    settings,
    increaseFont,
    decreaseFont,
    toggleHighContrast,
    toggleGrayscale,
    toggleUnderlineLinks,
    toggleReduceMotion,
    resetSettings
  } = useAccessibility();

  const buttons = [
    { label: t('widget.increaseFont'), action: increaseFont, active: settings.fontSize > 0 },
    { label: t('widget.decreaseFont'), action: decreaseFont, active: false },
    { label: t('widget.highContrast'), action: toggleHighContrast, active: settings.highContrast },
    { label: t('widget.grayscale'), action: toggleGrayscale, active: settings.grayscale },
    { label: t('widget.underlineLinks'), action: toggleUnderlineLinks, active: settings.underlineLinks },
    { label: t('widget.pauseAnimations'), action: toggleReduceMotion, active: settings.reduceMotion }
  ];

  return (
    <div className="fixed bottom-6 left-6 z-50" role="region" aria-label="Accessibility options">
      <button
        onClick={() => setOpen(!open)}
        className="w-14 h-14 rounded-full bg-cyan-accent text-navy-900 shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
        aria-label={t('widget.accessibility')}
        aria-expanded={open}
      >
        <FiEye size={24} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="absolute bottom-16 left-0 w-72 bg-navy-800 border border-navy-600 rounded-xl shadow-2xl p-4"
          >
            <h3 className="text-white font-semibold mb-3 text-sm">{t('widget.accessibility')}</h3>
            <div className="space-y-2">
              {buttons.map((btn, i) => (
                <button
                  key={i}
                  onClick={btn.action}
                  className={`w-full px-3 py-2 rounded-lg text-sm text-left transition-colors ${
                    btn.active
                      ? 'bg-cyan-accent/20 text-cyan-accent border border-cyan-accent/30'
                      : 'bg-navy-700 text-gray-300 hover:bg-navy-600'
                  }`}
                >
                  {btn.label}
                </button>
              ))}
              <button
                onClick={resetSettings}
                className="w-full px-3 py-2 rounded-lg text-sm text-left bg-red-900/30 text-red-400 hover:bg-red-900/50 transition-colors mt-2"
              >
                {t('widget.reset')}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
