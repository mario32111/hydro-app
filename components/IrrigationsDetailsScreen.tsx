import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Picker } from '@react-native-picker/picker';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation, RouteProp } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import IconModalForm from './IconModalForm'; // Asegúrate de que el nombre del archivo coincida
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

type RootStackParamList = {
    IrrigationDetails: { system: IrrigationSystem };
};

type IrrigationDetailsScreenRouteProp = RouteProp<RootStackParamList, 'Detalles de riego'>;

type IrrigationDetailsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Detalles de riego'>;

interface IrrigationSystem {
    name: string;
    progress: number;
    icon: string;
    hours: string;
}

const IrrigationDetailsScreen: React.FC = () => {
    const [selectedIcon, setSelectedIcon] = useState('seedling');

    const [irrigationFrequency, setIrrigationFrequency] = useState('');
    const handleSubmit = () => {
        // Validación de campos
        if (!fieldName || !cropType || !irrigationCycle || !irrigationFrequency || !selectedIcon) {
            alert('Por favor, llena todos los campos.');
            return;
        }
        alert('Campo creado exitosamente');
        navigation.navigate('Bar'); // Redirige a la pantalla "Inicio"
    };

    const navigation = useNavigation<IrrigationDetailsScreenNavigationProp>();
    const route = useRoute<IrrigationDetailsScreenRouteProp>();

    const { system } = route.params;
    const [editedSystem, setEditedSystem] = useState<IrrigationSystem>(system);

    const handleEditField = (field: string, value: string) => {
        setEditedSystem((prevState) => ({
            ...prevState,
            [field]: value,
        }));
    };

    const handleSaveChanges = () => {
        Alert.alert('Cambios guardados', 'Los detalles del sistema de riego han sido actualizados.');
        navigation.navigate('Bar'); // Redirige a la pantalla de flujo de trabajo
    };


    // Modal control
    const [modalVisible, setModalVisible] = useState(false);
    const handleOpenModal = () => {
        setModalVisible(true);
    };
    const handleCloseModal = () => {
        setModalVisible(false);
    };

    const handleIconSelect = (icon: string) => {
        setSelectedIcon(icon);
        setModalVisible(false); // Cierra el modal después de seleccionar el icono
    };
    const icons = ['seedling', 'leaf', 'wheat', 'tree', 'water'];

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Detalles de {editedSystem.name}</Text>
            </View>
            <View style={styles.detailContainer}>
                <View style={styles.detailRow}>
                    <Text style={styles.label}>Nombre del Sistema:</Text>
                    <TextInput
                        style={styles.input}
                        value={editedSystem.name}
                        onChangeText={(text) => handleEditField('name', text)}
                    />
                </View>
                <View style={styles.detailRow}>
                    <Text style={styles.label}>Frecuencia de Riego:</Text>
                    <View
                        style={[
                            styles.pickerContainer,
                            { borderColor: irrigationFrequency ? 'gray' : 'gray', flex: 1 },
                        ]}
                    >
                        <Picker
                            selectedValue={irrigationFrequency}
                            onValueChange={(itemValue) => setIrrigationFrequency(itemValue)}
                            style={styles.picker}
                        >
                            <Picker.Item label="Elige" value="" />
                            <Picker.Item label="Horas" value="Horas" />
                            <Picker.Item label="Minutos" value="Minutos" />
                            <Picker.Item label="Días" value="Días" />
                        </Picker>
                    </View>
                </View>


                <View style={styles.detailRow}>
                    <Text style={styles.label}>Icono:</Text>
                    <TouchableOpacity onPress={handleOpenModal}>
                        <View style={[styles.iconContainer, styles.iconWrapper]}>
                            <MaterialCommunityIcons
                                name={selectedIcon}
                                size={40}
                                color="rgb(147,194,26)"
                            />
                        </View>
                    </TouchableOpacity>


                    <IconModalForm
                        visible={modalVisible}
                        onClose={handleCloseModal}
                        onSubmit={handleIconSelect} // Pasa la función handleIconSelect al modal
                        icons={icons} // Pasa la lista de iconos disponibles
                    />
                </View>
            </View>
            <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
                <Text style={styles.saveButtonText}>Guardar Cambios</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        padding: 20,
    },
    header: {
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'rgb(147,194,26)',
    },
    detailContainer: {
        marginTop: 20,
    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    label: {
        fontSize: 16,
        color: 'gray',
        marginRight: 10,
        flex: 1,
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 8,
        padding: 10,
    },
    icon: {
        marginLeft: 10,
    },
    saveButton: {
        backgroundColor: 'rgb(147,194,26)',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
    },
    saveButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    picker: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 8,
        padding: 0,
    },
    pickerContainer: {
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 15,
        backgroundColor: '#FFF',
    },
    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    iconWrapper: {
        padding: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: 'transparent',
    },
});

export default IrrigationDetailsScreen;
