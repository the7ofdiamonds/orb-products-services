import { lazy } from 'react';
import { BrowserRouter as Route, Routes } from 'react-router-dom';

const ServicesComponent = lazy(() => import('./views/Services.jsx'));
const ServiceComponent = lazy(() => import('./views/Service.jsx'));

const QuoteComponent = lazy(() => import('./views/BillingQuote.jsx'));
const InvoiceComponent = lazy(() => import('./views/BillingInvoice.jsx'));
const PaymentComponent = lazy(() => import('./views/BillingPayment.jsx'));
const CardPaymentComponent = lazy(() => import('./views/BillingPaymentCard.jsx'));
const MobileComponent = lazy(() => import('./views/BillingPaymentMobile.jsx'));
const ReceiptComponent = lazy(() => import('./views/BillingReceipt.jsx'));

const ClientComponent = lazy(() => import('./views/Client.jsx'));
const StartComponent = lazy(() => import('./views/ClientStart.jsx'));
const SelectionsComponent = lazy(() => import('./views/ClientSelections.jsx'));

const SupportComponent = lazy(() => import('./views/Support.jsx'));
const SupportSuccessComponent = lazy(() =>
  import('./views/SupportSuccess.jsx')
);
const ContactComponent = lazy(() => import('./views/Contact.jsx'));
const ContactSuccessComponent = lazy(() =>
  import('./views/ContactSuccess.jsx')
);
const DashboardComponent = lazy(() => import('./views/Dashboard.jsx'));
const ErrorComponent = lazy(() => import('./views/Error.jsx'));

function App() {
  return (
    <>
      <Routes>
        <Route index path="/" element={<ServicesComponent />} />
        <Route path="services" element={<ServicesComponent />} />
        <Route path="dashboard" element={<DashboardComponent />} />
        <Route path="services/:service" element={<ServiceComponent />} />
        <Route path="client" element={<ClientComponent />} />
        <Route path="client/start" element={<StartComponent />} />
        <Route path="client/selections" element={<SelectionsComponent />} />
        <Route path="billing/quote/:id" element={<QuoteComponent />} />
        <Route path="billing/invoice/:id" element={<InvoiceComponent />} />
        <Route path="billing/payment/:id/*" element={<PaymentComponent />} />
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
        <Route path="contact/success" element={<ContactSuccessComponent />} />
        <Route path="support" element={<SupportComponent />} />
        <Route path="support/success" element={<SupportSuccessComponent />} />
      </Routes>
    </>
  );
}

export default App;
