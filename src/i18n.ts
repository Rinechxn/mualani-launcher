import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enUS from './locales/en-US.json';
import thTH from './locales/th-TH.json';
import jaJP from './locales/ja-JP.json';
import idID from './locales/id-ID.json';
import ruRU from './locales/ru-RU.json';
import cnZH from './locales/cn-ZH.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      'en-US': { translation: enUS },
      'th-TH': { translation: thTH },
      'ja-JP': { translation: jaJP },
      'id-ID': { translation: idID },
      'ru-RU': { translation: ruRU },
      'cn-ZH': { translation: cnZH },
    },

    fallbackLng: 'en-US',
    interpolation: {
      escapeValue: false, // React already safes from XSS
    },
  });

export default i18n;