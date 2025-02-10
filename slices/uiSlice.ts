import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Tipado del estado de UI
interface UiState {
  loading: boolean;
}

const initialState: UiState = {
  loading: false,
};

export const UiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setLoading } = UiSlice.actions;

export default UiSlice.reducer;
