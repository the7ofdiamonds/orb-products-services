import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  error: '',
  payment_intent: '',
  amount_due: '',
  due_date: '',
  client_secret: '',
  status: '',
  payment_method_id: '',
  payment_method: ''
};

export const finalizeInvoice = createAsyncThunk('payment/finalizeInvoice', async (_, { getState }) => {
  const { client_id } = getState().client;
  const { stripe_customer_id, stripe_invoice_id } = getState().invoice;

  const data = {
    client_id: client_id,
    stripe_customer_id: stripe_customer_id
  };

  try {
    const response = await axios.post(`/wp-json/orb/v1/invoices/${stripe_invoice_id}/finalize`, data);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
});

export const getPaymentIntent = createAsyncThunk('payment/getPaymentIntent', async (_, { getState }) => {
  const { payment_intent } = getState().payment;

  try {
    const response = await axios.get(`/wp-json/orb/v1/stripe/payment_intents/${payment_intent}`);
    return response.data;

  } catch (error) {
    throw new Error(error.message);
  }
}
);

export const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(finalizeInvoice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(finalizeInvoice.fulfilled, (state, action) => {
        state.loading = false;
        state.payment_intent = action.payload.id;
        state.client_secret = action.payload.client_secret;
      })
      .addCase(finalizeInvoice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getPaymentIntent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPaymentIntent.fulfilled, (state, action) => {
        state.loading = false
        state.error = null
        state.client_secret = action.payload.client_secret
        state.status = action.payload.status
        state.payment_method_id = action.payload.payment_method_id
      })
      .addCase(getPaymentIntent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
  }
});