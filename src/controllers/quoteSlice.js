import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  quoteError: '',
  stripe_customer_id: '',
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

export const updateQuoteID = (stripe_quote_id) => {
  return {
    type: 'quote/updateQuoteID',
    payload: stripe_quote_id
  };
};

export const createQuote = createAsyncThunk('quote/createQuote', async (_, { getState }) => {
  const { stripe_customer_id } = getState().client;
  const { selections } = getState().quote;

  try {
    const response = await fetch('/wp-json/orb/v1/quote', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        stripe_customer_id: stripe_customer_id,
        selections: selections
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


export const getQuote = createAsyncThunk('quote/getQuote', async (payload, thunkAPI) => {
  const { stripeQuoteID, stripeCustomerID } = payload;
  const { getState } = thunkAPI;
  const { stripe_quote_id } = getState().quote;
  const { stripe_customer_id } = getState().client;

  try {
    const response = await fetch(`/wp-json/orb/v1/quote/${stripeQuoteID ? stripeQuoteID : stripe_quote_id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        stripe_customer_id: stripeCustomerID ? stripeCustomerID : stripe_customer_id,
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

export const getQuoteByID = createAsyncThunk('quote/getQuoteByID', async (id, { getState }) => {

  try {
    const response = await fetch(`/wp-json/orb/v1/quote/${id}/id`, {
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

export const getStripeQuote = createAsyncThunk('quote/getStripeQuote', async (stripeQuoteID, { getState }) => {
  const { stripe_quote_id } = getState().quote;

  try {
    const response = await fetch(`/wp-json/orb/v1/stripe/quotes/${stripeQuoteID ? stripeQuoteID : stripe_quote_id}`, {
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

export const updateQuote = createAsyncThunk('quote/updateQuote', async (_, { getState }) => {
  const { stripe_quote_id, selections } = getState().quote;

  try {
    const response = await fetch(`/wp-json/orb/v1/quote/${stripe_quote_id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(selections)
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

export const updateStripeQuote = createAsyncThunk('quote/updateStripeQuote', async (_, { getState }) => {
  const { stripe_quote_id, selections } = getState().quote;

  try {
    const response = await fetch(`/wp-json/orb/v1/stripe/quote/${stripe_quote_id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(selections)
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

export const finalizeQuote = createAsyncThunk('quote/finalizeQuote', async (_, { getState }) => {
  const { stripe_quote_id, selections } = getState().quote;

  try {
    const response = await fetch(`/wp-json/orb/v1/stripe/quotes/${stripe_quote_id}/finalize`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        selections: selections
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

export const updateQuoteStatus = createAsyncThunk('quote/updateQuoteStatus', async (_, { getState }) => {
  const { stripe_quote_id } = getState().quote;

  try {
    const response = await fetch(`/wp-json/orb/v1/quote/${stripe_quote_id}`, {
      method: 'PATCH',
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

export const acceptQuote = createAsyncThunk('quote/acceptQuote', async (_, { getState }) => {
  const { stripe_quote_id } = getState().quote;

  try {
    const response = await fetch(`/wp-json/orb/v1/stripe/quotes/${stripe_quote_id}/accept`, {
      method: 'POST',
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

export const cancelQuote = createAsyncThunk('quote/cancelQuote', async (_, { getState }) => {
  const { stripe_quote_id } = getState().quote;

  try {
    const response = await fetch(`/wp-json/orb/v1/stripe/quotes/${stripe_quote_id}/cancel`, {
      method: 'POST',
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

export const getClientQuotes = createAsyncThunk('quote/getClientQuotes', async (_, { getState }) => {
  const { stripe_customer_id } = getState().client;

  try {
    const response = await fetch(`/wp-json/orb/v1/quotes/client/${stripe_customer_id}`, {
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

export const getStripeClientQuotes = createAsyncThunk('quote/getStripeClientQuotes', async (_, { getState }) => {
  const { stripe_customer_id } = getState().client;

  try {
    const response = await fetch(`/wp-json/orb/v1/stripe/quotes/${stripe_customer_id}`, {
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
    updateQuoteID: (state, action) => {
      state.stripe_quote_id = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createQuote.pending, (state) => {
        state.loading = true;
        state.quoteError = '';
      })
      .addCase(createQuote.fulfilled, (state, action) => {
        state.loading = false;
        state.quoteError = null;
        state.stripe_quote_id = action.payload.id;
        state.stripe_customer_id = action.payload.stripe_customer_id;
        state.amount_subtotal = action.payload.amount_subtotal;
        state.amount_total = action.payload.amount_total;
        state.status = action.payload.status;
        state.total = action.payload.total;
      })
      .addCase(createQuote.rejected, (state, action) => {
        state.loading = false;
        state.quoteError = action.error.message;
      })
      .addCase(getQuote.pending, (state) => {
        state.loading = true;
        state.quoteError = '';
      })
      .addCase(getQuote.fulfilled, (state, action) => {
        state.loading = false;
        state.quoteError = null;
        state.quote_id = action.payload.id;
        state.stripe_quote_id = action.payload.stripe_quote_id;
        state.status = action.payload.status;
        state.selections = action.payload.selections;
        state.amount_subtotal = action.payload.amount_subtotal
        state.amount_total = action.payload.amount_total
      })
      .addCase(getQuote.rejected, (state, action) => {
        state.loading = false;
        state.quoteError = action.error.message;
      })
      .addCase(getQuoteByID.pending, (state) => {
        state.loading = true;
        state.quoteError = '';
      })
      .addCase(getQuoteByID.fulfilled, (state, action) => {
        state.loading = false;
        state.quoteError = null;
        state.quote_id = action.payload.id;
        state.stripe_quote_id = action.payload.stripe_quote_id;
        state.status = action.payload.status;
        state.selections = action.payload.selections;
        state.amount_subtotal = action.payload.amount_subtotal
        state.amount_total = action.payload.amount_total
      })
      .addCase(getQuoteByID.rejected, (state, action) => {
        state.loading = false;
        state.quoteError = action.error.message;
      })
      .addCase(getStripeQuote.pending, (state) => {
        state.loading = true;
        state.quoteError = '';
      })
      .addCase(getStripeQuote.fulfilled, (state, action) => {
        state.loading = false;
        state.quoteError = null;
        state.stripe_quote_id = action.payload.id;
        state.status = action.payload.status;
        state.amount_subtotal = action.payload.amount_subtotal
        state.amount_total = action.payload.amount_total;
      })
      .addCase(getStripeQuote.rejected, (state, action) => {
        state.loading = false;
        state.quoteError = action.error.message;
      })
      .addCase(updateQuote.pending, (state) => {
        state.loading = true;
        state.quoteError = '';
      })
      .addCase(updateQuote.fulfilled, (state, action) => {
        state.loading = false;
        state.quoteError = null;
        state.stripe_quote_id = action.payload.id;
        state.status = action.payload.status;
        state.amount_subtotal = action.payload.amount_subtotal
        state.amount_total = action.payload.amount_total
      })
      .addCase(updateQuote.rejected, (state, action) => {
        state.loading = false;
        state.quoteError = action.error.message;
      })
      .addCase(updateQuoteStatus.pending, (state) => {
        state.loading = true;
        state.quoteError = '';
      })
      .addCase(updateQuoteStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.quoteError = null;
        state.status = action.payload;
        state.stripe_quote_id = action.payload.id;
        state.status = action.payload.status;
        state.amount_subtotal = action.payload.amount_subtotal
        state.amount_total = action.payload.amount_total
      })
      .addCase(updateQuoteStatus.rejected, (state, action) => {
        state.loading = false;
        state.quoteError = action.error.message;
      })
      .addCase(getClientQuotes.pending, (state) => {
        state.loading = true;
        state.quoteError = '';
      })
      .addCase(getClientQuotes.fulfilled, (state, action) => {
        state.loading = false;
        state.quoteError = null;
        state.quotes = action.payload;
      })
      .addCase(getClientQuotes.rejected, (state, action) => {
        state.loading = false;
        state.quoteError = action.error.message;
      })
      .addCase(finalizeQuote.pending, (state) => {
        state.loading = false;
        state.quoteError = '';
      })
      .addCase(finalizeQuote.fulfilled, (state, action) => {
        state.loading = false;
        state.quoteError = null;
        state.quote_id = action.payload.quote_id;
        state.stripe_quote_id = action.payload.stripe_quote_id;
        state.stripe_customer_id = action.payload.customer;
        state.status = action.payload.status;
        state.amount_subtotal = action.payload.amount_subtotal;
        state.amount_discount = action.payload.amount_discount;
        state.amount_shipping = action.payload.amount_shipping;
        state.amount_total = action.payload.amount_total;
      })
      .addCase(finalizeQuote.rejected, (state, action) => {
        state.loading = false;
        state.quoteError = action.error.message;
      })
      .addCase(acceptQuote.pending, (state) => {
        state.loading = true;
        state.quoteError = '';
      })
      .addCase(acceptQuote.fulfilled, (state, action) => {
        state.loading = false;
        state.quoteError = null;
        state.status = action.payload.status;
        state.stripe_invoice_id = action.payload.invoice;
        state.stripe_quote_id = action.payload.id;
        state.stripe_customer_id = action.payload.customer;
        state.status = action.payload.status;
        state.amount_subtotal = action.payload.amount_subtotal;
        state.amount_discount = action.payload.amount_discount;
        state.amount_shipping = action.payload.amount_shipping;
        state.amount_total = action.payload.amount_total;
      })
      .addCase(acceptQuote.rejected, (state, action) => {
        state.loading = false;
        state.quoteError = action.error.message;
      })
      .addCase(cancelQuote.pending, (state) => {
        state.loading = true;
        state.quoteError = '';
      })
      .addCase(cancelQuote.fulfilled, (state, action) => {
        state.loading = false;
        state.quoteError = null;
        state.status = action.payload;
      })
      .addCase(cancelQuote.rejected, (state, action) => {
        state.loading = false;
        state.quoteError = action.error.message;
      });
  }
});

export const { addSelections, calculateSelections } = quoteSlice.actions;
export default quoteSlice;