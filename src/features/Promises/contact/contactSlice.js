import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import contactService from "./contactService";

const initialState = {
    contacts: [],
    contact:  null,
    isLoading: false,
    isError: false,
    message: '',
    isSuccess: false
};
export const contactSlice = createSlice({
    name: "contact",
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isError = false;
            state.message = '';
            state.isSuccess = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(create.fulfilled, (state, action) => {
                state.message = 'Creado correctamente'
                state.isSuccess = true
            })
            .addCase(create.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(create.rejected, (state) => {
                state.isError = true;
            })
    },
});

export const create = createAsyncThunk("contact/create ",
    async (contact, thunkAPI) => {
        try {
            return await contactService.create(contact);
        } catch (error) {
            console.error(error);
            return thunkAPI.rejectWithValue(message);
        }
    }
);
export const getContacts = createAsyncThunk("contact/getContacts ",
    async (thunkAPI) => {
        try {
            return await contactService.getContacts();
        } catch (error) {
            console.error(error);
            return thunkAPI.rejectWithValue(message);
        }
    }

);
export const getContactById = createAsyncThunk("contact/getContactById ",
    async (id, thunkAPI) => {
        try {
            return await contactService.getContactById(id);
        } catch (error) {
            console.error(error);
            return thunkAPI.rejectWithValue(message);
        }
    }

);

export const deleteContact = createAsyncThunk("contact/deleteContact ", async (id, thunkAPI) => {
    try {
        return await contactService.deleteContact(id);
    } catch (error) {
        console.error(error);
        return thunkAPI.rejectWithValue(message);
    }
},
);
export const updateProduct = createAsyncThunk("contact/updateProduct ", async (id,updContact, thunkAPI) => {
    try {
        return await contactService.updateProduct(id,updContact);
    } catch (error) {

    } console.error(error);
    return thunkAPI.rejectWithValue(message);
})
export const { reset } = contactSlice.actions;
export default contactSlice.reducer;