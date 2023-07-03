import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    loading: false,
    error: '',
    company_name: '',
    tax_id: '',
    first_name: '',
    last_name: '',
    user_email: '',
    phone: '',
    address_line_1: '',
    address_line_2: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    stripe_customer_id: '',
};

export const createCustomer = createAsyncThunk('customer/createCustomer', async (customer_data) => {
    try {
        const response = await axios.post('/wp-json/orb/v1/customers', customer_data);
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
});

export const clientSlice = createSlice({
    name: 'client',
    initialState,
    reducers: {
        updateEmail: (state, action) => {
            state.user_email = action.payload;
        },
        updatePhone: (state, action) => {
            state.phone = action.payload;
        },
        updateCompanyName: (state, action) => {
            state.company_name = action.payload;
        },
        updateTaxID: (state, action) => {
            state.tax_id = action.payload;
        },
        updateFirstName: (state, action) => {
            state.first_name = action.payload;
        },
        updateLastName: (state, action) => {
            state.last_name = action.payload;
        },
        updateAddress: (state, action) => {
            state.address_line_1 = action.payload;
        },
        updateAddress2: (state, action) => {
            state.address_line_2 = action.payload;
        },
        updateCity: (state, action) => {
            state.city = action.payload;
        },
        updateState: (state, action) => {
            state.state = action.payload;
        },
        updateZipcode: (state, action) => {
            state.zipcode = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createCustomer.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(createCustomer.fulfilled, (state, action) => {
                state.loading = false
                state.stripe_customer_id = action.payload
            })
            .addCase(createCustomer.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
    }
})

export const {
    updateEmail,
    updatePhone,
    updateCompanyName,
    updateTaxID,
    updateFirstName,
    updateLastName,
    updateAddress,
    updateAddress2,
    updateCity,
    updateState,
    updateZipcode,
} = clientSlice.actions;
export default clientSlice;