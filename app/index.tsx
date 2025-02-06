import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../components/login';
import LoadingScreen from '../components/loadingScreen'; // Importar pantalla de carga
import CreateAccount from '../components/CreateAccount'; // Importar pantalla de creación de cuenta
import AppNavigator from '../components/navigation/AppNavigator';
import HomeScreen from '../components/HomeScreen';
import ConfigScreen from '../components/ConfigScreen';
import CreateCamp from '../components/CreateFieldScreen';
import IrrigationDetailsScreen from '../components/IrrigationsDetailsScreen';
const Stack = createStackNavigator();

const App: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="loading">
      <Stack.Screen name="loading" component={LoadingScreen} options={{ headerShown: false}} />
      <Stack.Screen name="login" component={Login} options={{ headerShown: false, gestureEnabled: false, headerLeft: () => null, }} />
      <Stack.Screen name="CreateAccount" component={CreateAccount} options={{ headerShown: false }} />
      <Stack.Screen name="Bar" component={AppNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="Inicio" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Config" component={ConfigScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Crear Campo" component={CreateCamp} options={{ headerShown: true }} />
      <Stack.Screen name="Detalles de riego" component={IrrigationDetailsScreen} options={{ headerShown: true }} />
    </Stack.Navigator>
  );
};

export default App;
