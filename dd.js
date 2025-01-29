import React, { useState, useEffect } from 'react';
import { Button, Image, Platform, Text, View, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function App() {
  const [image, setImage] = useState(null);
  const [permission, setPermission] = useState(null);

  useEffect(() => {
    (async () => {
      // Demander la permission d'accès à la bibliothèque multimédia
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setPermission(status === 'granted');
    })();
  }, []);

  const pickImage = async () => {
    if (permission === null) {
      alert('Permission is still loading...');
      return;
    }

    if (permission === false) {
      alert('Permission to access media library is required!');
      return;
    }

    // Ouvrir la galerie d'images
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.uri);
    }
  };

  const takePhoto = async () => {
    if (permission === null) {
      alert('Permission is still loading...');
      return;
    }

    if (permission === false) {
      alert('Permission to access media library is required!');
      return;
    }

    // Prendre une photo
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.uri);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lung Tumor Detection App</Text>

      <Button title="Pick an Image from Gallery" onPress={pickImage} />
      <Button title="Take a Photo" onPress={takePhoto} />

      {image && <Image source={{ uri: image }} style={styles.image} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
  },
});
