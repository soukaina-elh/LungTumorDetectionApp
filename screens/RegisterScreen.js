import React, { useState } from "react";
import { 
  View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator 
} from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebaseConfig";
import { Ionicons } from "@expo/vector-icons";

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [secureText, setSecureText] = useState(true);

  const validateEmail = (email) => {
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const handleRegister = async () => {
    if (!validateEmail(email)) {
      Alert.alert("Erreur", "Veuillez entrer une adresse e-mail valide.");
      return;
    }
    if (!validatePassword(password)) {
      Alert.alert("Erreur", "Le mot de passe doit contenir au moins 6 caractères.");
      return;
    }

    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert("Inscription réussie !", "Vous êtes maintenant inscrit.");
      navigation.replace("Home");
    } catch (error) {
      let errorMessage = "Une erreur est survenue.";
      if (error.code === "auth/email-already-in-use") {
        errorMessage = "Cet e-mail est déjà utilisé.";
      } else if (error.code === "auth/invalid-email") {
        errorMessage = "L'e-mail n'est pas valide.";
      } else if (error.code === "auth/weak-password") {
        errorMessage = "Le mot de passe est trop faible.";
      }
      Alert.alert("Erreur", errorMessage);
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Créer un compte</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        placeholderTextColor="#aaa"
      />
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Mot de passe"
          secureTextEntry={secureText}
          value={password}
          onChangeText={setPassword}
          autoCapitalize="none"
          placeholderTextColor="#aaa"
        />
        <TouchableOpacity onPress={() => setSecureText(!secureText)}>
          <Ionicons
            name={secureText ? "eye-off" : "eye"}
            size={24}
            color="gray"
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={loading}>
        {loading ? <ActivityIndicator color="white" /> : <Text style={styles.buttonText}>S'inscrire</Text>}
      </TouchableOpacity>
      <Text style={styles.link} onPress={() => navigation.navigate("Login")}>
        Déjà un compte ? Se connecter
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#07501c",
  },
  input: {
    width: "90%",
    padding: 12,
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
    borderColor: "#ddd",
    fontSize: 16,
    backgroundColor: "#fff",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#ddd",
    backgroundColor: "#fff",
    paddingRight: 10,
  },
  passwordInput: {
    flex: 1,
    padding: 12,
    fontSize: 16,
  },
  button: {
    width: "90%",
    padding: 15,
    backgroundColor: "#07501c",
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  link: {
    marginTop: 15,
    color: "blue",
    textDecorationLine: "underline",
  },
});

export default RegisterScreen;
