import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Components
const ServicesComponent = lazy(() => import('./views/Services.jsx'));
const ServiceComponent = lazy(() => import('./views/Service.jsx'));
const SelectionsComponent = lazy(() => import('./views/Selections.jsx'));
const QuoteComponent = lazy(() => import('./views/Quote.jsx'));
const StartComponent = lazy(() => import('./views/Start.jsx'));
const ClientComponent = lazy(() => import('./views/start/Client.jsx'));
const InvoiceComponent = lazy(() => import('./views/Invoice.jsx'));
const ScheduleComponent = lazy(() => import('./views/Schedule.jsx'));
const PaymentComponent = lazy(() => import('./views/Payment.jsx'));
const CardPaymentComponent = lazy(() => import('./views/payment/Card.jsx'));
const MobileComponent = lazy(() => import('./views/payment/Mobile.jsx'));
const ReceiptComponent = lazy(() => import('./views/Receipt.jsx'));
const DashboardComponent = lazy(() => import('./views/Dashboard.jsx'));
const ErrorComponent = lazy(() => import('./views/Error.jsx'));

function LoadingFallback() {
  return <div>Loading...</div>;
}

function App() {
  return (
    <>
      <Router basename="/">
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route index path="/services" element={<ServicesComponent />} />
            <Route index path="/" element={<ServicesComponent />} />
            <Route path="/dashboard" element={<DashboardComponent />} />
            <Route path="services/:service" element={<ServiceComponent />} />
            <Route path="services/start" element={<StartComponent />} />
            <Route path="services/start/client" element={<ClientComponent />} />
            <Route
              path="services/selections"
              element={<SelectionsComponent />}
            />
            <Route path="services/quote/:id" element={<QuoteComponent />} />
            <Route path="services/schedule/:id" element={<ScheduleComponent />} />
            <Route path="services/invoice/:id" element={<InvoiceComponent />} />
            <Route
              path="services/payment/:id/*"
              element={<PaymentComponent />}
            />
            <Route
              path="services/payment/:id/card"
              element={<CardPaymentComponent />}
            />
            <Route
              path="services/payment/:id/mobile"
              element={<MobileComponent />}
            />
            <Route path="services/receipt/:id" element={<ReceiptComponent />} />
            <Route path="services/*" element={<ErrorComponent />} />
          </Routes>
        </Suspense>
      </Router>
    </>
  );
}

export default App;
