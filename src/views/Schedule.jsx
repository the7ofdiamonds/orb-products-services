import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { getClient } from '../controllers/clientSlice';
import {
  getAvailableTimes,
  updateDate,
  updateTime,
  updateDueDate,
  updateSummary,
  updateEvent,
  sendInvites,
  updateDescription,
  updateAttendees,
  getOfficeHours,
  getCommunicationPreferences,
  updateCommunicationPreference,
} from '../controllers/scheduleSlice.js';
import { getAvailableServices } from '../controllers/servicesSlice';
import { getClientQuotes } from '../controllers/quoteSlice';
import { getClientInvoices } from '../controllers/invoiceSlice';
import { getClientReceipts } from '../controllers/receiptSlice';

import { formatOfficeHours, datesAvail, timesAvail } from '../utils/Schedule';
import NavigationLoginComponent from './components/NavigationLogin';

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
    office_hours,
    communication_preferences,
  } = useSelector((state) => state.schedule);
  const { availableServices } = useSelector((state) => state.services);
  const { quotes } = useSelector((state) => state.quote);
  const { invoices } = useSelector((state) => state.invoice);
  const { receipts } = useSelector((state) => state.receipt);

  const [officeHours, setOfficeHours] = useState('');
  const [availableDates, setAvailableDates] = useState('');
  const [availableTimes, setAvailableTimes] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedSummary, setSelectedSummary] = useState('');
  const [selectedDescription, setSelectedDescription] = useState('');
  const [selectedCommunicationPreference, setCommunicationPreference] =
    useState('');
  const [selectedAttendees, setSelectedAttendees] = useState([user_email]);
  const [showAdditionalAttendee, setShowAdditionalAttendee] = useState(false);
  const [additionalAttendeeEmail, setAdditionalAttendeeEmail] = useState('');
  const [messageType, setMessageType] = useState('info');
  const [message, setMessage] = useState('Choose a date');

  const dateSelectRef = useRef(null);
  const timeSelectRef = useRef(null);
  const summarySelectRef = useRef(null);
  const descriptionSelectRef = useRef(null);
  const communicationPreferenceSelectRef = useRef(null);
  const attendeesSelectRef = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Office Hours
  useEffect(() => {
    dispatch(getOfficeHours());
  }, [dispatch]);

  useEffect(() => {
    if (office_hours) {
      setOfficeHours(formatOfficeHours(office_hours));
    }
  }, [office_hours]);

  // Client info
  useEffect(() => {
    if (user_email) {
      dispatch(getClient());
    }
  }, [dispatch]);

  useEffect(() => {
    if (!user_email) {
      setMessageType('info');
      setMessage('Login to schedule an appointment');
    }
  }, [user_email]);

  // Events
  useEffect(() => {
    if (client_id && stripe_customer_id) {
      dispatch(getAvailableTimes());
    }
  }, [client_id, stripe_customer_id, dispatch]);

  useEffect(() => {
    if (scheduleError) {
      setMessageType('error');
      setMessage(scheduleError);
    }
  }, [messageType, message]);

  useEffect(() => {
    if (events) {
      setAvailableDates(datesAvail(events));
    }
  }, [events]);

  useEffect(() => {
    dateSelectRef.current = document.getElementById('date_select');
    timeSelectRef.current = document.getElementById('time_select');
    summarySelectRef.current = document.getElementById('summary_select');
    descriptionSelectRef.current =
      document.getElementById('description_select');
    attendeesSelectRef.current = document.getElementById('description_select');
  }, []);

  useEffect(() => {
    if (availableDates && availableDates.length > 0) {
      setSelectedDate(availableDates[0]);
      dispatch(updateDate(availableDates[0]));
    }
  }, [availableDates]);

  useEffect(() => {
    if (selectedDate && dateSelectRef.current) {
      const key = dateSelectRef.current.value;
      setAvailableTimes(timesAvail(events, key));
    }
  }, [selectedDate]);

  useEffect(() => {
    if (availableTimes) {
      setSelectedTime(availableTimes[0]);
      dispatch(updateTime(availableTimes[0]));
    }
  }, [availableTimes]);

  const handleDateChange = (event) => {
    if (dateSelectRef.current) {
      setSelectedDate(event.target.value);
      dispatch(updateDate(event.target.value));
      setMessage('Choose a time');

      if (dateSelectRef.current.value !== undefined) {
        const key = dateSelectRef.current.value;

        timesAvail(events, key);
      } else {
        console.error('selectedIndex is undefined');
      }
    }
  };

  const handleTimeChange = (event) => {
    if (timeSelectRef.current) {
      setSelectedTime(event.target.value);
      dispatch(updateTime(event.target.value));
      // dispatch(updateDueDate());
      setMessage('Choose a topic');
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
    if (summary && stripe_customer_id) {
      dispatch(getCommunicationPreferences());
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

  useEffect(() => {
    if (
      summary &&
      communicationPreferenceSelectRef.current &&
      communicationPreferenceSelectRef.current.options.length > 0
    ) {
      setCommunicationPreference(
        communicationPreferenceSelectRef.current.options[0].value
      );
      dispatch(
        updateCommunicationPreference(
          communicationPreferenceSelectRef.current.options[0].value
        )
      );
    }
  }, [summary, dispatch]);

  const handleDescriptionChange = (event) => {
    if (descriptionSelectRef.current) {
      setSelectedDescription(event.target.value);
      dispatch(updateDescription(event.target.value));
      console.log(selectedDescription);
    }
  };

  const handleCommunicationPreferenceChange = (event) => {
    if (communicationPreferenceSelectRef.current) {
      setCommunicationPreference(event.target.value);
      dispatch(updateCommunicationPreference(event.target.value));
    }
  };

  // Attendees
  useEffect(() => {
    if (summary !== '' && user_email) {
      dispatch(updateAttendees(selectedAttendees));
    }
  }, [summary, dispatch]);

  const handleAttendeeChange = () => {
    if (additionalAttendeeEmail) {
      const updatedAttendees = [user_email, additionalAttendeeEmail];
      setAdditionalAttendeeEmail('');
      dispatch(updateAttendees(updatedAttendees));
    }
  };

  const handleAddAttendee = () => {
    setShowAdditionalAttendee((prevState) => !prevState);
  };

  const handleRemoveAttendee = (index) => {
    const updatedAttendees = selectedAttendees.filter((_, i) => i !== index);
    setSelectedAttendees(updatedAttendees);
    dispatch(updateAttendees(updatedAttendees));
  };

  const handleClick = () => {
    if (event_date_time) {
      dispatch(sendInvites());
    }
  };

  const handleLogin = () => {
    const baseHost = window.location.protocol + '//' + window.location.host;
    window.location.href = `/login/?redirectTo=${baseHost}/schedule/`;
  };

  // useEffect(() => {
  //   if (event_id) {
  //     // window.location.href = '/dashboard';
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
      {officeHours && officeHours.length > 0 ? (
        <div className="office-hours-card card">
          <table>
            <thead>
              <tr>
                <th>SUN</th>
                <th>MON</th>
                <th>TUE</th>
                <th>WED</th>
                <th>THU</th>
                <th>FRI</th>
                <th>SAT</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                {officeHours.map((hours) => (
                  <>
                    <td key={hours.day}>
                      {hours.start && hours.end
                        ? `${hours.start} - ${hours.end}`
                        : 'CLOSED'}
                    </td>
                  </>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        ''
      )}

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

      {communication_preferences && communication_preferences.length > 0 ? (
        <div className="communication-select card">
          <label htmlFor="summary">Preferred Communication Type</label>
          <select
            type="text"
            name="preferred_communication_type"
            id="communication_select"
            ref={communicationPreferenceSelectRef}
            onChange={handleCommunicationPreferenceChange}
            defaultValue={selectedCommunicationPreference}>
            {communication_preferences.map((communication, index) => (
              <option key={index} value={communication.type}>
                {communication.type}
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
              <button
                className="remove-attendee"
                onClick={handleRemoveAttendee}>
                <h4>-</h4>
              </button>
              <button onClick={handleAddAttendee}>
                <h4>+</h4>
              </button>
            </div>
          ))}
        </div>
      ) : (
        ''
      )}

      <div
        className={`additional-attendee card ${
          showAdditionalAttendee ? 'view' : ''
        }`}
        id="additional_attendee">
        <label htmlFor="attendees">Additional Attendee</label>
        <div className="attendee">
          <input
            type="email"
            value={additionalAttendeeEmail}
            onChange={(event) => setAdditionalAttendeeEmail(event.target.value)}
          />
          <button className="add-attendee" onClick={handleAttendeeChange}>
            <h4>+</h4>
          </button>
        </div>
      </div>

      {message ? (
        <div className={`status-bar card ${messageType}`}>
          <span>{message}</span>
        </div>
      ) : (
        ''
      )}

      {user_email ? (
        <button onClick={handleClick}>
          <h3>SCHEDULE</h3>
        </button>
      ) : (
        <NavigationLoginComponent />
      )}
    </>
  );
}

export default ScheduleComponent;
