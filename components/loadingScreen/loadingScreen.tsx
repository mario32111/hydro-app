import React, { useEffect, useRef, useState } from 'react';
import { Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  LoadingContainer,
  LogoContainer,
  Logo,
  TextContainer,
  Letter
} from './styles';

const LoadingScreen = () => {
  const navigation = useNavigation();
  const fullText = 'HydroLink';
  const animatedValues = useRef(fullText.split('').map(() => new Animated.Value(0))).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const [showLogo, setShowLogo] = useState(false);

  useEffect(() => {
    const animations = animatedValues.map((animatedValue, index) =>
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 300,
        delay: index * 100,
        useNativeDriver: true,
      })
    );

    Animated.stagger(100, animations).start(() => {
      setShowLogo(true);
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start(() => {
        setTimeout(() => navigation.navigate('login'), 200);
      });
    });
  }, [animatedValues, logoOpacity, navigation]);

  return (
    <LoadingContainer>
      <LogoContainer>
        {showLogo && <Logo source={require('../../assets/images/logo1.png')} style={{ opacity: logoOpacity }} />}
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
                    outputRange: [10, 0],
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
