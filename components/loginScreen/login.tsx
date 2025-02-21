import React, { useState, useEffect } from 'react';
import { Alert, BackHandler } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { postCredentials, setError } from '@/redux/slices/authSlice';
import {
  LoginContainer,
  LockIconContainer,
  Title,
  InputContainer,
  Input,
  ToggleButton,
  Button,
  ButtonText,
  ButtonCreate,
  ButtonCreateText
} from './styles';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const isLoged = useSelector((state: any) => state.auth.loged);
  const isError = useSelector((state: any) => state.auth.error);
  const navigation = useNavigation();

  const handleLogin = () => {
    dispatch(setError(false));
    if (email === '' || password === '') {
      Alert.alert('Error', 'Por favor, ingresa tu correo y contraseña.');
    }
    dispatch(postCredentials({ email, password }));
  };

  useEffect(() => {
    if (!isError && isLoged) {
      Alert.alert('Bienvenido', `Hola, ${email}!`, [
        { text: 'OK', onPress: () => handleWorkFlow() }
      ]);
    } else if (isError && !isLoged && email && password) {
      Alert.alert('Error', 'Correo o contraseña incorrectos.');
    }
  }, [isError, isLoged]);

  const handleCreateAccount = () => {
    navigation.navigate('CreateAccount');
  };

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        Alert.alert('Salir de la aplicación', '¿Quieres salir de la aplicación?', [
          { text: 'Cancelar', style: 'cancel' },
          { text: 'Salir', onPress: () => BackHandler.exitApp() }
        ]);
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [])
  );

  const handleWorkFlow = () => {
    navigation.navigate('Bar');
  };

  return (
    <LoginContainer>
      <LockIconContainer>
        <Icon name="lock" size={24} color="#FFF" />
      </LockIconContainer>
      <Title>Iniciar Sesión</Title>
      <Input
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor="#B0B0B0"
      />
      <InputContainer>
        <Input
          placeholder="Contraseña"
          placeholderTextColor="#B0B0B0"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
        />
        <ToggleButton onPress={() => setShowPassword(!showPassword)}>
          <Icon name={showPassword ? 'eye-slash' : 'eye'} size={20} color="#4A4A4A" />
        </ToggleButton>
      </InputContainer>
      <Button onPress={handleLogin}>
        <ButtonText>Ingresar</ButtonText>
      </Button>
      <ButtonCreate onPress={handleCreateAccount}>
        <ButtonCreateText>Crear cuenta</ButtonCreateText>
      </ButtonCreate>
    </LoginContainer>
  );
};

export default Login;
