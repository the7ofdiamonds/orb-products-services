import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { getClient } from '../controllers/clientSlice.js';
import {
  cancelQuote,
  acceptQuote,
  getStripeQuote,
  getQuoteByID,
} from '../controllers/quoteSlice.js';
import { saveInvoice } from '../controllers/invoiceSlice.js';

import LoadingComponent from '../loading/LoadingComponent';
import ErrorComponent from '../error/ErrorComponent.jsx';
import StatusBar from '../views/components/StatusBar';

function QuoteComponent() {
  const { id } = useParams();

  const [messageType, setMessageType] = useState('info');
  const [message, setMessage] = useState(
    'To receive an invoice for the selected services, you must accept the quote above.'
  );
  const [stripeInvoiceID, setStripeInvoiceID] = useState('');
  const [invoiceID, setInvoiceID] = useState('');

  const { user_email, stripe_customer_id } = useSelector(
    (state) => state.client
  );
  const {
    loading,
    quoteError,
    quote_id,
    stripe_quote_id,
    status,
    total,
    selections,
  } = useSelector((state) => state.quote);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user_email) {
      dispatch(getClient()).then((response) => {
        if (response.error !== undefined) {
          console.error(response.error.message);
          setMessageType('error');
          setMessage(response.error.message);
        }
      });
    }
  }, [user_email, dispatch]);

  useEffect(() => {
    if (id && stripe_customer_id) {
      dispatch(getQuoteByID(id)).then((response) => {
        if (response.error !== undefined) {
          console.error(response.error.message);
          setMessageType('error');
          setMessage(response.error.message);
        }
      });
    }
  }, [id, stripe_customer_id, dispatch]);

  useEffect(() => {
    if (status === 'canceled') {
      setMessageType('error');
      setMessage('This quote has been canceled.');
    }
  }, [status]);

  useEffect(() => {
    if (stripe_quote_id && status) {
      dispatch(getStripeQuote()).then((response) => {
        if (response.error !== undefined) {
          console.error(response.error.message);
          setMessageType('error');
          setMessage(response.error.message);
        } else {
          setStripeInvoiceID(response.payload.invoice.id);
        }
      });
    }
  }, [stripe_quote_id, status, dispatch]);

  useEffect(() => {
    if (stripeInvoiceID !== '') {
      dispatch(saveInvoice(stripeInvoiceID)).then((response) => {
        if (response.error !== undefined) {
          console.error(response.error.message);
          setMessageType('error');
          setMessage(response.error.message);
        } else {
          setInvoiceID(response.payload);
        }
      });
    }
  }, [stripeInvoiceID, dispatch]);

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
        }
      });
    }
  };

  const handleAccepted = () => {
    if (invoiceID) {
      window.location.href = `/billing/invoice/${invoiceID}`;
    }
  };

  if (loading) {
    return <LoadingComponent />;
  }

  if (quoteError) {
    return <ErrorComponent error={quoteError} />;
  }

  return (
    <>
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
                  <td className="feature-cost  table-number" id="feature_cost">
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
          <button onClick={handleAccepted}>
            <h3>INVOICE</h3>
          </button>
        ) : null}
      </div>
    </>
  );
}

export default QuoteComponent;
