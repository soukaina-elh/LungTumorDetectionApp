import React, { createContext, useState, useContext } from 'react';
import { Appearance } from 'react-native';
import * as Localization from 'expo-localization';

// Initialisation du contexte
const AppContext = createContext();

// Le fournisseur de contexte
export const AppProvider = ({ children }) => {
  const systemTheme = Appearance.getColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(systemTheme === 'dark');
  const [language, setLanguage] = useState(Localization.locale.split('-')[0]);

  return (
    <AppContext.Provider value={{ isDarkMode, setIsDarkMode, language, setLanguage }}>
      {children}
    </AppContext.Provider>
  );
};

// Hook personnalisé pour utiliser le contexte
export const useAppContext = () => useContext(AppContext);
