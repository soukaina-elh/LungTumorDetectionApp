import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// 📌 Import des écrans
import HomeScreen from './screens/HomeScreen';
import DetectionScreen from './screens/DetectionScreen';
import ResultsScreen from './screens/ResultsScreen';
import ProfileScreen from './screens/ProfileScreen';
import SettingsScreen from './screens/SettingsScreen';
import AboutScreen from './screens/AboutScreen';

// 📌 Import du Context
import { SettingsProvider } from './contexts/SettingsContext';

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

// Navigation des onglets en bas
function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Home') iconName = 'home-outline';
          else if (route.name === 'Detection') iconName = 'scan-outline';
          else if (route.name === 'Results') iconName = 'list-outline';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Detection" component={DetectionScreen} />
      <Tab.Screen name="Results" component={ResultsScreen} />
    </Tab.Navigator>
  );
}

// Navigation du menu latéral
function DrawerNavigator() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Accueil" component={BottomTabs} />
      <Drawer.Screen name="Profil" component={ProfileScreen} />
      <Drawer.Screen name="Paramètres" component={SettingsScreen} />
      <Drawer.Screen name="À propos" component={AboutScreen} />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <SettingsProvider>
      <NavigationContainer>
        <DrawerNavigator />
      </NavigationContainer>
    </SettingsProvider>
  );
}
