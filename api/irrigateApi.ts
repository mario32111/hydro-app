import axios from 'axios';

export const getIrrigation = (token: string,id: any) => {
    return axios
        .get('http://107.21.152.83:443/api/v1/irrigation/5', {
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



export const getIrrigations = async (token: string, id: any) => {    
    try {
        const response = await axios.get(`http://107.21.152.83:443/api/v1/irrigation/getAll/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data; // Retornamos los datos del servidor
    } catch (error) {
        console.error('Error en la petición:', error);
        throw error; // Lanza el error para que el llamador lo maneje
    }
};


export const createIrrigation = async (token: string, data: object) => {
    console.log(data)
    try {
        const response = await axios.post('http://107.21.152.83:443/api/v1/irrigation/', data, {
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


export const toggleFaucetService = async (data: { topic: string, message: string }) => {
    console.log(data)
    try {
        const response = await axios.post('http://107.21.152.83:443/api/v1/mqtt/publish/',data);
        return response.data; // Retornamos los datos del servidor
    } catch (error) {
        console.log('Error en la petición:', error);
        throw error; // Lanza el error para que `postCredentials` lo maneje
    }
};


