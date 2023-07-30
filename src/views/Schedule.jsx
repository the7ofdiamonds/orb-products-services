import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import {
  fetchCalendarEvents,
  updateDate,
  updateTime,
  updateDueDate,
  updateEvent,
  sendInvites,
} from '../controllers/scheduleSlice.js';
import { createInvoice } from '../controllers/invoiceSlice.js';

function ScheduleComponent() {
  const { user_email, stripe_customer_id } = useSelector(
    (state) => state.client
  );
  const { total, error } = useSelector((state) => state.quote);
  const { loading, events, event } = useSelector(
    (state) => state.schedule
  );
  const { invoice_id } = useSelector((state) => state.invoice);

  const [availableDates, setAvailableDates] = useState('');
  const [availableTimes, setAvailableTimes] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [formattedDate, setFormattedDate] = useState('');
  const [formattedTime, setFormattedTime] = useState('');

  const dateSelectRef = useRef(null);
  const timeSelectRef = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchCalendarEvents());
  }, [dispatch]);

  const getEvents = () => {
    const datesAvail = events.map((event) => {
      const dateTime = event.start['dateTime'];
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
        const dateTime = event.start['dateTime'];
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
    if (selectedDate) {
      const date = new Date(selectedDate);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');

      setFormattedDate(`${year}-${month}-${day}`);
    }
  }, [selectedDate]);

  useEffect(() => {
    if (selectedTime) {
      const [time, period] = selectedTime.split(' ');
      const [hours, minutes] = time.split(':');

      let formattedHours = parseInt(hours, 10);
      if (period === 'PM' && formattedHours !== 12) {
        formattedHours += 12;
      } else if (period === 'AM' && formattedHours === 12) {
        formattedHours = 0;
      }

      const formattedHoursString = String(formattedHours).padStart(2, '0');
      const formattedMinutesString = String(minutes).padStart(2, '0');

      setFormattedTime(`${formattedHoursString}:${formattedMinutesString}:00`);
    }
  }, [selectedTime]);

  useEffect(() => {
    if (formattedDate && formattedTime) {
      dispatch(
        updateEvent({
          summary: 'Invitation Title',
          description: 'Invitation Description',
          start: {
            dateTime: `${formattedDate}T${formattedTime}`, // Replace with the start date and time
            timeZone: 'America/New_York', // Replace with the appropriate time zone
          },
          end: {
            dateTime: '2023-08-01T11:00:00', // Replace with the end date and time
            timeZone: 'America/New_York', // Replace with the appropriate time zone
          },
          attendees: [
            { email: `${user_email}` }, // Replace with the email addresses of the people you want to invite
            { email: 'jclyonsenterprises@gmail.com' },
          ],
        })
      );
    }
  }, [formattedDate, formattedTime, dispatch]);

  useEffect(() => {
    if (event) {
      dispatch(sendInvites());
    }
  }, [event, dispatch]);

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
