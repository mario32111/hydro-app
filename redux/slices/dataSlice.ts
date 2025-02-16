import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getIrrigation } from "../../api/irrigateApi";
import { setLoading } from "./uiSlice";

// Estado inicial del slice
const initialState = {
  irrigations: [],
};

// La acción asincrónica para obtener las irrigaciones
export const fetchIrrigations = createAsyncThunk(
  'data/fetchIrrigations', // Cambié el nombre a algo más adecuado
  async (_, { dispatch, getState }) => {
    const state = getState();
    const token = state.auth.barerToken; // Accede al token desde el estado de Redux
    const id = state.auth.userId; // Accede al id desde el estado de Redux

    dispatch(setLoading(true)); // Establece el estado de carga
    try {
      const irrigationsRes = await getIrrigation(token, id);
      dispatch(setIrrigations(irrigationsRes)); // Actualiza el estado de irrigations
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(setLoading(false)); // Finaliza el estado de carga
    }
  }
);

// El slice para manejar el estado
export const DataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setIrrigations: (state, action) => {
      state.irrigations = action.payload;
    },
  },
});

export const { setIrrigations } = DataSlice.actions;
export default DataSlice.reducer;