import React, { useState, useEffect } from 'react';
import { View, Text, Switch, StyleSheet, Appearance } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as Localization from 'expo-localization';  // Changement ici

// 📌 Traductions
const translations = {
  en: { title: "Settings", darkMode: "Dark Mode", language: "Language" },
  fr: { title: "Paramètres", darkMode: "Mode Sombre", language: "Langue" },
  ar: { title: "الإعدادات", darkMode: "الوضع الداكن", language: "اللغة" },
  es: { title: "Ajustes", darkMode: "Modo Oscuro", language: "Idioma" },
  zh: { title: "设定", darkMode: "深色模式", language: "语言" },
  de: { title: "Einstellungen", darkMode: "Dunkler Modus", language: "Sprache" }
};

export default function SettingsScreen() {
  const systemTheme = Appearance.getColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(systemTheme === 'dark');
  const [language, setLanguage] = useState('fr');

  useEffect(() => {
    const deviceLanguage = Localization.locale.split('-')[0]; // Récupère la langue du système
    setLanguage(deviceLanguage);
  }, []);

  return (
    <View style={[styles.container, isDarkMode && styles.darkContainer]}>
      {/* 🏷️ Titre */}
      <Text style={[styles.title, isDarkMode && styles.darkText]}>
        {translations[language]?.title || translations.en.title}
      </Text>

      {/* 🌙 Mode sombre */}
      <View style={styles.switchContainer}>
        <Text style={[styles.text, isDarkMode && styles.darkText]}>
          {translations[language]?.darkMode || translations.en.darkMode}
        </Text>
        <Switch
          value={isDarkMode}
          onValueChange={() => setIsDarkMode(!isDarkMode)}
        />
      </View>

      {/* 🌍 Sélecteur de langue */}
      <View style={styles.pickerContainer}>
        <Text style={[styles.text, isDarkMode && styles.darkText]}>
          {translations[language]?.language || translations.en.language}
        </Text>
        <Picker
          selectedValue={language}
          style={[styles.picker, isDarkMode && styles.darkPicker]}
          onValueChange={(value) => setLanguage(value)}
        >
          <Picker.Item label="🇫🇷 Français" value="fr" />
          <Picker.Item label="🇬🇧 English" value="en" />
          <Picker.Item label="🇪🇸 Español" value="es" />
          <Picker.Item label="🇨🇳 中文" value="zh" />
          <Picker.Item label="🇩🇪 Deutsch" value="de" />
          <Picker.Item label="🇸🇦 العربية" value="ar" />
        </Picker>
      </View>
    </View>
  );
}

// 🎨 Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  darkContainer: {
    backgroundColor: '#1e1e1e',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  darkText: {
    color: '#fff',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '80%',
    marginVertical: 10,
  },
  text: {
    fontSize: 18,
    marginRight: 10,
  },
  pickerContainer: {
    width: '80%',
    marginTop: 20,
  },
  picker: {
    height: 50,
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  darkPicker: {
    backgroundColor: '#444',
    color: '#fff',
  },
});