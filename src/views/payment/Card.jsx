import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import PaymentNavigationComponent from './Navigation';

import {
  getInvoice,
  getStripeInvoice,
  updateInvoiceStatus,
} from '../../controllers/invoiceSlice';
import { getPaymentIntent } from '../../controllers/paymentSlice';
import { postReceipt, getPaymentMethod } from '../../controllers/receiptSlice';
import { displayStatus, displayStatusType } from '../../utils/DisplayStatus';

import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const CardPaymentComponent = () => {
  const { id } = useParams();

  const {
    first_name,
    last_name,
    client_secret,
    payment_intent_id,
    stripe_invoice_id,
    amount_paid,
  } = useSelector((state) => state.invoice);
  const { loading, error, status, payment_method_id } = useSelector((state) => state.payment);
  const {
    receipt_id,
    balance,
    payment_date,
    payment_type,
    card,
    last4,
    payment_method,
  } = useSelector((state) => state.receipt);

  const [messageType, setMessageType] = useState('');
  const [message, setMessage] = useState('Choose a payment method');

  // Setup so card displays input
  const [cardNumber, setCardNumber] = useState('');
  const [validThruMonth, setValidThruMonth] = useState('');
  const [validThruYear, setValidThruYear] = useState('');
  const [CVC, setCVC] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    dispatch(getInvoice(id));
  }, [dispatch, id]);

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

      const update = {
        id: id,
        client_secret: result.paymentIntent.client_secret,
        user_email: result.paymentIntent.receipt_email,
        status: status,
      };

      dispatch(updateInvoiceStatus(update));
      setMessage(displayStatus(status));
      setMessageType(displayStatusType(status));
    }
  };

  useEffect(() => {
    if (stripe_invoice_id) {
      dispatch(getStripeInvoice());
    }
  }, [dispatch, stripe_invoice_id]);

  useEffect(() => {
    if (payment_intent_id) {
      dispatch(getPaymentIntent(payment_intent_id));
    }
  }, [dispatch, payment_intent_id]);

  useEffect(() => {
    if (status) {
      setMessage(displayStatus(status));
      setMessageType(displayStatusType(status));
    }
  }, [status]);

  useEffect(() => {
    if (payment_method_id) {
      dispatch(getPaymentMethod(payment_method_id));
    }
  }, [dispatch, payment_method_id]);

  const payment_method_card = card && last4 ? `${card} - ${last4}` : '';

  const payment = {
    invoice_id: id,
    payment_method_id: payment_method,
    amount_paid: amount_paid,
    balance: balance,
    payment_date: payment_date,
    payment_method: payment_method_card,
  };

  useEffect(() => {
    if (amount_paid > 0) {
      dispatch(postReceipt(payment));
    }
  }, [dispatch, amount_paid]);

  useEffect(() => {
    if (receipt_id !== '') {
      navigate(`/services/receipt/${receipt_id}`);
    }
  }, [receipt_id, navigate]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <PaymentNavigationComponent />
      <div className="debit-credit-card card">
        <div className="front">
          n{' '}
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

      {message && (
        <div className="status-bar card">
          <span className={`${messageType}`}>{message}</span>
        </div>
      )}

      <button type="submit" disabled={!stripe} onClick={handleSubmit}>
        <h3>PAY</h3>
      </button>
    </>
  );
};

export default CardPaymentComponent;
