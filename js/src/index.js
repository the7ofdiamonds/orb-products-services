import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App.js';
import { Provider } from 'react-redux';
import store from './model/store.js';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

window.onload = function () {
  const parsedPath = window.location.pathname.split('/');
  const service = parsedPath[2];

  const container = document.getElementById('orb_service');

  if (container) {
    ReactDOM.render(
      <Router basename={`/services/${service}`}>
        <Provider store={store}>
          <Elements stripe={loadStripe('pk_test_51NKFzqKNsWPbtVUMWvTJqD8nAWkpG0aaMrJtmkCLurHXMSwinKilB5yacy2OUUsoveCP7SednwlV0bKpXZIhadUI00SvobnJW7')}>
            <App />
          </Elements>
        </Provider>
      </Router>,
      container
    );
  } else {
    console.log('Container not available');
  }
};