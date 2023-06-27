import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCalendarEvents } from '../controllers/scheduleSlice.js';
import { createPaymentIntent } from '../controllers/paymentSlice.js';
import { postInvoice } from '../controllers/invoiceSlice.js';

function ScheduleComponent() {
  const { loading, events, error } = useSelector((state) => state.schedule);
  const { invoice_id, selections, subtotal, tax, grand_total } = useSelector(
    (state) => state.invoice
  );
  const { payment_intent_id } = useSelector((state) => state.payment);

  const [email, setEmail] = useState('');
  const [availableTimes, setAvailableTimes] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [name, setName] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [phone, setPhone] = useState('');

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
  }, [selectedDate]);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleDateChange = (event) => {
    getAvailableTimes();
    const date = new Date(event.target.value).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    setSelectedDate(date);
  };

  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleStreetAddressChange = (event) => {
    setStreetAddress(event.target.value);
  };

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handleStateChange = (event) => {
    setState(event.target.value);
  };

  const handleZipcodeChange = (event) => {
    setZipcode(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };

  const handleClick = async () => {
    const invoiceData = {
      email: email,
      start_date: selectedDate,
      start_time: selectedTime,
      name: name,
      street_address: streetAddress,
      city: city,
      state: state,
      zipcode: zipcode,
      phone: phone,
      selections: selections,
      subtotal: subtotal,
      tax: tax,
      grand_total: grand_total,
    };

    try {
      dispatch(postInvoice(invoiceData));
    } catch (error) {
      console.log('Error posting invoice:', error.message);
    }
  };

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
                    onChange={handleDateChange}>
                    {events ? (
                      events.map((event, index) => (
                        <option
                          key={event.id}
                          value={event.start.dateTime}
                          name={index}>
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
