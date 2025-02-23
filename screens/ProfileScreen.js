import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProfileScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Charger les données sauvegardées
    const loadProfile = async () => {
      const savedName = await AsyncStorage.getItem('userName');
      const savedEmail = await AsyncStorage.getItem('userEmail');
      if (savedName) setName(savedName);
      if (savedEmail) setEmail(savedEmail);
    };
    loadProfile();
  }, []);

  const saveProfile = async () => {
    setLoading(true);
    await AsyncStorage.setItem('userName', name);
    await AsyncStorage.setItem('userEmail', email);
    setLoading(false);
    setMessage('Profil mis à jour avec succès !');
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mon Profil</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Nom"
        placeholderTextColor="#aaa"
      />
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        keyboardType="email-address"
        placeholderTextColor="#aaa"
      />
      <TouchableOpacity style={styles.button} onPress={saveProfile} disabled={loading}>
        {loading ? <ActivityIndicator color="white" /> : <Text style={styles.buttonText}>Sauvegarder</Text>}
      </TouchableOpacity>
      {message ? <Text style={styles.successMessage}>{message}</Text> : null}
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
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#07501c',
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
});
