import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchManagers = createAsyncThunk('managers/fetchManagers', async () => {
    const {data} = await axios.get('/managers');
    return data;
});

export const fetchRemoveManager = createAsyncThunk('managers/fetchRemoveManager', async (id) =>
    axios.delete(`/managers/${id}`)
);

export const fetchUpdateManager = createAsyncThunk('managers/fetchUpdateManager', async ({ managerId, id, flag }) => {
    const response = await axios.patch(`/managers/${managerId}`, flag);
    return { managerId };
});

export const transferClients = createAsyncThunk('managers/transferClients', async ({ sourceManagerId, targetManagerId, clientIds }) => {
    const response = await axios.post('/transfer-clients', { sourceManagerId, targetManagerId, clientIds });
    return response.data;
});

const initialState = {
    managers: {
        items: [],
        status: 'loading'
    }
};

const managersSlice = createSlice({
    name: 'managers',
    initialState,
    reducer: {},
    extraReducers: {
        // Получение менеджеров
        [fetchManagers.pending]: (state) => {
            state.managers.status = 'loading';
        },
        [fetchManagers.fulfilled]: (state, action) => {
            state.managers.items = action.payload;
            state.managers.status = 'loaded';
        },
        [fetchManagers.rejected]: (state) => {
            state.managers.items = [];
            state.managers.status = 'error';
        },

        // Удаление менеджера
        [fetchRemoveManager.pending]: (state, action) => {
            state.managers.items = state.managers.items.filter(obj => obj._id !== action.meta.arg);
        },





        //Обновление менеджера
        [fetchUpdateManager.pending]: (state) => {
            state.managers.status = 'loading';
        },
        [fetchUpdateManager.fulfilled]: (state, action) => {
            const updatedManagerId = action.meta.arg.managerId;
            const updatedClientId = action.meta.arg.id;

            const index = state.managers.items.findIndex(manager => manager._id === updatedManagerId);

            if (index !== -1) {
                // Используем map для обновления массива clients
                state.managers.items[index] = {
                    ...state.managers.items[index],
                    clients: state.managers.items[index].clients.filter(client => client._id !== updatedClientId),
                };
            }

            state.managers.status = 'loaded';
        },


        [transferClients.pending]: (state) => {
            state.managers.status = 'loading';
        },
        [transferClients.fulfilled]: (state, action) => {
            // Handle the successful transfer if needed
            state.managers.status = 'loaded';
        },
        [transferClients.rejected]: (state) => {
            // Handle the error if needed
            state.managers.status = 'error';
        },


    },
});

export const managersReducer = managersSlice.reducer;