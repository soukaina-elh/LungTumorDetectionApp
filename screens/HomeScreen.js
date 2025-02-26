  
  import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { SettingsContext } from '../contexts/SettingsContext';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

// 📌 Traductions en plusieurs langues
const translations = {
  en: { title: "Lung Tumor Detection", start: "Start Detection", results: "View Results", profile: "Profile", settings: "Settings" },
  fr: { title: "Détection de Tumeurs Pulmonaires", start: "Commencer la détection", results: "Consulter les résultats", profile: "Profil", settings: "Paramètres" },
  ar: { title: "كشف الأورام الرئوية", start: "بدء الفحص", results: "عرض النتائج", profile: "الملف الشخصي", settings: "الإعدادات" },
  es: { title: "Detección de Tumores Pulmonares", start: "Iniciar detección", results: "Ver resultados", profile: "Perfil", settings: "Configuración" },
  zh: { title: "肺部肿瘤检测", start: "开始检测", results: "查看结果", profile: "个人资料", settings: "设置" },
  de: { title: "Lungentumorerkennung", start: "Erkennung starten", results: "Ergebnisse anzeigen", profile: "Profil", settings: "Einstellungen" }
};

export default function HomeScreen() {
  const { isDarkMode, language } = useContext(SettingsContext);
  const navigation = useNavigation();
  const langData = translations[language] || translations.en;

  return (
    <ImageBackground
    source={{ uri: 'https://us.123rf.com/450wm/natalimis/natalimis1804/natalimis180400025/98855653-m%C3%A9decin-examine-les-poumons-humains-sur-fond-bleu.jpg?ver=6/background.jpg' }}
    style={styles.container}
    > 
      <View style={[styles.overlay, isDarkMode && styles.darkOverlay]}>
        <Text style={[styles.title, isDarkMode && styles.darkText]}>{langData.title}</Text>

        {/* 📌 Boutons de navigation */}
        <MenuButton icon="scan-outline" text={langData.start} onPress={() => navigation.navigate('Detection')} isDarkMode={isDarkMode} />
        <MenuButton icon="list-outline" text={langData.results} onPress={() => navigation.navigate('Results')} isDarkMode={isDarkMode} />
        <MenuButton icon="person-circle-outline" text={langData.profile} onPress={() => navigation.navigate('Profil')} isDarkMode={isDarkMode} />
        <MenuButton icon="settings-outline" text={langData.settings} onPress={() => navigation.navigate('Paramètres')} isDarkMode={isDarkMode} />
      </View>
    </ImageBackground>
  );
}

// 🔘 Composant réutilisable pour les boutons avec prise en charge du mode sombre
const MenuButton = ({ icon, text, onPress, isDarkMode }) => (
  <TouchableOpacity style={[styles.button, isDarkMode && styles.darkButton]} onPress={onPress}>
    <Ionicons name={icon} size={22} color="white" style={styles.icon} />
    <Text style={styles.buttonText}>{text}</Text>
  </TouchableOpacity>
);

// 🎨 **Styles améliorés**
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  overlay: { 
    backgroundColor: 'rgba(0, 0, 0, 0.6)', 
    borderRadius: 15, 
    padding: 25, 
    width: '85%', 
    alignItems: 'center' 
  },
  darkOverlay: { backgroundColor: 'rgba(30, 30, 30, 0.9)' },
  title: { fontSize: 24, fontWeight: 'bold', color: 'white', marginBottom: 20, textAlign: 'center' },
  darkText: { color: '#ddd' },
  button: { 
    flexDirection: 'row', 
    backgroundColor: '#0A5C1D', 
    paddingVertical: 12, 
    paddingHorizontal: 20, 
    borderRadius: 10, 
    marginVertical: 8, 
    width: '100%', 
    alignItems: 'center', 
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5
  },
  darkButton: { backgroundColor: '#14401E' }, // 🌙 Mode sombre
  icon: { marginRight: 10 },
  buttonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
});

