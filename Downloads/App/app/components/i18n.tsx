'use client'
import { I18N } from '@gravity-ui/i18n';
import { getCookie } from './cookieMgment';
let ru:any
const en = require('../keysets/en.json');
const fr = require('../keysets/fr.json');
ru = require('../keysets/ru.json');
const ar = require('../keysets/ar.json');
const ta = require('../keysets/ta.json');
const selectedLanguage = getCookie('language') ? getCookie('language') : 'en';
const i18n = new I18N({
  lang: selectedLanguage,
  fallbackLang: 'en',
});
i18n.registerKeysets('ta', ta);
i18n.registerKeysets('ru', ru);
i18n.registerKeysets('en', en);
i18n.registerKeysets('fr', fr);
i18n.registerKeysets('ar', ar);

export const getDate = (lang: string): string => {
  const dateFormats:any = {
    en: en.DATE_FORMAT.en,
    ru: ru.DATE_FORMAT.ru,
    fr: fr.DATE_FORMAT.fr,
    ar: ar.DATE_FORMAT.ar,
  };



  return dateFormats[lang] || 'DD/MM/YYYY'; 
};

export const getTime = (lang: string): string => {
  const TIMEFormats:any = {
    en: en.TIME_FORMAT.en,
    ru: ru.TIME_FORMAT.ru,
    fr: fr.TIME_FORMAT.fr,
    ar: ar.TIME_FORMAT.ar,
  };

  return TIMEFormats[lang] || 'HH:mm:ss'; 
};
export const getZone = (lang: string): string => {
  const TIMEZone:any = {
    en: en.TIME_ZONE.en,
    ru: ru.TIME_ZONE.ru,
    fr: fr.TIME_ZONE.fr,
    ar: ar.TIME_ZONE.ar,
  };

  return TIMEZone[lang] || 'HH:mm:ss'; 
};


export default i18n;

