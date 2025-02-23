import Login from '../components/loginScreen/login';
import LoadingScreen from '../components/loadingScreen/loadingScreen';
import CreateAccount from '../components/createAccountScreen/CreateAccount';
import AppNavigator from '../components/navigation/AppNavigator';
import HomeScreen from '../components/HomeScreen/HomeScreen';
import ConfigScreen from '../components/configScreen/ConfigScreen';
import CreateCamp from '../components/createFieldScreen/CreateFieldScreen';
import IrrigationDetailsScreen from '../components/IrrigationsDetailsScreen/IrrigationsDetailsScreen';
import AddDetailsAccount from '@/components/createAccountScreen/AddDetailsAccount';
import AddMoreDetailsAccount from '@/components/createAccountScreen/AddMoreDetailsAccount';
import { retrocedeProgressBar } from '@/redux/slices/uiSlice';
import { useDispatch } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import QRCodeScannerScreen from '@/components/QRCodeScannerScreen';

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
        <Stack.Screen name="Inicio" component={HomeScreen} options={{ headerShown: false, gestureEnabled: false }} />
        <Stack.Screen name="Config" component={ConfigScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Crear Campo" component={CreateCamp} options={{ headerShown: true }} />
        <Stack.Screen
          name="Detalles de riego"
          component={IrrigationDetailsScreen}
          options={{ headerShown: true }}
        />

      <Stack.Screen name="QR" component={QRCodeScannerScreen} options={{ headerShown: true }} />

      </Stack.Navigator>
    );
  };
  
  export default RootComponent