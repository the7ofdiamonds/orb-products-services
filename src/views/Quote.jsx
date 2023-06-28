import { useNavigate } from 'react-router-dom';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchServices } from '../controllers/servicesSlice.js';
import {
  addSelections,
  calculateSelections,
} from '../controllers/invoiceSlice.js';

function QuoteComponent() {
  const parsedPath = window.location.pathname.split('/');
  const service = parsedPath[2];

  const { loading, error, services } = useSelector((state) => state.services);
  const { cost } = useSelector((state) => state.services.services);
  const { subtotal } = useSelector((state) => state.invoice);
  const { selections } = useSelector((state) => state.invoice);
  console.log(services);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [checkedItems, setCheckedItems] = useState([]);

  useEffect(() => {
      dispatch(fetchServices());
  }, []);

  const handleCheckboxChange = (event, service) => {
    const isChecked = event.target.checked;

    setCheckedItems((prevItems) => {
      if (isChecked) {
        return [...prevItems, service];
      } else {
        return prevItems.filter((item) => item !== service);
      }
    });
  };

  useEffect(() => {
    dispatch(addSelections(checkedItems));
  }, [checkedItems]);

  useEffect(() => {
    dispatch(calculateSelections(services.cost));
  }, [checkedItems]);

  const handleClick = () => {
    navigate('/services/schedule');
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h2>QUOTE</h2>

      <div className="quote">
        <form method="POST" className="quote-form" id="quote_form">
          <table className="quote-table" id="quote_total">
            <thead className="quote-table-head">
              <tr>
                <th className="description" colSpan={2}>
                  <h4>DESCRIPTION</h4>
                </th>
                <th className="costs">
                  <h4>COST</h4>
                </th>
              </tr>
            </thead>

            <tbody className="quote-table-body">
              {services && services.length ? (
                <React.Fragment>
                  {services.map((service) => (
                    <tr id="quote_option">
                      <td>
                        <input
                          className="input selection feature-selection"
                          type="checkbox"
                          name="quote[checkbox][]"
                          checked={checkedItems.includes(service)}
                          onChange={(event) =>
                            handleCheckboxChange(event, service)
                          }
                        />
                      </td>
                      <td className="description">{service.description}</td>
                      <td
                        className="feature-cost table-number"
                        id="feature_cost">
                        {new Intl.NumberFormat('us', {
                          style: 'currency',
                          currency: 'USD',
                        }).format(service.cost)}
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              ) : (
                <tr>
                  <td></td>
                  <td>
                    <h3>No features to show yet</h3>
                  </td>
                  <td></td>
                </tr>
              )}
            </tbody>

            <tfoot className="quote-table-foot">
              <tr>
                <th className="total-due-label" colSpan={2}>
                  <h4>TOTAL DUE</h4>
                </th>
                <th className="total-due table-number">
                  <h4>
                    {new Intl.NumberFormat('us', {
                      style: 'currency',
                      currency: 'USD',
                    }).format(subtotal)}
                  </h4>
                </th>
              </tr>
            </tfoot>
          </table>
        </form>
      </div>

      <button id="schedule_button" onClick={handleClick}>
        <h3>SCHEDULE</h3>
      </button>
    </>
  );
}

export default QuoteComponent;
