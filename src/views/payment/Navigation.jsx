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
