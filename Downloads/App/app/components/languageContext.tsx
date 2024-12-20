"use client";
import React, { createContext, useContext, useState } from 'react';
import i18n from './i18n';
import { getCookie } from './cookieMgment';
// Create a context for the language
const LanguageContext = createContext<any>(null);

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<string>(getCookie('language') ? getCookie('language') : 'en');

  const handleLanguageChange = (language: string) => {
    setLanguage(language);
    document.cookie = `language=${language}`;
    console.log("Language changed to:", language);
    i18n.setLang(language); // Assuming i18n is your internationalization utility
  };

  return (
    <LanguageContext.Provider value={{ language, handleLanguageChange }}>
      {children}
    </LanguageContext.Provider>
  );
};
