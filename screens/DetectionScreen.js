import React, { useState, useEffect } from 'react';
import { View, Text, Button, Image, StyleSheet, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function DetectionScreen() {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    const requestPermission = async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission required for image access');
      }
    };
    requestPermission();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.uri);
    }
  };

  const analyzeImage = async () => {
    setLoading(true);
    const response = await fetch('https://your-backend.com/analyze', {
      method: 'POST',
      body: JSON.stringify({ image: image }),
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await response.json();
    setResult(data.result);
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Téléchargez une image pour analyse</Text>
      <Button title="Choisir une image" onPress={pickImage} color="#07501c" style={styles.button} />
      {image && <Image source={{ uri: image }} style={styles.image} />}
      <Button title="Analyser l'image" onPress={analyzeImage} color="#07501c" style={styles.button} />
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
  },
  button: {
    marginTop: 20,
    width: '80%',
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#07501c',
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
