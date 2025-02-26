import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Image, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { SettingsContext } from '../contexts/SettingsContext';

// 📌 Traductions
const translations = {
  en: { title: "My Profile", name: "Name", email: "Email", save: "Save", logout: "Logout", success: "Profile updated successfully!" },
  fr: { title: "Mon Profil", name: "Nom", email: "Email", save: "Sauvegarder", logout: "Se Déconnecter", success: "Profil mis à jour avec succès !" },
  ar: { title: "ملفي الشخصي", name: "الاسم", email: "البريد الإلكتروني", save: "حفظ", logout: "تسجيل خروج", success: "تم تحديث الملف الشخصي بنجاح!" },
  es: { title: "Mi Perfil", name: "Nombre", email: "Correo", save: "Guardar", logout: "Cerrar sesión", success: "¡Perfil actualizado con éxito!" },
  zh: { title: "我的个人资料", name: "姓名", email: "电子邮件", save: "保存", logout: "登出", success: "个人资料更新成功！" },
  de: { title: "Mein Profil", name: "Name", email: "E-Mail", save: "Speichern", logout: "Abmelden", success: "Profil erfolgreich aktualisiert!" }
};

export default function ProfileScreen() {
  const { isDarkMode, language } = useContext(SettingsContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Charger les données sauvegardées
    const loadProfile = async () => {
      const savedName = await AsyncStorage.getItem('userName');
      const savedEmail = await AsyncStorage.getItem('userEmail');
      const savedImage = await AsyncStorage.getItem('userImage');
      if (savedName) setName(savedName);
      if (savedEmail) setEmail(savedEmail);
      if (savedImage) setImage(savedImage);
    };
    loadProfile();
  }, []);

  const saveProfile = async () => {
    setLoading(true);
    await AsyncStorage.setItem('userName', name);
    await AsyncStorage.setItem('userEmail', email);
    if (image) {
      await AsyncStorage.setItem('userImage', image);
    }
    setLoading(false);
    setMessage(translations[language]?.success || translations.en.success);
    setTimeout(() => setMessage(''), 3000);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const logout = async () => {
    await AsyncStorage.clear();
    Alert.alert("Déconnexion", "Vous avez été déconnecté !");
  };

  return (
    <View style={[styles.container, isDarkMode && styles.darkContainer]}>
      <Text style={[styles.title, isDarkMode && styles.darkText]}>
        {translations[language]?.title || translations.en.title}
      </Text>

      {/* 📷 Image de profil */}
      <TouchableOpacity onPress={pickImage}>
        {image ? (
          <Image source={{ uri: image }} style={styles.profileImage} />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Ionicons name="person-circle-outline" size={100} color="#bbb" />
          </View>
        )}
      </TouchableOpacity>

      {/* 📝 Formulaire de profil */}
      <TextInput
        style={[styles.input, isDarkMode && styles.darkInput]}
        value={name}
        onChangeText={setName}
        placeholder={translations[language]?.name || translations.en.name}
        placeholderTextColor={isDarkMode ? "#bbb" : "#aaa"}
      />
      <TextInput
        style={[styles.input, isDarkMode && styles.darkInput]}
        value={email}
        onChangeText={setEmail}
        placeholder={translations[language]?.email || translations.en.email}
        keyboardType="email-address"
        placeholderTextColor={isDarkMode ? "#bbb" : "#aaa"}
      />

      {/* 💾 Bouton sauvegarde */}
      <TouchableOpacity style={styles.button} onPress={saveProfile} disabled={loading}>
        {loading ? <ActivityIndicator color="white" /> : <Text style={styles.buttonText}>{translations[language]?.save || translations.en.save}</Text>}
      </TouchableOpacity>

      {/* 🟢 Message de succès */}
      {message ? <Text style={styles.successMessage}>{message}</Text> : null}

      {/* 🚪 Bouton de déconnexion */}
      <TouchableOpacity style={styles.logoutButton} onPress={logout}>
        <Ionicons name="log-out-outline" size={20} color="white" />
        <Text style={styles.logoutText}>{translations[language]?.logout || translations.en.logout}</Text>
      </TouchableOpacity>
    </View>
  );
}

// 🎨 **Styles améliorés**
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    padding: 20,
  },
  darkContainer: {
    backgroundColor: '#1e1e1e',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#07501c',
  },
  darkText: {
    color: '#ddd',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
    borderWidth: 3,
    borderColor: '#07501c',
  },
  imagePlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    height: 50,
    width: '80%',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    paddingLeft: 10,
    fontSize: 18,
    backgroundColor: '#fff',
  },
  darkInput: {
    backgroundColor: '#2a2a2a',
    color: '#ddd',
    borderColor: '#555',
  },
  button: {
    width: '80%',
    padding: 15,
    backgroundColor: '#07501c',
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  successMessage: {
    marginTop: 15,
    color: 'green',
    fontSize: 16,
    fontWeight: 'bold',
  },
  logoutButton: {
    flexDirection: 'row',
    marginTop: 30,
    backgroundColor: '#d9534f',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  logoutText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 8,
    fontWeight: 'bold',
  },
});
