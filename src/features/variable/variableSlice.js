import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import variableService from "./variableService";

const initialState = {
    variables: [],
    variable: null,
    isLoading: false,
    isError: false,
    message: '',
    isSuccess: false
};
export const variableSlice = createSlice({
    name: "variable",
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
            .addCase(getVariables.fulfilled, (state, action) => {
                state.variables = action.payload
                state.message = 'Creado correctamente'
                state.isSuccess = true
            })
            .addCase(getVariables.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getVariables.rejected, (state) => {
                state.isError = true;
            })
            .addCase(getVariableById.fulfilled, (state, action) => {
                state.variable = action.payload
                state.message = 'Creado correctamente'
                state.isSuccess = true
            })
            .addCase(getVariableById.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getVariableById.rejected, (state) => {
                state.isError = true;
            })
            .addCase(deleteVariable.fulfilled, (state, action) => {
                state.message = 'Borrado correctamente'
                state.isSuccess = true
            })
            .addCase(deleteVariable.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteVariable.rejected, (state) => {
                state.isError = true;
            })
            .addCase(updateVariable.fulfilled, (state, action) => {
                state.message = 'Creado correctamente'
                state.isSuccess = true
            })
            .addCase(updateVariable.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateVariable.rejected, (state) => {
                state.isError = true;
            })
    },
});

export const create = createAsyncThunk("variable/create ",
    async (variable, thunkAPI) => {
        try {
            return await variableService.create(variable);
        } catch (error) {
            console.error(error);
            return thunkAPI.rejectWithValue(message);
        }
    }
);
export const getVariables = createAsyncThunk("variable/getVariables ",
    async (thunkAPI) => {
        try {
            return await variableService.getVariables();
        } catch (error) {
            console.error(error);
            return thunkAPI.rejectWithValue(message);
        }
    }

);
export const getVariableById = createAsyncThunk("variable/getVariableById ",
    async (id, thunkAPI) => {
        try {
            return await variableService.getVariableById(id);
        } catch (error) {
            console.error(error);
            return thunkAPI.rejectWithValue(message);
        }
    }

);

export const deleteVariable = createAsyncThunk("variable/deleteVariable ", async (id, thunkAPI) => {
    try {
        return await variableService.deleteVariable(id);
    } catch (error) {
        console.error(error);
        return thunkAPI.rejectWithValue(message);
    }
},
);
export const updateVariable = createAsyncThunk("variable/updateVariable ", async (id, thunkAPI) => {
    try {
        return await variableService.updateVariable(id);
    } catch (error) {

    } console.error(error);
    return thunkAPI.rejectWithValue(message);
})
export const { reset } = variableSlice.actions;
export default variableSlice.reducer;