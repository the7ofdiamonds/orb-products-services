import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import PaymentNavigationComponent from './Navigation';

import {
  getInvoice,
  updateInvoiceStatus,
} from '../../controllers/invoiceSlice';
import { getPaymentIntent } from '../../controllers/paymentSlice';
import { postReceipt, getReceipt } from '../../controllers/receiptSlice';

import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const CardPaymentComponent = () => {
  const { id } = useParams();

  const { user_email, first_name, last_name, client_secret } = useSelector(
    (state) => state.invoice
  );
  const { loading, error, status, payment_method_id } = useSelector(
    (state) => state.payment
  );
  const {
    receipt_id,
    invoice_id,
    amount_paid,
    amount_remaining,
    payment_date,
  } = useSelector((state) => state.receipt);

  const [messageType, setMessageType] = useState('');
  const [message, setMessage] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const stripe = useStripe();
  const elements = useElements();

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
      const update = {
        id: id,
        client_secret: result.paymentIntent.client_secret,
        user_email: result.paymentIntent.receipt_email,
        status: result.paymentIntent.status,
      };

      dispatch(updateInvoiceStatus(update));
      let status = result.paymentIntent.status;

      if (status === 'succeeded') {
        setMessageType('success');

        console.log(result.paymentIntent.payment_method.card);
      }

      if (
        status === 'requires_confirmation' ||
        status === 'requires_action' ||
        status === 'processing' ||
        status === 'requires_capture'
      ) {
        setMessageType('caution');
      } 
      
      if (status === 'canceled') {
        setMessageType('error');
        navigate(`/services/quote`);
      }
    }
  };

  // useEffect(() => {
  //   dispatch(postReceipt());
  // }, [
  //   dispatch,
  //   invoice_id,
  //   payment_method_id,
  //   amount_paid,
  //   amount_remaining,
  //   payment_date,
  // ]);

  useEffect(() => {
    if (receipt_id) {
      navigate(`/services/receipt/${receipt_id}`);
    }
  }, [dispatch, receipt_id]);

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
          <div className="card-number-box">#### #### #### ####</div>
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

      {(status || message) && (
        <div className="status-bar card">
          <span className={`${messageType}`}>{status || message}</span>
        </div>
      )}

      <button type="submit" disabled={!stripe} onClick={handleSubmit}>
        <h3>PAY</h3>
      </button>
    </>
  );
};

export default CardPaymentComponent;
