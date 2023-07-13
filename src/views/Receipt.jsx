import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getInvoice, getStripeInvoice } from '../controllers/invoiceSlice.js';
import { getPaymentIntent } from '../controllers/paymentSlice.js';
import { getPaymentMethod, getReceipt } from '../controllers/receiptSlice.js';
import { getStripeCustomer } from '../controllers/clientSlice.js';

import formatPhoneNumber from '../utils/PhoneNumberFormatter.js';

function ReceiptComponent() {
  const { id } = useParams();
  const {
    name,
    address_line_1,
    address_line_2,
    city,
    state,
    zipcode,
    phone,
    email,
  } = useSelector((state) => state.client);
  const {
    user_email,
    selections,
    subtotal,
    tax,
    amount_due,
    amount_paid,
    amount_remaining,
    payment_date,
    stripe_invoice_id,
    payment_intent,
    customer,
  } = useSelector((state) => state.invoice);
  const { payment_method } = useSelector((state) => state.payment);
  const { loading, error, invoice_id, type, brand, last4 } = useSelector(
    (state) => state.receipt
  );
  const timestamp = payment_date * 1000;
  const paymentDate = new Date(timestamp);
  const formattedPhone = formatPhoneNumber(phone);
  const Subtotal = subtotal / 100;
  const Tax = tax / 100;
  const amountDue = amount_due / 100;
  const amountPaid = amount_paid / 100;
  const Balance = amount_remaining / 100;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getReceipt(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (invoice_id !== '') {
      dispatch(getInvoice(invoice_id));
    }
  }, [dispatch, invoice_id]);

  useEffect(() => {
    if (stripe_invoice_id !== '') {
      dispatch(getStripeInvoice(stripe_invoice_id));
    }
  }, [dispatch, stripe_invoice_id]);

  useEffect(() => {
    if (customer) {
      dispatch(getStripeCustomer(customer));
    }
  }, [dispatch, customer]);

  useEffect(() => {
    if (payment_intent !== '') {
      dispatch(getPaymentIntent(payment_intent));
    }
  }, [dispatch, payment_intent]);

  useEffect(() => {
    if (payment_method !== '') {
      dispatch(getPaymentMethod(payment_method));
    }
  }, [dispatch, payment_method]);

  const paymentMethod = type === 'card' ? `${brand} - ${last4}` : null;

  if (error) {
    return <div>Error: {error}</div>;
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
              <h4>PAYMENT METHOD</h4>
            </div>
            <div className="td">
              <h5 className="payment-method">
                {paymentMethod ? paymentMethod : 'No Payment Method Provided'}
              </h5>
            </div>
          </div>
          <div className="tr client-details">
            <div className="th">
              <h4>PAID BY</h4>
            </div>
            <div className="td">
              <h5>{name}</h5>
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
    </>
  );
}

export default ReceiptComponent;
