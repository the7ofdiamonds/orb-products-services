import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    loading: false,
    error: '',
    client_id: '',
    stripe_customer_id: '',
    user_email: sessionStorage.getItem('user_email'),
    first_name: '',
    last_name: '',
};

export const addClient = createAsyncThunk('client/addClient', async (_, { getState }) => {
    const { user_email } = getState().client;
    const {
        company_name,
        tax_id,
        first_name,
        last_name,
        phone,
        address_line_1,
        address_line_2,
        city,
        state,
        zipcode,
        country
    } = getState().customer;

    try {
        const response = await fetch('/wp-json/orb/v1/users/clients', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
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
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            const errorMessage = errorData.message;
            throw new Error(errorMessage);
        }

        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.log(error)
        throw error.message;
    }
});

export const getClient = createAsyncThunk('client/getClient', async (_, { getState }) => {
    const { user_email } = getState().client;
    const encodedEmail = encodeURIComponent(user_email);

    try {
        const response = await fetch(`/wp-json/orb/v1/users/clients/${encodedEmail}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            const errorMessage = errorData.message;
            throw new Error(errorMessage);
        }

        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.log(error)
        throw error.message;
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
                state.loading = false;
                state.error = null;
                state.client_id = action.payload.id
                state.first_name = action.payload.first_name
                state.last_name = action.payload.last_name
                state.stripe_customer_id = action.payload.stripe_customer_id
            })
            .addCase(getClient.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
    }
})

export default clientSlice;