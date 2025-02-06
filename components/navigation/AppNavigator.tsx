import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; // Importa Ionicons para iconos minimalistas
import SettingsScreen from '../ConfigScreen';
import HomeScreen from '../HomeScreen';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          // Verificar el nombre correcto del icono
          if (route.name === 'Inicio') {
            iconName = focused ? 'home' : 'home-outline'; // Icono de inicio con versión minimalista
          } else if (route.name === 'Configuración') {
            iconName = focused ? 'settings' : 'settings-outline'; // Icono de configuración minimalista
          }

          // Retorna el icono correspondiente
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'black', // Color del icono cuando está activo
        tabBarInactiveTintColor: 'gray', // Color del icono cuando está inactivo
        tabBarStyle: {
          backgroundColor: 'white', // Fondo blanco de la barra
        },
      })}
    >
      <Tab.Screen
        name="Inicio"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Configuración"
        component={SettingsScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;
