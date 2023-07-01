import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  error: '',
  client_id: '',
  stripe_customer_id: '',
  stripe_invoice_id: '',
  invoice_id: '',
  payment_intent_id: '',
  user_email: '',
  phone: '',
  company_name: '',
  first_name: '',
  last_name: '',
  start_date: '',
  start_time: '',
  selections: [],
  subtotal: '',
  tax: '',
  grand_total: '',
};

export const clientToInvoice = (invoice) => {
  return {
    type: 'invoice/clientToInvoice',
    payload: invoice
  };
};

export const quoteToInvoice = (invoice) => {
  return {
    type: 'invoice/quoteToInvoice',
    payload: invoice
  };
};

export const createInvoice = createAsyncThunk('invoice/createInvoice', async ({ customer_id, selections }) => {
  try {
    const response = await axios.post(`/wp-json/orb/v1/invoice/${customer_id}`, { selections });
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
});

export const postInvoice = createAsyncThunk('invoice/postInvoice', async (_, { getState }) => {
  const {
    client_id,
    stripe_customer_id,
    stripe_invoice_id,
    payment_intent_id,
    user_email,
    phone,
    company_name,
    first_name,
    last_name,
    start_date,
    start_time,
    selections,
    subtotal,
    tax,
    grand_total
  } = getState().invoice;

  const invoice = {
    client_id: client_id,
    customer_id: stripe_customer_id,
    invoice_id: stripe_invoice_id,
    payment_intent_id: payment_intent_id,
    email: user_email,
    phone: phone,
    company_name: company_name,
    first_name: first_name,
    last_name: last_name,
    start_date: start_date,
    start_time: start_time,
    selections: selections,
    subtotal: subtotal,
    tax: tax,
    grand_total: grand_total,
  };

  const response = await axios.post('/wp-json/orb/v1/invoice', invoice);

  try {
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
});

export const getInvoice = createAsyncThunk('invoice/getInvoice', async (id) => {
  try {
    const response = await axios.get(`/wp-json/orb/v1/invoice/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
});

export const finalizeInvoice = createAsyncThunk('invoice/finalizeInvoice', async (stripe_invoice_id) => {
  try {
    const response = await axios.post(`/wp-json/orb/v1/invoice/${stripe_invoice_id}/finalize`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
});

export const updateInvoice = createAsyncThunk('invoice/updateInvoice', async (id) => {
  try {
    const response = await axios.get(`/wp-json/orb/v1/invoice/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
});

export const invoiceSlice = createSlice({
  name: 'invoice',
  initialState,
  reducers: {
    clientToInvoice: (state, action) => {
      state.user_email = action.payload.user_email;
      state.phone = action.payload.phone;
      state.company_name = action.payload.company_name;
      state.tax_id = action.payload.tax_id;
      state.first_name = action.payload.first_name;
      state.last_name = action.payload.last_name;
      state.street_address_1 = action.payload.street_address_1;
      state.street_address_2 = action.payload.street_address_2;
      state.city = action.payload.city;
      state.state = action.payload.state;
      state.zipcode = action.payload.zipcode;
    },
    quoteToInvoice: (state, action) => {
      state.selections = action.payload.selections;
      state.subtotal = action.payload.subtotal;
      state.tax = action.payload.tax;
      state.grand_total = action.payload.grand_total;
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
        state.stripe_invoice_id = action.payload;
      })
      .addCase(createInvoice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(postInvoice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postInvoice.fulfilled, (state, action) => {
        state.loading = false;
        state.invoice_id = action.payload;
      })
      .addCase(postInvoice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getInvoice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getInvoice.fulfilled, (state, action) => {
        state.loading = false;
        state.invoice_id = action.payload.id;
        state.payment_intent_id = action.payload.payment_intent_id;
        state.name = action.payload.name;
        state.email = action.payload.email;
        state.street_address = action.payload.street_address;
        state.city = action.payload.city;
        state.state = action.payload.state;
        state.zipcode = action.payload.zipcode;
        state.phone = action.payload.phone;
        state.start_date = action.payload.start_date;
        state.start_time = action.payload.start_time;
        state.selections = action.payload.selections;
        state.subtotal = action.payload.subtotal;
        state.tax = action.payload.tax;
        state.grand_total = action.payload.grand_total;
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
        state.payment_intent_id = action.payload;
      })
      .addCase(updateInvoice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const { updateDate, updateTime } = invoiceSlice.actions;
export default invoiceSlice;