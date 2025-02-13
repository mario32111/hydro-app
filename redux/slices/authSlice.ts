import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setLoading } from "./uiSlice";
import { login } from "@/api/authApi";
const initialState = {
    loged: false,
    email: '',
    userName: '',
    barerToken: '',
    userId: '',
}

export const postCredentials = createAsyncThunk(
    'login',
    async (_, { dispatch }) => {
        try {
            dispatch(setLoading(true)); // Inicia la carga
            
            const LoginRes = await login(); // Espera la respuesta de login
            
            if (LoginRes?.token) { // Verifica si hay token en la respuesta
                dispatch(setLoged({ loged: true })); // Debe ser un objeto
                
                dispatch(setCredentials({
                    email: LoginRes.user.email,
                    userName: LoginRes.user.names, 
                    userId: LoginRes.user.id, // Corregido (antes userID)
                    barerToken: LoginRes.token // Corregido (antes user.token)
                }));
            }
        } catch (error) {
            console.error("Error en login:", error);
        } finally {
            dispatch(setLoading(false)); // Termina la carga
        }
    }
);
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setLoged: (state, action) => {
            state.loged = action.payload.loged; // Debe recibir `{ loged: true }`
        },
        setCredentials: (state, action) => {
            state.email = action.payload.email;
            state.userName = action.payload.userName;
            state.barerToken = action.payload.barerToken;
            state.userId = action.payload.userId; // Corregido
        },        
    }
});

export const { setLoged, setCredentials } = authSlice.actions;
export default authSlice.reducer;
