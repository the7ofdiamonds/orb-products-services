import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import PaymentNavigationComponent from './payment/Navigation.jsx';

import { getInvoice, getStripeInvoice } from '../controllers/invoiceSlice.js';
import { getPaymentIntent } from '../controllers/paymentSlice.js';
import { getPaymentMethod, getReceipt } from '../controllers/receiptSlice.js';
import { displayStatus, displayStatusType } from '../utils/DisplayStatus.js';

import LoadingComponent from '../loading/LoadingComponent';
import ErrorComponent from '../error/ErrorComponent.jsx';
import StatusBar from '../views/components/StatusBar';

function PaymentComponent() {
  const { id } = useParams();

  const [messageType, setMessageType] = useState('');
  const [message, setMessage] = useState('Choose a payment method');

  const { stripe_invoice_id } = useSelector((state) => state.invoice);
  const { loading, paymentError, status, payment_method_id, payment_intent } =
    useSelector((state) => state.payment);
  const { receipt_id } = useSelector((state) => state.receipt);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getInvoice(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (payment_intent) {
      dispatch(getPaymentIntent());
    }
  }, [dispatch, payment_intent]);

  useEffect(() => {
    if (status) {
      setMessage(displayStatus(status));
      setMessageType(displayStatusType(status));
    }
  }, [status]);

  useEffect(() => {
    if (payment_method_id) {
      dispatch(getPaymentMethod());
    }
  }, [dispatch, payment_method_id]);

  useEffect(() => {
    if (stripe_invoice_id) {
      dispatch(getStripeInvoice(stripe_invoice_id));
    }
  }, [dispatch, stripe_invoice_id]);

  useEffect(() => {
    if (receipt_id) {
      dispatch(getReceipt(receipt_id));
    }
  }, [dispatch, receipt_id]);

  if (receipt_id) {
    window.location.href = `/billing/receipt/${receipt_id}`;
  }

  if (paymentError) {
    return <ErrorComponent error={paymentError} />;
  }

  if (loading) {
    return <LoadingComponent />;
  }

  return (
    <>
      <PaymentNavigationComponent />

      <StatusBar message={message} messageType={messageType} />

      {receipt_id && status == 'succeeded' && (
        <button onClick={handleClick}>
          <h3>RECEIPT</h3>
        </button>
      )}
    </>
  );
}

export default PaymentComponent;
