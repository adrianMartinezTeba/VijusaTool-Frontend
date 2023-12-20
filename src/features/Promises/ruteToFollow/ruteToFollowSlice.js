import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ruteToFollowService from "./ruteToFollowService";

const initialState = {
    RTFs: [],
    createRTF: {
        rawMaterials: [
            {
                productId: '',
                modelName: '',
                contactId: '',
                rawMaterialId: '',
                cantidadDeCortes: '',
                operationsToFollow:[
                    {
                        operationId: '',
                        notes: ''
                    }
                ]
            }
        ]
    },
    RTF:  null,
    isLoadingRTF: false,
    isErrorRTF: false,
    messageRTF: '',
    isSuccessRTF: false
};
export const ruteToFollowSlice = createSlice({
    name: "ruteToFollow",
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoadingRTF = false;
            state.isErrorRTF = false;
            state.messageRTF = '';
            state.isSuccessRTF = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createRTF.fulfilled, (state, action) => {
                state.messageRTF = 'Creado correctamente'
                state.isSuccessShape = true
                state.isLoadingShape = false
            })
    },
});

export const createRTF = createAsyncThunk("ruteToFollow/createRTF ",
    async (ruteToFollow, thunkAPI) => {
        try {
            return await ruteToFollowService.createRTF(ruteToFollow);
        } catch (error) {
            console.error(error);
            return thunkAPI.rejectWithValue(messageRTF);
        }
    }
);
export const { reset } = ruteToFollowSlice.actions;
export default ruteToFollowSlice.reducer;