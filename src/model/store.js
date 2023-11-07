import { configureStore } from '@reduxjs/toolkit';
import { servicesSlice } from '../controllers/servicesSlice.js';
import { serviceSlice } from '../controllers/serviceSlice.js';

const store = configureStore({
  reducer: {
    services: servicesSlice.reducer,
    service: serviceSlice.reducer,
  },
});

export default store;
