import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getClient } from '../../controllers/clientSlice';
import { getClientQuotes } from '../../controllers/quoteSlice';

function UserQuoteComponent() {
  const dispatch = useDispatch();

  const { user_email, stripe_customer_id } = useSelector(
    (state) => state.client
  );
  const { loading, quoteError, quotes, pdf } = useSelector(
    (state) => state.quote
  );

  useEffect(() => {
    if (user_email) {
      dispatch(getClient());
    }
  }, [user_email, dispatch]);

  useEffect(() => {
    if (stripe_customer_id) {
      dispatch(getClientQuotes());
    }
  }, [stripe_customer_id, dispatch]);

  if (quoteError) {
    return (
      <>
        <div className="status-bar card error">
          <span>
            <h4>{quoteError}</h4>
          </span>
        </div>
      </>
    );
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {Array.isArray(quotes) && quotes.length > 0 ? (
        <div className="card quote">
          <table>
            <thead>
              <tr>
                <th>
                  <h4>Quote ID</h4>
                </th>
                <th>
                  <h4>Status</h4>
                </th>
                <th>
                  <h4>Total</h4>
                </th>
                <th>
                  <h4>Page</h4>
                </th>
              </tr>
            </thead>
            <tbody>
              {quotes.map((quote) => (
                <>
                  <tr>
                    <td>{quote.id}</td>
                    <td>{quote.status}</td>
                    <td>
                      {new Intl.NumberFormat('us', {
                        style: 'currency',
                        currency: 'USD',
                      }).format(quote.amount_total)}
                    </td>
                    <td>
                      {quote.status === 'accepted' ? (
                        <h5>Accepted</h5>
                      ) : quote.status === 'canceled' ? (
                        <h5>Canceled</h5>
                      ) : (
                        <a href={`/services/quote/${quote.id}`}>
                          <h5>Confirm</h5>
                        </a>
                      )}
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

export default UserQuoteComponent;
