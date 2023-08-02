import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getClient } from '../../controllers/clientSlice';
import { getInvoices } from '../../controllers/invoiceSlice';

function UserInvoiceComponent() {
  const dispatch = useDispatch();

  const { user_email, stripe_customer_id } = useSelector(
    (state) => state.client
  );
  const { loading, error, invoices } = useSelector((state) => state.invoice);

  useEffect(() => {
    if (user_email) {
      dispatch(getClient());
    }
  }, [user_email, dispatch]);

  useEffect(() => {
    if (stripe_customer_id) {
      dispatch(getInvoices());
    }
  }, [stripe_customer_id, dispatch]);

  if (error) {
    return (
      <>
        <main className="error">
          <div className="status-bar card">
            <span className="error">
              <h4>There was an error or no invoices to show at this time.</h4>
            </span>
          </div>
        </main>
      </>
    );
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {Array.isArray(invoices) && invoices.length > 0 ? (
        <div className="card invoice">
          <table>
            <thead>
              <tr>
                <th>
                  <h4>Invoice ID</h4>
                </th>
                <th>
                  <h4>Status</h4>
                </th>
                <th>
                  <h4>Balance</h4>
                </th>
                <th>
                  <h4>Page</h4>
                </th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice) => (
                <>
                  <tr>
                    <td>{invoice.id}</td>
                    <td>{invoice.status}</td>
                    <td>
                      {new Intl.NumberFormat('us', {
                        style: 'currency',
                        currency: 'USD',
                      }).format(invoice.amount_remaining)}
                    </td>
                    <td>
                      <a href={`/services/invoice/${invoice.id}`}>
                        {invoice.status === 'paid' ? (
                          <h5>View</h5>
                        ) : (
                          <h5>Continue</h5>
                        )}
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

export default UserInvoiceComponent;
