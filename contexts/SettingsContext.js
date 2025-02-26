import React, { createContext, useState } from 'react';

export const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState('fr');

  return (
    <SettingsContext.Provider value={{ isDarkMode, setIsDarkMode, language, setLanguage }}>
      {children}
    </SettingsContext.Provider>
  );
};
