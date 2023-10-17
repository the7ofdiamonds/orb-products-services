import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchServices } from '../controllers/servicesSlice.js';
import { getClient } from '../controllers/clientSlice.js';
import {
  addSelections,
  calculateSelections,
  createQuote,
  finalizeQuote,
  getClientQuotes,
  getQuote,
  updateStripeQuote,
} from '../controllers/quoteSlice.js';

import LoadingComponent from '../loading/LoadingComponent.jsx';
import StatusBar from './components/StatusBar.jsx';

function SelectionsComponent() {
  const dispatch = useDispatch();

  const [messageType, setMessageType] = useState('info');
  const [message, setMessage] = useState(
    'Check the boxes next to the services you would like performed.'
  );
  const [checkedItems, setCheckedItems] = useState([]);

  const { servicesLoading, services } = useSelector((state) => state.services);
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
    if (stripe_customer_id) {
      dispatch(getClientQuotes()).then((response) => {
        if (response.error !== undefined) {
          console.error(response.error.message);
          setMessageType('error');
          setMessage(response.error.message);
        }
      });
    }
  }, [stripe_customer_id, dispatch]);

  useEffect(() => {
    if (quotes) {
      const filteredQuotes = [];

      quotes.forEach((quote) => {
        const timestampNow = Math.floor(Date.now() / 1000);
        const timestamp = parseInt(quote.expires_at);
        const createdAt = new Date(quote.created_at).getTime();
        const status = quote.status;

        if (timestampNow < timestamp) {
          if (
            status === 'draft' ||
            status === 'open' ||
            status === 'accepted'
          ) {
            filteredQuotes.push(createdAt);
          }
        }
      });

      if (filteredQuotes.length > 0) {
        const earliestDate = Math.min(...filteredQuotes);

        quotes.forEach((quote) => {
          if (new Date(quote.created_at).getTime() === earliestDate) {
            dispatch(getQuote(quote.stripe_quote_id)).then((response) => {
              if (response.error !== undefined) {
                console.error(response.error.message);
                setMessageType('error');
                setMessage(response.error.message);
              } 
            });
          }
        });
      }
    }
  }, [quotes, dispatch]);

  useEffect(() => {
    if (stripe_quote_id) {
      dispatch(getQuote()).then((response) => {
        if (response.error !== undefined) {
          console.error(response.error.message);
          setMessageType('error');
          setMessage(response.error.message);
        }
      });
    }
  }, [stripe_quote_id, dispatch]);

  useEffect(() => {
    if (stripe_customer_id) {
      dispatch(fetchServices()).then((response) => {
        if (response.error !== undefined) {
          console.error(response.error.message);
          setMessageType('error');
          setMessage(response.error.message);
        }
      });
    }
  }, [stripe_customer_id, dispatch]);

  useEffect(() => {
    dispatch(addSelections(checkedItems));
  }, [dispatch, checkedItems]);

  useEffect(() => {
    dispatch(calculateSelections(services.cost));
  }, [dispatch, services.cost, checkedItems]);

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

  const handleClick = () => {
    if (selections.length === 0) {
      setMessageType('error');
    } else if (
      (stripe_quote_id && status === 'canceled' && selections.length > 0) ||
      (stripe_quote_id === '' &&
        status === '' &&
        selections.length > 0 &&
        stripe_customer_id)
    ) {
      dispatch(createQuote(selections)).then((response) => {
        if (response.error !== undefined) {
          console.error(response.error.message);
          setMessageType('error');
          setMessage(response.error.message);
        }
      });
    } else if (stripe_quote_id && status === 'draft' && selections.length > 0) {
      dispatch(updateStripeQuote()).then((response) => {
        if (response.error !== undefined) {
          console.error(response.error.message);
          setMessageType('error');
          setMessage(response.error.message);
        }
      });
    } else if (stripe_quote_id && status === 'draft') {
      dispatch(finalizeQuote()).then((response) => {
        if (response.error !== undefined) {
          console.error(response.error.message);
          setMessageType('error');
          setMessage(response.error.message);
        }
      });
    } else if (quote_id && (status === 'open' || status === 'accepted')) {
      window.location.href = `/billing/quote/${quote_id}`;
    }
  };

  if (servicesLoading) {
    return <LoadingComponent />;
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

      <StatusBar message={message} messageType={messageType} />

      {quote_id && (status === 'open' || status === 'accepted') ? (
        <button onClick={handleClick}>
          <h3>QUOTE</h3>
        </button>
      ) : (
        ''
      )}
    </>
  );
}

export default SelectionsComponent;
