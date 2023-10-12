import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Router components
import { Provider } from 'react-redux';
import store from './model/store.js';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const ScheduleComponent = lazy(() => import('./views/Schedule.jsx'));

const stripe = loadStripe(
  'pk_test_51NKFzqKNsWPbtVUMWvTJqD8nAWkpG0aaMrJtmkCLurHXMSwinKilB5yacy2OUUsoveCP7SednwlV0bKpXZIhadUI00SvobnJW7'
);

function LoadingFallback() {
  return <div>Loading...</div>;
}

const orbServicesContainer = document.getElementById('orb_services');
if (orbServicesContainer) {
  ReactDOM.createRoot(orbServicesContainer).render(
    <React.StrictMode>
      <Provider store={store}>
        <Elements stripe={stripe}>
          <Router basename="/">
            <Suspense fallback={<LoadingFallback />}>
              <App />
            </Suspense>
          </Router>
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
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/" element={<ScheduleComponent />} />
              <Route path="/about" element={<ScheduleComponent />} />
              <Route path="/schedule" element={<ScheduleComponent />} />
            </Routes>
          </Suspense>
        </Router>
      </Provider>
    </React.StrictMode>
  );
}
