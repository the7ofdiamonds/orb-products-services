import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  error: '',
  payment_intent_id: '',
  amount_due: '',
  date_due: '',
  client_secret: '',
  status: '',
  payment_method_id: '',
};

export const finalizeInvoice = createAsyncThunk('payment/finalizeInvoice', async (_, { getState }) => {
  const { stripe_invoice_id } = getState().invoice;

  try {
    const response = await axios.post(`/wp-json/orb/v1/invoice/finalize/${stripe_invoice_id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
});

export const updateStatus = (status) => {
  return {
    type: 'payment/updateStatus',
    payload: status
  };
};

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

export const getPaymentIntent = createAsyncThunk('payment/getPaymentIntent',
  async (_, { getState }) => {
    const { payment_intent_id } = getState().invoice;

    try {
      const response = await axios.get(`/wp-json/orb/v1/payment/intent/${payment_intent_id}`);
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
  reducers: {
    updateStatus: (state, action) => {
      state.status = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(finalizeInvoice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(finalizeInvoice.fulfilled, (state, action) => {
        state.loading = false;
        state.payment_intent_id = action.payload.id;
        state.amount_due = action.payload.amount_due;
        state.date_due = action.payload.date_due;
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
        state.loading = false;
        state.payment_intent_id = action.payload.id;
        state.amount_due = action.payload.amount_due;
        state.date_due = action.payload.date_due;
        state.client_secret = action.payload.client_secret;
        state.status = action.payload.status;
        state.payment_method_id = action.payload.payment_method;
      })
      .addCase(getPaymentIntent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
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