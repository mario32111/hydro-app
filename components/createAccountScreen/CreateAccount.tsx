import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform } from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { advanceProgressBar } from '@/redux/slices/uiSlice';
import { setCreateAccountData } from '@/redux/slices/authSlice';
import { checkEmail } from '@/api/authApi';
import { Headline } from 'react-native-paper';

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
  height: 100%;
  background-color: rgb(147, 194, 26);
  width: ${(props) => props.width}%;
  transition: width 2s ease-in-out;
`;

const CreateAccount = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const navigation = useNavigation();
  const progress = useSelector((state: any) => state.ui.progressBar);
  const dispatch = useDispatch();

  const validateEmail = (text) => {
    setEmail(text);
    if (!/\S+@\S+\.\S+/.test(text)) {
      setEmailError('Formato de correo inválido');
    } else {
      setEmailError('');
    }
  };

  const validatePassword = (text) => {
    setPassword(text);
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(text)) {
      setPasswordError('La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número.');
    } else {
      setPasswordError('');
    }
  };

  const validatePhone = (text) => {
    setPhone(text);
    const phoneRegex = /^\d{10}$/; // Asegura que sean exactamente 10 dígitos
    if (!phoneRegex.test(text)) {
      setPhoneError('El número de teléfono debe tener exactamente 10 dígitos.');
    } else {
      setPhoneError('');
    }
  };

  const handleCreateAccount  = async () => {
    try {
      const res = await checkEmail(email);
      console.log(res);
      if (res.exists === true) {
        Alert.alert('Error', 'Ya hay una cuenta asociada a este correo');
      }else{
        navigation.navigate('AddDetailsAccount');

      }
    } catch (error) {
      console.error("Error al verificar el correo:", error);
    }
  }

  const handleNext = () => {
    if (!email || !password || !confirmPassword || !phone) {
      Alert.alert('Error', 'Por favor, completa todos los campos.');
    } else if (password !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden.');
    } else {
      dispatch(setCreateAccountData({ email, password, phone }));
      handleCreateAccount();
      // Aquí, podemos usar await porque handleCreateAccount es una función async
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
          <ProgressFill width={progress} />
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
            placeholder="Número de teléfono"
            value={phone}
            onChangeText={validatePhone}
            keyboardType="numeric"
            autoCapitalize="none"
            placeholderTextColor="#B0B0B0"
          />
          {phoneError ? <ErrorText>{phoneError}</ErrorText> : null}
        </InputContainer>
        <InputContainer>
          <Input
            placeholder="Contraseña"
            placeholderTextColor="#B0B0B0"
            value={password}
            onChangeText={validatePassword}
            secureTextEntry={!showPassword}
          />
          <ToggleButton onPress={() => setShowPassword(!showPassword)}>
            <Icon name={showPassword ? 'eye-slash' : 'eye'} size={20} color="#4A4A4A" />
          </ToggleButton>
          {passwordError ? <ErrorText>{passwordError}</ErrorText> : null}
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
          disabled={!!(!email || emailError || !password || passwordError || !confirmPassword || phoneError)}
        >
          <Icon name="arrow-right" size={24} color="#FFF" />
        </NextButton>
        <ButtonCreate
          onPress={() => {
            navigation.navigate('login');
          }}
        >
          <ButtonCreateText>¿Ya tienes cuenta? Iniciar sesión</ButtonCreateText>
        </ButtonCreate>
      </CreateAccountContainer>
    </KeyboardAvoidingView>
  );
};

export default CreateAccount;