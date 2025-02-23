import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// 🏠 Importer les pages de ton app
import HomeScreen from './HomeScreen';
import DetectionScreen from './DetectionScreen';
import ResultsScreen from './ResultsScreen';
import ProfileScreen from './ProfileScreen';
import SettingsScreen from './SettingsScreen';

// 📌 Création du menu latéral (Drawer)
const Drawer = createDrawerNavigator();

// 📌 Création de la barre de navigation (Bottom Tabs)
const Tab = createBottomTabNavigator();

// 📌 Création d'un Stack Navigator pour une navigation plus avancée
const Stack = createStackNavigator();

// 🎨 Composant des Bottom Tabs
function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Home') iconName = 'home';
          else if (route.name === 'Detection') iconName = 'camera';
          else if (route.name === 'Results') iconName = 'analytics';
          else if (route.name === 'Profile') iconName = 'person';

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#07501c',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Detection" component={DetectionScreen} />
      <Tab.Screen name="Results" component={ResultsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

// 🎨 Composant du menu latéral
function DrawerNavigator() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Main" component={BottomTabNavigator} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
    </Drawer.Navigator>
  );
}

// 🎯 Navigation principale
export default function Navigation() {
  return (
    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>
  );
}