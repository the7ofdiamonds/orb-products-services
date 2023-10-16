import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import PaymentNavigationComponent from './payment/Navigation.jsx';

import { getClient } from '../controllers/clientSlice.js';
import { getStripeCustomer } from '../controllers/customerSlice.js';
import {
  getInvoiceByID,
  getStripeInvoice,
} from '../controllers/invoiceSlice.js';
import { getPaymentIntent } from '../controllers/paymentSlice.js';
import { getReceipt } from '../controllers/receiptSlice.js';

import LoadingComponent from '../loading/LoadingComponent';
import ErrorComponent from '../error/ErrorComponent.jsx';
import StatusBar from '../views/components/StatusBar';

function PaymentComponent() {
  const { id } = useParams();

  const [messageType, setMessageType] = useState('');
  const [message, setMessage] = useState('');

  const { user_email } = useSelector((state) => state.client);
  const { stripe_invoice_id, status, amount_remaining } = useSelector(
    (state) => state.invoice
  );
  const { paymentLoading, paymentError } = useSelector((state) => state.payment);
  const { receipt_id } = useSelector((state) => state.receipt);

  const dispatch = useDispatch();

  useEffect(() => {
    if (user_email) {
      dispatch(getClient()).then((response) => {
        if (response.error !== undefined) {
          console.error(response.error.message);
          setMessageType('error');
          setMessage(response.error.message);
        } else {
          dispatch(getStripeCustomer(response.payload.stripe_customer_id)).then(
            (response) => {
              if (response.error !== undefined) {
                console.error(response.error.message);
                setMessageType('error');
                setMessage(response.error.message);
              } else {
                dispatch(
                  getInvoiceByID(id, response.payload.stripe_customer_id)
                ).then((response) => {
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
                      } else {
                        dispatch(
                          getPaymentIntent(response.payload.payment_intent_id)
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
            }
          );
        }
      });
    }
  }, [user_email, dispatch]);

  useEffect(() => {
    if (status === 'open') {
      setMessage('Choose a payment method');
    } else if (status === 'paid' && amount_remaining === 0) {
      setMessage('This invoice has been paid in full.');
    }
  }, [status, amount_remaining]);

  useEffect(() => {
    if (stripe_invoice_id) {
      dispatch(getReceipt()).then((response) => {
        if (response.error !== undefined) {
          console.error(response.error.message);
          setMessageType('error');
          setMessage(response.error.message);
        }
      });
    }
  }, [stripe_invoice_id, dispatch]);

  const handleClick = () => {
    if (receipt_id) {
      window.location.href = `/billing/receipt/${receipt_id}`;
    }
  };

  if (paymentLoading) {
    return <LoadingComponent />;
  }

  if (paymentError) {
    return <ErrorComponent error={paymentError} />;
  }

  return (
    <>
      <h2 className="title">PAYMENT</h2>

      {status === 'open' ? <PaymentNavigationComponent /> : ''}

      <StatusBar message={message} messageType={messageType} />

      {receipt_id && status == 'paid' ? (
        <button onClick={handleClick}>
          <h3>RECEIPT</h3>
        </button>
      ) : (
        ''
      )}
    </>
  );
}

export default PaymentComponent;
