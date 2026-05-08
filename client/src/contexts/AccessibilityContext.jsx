import { createContext, useContext, useState, useEffect } from 'react';

const AccessibilityContext = createContext(null);

const defaultSettings = {
  fontSize: 0,
  highContrast: false,
  grayscale: false,
  underlineLinks: false,
  reduceMotion: false
};

export function AccessibilityProvider({ children }) {
  const [settings, setSettings] = useState(() => {
    const stored = localStorage.getItem('a11ySettings');
    return stored ? JSON.parse(stored) : defaultSettings;
  });

  useEffect(() => {
    localStorage.setItem('a11ySettings', JSON.stringify(settings));
    const body = document.body;

    body.classList.remove('font-size-large', 'font-size-xlarge');
    if (settings.fontSize === 1) body.classList.add('font-size-large');
    if (settings.fontSize >= 2) body.classList.add('font-size-xlarge');

    body.classList.toggle('high-contrast', settings.highContrast);
    body.classList.toggle('grayscale', settings.grayscale);
    body.classList.toggle('underline-links', settings.underlineLinks);
    body.classList.toggle('reduce-motion', settings.reduceMotion);
  }, [settings]);

  const increaseFont = () => setSettings(s => ({ ...s, fontSize: Math.min(s.fontSize + 1, 2) }));
  const decreaseFont = () => setSettings(s => ({ ...s, fontSize: Math.max(s.fontSize - 1, 0) }));
  const toggleHighContrast = () => setSettings(s => ({ ...s, highContrast: !s.highContrast }));
  const toggleGrayscale = () => setSettings(s => ({ ...s, grayscale: !s.grayscale }));
  const toggleUnderlineLinks = () => setSettings(s => ({ ...s, underlineLinks: !s.underlineLinks }));
  const toggleReduceMotion = () => setSettings(s => ({ ...s, reduceMotion: !s.reduceMotion }));
  const resetSettings = () => setSettings(defaultSettings);

  return (
    <AccessibilityContext.Provider value={{
      settings,
      increaseFont,
      decreaseFont,
      toggleHighContrast,
      toggleGrayscale,
      toggleUnderlineLinks,
      toggleReduceMotion,
      resetSettings
    }}>
      {children}
    </AccessibilityContext.Provider>
  );
}

export const useAccessibility = () => useContext(AccessibilityContext);
