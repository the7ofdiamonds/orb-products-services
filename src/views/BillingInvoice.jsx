import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { getClient } from '../controllers/clientSlice.js';
import { getStripeCustomer } from '../controllers/customerSlice.js';
import {
  getStripeInvoice,
  getInvoiceByID,
  finalizeInvoice,
} from '../controllers/invoiceSlice.js';
import {
  getPaymentIntent,
  updateClientSecret,
} from '../controllers/paymentSlice.js';
import { updateReceiptID, getReceipt } from '../controllers/receiptSlice.js';

import LoadingComponent from '../loading/LoadingComponent';
import ErrorComponent from '../error/ErrorComponent.jsx';
import StatusBar from '../views/components/StatusBar';

function InvoiceComponent() {
  const { id } = useParams();

  const [messageType, setMessageType] = useState('info');
  const [message, setMessage] = useState(
    'To start receiving the services listed above, please use the payment button below.'
  );

  const { user_email } = useSelector((state) => state.client);
  const {
    invoiceLoading,
    invoiceError,
    status,
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
    due_date,
    amount_due,
    subtotal,
    tax,
    payment_intent_id,
    items,
  } = useSelector((state) => state.invoice);
  const { paymentStatus, client_secret } = useSelector((state) => state.payment);
  const { receipt_id } = useSelector((state) => state.receipt);

  const dueDate = new Date(due_date * 1000).toLocaleString();
  const amountDue = amount_due / 100;
  const subTotal = subtotal / 100;
  const Tax = tax / 100;
  const grandTotal = amount_due / 100;

  const dispatch = useDispatch();

  useEffect(() => {
    if (user_email) {
      dispatch(getClient()).then((response) => {
        if (response.error !== undefined) {
          console.error(response.error.message);
          setMessageType('error');
          setMessage(response.error.message);
        } else {
          dispatch(getStripeCustomer()).then((response) => {
            if (response.error !== undefined) {
              console.error(response.error.message);
              setMessageType('error');
              setMessage(response.error.message);
            } else {
              dispatch(getInvoiceByID(id)).then((response) => {
                if (response.error !== undefined) {
                  console.error(response.error.message);
                  setMessageType('error');
                  setMessage(response.error.message);
                } else {
                  dispatch(
                    getStripeInvoice(response.payload.stripe_invoice_id)
                  ).then((response) => {
                    if (response.error !== undefined) {
                      console.error(response.error.message);
                      setMessageType('error');
                      setMessage(response.error.message);
                    }
                  });
                }
              });
            }
          });
        }
      });
    }
  }, [user_email, dispatch]);

  useEffect(() => {
    if (payment_intent_id) {
      dispatch(getPaymentIntent()).then((response) => {
        if (response.error !== undefined) {
          console.error(response.error.message);
          setMessageType('error');
          setMessage(response.error.message);
        }
      });
    }
  }, [payment_intent_id, dispatch]);

  useEffect(() => {
    if (status === 'paid' && stripe_invoice_id) {
      dispatch(getReceipt()).then((response) => {
        if (response.error !== undefined) {
          console.error(response.error.message);
          setMessageType('error');
          setMessage(response.error.message);
        } else {
          console.log(response.payload.id);
          updateReceiptID(response.payload.id);
        }
      });
    }
  }, [stripe_invoice_id, status, dispatch]);

  const handleClick = async () => {
    if (status === 'paid' && receipt_id) {
      window.location.href = `/billing/receipt/${receipt_id}`;
    } else if (status === 'open' && client_secret) {
      window.location.href = `/billing/payment/${id}`;
    } else if (status === 'draft' && stripe_invoice_id) {
      dispatch(finalizeInvoice()).then((response) => {
        if (response.error !== undefined) {
          console.error(response.error.message);
          setMessageType('error');
          setMessage(response.error.message);
        } else {
          dispatch(getPaymentIntent(response.payload.payment_intent_id)).then(
            (response) => {
              if (response.error !== undefined) {
                console.error(response.error.message);
                setMessageType('error');
                setMessage(response.error.message);
              } else {
                dispatch(
                  updateClientSecret(response.payload.client_secret)
                ).then((response) => {
                  if (response.error !== undefined) {
                    console.error(response.error.message);
                    setMessageType('error');
                    setMessage(response.error.message);
                  } else {
                    window.location.href = `/billing/receipt/${receipt_id}`;
                  }
                });
              }
            }
          );
        }
      });
    }
  };

  if (invoiceLoading) {
    return <LoadingComponent />;
  }

  if (invoiceError) {
    return <ErrorComponent error={invoiceError} />;
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

      <StatusBar message={message} messageType={messageType} />

      <button onClick={handleClick}>
        {(status === 'paid' && receipt_id) ||
        (paymentStatus === 'succeeded' && receipt_id) ? (
          <h3>RECEIPT</h3>
        ) : status === 'open' && client_secret ? (
          <h3>PAYMENT</h3>
        ) : (
          ''
        )}
      </button>
    </>
  );
}

export default InvoiceComponent;
