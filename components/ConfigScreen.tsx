import React, { useState } from 'react';
import { View, Text, Switch, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

const SettingsScreen = () => {
  const navigation = useNavigation();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [isProfileExpanded, setIsProfileExpanded] = useState(false);
  const [isSupportExpanded, setIsSupportExpanded] = useState(false);
  const [isUserManagementExpanded, setIsUserManagementExpanded] = useState(false);

  const toggleDarkMode = () => setIsDarkMode((prevMode) => !prevMode);
  const toggleNotifications = () => setNotificationsEnabled((prev) => !prev);
  const toggleProfileSection = () => setIsProfileExpanded((prev) => !prev);
  const toggleSupportSection = () => setIsSupportExpanded((prev) => !prev);
  const toggleUserManagementSection = () => setIsUserManagementExpanded((prev) => !prev);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configuración</Text>

      {/* Configuración de Notificaciones */}
      <View style={styles.settingContainer}>
        <View style={styles.iconTextContainer}>
          <Icon name="bell" size={20} color="#4A4A4A" />
          <Text style={styles.settingText}>Notificaciones</Text>
        </View>
        <Switch
          value={notificationsEnabled}
          onValueChange={toggleNotifications}
          trackColor={{ false: '#B0B0B0', true: '#93C21A' }}
        />
      </View>

      {/* Configuración de Tema */}
      <View style={styles.settingContainer}>
        <View style={styles.iconTextContainer}>
          <Icon name="moon-o" size={20} color="#4A4A4A" />
          <Text style={styles.settingText}>Modo Oscuro</Text>
        </View>
        <Switch
          value={isDarkMode}
          onValueChange={toggleDarkMode}
          trackColor={{ false: '#B0B0B0', true: '#93C21A' }}
        />
      </View>

      {/* Sección de Cuenta */}
      <View style={styles.sectionHeader}>
        <TouchableOpacity onPress={toggleProfileSection} style={styles.sectionToggle}>
          <View style={styles.iconTextContainer}>
            <Icon name="user" size={20} color="#4A4A4A" />
            <Text style={styles.sectionText}>Cuenta</Text>
          </View>
          <Text style={styles.sectionToggleText}>{isProfileExpanded ? '-' : '+'}</Text>
        </TouchableOpacity>
      </View>
      {isProfileExpanded && (
        <View style={styles.subSectionContainer}>
          <TouchableOpacity style={styles.toggleContainer}>
            <Text style={styles.settingText}>Perfil</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.toggleContainer}>
            <Text style={styles.settingText}>Configuración de Privacidad</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.toggleContainer}>
            <Text style={styles.settingText}>Notificaciones de Cuenta</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Sección de Soporte */}
      <View style={styles.sectionHeader}>
        <TouchableOpacity onPress={toggleSupportSection} style={styles.sectionToggle}>
          <View style={styles.iconTextContainer}>
            <Icon name="support" size={20} color="#4A4A4A" />
            <Text style={styles.sectionText}>Soporte</Text>
          </View>
          <Text style={styles.sectionToggleText}>{isSupportExpanded ? '-' : '+'}</Text>
        </TouchableOpacity>
      </View>
      {isSupportExpanded && (
        <View style={styles.subSectionContainer}>
          <TouchableOpacity style={styles.toggleContainer}>
            <Text style={styles.settingText}>Ayuda</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.toggleContainer}>
            <Text style={styles.settingText}>Contacto con Soporte</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.toggleContainer}>
            <Text style={styles.settingText}>Preguntas Frecuentes</Text>
          </TouchableOpacity>
        </View>
      )}


      {isUserManagementExpanded && (
        <View style={styles.subSectionContainer}>
          <TouchableOpacity style={styles.toggleContainer}>
            <Text style={styles.settingText}>Ver Usuarios</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.toggleContainer}>
            <Text style={styles.settingText}>Agregar Usuario</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.toggleContainer}>
            <Text style={styles.settingText}>Eliminar Usuario</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.toggleContainer}>
            <Text style={styles.settingText}>Actualizar Información de Usuario</Text>
          </TouchableOpacity>
        </View>
      )}

      <TouchableOpacity style={styles.logoutButton} onPress={() => {navigation.navigate('login')}}>
        <Text style={styles.logoutText}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',  // Fondo blanco
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20,
    color: '#333',  // Texto oscuro
  },
  iconTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  settingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    backgroundColor: '#f1f1f1',  // Fondo claro para los submenús
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
  },
  settingText: {
    fontSize: 18,
    color: '#333',  // Texto oscuro
  },
  sectionHeader: {
    marginTop: 30,
    marginBottom: 10,
  },
  sectionToggle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',  // Texto oscuro
  },
  sectionToggleText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',  // Texto oscuro
  },
  subSectionContainer: {
    paddingLeft: 20,
  },
  logoutButton: {
    marginTop: 40,
    paddingVertical: 15,
    backgroundColor: '#93C21A',  // Verde para el botón de logout
    borderRadius: 8,
  },
  logoutText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default SettingsScreen;
