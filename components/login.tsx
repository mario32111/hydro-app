import React, { useState, useEffect } from 'react';
import { Alert, BackHandler } from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

const LoginContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #f9f9f9; /* Fondo blanco suave */
  padding: 20px;
`;

const LockIconContainer = styled.View`
  background-color:rgb(147,194,26); /* Verde claro */
  width: 50px;
  height: 50px;
  justify-content: center;
  align-items: center;
  border-radius: 25px;
  margin-bottom: 20px;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #4A4A4A; /* Gris oscuro */
`;

const InputContainer = styled.View`
  width: 100%;
  position: relative;
`;

const Input = styled.TextInput`
  width: 100%;
  height: 50px;
  border-width: 1px;
  border-color:rgb(147,194,26); /* Verde claro */
  border-radius: 8px;
  padding: 10px;
  padding-right: 40px;
  margin-bottom: 15px;
  background-color: #FFFFFF; /* Blanco para el fondo de los inputs */
  color: #4A4A4A; /* Gris oscuro para el texto */
`;

const ToggleButton = styled.TouchableOpacity`
  position: absolute;
  right: 10px;
  top: 15px;
`;

const Button = styled.TouchableOpacity`
  background-color:rgb(147,194,26); /* Verde claro */
  width: 100%;
  height: 50px;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  margin-bottom: 20px;
`;

const ButtonText = styled.Text`
  color: #FFFFFF; /* Blanco para el texto del botón */
  font-size: 18px;
`;

const ButtonCreate = styled.TouchableOpacity`
  background-color: rgb(255, 255, 255); /* Blanco para el fondo */
  border-width: 2px; /* Asegúrate de definir el grosor del borde */
  border-color:rgb(147,194,26); /* Verde claro para el borde */
  width: 100%;
  height: 50px;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  margin-bottom: 20px;
`;

const ButtonCreateText = styled.Text`
  color: rgb(147,194,26); /* Blanco para el texto del botón */
  font-size: 18px;
`;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    if (email === '' || password === '') {
      Alert.alert('Error', 'Por favor, ingresa tu correo y contraseña.');
    } else {
      Alert.alert('Bienvenido', `Hola, ${email}!`, [
        { text: 'OK', onPress: () => handleWorkFlow() } // Navegar a WorkFlow al presionar "OK"
      ]);
    }


  };
  const handleCreateAccount = () => {
    navigation.navigate('CreateAccount');
  };

  const navigation = useNavigation();


  // Bloquear retroceso a la pantalla anterior pero permitir salir de la app
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        Alert.alert('Salir de la aplicación', '¿Quieres salir de la aplicación?', [
          { text: 'Cancelar', style: 'cancel' },
          { text: 'Salir', onPress: () => BackHandler.exitApp() }
        ]);
        return true; // Bloquear retroceso normal
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
        placeholderTextColor="#B0B0B0" /* Gris claro para el texto placeholder */
      />
      <InputContainer>
        <Input
          placeholder="Contraseña"
          placeholderTextColor="#B0B0B0" /* Gris claro para el texto placeholder */
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
        />
        <ToggleButton onPress={() => setShowPassword(!showPassword)}>
          <Icon name={showPassword ? 'eye-slash' : 'eye'} size={20} color="#FFF" />
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
