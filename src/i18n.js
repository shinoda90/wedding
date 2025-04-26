import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import translationDE from './locales/de/translation.json';
import translationEN from './locales/en/translation.json';
import translationES from './locales/es/translation.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    resources: {
      de: { translation: translationDE },
      en: { translation: translationEN },
      es: { translation: translationES },
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
