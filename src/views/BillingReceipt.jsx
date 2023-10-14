import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { getClient } from '../controllers/clientSlice.js';
import { getStripeCustomer } from '../controllers/customerSlice.js';
import { getStripeInvoice } from '../controllers/invoiceSlice.js';
import { getPaymentIntent } from '../controllers/paymentSlice.js';
import { getPaymentMethod, getReceipt } from '../controllers/receiptSlice.js';

import formatPhoneNumber from '../utils/PhoneNumberFormatter.js';
import { getEvent } from '../controllers/scheduleSlice.js';

function ReceiptComponent() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { user_email, stripe_customer_id } = useSelector(
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
  const {
    status,
    selections,
    subtotal,
    tax,
    amount_due,
    amount_paid,
    amount_remaining,
    payment_date,
    payment_intent_id,
  } = useSelector((state) => state.invoice);
  const { start_date, start_time } = useSelector((state) => state.schedule);
  const { payment_method_id } = useSelector((state) => state.payment);
  const {
    loading,
    error,
    invoice_id,
    stripe_invoice_id,
    payment_method,
    first_name,
    last_name,
  } = useSelector((state) => state.receipt);

  const [messageType, setMessageType] = useState('');
  const [message, setMessage] = useState('');

  const timestamp = payment_date * 1000;
  const paymentDate = new Date(timestamp);
  const formattedPhone = formatPhoneNumber(phone);
  const Subtotal = subtotal / 100;
  const Tax = tax / 100;
  const amountDue = amount_due / 100;
  const amountPaid = amount_paid / 100;
  const Balance = amount_remaining / 100;

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
      dispatch(getReceipt(id));
    }
  }, [dispatch, id, stripe_customer_id]);

  useEffect(() => {
    if (!payment_method && payment_method_id) {
      dispatch(getPaymentMethod(payment_method_id));
    }
  }, [dispatch, payment_method_id]);

  useEffect(() => {
    if (invoice_id) {
      dispatch(getEvent());
    }
  }, [invoice_id, dispatch]);

  useEffect(() => {
    if (start_date && start_time) {
      setMessageType('info');
      setMessage(
        `Make sure to confirm your appointment for ${start_date} @ ${start_time}.`
      );
    }
  }, [start_date, start_time]);

  useEffect(() => {
    if (stripe_invoice_id) {
      dispatch(getStripeInvoice(stripe_invoice_id));
    }
  }, [dispatch, stripe_invoice_id]);

  useEffect(() => {
    if (payment_intent_id) {
      dispatch(getPaymentIntent(payment_intent_id));
    }
  }, [dispatch, payment_intent_id]);

  const handleClick = () => {
    window.location = '/dashboard';
  };

  if (error) {
    return (
      <div className="status-bar card error">
        <span>
          You have either entered the wrong Receipt ID, or you are not the
          client to whom this receipt belongs.
        </span>
      </div>
    );
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h2 className="title">RECEIPT</h2>
      <div className="receipt-card card">
        <div className="thead">
          <div className="tr receipt-number">
            <div className="th">
              <h4>RECEIPT NUMBER</h4>
            </div>
            <div className="td">
              <h5>{id}</h5>
            </div>
          </div>
          <div className="tr payment-date">
            <div className="th">
              <h4>PAYMENT DATE</h4>
            </div>
            <div className="td">
              <h5>{paymentDate.toLocaleString()}</h5>
            </div>
          </div>
          <div className="tr payment-method">
            <div className="th">
              <h4>PAYMENT TYPE</h4>
            </div>
            <div className="td">
              <h5 className="payment-method">
                {payment_method ? payment_method : 'No Payment Method Provided'}
              </h5>
            </div>
          </div>
          <div className="tr client-details">
            <div className="th">
              <h4>PAID BY</h4>
            </div>
            <div className="td">
              <h5>
                {first_name} {last_name} O/B/O {company_name}
              </h5>
            </div>
            <div className="tr address-line-1">
              <div className="td">
                <h5>{address_line_1}</h5>
              </div>
              <div className="td">
                <h5>{address_line_2}</h5>
              </div>
            </div>
            <div className="tr address-line-2">
              <div className="td">
                <h5>{`${city},`}</h5>
              </div>
              <div className="td">
                <h5>{state}</h5>
              </div>
              <div className="td">
                <h5>{zipcode}</h5>
              </div>
            </div>
            <div className="tr phone">
              <div className="td">
                <a href={`tel:${phone}`}>
                  <h5>{formattedPhone}</h5>
                </a>
              </div>
            </div>
            <div className="tr email">
              <div className="td">
                <h5>{user_email}</h5>
              </div>
            </div>
          </div>
        </div>

        <table>
          <thead>
            <th>
              <h4>NO.</h4>
            </th>
            <th>
              <h4>DESCRIPTION</h4>
            </th>
            <th>
              <h4>TOTAL</h4>
            </th>
          </thead>
          <tbody>
            {selections &&
              selections.length > 0 &&
              selections.map((selection) => (
                <tr>
                  <td>
                    <h5>{selection.id}</h5>
                  </td>
                  <td>
                    <h5>{selection.description}</h5>
                  </td>
                  <td className="selections-cost">
                    <h5>
                      {new Intl.NumberFormat('us', {
                        style: 'currency',
                        currency: 'USD',
                      }).format(selection.cost)}
                    </h5>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        <div className="tfoot">
          <div className="tr subtotal">
            <div className="th subtotal-label">
              <h4>SUBTOTAL</h4>
            </div>
            <div className="td subtotal-number">
              <h5>
                {new Intl.NumberFormat('us', {
                  style: 'currency',
                  currency: 'USD',
                }).format(Subtotal)}
              </h5>
            </div>
          </div>
          <div className="tr tax">
            <div className="th tax-label">
              <h4>TAX</h4>
            </div>
            <div className="td tax-number">
              <h5>
                {new Intl.NumberFormat('us', {
                  style: 'currency',
                  currency: 'USD',
                }).format(Tax)}
              </h5>
            </div>
          </div>
          <div className="tr grand-total">
            <div className="th grand-total-label">
              <h4>GRAND TOTAL</h4>
            </div>
            <div className="td grand-total-number">
              <h5>
                {new Intl.NumberFormat('us', {
                  style: 'currency',
                  currency: 'USD',
                }).format(amountDue)}
              </h5>
            </div>
          </div>
          <div className="tr amount-paid">
            <div className="th amount-paid-label">
              <h4>AMOUNT PAID</h4>
            </div>
            <div className="td amount-paid-number">
              <h5>
                {new Intl.NumberFormat('us', {
                  style: 'currency',
                  currency: 'USD',
                }).format(amountPaid)}
              </h5>
            </div>
          </div>
          <div className="tr balance">
            <div className="th balance-label">
              <h4>BALANCE</h4>
            </div>
            <div className="td balance-number">
              <h5>
                {new Intl.NumberFormat('us', {
                  style: 'currency',
                  currency: 'USD',
                }).format(Balance)}
              </h5>
            </div>
          </div>
        </div>
      </div>

      {message && (
        <div className={`status-bar card ${messageType}`}>
          <span>{message}</span>
        </div>
      )}

      <button id="quote_button" onClick={handleClick}>
        <h3>DASHBOARD</h3>
      </button>
    </>
  );
}

export default ReceiptComponent;