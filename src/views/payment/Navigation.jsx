import { NavLink } from 'react-router-dom';
import {
  useNavigate,
  useParams,
} from 'react-router-dom';

function PaymentNavigationComponent() {
  const { id } = useParams();

  return (
    <>
      <h2 className="title">PAYMENT</h2>
      
      <div className="payment-options">
        <NavLink to={`/billing/payment/mobile/${id}`}>
          <button className="mobile-btn" id="mobile-btn">
            <h3>MOBILE</h3>
          </button>
        </NavLink>

        <NavLink to={`/billing/payment/card/${id}`}>
          <button className="debit-credit-btn" id="debit-credit-btn">
            <h3>CARD</h3>
          </button>
        </NavLink>
      </div>
    </>
  );
}

export default PaymentNavigationComponent;
