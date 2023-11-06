import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getClient } from '../controllers/clientSlice';
import { getClientReceipts } from '../controllers/receiptSlice';

function BillingReceipts() {
  const dispatch = useDispatch();

  const { user_email, stripe_customer_id } = useSelector(
    (state) => state.client
  );
  const { loading, receiptError, receipts } = useSelector(
    (state) => state.receipt
  );

  useEffect(() => {
    if (user_email) {
      dispatch(getClient());
    }
  }, [user_email, dispatch]);

  useEffect(() => {
    if (stripe_customer_id) {
      dispatch(getClientReceipts());
    }
  }, [stripe_customer_id, dispatch]);

  if (receiptError) {
    return (
      <>
        <div className="status-bar card error">
          <span>
            <h4>{receiptError}</h4>
          </span>
        </div>
      </>
    );
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  const now = new Date().getTime();
  let sortedReceipts = [];

  if (Array.isArray(receipts)) {
    sortedReceipts = receipts.slice().sort((a, b) => {
      const timeDiffA = Math.abs(a.payment_date - now);
      const timeDiffB = Math.abs(b.payment_date - now);

      return timeDiffA - timeDiffB;
    });
  }

  return (
    <>
      {Array.isArray(sortedReceipts) && sortedReceipts.length > 0 ? (
        <div className="card receipt">
          <table>
            <thead>
              <tr>
                <th>
                  <h4>Receipt ID</h4>
                </th>
                <th>
                  <h4>Amount Paid</h4>
                </th>
                <th>
                  <h4>Balance</h4>
                </th>
                <th>
                  <h4>Invoice ID</h4>
                </th>
                <th>
                  <h4>PDF</h4>
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedReceipts.map((receipt) => (
                <>
                  <tr key={receipt.id}>
                    <td>{receipt.id}</td>
                    <td>
                      {/* add locales column & currency column Ex: invoice.currency */}
                      {new Intl.NumberFormat('us', {
                        style: 'currency',
                        currency: 'USD',
                      }).format(receipt.amount_paid)}
                    </td>
                    <td>
                      {new Intl.NumberFormat('us', {
                        style: 'currency',
                        currency: 'USD',
                      }).format(receipt.balance)}
                    </td>
                    <td>{receipt.invoice_id}</td>
                    <td>
                      <a href={receipt.receipt_pdf_url} target="_blank">
                        <button>
                          <h5>Download</h5>
                        </button>
                      </a>
                    </td>
                  </tr>
                </>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        ''
      )}
    </>
  );
}

export default BillingReceipts;
