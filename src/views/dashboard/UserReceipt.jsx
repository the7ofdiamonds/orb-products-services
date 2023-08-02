import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getClient } from '../../controllers/clientSlice';
import { getReceipts } from '../../controllers/receiptSlice';

function UserReceiptComponent() {
  const dispatch = useDispatch();

  const { user_email, stripe_customer_id } = useSelector(
    (state) => state.client
  );
  const { loading, error, receipts } = useSelector((state) => state.receipt);

  useEffect(() => {
    if (user_email) {
      dispatch(getClient());
    }
  }, [user_email, dispatch]);

  useEffect(() => {
    if (stripe_customer_id) {
      dispatch(getReceipts());
    }
  }, [stripe_customer_id, dispatch]);

  if (error) {
    return (
      <>
        <main className="error">
          <div className="status-bar card">
            <span className="error">
              <h4>There was an error or no receipts to show at this time.</h4>
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
      {Array.isArray(receipts) && receipts.length > 0 ? (
        <div className="card receipt">
          <table>
            <thead>
              <tr>
                <th>
                  <h4>Receipt ID</h4>
                </th>
                <th>
                  <h4>Invoice ID</h4>
                </th>
                <th>
                  <h4>Page</h4>
                </th>
              </tr>
            </thead>
            <tbody>
              {receipts.map((receipt) => (
                <>
                  <tr key={receipt.id}>
                    <td>{receipt.id}</td>
                    <td>{receipt.invoice_id}</td>
                    <td>
                      <a href={`/services/receipt/${receipt.id}`}>
                        <h5>View</h5>
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

export default UserReceiptComponent;
