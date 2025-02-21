import React, { useState, useEffect } from 'react';
import { Alert, KeyboardAvoidingView, Platform, View, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { advanceProgressBar } from '@/redux/slices/uiSlice';
import { setCreateAccountData, changeToEnglishGender, createUserThunk } from '@/redux/slices/authSlice';
import { postCredentials } from '@/redux/slices/authSlice';

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

const Label = styled.Text`
  font-size: 16px;
  margin-bottom: 15px;
  color: #4a4a4a;
  align-self: flex-start;
`;

const RowContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 15px;
`;

const PickerContainer = styled.View`
  flex: 1;
  height: 50px;
  border-width: 1px;
  border-color: rgb(147, 194, 26);
  border-radius: 8px;
  background-color: #ffffff;
  justify-content: center;
  margin-right: 5px;
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
`;

const TextInputStyled = styled.TextInput`
  width: 100%;
  height: 50px;
  border-width: 1px;
  border-color: rgb(147, 194, 26);
  border-radius: 8px;
  margin-bottom: 15px;
  background-color: #ffffff;
  padding: 10px;
  font-size: 16px;
  color: #4a4a4a;
`;

const AddMoreDetailsAccount = () => {
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [zip_code, setZip_code] = useState('');
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const progress = useSelector((state) => state.ui.progressBar);

  useEffect(() => {
    dispatch(advanceProgressBar(34));
  }, []);

  const isValidDate = () => {
    const parsedMonth = parseInt(month, 10); // Convertir a número
    const date = new Date(year, parsedMonth - 1, day); // Mes en base 0
    return date.getFullYear() == year && date.getMonth() + 1 == parsedMonth && date.getDate() == day;
  };


  const handleNext = () => {
    if (!day || !month || !year || !zip_code) {
      Alert.alert('Error', 'Por favor, completa todos los campos.');
      return;
    }
    if (!isValidDate()) {
      Alert.alert('Error', 'Fecha de nacimiento inválida.');
      return;
    }
    if (zip_code.length !== 5 || isNaN(zip_code)) {
      Alert.alert('Error', 'El código postal debe tener 5 dígitos numéricos.');
      return;
    }
    const birthdate = `${day}-${month}-${year}`
    dispatch(setCreateAccountData({ birthdate, zip_code })); // Solo actualiza email y password
    dispatch(changeToEnglishGender());
    dispatch(createUserThunk());

    const email = useSelector((state: any) => state.auth.CreateAccountData.email);
    const password = useSelector((state: any) => state.auth.CreateAccountData.password);
    dispatch(postCredentials({
      email: email,
      password: password,
    }));

    navigation.navigate('Bar');
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

        <Label>Fecha de Nacimiento: </Label>
        <RowContainer>
          <PickerContainer>
            <Picker selectedValue={day} onValueChange={(itemValue) => setDay(itemValue)}>
              <Picker.Item label="Día" value="" />
              {[...Array(31)].map((_, i) => (
                <Picker.Item key={i} label={`${i + 1}`} value={`${i + 1}`} />
              ))}
            </Picker>
          </PickerContainer>

          <PickerContainer>
            <Picker selectedValue={month} onValueChange={(itemValue) => setMonth(itemValue)}>
              <Picker.Item label="Mes" value="" />
              {[...Array(12)].map((_, i) => (
                <Picker.Item key={i} label={`${i + 1}`} value={`${i + 1}`} />
              ))}
            </Picker>
          </PickerContainer>

          <PickerContainer>
            <Picker selectedValue={year} onValueChange={(itemValue) => setYear(itemValue)}>
              <Picker.Item label="Año" value="" />
              {[...Array(100)].map((_, i) => (
                <Picker.Item key={i} label={`${2024 - i}`} value={`${2024 - i}`} />
              ))}
            </Picker>
          </PickerContainer>
        </RowContainer>

        <TextInputStyled
          placeholder="Código Postal"
          keyboardType="numeric"
          value={zip_code}
          onChangeText={setZip_code}
          maxLength={5}
        />

        <NextButton onPress={handleNext}>
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

export default AddMoreDetailsAccount;
