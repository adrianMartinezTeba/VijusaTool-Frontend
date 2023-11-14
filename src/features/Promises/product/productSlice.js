import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productService from "./productService";

const initialState = {
    products: [],
    product:  null,
    isLoading: false,
    isError: false,
    message: '',
    isSuccess: false
};
export const productSlice = createSlice({
    name: "product",
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

export const create = createAsyncThunk("product/create ",
    async (product, thunkAPI) => {
        try {
            return await productService.create(product);
        } catch (error) {
            console.error(error);
            return thunkAPI.rejectWithValue(message);
        }
    }
);
export const getProducts = createAsyncThunk("product/getProducts ",
    async (thunkAPI) => {
        try {
            return await productService.getProducts();
        } catch (error) {
            console.error(error);
            return thunkAPI.rejectWithValue(message);
        }
    }

);
export const getProductById = createAsyncThunk("product/getProductById ",
    async (id, thunkAPI) => {
        try {
            return await productService.getProductById(id);
        } catch (error) {
            console.error(error);
            return thunkAPI.rejectWithValue(message);
        }
    }

);

export const deleteProduct = createAsyncThunk("product/deleteProduct ", async (id, thunkAPI) => {
    try {
        return await productService.deleteProduct(id);
    } catch (error) {
        console.error(error);
        return thunkAPI.rejectWithValue(message);
    }
},
);
export const updateProduct = createAsyncThunk("product/updateProduct ", async (id, thunkAPI) => {
    try {
        return await productService.updateProduct(id);
    } catch (error) {

    } console.error(error);
    return thunkAPI.rejectWithValue(message);
})
export const { reset } = productSlice.actions;
export default productSlice.reducer;