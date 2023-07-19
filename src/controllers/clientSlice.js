import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    loading: false,
    error: '',
    client_id: '',
    user_email: '',
    first_name: '',
    last_name: '',
};

export const addClient = createAsyncThunk('client/addClient', async (user_email) => {
    try {
        const response = await axios.post('/wp-json/orb/v1/users/clients', { user_email: user_email });
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
});

export const getClient = createAsyncThunk('client/getClient', async (_, { getState }) => {
    const { client_id } = getState().client;

    try {
        const response = await axios.get(`/wp-json/orb/v1/users/clients/${client_id}`);
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
            .addCase(getClient.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(getClient.fulfilled, (state, action) => {
                state.loading = false
                state.first_name = action.payload.first_name
                state.last_name = action.payload.last_name
                state.user_email = action.payload.user_email
            })
            .addCase(getClient.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
    }
})

export default clientSlice;