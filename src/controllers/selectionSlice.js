import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  error: '',
  invoice_id: '',
  selections: [],
  subtotal: '',
  tax: '',
  grand_total: '',
  payment_intent_id: ''
};

export const addSelections = (selections) => {
  return {
    type: 'selections/addSelections',
    payload: selections,
  };
};

export const calculateSelections = () => {
  const invoice = {
    subtotal,
    tax,
    grand_total
  }
  return {
    type: 'selections/calculateSelections',
    payload: invoice,
  };
};

export const selectionSlice = createSlice({
  name: 'selections',
  initialState,
  reducers: {
    calculateSelections: (state, action) => {
      const selections = state.selections;
      let total = 0;

      if (Array.isArray(selections) && selections.length > 0) {
        selections.forEach((item) => {
          const featureCost = item.feature_cost;

          if (isNaN(featureCost)) {
            total += 0;
          } else {
            total += featureCost;
          }
        });

        const serviceCost = 40;

        if (total === 0) {
          total = serviceCost;
        }

        let subtotal = total;
        let tax = subtotal * 0.33;
        let grandTotal = subtotal + tax;

        state.subtotal = subtotal;
        state.tax = tax;
        state.grand_total = grandTotal;
      }
    },
    addSelections: (state, action) => {
      state.selections = action.payload;
    },
  },
});

export default selectionSlice;