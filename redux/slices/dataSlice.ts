import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getIrrigation} from "../../api/irrigateApi";
import { setLoading } from "./uiSlice";
const initialState = {
    irrigations: [],
}

export const fetchIrrigations = createAsyncThunk(
    'mqtt/hello',
    async (_, { dispatch }) => {
        dispatch(setLoading(true));
        const IrrigationsRes = await getIrrigation('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzM5NDI0NDYxfQ.Y6FVLrf8rIUOxReatpPdGkc7ZiiM5K4YgvJow7Xrhdw');
        dispatch(setIrrigations(IrrigationsRes));
        dispatch(setLoading(false));
    }
);

export const DataSlice = createSlice(
    {
        name: 'data',
        initialState,
        reducers: {
            setIrrigations: (state, action) => {
                state.irrigations = action.payload;
            }
        }
    }
)

export const { setIrrigations } = DataSlice.actions;

export default DataSlice.reducer;