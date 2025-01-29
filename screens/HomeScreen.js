import React from 'react';
import { View, Text, Button, StyleSheet, ImageBackground } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <ImageBackground
      source={{ uri: 'https://example.com/background.jpg' }} // Image de fond élégante
      style={styles.container}
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Détection de Tumeurs Pulmonaires</Text>
        <Button
          title="Commencer la détection"
          onPress={() => navigation.navigate('Detection')}
          color="#07501c"
          style={styles.button}
        />
        <Button
          title="Consulter les résultats précédents"
          onPress={() => navigation.navigate('Results')}
          color="#07501c"
          style={styles.button}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Ombre pour une meilleure lisibilité
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 30,
    textAlign: 'center',
  },
  button: {
    marginTop: 20,
    width: '80%',
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#07501c',
  },
});
