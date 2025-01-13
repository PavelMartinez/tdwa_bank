import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchClients = createAsyncThunk('clients/fetchClients', async () => {
    const {data} = await axios.get('/clients');
    return data;
});

export const fetchRemoveClient = createAsyncThunk('clients/fetchRemoveClient', async (id) => {
    const response = await axios.delete(`/clients/${id}`)
    return {id};
});


const initialState = {
    clients: {
        items: [],
        status: 'loading'
    },
};

const clientsSlice = createSlice({
    name: 'clients',
    initialState,
    reducer: {},
    extraReducers: {
        // Получение клиентов
        [fetchClients.pending]: (state) => {
            state.clients.status = 'loading';
        },
        [fetchClients.fulfilled]: (state, action) => {
            state.clients.items = action.payload;
            state.clients.status = 'loaded';
        },
        [fetchClients.rejected]: (state) => {
            state.clients.items = [];
            state.clients.status = 'error';
        },

        // Удаление клиентов
        [fetchRemoveClient.pending]: (state, action) => {
            state.clients.items = state.clients.items.filter(obj => obj._id !== action.meta.arg);
        },



    },
});

export const clientsReducer = clientsSlice.reducer;