import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import {
  getInvoice,
  getStripeInvoice,
  updateInvoice,
} from '../controllers/invoiceSlice.js';
import { finalizeInvoice } from '../controllers/paymentSlice.js';

function InvoiceComponent() {
  const { id } = useParams();
  const {
    loading,
    error,
    stripe_invoice_id,
    tax_id,
    company_name,
    first_name,
    last_name,
    address_line_1,
    address_line_2,
    city,
    state,
    zipcode,
    phone,
    user_email,
    date_due,
    amount_due,
    selections,
    subtotal,
    tax,
  } = useSelector((state) => state.invoice);
  const { payment_intent_id, client_secret } = useSelector(
    (state) => state.payment
  );

  const subTotal = subtotal/100;
  const Tax = tax/100;
  const grandTotal = amount_due/100;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getInvoice(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (stripe_invoice_id) {
      dispatch(getStripeInvoice());
    }
  }, [stripe_invoice_id]);

  const handleClick = () => {
    if (stripe_invoice_id) {
      dispatch(finalizeInvoice());
    }
  };

  useEffect(() => {
    if (payment_intent_id) {
      dispatch(updateInvoice());
    }
  }, [dispatch, payment_intent_id]);

  useEffect(() => {
    if (client_secret) {
      navigate(`/services/payment/${id}`);
    }
  }, [dispatch, client_secret, navigate, id]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h2 className="title">INVOICE</h2>
      <div className="invoice-card card">
        <table className="invoice-table" id="service_invoice">
          <thead className="invoice-table-head" id="service-total-header">
            <tr>
              <th className="bill-to-label" colSpan={2}>
                <h4>BILL TO:</h4>
              </th>
              <td className="bill-to-name" colSpan={4}>
                {first_name} {last_name}
              </td>
            </tr>
            <tr className="bill-to-address">
              <td></td>
              <td></td>
              <td colSpan={2}>{address_line_1}</td>
              <td>{address_line_2}</td>
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
                {user_email}
              </td>
              <td></td>
            </tr>
            <tr className="bill-to-due">
              <th className="bill-to-due-date-label" colSpan={2}>
                <h4>DUE DATE</h4>
              </th>
              <td className="bill-to-due-date" colSpan={2}>
                {date_due ? date_due : 'N/A'}
              </td>
              <th className="bill-to-total-due-label">
                <h4>TOTAL DUE</h4>
              </th>
              <td className="bill-to-total-due">
                {amount_due
                  ? new Intl.NumberFormat('us', {
                      style: 'currency',
                      currency: 'USD',
                    }).format(amount_due)
                  : 'N/A'}
              </td>
            </tr>
            <tr className="invoice-labels">
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
              selections.map((selection) => (
                <tr id="quote_option">
                  <td className="feature-id">{selection.id}</td>
                  <td className="feature-name" id="feature_name" colSpan={4}>
                    {selection.description}
                  </td>
                  <td className="feature-cost  table-number" id="feature_cost">
                    {new Intl.NumberFormat('us', {
                      style: 'currency',
                      currency: 'USD',
                    }).format(selection.cost)}
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
              <th>
                <h4 className="subtotal-label">SUBTOTAL</h4>
              </th>
              <td>
                <h4 className="subtotal table-number">
                  {new Intl.NumberFormat('us', {
                    style: 'currency',
                    currency: 'USD',
                  }).format(subTotal)}
                </h4>
              </td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <th>
                <h4 className="tax-label">TAX</h4>
              </th>
              <td>
                <h4 className="tax table-number">
                  {new Intl.NumberFormat('us', {
                    style: 'currency',
                    currency: 'USD',
                  }).format(Tax)}
                </h4>
              </td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <th>
                <h4 className="grand-total-label">GRAND TOTAL</h4>
              </th>
              <th>
                <h4 className="grand-total table-number">
                  {new Intl.NumberFormat('us', {
                    style: 'currency',
                    currency: 'USD',
                  }).format(grandTotal)}
                </h4>
              </th>
            </tr>
          </tfoot>
        </table>
      </div>

      <button onClick={handleClick}>
        <h3>PAYMENT</h3>
      </button>
    </>
  );
}

export default InvoiceComponent;
