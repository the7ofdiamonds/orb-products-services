import React from 'react';

import UserReceiptComponent from './dashboard/UserReceipt';
import UserInvoiceComponent from './dashboard/UserInvoice';
import UserQuoteComponent from './dashboard/UserQuote';

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
