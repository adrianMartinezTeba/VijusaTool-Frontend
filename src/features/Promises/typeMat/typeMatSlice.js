import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import typeMatService from "./typeMatService";

const initialState = {
    typeMats: [],
    typeMat:  null,
    isLoadingTypeMat: false,
    isErrorTypeMat: false,
    messageTypeMat: '',
    isSuccessTypeMat: false
};
export const typeMatSlice = createSlice({
    name: "typeMat",
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoadingTypeMat = false;
            state.isErrorTypeMat = false;
            state.messageTypeMat = '';
            state.isSuccessTypeMat = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(create.fulfilled, (state, action) => {
                state.messageTypeMat = 'Creado correctamente'
                state.isSuccessTypeMat = true
                state.isLoadingTypeMat = false
            })
            .addCase(create.pending, (state) => {
                state.isLoadingTypeMat = true;
            })
            .addCase(create.rejected, (state) => {
                state.isErrorTypeMat = true;
            })
            .addCase(getTypeMats.fulfilled, (state, action) => {
                state.typeMats = action.payload
                state.messageTypeMat = 'Creado correctamente'
                state.isSuccessTypeMat = true
            })
            .addCase(getTypeMats.pending, (state) => {
                state.isLoadingTypeMat = true;
            })
            .addCase(getTypeMats.rejected, (state) => {
                state.isErrorTypeMat = true;
            })
    },
});

export const create = createAsyncThunk("typeMat/create ",
    async (typeMat, thunkAPI) => {
        try {
            return await typeMatService.create(typeMat);
        } catch (error) {
            console.error(error);
            return thunkAPI.rejectWithValue(messageTypeMat);
        }
    }
);
export const getTypeMats = createAsyncThunk("typeMat/getTypeMats ",
    async (thunkAPI) => {
        try {
            return await typeMatService.getTypeMats();
        } catch (error) {
            console.error(error);
            return thunkAPI.rejectWithValue(messageTypeMat);
        }
    }

);
export const getTypeMatById = createAsyncThunk("typeMat/getTypeMatById ",
    async (id, thunkAPI) => {
        try {
            return await typeMatService.getTypeMatById(id);
        } catch (error) {
            console.error(error);
            return thunkAPI.rejectWithValue(messageTypeMat);
        }
    }

);

export const deleteTypeMat = createAsyncThunk("typeMat/deleteTypeMat ", async (id, thunkAPI) => {
    try {
        return await typeMatService.deleteTypeMat(id);
    } catch (error) {
        console.error(error);
        return thunkAPI.rejectWithValue(messageTypeMat);
    }
},
);
export const updateTypeMat = createAsyncThunk("typeMat/updateTypeMat ", async (id,updOrder, thunkAPI) => {
    try {
        return await typeMatService.updateTypeMat(id,updOrder);
    } catch (error) {

    } console.error(error);
    return thunkAPI.rejectWithValue(messageTypeMat);
})
export const { reset } = typeMatSlice.actions;
export default typeMatSlice.reducer;