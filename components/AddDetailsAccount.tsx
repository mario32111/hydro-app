import React, { useState, useEffect } from 'react';
import { Alert, KeyboardAvoidingView, Platform, View } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Importa Picker desde el paquete correcto
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { advanceProgressBar } from '@/redux/slices/uiSlice';
import { setCreateAccountData } from '@/redux/slices/authSlice';

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

const PickerContainer = styled.View`
  width: 100%;
  height: 50px;
  border-width: 1px;
  border-color: rgb(147, 194, 26);
  border-radius: 8px;
  margin-bottom: 15px;
  background-color: #ffffff;
  justify-content: center;
`;

const ErrorText = styled.Text`
  color: red;
  font-size: 12px;
  margin-bottom: 10px;
  align-self: flex-start;
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
  transition: width 1s ease-in-out;
`;
const AddDetailsAccount = () => {


  const [names, setNames] = useState('');
  const [lastNames, setLastNames] = useState('');
  const [gender, setGender] = useState(''); // Estado para el género
  const [hectares, setHectares] = useState('');
  const navigation = useNavigation();
  const dispatch = useDispatch()
  const handleNext = () => {
    if (!names || !lastNames || !gender || !hectares) {
      Alert.alert('Error', 'Por favor, completa todos los campos.');
      return;
    }
    let hectares_to_irrigate = parseInt(hectares);

    dispatch(setCreateAccountData({ names, lastNames, gender, hectares_to_irrigate })); // Solo actualiza email y password

    navigation.navigate('AddMoreDetailsAccount');
  };
  const progress = useSelector((state: any) => state.ui.progressBar);
  useEffect(() => {
    dispatch(advanceProgressBar(1))
  }, []);

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
        <Title2>Ingresa tus datos personales:</Title2>
        <InputContainer>
          <Input
            placeholder="Nombres"
            value={names}
            onChangeText={setNames}
            autoCapitalize="words"
            placeholderTextColor="#B0B0B0"
          />
          <Input
            placeholder="Apellidos"
            value={lastNames}
            onChangeText={setLastNames}
            autoCapitalize="words"
            placeholderTextColor="#B0B0B0"
          />
          <Input
            placeholder="Hectáreas a regar"
            value={hectares}
            onChangeText={setHectares}
            keyboardType="numeric"
            placeholderTextColor="#B0B0B0"
          />
          {/* Contenedor del Picker con borde verde */}
          <PickerContainer>
            <Picker
              selectedValue={gender}
              onValueChange={(itemValue) => setGender(itemValue)}
              style={{ color: 'rgb(177, 177, 177)' }} // Color del texto
            >
              <Picker.Item label="Selecciona tu género" value="" />
              <Picker.Item label="Hombre" value="Hombre" />
              <Picker.Item label="Mujer" value="Mujer" />
              <Picker.Item label="Otro" value="Otro" />
            </Picker>
          </PickerContainer>
        </InputContainer>

        <NextButton onPress={handleNext} disabled={!names || !lastNames || !gender || !hectares}>
          <Icon name="arrow-right" size={24} color="#FFF" />
        </NextButton>
        <ButtonCreate onPress={() =>

          navigation.navigate('login')
        }>
          <ButtonCreateText>¿Ya tienes cuenta? Iniciar sesión</ButtonCreateText>
        </ButtonCreate>
      </CreateAccountContainer>
    </KeyboardAvoidingView>
  );
};

export default AddDetailsAccount;