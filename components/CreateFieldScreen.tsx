import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import { Checkbox } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Picker } from '@react-native-picker/picker';
import IconModalForm from './IconModalForm'; // Asegúrate de que el nombre del archivo coincida
import { useNavigation } from '@react-navigation/native'; // Importa el hook useNavigation

const CreateFieldScreen: React.FC = () => {
    const [fieldName, setFieldName] = useState('');
    const [cropType, setCropType] = useState('');
    const [irrigationCycle, setIrrigationCycle] = useState('');
    const [irrigationFrequency, setIrrigationFrequency] = useState('');
    const [nightIrrigation, setNightIrrigation] = useState(false);
    const [selectedIcon, setSelectedIcon] = useState('seedling');
    const [hectaresToirrigate, setHectaresToirrigate] = useState('');

    const icons = ['seedling', 'leaf', 'wheat', 'tree', 'water'];

    const navigation = useNavigation(); // Hook para la navegación

    const handleIconSelect = (icon: string) => {
        setSelectedIcon(icon);
        setModalVisible(false); // Cierra el modal después de seleccionar el icono
    };

    const handleSubmit = () => {
        // Validación de campos
        if (!fieldName || !cropType || !irrigationCycle || !irrigationFrequency || !selectedIcon) {
            alert('Por favor, llena todos los campos.');
            return;
        }

        console.log({
            fieldName,
            cropType,
            irrigationCycle,
            irrigationFrequency,
            nightIrrigation,
            selectedIcon,
        });

        alert('Campo creado exitosamente');
        navigation.navigate('Bar'); // Redirige a la pantalla "Inicio"
    };

    // Modal control
    const [modalVisible, setModalVisible] = useState(false);
    const handleOpenModal = () => {
        setModalVisible(true);
    };
    const handleCloseModal = () => {
        setModalVisible(false);
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Crear Nuevo Campo</Text>

            <Text style={styles.label}>Seleccionar Ícono</Text>
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

            <Text style={styles.label}>Nombre del Campo</Text>
            <TextInput
                style={styles.input}
                placeholder="Ingresa el nombre"
                value={fieldName}
                onChangeText={setFieldName}
            />
            <Text style={styles.label}>Numero de hectareas</Text>
            <TextInput
                style={styles.input}
                placeholder="Ingresa el número de hectáreas"
                keyboardType="numeric"
                value={hectaresToirrigate}
                onChangeText={setHectaresToirrigate}
            />

            <Text style={styles.label}>Tipo de Cultivo</Text>
            <TextInput
                style={styles.input}
                placeholder="Ingresa el tipo de cultivo"
                value={cropType}
                onChangeText={setCropType}
            />

            <Text style={styles.label}>Ciclo de Riego</Text>
            <TextInput
                style={styles.input}
                placeholder="Horas, minutos o días"
                value={irrigationCycle}
                onChangeText={setIrrigationCycle}
            />

            <Text style={styles.label}>Frecuencia de Riego</Text>
            <View
                style={[
                    styles.pickerContainer,
                    { borderColor: irrigationFrequency ? 'rgb(147,194,26)' : 'gray' },
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

            <View style={styles.checkboxContainer}>
                <Checkbox
                    status={nightIrrigation ? 'checked' : 'unchecked'}
                    onPress={() => setNightIrrigation(!nightIrrigation)}
                    color="rgb(147,194,26)"
                />
                <Text style={styles.checkboxLabel}>Habilitar riego por la noche</Text>
            </View>

            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                <Text style={styles.submitButtonText}>Listo</Text>
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
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'rgb(147,194,26)',
        marginBottom: 20,
        textAlign: 'center',
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        color: 'gray',
    },
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 8,
        padding: 10,
        marginBottom: 15,
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
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    checkboxLabel: {
        marginLeft: 10,
        color: 'gray',
    },
    submitButton: {
        backgroundColor: 'rgb(147,194,26)',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    submitButtonText: {
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
});

export default CreateFieldScreen;
