import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { fetchServices } from '../controllers/servicesSlice.js';
import { getClient } from '../controllers/clientSlice.js';
import {
  cancelQuote,
  acceptQuote,
  getStripeQuote,
  getQuoteByID,
} from '../controllers/quoteSlice.js';
import { saveInvoice } from '../controllers/invoiceSlice.js';

function QuoteComponent() {
  const { id } = useParams();

  const { services } = useSelector((state) => state.services);
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
    stripe_invoice_id,
  } = useSelector((state) => state.quote);
  const { invoice_id } = useSelector((state) => state.invoice);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user_email) {
      dispatch(getClient());
    }
  }, [user_email, dispatch]);

  useEffect(() => {
    if (stripe_customer_id) {
      dispatch(fetchServices());
    }
  }, [stripe_customer_id, dispatch]);

  useEffect(() => {
    if (id && stripe_customer_id) {
      dispatch(getQuoteByID(id));
    }
  }, [id, stripe_customer_id, dispatch]);

  const handleCancel = () => {
    if (stripe_quote_id && status === 'open') {
      dispatch(cancelQuote());
    }
  };

  const handleConfirm = async () => {
    if (stripe_quote_id && status === 'open') {
      await dispatch(acceptQuote()).then(() => {
        return dispatch(getStripeQuote());
      });
    }
  };

  const handleAccepted = () => {
    if (stripe_quote_id && quote_id && status === 'accepted') {
      navigate(`/services/invoice/${quote_id}`);
    }
  };

  useEffect(() => {
    if (stripe_invoice_id) {
      dispatch(saveInvoice());
    }
  }, [stripe_invoice_id, dispatch]);

  useEffect(() => {
    if (status === 'accepted' && stripe_invoice_id && invoice_id)
      navigate(`/services/invoice/${invoice_id}`);
  }, [status, stripe_invoice_id, invoice_id]);

  if (status === 'canceled') {
    return (
      <main>
        <div className="status-bar card error">
          <span className="error">This quote has been canceled.</span>
        </div>
      </main>
    );
  }

  if (quoteError) {
    return (
      <div className="status-bar card error">
        <span>
          <h4>{quoteError}</h4>
        </span>
      </div>
    );
  }

  if (loading) {
    return <div>Loading...</div>;
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
      <div className="actions">
        {status && status === 'open' ? (
          <>
            <button onClick={handleCancel}>
              <h3>CANCEL</h3>
            </button>

            <button onClick={handleConfirm}>
              <h3>CONFIRM</h3>
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
