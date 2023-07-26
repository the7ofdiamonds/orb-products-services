import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import PaymentNavigationComponent from './Navigation.jsx';

import { getInvoice, getStripeInvoice } from '../../controllers/invoiceSlice.js';
import { getPaymentIntent } from '../../controllers/paymentSlice.js';
import { getPaymentMethod, getReceipt } from '../../controllers/receiptSlice.js';
import { displayStatus, displayStatusType } from '../../utils/DisplayStatus.js';

function PaymentComponent() {
  const { id } = useParams();

  const { stripe_invoice_id } = useSelector(
    (state) => state.invoice
  );
  const { loading, error, status, payment_method_id, payment_intent } = useSelector(
    (state) => state.payment
  );
  const { receipt_id } = useSelector((state) => state.receipt);

  const [messageType, setMessageType] = useState('');
  const [message, setMessage] = useState('Choose a payment method');

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
    navigate(`/services/receipt/${receipt_id}`);
  }

  if (error) {
    return <main>Error: {error}</main>;
  }

  if (loading) {
    return <main>Loading...</main>;
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
