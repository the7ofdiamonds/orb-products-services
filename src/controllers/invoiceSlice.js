import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  invoiceLoading: false,
  invoiceError: '',
  quote_id: '',
  invoices: [],
  invoice_id: '',
  status: '',
  client_id: '',
  stripe_customer_id: '',
  account_country: '',
  currency: '',
  customer_name: '',
  customer_tax_ids: '',
  address_line_1: '',
  address_line_2: '',
  city: '',
  state: '',
  postal_code: '',
  customer_phone: '',
  customer_email: '',
  event_id: '',
  payment_intent_id: '',
  items: '',
  stripe_invoice_id: '',
  payment_intent_id: '',
  client_secret: '',
  selections: '',
  subtotal: '',
  tax: '',
  due_date: '',
  amount_due: '',
  amount_paid: '',
  amount_remaining: '',
  payment_date: '',
  invoice_pdf: ''
};

export const saveInvoice = createAsyncThunk('invoice/saveInvoice', async (stripeInvoiceID, { getState }) => {
  const { quote_id, stripe_invoice_id } = getState().quote;

  try {
    const response = await fetch(`/wp-json/orb/invoices/v1/${stripeInvoiceID ? stripeInvoiceID : stripe_invoice_id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        quote_id: quote_id
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
    throw error;
  }
});

export const getInvoice = createAsyncThunk('invoice/getInvoice', async (stripeInvoiceID, { getState }) => {
  const { stripe_customer_id } = getState().client;
  const { stripe_invoice_id } = getState().invoice;

  try {
    const response = await fetch(`/wp-json/orb/invoices/v1/${stripeInvoiceID ? stripeInvoiceID : stripe_invoice_id}`, {
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
    throw error;
  }

});

export const getInvoiceByID = createAsyncThunk('invoice/getInvoiceByID', async (id, { getState }) => {
  const { stripe_customer_id } = getState().client;

  try {
    const response = await fetch(`/wp-json/orb/invoices/v1/${id}/id`, {
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
    throw error;
  }
});

export const getInvoiceByQuoteID = createAsyncThunk('invoice/getInvoiceByQuoteID', async (quoteID, { getState }) => {
  const { stripe_customer_id } = getState().client;
  const { quote_id } = getState().quote;

  try {
    const response = await fetch(`/wp-json/orb/invoices/v1/${quoteID ? quoteID : quote_id}/quoteid`, {
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
    throw error;
  }
});

export const deleteInvoice = createAsyncThunk('invoice/deleteInvoice', async (stripe_invoice_id) => {

  try {
    const response = await fetch(`/wp-json/orb/invoices/v1/stripe/${stripe_invoice_id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage = errorData.message;
      console.log(errorMessage)
      throw new Error(errorMessage);
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error(error);
    throw error.message;
  }
});

export const updateInvoice = createAsyncThunk('invoice/updateInvoice', async (_, { getState }) => {
  const { stripe_customer_id } = getState().client;
  const { invoice_id, stripe_invoice_id } = getState().invoice;

  try {
    const response = await fetch(`/wp-json/orb/invoices/v1/${invoice_id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        stripe_customer_id: stripe_customer_id,
        stripe_invoice_id: stripe_invoice_id
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
    throw error;
  }
});

export const updateInvoiceStatus = createAsyncThunk('invoice/updateInvoiceStatus', async (_, { getState }) => {
  const { stripe_customer_id } = getState().client;
  const { invoice_id, stripe_invoice_id } = getState().invoice;

  try {
    const response = await fetch(`/wp-json/orb/invoices/v1/status/${invoice_id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        stripe_customer_id: stripe_customer_id,
        stripe_invoice_id: stripe_invoice_id
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
    throw error;
  }
});

export const getStripeInvoice = createAsyncThunk('invoice/getStripeInvoice', async (stripe_invoice_id) => {

  try {
    const response = await fetch(`/wp-json/orb/invoices/v1/stripe/${stripe_invoice_id}`, {
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
    throw error;
  }
});

export const pdfInvoice = createAsyncThunk('invoice/pdfInvoice', async (_, { getState }) => {
  const { stripe_invoice_id } = getState().invoice;

  try {
    const response = await fetch(`/wp-json/orb/invoices/v1/${stripe_invoice_id}/pdf`, {
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
    throw error;
  }
});

export const getClientInvoices = createAsyncThunk('invoice/getClientInvoices', async (_, { getState }) => {
  const { stripe_customer_id } = getState().client;

  try {
    const response = await fetch(`/wp-json/orb/invoices/v1/client/${stripe_customer_id}`, {
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
});

export const finalizeInvoice = createAsyncThunk('invoice/finalizeInvoice', async (_, { getState }) => {
  const { stripe_customer_id } = getState().client;
  const { stripe_invoice_id } = getState().invoice;

  try {
    const response = await fetch(`/wp-json/orb/invoices/v1/stripe/${stripe_invoice_id}/finalize`, {
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
    throw error;
  }
});

export const invoiceSlice = createSlice({
  name: 'invoice',
  initialState,
  reducers: {
    quoteToInvoice: (state, action) => {
      state.selections = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveInvoice.pending, (state) => {
        state.invoiceLoading = true;
        state.invoiceError = '';
      })
      .addCase(saveInvoice.fulfilled, (state, action) => {
        state.invoiceLoading = false;
        state.invoice_id = action.payload;
      })
      .addCase(saveInvoice.rejected, (state, action) => {
        state.invoiceLoading = false;
        state.invoiceError = action.error.message;
      })
      .addCase(getInvoice.pending, (state) => {
        state.invoiceLoading = true;
        state.invoiceError = '';
      })
      .addCase(getInvoice.fulfilled, (state, action) => {
        state.invoiceLoading = false
        state.invoiceError = null;
        state.invoice_id = action.payload.id
        state.status = action.payload.status;
        state.stripe_customer_id = action.payload.stripe_customer_id;
        state.quote_id = action.payload.quote_id;
        state.stripe_invoice_id = action.payload.stripe_invoice_id;
        state.payment_intent_id = action.payload.payment_intent_id;
        state.client_secret = action.payload.client_secret;
        state.subtotal = action.payload.subtotal;
        state.invoice_pdf = action.payload.invoice_pdf_URL;
      })
      .addCase(getInvoice.rejected, (state, action) => {
        state.invoiceLoading = false;
        state.invoiceError = action.error.message;
      })
      .addCase(getInvoiceByID.pending, (state) => {
        state.invoiceLoading = true;
        state.invoiceError = '';
      })
      .addCase(getInvoiceByID.fulfilled, (state, action) => {
        state.invoiceLoading = false
        state.invoiceError = null;
        state.invoice_id = action.payload.id
        state.status = action.payload.status;
        state.stripe_customer_id = action.payload.stripe_customer_id;
        state.quote_id = action.payload.quote_id;
        state.stripe_invoice_id = action.payload.stripe_invoice_id;
        state.payment_intent_id = action.payload.payment_intent_id;
        state.client_secret = action.payload.client_secret;
        state.subtotal = action.payload.subtotal;
        state.invoice_pdf = action.payload.invoice_pdf_URL;
      })
      .addCase(getInvoiceByID.rejected, (state, action) => {
        state.invoiceLoading = false;
        state.invoiceError = action.error.message;
      })
      .addCase(getInvoiceByQuoteID.pending, (state) => {
        state.invoiceLoading = true;
        state.invoiceError = '';
      })
      .addCase(getInvoiceByQuoteID.fulfilled, (state, action) => {
        state.invoiceLoading = false
        state.invoiceError = null;
        state.invoice_id = action.payload.id
        state.status = action.payload.status;
        state.stripe_customer_id = action.payload.stripe_customer_id;
        state.quote_id = action.payload.quote_id;
        state.stripe_invoice_id = action.payload.stripe_invoice_id;
        state.payment_intent_id = action.payload.payment_intent_id;
        state.client_secret = action.payload.client_secret;
        state.subtotal = action.payload.subtotal;
        state.invoice_pdf = action.payload.invoice_pdf_URL;
      })
      .addCase(getInvoiceByQuoteID.rejected, (state, action) => {
        state.invoiceLoading = false;
        state.invoiceError = action.error.message;
      })
      .addCase(updateInvoice.pending, (state) => {
        state.invoiceLoading = true;
        state.invoiceError = '';
      })
      .addCase(updateInvoice.fulfilled, (state, action) => {
        state.invoiceLoading = false;
      })
      .addCase(updateInvoice.rejected, (state, action) => {
        state.invoiceLoading = false;
        state.invoiceError = action.error.message;
      })
      .addCase(updateInvoiceStatus.pending, (state) => {
        state.invoiceLoading = true;
        state.invoiceError = '';
      })
      .addCase(updateInvoiceStatus.fulfilled, (state, action) => {
        state.status = action.payload;
      })
      .addCase(updateInvoiceStatus.rejected, (state, action) => {
        state.invoiceLoading = false;
        state.invoiceError = action.error.message;
      })
      .addCase(getStripeInvoice.pending, (state) => {
        state.invoiceLoading = true;
        state.invoiceError = '';
      })
      .addCase(getStripeInvoice.fulfilled, (state, action) => {
        state.invoiceLoading = false;
        state.invoiceError = null;
        state.stripe_invoice_id = action.payload.id;
        state.status = action.payload.status;
        state.company_name = action.payload.name;
        state.account_country = action.payload.account_country;
        state.currency = action.payload.currency;
        state.stripe_customer_id = action.payload.customer;
        state.customer_name = action.payload.customer_name;
        state.customer_tax_ids = action.payload.customer_tax_ids;
        state.address_line_1 = action.payload.customer_address.line1;
        state.address_line_2 = action.payload.customer_address.line2;
        state.city = action.payload.customer_address.city;
        state.state = action.payload.customer_address.state;
        state.postal_code = action.payload.customer_address.postal_code;
        state.customer_phone = action.payload.customer_phone;
        state.customer_email = action.payload.customer_email;
        state.subtotal = action.payload.subtotal;
        state.tax = action.payload.tax;
        state.due_date = action.payload.due_date;
        state.amount_due = action.payload.amount_due;
        state.amount_paid = action.payload.amount_paid;
        state.amount_remaining = action.payload.amount_remaining;
        state.payment_date = action.payload.status_transitions.paid_at;
        state.stripe_customer_id = action.payload.customer;
        state.payment_intent_id = action.payload.payment_intent;
        state.invoice_pdf = action.payload.invoice_pdf;
        state.items = action.payload.lines.data;
      })
      .addCase(getStripeInvoice.rejected, (state, action) => {
        state.invoiceLoading = false;
        state.invoiceError = action.error.message;
      })
      .addCase(getClientInvoices.pending, (state) => {
        state.invoiceLoading = true;
        state.invoiceError = '';
      })
      .addCase(getClientInvoices.fulfilled, (state, action) => {
        state.invoiceLoading = false;
        state.invoices = action.payload;
        state.invoiceError = null;
      })
      .addCase(getClientInvoices.rejected, (state, action) => {
        state.invoiceLoading = false;
        state.invoiceError = action.error.message;
      })
      .addCase(finalizeInvoice.pending, (state) => {
        state.invoiceLoading = true;
        state.invoiceError = '';
      })
      .addCase(finalizeInvoice.fulfilled, (state, action) => {
        state.invoiceLoading = false;
        state.client_secret = action.payload.client_secret;
        state.payment_intent_id = action.payload.payment_intent_id;
        state.status = action.payload.status;
        state.invoiceError = null;
      })
      .addCase(finalizeInvoice.rejected, (state, action) => {
        state.invoiceLoading = false;
        state.invoiceError = action.error.message;
      });
  }
});

export default invoiceSlice;