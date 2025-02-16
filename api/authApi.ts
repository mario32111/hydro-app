import axios from 'axios';

const url = ' http://192.168.1.73:3000/api/v1/auth/login'; // URL de la API

/* const data = {
    email: 'usuario@example.com',
    password: 'TuContraseñaSegura',
}; */
export const login = async (data) => {
    try {
        const response = await axios.post(url, data);
        return response.data; // Retornamos los datos del servidor
    } catch (error) {
        console.log('Error en la petición:', error);
        throw error; // Lanza el error para que `postCredentials` lo maneje
    }
};

export const getUser = () => {

};