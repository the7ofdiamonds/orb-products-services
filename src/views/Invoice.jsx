import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { getClient } from '../controllers/clientSlice.js';
import { getStripeCustomer } from '../controllers/customerSlice.js';
import { getQuote } from '../controllers/quoteSlice.js';
import {
  getStripeInvoice,
  getInvoice,
  finalizeInvoice,
} from '../controllers/invoiceSlice.js';
import { getPaymentIntent } from '../controllers/paymentSlice.js';

function InvoiceComponent() {
  const { id } = useParams();

  const { user_email, stripe_customer_id } = useSelector(
    (state) => state.client
  );
  const {
    loading,
    error,
    status,
    quote_id,
    customer_name,
    customer_tax_ids,
    address_line_1,
    address_line_2,
    city,
    state,
    postal_code,
    customer_phone,
    customer_email,
    stripe_invoice_id,
    event_id,
    due_date,
    amount_due,
    subtotal,
    tax,
    payment_intent_id,
    items,
  } = useSelector((state) => state.invoice);
  const { client_secret } = useSelector((state) => state.payment);

  const dueDate = new Date(due_date * 1000).toLocaleString();
  const amountDue = amount_due / 100;
  const subTotal = subtotal / 100;
  const Tax = tax / 100;
  const grandTotal = amount_due / 100;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user_email) {
      dispatch(getClient());
    }
  }, [user_email, dispatch]);

  useEffect(() => {
    if (stripe_customer_id) {
      dispatch(getStripeCustomer());
    }
  }, [stripe_customer_id, dispatch]);

  useEffect(() => {
    if (stripe_customer_id) {
      dispatch(getInvoice(id));
    }
  }, [id, stripe_customer_id, dispatch]);

  useEffect(() => {
    if (stripe_invoice_id) {
      dispatch(getStripeInvoice(stripe_invoice_id));
    }
  }, [stripe_invoice_id, dispatch]);

  useEffect(() => {
    if (quote_id && stripe_customer_id) {
      dispatch(getQuote(quote_id));
    }
  }, [quote_id, stripe_customer_id, dispatch]);

  useEffect(() => {
    if (payment_intent_id) {
      dispatch(getPaymentIntent());
    }
  }, [payment_intent_id, dispatch]);

  //Event id mast be validated
  const handleClick = async () => {
    if (status === 'paid' && receipt_id) {
      navigate(`/billing/receipt/${receipt_id}`);
    } else if (status === 'open' && client_secret) {
      navigate(`/billing/payment/${id}`);
    } else if (stripe_invoice_id) {
      dispatch(finalizeInvoice());
    }
  };

  useEffect(() => {
    if (status === 'open' && client_secret) {
      navigate(`/billing/payment/${id}`);
    }
  }, [status, id, client_secret]);

  if (error) {
    return (
      <main>
        <div className="status-bar card error">
          <span>
            You have either entered the wrong Invoice ID, or you are not the
            client to whom this invoice belongs.
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
      <h2 className="title">INVOICE</h2>
      <div className="invoice-card card">
        <table className="invoice-table" id="service_invoice">
          <thead className="invoice-table-head" id="service-total-header">
            <tr>
              <th className="bill-to-label" colSpan={2}>
                <h4>BILL TO:</h4>
              </th>
              <td className="bill-to-name" colSpan={2}>
                {customer_name}
              </td>
              {Array.isArray(customer_tax_ids) &&
                customer_tax_ids.length > 0 &&
                customer_tax_ids.map((tax, index) => (
                  <>
                    <td className="bill-to-tax-id-type" key={index}>
                      {tax.type}
                    </td>
                    <td className="bill-to-tax-id" key={index}>
                      {tax.value}
                    </td>
                  </>
                ))}
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
              <td className="bill-to-zipcode">{postal_code}</td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td className="bill-to-phone">{customer_phone}</td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td className="bill-to-email" colSpan={2}>
                {customer_email}
              </td>
              <td></td>
            </tr>
            <tr className="bill-to-due">
              <th className="bill-to-due-date-label" colSpan={2}>
                <h4>DUE DATE</h4>
              </th>
              <td className="bill-to-due-date" colSpan={2}>
                {dueDate ? dueDate : 'N/A'}
              </td>
              <th className="bill-to-total-due-label">
                <h4>TOTAL DUE</h4>
              </th>
              <td className="bill-to-total-due">
                <h4>
                  {amount_due
                    ? new Intl.NumberFormat('us', {
                        style: 'currency',
                        currency: 'USD',
                      }).format(amountDue)
                    : 'N/A'}
                </h4>
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
            {items &&
              items.length > 0 &&
              items.map((item) => (
                <tr id="quote_option">
                  <td className="feature-id">{item.price.product}</td>
                  <td className="feature-name" id="feature_name" colSpan={4}>
                    {item.description}
                  </td>
                  <td className="feature-cost  table-number" id="feature_cost">
                    <h4>
                      {new Intl.NumberFormat('us', {
                        style: 'currency',
                        currency: 'USD',
                      }).format(item.amount / 100)}
                    </h4>
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
        {status === 'paid' ? <h3>RECEIPT</h3> : <h3>PAYMENT</h3>}
      </button>
    </>
  );
}

export default InvoiceComponent;
