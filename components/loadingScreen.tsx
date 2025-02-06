import React, { useEffect, useRef, useState } from 'react';
import { Animated, View } from 'react-native';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';

const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #f9f9f9; /* Fondo blanco claro */
`;

const Letter = styled(Animated.Text)`
  font-size: 36px;
  font-weight: bold;
  color:rgb(0, 0, 0); /* Color verde */
`;

const LogoContainer = styled.View`
  width: 150px;
  height: 150px;
  justify-content: center;
  align-items: center;
  margin-bottom: -25px; /* Ajusta el margen para que el logo no sobrepase el texto */
`;

const Logo = styled(Animated.Image)`
  width: 100%;
  height: 100%;
  resize-mode: contain; /* Asegura que la imagen no se corte y se ajuste dentro del contenedor */
`;

const TextContainer = styled.View`
  flex-direction: row; /* Mantiene el texto en una fila */
  justify-content: center; /* Alinea el texto en el centro */
  margin-top: 20px; /* Ajusta la distancia entre el logo y el texto */
`;

const LoadingScreen = () => {
  const navigation = useNavigation();
  const fullText = 'HydroLink';
  const animatedValues = useRef(fullText.split('').map(() => new Animated.Value(0))).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const [showLogo, setShowLogo] = useState(false);

  useEffect(() => {
    // Crear una secuencia de animaciones para las letras
    const animations = animatedValues.map((animatedValue, index) =>
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 300, // Duración para cada letra
        delay: index * 100, // Retraso entre letras
        useNativeDriver: true,
      })
    );

    // Ejecutar las animaciones de las letras
    Animated.stagger(100, animations).start(() => {
      // Mostrar el logo después de las letras
      setShowLogo(true);
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 1000, // Duración de la animación del logo
        useNativeDriver: true,
      }).start(() => {
        // Navegar después de mostrar el logo
        setTimeout(() => navigation.navigate('login'), 200);
      });
    });
  }, [animatedValues, logoOpacity, navigation]);

  return (
    <LoadingContainer>
      <LogoContainer>
        {showLogo && (
          <Logo
            source={require('../assets/images/logo1.png')} // Cambia esta ruta a la de tu logo
            style={{ opacity: logoOpacity }}
          />
        )}
      </LogoContainer>
      <TextContainer>
        {fullText.split('').map((letter, index) => (
          <Letter
            key={index}
            style={{
              opacity: animatedValues[index],
              transform: [
                {
                  translateY: animatedValues[index].interpolate({
                    inputRange: [0, 1],
                    outputRange: [10, 0], // Aparece desde abajo
                  }),
                },
              ],
            }}
          >
            {letter}
          </Letter>
        ))}
      </TextContainer>
    </LoadingContainer>
  );
};

export default LoadingScreen;
