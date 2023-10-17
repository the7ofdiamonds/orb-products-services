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
import { FormatCreditNumber } from '../utils/FormatCreditNumber';
import { FormatCurrency } from '../utils/FormatCurrency';

import LoadingComponent from '../loading/LoadingComponent';
import ErrorComponent from '../error/ErrorComponent.jsx';
import StatusBar from '../views/components/StatusBar';

const CardPaymentComponent = () => {
  const { id } = useParams();

  const [messageType, setMessageType] = useState('info');
  const [message, setMessage] = useState(
    'Please enter your card number, expiration date, and the code on the back.'
  );

  const { user_email, first_name, last_name, stripe_customer_id } = useSelector(
    (state) => state.client
  );
  const {
    stripe_invoice_id,
    payment_intent_id,
    status,
    account_country,
    currency,
    amount_due,
    amount_paid,
    remaining_balance,
  } = useSelector((state) => state.invoice);
  const { paymentLoading, paymentError, client_secret } = useSelector(
    (state) => state.payment
  );
  const { receipt_id, payment_method } = useSelector((state) => state.receipt);

  const [cardNumber, setCardNumber] = useState('');
  const [expMonth, setExpMonth] = useState('');
  const [expYear, setExpYear] = useState('');
  const [CVC, setCVC] = useState('');

  const handleCardNumberChange = (e) => {
    setCardNumber(e.target.value);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    if (user_email) {
      dispatch(getClient(user_email)).then((response) => {
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
            }
          });
        }
      });
    }
  }, [user_email, dispatch]);

  useEffect(() => {
    if (stripe_invoice_id) {
      dispatch(getStripeInvoice(stripe_invoice_id));
    }
  }, [dispatch, stripe_invoice_id]);

  useEffect(() => {
    if (payment_intent_id) {
      dispatch(getPaymentIntent(payment_intent_id));
    }
  }, [payment_intent_id, dispatch]);

  useEffect(() => {
    if (payment_method && stripe_invoice_id) {
      dispatch(getStripeInvoice(stripe_invoice_id));
    }
  }, [payment_method, dispatch]);

  useEffect(() => {
    if (payment_method) {
      dispatch(getPaymentMethod(payment_method));
    }
  }, [payment_method, dispatch]);

  useEffect(() => {
    if (payment_method) {
      dispatch(updatePaymentMethod(PaymentMethodGenerator(payment_method)));
    }
  }, [dispatch, payment_method]);

  useEffect(() => {
    if (status === 'paid') {
      dispatch(postReceipt());
    }
  }, [dispatch, status]);

  useEffect(() => {
    const input = document.getElementById('credit-card-input');

    if (input) {
      input.addEventListener(
        'input',
        () =>
          (input.value = FormatCreditNumber(input.value.replaceAll(' ', '')))
      );
    }
  }, [cardNumber]);

  const handleSubmit = () => {
    console.log(cardNumber);
  };

  if (paymentLoading) {
    return <LoadingComponent />;
  }

  if (paymentError) {
    return <ErrorComponent error={paymentError} />;
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
                <span className="exp-month">Month</span>
                <h5>{expMonth}</h5> /<span className="exp-year">Year</span>
                <h5>{expYear}</h5>
              </div>
            </div>
          </div>
        </div>

        <div className="back">
          <div className="box">
            <span>cvv</span>
            <div className="cvv-box">{CVC}</div>
            <img src="" alt="" />
          </div>
        </div>
      </div>

      <form className="payment-card-form">
        <input
          id="credit-card-input"
          type="text"
          size={16}
          maxLength={19}
          placeholder="0000 0000 0000 0000"
          onChange={handleCardNumberChange}
          value={cardNumber}
        />
        <input
          size={2}
          maxLength={2}
          placeholder="Exp Month"
          onChange={(e) => setExpMonth(e.target.value)}
          value={expMonth}
        />
        <input
          size={4}
          maxLength={4}
          placeholder="Exp Year"
          onChange={(e) => setExpYear(e.target.value)}
          value={expYear}
        />
        <input
          size={4}
          maxLength={4}
          placeholder="CVC"
          onChange={(e) => setCVC(e.target.value)}
          value={CVC}
        />
      </form>

      <StatusBar message={message} messageType={messageType} />

      {amount_due ? (
        <h3>Amount: {FormatCurrency(amount_due, account_country, currency)}</h3>
      ) : (
        ''
      )}

      <button type="submit" onClick={handleSubmit}>
        <h3>PAY</h3>
      </button>
    </>
  );
};

export default CardPaymentComponent;
