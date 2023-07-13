import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  error: '',
  receipt_id: '',
  invoice_id: '',
  amount_paid: '',
  payment_date: '',
  type: '',
  brand: '',
  last4: '',
  payment_method: '',
  amount_remaining: '',
};

export const getPaymentMethod = createAsyncThunk('receipt/getPaymentMethod', async (payment_method) => {

  try {
    const response = await axios.get(`/wp-json/orb/v1/payment/method/${payment_method}`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
});

export const postReceipt = createAsyncThunk('receipt/postReceipt', async (payment) => {

  try {
    const response = await axios.post('/wp-json/orb/v1/receipt', payment);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
});

export const getReceipt = createAsyncThunk('receipt/getReceipt', async (id) => {
  const response = await axios.get(`/wp-json/orb/v1/receipt/${id}`);
  try {
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
});

export const receiptSlice = createSlice({
  name: 'receipt',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getPaymentMethod.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPaymentMethod.fulfilled, (state, action) => {
        state.loading = false;
        state.payment_method = action.payload.id;
        state.type = action.payload.type;
        state.brand = action.payload.card.brand;
        state.last4 = action.payload.card.last4;
      })
      .addCase(getPaymentMethod.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(postReceipt.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postReceipt.fulfilled, (state, action) => {
        state.loading = false;
        state.receipt_id = action.payload;
      })
      .addCase(postReceipt.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getReceipt.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getReceipt.fulfilled, (state, action) => {
        state.loading = false;
        state.invoice_id = action.payload.invoice_id;
        state.payment_date = action.payload.payment_date;
        state.amount_due = action.payload.payment_amount;
        state.payment_method = action.payload.payment_method;
        state.amount_remaining = action.payload.balance;
        state.amount_paid = action.payload.amount_paid;
      })
      .addCase(getReceipt.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});