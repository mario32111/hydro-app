import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface IconModalFormProps {
    visible: boolean;
    onClose: () => void;
    onSubmit: (icon: string) => void;
}

const IconModalForm: React.FC<IconModalFormProps> = ({ visible, onClose, onSubmit }) => {
    const [selectedIcon, setSelectedIcon] = useState('seedling');

    const icons = [
        'seedling', 'leaf', 'wheat', 'tree', 'water',
        'flower', 'fruit-grapes', 'sprout', 'corn', 'beehive-outline',
        'carrot', 'apple', 'pine-tree', 'cactus', 'cloud-rain',
        'weather-sunny', 'weather-night', 'fire', 'earth', 'mushroom',
    ];

    const handleIconSelect = (icon: string) => {
        setSelectedIcon(icon);
    };

    const handleSubmit = () => {
        onSubmit(selectedIcon); // Enviar el ícono seleccionado
        onClose();  // Cerrar el modal
    };

    return (
        <Modal visible={visible} animationType="slide" transparent={true}>
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.modalOverlay} />
            </TouchableWithoutFeedback>
            <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Selecciona un Ícono</Text>
                <View style={styles.iconGrid}>
                    {icons.map((icon) => (
                        <TouchableOpacity
                            key={icon}
                            style={[styles.iconWrapper, selectedIcon === icon && styles.iconSelected]}
                            onPress={() => handleIconSelect(icon)}
                        >
                            <MaterialCommunityIcons
                                name={icon}
                                size={30}
                                color={selectedIcon === icon ? 'rgb(147,194,26)' : 'gray'}
                            />
                        </TouchableOpacity>
                    ))}
                </View>
                <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
                    <Text style={styles.submitButtonText}>Seleccionar</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#FFF',
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'rgb(147,194,26)',
        marginBottom: 15,
    },
    iconGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    iconWrapper: {
        width: '22%',
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: 'transparent',
    },
    iconSelected: {
        borderColor: 'rgb(147,194,26)',
        backgroundColor: '#EAF6E8',
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
});

export default IconModalForm;
