import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { SettingsContext } from '../contexts/SettingsContext';

// 📌 Traductions
const translations = {
  en: { title: "Upload an image for analysis", choose: "Choose Image", capture: "Capture Photo", analyze: "Analyze Image", result: "Result" },
  fr: { title: "Téléchargez une image pour analyse", choose: "Choisir une image", capture: "Prendre une photo", analyze: "Analyser l'image", result: "Résultat" },
  ar: { title: "تحميل صورة للتحليل", choose: "اختر صورة", capture: "التقط صورة", analyze: "تحليل الصورة", result: "النتيجة" },
  es: { title: "Sube una imagen para analizar", choose: "Elegir imagen", capture: "Tomar foto", analyze: "Analizar imagen", result: "Resultado" },
  zh: { title: "上传图片进行分析", choose: "选择图片", capture: "拍照", analyze: "分析图片", result: "结果" },
  de: { title: "Bild zur Analyse hochladen", choose: "Bild auswählen", capture: "Foto aufnehmen", analyze: "Bild analysieren", result: "Ergebnis" }
};

export default function DetectionScreen() {
  const { isDarkMode, language } = useContext(SettingsContext);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    const requestPermission = async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted' || cameraStatus !== 'granted') {
        Alert.alert('Permission requise', 'Veuillez autoriser l’accès aux images et à la caméra.');
      }
    };
    requestPermission();
  }, []);

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Erreur', 'Une erreur est survenue lors du choix de l’image.');
    }
  };

  const captureImage = async () => {
    try {
      let result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Erreur', 'Impossible de capturer une photo.');
    }
  };

  const analyzeImage = async () => {
    if (!image) {
      Alert.alert('Aucune image', 'Veuillez sélectionner une image avant de l’analyser.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('https://your-backend.com/analyze', {
        method: 'POST',
        body: JSON.stringify({ image }),
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await response.json();
      setResult(data.result);
    } catch (error) {
      Alert.alert('Erreur', 'Une erreur est survenue lors de l’analyse de l’image.');
    }
    setLoading(false);
  };

  return (
    <View style={[styles.container, isDarkMode && styles.darkContainer]}>
      <Text style={[styles.title, isDarkMode && styles.darkText]}>
        {translations[language]?.title || translations.en.title}
      </Text>

      {/* 📸 Boutons de sélection et capture */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={pickImage}>
          <Ionicons name="image-outline" size={22} color="white" />
          <Text style={styles.buttonText}>{translations[language]?.choose || translations.en.choose}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={captureImage}>
          <Ionicons name="camera-outline" size={22} color="white" />
          <Text style={styles.buttonText}>{translations[language]?.capture || translations.en.capture}</Text>
        </TouchableOpacity>
      </View>

      {/* 📷 Affichage de l'image sélectionnée */}
      {image && <Image source={{ uri: image }} style={styles.image} />}

      {/* 🧪 Bouton d’analyse */}
      <TouchableOpacity style={styles.analyzeButton} onPress={analyzeImage}>
        <Ionicons name="search-outline" size={22} color="white" />
        <Text style={styles.buttonText}>{translations[language]?.analyze || translations.en.analyze}</Text>
      </TouchableOpacity>

      {/* ⏳ Affichage du chargement */}
      {loading && <ActivityIndicator size="large" color="#fff" style={{ marginTop: 20 }} />}

      {/* 🔍 Affichage du résultat */}
      {result && <Text style={styles.result}>{translations[language]?.result || translations.en.result}: {result}</Text>}
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
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  darkText: {
    color: '#ddd',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#07501c',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  analyzeButton: {
    flexDirection: 'row',
    backgroundColor: '#e67e22',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  image: {
    width: 250,
    height: 250,
    marginTop: 20,
    borderRadius: 15,
    borderColor: '#ddd',
    borderWidth: 2,
  },
  result: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#07501c',
  },
});
