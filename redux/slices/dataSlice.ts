import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getPokemon} from "../../api";
import { setLoading } from "./uiSlice";
const initialState = {
    pokemons: [],
}

export const fetchPokemonsWithDetails = createAsyncThunk(
    'data/fetchPokemonsWithDetails',
    async (_, { dispatch }) => {
        dispatch(setLoading(true));
        const pokemonsRes = await getPokemon();
        dispatch(setPokemons(pokemonsRes));
        dispatch(setLoading(false));
    }
);

export const DataSlice = createSlice(
    {
        name: 'data',
        initialState,
        reducers: {
            setPokemons: (state, action) => {
                state.pokemons = action.payload;
            },
            setFavorite: (state, action) => {
                const currentPokemonIndex = state.pokemons.findIndex(
                    (pokemon) => {
                        return pokemon.id === action.payload.pokemonId;
                    })

                if (currentPokemonIndex >= 0) {
                    const isFavorite = state.pokemons[currentPokemonIndex].favorite;
                    state.pokemons[currentPokemonIndex].favorite = !isFavorite;
                }
            }
        }
    }
)

export const { setFavorite, setPokemons } = DataSlice.actions;

export default DataSlice.reducer;