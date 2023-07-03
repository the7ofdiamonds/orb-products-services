import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import PaymentNavigationComponent from './Navigation';

import {
  getInvoice,
  updateInvoiceStatus,
} from '../../controllers/invoiceSlice';
import { updateStatus } from '../../controllers/paymentSlice';

import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const CardPaymentComponent = () => {
  const { id } = useParams();

  const { user_email, first_name, last_name, client_secret, status } = useSelector(
    (state) => state.invoice
  );

  const [messageType, setMessageType] = useState('');
  const [message, setMessage] = useState('');

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
      const update = {
        id: id,
        client_secret: client_secret,
        user_email: user_email,
        status: result.paymentIntent.status,
      };

      dispatch(updateInvoiceStatus(update));
    }
  };

  useEffect(() => {
    if (status === 'succeeded') {
      setMessageType('success');
    } else if (
      status === 'requires_payment_method' ||
      status === 'requires_confirmation' ||
      status === 'requires_action' ||
      status === 'processing' ||
      status === 'requires_capture'
    ) {
      setMessageType('caution');
    } else if (status === 'canceled') {
      setMessageType('error');
    }
  }, [status]);

  useEffect(() => {
    if (status === 'succeeded') {
      navigate(`/services/receipt/${id}`);
    }
  }, [status, id]);

  return (
    <>
      <PaymentNavigationComponent />
      <div className="debit-credit-card card">
        <div className="front">
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
          <span className={`${messageType}`}>
            {status || message}
          </span>
        </div>
      )}

      <button type="submit" disabled={!stripe} onClick={handleSubmit}>
        <h3>PAY</h3>
      </button>
    </>
  );
};

export default CardPaymentComponent;
