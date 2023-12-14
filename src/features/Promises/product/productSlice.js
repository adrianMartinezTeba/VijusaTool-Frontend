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
    rawMaterialsSection: {
        rawMaterialsArrayToView: [],
        rawMaterialsArrayToSend: [],
    },
    operationToFollowSection: {
        operationToFollowToView: [],
        operationToFollowToSend: []
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
            state.rawMaterialsSection = initialState.rawMaterialsSection
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
            .addCase(addToCreateProductRMObj.fulfilled, (state, action) => {
                state.isLoading = false;
                console.log(action.payload);
                console.log('holi');
                state.createProductState.rawMaterials = action.payload
                state.message = 'Creado correctamente';
                state.isSuccess = true;
            })
            .addCase(addToCreateProductRMObj.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addToCreateProductRMObj.rejected, (state) => {
                state.isError = true;
            })
            .addCase(addToRMSectToView.fulfilled, (state, action) => {
                state.isLoading = false
                const addingData = { ...action.payload, precioDelCorte: '', cantidadDeCortes: '', precioTotalSobreEsaMateriaPrima: '', tamañoDelCorte: '' }
                state.rawMaterialsSection.rawMaterialsArrayToView = [...state.rawMaterialsSection.rawMaterialsArrayToView, addingData]
                state.message = 'Creado correctamente'
                state.isSuccess = true
            }).addCase(addToRMSectToSend.fulfilled, (state, action) => {
                console.log(action.payload._id);

                state.isLoading = false
                const addingData = { rawMaterialId: action.payload._id, precioDelCorte: '', cantidadDeCortes: '', precioTotalSobreEsaMateriaPrima: '', tamañoDelCorte: '' }
                state.rawMaterialsSection.rawMaterialsArrayToSend = [...state.rawMaterialsSection.rawMaterialsArrayToSend, addingData]
                state.message = 'Creado correctamente'
                state.isSuccess = true
            })
            .addCase(deleteRMSectToSend.fulfilled, (state, action) => {
                state.isLoading = false
                state.rawMaterialsSection.rawMaterialsArrayToSend = state.rawMaterialsSection.rawMaterialsArrayToSend.filter((data) => data.rawMaterialId !== action.payload)
                state.message = 'Eliminado correctamente'
                state.isSuccess = true
            })
            .addCase(deleteRMSectToView.fulfilled, (state, action) => {
                state.isLoading = false
                console.log(state.rawMaterialsSection.rawMaterialsArrayToView);
                console.log(action.payload);
                state.rawMaterialsSection.rawMaterialsArrayToView = state.rawMaterialsSection.rawMaterialsArrayToView.filter((data) => data._id !== action.payload)
                state.message = 'Eliminado correctamente'
                state.isSuccess = true
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
                    // Puedes agregar más casos según sea necesario para otras funciones

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

export const addToCreateProductRMObj = createAsyncThunk("product/addToCreateProductRMObj ", async (newData, thunkAPI) => {
    try {
        return await productService.addToCreateProductRMObj(newData);
    } catch (error) {

    } console.error(error);
    return thunkAPI.rejectWithValue(message);
})
export const addToRMSectToView = createAsyncThunk("product/addToRMSectToView ", async (newData, thunkAPI) => {
    try {
        return await productService.addToRMSectToView(newData);
    } catch (error) {

    } console.error(error);
    return thunkAPI.rejectWithValue(message);
})
export const addToRMSectToSend = createAsyncThunk("product/addToRMSectToSend ", async (newData, thunkAPI) => {
    try {
        return await productService.addToRMSectToSend(newData);
    } catch (error) {

    } console.error(error);
    return thunkAPI.rejectWithValue(message);
})
export const deleteRMSectToView = createAsyncThunk("product/deleteRMSectToView ", async (id, thunkAPI) => {
    try {
        return await productService.deleteRMSectToView(id);
    } catch (error) {
    } console.error(error);
    return thunkAPI.rejectWithValue(message);
})
export const deleteRMSectToSend = createAsyncThunk("product/deleteRMSectToSend ", async (id, thunkAPI) => {
    try {
        return await productService.deleteRMSectToSend(id);
    } catch (error) {
    } console.error(error);
    return thunkAPI.rejectWithValue(message);
})
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