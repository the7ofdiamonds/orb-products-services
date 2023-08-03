import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  error: '',
  quotes: '',
  quote_id: '',
  stripe_quote_id: '',
  amount_subtotal: '',
  amount_total: '',
  status: '',
  selections: '',
  total: '',
  pdf: ''
};

export const createQuote = createAsyncThunk('quote/createQuote', async (_, { getState }) => {
  const { stripe_customer_id } = getState().client;
  const { selections } = getState().quote;

  const quote = {
    stripe_customer_id: stripe_customer_id,
    selections: selections
  };

  try {
    const response = await axios.post('/wp-json/orb/v1/quote', quote);
    console.log(response.data)
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
});

export const getQuote = createAsyncThunk('quote/getQuote', async (id, { getState }) => {
  const { stripe_customer_id } = getState().quote;

  try {
    const response = await axios.get(`/wp-json/orb/v1/quote/${id}`, { params: stripe_customer_id });
    console.log(response.data)
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
});

export const getStripeQuote = createAsyncThunk('quote/getStripeQuote', async (_, { getState }) => {
  const { stripe_quote_id } = getState().quote;

  try {
    const response = await axios.get(`/wp-json/orb/v1/stripe/quotes/${stripe_quote_id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
});

export const updateQuote = createAsyncThunk('quote/updateQuote', async (_, { getState }) => {
  const { stripe_quote_id, selections } = getState().quote;

  try {
    const response = await axios.patch(`/wp-json/orb/v1/quote/${stripe_quote_id}`, selections);

    if (response.status !== 200) {
      if (response.status === 400) {
        throw new Error('Bad request');
      } else if (response.status === 404) {
        throw new Error('Quote not found');
      } else {
        throw new Error(`HTTP error! Status: ${response.statusText}`);
      }
    }

    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
});

export const updateStripeQuote = createAsyncThunk('quote/updateStripeQuote', async (_, { getState }) => {
  const { stripe_quote_id, selections } = getState().quote;

  try {
    const response = await axios.patch(`/wp-json/orb/v1/stripe/quotes/${stripe_quote_id}`, selections);

    if (response.status !== 200) {
      if (response.status === 400) {
        throw new Error('Bad request');
      } else if (response.status === 404) {
        throw new Error('Quote not found');
      } else {
        throw new Error(`HTTP error! Status: ${response.statusText}`);
      }
    }

    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
});

export const finalizeQuote = createAsyncThunk('quote/finalizeQuote', async (_, { getState }) => {
  const { stripe_quote_id } = getState().quote;

  try {
    const response = await axios.post(`/wp-json/orb/v1/quotes/${stripe_quote_id}/finalize`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
});

export const updateQuoteStatus = createAsyncThunk('quote/updateQuoteStatus', async (_, { getState }) => {
  const { stripe_quote_id, status } = getState().quote;

  try {
    const response = await axios.patch(`/wp-json/orb/v1/quote/${stripe_quote_id}`, status);

    if (response.status !== 200) {
      if (response.status === 400) {
        throw new Error('Bad request');
      } else if (response.status === 404) {
        throw new Error('Quote not found');
      } else {
        throw new Error(`HTTP error! Status: ${response.statusText}`);
      }
    }

    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
});

export const acceptQuote = createAsyncThunk('quote/acceptQuote', async (_, { getState }) => {
  const { stripe_quote_id } = getState().quote;

  try {
    const response = await axios.post(`/wp-json/orb/v1/stripe/quotes/${stripe_quote_id}/accept`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
});

export const cancelQuote = createAsyncThunk('quote/cancelQuote', async (_, { getState }) => {
  const { stripe_quote_id } = getState().quote;

  try {
    const response = await axios.post(`/wp-json/orb/v1/quotes/${stripe_quote_id}/cancel`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
});

export const pdfQuote = createAsyncThunk(
  'quote/pdfQuote',
  async (quoteId) => {
    try {
      const response = await axios.get(`/wp-json/orb/v1/quote/${quoteId}/pdf`, {
        responseType: 'blob',
      });

      // Convert the Blob to a base64 string
      const blob = response.data;
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      return new Promise((resolve) => {
        reader.onloadend = () => {
          resolve(reader.result);
        };
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

export const getClientQuotes = createAsyncThunk('quote/getClientQuotes', async (_, { getState }) => {
  const { stripe_customer_id } = getState().client;

  try {
    const response = await axios.get(`/wp-json/orb/v1/quotes/${stripe_customer_id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
});

export const getStripeClientQuotes = createAsyncThunk('quote/getStripeClientQuotes', async (_, { getState }) => {
  const { stripe_customer_id } = getState().client;

  try {
    const response = await axios.get(`/wp-json/orb/v1/stripe/quotes/${stripe_customer_id}`);
    return response.data.data;
  } catch (error) {
    throw new Error(error.message);
  }
});

export const quoteSlice = createSlice({
  name: 'quote',
  initialState,
  reducers: {
    addSelections: (state, action) => {
      state.selections = action.payload;
    },
    calculateSelections: (state) => {
      let total = 0.00;

      state.selections.forEach((item) => {
        const serviceCost = parseFloat(item.cost);

        if (isNaN(serviceCost)) {
          total += 0;
        } else {
          total += serviceCost;
        }
      });

      state.total = total;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createQuote.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createQuote.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.quote_id = action.payload;
      })
      .addCase(createQuote.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getQuote.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getQuote.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.quote_id = action.payload.id;
        state.stripe_quote_id = action.payload.stripe_quote_id;
        state.status = action.payload.status;
        state.selections = action.payload.selections;
        state.amount_subtotal = action.payload.amount_subtotal
        state.amount_total = action.payload.amount_total
      })
      .addCase(getQuote.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getStripeQuote.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getStripeQuote.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.stripe_quote_id = action.payload.id;
        state.status = action.payload.status;
        state.amount_subtotal = action.payload.amount_subtotal
        state.amount_total = action.payload.amount_total;
        state.stripe_invoice_id = action.payload.invoice;
      })
      .addCase(getStripeQuote.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateQuote.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateQuote.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.stripe_quote_id = action.payload.id;
        state.status = action.payload.status;
        state.amount_subtotal = action.payload.amount_subtotal
        state.amount_total = action.payload.amount_total
      })
      .addCase(updateQuote.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateQuoteStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateQuoteStatus.fulfilled, (state, action) => {
        state.status = action.payload;
        state.error = null;
        state.stripe_quote_id = action.payload.id;
        state.status = action.payload.status;
        state.amount_subtotal = action.payload.amount_subtotal
        state.amount_total = action.payload.amount_total
      })
      .addCase(updateQuoteStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(pdfQuote.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(pdfQuote.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.pdf = action.payload;
      })
      .addCase(pdfQuote.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getClientQuotes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getClientQuotes.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.quotes = action.payload;
      })
      .addCase(getClientQuotes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const { addSelections, calculateSelections } = quoteSlice.actions;
export default quoteSlice;