import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ruteToFollowService from "./ruteToFollowService";

const initialState = {
    RTFs: [],
    RTF: null,
    isLoadingRTF: false,
    isErrorRTF: false,
    messageRTF: '',
    isSuccessRTF: false,
    newRTFId: ''
};

// Crear el slice
export const ruteToFollowSlice = createSlice({
    name: "ruteToFollow",
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoadingRTF = false;
            state.isErrorRTF = false;
            state.messageRTF = '';
            state.isSuccessRTF = false;
            state.newRTFId = '';
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createRTF.pending, (state) => {
                state.isLoadingRTF = true;
            })
            .addCase(createRTF.fulfilled, (state, action) => {
                state.newRTFId = action.payload.ruteToFollowId;
                state.messageRTF = 'Creado correctamente';
                state.isLoadingRTF = false;
                state.isSuccessRTF = true;
            })
            .addCase(createRTF.rejected, (state, action) => {
                state.isLoadingRTF = false;
                state.isErrorRTF = true;
                state.messageRTF = action.payload || 'Error al crear la Ruta a Seguir';
            })
            .addCase(addToCrRTF.pending, (state) => {
                state.isLoadingRTF = true;
            })
            .addCase(addToCrRTF.fulfilled, (state, action) => {
                // Maneja la lógica si es necesario
                state.isLoadingRTF = false;
            })
            .addCase(addToCrRTF.rejected, (state, action) => {
                state.isLoadingRTF = false;
                state.isErrorRTF = true;
                state.messageRTF = action.payload || 'Error al agregar a la Ruta a Seguir';
            })
            .addCase(updRTF.pending, (state) => {
                state.isLoadingRTF = true;
            })
            .addCase(updRTF.fulfilled, (state, action) => {
                console.log(action.payload);
                state.RTF = action.payload.ruteToFollow; // Asegúrate de que la estructura sea correcta
                state.isLoadingRTF = false;
                state.isSuccessRTF = true;
            })
            .addCase(updRTF.rejected, (state, action) => {
                state.isLoadingRTF = false;
                state.isErrorRTF = true;
                state.messageRTF = action.payload || 'Error al actualizar la Ruta a Seguir';
            })
            .addCase(getRTFById.pending, (state) => {
                state.isLoadingRTF = true;
            })
            .addCase(getRTFById.fulfilled, (state, action) => {
                state.RTF = action.payload;
                state.isLoadingRTF = false;
            })
            .addCase(getRTFById.rejected, (state, action) => {
                state.isLoadingRTF = false;
                state.isErrorRTF = true;
                state.messageRTF = action.payload || 'Error al obtener la Ruta a Seguir';
            });
    },
});

// Thunks
export const getRTFById = createAsyncThunk("ruteToFollow/getRTFById",
    async (id, thunkAPI) => {
        try {
            return await ruteToFollowService.getRTFById(id);
        } catch (error) {
            console.error(error);
            return thunkAPI.rejectWithValue(error.message || 'Error al obtener la Ruta a Seguir');
        }
    }
);

export const createRTF = createAsyncThunk("ruteToFollow/createRTF",
    async (ruteToFollow, thunkAPI) => {
        try {
            return await ruteToFollowService.createRTF(ruteToFollow);
        } catch (error) {
            console.error(error);
            return thunkAPI.rejectWithValue(error.message || 'Error al crear la Ruta a Seguir');
        }
    }
);

export const addToCrRTF = createAsyncThunk("ruteToFollow/addToCrRTF",
    async (data, thunkAPI) => {
        try {
            return await ruteToFollowService.addToCrRTF(data);
        } catch (error) {
            console.error(error);
            return thunkAPI.rejectWithValue(error.message || 'Error al agregar a la Ruta a Seguir');
        }
    }
);

export const updRTF = createAsyncThunk("ruteToFollow/updRTF",
    async ({ id, updatedRTF }, thunkAPI) => {
        try {
            console.log(updatedRTF);
            return await ruteToFollowService.updateRTF(id, updatedRTF);
        } catch (error) {
            console.error(error);
            return thunkAPI.rejectWithValue(error.message || 'Error al actualizar la Ruta a Seguir');
        }
    }
);

export const deleteRTF = createAsyncThunk("ruteToFollow/deleteRTF",
    async (id, thunkAPI) => {
        try {
            return await ruteToFollowService.deleteRTF(id);
        } catch (error) {
            console.error(error);
            return thunkAPI.rejectWithValue(error.message || 'Error al eliminar la Ruta a Seguir');
        }
    }
);

export const { reset } = ruteToFollowSlice.actions;
export default ruteToFollowSlice.reducer;
