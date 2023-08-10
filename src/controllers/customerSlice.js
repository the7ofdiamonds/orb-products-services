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

export const addStripeCustomer = createAsyncThunk('customer/addStripeCustomer', async (_, { getState }) => {
    const {
        client_id,
        user_email
    } = getState().client;
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

    const customer_data = {
        client_id: client_id,
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
        const response = await axios.post('/wp-json/orb/v1/stripe/customers', customer_data);
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
});

export const getStripeCustomer = createAsyncThunk('customer/getStripeCustomer', async (_, { getState }) => {
    const { stripe_customer_id } = getState().client;

    try {
        const response = await axios.get(`/wp-json/orb/v1/stripe/customers/${stripe_customer_id}`);
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
});

export const updateStripeCustomer = createAsyncThunk('customer/updateStripeCustomer', async (_, { getState }) => {
    const {
        client_id,
        user_email,
        stripe_customer_id
    } = getState().client;
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

    const customer_data = {
        client_id: client_id,
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
        const response = await axios.patch(`/wp-json/orb/v1/stripe/customers/${stripe_customer_id}`, customer_data);
        console.log(response.data)
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
});

export const customerSlice = createSlice({
    name: 'customer',
    initialState,
    reducers: {
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
        updateEmail: (state, action) => {
            state.user_email = action.payload;
        },
        updatePhone: (state, action) => {
            state.phone = action.payload;
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
            .addCase(addStripeCustomer.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(addStripeCustomer.fulfilled, (state, action) => {
                state.loading = false
                state.stripe_customer_id = action.payload
            })
            .addCase(addStripeCustomer.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            .addCase(getStripeCustomer.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(getStripeCustomer.fulfilled, (state, action) => {
                state.loading = false
                state.stripe_customer_id = action.payload.id;
                state.company_name = action.payload.name;
                state.first_name = action.payload.first_name;
                state.last_name = action.payload.last_name;
                state.address_line_1 = action.payload.address.line1
                state.address_line_2 = action.payload.address.line2
                state.city = action.payload.address.city
                state.state = action.payload.address.state
                state.zipcode = action.payload.address.postal_code
                state.email = action.payload.email
                state.phone = action.payload.phone
            })
            .addCase(getStripeCustomer.rejected, (state, action) => {
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
} = customerSlice.actions;
export default customerSlice;