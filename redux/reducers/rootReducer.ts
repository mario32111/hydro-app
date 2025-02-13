// rootReducer.ts
import { combineReducers } from 'redux';
import dataSlice from '../slices/dataSlice';
import uiSlice from '../slices/uiSlice'; // Importa el slice correcto para UI
import authSlice from '../slices/authSlice'; // Importa el slice correcto para Auth
const rootReducer = combineReducers({
  data: dataSlice, // Este es el reducer de los pokemons
  ui: uiSlice,     // Este es el reducer de la UI (loading)
  auth: authSlice
});

export default rootReducer;
