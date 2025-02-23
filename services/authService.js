import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut 
} from 'firebase/auth';
import { auth } from '../config/firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 📌 Messages d'erreur traduits
const translateError = (errorCode) => {
  const errorMessages = {
    'auth/email-already-in-use': "L'email est déjà utilisé.",
    'auth/invalid-email': "L'email n'est pas valide.",
    'auth/weak-password': "Le mot de passe est trop faible.",
    'auth/user-not-found': "Aucun utilisateur trouvé.",
    'auth/wrong-password': "Mot de passe incorrect.",
    'auth/network-request-failed': "Problème de connexion. Vérifiez votre réseau.",
  };
  return errorMessages[errorCode] || "Une erreur inconnue s'est produite.";
};

// 📌 Inscription
export const registerUser = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await AsyncStorage.setItem('user', JSON.stringify(userCredential.user)); // Sauvegarde de l'utilisateur
    return userCredential.user;
  } catch (error) {
    throw new Error(translateError(error.code));
  }
};

// 📌 Connexion
export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    await AsyncStorage.setItem('user', JSON.stringify(userCredential.user)); // Sauvegarde de l'utilisateur
    return userCredential.user;
  } catch (error) {
    throw new Error(translateError(error.code));
  }
};

// 📌 Déconnexion
export const logoutUser = async () => {
  try {
    await signOut(auth);
    await AsyncStorage.removeItem('user'); // Suppression de la session
    return "Déconnexion réussie.";
  } catch (error) {
    throw new Error("Erreur lors de la déconnexion.");
  }
};
