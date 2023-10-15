import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import PaymentNavigationComponent from './payment/Navigation';

import { getClient } from '../controllers/clientSlice';
import {
  getInvoiceByID,
  getStripeInvoice,
  updateInvoiceStatus,
} from '../controllers/invoiceSlice';
import { getPaymentIntent } from '../controllers/paymentSlice';
import {
  postReceipt,
  getPaymentMethod,
  updatePaymentMethod,
} from '../controllers/receiptSlice';

import { displayStatus, displayStatusType } from '../utils/DisplayStatus';
import { PaymentMethodGenerator } from '../utils/PaymentMethod';

// Stripe
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

import LoadingComponent from '../loading/LoadingComponent';
import ErrorComponent from '../error/ErrorComponent.jsx';
import StatusBar from '../views/components/StatusBar';

const CardPaymentComponent = () => {
  const { id } = useParams();

  const [messageType, setMessageType] = useState('info');
  const [message, setMessage] = useState(
    'Please enter your card number, expiration date and the code on the back.'
  );

  const { user_email, first_name, last_name, stripe_customer_id } = useSelector(
    (state) => state.client
  );
  const {
    stripe_invoice_id,
    payment_intent_id,
    status,
    amount_paid,
    remaining_balance,
  } = useSelector((state) => state.invoice);
  const { loading, paymentError, client_secret } = useSelector(
    (state) => state.payment
  );
  const { receipt_id, payment_method, brand, last4 } = useSelector(
    (state) => state.receipt
  );

  // Setup so card displays input
  const [cardNumber, setCardNumber] = useState('');
  const [validThruMonth, setValidThruMonth] = useState('');
  const [validThruYear, setValidThruYear] = useState('');
  const [CVC, setCVC] = useState('');

  const [paymentMethodID, setPaymentMethodID] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    if (user_email) {
      dispatch(getClient(user_email));
    }
  }, [user_email, dispatch]);

  useEffect(() => {
    if (stripe_customer_id) {
      dispatch(getInvoiceByID(id, stripe_customer_id));
    }
  }, [dispatch, id, stripe_customer_id]);

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

  // useEffect(() => {
  //   if (status) {
  //     dispatch(updateInvoiceStatus());
  //   }
  // }, [dispatch, status]);

  // useEffect(() => {
  //   if (status) {
  //     setMessage(displayStatus(status));
  //     setMessageType(displayStatusType(status));
  //   }
  // }, [status]);

  // useEffect(() => {
  //   if (receipt_id) {
  //     navigate(`/services/receipt/${receipt_id}`);
  //   }
  // }, [receipt_id, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    const result = await stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (result.error) {
      setMessage(result.error.message);
      setMessageType('error');
    }

    if (result.paymentIntent) {
      let status = result.paymentIntent.status;

      setMessage(displayStatus(status));
      setMessageType(displayStatusType(status));

      dispatch(getPaymentMethod(result.paymentIntent.payment_method));
    }
  };

  useEffect(() => {
    if (brand !== '' && last4 !== '') {
      const paymentMethodCard = `${brand} - ${last4}`;
      dispatch(updatePaymentMethod(PaymentMethodGenerator(payment_method)));
    }
  }, [dispatch, brand, last4]);

  useEffect(() => {
    if (payment_method && stripe_invoice_id) {
      dispatch(getStripeInvoice(stripe_invoice_id));
    }
  }, [dispatch, payment_method]);

  useEffect(() => {
    if (status === 'paid') {
      dispatch(postReceipt());
    }
  }, [dispatch, status]);

  if (paymentError) {
    return <ErrorComponent error={paymentError} />;
  }

  if (loading) {
    return <LoadingComponent />;
  }

  return (
    <>
      <PaymentNavigationComponent />

      <div className="debit-credit-card card">
        <div className="front">
          <div className="image">
            <img src="" alt="" />
            <img src="" alt="" />
          </div>
          <div className="card-number-box">
            {cardNumber ? cardNumber : '#### #### #### ####'}
          </div>
          <div className="flexbox">
            <div className="box">
              <div className="card-holder-name">
                {first_name} {last_name}
              </div>
            </div>

            <div className="box">
              <span>VALID THRU</span>
              <div className="expiration">
                <span className="exp-month">Month</span> /
                <span className="exp-year">Year</span>
              </div>
            </div>
          </div>
        </div>

        <div className="back">
          <div className="box">
            <span>cvv</span>
            <div className="cvv-box"></div>
            <img src="" alt="" />
          </div>
        </div>
      </div>

      <form className="stripe-card card" onSubmit={handleSubmit}>
        <CardElement />
      </form>

      <StatusBar message={message} messageType={messageType} />

      {client_secret ? (
        <button type="submit" disabled={!stripe} onClick={handleSubmit}>
          <h3>PAY</h3>
        </button>
      ) : (
        ''
      )}
    </>
  );
};

export default CardPaymentComponent;
