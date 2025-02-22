import axios from 'axios';

export const getIrrigation = (token: string,id: any) => {
    return axios
        .get('http://192.168.1.73:3000/api/v1/irrigation/5', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((res) => res.data)
        .catch((err) => {
            console.error(err);
            return []; // Devolvemos un arreglo vacío en caso de error
        });
};



export const getIrrigations = (token: string,id: any) => {
    return axios
        .get(`http://192.168.1.73:3000/api/v1/irrigation/getAll/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((res) => res.data)
        .catch((err) => {
            console.error(err);
            return []; // Devolvemos un arreglo vacío en caso de error
        });
};



export const createIrrigation = async (token: string, data: object) => {
    console.log(data)
    try {
        const response = await axios.post('http://192.168.1.73:3000/api/v1/irrigation/', data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data; // Retornamos los datos del servidor
    } catch (error) {
        console.log('Error en la petición:', error);
        throw error; // Lanza el error para que `postCredentials` lo maneje
    }
};


