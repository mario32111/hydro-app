import React, { useState } from 'react';
import { Alert } from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const CreateAccountContainer = styled.View`
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
  color: rgb(147,194,26); /* Color para el texto */
  font-size: 18px;
`;

const CreateAccount = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleCreateAccount = () => {
    if (email === '' || password === '' || confirmPassword === '') {
      Alert.alert('Error', 'Por favor, completa todos los campos.');
    } else if (password !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden.');
    } else {
      Alert.alert('Cuenta creada', `¡Bienvenido, ${email}!`, [
        { text: 'OK', onPress: () => handleWorkFlow() }
      ]);
    }
  };

  const navigation = useNavigation();

  const handleWorkFlow = () => {
    navigation.navigate('Bar'); // Redirige a la pantalla de flujo de trabajo
  };

  return (
    <CreateAccountContainer>
      <LockIconContainer>
        <Icon name="lock" size={24} color="#FFF" />
      </LockIconContainer>
      <Title>Crear Cuenta</Title>
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
          placeholderTextColor="#B0B0B0"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
        />
        <ToggleButton onPress={() => setShowPassword(!showPassword)}>
          <Icon name={showPassword ? 'eye-slash' : 'eye'} size={20} color="#FFF" />
        </ToggleButton>
      </InputContainer>
      <InputContainer>
        <Input
          placeholder="Confirmar Contraseña"
          placeholderTextColor="#B0B0B0"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={!showPassword}
        />
      </InputContainer>
      <Button onPress={handleCreateAccount}>
        <ButtonText>Crear Cuenta</ButtonText>
      </Button>
      <ButtonCreate onPress={() => navigation.navigate('login')}>
        <ButtonCreateText>¿Ya tienes cuenta? Iniciar sesión</ButtonCreateText>
      </ButtonCreate>
    </CreateAccountContainer>
  );
};

export default CreateAccount;
