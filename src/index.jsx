import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

import { Provider } from 'react-redux';
import store from './model/store.js';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripe = loadStripe(
  'pk_test_51NKFzqKNsWPbtVUMWvTJqD8nAWkpG0aaMrJtmkCLurHXMSwinKilB5yacy2OUUsoveCP7SednwlV0bKpXZIhadUI00SvobnJW7'
);

ReactDOM.createRoot(document.getElementById('orb_services')).render(
  <React.StrictMode>
    <Provider store={store}>
      <Elements stripe={stripe}>
        <App />
      </Elements>
    </Provider>
  </React.StrictMode>
);
