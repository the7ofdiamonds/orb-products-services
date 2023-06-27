import { useNavigate, useParams } from 'react-router-dom';
import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { getInvoice } from '../controllers/invoiceSlice.js';
import { createPaymentIntent } from '../controllers/paymentSlice.js';

function InvoiceComponent() {
  const { id } = useParams();
  const {
    loading,
    error,
    invoice_id,
    email,
    name,
    street_address,
    city,
    state,
    zipcode,
    phone,
    start_date,
    start_time,
    selections,
    subtotal,
    tax,
    grand_total,
    payment_intent_id,
  } = useSelector((state) => state.invoice);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getInvoice(id));
  }, []);

  const handleClick = () => {
    dispatch(createPaymentIntent(invoice_id, email, subtotal));
  };

  useEffect(() => {
    if (payment_intent_id) {
    navigate(`/services/payment/${id}`);
    }
  }, [payment_intent_id]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h2 className="title">INVOICE</h2>      
      <div className="invoice" id="invoice">
        <div className="invoice-card card">
          <table className="invoice-table" id="service_invoice">
            <thead className="invoice-table-head" id="service-total-header">
              <tr>
                <th className="bill-to-label" colSpan={2}>
                  <h4>BILL TO:</h4>
                </th>
                <td className="bill-to-name" colSpan={4}>
                  {name}
                </td>
              </tr>
              <tr className="bill-to-address">
                <td></td>
                <td></td>
                <td colSpan={3}>{street_address}</td>
                <td></td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td className="bill-to-city">{city}</td>
                <td className="bill-to-state">{state}</td>
                <td className="bill-to-zipcode">{zipcode}</td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td className="bill-to-phone">{phone}</td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td className="bill-to-email" colSpan={2}>
                  {email}
                </td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <th className="bill-to-due-date-label" colSpan={2}>
                  <h4>DUE DATE</h4>
                </th>
                <td className="bill-to-due-date" colSpan={2}>
                  {start_date} @ {start_time}
                </td>
                <th className="bill-to-total-due-label">
                  <h4>TOTAL DUE</h4>
                </th>
                <th className="bill-to-total-due">
                  <h4>$10,000.00</h4>
                </th>
              </tr>
              <tr>
                <th className="item-number-label">
                  <h4>NO.</h4>
                </th>
                <th className="item-description-label" colSpan={4}>
                  <h4>DESCRIPTION</h4>
                </th>
                <th className="item-total-label">
                  <h4>TOTAL</h4>
                </th>
              </tr>
            </thead>

            <tbody>
              {selections &&
                selections.length > 0 &&
                selections.map((selection) => (
                  <tr id="quote_option">
                    <td className="feature-id">1</td>
                    <td className="feature-name" id="feature_name" colSpan={4}>
                      {selection.name}
                    </td>
                    <td
                      className="feature-cost  table-number"
                      id="feature_cost">
                      {selection.cost}
                    </td>
                  </tr>
                ))}
            </tbody>

            <tfoot>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <th className="subtotal-label">
                  <h4>SUBTOTAL</h4>
                </th>
                <td className="subtotal table-number">
                  <h4>{subtotal}</h4>
                </td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <th className="tax-label">
                  <h4>TAX</h4>
                </th>
                <td className="tax table-number">
                  <h4>{tax}</h4>
                </td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <th className="grand-total-label">
                  <h4>GRAND TOTAL</h4>
                </th>
                <th className="grand-total table-number">
                  <h4>{grand_total}</h4>
                </th>
              </tr>
            </tfoot>
          </table>
        </div>

        <button onClick={handleClick}>
          <h3>PAYMENT</h3>
        </button>
      </div>
    </>
  );
}

export default InvoiceComponent;
