import React, { useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, BackHandler } from 'react-native';
import { Bar } from 'react-native-progress';
import Icon from 'react-native-vector-icons/FontAwesome5';
import FloatingButton from './FloatingButton';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import logoImage from '../../assets/images/logo3.png';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { fetchIrrigations } from '../../redux/slices/dataSlice';
import { useFocusEffect } from '@react-navigation/native';
import { styles } from './styles';
import { IrrigationSystem, RootStackParamList } from './types';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Detalles de riego'>;

const HomeScreen: React.FC = () => {
    const irrigations = useSelector((state: any) => state.data.irrigations, shallowEqual);
    const loading = useSelector((state: any) => state.ui.loading);
    const dispatch = useDispatch();
    const navigation = useNavigation<HomeScreenNavigationProp>();

    useFocusEffect(
        React.useCallback(() => {
            const onBackPress = () => true;
            BackHandler.addEventListener('hardwareBackPress', onBackPress);
            return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
        }, [])
    );

    useEffect(() => {
        const fetchData = async () => {
            try {
                await dispatch(fetchIrrigations());
            } catch (error) {
                console.error("Error fetching irrigations:", error);
            }
        };

        fetchData();
    }, [dispatch]);

    const irrigationSystems: IrrigationSystem[] = irrigations.map((irrigation: any) => ({
        name: irrigation.name,
        progress: 0.2,
        icon: irrigation.icon,
        hours: '2d:3h:20m',
    }));

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

    // Si no hay riegos, mostrar un mensaje
    if (irrigationSystems.length === 0) {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Image source={logoImage} style={styles.logo} resizeMode="contain" />
                    <Text style={styles.title}>Hola {useSelector((state: any) => state.auth.userName)}, tus riegos:</Text>
                </View>
                <View style={styles.noDataContainer}>
                    <MaterialCommunityIcons
                        name='water-pump-off'
                        size={80}
                        color={'gray'}
                    />
                    <Text style={styles.noDataText}>Aun no tienes riegos agregados, agrega uno</Text>
                </View>

                <FloatingButton onPress={() => { }} />

            </View>

        );
    }

    return (
        <>
            <ScrollView style={styles.container}>
                <View style={styles.header}>
                    <Image source={logoImage} style={styles.logo} resizeMode="contain" />
                    <Text style={styles.title}>Hola {useSelector((state: any) => state.auth.userName)}, tus riegos:</Text>
                </View>
                <View style={styles.systemContainer}>
                    {irrigationSystems.map((system, index) => (
                        <TouchableOpacity key={index} style={styles.system} onPress={() => handleSystemPress(system)}>
                            <View style={styles.systemInfo}>
                                <Icon name={system.icon} size={20} color="gray" />
                                <Text style={styles.systemName}>{system.name}</Text>
                            </View>
                            <Bar progress={system.progress} width={null} color="rgb(147,194,26)" style={styles.progressBar} />
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
            <FloatingButton onPress={() => { }} />
        </>
    );
};

export default HomeScreen;