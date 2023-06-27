import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  error: '',
  invoice_id: '',
  payment_intent_id: '',
  email: '',
  name: '',
  street_address: '',
  city: '',
  state: '',
  zipcode: '',
  phone: '',
  start_date: '',
  start_time: '',
  selections: [],
  subtotal: '',
  tax: '',
  grand_total: '',
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

export const postInvoice = createAsyncThunk('invoice/postInvoice', async (invoice) => {
  try {
    const response = await axios.post('/wp-json/orb/v1/invoice', invoice);
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
      const selections = state.selections;
      selections.forEach((item) => {
        const serviceCost = parseFloat(item.cost);
        console.log(serviceCost)
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
    populateInvoice: (state, action) => {
      state.invoice = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
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
}
);

export const { calculateSelections } = invoiceSlice.actions;
export default invoiceSlice;