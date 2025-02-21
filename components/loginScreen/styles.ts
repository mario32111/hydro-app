// styles.ts
import styled from 'styled-components/native';

export const LoginContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #f9f9f9;
  padding: 20px;
`;

export const LockIconContainer = styled.View`
  background-color: rgb(147,194,26);
  width: 50px;
  height: 50px;
  justify-content: center;
  align-items: center;
  border-radius: 25px;
  margin-bottom: 20px;
`;

export const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #4A4A4A;
`;

export const InputContainer = styled.View`
  width: 100%;
  position: relative;
`;

export const Input = styled.TextInput`
  width: 100%;
  height: 50px;
  border-width: 1px;
  border-color: rgb(147,194,26);
  border-radius: 8px;
  padding: 10px;
  padding-right: 40px;
  margin-bottom: 15px;
  background-color: #FFFFFF;
  color: #4A4A4A;
`;

export const ToggleButton = styled.TouchableOpacity`
  position: absolute;
  right: 10px;
  top: 15px;
`;

export const Button = styled.TouchableOpacity`
  background-color: rgb(147,194,26);
  width: 100%;
  height: 50px;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  margin-bottom: 20px;
`;

export const ButtonText = styled.Text`
  color: #FFFFFF;
  font-size: 18px;
`;

export const ButtonCreate = styled.TouchableOpacity`
  background-color: #FFFFFF;
  border-width: 2px;
  border-color: rgb(147,194,26);
  width: 100%;
  height: 50px;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  margin-bottom: 20px;
`;

export const ButtonCreateText = styled.Text`
  color: rgb(147,194,26);
  font-size: 18px;
`;
