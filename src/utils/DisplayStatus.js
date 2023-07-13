export const displayStatus = (status) => {

  if(status === "requires_payment_method"){
    return 'Choose a payment method'
  }

  if (status === 'succeeded') {
    return 'Your transaction was successful. Thank you. ';
  }

  if (status === 'processing') {
    return `This transaction is currently processing you may revisit this page at a later time for an update and a confirmation email will be sent.`;
  }

  if (
    status === 'requires_confirmation' ||
    status === 'requires_action' ||
    status === 'requires_capture'
  ) {
  }

  if (status === 'canceled') {
    return 'This transaction has been canceled';
  }
};

export const displayStatusType = (status) => {
  if (status === 'succeeded') {
    return 'success';
  }

  if (
    status === 'processing' ||
    status === 'requires_confirmation' ||
    status === 'requires_action' ||
    status === 'requires_capture'
  ) {
    return 'caution';
  }

  if (status === 'canceled') {
    return 'error';
  }
};
