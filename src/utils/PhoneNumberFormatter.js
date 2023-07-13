const formatPhoneNumber = (phoneNumber) => {
    // Remove all non-digit characters from the phone number
    const cleaned = phoneNumber.replace(/\D/g, '');
  
    // Apply the desired phone number format
    const regex = /^(\d{1})(\d{3})(\d{3})(\d{4})$/;
    const formatted = cleaned.replace(regex, '+$1 ($2) $3-$4');
  
    return formatted;
  };
  
  export default formatPhoneNumber;