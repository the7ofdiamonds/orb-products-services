import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { getClient, addClient } from '../../controllers/clientSlice';
import {
  updatePhone,
  updateCompanyName,
  updateTaxID,
  updateFirstName,
  updateLastName,
  updateAddress,
  updateAddress2,
  updateCity,
  updateState,
  updateZipcode,
} from '../../controllers/customerSlice.js';

function ClientComponent() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [messageType, setMessageType] = useState('');
  const [message, setMessage] = useState(
    'To receive a quote, please fill out the form above with the required information.'
  );

  const { loading, error, user_email, client_id, stripe_customer_id } =
    useSelector((state) => state.client);
  const { first_name, last_name, zipcode } = useSelector(
    (state) => state.customer
  );

  const handleCompanyNameChange = (event) => {
    dispatch(updateCompanyName(event.target.value));
  };

  const handleTaxIDChange = (event) => {
    dispatch(updateTaxID(event.target.value));
  };

  const handleFirstNameChange = (event) => {
    dispatch(updateFirstName(event.target.value));
  };

  const handleLastNameChange = (event) => {
    dispatch(updateLastName(event.target.value));
  };

  const handlePhoneChange = (event) => {
    dispatch(updatePhone(event.target.value));
  };

  const handleAddressChange = (event) => {
    dispatch(updateAddress(event.target.value));
  };

  const handleAddressChange2 = (event) => {
    dispatch(updateAddress2(event.target.value));
  };

  const handleCityChange = (event) => {
    dispatch(updateCity(event.target.value));
  };

  const handleStateChange = (event) => {
    dispatch(updateState(event.target.value));
  };

  const handleZipcodeChange = (event) => {
    dispatch(updateZipcode(event.target.value));
  };

  const [isFomCompleted, setIsFormCompleted] = useState(false);

  useEffect(() => {
    if (user_email) {
      dispatch(getClient(user_email));
    }
  }, [user_email, dispatch]);

  useEffect(() => {
    if (stripe_customer_id) {
      navigate('/services/quote');
    }
  }, [stripe_customer_id, navigate]);

  useEffect(() => {
    if (first_name && last_name && zipcode) {
      setIsFormCompleted(true);
    }
  }, [first_name, last_name, zipcode]);

  useEffect(() => {
    if (isFomCompleted) {
      dispatch(addClient());
    }
  }, [isFomCompleted, dispatch]);

  const handleClick = () => {
    if (first_name === '') {
      setMessage('Please provide a first name.');
      setMessageType('error');
    } else if (last_name === '') {
      setMessage('Please provide last name.');
      setMessageType('error');
    } else if (zipcode === '') {
      setMessage('Please provide zipcode.');
      setMessageType('error');
    } else if (client_id && stripe_customer_id) {
      navigate('/services/quote');
    }
  };

  if (error) {
    return (
      <main className="error">
        <div className="status-bar card">
          <span className="error">
            "We encountered an issue while loading this page. Please try again,
            and if the problem persists, kindly contact the website
            administrators for assistance."
          </span>
        </div>
      </main>
    );
  }

  // Create loading animation
  if (loading) {
    return <main>Loading...</main>;
  }

  return (
    <>
      <h2 className="title">CLIENT DETAILS</h2>
      <div className="client-details card" id="client-details">
        <form>
          <table>
            <thead></thead>
            <tbody>
              <tr>
                <td colSpan={2}>
                  <input
                    className="input"
                    name="company_name"
                    id="company_name"
                    placeholder="Company Name"
                    onChange={handleCompanyNameChange}
                  />
                </td>
                <td>
                  <input
                    className="input"
                    name="tax_id"
                    id="tax_id"
                    placeholder="Tax ID"
                    onChange={handleTaxIDChange}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    className="input"
                    name="first_name"
                    id="first_name"
                    placeholder="First Name"
                    onChange={handleFirstNameChange}
                  />
                </td>
                <td>
                  <input
                    className="input"
                    name="last_name"
                    id="last_name"
                    placeholder="Last Name"
                    onChange={handleLastNameChange}
                  />
                </td>
                <td>
                  <input
                    className="input"
                    name="phone"
                    type="tel"
                    placeholder="Phone"
                    onChange={handlePhoneChange}
                  />
                </td>
              </tr>
              <tr>
                <td colSpan={2}>
                  <input
                    className="input"
                    name="address_line_1"
                    id="bill_to_street"
                    placeholder="Street Address"
                    onChange={handleAddressChange}
                  />
                </td>
                <td>
                  <input
                    className="input"
                    name="address_line_2"
                    id="bill_to_street2"
                    placeholder="Suite #"
                    onChange={handleAddressChange2}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    className="input"
                    name="city"
                    id="bill_to_city"
                    placeholder="City"
                    onChange={handleCityChange}
                  />
                </td>
                <td>
                  <input
                    className="input"
                    name="state"
                    id="bill_to_state"
                    placeholder="State"
                    onChange={handleStateChange}
                  />
                </td>
                <td>
                  <input
                    className="input"
                    name="zipcode"
                    id="bill_to_zipcode"
                    placeholder="Zipcode"
                    onChange={handleZipcodeChange}
                  />
                </td>
              </tr>
            </tbody>
            <tfoot></tfoot>
          </table>
        </form>
      </div>

      {message && (
        <div className="status-bar card">
          <span className={`${messageType}`}>{message}</span>
        </div>
      )}

      <button id="quote_button" onClick={handleClick}>
        <h3>QUOTE</h3>
      </button>
    </>
  );
}

export default ClientComponent;
