import React from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';

export default function ResultsScreen({ navigation }) {
  const results = [
    { id: '1', date: '2025-01-01', result: 'Tumor detected' },
    { id: '2', date: '2025-01-02', result: 'No tumor detected' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Historique des résultats</Text>
      <FlatList
        data={results}
        renderItem={({ item }) => (
          <View style={styles.resultItem}>
            <Text style={styles.date}>Date: {item.date}</Text>
            <Text style={styles.result}>Résultat: {item.result}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
      <Button title="Retour à l'accueil" onPress={() => navigation.navigate('Home')} color="#07501c" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },
  resultItem: {
    padding: 20,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '90%',
  },
  date: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#555',
  },
  result: {
    fontSize: 16,
    color: '#07501c',
  },
});
