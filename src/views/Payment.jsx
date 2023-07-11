import { useEffect, useState } from 'react';
import {
  useNavigate,
  useParams,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import PaymentNavigationComponent from './payment/Navigation.jsx';

import { getInvoice, getStripeInvoice } from '../controllers/invoiceSlice.js';
import { getPaymentIntent } from '../controllers/paymentSlice.js';
import { getPaymentMethod } from '../controllers/receiptSlice.js';

function PaymentComponent() {
  const { id } = useParams();

  const {
    user_email,
    stripe_invoice_id,
    payment_intent_id,
  } = useSelector((state) => state.invoice);
  const { loading, error, status, payment_method_id } =
    useSelector((state) => state.payment);
  const { receipt_id } = useSelector((state) => state.receipt);

  const [messageType, setMessageType] = useState('');
  const [message, setMessage] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getInvoice(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (payment_intent_id) {
      dispatch(getPaymentIntent());
    }
  }, [dispatch, payment_intent_id]);

  useEffect(() => {
    if (status === 'succeeded') {
      setMessageType('success');
      setMessage(`Your transaction was successful. Thank you.`);
    } else if (status === 'requires_payment_method') {
      setMessage('Choose a payment method');
    } else if (status === 'processing') {
      setMessageType('caution');
      setMessage(
        `This transaction is currently processing you may revisit this page at a later time for an update and a confirmation will be sent to ${user_email}.`
      );
    } else if (status === 'canceled') {
      setMessageType('error');
      setMessage('This transaction has been canceled');
    }
  }, [dispatch, status, user_email]);

  useEffect(() => {
    if (payment_method_id) {
      dispatch(getPaymentMethod());
    }
  }, [dispatch, payment_method_id]);

  useEffect(() => {
    if (stripe_invoice_id) {
      dispatch(getStripeInvoice());
    }
  }, [dispatch, stripe_invoice_id]);

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

  const handleClick = () => {
    if (receipt_id) {
      navigate(`/services/receipt/${receipt_id}`);
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <PaymentNavigationComponent />
      {message !== '' && (
        <div className="status-bar card">
          <span className={`${messageType}`}>{message}</span>
        </div>
      )}

      {receipt_id && status == 'succeeded' && (
        <button onClick={handleClick}>
          <h3>RECEIPT</h3>
        </button>
      )}
    </>
  );
}

export default PaymentComponent;
