import { React, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import PaymentNavigationComponent from './Navigation';

import { getInvoice } from '../../controllers/invoiceSlice';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const CardPaymentComponent = () => {
  const { id } = useParams();

  const { first_name, last_name, client_secret } = useSelector(
    (state) => state.invoice
  );

  const dispatch = useDispatch();

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    dispatch(getInvoice(id));
  }, []);

  console.log(client_secret);
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('button works');
    if (!stripe || !elements) {
      return;
    }

    const result = await stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (result.error) {
      // Show error to your customer (for example, insufficient funds)
      console.log(result.error.message);
    } else {
      // The payment has been processed!
      if (result.paymentIntent.status === 'succeeded') {
        // Show a success message to your customer
        // There's a risk of the customer closing the window before callback
        // execution. Set up a webhook or plugin to listen for the
        // payment_intent.succeeded event that handles any business critical
        // post-payment actions.
      }
    }
  };

  return (
    <>
      <PaymentNavigationComponent />
      <div className="debit-credit-card card">
        <div className="front">
          <div className="image">
            <img src="" alt="" />
            <img src="" alt="" />
          </div>

          <div className="card-number-box">#### #### #### ####</div>

          <div className="flexbox">
            <div className="box">
              <div className="card-holder-name">
                {first_name} {last_name}
              </div>
            </div>

            <div className="box">
              <span>VALID THRU</span>
              <div className="expiration">
                <span className="exp-month">Month</span> /
                <span className="exp-year">Year</span>
              </div>
            </div>
          </div>

          <div className="back">
            <div className="box">
              <span>cvv</span>
              <div className="cvv-box"></div>
              <img src="" alt="" />
            </div>
          </div>
        </div>
      </div>

      <form className="stripe-card card" onSubmit={handleSubmit}>
        <CardElement />
      </form>

      <button type="submit" disabled={!stripe} onClick={handleSubmit}>
        <h3>PAY</h3>
      </button>
    </>
  );
};

export default CardPaymentComponent;
