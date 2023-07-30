import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  error: '',
  selections: '',
  total: '',
};

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
});

export const { addSelections, calculateSelections } = quoteSlice.actions;
export default quoteSlice;