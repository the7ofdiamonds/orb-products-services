import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { getClient, addClient } from '../controllers/clientSlice';
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
  getStripeCustomer,
  updateStripeCustomer,
} from '../controllers/customerSlice.js';

import LoadingComponent from '../loading/LoadingComponent';
import StatusBar from './components/StatusBar';

function ClientComponent() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [messageType, setMessageType] = useState('info');
  const [message, setMessage] = useState(
    'To receive a quote, please fill out the form above with the required information.'
  );

  const {
    user_email,
    first_name,
    last_name,
    stripe_customer_id,
  } = useSelector((state) => state.client);
  const {
    customerLoading,
    company_name,
    tax_id,
    address_line_1,
    address_line_2,
    city,
    state,
    zipcode,
    phone,
  } = useSelector((state) => state.customer);

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
      dispatch(getClient(user_email)).then((response) => {
        if (response.error !== undefined) {
          console.error(response.error.message);
          setMessageType('error');
          setMessage(response.error.message);
        } else {
          dispatch(getStripeCustomer()).then((response) => {
            if (response.error !== undefined) {
              console.error(response.error.message);
              setMessageType('error');
              setMessage(response.error.message);
            }
          });
        }
      });
    }
  }, [user_email, dispatch]);

  useEffect(() => {
    if (address_line_1 && city && state && zipcode) {
      setIsFormCompleted(true);
    }
  }, [first_name, last_name, address_line_1, city, state, zipcode]);

  const handleClick = async () => {
    if (first_name === '') {
      setMessage('Please provide a first name.');
      setMessageType('error');
    } else if (last_name === '') {
      setMessage('Please provide last name.');
      setMessageType('error');
    } else if (address_line_1 === '') {
      setMessage('Please provide an address.');
      setMessageType('error');
    } else if (city === '') {
      setMessage('Please provide the city.');
      setMessageType('error');
    } else if (state === '') {
      setMessage('Please provide the state.');
      setMessageType('error');
    } else if (zipcode === '') {
      setMessage('Please provide zipcode.');
      setMessageType('error');
    } else if (
      (isFomCompleted && stripe_customer_id === '') ||
      stripe_customer_id === undefined
    ) {
      dispatch(addClient()).then((response) => {
        if (response.error === undefined) {
          window.location.href = '/client/selections';
        } else {
          console.error(response.error.message);
          setMessageType('error');
          setMessage(response.error.message);
        }
      });
    } else if (stripe_customer_id) {
      dispatch(updateStripeCustomer()).then((response) => {
        if (response.error === undefined) {
          window.location.href = '/client/selections';
        } else {
          console.error(response.error.message);
          setMessageType('error');
          setMessage(response.error.message);
        }
      });
    }
  };

  if (customerLoading) {
    return <LoadingComponent />;
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
                    value={company_name}
                  />
                </td>
                <td>
                  <input
                    className="input"
                    name="tax_id"
                    id="tax_id"
                    placeholder="Tax ID"
                    onChange={handleTaxIDChange}
                    value={tax_id}
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
                    value={first_name}
                  />
                </td>
                <td>
                  <input
                    className="input"
                    name="last_name"
                    id="last_name"
                    placeholder="Last Name"
                    onChange={handleLastNameChange}
                    value={last_name}
                  />
                </td>
                <td>
                  <input
                    className="input"
                    name="phone"
                    type="tel"
                    placeholder="Phone"
                    onChange={handlePhoneChange}
                    value={phone}
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
                    value={address_line_1}
                  />
                </td>
                <td>
                  <input
                    className="input"
                    name="address_line_2"
                    id="bill_to_street2"
                    placeholder="Suite #"
                    onChange={handleAddressChange2}
                    value={address_line_2}
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
                    value={city}
                  />
                </td>
                <td>
                  <input
                    className="input"
                    name="state"
                    id="bill_to_state"
                    placeholder="State"
                    onChange={handleStateChange}
                    value={state}
                  />
                </td>
                <td>
                  <input
                    className="input"
                    name="zipcode"
                    id="bill_to_zipcode"
                    placeholder="Zipcode"
                    onChange={handleZipcodeChange}
                    value={zipcode}
                  />
                </td>
              </tr>
            </tbody>
            <tfoot></tfoot>
          </table>
        </form>
      </div>

      <StatusBar message={message} messageType={messageType} />

      <button id="selections_button" onClick={handleClick}>
        <h3>selections</h3>
      </button>
    </>
  );
}

export default ClientComponent;
