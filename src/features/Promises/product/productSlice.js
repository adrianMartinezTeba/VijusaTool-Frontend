import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productService from "./productService";

const initialState = {
    productsData: [],
    createProductState: {
        modelName: '',
        rawMaterials: [],
        operationToFollow: [],
        customerId: '',
        totalPrice: '',
        notes: ''
    },
    getProduct: '',
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
            // state.rawMaterialsSection = initialState.rawMaterialsSection
            state.createProductState.rawMaterials = initialState.createProductState.rawMaterials
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
            .addCase(addToCreateProductState.fulfilled, (state, action) => {
                state.isLoading = false;
                const { functionName, data } = action.meta.arg;
                // Actualizar el estado según la función ejecutada
                switch (functionName) {
                    case 'addCustomerId':
                        state.createProductState.customerId = data;
                        break;
                    case 'addModelName':
                        state.createProductState.modelName = data;
                        break;
                    case 'addRawMaterials':
                        state.createProductState.rawMaterials = data
                        break;
                    case 'deleteRawMaterial':
                        console.log(data);
                        const newRawMaterials = [...state.createProductState.rawMaterials];
                        newRawMaterials.splice(data, 1);
                        state.createProductState.rawMaterials = newRawMaterials;
                        break;
                    case 'addOperation':
                        state.createProductState.operationToFollow = data;
                        break;
                    case 'deleteOperation':
                        console.log(data);
                        const newOperationToFollow = [...state.createProductState.operationToFollow];
                        newOperationToFollow.splice(data, 1);
                        state.createProductState.operationToFollow = newOperationToFollow
                        break;
                    case 'addTotalPrice':
                        state.createProductState.totalPrice = data;
                        break;
                    default:
                        break;
                }

                state.message = 'Creado correctamente';
                state.isSuccess = true;
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
export const addToCreateProductState = createAsyncThunk(
    "product/addToCreateProductState",
    async ({ functionName, data }, thunkAPI) => {
        try {
            return await productService.addToCreateProductState.executeFunction(functionName, data);
        } catch (error) {
            console.error(error);
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
export const { reset } = productSlice.actions;
export default productSlice.reducer;