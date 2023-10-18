import React from 'react';

import UserReceiptComponent from './billing/UserReceipt';
import UserInvoiceComponent from './billing/UserInvoice';
import UserQuoteComponent from './billing/UserQuote';

function Billing() {
  return (
    <>
      <h2 className="title">billing</h2>

      <UserReceiptComponent />
      <UserInvoiceComponent />
      <UserQuoteComponent />
    </>
  );
}

export default Billing;
