import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    loading: false,
    error: '',
    user_login: '',
    user_pass: '',
    user_email: '',
    first_name: '',
    last_name: '',
    client_id: 17
};

export const addClient = createAsyncThunk('users/addClient', async (client_data) => {
    try {
        const response = await axios.post('/wp-json/orb/v1/clients', client_data);
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
});

export const usersSlice = createSlice({
    name: 'users',
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

export default usersSlice;