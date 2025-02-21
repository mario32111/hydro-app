// FloatingButton.tsx
import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';


const FloatingButton: React.FC = () => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity style={styles.button} onPress={() => { navigation.navigate('Crear Campo') }}>
            <Icon name="plus" size={24} color="#FFF" />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        position: 'absolute',
        bottom: 30,
        right: 30,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: 'rgb(147,194,26)',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
});

export default FloatingButton;
