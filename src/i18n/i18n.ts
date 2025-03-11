import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { DEFAULT_LANGUAGE } from '@configs/setup';

const initI18n = async () => {
  await i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: DEFAULT_LANGUAGE,
    debug: true,
  });
};

initI18n().catch((error) => {
  console.error('Error initializing i18next:', error);
});

export default i18n;
