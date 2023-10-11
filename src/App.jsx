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
const ContactComponent = lazy(() => import('./views/Contact.jsx'));
const ContactSuccessComponent = lazy(() =>
  import('./views/ContactSuccess.jsx')
);
const SupportComponent = lazy(() => import('./views/Support.jsx'));
const SupportSuccessComponent = lazy(() =>
  import('./views/SupportSuccess.jsx')
);
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
            <Route index path="/" element={<ServicesComponent />} />
            <Route path="services" element={<ServicesComponent />} />
            <Route path="dashboard" element={<DashboardComponent />} />
            <Route path="services/:service" element={<ServiceComponent />} />
            <Route path="client/start" element={<StartComponent />} />
            <Route
              path="client/selections"
              element={<SelectionsComponent />}
            />
            <Route path="billing/quote/:id" element={<QuoteComponent />} />
            <Route path="billing/invoice/:id" element={<InvoiceComponent />} />
            <Route
              path="billing/payment/:id/*"
              element={<PaymentComponent />}
            />
            <Route
              path="billing/payment/:id/card"
              element={<CardPaymentComponent />}
            />
            <Route
              path="billing/payment/:id/mobile"
              element={<MobileComponent />}
            />
            <Route path="billing/receipt/:id" element={<ReceiptComponent />} />
            <Route path="services/*" element={<ErrorComponent />} />
            <Route path="contact" element={<ContactComponent />} />
            <Route
              path="contact/success"
              element={<ContactSuccessComponent />}
            />
            <Route path="support" element={<SupportComponent />} />
            <Route
              path="support/success"
              element={<SupportSuccessComponent />}
            />
          </Routes>
        </Suspense>
      </Router>
    </>
  );
}

export default App;
