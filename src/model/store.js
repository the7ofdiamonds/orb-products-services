import { applyMiddleware, configureStore } from '@reduxjs/toolkit';
import { servicesSlice } from '../controllers/servicesSlice.js';
import { serviceSlice } from '../controllers/serviceSlice.js';
import { usersSlice } from '../controllers/usersSlice.js';
import { clientSlice } from '../controllers/clientSlice.js';
import { customerSlice } from '../controllers/customerSlice.js';
import { quoteSlice } from '../controllers/quoteSlice.js';
import { invoiceSlice } from '../controllers/invoiceSlice.js';
import { scheduleSlice } from '../controllers/scheduleSlice.js';
import { paymentSlice } from '../controllers/paymentSlice.js';
import { receiptSlice } from '../controllers/receiptSlice.js';

const store = configureStore({
  reducer: {
    services: servicesSlice.reducer,
    service: serviceSlice.reducer,
    users: usersSlice.reducer,
    client: clientSlice.reducer,
    customer: customerSlice.reducer,
    quote: quoteSlice.reducer,
    invoice: invoiceSlice.reducer,
    schedule: scheduleSlice.reducer,
    payment: paymentSlice.reducer,
    receipt: receiptSlice.reducer,
  },
  // Enable the Redux DevTools Extension
  devTools: process.env.NODE_ENV !== 'production', // Optional: Disable in production
});

export default store;
