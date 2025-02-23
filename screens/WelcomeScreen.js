import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MotiView } from 'moti';

export default function WelcomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Logo ou image */}
      <Image source={{ uri: 'https://user-images.githubusercontent.com/68781375/162584408-450580c0-3354-470b-a69c-180a19802fd4.jpg' }} style={styles.logo} />

      {/* Animation du titre */}
      <MotiView from={{ opacity: 0, translateY: -20 }} animate={{ opacity: 1, translateY: 0 }} transition={{ duration: 1000 }}>
        <Text style={styles.title}>Bienvenue</Text>
      </MotiView>

      {/* Bouton "Créer un compte" */}
      <MotiView from={{ opacity: 0, translateY: 20 }} animate={{ opacity: 1, translateY: 0 }} transition={{ duration: 1000, delay: 200 }}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Register')}>
          <Text style={styles.buttonText}>Créer un compte</Text>
        </TouchableOpacity>
      </MotiView>

      {/* Bouton "Se connecter" */}
      <MotiView from={{ opacity: 0, translateY: 20 }} animate={{ opacity: 1, translateY: 0 }} transition={{ duration: 1000, delay: 400 }}>
        <TouchableOpacity style={styles.buttonOutline} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.buttonOutlineText}>Se connecter</Text>
        </TouchableOpacity>
      </MotiView>
    </View>
  );
}

// 🎨 Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EAF4EB',
    padding: 20,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2D6A4F',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#2D6A4F',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 30,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonOutline: {
    borderWidth: 2,
    borderColor: '#2D6A4F',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 30,
    marginVertical: 10,
  },
  buttonOutlineText: {
    color: '#2D6A4F',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

