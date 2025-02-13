import axios from 'axios';

export const getIrrigation = (token) => {
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
