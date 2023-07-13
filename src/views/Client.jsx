import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import {
  updateEmail,
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
} from '../controllers/clientSlice.js';
import { addClient } from '../controllers/usersSlice.js';
import { createCustomer } from '../controllers/clientSlice.js';
import {
  clientToInvoice,
  updateClientID,
} from '../controllers/invoiceSlice.js';

function ClientComponent() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { client_id } = useSelector((state) => state.users);

  const {
    loading,
    error,
    company_name,
    tax_id,
    first_name,
    last_name,
    user_email,
    phone,
    address_line_1,
    address_line_2,
    city,
    state,
    zipcode,
    country,
    stripe_customer_id,
  } = useSelector((state) => state.client);

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

  const handleEmailChange = (event) => {
    dispatch(updateEmail(event.target.value));
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

  // Create Login & Signup
  const client_data = {
    user_login: 'client2',
    user_pass: 'password',
    user_email: 'jamel.c.lyons@outlook.com',
    first_name: first_name,
    last_name: last_name,
    client_id: 17,
  };

  // useEffect(() => {
  //   if (client_data) {
  //     try {
  //       dispatch(addClient(client_data));
  //     } catch (error) {
  //       console.log('Error creating client:', error.message);
  //     }
  //   }
  // }, [dispatch, client_data]);

  useEffect(() => {
    if (client_id) {
      dispatch(updateClientID(client_id));
    }
  }, [client_id, dispatch]);

  const customer_data = {
    company_name: company_name,
    tax_id: tax_id,
    first_name: first_name,
    last_name: last_name,
    user_email: user_email,
    phone: phone,
    address_line_1: address_line_1,
    address_line_2: address_line_2,
    city: city,
    state: state,
    zipcode: zipcode,
    country: country,
    stripe_customer_id: stripe_customer_id,
  };

  const isFormCompleted =
    first_name &&
    last_name &&
    user_email &&
    phone &&
    address_line_1 &&
    city &&
    state &&
    zipcode;

  const handleClick = () => {
    if (isFormCompleted && client_id) {
      dispatch(createCustomer(customer_data));
    }
  };

  useEffect(() => {
    if (isFormCompleted && stripe_customer_id) {
      dispatch(clientToInvoice(customer_data));
      navigate('/services/quote');
    }
  }, [isFormCompleted, stripe_customer_id, dispatch, customer_data, navigate]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
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
                    className="input schedule"
                    name="user_email"
                    type="email"
                    placeholder="Email"
                    onChange={handleEmailChange}
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
              </tr>
              <tr>
                <td colSpan={2}>
                  <input
                    className="input"
                    name="address_line_1"
                    id="bill_to_street"
                    placeholder="Address"
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

      <button id="quote_button" onClick={handleClick}>
        <h3>QUOTE</h3>
      </button>
    </>
  );
}

export default ClientComponent;
