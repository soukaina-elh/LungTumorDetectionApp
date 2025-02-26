import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SettingsContext } from '../contexts/SettingsContext';

// 📌 Traductions en plusieurs langues
const translations = {
  en: { title: "About the App", description: "This app uses AI to detect lung tumors and assist in medical diagnosis.", version: "Version: 1.0.0" },
  fr: { title: "À propos de l'application", description: "Cette application utilise l'IA pour détecter les tumeurs pulmonaires et aider au diagnostic médical.", version: "Version : 1.0.0" },
  ar: { title: "حول التطبيق", description: "يستخدم هذا التطبيق الذكاء الاصطناعي لاكتشاف أورام الرئة والمساعدة في التشخيص الطبي.", version: "الإصدار: 1.0.0" },
  es: { title: "Acerca de la aplicación", description: "Esta aplicación usa IA para detectar tumores pulmonares y ayudar en el diagnóstico médico.", version: "Versión: 1.0.0" },
  zh: { title: "关于应用程序", description: "该应用程序使用人工智能检测肺部肿瘤并协助医疗诊断。", version: "版本: 1.0.0" },
  de: { title: "Über die App", description: "Diese App nutzt KI zur Erkennung von Lungentumoren und zur Unterstützung der medizinischen Diagnose.", version: "Version: 1.0.0" }
};

const AboutScreen = () => {
  const { isDarkMode, language } = useContext(SettingsContext);
  const langData = translations[language] || translations.en;

  return (
    <View style={[styles.container, isDarkMode && styles.darkContainer]}>
      <Text style={[styles.title, isDarkMode && styles.darkText]}>{langData.title}</Text>
      <Text style={[styles.description, isDarkMode && styles.darkText]}>{langData.description}</Text>
      <Text style={[styles.version, isDarkMode && styles.darkVersion]}>{langData.version}</Text>
    </View>
  );
};

// 🎨 **Styles modernisés**
const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20, backgroundColor: '#f5f5f5' },
  darkContainer: { backgroundColor: '#121212' }, // 🌙 Mode sombre
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10, color: '#333' },
  darkText: { color: '#ddd' }, // 🌙 Texte en mode sombre
  description: { fontSize: 16, textAlign: 'center', color: '#666', marginBottom: 20 },
  version: { fontSize: 14, color: '#888' },
  darkVersion: { color: '#bbb' } // 🌙 Version en mode sombre
});

export default AboutScreen;
