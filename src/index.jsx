import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Router components
import { Provider } from 'react-redux';
import store from './model/store.js';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import ScheduleComponent from './views/Schedule.jsx';

const stripe = loadStripe(
  'pk_test_51NKFzqKNsWPbtVUMWvTJqD8nAWkpG0aaMrJtmkCLurHXMSwinKilB5yacy2OUUsoveCP7SednwlV0bKpXZIhadUI00SvobnJW7'
);

const orbServicesContainer = document.getElementById('orb_services');
if (orbServicesContainer) {
  ReactDOM.createRoot(orbServicesContainer).render(
    <React.StrictMode>
      <Provider store={store}>
        <Elements stripe={stripe}>
          <App />
        </Elements>
      </Provider>
    </React.StrictMode>
  );
}

const orbScheduleContainer = document.getElementById('orb_schedule');
if (orbScheduleContainer) {
  ReactDOM.createRoot(orbScheduleContainer).render(
    <React.StrictMode>
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="/" element={<ScheduleComponent />} />
            <Route path="/about" element={<ScheduleComponent />} />
            <Route path="/schedule" element={<ScheduleComponent />} />
          </Routes>
        </Router>
      </Provider>
    </React.StrictMode>
  );
}
