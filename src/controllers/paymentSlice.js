import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  paymentLoading: false,
  paymentError: '',
  payment_intent_id: '',
  amount_due: '',
  due_date: '',
  client_secret: '',
  paymentStatus: '',
  payment_method_id: '',
  payment_method: ''
};

export const updateClientSecret = (clientSecret) => {
  return {
    type: 'payment/updateClientSecret',
    payload: clientSecret
  };
};

export const getPaymentIntent = createAsyncThunk('payment/getPaymentIntent', async (paymentIntentID, { getState }) => {
  const { payment_intent_id } = getState().invoice;

  try {
    const response = await fetch(`/wp-json/orb/v1/stripe/payment_intents/${paymentIntentID ? paymentIntentID : payment_intent_id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage = errorData.message;
      throw new Error(errorMessage);
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    throw error;
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
        state.paymentError = '';
      })
      .addCase(getPaymentIntent.fulfilled, (state, action) => {
        state.loading = false
        state.paymentError = null
        state.client_secret = action.payload.client_secret
        state.paymentStatus = action.payload.status
        state.payment_method_id = action.payload.payment_method
      })
      .addCase(getPaymentIntent.rejected, (state, action) => {
        state.loading = false;
        state.paymentError = action.error.message;
      })
  }
});