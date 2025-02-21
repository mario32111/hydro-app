import styled from 'styled-components/native';
import { Animated } from 'react-native';

export const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #f9f9f9;
`;

export const Letter = styled(Animated.Text)`
  font-size: 36px;
  font-weight: bold;
  color: rgb(0, 0, 0);
`;

export const LogoContainer = styled.View`
  width: 150px;
  height: 150px;
  justify-content: center;
  align-items: center;
  margin-bottom: -25px;
`;

export const Logo = styled(Animated.Image)`
  width: 100%;
  height: 100%;
  resize-mode: contain;
`;

export const TextContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  margin-top: 20px;
`;
