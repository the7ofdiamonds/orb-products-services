import React from 'react';

import BillingReceipt from './BillingReceipts';
import BillingInvoice from './BillingInvoices';
import BillingQuote from './BillingQuotes';

function Billing() {
  return (
    <>
      <section className="billing">
        <h2 className="title">billing</h2>

        <BillingReceipt />
        <BillingInvoice />
        <BillingQuote />
      </section>
    </>
  );
}

export default Billing;
