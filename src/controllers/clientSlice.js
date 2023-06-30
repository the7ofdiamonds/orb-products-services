import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    loading: false,
    error: '',
    username: '',
    password: '',
    email: '',
    client_id: ''
};

export const addClient = createAsyncThunk('client/addClient', async (client_data) => {
    try {
        const response = await axios.post('/wp-json/orb/v1/clients', client_data);
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
});

export const clientSlice = createSlice({
    name: 'client',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(addClient.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(addClient.fulfilled, (state, action) => {
                state.loading = false
                state.client_id = action.payload
            })
            .addCase(addClient.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
    }
})

export default clientSlice;