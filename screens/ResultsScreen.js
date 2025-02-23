import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ResultsScreen({ navigation }) {
  const results = [
    { id: '1', date: '2025-01-01', result: 'Tumor detected' },
    { id: '2', date: '2025-01-02', result: 'No tumor detected' },
  ];

  const getResultColor = (result) => {
    return result === 'Tumor detected' ? '#d9534f' : '#5cb85c'; // Rouge pour positif, vert pour négatif
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Historique des résultats</Text>
      
      {results.length === 0 ? (
        <Text style={styles.emptyText}>Aucun résultat disponible</Text>
      ) : (
        <FlatList
          data={results}
          renderItem={({ item }) => (
            <View style={[styles.resultItem, { borderLeftColor: getResultColor(item.result) }]}>
              <View style={styles.resultHeader}>
                <Ionicons 
                  name={item.result === 'Tumor detected' ? 'warning-outline' : 'checkmark-circle-outline'}
                  size={24}
                  color={getResultColor(item.result)}
                />
                <Text style={styles.date}>{item.date}</Text>
              </View>
              <Text style={[styles.result, { color: getResultColor(item.result) }]}>
                {item.result}
              </Text>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      )}

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
        <Text style={styles.buttonText}>Retour à l'accueil</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#07501c',
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: '#777',
    textAlign: 'center',
    marginTop: 50,
  },
  resultItem: {
    padding: 15,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    width: '100%',
    borderLeftWidth: 6,
  },
  resultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  date: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#333',
  },
  result: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#07501c',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

