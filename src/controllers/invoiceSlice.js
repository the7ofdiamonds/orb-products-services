import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  error: '',
  invoice_id: '',
  status: '',
  client_id: '',
  stripe_customer_id: '',
  stripe_invoice_id: '',
  payment_intent_id: '',
  client_secret: '',
  selections: [],
  subtotal: '',
  tax: '',
  due_date: '',
  amount_due: '',
  amount_paid: '',
  amount_remaining: '',
  payment_date: '',
};

export const clientToInvoice = (client) => {
  return {
    type: 'invoice/clientToInvoice',
    payload: client
  };
};

export const quoteToInvoice = (selections) => {
  return {
    type: 'invoice/quoteToInvoice',
    payload: selections
  };
};

export const createInvoice = createAsyncThunk('invoice/createInvoice', async (_, { getState }) => {
  const { client_id } = getState().client;
  const { stripe_customer_id } = getState().customer;
  const { selections } = getState().quote;

  const invoice = {
    client_id: client_id,
    stripe_customer_id: stripe_customer_id,
    selections: selections
  };

  try {
    const response = await axios.post('/wp-json/orb/v1/invoices', invoice);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
});

export const getInvoice = createAsyncThunk('invoice/getInvoice', async (id) => {
  try {
    const response = await axios.get(`/wp-json/orb/v1/invoices/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
});

export const updateInvoice = createAsyncThunk('invoice/updateInvoice', async (_, status, paymentIntentID, clientSecret, { getState }) => {
  const { client_id } = getState().client;
  const { invoice_id, due_date, amount_due, subtotal, tax, amount_remaining } = getState().invoice;

  const update = {
    status: status,
    client_id: client_id,
    payment_intent_id: paymentIntentID,
    client_secret: clientSecret,
    due_date: due_date,
    amount_due: amount_due,
    subtotal: subtotal,
    tax: tax,
    amount_remaining: amount_remaining
  };

  try {
    const response = await axios.patch(`/wp-json/orb/v1/invoices/${invoice_id}`, update);

    if (response.status !== 200) {
      if (response.status === 400) {
        throw new Error('Bad request');
      } else if (response.status === 404) {
        throw new Error('Invoice not found');
      } else {
        throw new Error(`HTTP error! Status: ${response.statusText}`);
      }
    }

    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
});

export const updateInvoiceStatus = createAsyncThunk('invoice/updateInvoiceStatus', async (id, { getState }) => {
  const { client_id } = getState().client;
  const { invoice_id, stripe_invoice_id } = getState().invoice;

  const update = {
    client_id: client_id,
    stripe_invoice_id: stripe_invoice_id
  };

  try {
    const response = await axios.patch(`/wp-json/orb/v1/invoices/status/${invoice_id}`, update);

    if (response.status !== 200) {
      if (response.status === 400) {
        throw new Error('Bad request');
      } else if (response.status === 404) {
        throw new Error('Invoice not found');
      } else {
        throw new Error(`HTTP error! Status: ${response.statusText}`);
      }
    }

    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
});

export const getStripeInvoice = createAsyncThunk('invoice/getStripeInvoice', async (_, { getState }) => {
  const { stripe_invoice_id } = getState().invoice;

  try {
    const response = await axios.get(`/wp-json/orb/v1/stripe/invoices/${stripe_invoice_id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
});


export const invoiceSlice = createSlice({
  name: 'invoice',
  initialState,
  reducers: {
    updateClientID: (state, action) => {
      state.client_id = action.payload;
    },
    clientToInvoice: (state, action) => {
      state.user_email = action.payload.user_email;
      state.phone = action.payload.phone;
      state.company_name = action.payload.company_name;
      state.tax_id = action.payload.tax_id;
      state.first_name = action.payload.first_name;
      state.last_name = action.payload.last_name;
      state.address_line_1 = action.payload.address_line_1;
      state.address_line_2 = action.payload.address_line_2;
      state.city = action.payload.city;
      state.state = action.payload.state;
      state.zipcode = action.payload.zipcode;
      state.country = action.payload.country;
      state.stripe_customer_id = action.payload.stripe_customer_id;
    },
    quoteToInvoice: (state, action) => {
      state.selections = action.payload;
    },
    updateDate: (state, action) => {
      state.start_date = action.payload;
    },
    updateTime: (state, action) => {
      state.start_time = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createInvoice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createInvoice.fulfilled, (state, action) => {
        state.loading = false;
        state.invoice_id = action.payload;
      })
      .addCase(createInvoice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getInvoice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getInvoice.fulfilled, (state, action) => {
        state.loading = false
        state.invoice_id = action.payload.id
        state.status = action.payload.status;
        state.client_id = action.payload.client_id;
        state.stripe_customer_id = action.payload.stripe_customer_id;
        state.stripe_invoice_id = action.payload.stripe_invoice_id;
        state.payment_intent_id = action.payload.payment_intent_id;
        state.client_secret = action.payload.client_secret;
        state.selections = action.payload.selections;
        state.subtotal = action.payload.subtotal;
      })
      .addCase(getInvoice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateInvoice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateInvoice.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(updateInvoice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateInvoiceStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateInvoiceStatus.fulfilled, (state, action) => {
        state.status = action.payload;
      })
      .addCase(updateInvoiceStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getStripeInvoice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getStripeInvoice.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.status = action.payload.status;
        state.name = action.payload.name;
        state.subtotal = action.payload.subtotal;
        state.tax = action.payload.tax;
        state.due_date = action.payload.due_date;
        state.amount_due = action.payload.amount_due;
        state.amount_paid = action.payload.amount_paid;
        state.amount_remaining = action.payload.amount_remaining;
        state.payment_date = action.payload.status_transitions.paid_at;
        state.stripe_customer_id = action.payload.customer;
      })
      .addCase(getStripeInvoice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const { updateClientID, updateDate, updateTime } = invoiceSlice.actions;
export default invoiceSlice;