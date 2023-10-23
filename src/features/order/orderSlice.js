import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import OrderService from "./OrderService";

const initialState = {
    orders: [],
    order:  null,
    isLoading: false,
    isError: false,
    message: '',
    isSuccess: false
};
export const orderSlice = createSlice({
    name: "order",
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

export const create = createAsyncThunk("order/create ",
    async (order, thunkAPI) => {
        try {
            return await OrderService.create(order);
        } catch (error) {
            console.error(error);
            return thunkAPI.rejectWithValue(message);
        }
    }
);
export const get = createAsyncThunk("order/get ",
    async (thunkAPI) => {
        try {
            return await OrderService.get();
        } catch (error) {
            console.error(error);
            return thunkAPI.rejectWithValue(message);
        }
    }

);
export const getOrderById = createAsyncThunk("order/getOrderById ",
    async (id, thunkAPI) => {
        try {
            return await OrderService.getOrderById(id);
        } catch (error) {
            console.error(error);
            return thunkAPI.rejectWithValue(message);
        }
    }

);

export const deleteOrder = createAsyncThunk("order/deleteOrder ", async (id, thunkAPI) => {
    try {
        return await OrderService.deleteOrder(id);
    } catch (error) {
        console.error(error);
        return thunkAPI.rejectWithValue(message);
    }
},
);
export const updateOrder = createAsyncThunk("order/updateOrder ", async (id,updOrder, thunkAPI) => {
    try {
        return await OrderService.updateOrder(id,updOrder);
    } catch (error) {

    } console.error(error);
    return thunkAPI.rejectWithValue(message);
})
export const { reset } = orderSlice.actions;
export default orderSlice.reducer;