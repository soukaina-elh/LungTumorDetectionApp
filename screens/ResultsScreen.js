import React, { useState, useEffect, useContext } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { SettingsContext } from '../contexts/SettingsContext';
import { useIsFocused } from '@react-navigation/native';

// 📌 Traductions
const translations = {
  en: { title: "Results History", noResults: "No results available", back: "Back to Home" },
  fr: { title: "Historique des résultats", noResults: "Aucun résultat disponible", back: "Retour à l'accueil" },
  ar: { title: "تاريخ النتائج", noResults: "لا توجد نتائج متاحة", back: "العودة إلى الرئيسية" },
  es: { title: "Historial de resultados", noResults: "No hay resultados disponibles", back: "Volver al inicio" },
  zh: { title: "结果历史", noResults: "暂无结果", back: "返回首页" },
  de: { title: "Ergebnisverlauf", noResults: "Keine Ergebnisse verfügbar", back: "Zurück zur Startseite" }
};

export default function ResultsScreen({ navigation }) {
  const { isDarkMode, language } = useContext(SettingsContext);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      loadResults();
    }
  }, [isFocused]);

  const loadResults = async () => {
    setLoading(true);
    try {
      const savedResults = await AsyncStorage.getItem('scanResults');
      if (savedResults) {
        setResults(JSON.parse(savedResults));
      }
    } catch (error) {
      console.error("Erreur de chargement des résultats :", error);
    }
    setLoading(false);
  };

  const getResultColor = (result) => {
    return result === 'Tumor detected' ? '#d9534f' : '#5cb85c'; // Rouge pour positif, vert pour négatif
  };

  return (
    <View style={[styles.container, isDarkMode && styles.darkContainer]}>
      <Text style={[styles.title, isDarkMode && styles.darkText]}>
        {translations[language]?.title || translations.en.title}
      </Text>

      {loading ? (
        <ActivityIndicator size="large" color={isDarkMode ? "#bbb" : "#07501c"} />
      ) : results.length === 0 ? (
        <Text style={[styles.emptyText, isDarkMode && styles.darkText]}>
          {translations[language]?.noResults || translations.en.noResults}
        </Text>
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
                <Text style={[styles.date, isDarkMode && styles.darkText]}>{item.date}</Text>
              </View>
              <Text style={[styles.result, { color: getResultColor(item.result) }]}>
                {item.result}
              </Text>
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      )}

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
        <Ionicons name="arrow-back-outline" size={20} color="white" />
        <Text style={styles.buttonText}>{translations[language]?.back || translations.en.back}</Text>
      </TouchableOpacity>
    </View>
  );
}

// 🎨 **Styles améliorés**
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  darkContainer: {
    backgroundColor: '#1e1e1e',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#07501c',
    textAlign: 'center',
  },
  darkText: {
    color: '#ddd',
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
    flexDirection: 'row',
    marginTop: 20,
    backgroundColor: '#07501c',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});
