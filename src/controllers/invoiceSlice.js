import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  error: '',
  selections: [],
  client_id: '',
  customer_id: '',
  stripe_invoice_id: '',
  invoice_id: '',
  email: '',
  name: '',
  street_address: '',
  city: '',
  state: '',
  zipcode: '',
  phone: '',
  start_date: '',
  start_time: '',
  subtotal: '',
  tax: '',
  grand_total: '',
  payment_intent_id: '',
};

export const addSelections = (selections) => {
  return {
    type: 'invoice/addSelections',
    payload: selections,
  };
};

export const populateInvoice = (invoice) => {
  return {
    type: 'invoice/populateInvoice',
    payload: invoice
  };
};

export const createInvoice = createAsyncThunk('invoice/createInvoice', async ({customer_id, selections}) => {
  try {
    const response = await axios.post(`/wp-json/orb/v1/invoice/${customer_id}`, {selections});
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
});

export const postInvoice = createAsyncThunk('invoice/postInvoice', async (_, { getState }) => {
  const {
    email,
    name,
    street_address,
    city,
    state,
    zipcode,
    phone,
    start_date,
    start_time,
    selections,
    subtotal,
    tax,
    grand_total
  } = getState().invoice;

  const invoice = {
    email: email,
    name: name,
    street_address: street_address,
    city: city,
    state: state,
    zipcode: zipcode,
    phone: phone,
    start_date: start_date,
    start_time: start_time,
    selections: selections,
    subtotal: subtotal,
    tax: tax,
    grand_total: grand_total,
  };
  console.log(invoice);
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
    addSelections: (state, action) => {
      state.selections = action.payload;
    },
    calculateSelections: (state) => {
      let subtotal = 0.00;

      state.selections.forEach((item) => {
        const serviceCost = parseFloat(item.cost);

        if (isNaN(serviceCost)) {
          subtotal += 0;
        } else {
          subtotal += serviceCost;
        }
      });

      let tax = subtotal * 0.33;
      let grandTotal = subtotal + tax;

      state.subtotal = subtotal;
      state.tax = tax;
      state.grand_total = grandTotal;
    },
    updateEmail: (state, action) => {
      state.email = action.payload;
    },
    updateDate: (state, action) => {
      state.start_date = action.payload;
    },
    updateTime: (state, action) => {
      state.start_time = action.payload;
    },
    updateName: (state, action) => {
      state.name = action.payload;
    },
    updateStreetAddress: (state, action) => {
      state.street_address = action.payload;
    },
    updateCity: (state, action) => {
      state.city = action.payload;
    },
    updateState: (state, action) => {
      state.state = action.payload;
    },
    updateZipcode: (state, action) => {
      state.zipcode = action.payload;
    },
    updatePhone: (state, action) => {
      state.phone = action.payload;
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

export const {
  calculateSelections,
  updateEmail,
  updateDate,
  updateTime,
  updateName,
  updateStreetAddress,
  updateCity,
  updateState,
  updateZipcode,
  updatePhone,
} = invoiceSlice.actions;
export default invoiceSlice;