import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const LoadingComponent = lazy(() => import('./loading/LoadingComponent.jsx'));
const ErrorComponent = lazy(() => import('./error/ErrorComponent.jsx'));

const ServicesComponent = lazy(() => import('./views/Services.jsx'));
const ServiceComponent = lazy(() => import('./views/Service.jsx'));

const BillingComponent = lazy(() => import('./views/Billing.jsx'));
const QuoteComponent = lazy(() => import('./views/BillingQuote.jsx'));
const InvoiceComponent = lazy(() => import('./views/BillingInvoice.jsx'));
const PaymentComponent = lazy(() => import('./views/BillingPayment.jsx'));
const CardPaymentComponent = lazy(() =>
  import('./views/BillingPaymentCard.jsx')
);
const WalletComponent = lazy(() => import('./views/BillingPaymentWallet.jsx'));
const ReceiptComponent = lazy(() => import('./views/BillingReceipt.jsx'));

const ClientComponent = lazy(() => import('./views/Client.jsx'));
const StartComponent = lazy(() => import('./views/ClientStart.jsx'));
const SelectionsComponent = lazy(() => import('./views/ClientSelections.jsx'));

const DashboardComponent = lazy(() => import('./views/Dashboard.jsx'));

const FAQComponent = lazy(() => import('./views/FAQ.jsx'));
const SupportComponent = lazy(() => import('./views/Support.jsx'));
const SupportSuccessComponent = lazy(() =>
  import('./views/SupportSuccess.jsx')
);
const ContactComponent = lazy(() => import('./views/Contact.jsx'));
const ContactSuccessComponent = lazy(() =>
  import('./views/ContactSuccess.jsx')
);

function App() {
  return (
    <>
      <Router basename="/">
        <Suspense fallback={<LoadingComponent />}>
          <Routes>
            <Route index path="/" element={<ServicesComponent />} />
            <Route path="services" element={<ServicesComponent />} />
            <Route path="dashboard" element={<DashboardComponent />} />
            <Route path="services/:service" element={<ServiceComponent />} />
            <Route path="client" element={<ClientComponent />} />
            <Route path="client/start" element={<StartComponent />} />
            <Route path="client/selections" element={<SelectionsComponent />} />
            <Route
              path="billing/payment/card/:id"
              element={<CardPaymentComponent />}
            />
            <Route
              path="billing/payment/wallet/:id"
              element={<WalletComponent />}
            />
            <Route
              path="billing/payment/:id"
              element={<PaymentComponent />}
            />
            <Route path="billing/receipt/:id" element={<ReceiptComponent />} />
            <Route path="billing/quote/:id" element={<QuoteComponent />} />
            <Route path="billing/invoice/:id" element={<InvoiceComponent />} />
            <Route path="billing" element={<BillingComponent />} />
            <Route path="faq" element={<FAQComponent />} />
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
