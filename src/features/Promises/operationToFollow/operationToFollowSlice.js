import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import operationToFollowService from "./operationToFollowService";

const initialState = {
    operationsTF: [],
    operationToFollow:  null,
    isLoading: false,
    isError: false,
    message: '',
    isSuccess: false
};
export const operationToFollowSlice = createSlice({
    name: "operationToFollow",
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
            .addCase(createOTF.fulfilled, (state, action) => {
                state.message = 'Creado correctamente'
                state.isSuccess = true
                state.isLoading = false
            })
            .addCase(createOTF.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createOTF.rejected, (state) => {
                state.isError = true;
            })
            .addCase(OTFToCreate.fulfilled, (state,action) => {
                state.operationToFollow = action.payload
                state.isSuccess = true
                state.isLoading = false
            })
            .addCase(getOTF.fulfilled, (state, action) => {
                state.operationsTF = action.payload
                state.isSuccess = true
                state.isLoading = false
            })
            .addCase(getOTF.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getOTF.rejected, (state) => {
                state.isError = true;
            })
            .addCase(getOTFById.fulfilled, (state, action) => {
                state.operationToFollow = action.payload
                state.isSuccess = true
                state.isLoading = false
            })
    },
});

export const createOTF = createAsyncThunk("operationToFollow/createOTF ",
    async (operationToFollow, thunkAPI) => {
        try {
            return await operationToFollowService.createOTF(operationToFollow);
        } catch (error) {
            console.error(error);
            return thunkAPI.rejectWithValue(message);
        }
    }
);
export const OTFToCreate = createAsyncThunk("operationToFollow/OTFToCreate ",
    async (operationToFollow, thunkAPI) => {
        try {
            return await operationToFollowService.OTFToCreate(operationToFollow);
        } catch (error) {
            console.error(error);
            return thunkAPI.rejectWithValue(message);
        }
    }
);
export const getOTF = createAsyncThunk("operationToFollow/getOTF ",
    async (thunkAPI) => {
        try {
            return await operationToFollowService.getOTF();
        } catch (error) {
            console.error(error);
            return thunkAPI.rejectWithValue(message);
        }
    }

);
export const getOTFById = createAsyncThunk("operationToFollow/getOTFById ",
    async (id, thunkAPI) => {
        try {
            return await operationToFollowService.getOTFById(id);
        } catch (error) {
            console.error(error);
            return thunkAPI.rejectWithValue(message);
        }
    }

);

export const deleteOTF = createAsyncThunk("operationToFollow/deleteOTF ", async (id, thunkAPI) => {
    try {
        return await operationToFollowService.deleteOTF(id);
    } catch (error) {
        console.error(error);
        return thunkAPI.rejectWithValue(message);
    }
},
);
export const updateOTF = createAsyncThunk("operationToFollow/updateOTF ", async (id,updOTF, thunkAPI) => {
    try {
        return await operationToFollowService.updateOTF(id,updOTF);
    } catch (error) {

    } console.error(error);
    return thunkAPI.rejectWithValue(message);
})
export const { reset } = operationToFollowSlice.actions;
export default operationToFollowSlice.reducer;