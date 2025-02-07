import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform } from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const CreateAccountContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #f9f9f9;
  padding: 20px;
`;

const LockIconContainer = styled.View`
  background-color: rgb(147, 194, 26);
  width: 50px;
  height: 50px;
  justify-content: center;
  align-items: center;
  border-radius: 25px;
  margin-bottom: 20px;
`;

const Title = styled.Text`
  font-size: 26px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #4a4a4a;
  text-align: center;
`;

const Title2 = styled.Text`
  font-size: 16px;
  margin-bottom: 15px;
  color: #4a4a4a;
  align-self: flex-start;
`;

const InputContainer = styled.View`
  width: 100%;
  position: relative;
`;

const Input = styled.TextInput`
  width: 100%;
  height: 50px;
  border-width: 1px;
  border-color: rgb(147, 194, 26);
  border-radius: 8px;
  padding: 10px;
  padding-right: 40px;
  margin-bottom: 15px;
  background-color: #ffffff;
  color: #4a4a4a;
`;

const ErrorText = styled.Text`
  color: red;
  font-size: 12px;
  margin-bottom: 10px;
  align-self: flex-start;
`;

const ToggleButton = styled.TouchableOpacity`
  position: absolute;
  right: 10px;
  top: 15px;
`;

const NextButton = styled.TouchableOpacity`
  background-color: rgb(147, 194, 26);
  width: 60px;
  height: 60px;
  border-radius: 30px;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
`;

const ButtonCreate = styled.TouchableOpacity`
  background-color: rgb(255, 255, 255);
  border-width: 2px;
  border-color: rgb(147, 194, 26);
  width: 100%;
  height: 50px;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  margin-top: 20px;
`;

const ButtonCreateText = styled.Text`
  color: rgb(147, 194, 26);
  font-size: 18px;
`;

const ProgressBar = styled.View`
  width: 100%;
  height: 5px;
  background-color: #e0e0e0;
  margin-bottom: 20px;
  border-radius: 3px;
  overflow: hidden;
`;

const ProgressFill = styled.View`
  width: 1%;
  height: 100%;
  background-color: rgb(147, 194, 26);
`;

const CreateAccount = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const [emailError, setEmailError] = useState('');
  const navigation = useNavigation();

  const validateEmail = (text) => {
    setEmail(text);
    if (!/\S+@\S+\.\S+/.test(text)) {
      setEmailError('Formato de correo inválido');
    } else {
      setEmailError('');
    }
  };

  const handleNext = () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert('Error', 'Por favor, completa todos los campos.');
    } else if (password !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden.');
    } else {
      navigation.navigate('AddDetailsAccount');
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
      <CreateAccountContainer>
        <LockIconContainer>
          <Icon name="lock" size={24} color="#FFF" />
        </LockIconContainer>
        <Title>Crear Cuenta</Title>
        <ProgressBar>
          <ProgressFill />
        </ProgressBar>
        <Title2>Ingresa los datos de tu cuenta:</Title2>
        <InputContainer>
          <Input
            placeholder="Correo electrónico"
            value={email}
            onChangeText={validateEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="#B0B0B0"
          />
          {emailError ? <ErrorText>{emailError}</ErrorText> : null}
        </InputContainer>
        <InputContainer>
          <Input
            placeholder="Numero de telefono"
            value={phone}
            onChangeText={setPhone}
            keyboardType="numeric"
            autoCapitalize="none"
            placeholderTextColor="#B0B0B0"
          />
        </InputContainer>
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
        <InputContainer>
          <Input
            placeholder="Confirmar Contraseña"
            placeholderTextColor="#B0B0B0"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!showPassword2}
          />
          <ToggleButton onPress={() => setShowPassword2(!showPassword2)}>
            <Icon name={showPassword2 ? 'eye-slash' : 'eye'} size={20} color="#4A4A4A" />
          </ToggleButton>
        </InputContainer>
        <NextButton
          onPress={handleNext}
          disabled={!!(!email || emailError || !password || !confirmPassword)}
        >
          <Icon name="arrow-right" size={24} color="#FFF" />
        </NextButton>
        <ButtonCreate onPress={() => navigation.navigate('login')}>
          <ButtonCreateText>¿Ya tienes cuenta? Iniciar sesión</ButtonCreateText>
        </ButtonCreate>
      </CreateAccountContainer>
    </KeyboardAvoidingView>
  );
};

export default CreateAccount;
