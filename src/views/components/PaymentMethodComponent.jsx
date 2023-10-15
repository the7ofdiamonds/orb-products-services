import React from 'react';

function PaymentMethodComponent(props) {
  const { payment_method } = props;

  let paymentMethod = 'No Payment Method Provided';

  if (payment_method) {
    const paymentType = payment_method.type;
    const paymentCard = payment_method.card;
    const paymentFundingType = paymentCard.funding;
    const paymentBrand = paymentCard.brand;
    const country = paymentCard.country;
    const last4 = paymentCard.last4;
    const wallet = payment_method.wallet;

    if (paymentType === 'card') {
      paymentMethod = `${
        paymentFundingType !== 'unknown' ? paymentFundingType : ''
      } ${paymentType} ${country} ${paymentBrand} ${last4}`;
    } else if (paymentType === 'wallet' && wallet !== null) {
      paymentMethod = wallet;
    } else {
      paymentMethod = paymentType;
    }

    if (payment_method.card_present) {
      const cardPresent = payment_method.card_present;
      const cardPresentFunding = cardPresent.card_present;
      const cardPresentBrand = cardPresent.brand;
      const cardPresentCountry = cardPresent.country;
      const cardPresentLast4 = cardPresent.last4;

      paymentMethod = `${
        cardPresentFunding !== 'unknown' ? cardPresentFunding : ''
      } ${paymentType} ${cardPresentCountry} ${cardPresentBrand} ${cardPresentLast4}`;
    }
  }
  
  return <h5 className="payment-method">{paymentMethod}</h5>;
}

export default PaymentMethodComponent;
