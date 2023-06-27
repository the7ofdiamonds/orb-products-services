import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App.js';

import { Provider } from 'react-redux';
import store from './model/store.js';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

window.onload = function () {
  const services = document.getElementById('orb_services');
  const officeHours = document.getElementById('orb_services_office_hours');

  const stripe = loadStripe('pk_test_51NKFzqKNsWPbtVUMWvTJqD8nAWkpG0aaMrJtmkCLurHXMSwinKilB5yacy2OUUsoveCP7SednwlV0bKpXZIhadUI00SvobnJW7');

  if (services) {
    ReactDOM.render(
      <Provider store={store}>
        <Elements stripe={stripe}>
          <App />
        </Elements>
      </Provider>,
      services
    );
  } else {
    console.log('Services container not available');
  }
};