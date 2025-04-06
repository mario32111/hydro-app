import axios from 'axios';

const url = ' http://107.21.152.83:443/api/v1/auth/login'; // URL de la API
const url2 = 'http://107.21.152.83:443/api/v1/users/'
const url3 = 'http://107.21.152.83:443/api/v1/users/check-email?email=';
/* const data = {
    email: 'usuario@example.com',
    password: 'TuContraseñaSegura',
}; */

export const login = async (data:object) => {
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

export const createUser = async (data: object) =>{
    console.log(data)
    try {
        const response = await axios.post(url2, data);
        return response.data; // Retornamos los datos del servidor
    } catch (error) {
        console.log('Error en la petición:', error);
        throw error; // Lanza el error para que `postCredentials` lo maneje
    }
}

export const checkEmail = async ( email: string) =>{
    try {
        const link = url3+ email
        console.log(link)
        const response = await axios.get(link);
        console.log(response)
        return response.data; // Retornamos los datos del servidor
    } catch (error) {
        console.log('Error en la petición:', error);
        throw error; // Lanza el error para que `postCredentials` lo maneje
    }
}