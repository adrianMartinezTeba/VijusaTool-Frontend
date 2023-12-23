import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import contactService from "./contactService";

const initialState = {
    contacts: [],
    contactByName:[],
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
            state.contactByName = [];
            state.isLoading = false;
            state.isError = false;
            state.message = '';
            state.isSuccess = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createContact.fulfilled, (state, action) => {
                state.message = 'Creado correctamente'
                state.isSuccess = true
            })
            .addCase(createContact.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createContact.rejected, (state) => {
                state.isError = true;
            })
            .addCase(contactToCreate.fulfilled, (state, action) => {
                state.contact = action.payload
                state.message = 'Creado correctamente'
                state.isSuccess = true
            })
            .addCase(getContacts.fulfilled, (state,action) => {
                state.contacts = action.payload
            })
            .addCase(getContactByName.fulfilled, (state,action) => {
                console.log(action.payload);
                state.contactByName = action.payload
            })
            .addCase(getContactById.fulfilled, (state,action) => {
                state.contact = action.payload
            })
    },
});

export const createContact = createAsyncThunk("contact/createContact ",
    async (contact, thunkAPI) => {
        try {
            return await contactService.createContact(contact);
        } catch (error) {
            console.error(error);
            return thunkAPI.rejectWithValue(message);
        }
    }
);
export const contactToCreate = createAsyncThunk("contact/contactToCreate ",
    async (contact, thunkAPI) => {
        try {
            return await contactService.contactToCreate(contact);
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
export const getContactByName = createAsyncThunk("contact/getContactByName ",
    async (name, thunkAPI) => {
        
        try {
            return await contactService.getContactByName(name);
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