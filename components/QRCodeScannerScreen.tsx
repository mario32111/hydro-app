import React, { useState, useEffect } from 'react';
import { View, Text, Alert, StyleSheet, TouchableOpacity, Dimensions, StatusBar } from 'react-native';
import { CameraView, Camera } from 'expo-camera';

const QRCodeScannerScreen: React.FC = () => {
    const [hasPermission, setHasPermission] = useState<boolean | null>(null);
    const [scanned, setScanned] = useState(false);

    // Solicitar permisos de la cámara
    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    // Manejar el escaneo de códigos QR
    const handleBarCodeScanned = ({ data }: { data: string }) => {
        setScanned(true);
        Alert.alert("QR Escaneado", data, [
            { text: "OK", onPress: () => setScanned(false) }
        ]);
    };

    // Si los permisos aún no se han resuelto
    if (hasPermission === null) {
        return (
            <View style={styles.container}>
                <Text>Solicitando permiso para la cámara...</Text>
            </View>
        );
    }

    // Si no se otorgaron los permisos
    if (hasPermission === false) {
        return (
            <View style={styles.container}>
                <Text>No tienes acceso a la cámara. Por favor, habilita los permisos en la configuración.</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* Barra superior con el texto */}
            <View style={styles.topBar}>
                <Text style={styles.topBarText}>Escanea el QR de tu sistema de llaves</Text>
            </View>

            {/* Contenedor del escáner */}
            <View style={styles.scannerContainer}>
                <CameraView
                    onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
                    barcodeScannerSettings={{
                        barcodeTypes: ['qr'], // Escanear solo códigos QR
                    }}
                    style={styles.camera}
                />
                {/* Marco del escáner */}
                <View style={styles.scannerFrame} />
            </View>

            {/* Botón para escanear de nuevo */}
            {scanned && (
                <TouchableOpacity style={styles.button} onPress={() => setScanned(false)}>
                    <Text style={styles.buttonText}>Escanear de nuevo</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

// Obtener las dimensiones de la pantalla
const { width } = Dimensions.get('window');
const scannerSize = width * 0.8; // Tamaño del escáner (80% del ancho de la pantalla)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black', // Fondo negro para resaltar el escáner
    },
    topBar: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        paddingTop: StatusBar.currentHeight, // Ajustar para el StatusBar
        padding: 16,
        backgroundColor: 'rgba(0, 0, 0, 0.8)', // Fondo semitransparente
        alignItems: 'center',
        justifyContent: 'center',
    },
    topBarText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    scannerContainer: {
        width: scannerSize,
        height: scannerSize,
        overflow: 'hidden', // Para que la cámara no se salga del contenedor
        borderRadius: 20, // Bordes redondeados
        position: 'relative', // Para posicionar el marco
    },
    camera: {
        flex: 1,
    },
    scannerFrame: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderWidth: 2,
        borderColor: 'white', // Color del marco
        borderRadius: 20, // Bordes redondeados
    },
    button: {
        position: 'absolute',
        bottom: 50,
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default QRCodeScannerScreen;