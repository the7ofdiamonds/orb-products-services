import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    loading: false,
    error: '',
    client_id: '',
    stripe_customer_id: '',
    user_email: '',
    first_name: '',
    last_name: '',
};

export const addClient = createAsyncThunk('client/addClient', async (_, { getState }) => {
    const {
        company_name,
        tax_id,
        first_name,
        last_name,
        user_email,
        phone,
        address_line_1,
        address_line_2,
        city,
        state,
        zipcode,
        country
    } = getState().customer;

    const customer_data = {
        company_name: company_name,
        tax_id: tax_id,
        first_name: first_name,
        last_name: last_name,
        user_email: user_email,
        phone: phone,
        address_line_1: address_line_1,
        address_line_2: address_line_2,
        city: city,
        state: state,
        zipcode: zipcode,
        country: country
    };

    try {
        const response = await axios.post('/wp-json/orb/v1/users/clients', customer_data);
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
});

export const getClient = createAsyncThunk('client/getClient', async (user_email) => {
    const client_data = {
        user_email: user_email
    };
    try {
        const response = await axios.get('/wp-json/orb/v1/users/clients', client_data);
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
                state.client_id = action.payload.client_id
                state.stripe_customer_id = action.payload.stripe_customer_id
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
                state.client_id = action.payload.client_id
                state.stripe_customer_id = action.payload.stripe_customer_id
            })
            .addCase(getClient.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
    }
})

export default clientSlice;