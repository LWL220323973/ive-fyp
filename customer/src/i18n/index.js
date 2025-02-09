import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en.json';
import zh_TW from './zh-TW.json';
import zh_CN from './zh-CN.json';

const resources = {
  en: { translation: en },
  zh_TW: { translation: zh_TW },
  zh_CN: { translation: zh_CN },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'zh_TW', // 預設語言
    fallbackLng: 'zh_TW',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
