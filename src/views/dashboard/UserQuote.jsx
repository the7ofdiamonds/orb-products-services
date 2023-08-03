import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getClient } from '../../controllers/clientSlice';
import { getClientQuotes, pdfQuote } from '../../controllers/quoteSlice';

function UserQuoteComponent() {
  const dispatch = useDispatch();

  const { user_email, stripe_customer_id } = useSelector(
    (state) => state.client
  );
  const { loading, error, quotes, pdf } = useSelector((state) => state.quote);

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

  const handlePDFClick = async (quoteId) => {
    try {
      const response = await dispatch(pdfQuote(quoteId));
      const base64String = response.payload;

      // Convert the base64 string back to a Blob
      const byteCharacters = atob(base64String.split(',')[1]);
      const byteArrays = [];
      for (let offset = 0; offset < byteCharacters.length; offset += 512) {
        const slice = byteCharacters.slice(offset, offset + 512);
        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
      }
      const blob = new Blob(byteArrays, { type: 'application/pdf' });

      // Rest of the code for initiating the download remains the same
      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        // For Internet Explorer or Microsoft Edge
        window.navigator.msSaveOrOpenBlob(blob, `quote_${quoteId}.pdf`);
      } else {
        // For other modern browsers
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `quote_${quoteId}.pdf`;
        a.click();

        // Release the object URL after the download is initiated
        URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error('Error downloading PDF:', error);
    }
  };

  useEffect(() => {
    return () => {
      if (pdf) {
        URL.revokeObjectURL(pdf);
      }
    };
  }, [pdf]);

  if (error) {
    return (
      <>
        <main className="error">
          <div className="status-bar card">
            <span className="error">
              <h4>There was an error or no quotes to show at this time.</h4>
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
                        <button onClick={() => handlePDFClick(quote.id)}>
                          <h5>Download</h5>
                        </button>
                      ) : quote.status === 'canceled' ? (
                        <a href={`/services/quote/${quote.id}`}>
                          <h5>Canceled</h5>
                        </a>
                      ) : quote.status === 'open' ? (
                        <a href={`/services/quote/${quote.id}`}>
                          <h5>Confirm</h5>
                        </a>
                      ) : (
                        <a href={`/services/quote/${quote.id}`}>
                          <h5>Change</h5>
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
