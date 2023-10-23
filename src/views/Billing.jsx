import React from 'react';

import UserReceiptComponent from './billing/UserReceipt';
import UserInvoiceComponent from './billing/UserInvoice';
import UserQuoteComponent from './billing/UserQuote';

function Billing() {
  return (
    <>
      <section className="billing">
        <h2 className="title">billing</h2>

        <UserReceiptComponent />
        <UserInvoiceComponent />
        <UserQuoteComponent />
      </section>
    </>
  );
}

export default Billing;
