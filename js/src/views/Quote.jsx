import { useNavigate } from 'react-router-dom';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchService } from '../controllers/serviceSlice.js';
import {
  addSelections,
  calculateSelections,
} from '../controllers/invoiceSlice.js';

function QuoteComponent() {
  const parsedPath = window.location.pathname.split('/');
  const service = parsedPath[2];

  const { loading, error } = useSelector((state) => state.service);
  const { features, cost } = useSelector(
    (state) => state.service.service
  );

  const {subtotal} = useSelector((state) => state.invoice);
  const { selections } = useSelector((state) => state.invoice);
  const [checkedItems, setCheckedItems] = useState([]);
console.log(selections)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchService(service));
  }, []);

  const handleCheckboxChange = (event, feature) => {
    const isChecked = event.target.checked;

    setCheckedItems((prevItems) => {
      if (isChecked) {
        return [...prevItems, feature];
      } else {
        return prevItems.filter((item) => item !== feature);
      }
    });
  };

  useEffect(() => {
    dispatch(addSelections(checkedItems));
  }, [checkedItems]);

  useEffect(() => {
    if (selections.length > 0) {
      dispatch(calculateSelections(cost));
    }
  }, [checkedItems]);

  const handleClick = () => {
    navigate('/schedule');
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="quote">
      <div className="quote-card card">
        <form method="POST" className="quote-form" id="quote_form">
          <table className="quote-table" id="quote_total">
            <thead className="quote-table-head">
              <tr>
                <th className="options">
                  <input
                    type="checkbox"
                    name="checkbox"
                    id="checkbox"
                    defaultChecked
                  />
                </th>
                <th className="features">
                  <h4>FEATURE</h4>
                </th>
                <th className="costs">
                  <h4>COST</h4>
                </th>
              </tr>
            </thead>

            <tbody className="quote-table-body">
              {features && features.length ? (
                <React.Fragment>
                  {features.map((feature) => (
                    <tr id="quote_option">
                      <td>
                        <input
                          className="input selection feature-selection"
                          type="checkbox"
                          name="quote[checkbox][]"
                          checked={checkedItems.includes(feature)}
                          onChange={(event) =>
                            handleCheckboxChange(event, feature)
                          }
                        />
                      </td>
                      <td className="feature-name" id="feature_name">
                        {feature.name}
                      </td>
                      <td
                        className="feature-cost table-number"
                        id="feature_cost">
                        {feature.cost}
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
                <td></td>
                <th className="total-due-label">
                  <h4>TOTAL DUE</h4>
                </th>
                <th className="total-due table-number">
                  <h4>{subtotal == 0 ? cost : subtotal}</h4>
                </th>
              </tr>
            </tfoot>
          </table>
        </form>
      </div>

      <button id="schedule_button" onClick={handleClick}>
        <h3>SCHEDULE</h3>
      </button>
    </div>
  );
}

export default QuoteComponent;
