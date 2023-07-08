import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  error: '',
  receipt_id: '',
  invoice_id: '',
  payment_method_id: '',
  amount_paid: '',
  payment_date: '',
  card: '',
  last4: '',
  payment_method: '',
  balance: '',
};

export const getPaymentMethod = createAsyncThunk('receipt/getPaymentMethod', async (_, { getState }) => {
  const { payment_method_id } = getState().payment;

  try {
    const response = await axios.get(`/wp-json/orb/v1/payment/method/${payment_method_id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
});

export const postReceipt = createAsyncThunk('receipt/postReceipt', async (_, { getState }) => {
  const { invoice_id, amount_paid, balance, payment_date } = getState().invoice;
  const { payment_method_id } = getState().payment;
  const { card, last4 } = getState().receipt;

  const payment_method_card = `${card} ${last4}`;

  const receipt = {
    invoice_id: invoice_id,
    payment_method_id: payment_method_id,
    amount_paid: amount_paid,
    balance: balance,
    payment_date: payment_date,
    payment_method: payment_method_card,
  };

  try {
    const response = await axios.post('/wp-json/orb/v1/receipt', receipt);
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
        state.card = action.payload.card.brand;
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
        state.payment_method_id = action.payload.payment_method;
        state.balance = action.payload.balance;
        state.payment_method = action.payload.payment_method;
      })
      .addCase(getReceipt.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});