import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { getClient } from '../controllers/clientSlice';
import {
  fetchCalendarEvents,
  updateDate,
  updateTime,
  updateDueDate,
  updateEvent,
} from '../controllers/scheduleSlice.js';
import { createInvoice } from '../controllers/invoiceSlice.js';

function ScheduleComponent() {
  const { user_email, client_id, stripe_customer_id } = useSelector(
    (state) => state.client
  );
  const { total } = useSelector((state) => state.quote);
  const { loading, error, events, start_date, start_time } = useSelector(
    (state) => state.schedule
  );
  const { invoice_id } = useSelector((state) => state.invoice);

  const [availableDates, setAvailableDates] = useState('');
  const [availableTimes, setAvailableTimes] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const dateSelectRef = useRef(null);
  const timeSelectRef = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getClient());
  }, [user_email, dispatch]);

  useEffect(() => {
    if (client_id && stripe_customer_id) {
      dispatch(fetchCalendarEvents());
    }
  }, [client_id, stripe_customer_id, dispatch]);

  const getEvents = () => {
    const datesAvail = events.map((event) => {
      const dateTime = event.start;
      const date = dateTime.split('T')[0];
      return new Date(date).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    });
    setAvailableDates(datesAvail);
    setSelectedDate(datesAvail[0]);

    const selectedIndex = dateSelectRef.current.selectedIndex;

    if (selectedIndex >= 0) {
      const timesAvail = events.map((event) => {
        const dateTime = event.start;
        const time = dateTime.split('T')[1];
        const start = time.split('-')[0];
        const endTime = time.split('-')[1];
        const startHour = parseInt(start, 10);
        const endHour =
          parseInt(endTime, 10) < 12
            ? parseInt(endTime, 10) + 12
            : parseInt(endTime, 10);

        const hours = [];

        for (let i = startHour; i <= endHour; i++) {
          hours.push(i);
        }

        return hours.map((hr) => {
          return new Date(0, 0, 0, hr, 0, 0, 0).toLocaleTimeString('en-US', {
            hour12: true,
            hour: '2-digit',
            minute: '2-digit',
          });
        });
      });

      setAvailableTimes(timesAvail[selectedIndex]);
    }
  };

  useEffect(() => {
    if (events) {
      getEvents();
    }
  }, [events]);

  useEffect(() => {
    dateSelectRef.current = document.getElementById('date_select');
    timeSelectRef.current = document.getElementById('time_select');
    if (availableDates && availableDates.length > 0) {
      setSelectedDate(availableDates[0]);
    }
  }, [availableDates]);

  const handleDateChange = (event) => {
    if (dateSelectRef.current) {
      getEvents();
      setSelectedDate(event.target.value);
      dispatch(updateDate(event.target.value));
      dispatch(updateDueDate());
    }
  };

  const handleTimeChange = (event) => {
    if (timeSelectRef.current) {
      getEvents();
      setSelectedTime(event.target.value);
      dispatch(updateTime(event.target.value));
      dispatch(updateDueDate());
    }
  };

  useEffect(() => {
    if (start_date && start_time) {
      dispatch(updateEvent());
    }
  }, [start_date, start_time, dispatch]);

  const handleClick = () => {
    if (stripe_customer_id && total > 0) {
      dispatch(createInvoice());
    }
  };

  useEffect(() => {
    if (invoice_id) {
      navigate(`/services/invoice/${invoice_id}`);
    }
  }, [navigate, invoice_id]);

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
        <div className="schedule-select">
          <div className="date-select card">
            <label htmlFor="date">Choose a Date</label>
            <select
              type="text"
              name="date"
              id="date_select"
              ref={dateSelectRef}
              onChange={handleDateChange}
              defaultValue={selectedDate}
              min={new Date().toISOString().split('T')[0]} // Disable past dates
            >
              {availableDates ? (
                availableDates.map((date, index) => (
                  <option key={index} value={date}>
                    {date}
                  </option>
                ))
              ) : (
                <option disabled>No Available Dates</option> // Show "No Available Dates" message
              )}
            </select>
          </div>
          <div className="time-select card">
            <label htmlFor="time">Choose a Time</label>
            <select
              type="time"
              name="time"
              id="time_select"
              ref={timeSelectRef}
              defaultValue={selectedTime}
              onChange={handleTimeChange}>
              {availableTimes && availableTimes.length > 0 ? (
                availableTimes.map((time, index) => (
                  <option key={index} value={time}>
                    {time}
                  </option>
                ))
              ) : (
                <option disabled>No Available Times</option>
              )}
            </select>
          </div>
        </div>
      </div>

      <button onClick={handleClick}>
        <h3>CONFIRM</h3>
      </button>
    </>
  );
}

export default ScheduleComponent;
