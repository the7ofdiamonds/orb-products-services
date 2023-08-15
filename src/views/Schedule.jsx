import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { getClient } from '../controllers/clientSlice';
import {
  fetchCalendarEvents,
  updateDate,
  updateTime,
  updateDueDate,
  updateSummary,
  updateEvent,
  sendInvites,
  updateDescription,
  updateAttendees,
} from '../controllers/scheduleSlice.js';
import { getAvailableServices } from '../controllers/servicesSlice';
import { getClientQuotes } from '../controllers/quoteSlice';
import { getClientInvoices } from '../controllers/invoiceSlice';
import { getClientReceipts } from '../controllers/receiptSlice';

function ScheduleComponent() {
  const { id } = useParams();

  const { user_email, client_id, stripe_customer_id } = useSelector(
    (state) => state.client
  );
  const {
    loading,
    scheduleError,
    events,
    start_date,
    start_time,
    event_id,
    event_date_time,
    summary,
    description,
    attendees,
  } = useSelector((state) => state.schedule);
  const { availableServices } = useSelector((state) => state.services);
  const { quotes } = useSelector((state) => state.quote);
  const { invoices } = useSelector((state) => state.invoice);
  const { receipts } = useSelector((state) => state.receipt);

  const [availableDates, setAvailableDates] = useState('');
  const [availableTimes, setAvailableTimes] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedSummary, setSelectedSummary] = useState('');
  const [selectedDescription, setSelectedDescription] = useState('');
  const [selectedAttendees, setSelectedAttendees] = useState([user_email]);
  const [messageType, setMessageType] = useState('info');
  const [message, setMessage] = useState('Choose a date and time to start');

  const dateSelectRef = useRef(null);
  const timeSelectRef = useRef(null);
  const summarySelectRef = useRef(null);
  const descriptionSelectRef = useRef(null);
  const attendeesSelectRef = useRef(null);

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

  useEffect(() => {
    if (scheduleError) {
      setMessageType('error');
      setMessage(scheduleError);
    }
  }, [messageType, message]);

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

    if (dateSelectRef.current) {
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
    summarySelectRef.current = document.getElementById('summary_select');
    descriptionSelectRef.current =
      document.getElementById('description_select');
    attendeesSelectRef.current = document.getElementById('description_select');

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

  // Summary
  useEffect(() => {
    if (selectedTime) {
      dispatch(getAvailableServices());
    }
  }, [selectedTime, dispatch]);

  useEffect(() => {
    if (availableServices && availableServices.length > 0) {
      setSelectedSummary(availableServices[0].description);
      dispatch(updateSummary(availableServices[0].description));
    }
  }, [availableServices, dispatch]);

  const handleSummaryChange = (event) => {
    if (summarySelectRef.current) {
      setSelectedSummary(event.target.value);
      dispatch(updateSummary(event.target.value));
    }
  };

  // Description
  useEffect(() => {
    if (summary && stripe_customer_id) {
      dispatch(getClientReceipts())
        .then(() => {
          dispatch(getClientInvoices());
        })
        .then(() => {
          dispatch(getClientQuotes());
        });
    }
  }, [summary, stripe_customer_id, dispatch]);

  useEffect(() => {
    if (
      summary &&
      descriptionSelectRef.current &&
      descriptionSelectRef.current.options.length > 0
    ) {
      setSelectedDescription(descriptionSelectRef.current.options[0].value);
      dispatch(
        updateDescription(descriptionSelectRef.current.options[0].value)
      );
    }
  }, [summary, dispatch]);

  const handleDescriptionChange = (event) => {
    if (descriptionSelectRef.current) {
      setSelectedDescription(event.target.value);
      dispatch(updateDescription(event.target.value));
    }
  };

  // Attendees
  useEffect(() => {
    if (description !== '' && user_email) {
      dispatch(updateAttendees(selectedAttendees));
    }
  }, [description, dispatch]);

  const handleAttendeeChange = (event, index) => {
    const updatedAttendees = [...selectedAttendees];
    updatedAttendees[index] = event.target.value;
    setSelectedAttendees(updatedAttendees);
  };

  const handleAddAttendee = () => {
    setSelectedAttendees([...selectedAttendees]);
  };

  const handleRemoveAttendee = (index) => {
    const updatedAttendees = selectedAttendees.filter((_, i) => i !== index);
    setSelectedAttendees(updatedAttendees);
  };

  const handleClick = () => {
    if (event_date_time) {
      dispatch(sendInvites(id));
    }
  };

  // useEffect(() => {
  //   if (event_id) {
  //     window.location.href = '/dashboard';
  //   }
  // }, [event_id]);

  if (scheduleError) {
    return (
      <div className="status-bar card error">
        <span>{scheduleError}</span>
      </div>
    );
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div class="office-hours-card card">
        <table>
          <thead>
            <th>SUN</th>
            <th>MON</th>
            <th>TUE</th>
            <th>WED</th>
            <th>THU</th>
            <th>FRI</th>
            <th>SAT</th>
          </thead>
          <tr>
            <td>1PM - 5PM</td>
            <td>9AM - 5PM</td>
            <td>9AM - 5PM</td>
            <td>9AM - 5PM</td>
            <td>9AM - 5PM</td>
            <td>8AM - 4PM</td>
            <td>CLOSED</td>
          </tr>
        </table>
      </div>

      <div className="schedule" id="schedule">
        <div className="schedule-select">
          {availableDates && availableDates.length > 0 ? (
            <div className="date-select card">
              <label htmlFor="date">Choose a Date</label>
              <select
                type="text"
                name="date"
                id="date_select"
                ref={dateSelectRef}
                onChange={handleDateChange}
                defaultValue={selectedDate}
                min={new Date().toISOString().split('T')[0]}>
                {availableDates.map((date, index) => (
                  <option key={index} value={date}>
                    {date}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            ''
          )}

          {availableTimes && availableTimes.length > 0 ? (
            <div className="time-select card">
              <label htmlFor="time">Choose a Time</label>
              <select
                type="time"
                name="time"
                id="time_select"
                ref={timeSelectRef}
                defaultValue={selectedTime}
                onChange={handleTimeChange}>
                {availableTimes.map((time, index) => (
                  <option key={index} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            ''
          )}
        </div>
      </div>

      {availableServices && availableServices.length > 0 ? (
        <div className="summary-select card">
          <label htmlFor="summary">About</label>
          <select
            type="text"
            name="summary"
            id="summary_select"
            ref={summarySelectRef}
            onChange={handleSummaryChange}
            defaultValue={selectedSummary}>
            {availableServices.map((service, index) => (
              <option key={index} value={service.description}>
                {service.description}
              </option>
            ))}
          </select>
        </div>
      ) : (
        ''
      )}

      {(receipts && receipts.length > 0) ||
      (invoices && invoices.length > 0) ||
      (quotes && quotes.length > 0) ? (
        <div className="description-select card">
          <label htmlFor="description">Details</label>
          <select
            type="text"
            name="description"
            id="description_select"
            ref={descriptionSelectRef}
            onChange={handleDescriptionChange}
            defaultValue={selectedDescription}>
            {receipts.map((receipt, index) => (
              <option key={index} value={`Receipt#${receipt.id}`}>
                Receipt#{receipt.id}
              </option>
            ))}
            {invoices.map((invoice, index) => (
              <option key={index} value={`Invoice#${invoice.id}`}>
                Invoice#{invoice.id}
              </option>
            ))}
            {quotes.map((quote, index) => (
              <option key={index} value={`Quote#${quote.id}`}>
                Quote#{quote.id}
              </option>
            ))}
          </select>
        </div>
      ) : (
        ''
      )}

      {attendees && attendees.length > 0 ? (
        <div className="attendees-select card">
          <label htmlFor="attendees">Attendees</label>
          {attendees.map((attendee, index) => (
            <div className="attendee">
              <h4 key={index}>{attendee}</h4>
              <button onClick={handleAddAttendee}>
                <h4>+</h4>
              </button>
            </div>
          ))}
        </div>
      ) : (
        ''
      )}

      <div className="additional-attendee card" id='additional_attendee'>
        <label htmlFor="attendees">Additional Attendee</label>
        <div className="attendee">
          <input type="email" />
          <button className="remove-attendee" onClick={handleRemoveAttendee}>
            <h4>-</h4>
          </button>
          <button className="add-attendee" onClick={handleAttendeeChange}>
            <h4>+</h4>
          </button>
        </div>
      </div>

      {message && (
        <div className={`status-bar card ${messageType}`}>
          <span>{message}</span>
        </div>
      )}

      <button onClick={handleClick}>
        <h3>CONFIRM</h3>
      </button>
    </>
  );
}

export default ScheduleComponent;
