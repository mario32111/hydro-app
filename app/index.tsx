import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';  // Importar el Provider
import RootComponent from './root';
import store from '../redux/store';


// Componente principal de la aplicación

// Envuelve AppContent con el Provider de Redux
const App = () => (
  <Provider store={store}>
    <RootComponent />
  </Provider>
);

export default App;