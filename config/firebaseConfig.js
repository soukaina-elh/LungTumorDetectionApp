
// config/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
    
    apiKey: "AIzaSyAeUx1_adbfbkghxQYGm5W6NzMXPj6Y6YY",
    authDomain: "lungtumordetectionapp.firebaseapp.com",
    projectId: "lungtumordetectionapp",
    storageBucket: "lungtumordetectionapp.firebasestorage.app",
    messagingSenderId: "371541297911",
    appId: "1:371541297911:web:9b8d0f5a396cfb36a861f2"
};

// Initialiser Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
  });
  
export { auth };
