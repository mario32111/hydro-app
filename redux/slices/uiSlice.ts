import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    backProgressBar: false,
    progressBar: 1,
};

export const UiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setBackProgressBar: (state, action) => {
            state.backProgressBar = action.payload;
        },
        setProgress: (state, action) => {
            state.progressBar = action.payload;
        },
    }
});

// Create an asynchronous thunk to handle the progress bar increasing logic
export const advanceProgressBar = (p) => async (dispatch) => {
    let progress = p;
    for (let i = 0; i <= 10; i++) {
        setTimeout(() => {
            progress += 3; // Increase progressBar by 3
            dispatch(setProgress(progress)); // Dispatch the action to update the state
        }, 15 * i);
    }
};

// Create an asynchronous thunk to handle the progress bar decreasing logic
export const retrocedeProgressBar = (p) => async (dispatch) => {
    let progress = p;  // Assuming the progress starts at 100
    for (let i = 0; i <= 10; i++) {
        setTimeout(() => {
            progress -= 3; // Decrease progressBar by 3
            dispatch(setProgress(progress)); // Dispatch the action to update the state
        }, 15 * i);
    }
};

export const { setLoading, setBackProgressBar, setProgress } = UiSlice.actions;

export default UiSlice.reducer;
