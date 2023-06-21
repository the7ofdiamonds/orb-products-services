import React from 'react'
import {
  BrowserRouter,
  createRoutesFromElements,
  Route,
  Routes,
  RouterProvider
} from "react-router-dom"

//Components
import QuoteComponent from './views/Quote.jsx'
import InvoiceComponent from './views/Invoice.jsx'
import ScheduleComponent from './views/Schedule.jsx'
import PaymentComponent from './views/Payment.jsx'
import ReceiptComponent from './views/receipt.jsx'
import ErrorComponent from './views/Error.jsx'
import Navigation from './views/layout/Navigation.jsx'

//Variables
const parsedPath = window.location.pathname.split("/");
const step = parsedPath[2];

function App() {

  return (
    <>
      <Navigation />
      <Routes>
        <Route index element={<QuoteComponent />} render={() => <Redirect to={`/${step}`} />} />
        <Route path="invoice/:id" element={<InvoiceComponent />} />
        <Route path="invoice" element={<InvoiceComponent />} />
        <Route path='schedule' element={<ScheduleComponent />} />
        <Route path='payment/*' element={<PaymentComponent />} />
        <Route path='receipt/:id' element={<ReceiptComponent />} />
        <Route path='receipt' element={<ReceiptComponent />} />
        <Route path='*' errorElement={<ErrorComponent />} />
      </Routes>
    </>
  );
}

export default App