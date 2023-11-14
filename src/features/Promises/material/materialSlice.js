import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import materialService from "./materialService";

const initialState = {
    materials: [],
    material:  null,
    isLoadingMaterial: false,
    isErrorMaterial: false,
    messageMaterial: '',
    isSuccessMaterial: false
};
export const materialSlice = createSlice({
    name: "material",
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoadingMaterial = false;
            state.isErrorMaterial = false;
            state.messageMaterial = '';
            state.isSuccessMaterial = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(create.fulfilled, (state, action) => {
                state.messageMaterial = 'Creado correctamente'
                state.isSuccessMaterial = true
                state.isLoadingMaterial = false
            })
            .addCase(create.pending, (state) => {
                state.isLoadingMaterial = true;
            })
            .addCase(create.rejected, (state) => {
                state.isErrorMaterial = true;
            })
            .addCase(getMaterials.fulfilled, (state, action) => {
                state.materials = action.payload
                state.messageMaterial = 'Creado correctamente'
                state.isSuccessMaterial = true
            })
            .addCase(getMaterials.pending, (state) => {
                state.isLoadingMaterial = true;
            })
            .addCase(getMaterials.rejected, (state) => {
                state.isErrorMaterial = true;
            })
    },
});

export const create = createAsyncThunk("material/create ",
    async (material, thunkAPI) => {
        try {
           
            return await materialService.create(material);
        } catch (error) {
            console.error(error);
            return thunkAPI.rejectWithValue(messageMaterial);
        }
    }
);
export const getMaterials = createAsyncThunk("material/getMaterials ",
    async (thunkAPI) => {
        try {
            return await materialService.getMaterials();
        } catch (error) {
            console.error(error);
            return thunkAPI.rejectWithValue(messageMaterial);
        }
    }

);
export const getMaterialById = createAsyncThunk("material/getMaterialById ",
    async (id, thunkAPI) => {
        try {
            return await materialService.getMaterialById(id);
        } catch (error) {
            console.error(error);
            return thunkAPI.rejectWithValue(messageMaterial);
        }
    }

);

export const deleteMaterial = createAsyncThunk("material/deleteMaterial ", async (id, thunkAPI) => {
    try {
        return await materialService.deleteMaterial(id);
    } catch (error) {
        console.error(error);
        return thunkAPI.rejectWithValue(messageMaterial);
    }
},
);
export const updateMaterial = createAsyncThunk("material/updateMaterial ", async (id,updMaterial, thunkAPI) => {
    try {
        return await materialService.updateMaterial(id,updMaterial);
    } catch (error) {

    } console.error(error);
    return thunkAPI.rejectWithValue(messageMaterial);
})
export const { reset } = materialSlice.actions;
export default materialSlice.reducer;