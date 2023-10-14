import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  error: '',
  payment_intent_id: '',
  amount_due: '',
  due_date: '',
  client_secret: '',
  status: '',
  payment_method_id: '',
  payment_method: ''
};

export const updateClientSecret = (clientSecret) => {
  return {
    type: 'payment/updateClientSecret',
    payload: clientSecret
  };
};

export const getPaymentIntent = createAsyncThunk('payment/getPaymentIntent', async (_, { getState }) => {
  const { payment_intent_id } = getState().invoice;
  try {
    const response = await axios.get(`/wp-json/orb/v1/stripe/payment_intents/${payment_intent_id}`);
    return response.data;

  } catch (error) {
    throw new Error(error.message);
  }
}
);

export const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    updateClientSecret: (state, action) => {
      state.client_secret = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPaymentIntent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPaymentIntent.fulfilled, (state, action) => {
        state.loading = false
        state.error = null
        state.client_secret = action.payload.client_secret
        state.status = action.payload.status
        state.payment_method_id = action.payload.payment_method
      })
      .addCase(getPaymentIntent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
  }
});