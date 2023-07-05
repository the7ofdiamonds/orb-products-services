import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  error: '',
  receipt_id: '',
  payment_date: '',
  payment_time: '',
  payment_amount: '',
  payment_method: '',
  balance: ''
};

export const postReceipt = createAsyncThunk('receipt/postReceipt', async (invoice) => {
  try {
    const response = await axios.post('/wp-json/orb/v1/receipt', invoice);
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
  }});

export const receiptSlice = createSlice({
  name: 'receipt',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(postReceipt.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postReceipt.fulfilled, (state, action) => {
        state.loading = false;
        state.receipt = action.payload;
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
        state.receipt_id = action.payload.receipt_id;
        state.payment_date = action.payload.payment_date;
        state.payment_time = action.payload.payment_time;
        state.payment_amount = action.payload.payment_amount;
        state.payment_method = action.payload.payment_method;
        state.balance = action.payload.balance;
      })
      .addCase(getReceipt.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});