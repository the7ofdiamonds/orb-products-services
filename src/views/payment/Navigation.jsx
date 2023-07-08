import { useEffect } from 'react';
import {
  Routes,
  Route,
  useNavigate,
  useParams,
  NavLink,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import CardPaymentComponent from './Card.jsx';
import MobileComponent from './Mobile.jsx';

function PaymentNavigationComponent() {
  const { id } = useParams();

  const { stripe_invoice_id } = useSelector((state) => state.invoice);
  const { loading, error } = useSelector((state) => state.payment);
  const { receipt_id } = useSelector((state) => state.receipt);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h2 className="title">PAYMENT</h2>
      <div className="payment-options">
        <NavLink to={`/services/payment/${id}/mobile`}>
          <button className="mobile-btn" id="mobile-btn">
            <h4>MOBILE</h4>
          </button>
        </NavLink>

        <NavLink to={`/services/payment/${id}/card`}>
          <button className="debit-credit-btn" id="debit-credit-btn">
            <h4>CARD</h4>
          </button>
        </NavLink>
      </div>
    </>
  );
}

export default PaymentNavigationComponent;
