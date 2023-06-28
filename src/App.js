import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

// Components
import ServicesComponent from './views/Services.jsx';
import ServiceComponent from './views/Service.jsx';
import QuoteComponent from './views/Quote.jsx';
import InvoiceComponent from './views/Invoice.jsx';
import ScheduleComponent from './views/Schedule.jsx';
import PaymentComponent from './views/Payment.jsx';
import ReceiptComponent from './views/receipt.jsx';
import ErrorComponent from './views/Error.jsx';

function App() {

  return (
    <>
      <Router basename="/">
        <Routes>
          <Route index path="/services" element={<ServicesComponent />} />
          <Route index path="/" element={<ServicesComponent />} />
          <Route path="services/:service" element={<ServiceComponent />} />
          <Route path="services/quote" element={<QuoteComponent />} />
          <Route path="services/schedule" element={<ScheduleComponent />} />
          <Route path="services/invoice/:id" element={<InvoiceComponent />} />
          <Route path="services/payment/:id" element={<PaymentComponent />} />
          <Route path="services/receipt/:id" element={<ReceiptComponent />} />
          <Route path="services/error" element={<ErrorComponent />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;