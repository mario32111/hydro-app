import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setLoading } from "./uiSlice";
import { createUser, login } from "@/api/authApi";
const initialState = {
    loged: false,
    email: '',
    userName: '',
    barerToken: '',
    userId: '',
    error: undefined,
    CreateAccountData: {
        email: '',
        password: '',
        names: '',
        lastNames: '',
        gender: '',
        phone: '',
        zip_code: '',
        hectares_to_irrigate: 0,
        birthdate: '',
        role: 'user',
    }
}

export const createUserThunk = createAsyncThunk(
    "login/createUser",
    async (_, { dispatch, getState }) => {
        try {
            dispatch(setLoading(true)); // Inicia la carga

            const state = getState(); // Obtiene el estado global
            const userData = state.auth.CreateAccountData; // Accede a los datos de CreateAccountData

            const LoginRes = await createUser(userData); // Llama a la API con los datos correctos

        } catch (error) {
            console.log("Error en login:", error);
            dispatch(setError(true));
        } finally {
            dispatch(setLoading(false)); // Termina la carga
        }
    }
);


export const postCredentials = createAsyncThunk(
    'login',
    async (data, { dispatch }) => {
        try {
            dispatch(setLoading(true)); // Inicia la carga

            const LoginRes = await login(data); // Espera la respuesta de login

            if (LoginRes?.token) { // Verifica si hay token en la respuesta
                dispatch(setLoged({ loged: true })); // Debe ser un objeto

                dispatch(setCredentials({
                    email: LoginRes.user.email,
                    userName: LoginRes.user.names,
                    userId: LoginRes.user.id, // Corregido (antes userID)
                    barerToken: LoginRes.token, // Corregido (antes user.token)
                }));
                dispatch(setError(false)); // Corregido
            }
        } catch (error) {
            console.log("Error en login:", error);
            dispatch(setError(true));
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
        setError: (state, action) => {
            state.error = action.payload;
        },
        logOut: (state) => {
            return {
                ...initialState, // Reinicia todo el estado
            };
        },
        setCreateAccountData: (state, action) => {
            state.CreateAccountData = {
                ...state.CreateAccountData,
                ...action.payload
            };
        },
        changeToEnglishGender: (state) => {
            switch (state.CreateAccountData.gender) {
                case 'Hombre':
                    state.CreateAccountData.gender = 'male';
                    break;
                case 'Mujer':
                    state.CreateAccountData.gender = 'female';
                    break;
                default:
                    state.CreateAccountData.gender = 'other';
                    break;
            }
        },

        clearCreateAccountData: (state) => {
            state.CreateAccountData = initialState.CreateAccountData;
        },

    }
});

export const { setLoged,
    setCredentials,
    setError,
    logOut,
    setCreateAccountData,
    clearCreateAccountData,
    changeToEnglishGender,
} = authSlice.actions;
export default authSlice.reducer;
