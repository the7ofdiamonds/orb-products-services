import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { fetchServices } from '../controllers/servicesSlice.js';
import {
  addSelections,
  calculateSelections,
} from '../controllers/quoteSlice.js';
import {
  quoteToInvoice,
  createInvoice,
} from '../controllers/invoiceSlice.js';

function QuoteComponent() {
  const { loading, error, services } = useSelector((state) => state.services);
  const { stripe_customer_id } = useSelector((state) => state.client);
  const { subtotal, selections } = useSelector((state) => state.quote);
  const { stripe_invoice_id, invoice_id } = useSelector(
    (state) => state.invoice
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [checkedItems, setCheckedItems] = useState([]);

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

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

  const handleClick = () => {
    if (stripe_customer_id && subtotal > 0) {
      dispatch(quoteToInvoice(selections));
      dispatch(createInvoice());
    }
  };

  useEffect(() => {
    if (invoice_id) {
      navigate(`/services/invoice/${invoice_id}`);
    }
  }, [navigate, invoice_id]);

  if (error) {
    return <div>Error: {error}</div>;
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
                          checked={checkedItems.some((item) => item.price_id === price_id)}
                          onChange={(event) =>
                            handleCheckboxChange(event, price_id, description, cost)
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
                <h4 className="subtotal-label">SUBTOTAL</h4>
              </th>
              <th>
                <h4 className="subtotal">
                  {new Intl.NumberFormat('us', {
                    style: 'currency',
                    currency: 'USD',
                  }).format(subtotal)}
                </h4>
              </th>
            </tr>
          </tfoot>
        </table>
      </div>

      <button onClick={handleClick}>
        <h3>INVOICE</h3>
      </button>
    </>
  );
}

export default QuoteComponent;
