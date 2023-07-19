import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  error: '',
  selections: [],
  subtotal: '',
};

export const quoteSlice = createSlice({
  name: 'quote',
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
  },
});

export const { addSelections, calculateSelections } = quoteSlice.actions;
export default quoteSlice;