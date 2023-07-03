import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  error: '',
  client_id: '',
  user_email: '',
  phone: '',
  company_name: '',
  tax_id: '',
  first_name: '',
  last_name: '',
  address_line_1: '',
  address_line_2: '',
  city: '',
  state: '',
  zipcode: '',
  country: '',
  stripe_customer_id: '',
  selections: [],
  subtotal: '',
  tax: '',
  grand_total: '',
  stripe_invoice_id: '',
  invoice_id: '',
  client_secret: '',
  status: '',
  start_date: '',
  start_time: '',
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
  const { client_id } = getState().users;
  const {
    user_email,
    phone,
    company_name,
    first_name,
    last_name,
    address_line_1,
    address_line_2,
    city,
    state,
    zipcode,
    country,
    stripe_customer_id,
    selections,
    subtotal,
    tax,
    grand_total,
    stripe_invoice_id,
  } = getState().invoice;

  const invoice = {
    client_id: client_id,
    user_email: user_email,
    phone: phone,
    company_name: company_name,
    first_name: first_name,
    last_name: last_name,
    address_line_1: address_line_1,
    address_line_2: address_line_2,
    city: city,
    state: state,
    zipcode: zipcode,
    country: country,
    stripe_customer_id: stripe_customer_id,
    selections: selections,
    subtotal: subtotal,
    tax: tax,
    grand_total: grand_total,
    stripe_invoice_id: stripe_invoice_id,
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

export const updateInvoice = createAsyncThunk(
  'invoice/updateInvoice',
  async ({ id, user_email, client_secret }) => {
    try {
      const response = await fetch(`/wp-json/orb/v1/invoice/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_email, client_secret }),
      });

      if (!response.ok) {
        throw new Error('Failed to update invoice');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

export const updateInvoiceStatus = createAsyncThunk('invoice/updateInvoiceStatus',
  async ({ id, user_email, client_secret, status }) => {
    try {
      const response = await fetch(`/wp-json/orb/v1/invoice/status/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_email, client_secret, status }),
      });

      if (!response.ok) {
        throw new Error('Failed to update invoice');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

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
        state.client_id = action.payload.client_id;
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
        state.selections = action.payload.selections;
        state.subtotal = action.payload.subtotal;
        state.tax = action.payload.tax;
        state.grand_total = action.payload.grand_total;
        state.stripe_invoice_id = action.payload.stripe_invoice_id;
        state.invoice_id = action.payload.id;
        state.status = action.payload.status;
        state.client_secret = action.payload.client_secret;
        state.start_date = action.payload.start_date;
        state.start_time = action.payload.start_time;
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
      });
  }
});

export const { updateClientID, updateDate, updateTime } = invoiceSlice.actions;
export default invoiceSlice;