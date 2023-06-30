import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    loading: false,
    error: '',
    name: '',
    email: '',
    customer_id: ''
};

export const createCustomer = createAsyncThunk('customer/createCustomer', async (customer_data) => {
    try {
        const response = await axios.post('/wp-json/orb/v1/customers', customer_data);
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
});

export const customerSlice = createSlice({
    name: 'customer',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(createCustomer.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(createCustomer.fulfilled, (state, action) => {
                state.loading = false
                state.customer_id = action.payload
            })
            .addCase(createCustomer.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
    }
})

export default customerSlice;