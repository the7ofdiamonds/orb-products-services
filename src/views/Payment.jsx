import { useEffect } from 'react';
import {
  NavLink,
  Routes,
  Route,
  useNavigate,
  useParams,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import CardPaymentComponent from './payment/Card.jsx';
import MobileComponent from './payment/Mobile.jsx';

import { finalizeInvoice } from '../controllers/invoiceSlice.js';

function PaymentComponent() {
  const { id } = useParams();

  const { stripe_invoice_id } = useSelector((state) => state.invoice);
  const { loading, error } = useSelector((state) => state.payment);
  const { receipt_id } = useSelector((state) => state.receipt);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (stripe_invoice_id) {
      dispatch(finalizeInvoice(stripe_invoice_id));
    }
  }, [dispatch, stripe_invoice_id]);

  useEffect(() => {
    if (receipt_id > 0) {
      navigate(`/receipt/${receipt_id}`);
    }
  }, [receipt_id]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h2 className="title">PAYMENT</h2>
      <div className="payment" id="payment">
        <div className="payment-options">
          <NavLink to="mobile">
            <button className="mobile-btn" id="mobile-btn">
              <h4>MOBILE</h4>
            </button>
          </NavLink>

          <NavLink to="card">
            <button className="debit-credit-btn" id="debit-credit-btn">
              <h4>CARD</h4>
            </button>
          </NavLink>
        </div>

        <div className="payment-card">
          <Routes>
            <Route
              path="services/payment/:id/mobile"
              element={<MobileComponent />}
            />
            <Route path="/:id/card" element={<CardPaymentComponent />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default PaymentComponent;
