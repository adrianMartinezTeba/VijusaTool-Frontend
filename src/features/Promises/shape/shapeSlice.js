import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import shapeService from "./shapeService";

const initialState = {
    shapes: [],
    shape:  null,
    isLoadingShape: false,
    isErrorShape: false,
    messageShape: '',
    isSuccessShape: false
};
export const shapeSlice = createSlice({
    name: "shape",
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoadingShape = false;
            state.isErrorShape = false;
            state.messageShape = '';
            state.isSuccessShape = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createShape.fulfilled, (state, action) => {
                state.messageShape = 'Creado correctamente'
                state.isSuccessShape = true
                state.isLoadingShape = false
            })
            .addCase(createShape.pending, (state) => {
                state.isLoadingShape = true;
            })
            .addCase(createShape.rejected, (state) => {
                state.isErrorShape = true;
            }).addCase(shapeToCreate.fulfilled, (state, action) => {
                state.shape = action.payload
                state.messageShape = 'Creado correctamente'
                state.isSuccessShape = true
            }).addCase(getShapes.fulfilled, (state, action) => {
                state.shapes = action.payload
                state.messageShape = 'Creado correctamente'
                state.isSuccessShape = true
            })
            .addCase(getShapes.pending, (state) => {
                state.isLoadingShape = true;
            })
            .addCase(getShapes.rejected, (state) => {
                state.isErrorShape = true;
            })
    },
});

export const createShape = createAsyncThunk("shape/createShape ",
    async (shape, thunkAPI) => {
        try {
            return await shapeService.createShape(shape);
        } catch (error) {
            console.error(error);
            return thunkAPI.rejectWithValue(messageShape);
        }
    }
);
export const shapeToCreate = createAsyncThunk("shape/shapeToCreate ",
    async (shape, thunkAPI) => {
        try {
            return await shapeService.shapeToCreate(shape);
        } catch (error) {
            console.error(error);
            return thunkAPI.rejectWithValue(messageShape);
        }
    }
);
export const getShapes = createAsyncThunk("shape/getShapes ",
    async (thunkAPI) => {
        try {
            return await shapeService.getShapes();
        } catch (error) {
            console.error(error);
            return thunkAPI.rejectWithValue(messageShape);
        }
    }

);
export const getShapeById = createAsyncThunk("shape/getShapeById ",
    async (id, thunkAPI) => {
        try {
            return await shapeService.getShapeById(id);
        } catch (error) {
            console.error(error);
            return thunkAPI.rejectWithValue(messageShape);
        }
    }

);

export const deleteShape = createAsyncThunk("shape/deleteShape ", async (id, thunkAPI) => {
    try {
        return await shapeService.deleteShape(id);
    } catch (error) {
        console.error(error);
        return thunkAPI.rejectWithValue(messageShape);
    }
},
);
export const updateShape = createAsyncThunk("shape/updateShape ", async (id,updShape, thunkAPI) => {
    try {
        return await shapeService.updateShape(id,updShape);
    } catch (error) {

    } console.error(error);
    return thunkAPI.rejectWithValue(messageShape);
})
export const { reset } = shapeSlice.actions;
export default shapeSlice.reducer;