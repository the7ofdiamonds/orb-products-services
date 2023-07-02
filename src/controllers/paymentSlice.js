import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  error: '',
  payment_intent: '',
  payment_intent_id: '',
  client_secret: '',
};

export const finalizeInvoice = createAsyncThunk('payment/finalizeInvoice', async (stripe_invoice_id) => {
  try {
    const response = await axios.post(`/wp-json/orb/v1/invoice/finalize/${stripe_invoice_id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
});

export const createPaymentIntent = createAsyncThunk(
  'payment/createPaymentIntent',
  async (invoice_id, email, subtotal) => {

    const formData = new FormData();
    formData.append('invoice_id,', invoice_id);
    formData.append('email', email);
    formData.append('message', subtotal);

    try {
      const response = await axios.post('/wp-json/orb/v1/payment/intent', formData);
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

export const updatePaymentIntent = createAsyncThunk('payment/updatePaymentIntent', async (update, { getState }) => {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  };
  const { payment_intent_id } = getState().invoice;

  const response = await axios.post(
    `/wp-json/orb/v1/payment/intent/${payment_intent_id}`,
    update,
    config
  );

  return response.data;
});


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
        state.payment_intent = action.payload;
        state.payment_intent_id = action.payload.id;
        state.client_secret = action.payload.client_secret;
      })
      .addCase(finalizeInvoice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createPaymentIntent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPaymentIntent.fulfilled, (state, action) => {
        state.loading = false;
        state.payment_intent_id = action.payload.id;
        state.client_secret = action.payload.client_secret;
        state.payment_intent = action.payload;
      })
      .addCase(createPaymentIntent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updatePaymentIntent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePaymentIntent.fulfilled, (state, action) => {
        state.loading = false;
        state.payment_intent = action.payload;
      })
      .addCase(updatePaymentIntent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});