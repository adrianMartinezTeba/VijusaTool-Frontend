import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import rawMaterialService from "./rawMaterialService";

const initialState = {
    rawMaterials: [],
    rawMaterial:  null,
    isLoadingRawMaterial: false,
    isErrorRawMaterial: false,
    messageRawMaterial: '',
    isSuccessRawMaterial: false
};
export const rawMaterialSlice = createSlice({
    name: "rawMaterial",
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoadingRawMaterial = false;
            state.isErrorRawMaterial = false;
            state.messageRawMaterial = '';
            state.isSuccessRawMaterial = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(create.fulfilled, (state, action) => {
                state.messageRawMaterial = 'Creado correctamente'
                state.isSuccessRawMaterial = true
                state.messageRawMaterial = 'Creado correctamente'
            })
            .addCase(create.pending, (state) => {
                state.isLoadingRawMaterial = true;
            })
            .addCase(create.rejected, (state) => {
                state.isErrorRawMaterial = true;
            })
    },
});

export const create = createAsyncThunk("rawMaterial/create ",
    async (rawMaterial, thunkAPI) => {
        try {
            return await rawMaterialService.create(rawMaterial);
        } catch (error) {
            console.error(error);
            return thunkAPI.rejectWithValue(messageRawMaterial);
        }
    }
);
export const getRM = createAsyncThunk("rawMaterial/getRM ",
    async (thunkAPI) => {
        try {
            return await rawMaterialService.getRM();
        } catch (error) {
            console.error(error);
            return thunkAPI.rejectWithValue(messageRawMaterial);
        }
    }

);
export const getRMById = createAsyncThunk("rawMaterial/getRMById ",
    async (id, thunkAPI) => {
        try {
            return await rawMaterialService.getRMById(id);
        } catch (error) {
            console.error(error);
            return thunkAPI.rejectWithValue(messageRawMaterial);
        }
    }

);

export const deleteRM = createAsyncThunk("rawMaterial/deleteRM ", async (id, thunkAPI) => {
    try {
        return await rawMaterialService.deleteRM(id);
    } catch (error) {
        console.error(error);
        return thunkAPI.rejectWithValue(messageRawMaterial);
    }
},
);
export const updateRM = createAsyncThunk("rawMaterial/updateRM ", async (id,updRM, thunkAPI) => {
    try {
        return await rawMaterialService.updateRM(id,updRM);
    } catch (error) {

    } console.error(error);
    return thunkAPI.rejectWithValue(messageRawMaterial);
})
export const { reset } = rawMaterialSlice.actions;
export default rawMaterialSlice.reducer;