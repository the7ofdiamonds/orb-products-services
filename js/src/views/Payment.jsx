import { useEffect } from 'react';
import { NavLink, Routes, Route, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CardPaymentComponent from './payment/Card.jsx';
import MobileComponent from './payment/Mobile.jsx';

function PaymentComponent() {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const queryParams = Object.fromEntries(urlSearchParams.entries());
  const invoiceNumber = queryParams['invoice'];

  const { loading, payment_intent, client_secret, error } = useSelector(
    (state) => state.payment
  );
  const { subtotal } = useSelector((state) => state.invoice);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/receipt');
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
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
          <Route path="mobile" element={<MobileComponent />} />
          <Route path="card" element={<CardPaymentComponent />} />
        </Routes>
      </div>
    </div>
  );
}

export default PaymentComponent;
