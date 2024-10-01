// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          // Your English translations here
          "welcome": "Welcome to the App",
          "language": "Language"
        },
      },
      vi: {
        translation: {
          // Your Vietnamese translations here
          "welcome": "Chào mừng đến với ứng dụng",
          "language": "Ngôn ngữ"
        },
      },
    },
    lng: "en", // default language
    fallbackLng: "en", // fallback language
    interpolation: {
      escapeValue: false, // React already escapes values
    },
  });

export default i18n;
