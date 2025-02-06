import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Bar } from 'react-native-progress';
import Icon from 'react-native-vector-icons/FontAwesome5';
import FloatingButton from './FloatingButton';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import logoImage from '../assets/images/logo3.png';

type RootStackParamList = {
    IrrigationDetails: { system: IrrigationSystem };
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Detalles de riego'>;

interface Stage {
    name: string;
    responsible: string;
    completed: boolean;
    completionDate?: string;
}

interface IrrigationSystem {
    name: string;
    progress: number;
    icon: string;
    hours: string;
    stages: Stage[];
}

const HomeScreen: React.FC = () => {
    const navigation = useNavigation<HomeScreenNavigationProp>();

    const irrigationSystems: IrrigationSystem[] = [
        {
            name: 'Riego Principal',
            progress: 0.2,
            icon: 'leaf',
            hours: '1h:30m',
            stages: [
                { name: 'Inspección de válvulas', completed: true, completionDate: '2024-10-01' },
                { name: 'Limpieza de filtros', completed: true },
                { name: 'Prueba de presión', completed: true },
                { name: 'Revisión de caudal', completed: false },
                { name: 'Optimización del sistema', completed: false },
            ],
        },
        {
            name: 'Riego Secundario',
            progress: 0.9,
            icon: 'seedling',
            hours: '2d:3h:20m',
            stages: [
                { name: 'Revisión de aspersores', completed: true },
                { name: 'Mantenimiento del motor', completed: false },
                { name: 'Ajuste del temporizador', completed: false },
            ],
        },
    ];

    const handleSystemPress = (system: IrrigationSystem) => {
        navigation.navigate('Detalles de riego', { system });
    };

    const renderWarning = (hours: string) => {
        const [days, hrs] = hours.split('d:').map(Number);
        if (days > 1 || (days === 1 && hrs > 0)) {
            return (
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                    <Icon name="exclamation-triangle" size={12} color="red" style={{ marginRight: 5, marginTop: 7 }} />
                    <Text style={styles.warning}>¡Advertencia! Tiempo mayor a 24 horas</Text>
                </View>
            );            
        }
        return null;
    };

    return (
        <>
            <ScrollView style={styles.container}>
                <View style={styles.header}>
                    <Image source={logoImage} style={styles.logo} resizeMode="contain" />
                    <Text style={styles.title}>Hola 'Usuario', tus riegos:</Text>
                </View>
                <View style={styles.systemContainer}>
                    {irrigationSystems.map((system, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.system}
                            onPress={() => handleSystemPress(system)}
                        >
                            <View style={styles.systemInfo}>
                                <Icon name={system.icon} size={20} color="gray" />
                                <Text style={styles.systemName}>{system.name}</Text>
                            </View>
                            <Bar
                                progress={system.progress}
                                width={null}
                                color="rgb(147,194,26)"
                                style={styles.progressBar}
                            />
                            <View style={styles.stageSummary}>
                                <View style={styles.systemHoursContainer}>
                                    <Icon name="clock" size={20} color="gray" style={styles.clockIcon} />
                                    <Text style={styles.systemHours}>Regado hace: {system.hours}</Text>
                                </View>
                                {renderWarning(system.hours)}
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
            <FloatingButton onPress={() => {}} />
        </>
    );
};

const styles = StyleSheet.create({
    logo: {
        width: 50,
        height: 50,
    },
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        padding: 20,
        paddingTop: 50,
    },
    header: {
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'rgb(147,194,26)',
        marginTop: 10,
    },
    systemContainer: {
        marginTop: 20,
    },
    system: {
        backgroundColor: '#F5F5F5',
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
        elevation: 3,
    },
    systemInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    systemName: {
        fontSize: 18,
        color: 'rgb(147,194,26)',
        marginLeft: 10,
        flex: 1,
    },
    progressBar: {
        marginVertical: 10,
    },
    stageSummary: {
        marginTop: 10,
    },
    systemHoursContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    systemHours: {
        color: 'gray',
        fontSize: 14,
        marginLeft: 10,
    },
    warning: {
        color: 'red',
        fontSize: 12,
        marginTop: 5,
    },
});

export default HomeScreen;
