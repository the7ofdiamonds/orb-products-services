import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { getClient } from '../controllers/clientSlice.js';
import { getStripeCustomer } from '../controllers/customerSlice.js';
import { saveEvent, sendInvites } from '../controllers/scheduleSlice.js';
import {
  getStripeInvoice,
  getInvoice,
  updateInvoice,
} from '../controllers/invoiceSlice.js';
import {
  finalizeInvoice,
  getPaymentIntent,
} from '../controllers/paymentSlice.js';

function InvoiceComponent() {
  const { id } = useParams();

  const { user_email, first_name, last_name, stripe_customer_id } = useSelector(
    (state) => state.client
  );
  const {
    company_name,
    address_line_1,
    address_line_2,
    city,
    state,
    zipcode,
    phone,
  } = useSelector((state) => state.customer);
  const { event_id } = useSelector((state) => state.schedule);
  const {
    loading,
    error,
    status,
    stripe_invoice_id,
    due_date,
    amount_due,
    selections,
    subtotal,
    tax,
    payment_intent_id,
  } = useSelector((state) => state.invoice);
  const { client_secret } = useSelector((state) => state.payment);
  
  const dueDate = new Date(due_date * 1000).toLocaleString();
  const amountDue = amount_due;
  const subTotal = subtotal;
  const Tax = tax;
  const grandTotal = amount_due;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user_email) {
      dispatch(getClient());
    }
  }, [dispatch, user_email]);

  useEffect(() => {
    if (stripe_customer_id) {
      dispatch(getStripeCustomer());
    }
  }, [dispatch, stripe_customer_id]);

  useEffect(() => {
    if (stripe_customer_id) {
      dispatch(getInvoice(id, stripe_customer_id));
    }
  }, [dispatch, id, stripe_customer_id]);

  useEffect(() => {
    if (stripe_invoice_id) {
      dispatch(getStripeInvoice(stripe_invoice_id));
    }
  }, [dispatch, stripe_invoice_id]);

  useEffect(() => {
    if (event_id) {
      dispatch(saveEvent());
    }
  }, [event_id, dispatch]);

  useEffect(() => {
    if (payment_intent_id) {
      dispatch(getPaymentIntent());
    }
  }, [payment_intent_id, dispatch]);

  useEffect(() => {
    if (status && payment_intent_id && client_secret) {
      dispatch(updateInvoice());
    }
  }, [status, payment_intent_id, client_secret, dispatch]);

  const handleClick = () => {
    if (status === 'paid') {
      navigate(`/services/receipt/${id}`);
    } else if (status === 'open' && client_secret) {
      navigate(`/services/payment/${id}`);
    } else if (stripe_invoice_id) {
      dispatch(finalizeInvoice());
      dispatch(sendInvites());
    }
  };

  if (error) {
    return (
      <main className="error">
        <div className="status-bar card">
          <span className="error">
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
              <td className="bill-to-name" colSpan={4}>
                {first_name} {last_name} O/B/O {company_name}
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
            {selections &&
              selections.length > 0 &&
              selections.map((selection) => (
                <tr id="quote_option">
                  <td className="feature-id">{selection.id}</td>
                  <td className="feature-name" id="feature_name" colSpan={4}>
                    {selection.description}
                  </td>
                  <td className="feature-cost  table-number" id="feature_cost">
                    <h4>
                      {new Intl.NumberFormat('us', {
                        style: 'currency',
                        currency: 'USD',
                      }).format(selection.cost)}
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
