import axios from 'axios';

export const getPokemon = () => {
    return axios
        .get('https://pokeapi.co/api/v2/pokemon?limit=151')
        .then((res) => {
                        //console.log(res.data.results);
                        return res.data.results})
        .catch((err) => {
            console.error(err);
            return []; // Devolvemos un arreglo vacío en caso de error
        });
};

export const getPokemonsDetails = (pokemon) => {
    return axios.get(pokemon.url)
    .then(res => res.data)
    .catch((err) => {
        console.error(err);
        return []; // Devolvemos un arreglo vacío en caso de error
    });
}