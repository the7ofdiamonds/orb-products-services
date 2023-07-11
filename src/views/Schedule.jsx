import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { fetchCalendarEvents } from '../controllers/scheduleSlice.js';
import {
  updateDate,
  updateTime,
  updateInvoice,
} from '../controllers/invoiceSlice.js';

function ScheduleComponent() {
  const { loading, error, events } = useSelector((state) => state.schedule);

  const [selectedIndex, setSelectedIndex] = useState('');
  const [availableTimes, setAvailableTimes] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const dateSelectRef = useRef(null);
  const timeSelectRef = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchCalendarEvents());
  }, []);

  const getAvailableTimes = () => {
    const hours = [];
    setAvailableTimes([]);

    const selectedIndex = dateSelectRef.current.selectedIndex;
    if (selectedIndex >= 0 && events && events.length > selectedIndex) {
      const selectedDate = events[selectedIndex];
      const startDateTime = selectedDate.start.dateTime;
      const endDateTime = selectedDate.end.dateTime;

      if (startDateTime && endDateTime) {
        const startTime = startDateTime.split('T')[1];
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
    }
  };

  useEffect(() => {
    getAvailableTimes();
  }, [getAvailableTimes, selectedIndex]);

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
    setSelectedTime(event.target.value);
    dispatch(updateTime(event.target.value));
  };

  const handleClick = async () => {
    if (client_data) {
      try {
        dispatch(updateInvoice(client_data));
      } catch (error) {
        console.log('Error creating client:', error.message);
      }
    }
  };

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
              defaultValue={selectedDate}>
              {events && events.length > 0 ? (
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
          </div>
          <div className="time-select card">
            <label htmlFor="time">Choose a Time</label>
            <select
              type="time"
              name="time"
              id="time_select"
              ref={timeSelectRef}
              value={selectedTime}
              onChange={handleTimeChange}>
              {availableTimes ? (
                availableTimes.map((time) => (
                  <option
                    key={time.value}
                    name={time.value}
                    selected={time.value === selectedTime}>
                    {time.label}
                  </option>
                ))
              ) : (
                <option>Time Unavailable</option>
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
