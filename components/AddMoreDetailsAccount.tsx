import React, { useState, useEffect } from 'react';
import { Alert, KeyboardAvoidingView, Platform, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
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

const AddMoreDetailsAccount = () => {
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [municipality, setMunicipality] = useState('');
  const navigation = useNavigation();
  const [progress, setProgress] = useState(33);


  useEffect(() => {
    for (let i = 0; i < 11; i++) {
      setTimeout(() => {
        setProgress((prev) => prev + 3);
      }, 15 * i);
    }
  }, []);

  const handleNext = () => {
    if (!country || !state || !municipality) {
      Alert.alert('Error', 'Por favor, selecciona todos los campos.');
      return;
    }
    navigation.navigate('Inicio');
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
        <Title2>Selecciona tu ubicación:</Title2>

        <PickerContainer>
          <Picker selectedValue={country} onValueChange={(itemValue) => setCountry(itemValue)} style={{ color: 'rgb(177, 177, 177)' }}>
            <Picker.Item label="Selecciona tu país" value="" />
            <Picker.Item label="México" value="México" />
            <Picker.Item label="Estados Unidos" value="Estados Unidos" />
            <Picker.Item label="Canadá" value="Canadá" />
          </Picker>
        </PickerContainer>

        <PickerContainer>
          <Picker selectedValue={state} onValueChange={(itemValue) => setState(itemValue)} style={{ color: 'rgb(177, 177, 177)' }}>
            <Picker.Item label="Selecciona tu estado" value="" />
            <Picker.Item label="Durango" value="Durango" />
            <Picker.Item label="Jalisco" value="Jalisco" />
            <Picker.Item label="Nuevo León" value="Nuevo León" />
          </Picker>
        </PickerContainer>

        <PickerContainer>
          <Picker selectedValue={municipality} onValueChange={(itemValue) => setMunicipality(itemValue)} style={{ color: 'rgb(177, 177, 177)' }}>
            <Picker.Item label="Selecciona tu municipio" value="" />
            <Picker.Item label="Durango" value="Durango" />
            <Picker.Item label="Gómez Palacio" value="Gómez Palacio" />
            <Picker.Item label="Lerdo" value="Lerdo" />
          </Picker>
        </PickerContainer>

        <NextButton onPress={handleNext} disabled={!country || !state || !municipality}>
          <Icon name="arrow-right" size={24} color="#FFF" />
        </NextButton>
        <ButtonCreate onPress={() => navigation.navigate('login')}>
          <ButtonCreateText>¿Ya tienes cuenta? Iniciar sesión</ButtonCreateText>
        </ButtonCreate>
      </CreateAccountContainer>
    </KeyboardAvoidingView>
  );
};

export default AddMoreDetailsAccount;
