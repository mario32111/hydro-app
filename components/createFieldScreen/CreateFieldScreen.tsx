import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import { Checkbox } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Picker } from '@react-native-picker/picker';
import IconModalForm from './IconModalForm';
import { useNavigation } from '@react-navigation/native';
import styles from './styles'; // Importa los estilos desde el archivo separado
import { useDispatch, useSelector } from 'react-redux';
import { createNewIrrigation } from '@/redux/slices/dataSlice';

const CreateFieldScreen: React.FC = () => {
    const [fieldName, setFieldName] = useState('');
    const [cropType, setCropType] = useState('');
    const [irrigationCycle, setIrrigationCycle] = useState('');
    const [irrigationFrequency, setIrrigationFrequency] = useState('');
    const [nightIrrigation, setNightIrrigation] = useState(false);
    const [selectedIcon, setSelectedIcon] = useState('seedling');
    const [hectaresToirrigate, setHectaresToirrigate] = useState('');

    const icons = ['seedling', 'leaf', 'wheat', 'tree', 'water'];
    const navigation = useNavigation();
    const token = useSelector((state: any) => state.auth.barerToken);
    const user_id = useSelector((state: any) => state.auth.userId);
    const dispatch = useDispatch();
    const handleIconSelect = (icon: string) => {
        setSelectedIcon(icon);
        setModalVisible(false);
    };

    const handleSubmit = async () => {
        if (!fieldName || !cropType || !irrigationCycle || !irrigationFrequency || !selectedIcon || !hectaresToirrigate) {
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

        const data = {
            user_id: user_id,
            hectares_number: hectaresToirrigate,
            nocturnal_irrigation: nightIrrigation,
            crop_type: cropType,
            icon: selectedIcon,
            name: fieldName,
            irrigation_frequency: irrigationFrequency,
            irrigation_cycle: irrigationCycle,
        };

        dispatch(createNewIrrigation(data))        
        alert('Campo creado exitosamente');
        navigation.navigate('Bar');
    };

    const [modalVisible, setModalVisible] = useState(false);

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.label}>Seleccionar Ícono</Text>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
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
                onClose={() => setModalVisible(false)}
                onSubmit={handleIconSelect}
                icons={icons}
            />

            <Text style={styles.label}>Nombre del Campo</Text>
            <TextInput
                style={styles.input}
                placeholder="Ingresa el nombre"
                value={fieldName}
                onChangeText={setFieldName}
            />
            <Text style={styles.label}>Número de hectáreas</Text>
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

export default CreateFieldScreen;
