import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  error: '',
  receipt: {}
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
  try {
    const response = await axios.get(`/wp-json/orb/v1/receipt/${id}`);
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
        state.receipt = action.payload;
      })
      .addCase(getReceipt.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
    }
});