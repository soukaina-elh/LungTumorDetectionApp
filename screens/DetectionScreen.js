import React, { useState, useEffect } from 'react';
import { View, Text, Button, Image, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function DetectionScreen() {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    const requestPermission = async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission requise', 'Veuillez autoriser l’accès aux images.');
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
        setImage(result.assets[0].uri); // ✅ Correction ici
      }
    } catch (error) {
      Alert.alert('Erreur', 'Une erreur est survenue lors du choix de l’image.');
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
        body: JSON.stringify({ image: image }),
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
    <View style={styles.container}>
      <Text style={styles.title}>Téléchargez une image pour analyse</Text>
      <Button title="Choisir une image" onPress={pickImage} color="#07501c" />
      {image && <Image source={{ uri: image }} style={styles.image} />}
      <Button title="Analyser l'image" onPress={analyzeImage} color="#07501c" />
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      {result && <Text style={styles.result}>Résultat: {result}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
    textAlign: 'center',
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

