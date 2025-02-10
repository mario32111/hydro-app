import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Definir el tipo del estado
interface DataState {
  pokemons: string[]; // Puedes cambiar "string[]" por el tipo de tus pokemons si es más complejo
}

const initialState: DataState = {
  pokemons: [],
};

// Crear el slice con las acciones y reducers
export const DataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setPokemons: (state, action: PayloadAction<string[]>) => { // Cambia "string[]" si el tipo de payload es diferente
      state.pokemons = action.payload;
    },
  },
});

// Exportar las acciones y el reducer
export const { setPokemons } = DataSlice.actions;
export default DataSlice.reducer;
