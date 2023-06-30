import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCalendarEvents } from '../controllers/scheduleSlice.js';
import {
  updateEmail,
  updateDate,
  updateTime,
  updateName,
  updateStreetAddress,
  updateCity,
  updateState,
  updateZipcode,
  updatePhone,
  createInvoice,
  postInvoice,
} from '../controllers/invoiceSlice.js';
import { addClient } from '../controllers/clientSlice.js';
import { createCustomer } from '../controllers/customerSlice.js';

function ScheduleComponent() {
  const { loading, events, error } = useSelector((state) => state.schedule);
  const { client_id } = useSelector((state) => state.client);
  const { customer_id } = useSelector((state) => state.customer);
  const {
    // client_id,
    // customer_id,
    stripe_invoice_id,
    invoice_id,
    selections,
    subtotal,
    tax,
    grand_total,
  } = useSelector((state) => state.invoice);
  const { payment_intent_id } = useSelector((state) => state.payment);

  const [selectedIndex, setSelectedIndex] = useState('');
  const [availableTimes, setAvailableTimes] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const dateSelectRef = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchCalendarEvents());
  }, []);

  const getAvailableTimes = () => {
    const hours = [];

    setAvailableTimes([]);

    const selectedIndex = dateSelectRef.current.selectedIndex;
    if (selectedIndex >= 0) {
      const selectedDate = events[selectedIndex];
      const startDateTime = selectedDate.start.dateTime;
      const startTime = startDateTime.split('T')[1];
      const endDateTime = selectedDate.end.dateTime;
      const endTime = endDateTime.split('T')[1];
      const startHour = parseInt(startTime, 10);
      const endHour = parseInt(endTime, 10);

      for (let i = startHour; i <= endHour; i++) {
        hours.push(i);
      }

      const newAvailableTimes = hours.map((hr) => {
        const time = new Date(0, 0, 0, hr, 0, 0, 0).toLocaleTimeString(
          'en-US',
          {
            hour12: true,
            hour: '2-digit',
            minute: '2-digit',
          }
        );

        return { label: time, value: time };
      });

      setAvailableTimes(newAvailableTimes);
    }
  };

  useEffect(() => {
    getAvailableTimes();
  }, [selectedIndex]);

  const handleEmailChange = (event) => {
    dispatch(updateEmail(event.target.value));
  };

  const handleDateChange = (event) => {
    getAvailableTimes();
    const date = new Date(event.target.value).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    dispatch(updateDate(date));
  };

  const handleTimeChange = (event) => {
    dispatch(updateTime(event.target.value));
  };

  const handleNameChange = (event) => {
    dispatch(updateName(event.target.value));
  };

  const handleStreetAddressChange = (event) => {
    dispatch(updateStreetAddress(event.target.value));
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

  const handlePhoneChange = (event) => {
    dispatch(updatePhone(event.target.value));
  };

  const client_data = {
    username: 'client2',
    password: 'password',
    email: 'jamel.c.lyons@outlook.com',
  };

  const handleClick = async () => {
    if (client_data) {
      try {
        dispatch(addClient(client_data));
      } catch (error) {
        console.log('Error creating client:', error.message);
      }
    }
  };

  useEffect(() => {
    if (client_id) {
      dispatch(createCustomer());
    }
  }, [dispatch, client_id]);

  console.log(selections)
  useEffect(() => {
    if (customer_id) {
      dispatch(createInvoice({customer_id: customer_id, selections: selections}));
    }
  }, [dispatch, customer_id]);

  useEffect(() => {
    if (stripe_invoice_id) {
      dispatch(postInvoice());
    }
  }, [dispatch, stripe_invoice_id]);

  useEffect(() => {
    if (invoice_id) {
      navigate(`/services/invoice/${invoice_id}`);
    }
  }, [dispatch, invoice_id]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h2 className="title">SCHEDULE</h2>
      <div className="schedule" id="schedule">
        <form
          className="schedule-card card"
          action=""
          method="POST"
          id="schedule_form">
          <table>
            <thead></thead>
            <tbody>
              <tr>
                <td>
                  <input
                    className="input schedule"
                    name="email"
                    id="schedule_email"
                    placeholder="Email"
                    onChange={handleEmailChange}
                  />
                </td>
                <td>
                  <select
                    type="text"
                    name="date"
                    id="date_select"
                    ref={dateSelectRef}
                    onChange={handleDateChange}
                    defaultValue={'Choose a date'}>
                    {events ? (
                      events.map((event, index) => (
                        <option
                          key={event.id}
                          value={event.start.dateTime}
                          name={index + 1}>
                          {new Date(event.start.dateTime).toLocaleDateString(
                            undefined,
                            {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            }
                          )}
                        </option>
                      ))
                    ) : (
                      <option>Dates Unavailable</option>
                    )}
                  </select>
                </td>
                <td>
                  <select
                    type="time"
                    name="time"
                    id="time_select"
                    value={selectedTime}
                    onChange={handleTimeChange}>
                    {availableTimes ? (
                      availableTimes.map((time) => (
                        <option key={time.label} name={time.value}>
                          {time.label}
                        </option>
                      ))
                    ) : (
                      <option>Time Unavailable</option>
                    )}
                  </select>
                </td>
              </tr>
              <tr>
                <td colSpan={2}>
                  <input
                    className="input"
                    name="name"
                    id="name"
                    placeholder="Name and/or Company Name"
                    onChange={handleNameChange}
                  />
                </td>
              </tr>
              <tr>
                <td colSpan={2}>
                  <input
                    className="input"
                    name="street"
                    id="bill_to_street"
                    placeholder="Street Address"
                    onChange={handleStreetAddressChange}
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
              <tr>
                <td>
                  <input
                    className="input"
                    name="phone"
                    type="tel"
                    id="telephone"
                    placeholder="Telephone"
                    onChange={handlePhoneChange}
                  />
                </td>
              </tr>
            </tbody>
            <tfoot></tfoot>
          </table>
        </form>

        <button onClick={handleClick}>
          <h3>INVOICE</h3>
        </button>
      </div>
    </>
  );
}

export default ScheduleComponent;
