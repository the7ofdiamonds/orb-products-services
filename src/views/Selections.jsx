import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { fetchServices } from '../controllers/servicesSlice.js';
import { getClient } from '../controllers/clientSlice.js';
import {
  addSelections,
  calculateSelections,
  createQuote,
  finalizeQuote,
  getClientQuotes,
  getStripeQuote,
  updateQuoteID,
  updateQuote,
  getQuote,
} from '../controllers/quoteSlice.js';

function SelectionsComponent() {
  const { servicesLoading, servicesError, services } = useSelector(
    (state) => state.services
  );
  const { user_email, stripe_customer_id } = useSelector(
    (state) => state.client
  );
  const {
    loading,
    quotes,
    quoteError,
    quote_id,
    status,
    selections,
    total,
    stripe_quote_id,
  } = useSelector((state) => state.quote);

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

  const handleCheckboxChange = (event, id, price_id, description, cost) => {
    const isChecked = event.target.checked;

    setCheckedItems((prevItems) => {
      if (isChecked) {
        const newItem = { id, price_id, description, cost };
        return [...prevItems, newItem];
      } else {
        return prevItems.filter((item) => item.id !== id);
      }
    });
  };
console.log(checkedItems)
  useEffect(() => {
    dispatch(addSelections(checkedItems));
  }, [dispatch, checkedItems]);

  useEffect(() => {
    dispatch(calculateSelections(services.cost));
  }, [dispatch, services.cost, checkedItems]);

  const handleClick = () => {
    if (selections.length > 0 && stripe_customer_id) {
      dispatch(createQuote(selections));
    }
  };

  useEffect(() => {
    if (stripe_quote_id) {
      dispatch(finalizeQuote());
    }
  }, [stripe_quote_id, dispatch]);

  useEffect(() => {
    if ((quote_id && status === 'open') || status === 'accepted') {
      window.location.href = `/services/quote/${quote_id}`;
    }
  }, [quote_id, status]);

  if (servicesError) {
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

  if (servicesLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h2>SELECTIONS</h2>

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
                  const { id, price_id, description, cost } = service;

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
                              id,
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

      {quoteError && (
        <div className={`status-bar card error`}>
          <span>{quoteError}</span>
        </div>
      )}

      <button onClick={handleClick}>
        <h3>QUOTE</h3>
      </button>
    </>
  );
}

export default SelectionsComponent;