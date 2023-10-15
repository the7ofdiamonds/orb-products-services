import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  receiptError: '',
  receipts: [],
  receipt_id: '',
  invoice_id: '',
  stripe_invoice_id: '',
  stripe_customer_id: '',
  payment_method_id: '',
  amount_paid: '',
  payment_date: '',
  balance: '',
  type: '',
  brand: '',
  last4: '',
  payment_method: '',
  amount_remaining: '',
};

export const updateReceiptID = (receiptID) => {
  return {
    type: 'payment/updateReceiptID',
    payload: receiptID
  };
};

export const getPaymentMethod = createAsyncThunk('receipt/getPaymentMethod', async (payment_method_id) => {
  try {
    const response = await fetch(`/wp-json/orb/v1/stripe/payment_methods/${payment_method_id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage = errorData.message;
      throw new Error(errorMessage);
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    throw error.message;
  }
});

export const updatePaymentMethod = (paymentMethod) => {
  return {
    type: 'receipt/updatePaymentMethod',
    payload: paymentMethod
  };
};

export const postReceipt = createAsyncThunk('receipt/postReceipt', async (_, { getState }) => {
  const { stripe_customer_id, first_name, last_name } = getState().client;
  const { invoice_id, stripe_invoice_id } = getState().invoice;
  const { payment_method_id, amount_paid, payment_date, balance, payment_method } = getState().receipt;

  const payment = {
    stripe_customer_id: stripe_customer_id,
    invoice_id: invoice_id,
    stripe_invoice_id: stripe_invoice_id,
    payment_method_id: payment_method_id,
    amount_paid: amount_paid,
    payment_date: payment_date,
    balance: balance,
    payment_method: payment_method,
    first_name: first_name,
    last_name: last_name,
  };

  try {
    const response = await axios.post('/wp-json/orb/v1/receipt', payment);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
}
);

export const getReceipt = createAsyncThunk('receipt/getReceipt', async (_, { getState }) => {
  const { stripe_customer_id } = getState().client;
  const { stripe_invoice_id } = getState().invoice;

  try {
    const response = await fetch(`/wp-json/orb/v1/receipt/${stripe_invoice_id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        stripe_customer_id: stripe_customer_id
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage = errorData.message;
      throw new Error(errorMessage);
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    throw error.message;
  }
});

export const getReceiptByID = createAsyncThunk('receipt/getReceiptByID', async (id, { getState }) => {
  const { stripe_customer_id } = getState().client;

  try {
    const response = await fetch(`/wp-json/orb/v1/receipt/${id}/id`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        stripe_customer_id: stripe_customer_id
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage = errorData.message;
      throw new Error(errorMessage);
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    throw error.message;
  }
});

export const getClientReceipts = createAsyncThunk('receipt/getClientReceipts', async (_, { getState }) => {
  const { stripe_customer_id } = getState().client;

  try {
    const response = await fetch(`/wp-json/orb/v1/receipts/client/${stripe_customer_id}`, {
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
    throw error.message;
  }
});

export const receiptSlice = createSlice({
  name: 'receipt',
  initialState,
  reducers: {
    updateReceiptID: (state, action) => {
      state.receipt_id = action.payload;
    },
    updatePaymentMethod: (state, action) => {
      state.payment_method = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPaymentMethod.pending, (state) => {
        state.loading = true;
        state.receiptError = '';
      })
      .addCase(getPaymentMethod.fulfilled, (state, action) => {
        state.loading = false;
        state.receiptError = null;
        state.payment_method = action.payload;
      })
      .addCase(getPaymentMethod.rejected, (state, action) => {
        state.loading = false;
        state.receiptError = action.error.message;
      })
      .addCase(postReceipt.pending, (state) => {
        state.loading = true;
        state.receiptError = null;
      })
      .addCase(postReceipt.fulfilled, (state, action) => {
        state.loading = false;
        state.receiptError = null;
        state.receipt_id = action.payload;
      })
      .addCase(postReceipt.rejected, (state, action) => {
        state.loading = false;
        state.receiptError = action.error.message;
      })
      .addCase(getReceipt.pending, (state) => {
        state.loading = true;
        state.receiptError = null;
      })
      .addCase(getReceipt.fulfilled, (state, action) => {
        state.loading = false;
        state.receiptError = null;
        state.receipt_id = action.payload.id;
        state.created_at = action.payload.created_at;
        state.stripe_invoice_id = action.payload.stripe_invoice_id;
        state.stripe_customer_id = action.payload.stripe_customer_id;
        state.payment_method_id = action.payload.payment_method_id;
        state.amount_paid = action.payload.amount_paid;
        state.payment_date = action.payload.payment_date;
        state.balance = action.payload.balance;
        state.payment_method = action.payload.payment_method;
        state.first_name = action.payload.first_name;
        state.last_name = action.payload.last_name;
      })
      .addCase(getReceipt.rejected, (state, action) => {
        state.loading = false;
        state.receiptError = action.error.message;
      })
      .addCase(getReceiptByID.pending, (state) => {
        state.loading = true;
        state.receiptError = null;
      })
      .addCase(getReceiptByID.fulfilled, (state, action) => {
        state.loading = false;
        state.receiptError = null;
        state.receipt_id = action.payload.id;
        state.created_at = action.payload.created_at;
        state.stripe_invoice_id = action.payload.stripe_invoice_id;
        state.stripe_customer_id = action.payload.stripe_customer_id;
        state.payment_method_id = action.payload.payment_method_id;
        state.amount_paid = action.payload.amount_paid;
        state.payment_date = action.payload.payment_date;
        state.balance = action.payload.balance;
        state.payment_method = action.payload.payment_method;
        state.first_name = action.payload.first_name;
        state.last_name = action.payload.last_name;
      })
      .addCase(getReceiptByID.rejected, (state, action) => {
        state.loading = false;
        state.receiptError = action.error.message;
      })
      .addCase(getClientReceipts.pending, (state) => {
        state.loading = true;
        state.receiptError = null;
      })
      .addCase(getClientReceipts.fulfilled, (state, action) => {
        state.loading = false;
        state.receipts = action.payload;
        state.receiptError = null;
      })
      .addCase(getClientReceipts.rejected, (state, action) => {
        state.loading = false;
        state.receiptError = action.error.message;
      });
  }
});