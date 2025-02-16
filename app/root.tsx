import Login from '../components/login';
import LoadingScreen from '../components/loadingScreen';
import CreateAccount from '../components/CreateAccount';
import AppNavigator from '../components/navigation/AppNavigator';
import HomeScreen from '../components/HomeScreen';
import ConfigScreen from '../components/ConfigScreen';
import CreateCamp from '../components/CreateFieldScreen';
import IrrigationDetailsScreen from '../components/IrrigationsDetailsScreen';
import AddDetailsAccount from '@/components/AddDetailsAccount';
import AddMoreDetailsAccount from '@/components/AddMoreDetailsAccount';
import { retrocedeProgressBar } from '@/redux/slices/uiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const RootComponent: React.FC = () => {
    const dispatch = useDispatch();
  
    return (
      <Stack.Navigator initialRouteName="loading">
        <Stack.Screen name="loading" component={LoadingScreen} options={{ headerShown: false }} />
        <Stack.Screen
          name="login"
          component={Login}
          options={{ headerShown: false, gestureEnabled: false, headerLeft: () => null }}
        />
        <Stack.Screen
          name="CreateAccount"
          component={CreateAccount}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AddDetailsAccount"
          component={AddDetailsAccount}
          options={{
            headerShown: false,
            animation: 'none', // Desactiva la animación
          }}
          listeners={({ navigation }) => ({
            beforeRemove: (e) => {
              dispatch(retrocedeProgressBar(34))
            },
          })}
        />
        <Stack.Screen
          name="AddMoreDetailsAccount"
          component={AddMoreDetailsAccount}
          options={{
            headerShown: false,
            animation: 'none', // Desactiva la animación
          }}
          listeners={({ navigation }) => ({
            beforeRemove: (e) => {
              dispatch(retrocedeProgressBar(67))
            },
          })}
        />
        <Stack.Screen name="Bar" component={AppNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="Inicio" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Config" component={ConfigScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Crear Campo" component={CreateCamp} options={{ headerShown: true }} />
        <Stack.Screen
          name="Detalles de riego"
          component={IrrigationDetailsScreen}
          options={{ headerShown: true }}
        />
      </Stack.Navigator>
    );
  };
  
  export default RootComponent