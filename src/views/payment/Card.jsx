import React from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useSelector } from 'react-redux';

const CardPaymentComponent = () => {
const {client_secret} = useSelector((state) => state.payment)

  const stripe = useStripe();
  const elements = useElements();

  const appearance = {
    style: {
      base: {
        boxShadow: 'inset 0.25em 0.25em 0.25em rgba(0, 0, 0, 0.5)',
      },
    },
  };

  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const result = await stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: 'Jenny Rosen',
        },
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
      <div className="debit-credit-container">
        <div className="debit-credit-card card">
          <div className="front">
            <div className="image">
              <img src="" alt="" />
              <img src="" alt="" />
            </div>

            <div className="card-number-box">#### #### #### ####</div>

            <div className="flexbox">
              <div className="box">
                <div className="card-holder-name">Card Holder</div>
              </div>

              <div className="box">
                <span>VALID THRU</span>
                <div className="expiration">
                  <span className="exp-month">Month</span> /
                  <span className="exp-year">Year</span>
                </div>
              </div>
            </div>
          </div>

          <div className="back">
            <div className="stripe"></div>

            <div className="box">
              <span>cvv</span>
              <div className="cvv-box"></div>
              <img src="" alt="" />
            </div>
          </div>
        </div>

        <form className="stripe-card card" onSubmit={handleSubmit}>
          <CardElement style={appearance} />
          <button disabled={!stripe}>
            <h3>PAY</h3>
          </button>
        </form>
      </div>
    </>
  );
};

export default CardPaymentComponent;
