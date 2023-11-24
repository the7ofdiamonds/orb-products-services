import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';

import { Provider } from 'react-redux';
import store from './model/store.js';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const LoadingComponent = lazy(() => import('./loading/LoadingComponent.jsx'));

// Add to backend to make changes more easily
const stripe = loadStripe(
  'pk_test_51NKFzqKNsWPbtVUMWvTJqD8nAWkpG0aaMrJtmkCLurHXMSwinKilB5yacy2OUUsoveCP7SednwlV0bKpXZIhadUI00SvobnJW7'
);

const orb = document.getElementById('orb_products_services');
if (orb) {
  ReactDOM.createRoot(orb).render(
    <React.StrictMode>
      <Provider store={store}>
        <Elements stripe={stripe}>
          <App />
        </Elements>
      </Provider>
    </React.StrictMode>
  );
}