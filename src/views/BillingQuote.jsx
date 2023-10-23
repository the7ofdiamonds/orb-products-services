import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { getClient } from '../controllers/clientSlice.js';
import {
  cancelQuote,
  acceptQuote,
  getStripeQuote,
  getQuoteByID,
} from '../controllers/quoteSlice.js';
import {
  getInvoiceByQuoteID,
  saveInvoice,
} from '../controllers/invoiceSlice.js';

import LoadingComponent from '../loading/LoadingComponent.jsx';
import ErrorComponent from '../error/ErrorComponent.jsx';
import StatusBar from './components/StatusBar.jsx';

function QuoteComponent() {
  const { id } = useParams();

  const [messageType, setMessageType] = useState('info');
  const [message, setMessage] = useState(
    'To receive an invoice for the selected services, you must accept the quote above.'
  );

  const { user_email } = useSelector((state) => state.client);
  const {
    quoteLoading,
    quoteError,
    quote_id,
    stripe_quote_id,
    status,
    total,
    selections,
    stripe_invoice_id,
  } = useSelector((state) => state.quote);
  const { invoice_id } = useSelector((state) => state.invoice);

  const dispatch = useDispatch();

  useEffect(() => {
    if (user_email) {
      dispatch(getClient()).then((response) => {
        if (response.error !== undefined) {
          console.error(response.error.message);
          setMessageType('error');
          setMessage(response.error.message);
        } else {
          dispatch(getQuoteByID(id, response.payload.stripe_customer_id)).then(
            (response) => {
              if (response.error !== undefined) {
                console.error(response.error.message);
                setMessageType('error');
                setMessage(response.error.message);
              } else {
                dispatch(getStripeQuote(response.payload.stripe_quote_id)).then(
                  (response) => {
                    if (response.error !== undefined) {
                      console.error(response.error.message);
                      setMessageType('error');
                      setMessage(response.error.message);
                    }
                  }
                );
              }
            }
          );
        }
      });
    }
  }, [user_email, dispatch]);

  useEffect(() => {
    if (status === 'canceled') {
      setMessageType('error');
      setMessage('This quote has been canceled.');
    }
  }, [status]);

  useEffect(() => {
    if (quote_id && status === 'accepted') {
      dispatch(getInvoiceByQuoteID(quote_id)).then((response) => {
        if (response.error !== undefined) {
          console.error(response.error.message);
          setMessageType('error');
          setMessage(response.error.message);
        }
      });
    }
  }, [quote_id, status, dispatch]);

  const handleCancel = () => {
    // pop up that gives the option to cancel or add to the selections
    if (stripe_quote_id && status === 'open') {
      dispatch(cancelQuote()).then((response) => {
        if (response.error !== undefined) {
          console.error(response.error.message);
          setMessageType('error');
          setMessage(response.error.message);
        }
      });
    }
  };

  const handleAccept = async () => {
    if (stripe_quote_id && status === 'open') {
      dispatch(acceptQuote()).then((response) => {
        if (response.error !== undefined) {
          console.error(response.error.message);
          setMessageType('error');
          setMessage(response.error.message);
        } else {
          dispatch(saveInvoice(response.payload.invoice)).then((response) => {
            if (response.error !== undefined) {
              console.error(response.error.message);
              setMessageType('error');
              setMessage(response.error.message);
            } else {
              window.location.href = `/billing/invoice/${response.payload}`;
            }
          });
        }
      });
    }
  };

  const handleInvoice = () => {
    if (invoice_id && status === 'accepted') {
      window.location.href = `/billing/invoice/${invoice_id}`;
    }
  };

  const handleSelections = () => {
    if (status === 'canceled') {
      window.location.href = `/client/selections`;
    }
  };

  if (quoteLoading) {
    return <LoadingComponent />;
  }

  if (quoteError) {
    return <ErrorComponent error={quoteError} />;
  }

  return (
    <>
      <section className="quote">
        <h2 className="title">QUOTE</h2>

        <div className="quote-card card">
          <table>
            <thead>
              <tr>
                <th>
                  <h4>Quote</h4>
                </th>
              </tr>
              <tr>
                <th>
                  <h4 className="number-label">NO.</h4>
                </th>
                <th colSpan={4}>
                  <h4 className="description-label">DESCRIPTION</h4>
                </th>
                <th>
                  <h4 className="total-label">TOTAL</h4>
                </th>
              </tr>
            </thead>
            <tbody>
              {selections &&
                selections.length > 0 &&
                selections.map((item) => (
                  <tr id="quote_option">
                    <td className="feature-id">{item.id}</td>
                    <td className="feature-name" id="feature_name" colSpan={4}>
                      {item.description}
                    </td>
                    <td
                      className="feature-cost  table-number"
                      id="feature_cost">
                      <h4>
                        {new Intl.NumberFormat('us', {
                          style: 'currency',
                          currency: 'USD',
                        }).format(item.cost)}
                      </h4>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        <StatusBar message={message} messageType={messageType} />

        <div className="actions">
          {status && status === 'open' ? (
            <>
              <button onClick={handleCancel}>
                <h3>CANCEL</h3>
              </button>

              <button onClick={handleAccept}>
                <h3>ACCEPT</h3>
              </button>
            </>
          ) : status === 'accepted' ? (
            <button onClick={handleInvoice}>
              <h3>INVOICE</h3>
            </button>
          ) : status === 'canceled' ? (
            <button onClick={handleSelections}>
              <h3>SELECTIONS</h3>
            </button>
          ) : null}
        </div>
      </section>
    </>
  );
}

export default QuoteComponent;
