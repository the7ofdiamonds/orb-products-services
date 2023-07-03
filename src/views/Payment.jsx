import { useEffect } from 'react';
import {
  Routes,
  Route,
  useNavigate,
  useParams,
  NavLink,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import PaymentNavigationComponent from './payment/Navigation.jsx';

function PaymentComponent() {
  const { id } = useParams();

  const { loading, error } = useSelector((state) => state.payment);
  const { receipt_id } = useSelector((state) => state.receipt);

  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      <PaymentNavigationComponent />
    </>
  );
}

export default PaymentComponent;
