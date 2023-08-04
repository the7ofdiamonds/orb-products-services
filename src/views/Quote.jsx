import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { fetchServices } from '../controllers/servicesSlice.js';
import { getClient } from '../controllers/clientSlice.js';
import {
  addSelections,
  calculateSelections,
  getQuote,
  cancelQuote,
  acceptQuote,
  getStripeQuote,
} from '../controllers/quoteSlice.js';
import { saveInvoice } from '../controllers/invoiceSlice.js';

function QuoteComponent() {
  const { id } = useParams();

  const { loading, error, services } = useSelector((state) => state.services);
  const { user_email, stripe_customer_id } = useSelector(
    (state) => state.client
  );
  const { stripe_quote_id, status, total, selections, stripe_invoice_id } =
    useSelector((state) => state.quote);
  const { invoice_id } = useSelector((state) => state.invoice);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [checkedItems, setCheckedItems] = useState([]);

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
      dispatch(getQuote(id, stripe_customer_id));
    }
  }, [id, stripe_customer_id, dispatch]);

  const handleCheckboxChange = (event, price_id, description, cost) => {
    const isChecked = event.target.checked;

    setCheckedItems((prevItems) => {
      if (isChecked) {
        const newItem = { price_id, description, cost };
        return [...prevItems, newItem];
      } else {
        return prevItems.filter((item) => item.price_id !== price_id);
      }
    });
  };

  useEffect(() => {
    dispatch(addSelections(checkedItems));
  }, [dispatch, checkedItems]);

  useEffect(() => {
    dispatch(calculateSelections(services.cost));
  }, [dispatch, services.cost, checkedItems]);

  const handleCancel = () => {
    if (status === 'draft' || status === 'open') {
      dispatch(cancelQuote());
    }
  };

  const handleConfirm = () => {
    if (stripe_quote_id && status === 'open') {
      dispatch(acceptQuote());
    }
  };

  useEffect(() => {
    if (status === 'accepted') {
      dispatch(getStripeQuote());
    }
  }, [status, dispatch]);

  useEffect(() => {
    if (stripe_invoice_id) {
      dispatch(saveInvoice());
    }
  }, [stripe_invoice_id, dispatch]);

  useEffect(() => {
    if (invoice_id) {
      navigate(`/services/invoice/${invoice_id}`);
    }
  }, [invoice_id, navigate]);

  if (error) {
    return (
      <main className="error">
        <div className="status-bar card">
          <span className="error">
            There was an error loading the available services at this time.
          </span>
        </div>
      </main>
    );
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h2>QUOTE</h2>

      <div className="quote-card card">
        <table>
          <thead>
            <tr>
              <th colSpan={2}>
                <h4 className="description-label">DESCRIPTION</h4>
              </th>
              <th>
                <h4 className="cost-label">COST</h4>
              </th>
            </tr>
          </thead>
          <tbody>
            {services && services.length ? (
              <React.Fragment>
                {services.map((service) => {
                  const { price_id, description, cost } = service;

                  return (
                    <tr key={price_id} id="quote_option">
                      <td>
                        <input
                          className="input selection feature-selection"
                          type="checkbox"
                          name="quote[checkbox][]"
                          checked={checkedItems.some(
                            (item) => item.price_id === price_id
                          )}
                          onChange={(event) =>
                            handleCheckboxChange(
                              event,
                              price_id,
                              description,
                              cost
                            )
                          }
                        />
                      </td>
                      <td className="feature-description">{description}</td>
                      <td
                        className="feature-cost table-number"
                        id="feature_cost">
                        {new Intl.NumberFormat('us', {
                          style: 'currency',
                          currency: 'USD',
                        }).format(cost)}
                      </td>
                    </tr>
                  );
                })}
              </React.Fragment>
            ) : (
              <tr>
                <td colSpan={3}>
                  <h3>No features to show yet</h3>
                </td>
              </tr>
            )}
          </tbody>
          <tfoot>
            <tr>
              <th colSpan={2}>
                <h4 className="subtotal-label">TOTAL</h4>
              </th>
              <th>
                <h4 className="subtotal">
                  {new Intl.NumberFormat('us', {
                    style: 'currency',
                    currency: 'USD',
                  }).format(total)}
                </h4>
              </th>
            </tr>
          </tfoot>
        </table>
      </div>

      <div className="actions">
        <button onClick={handleCancel}>
          <h3>CANCEL</h3>
        </button>
        <button onClick={handleConfirm}>
          <h3>CONFIRM</h3>
        </button>
      </div>
    </>
  );
}

export default QuoteComponent;
