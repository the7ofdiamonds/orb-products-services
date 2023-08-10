import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getClient } from '../../controllers/clientSlice';
import { getEvents } from '../../controllers/scheduleSlice';

function UserScheduleComponent() {
  const dispatch = useDispatch();

  const { user_email, client_id } = useSelector((state) => state.client);
  const { loading, error, events } = useSelector((state) => state.schedule);

  useEffect(() => {
    if (user_email) {
      dispatch(getClient());
    }
  }, [user_email, dispatch]);

  useEffect(() => {
    if (client_id) {
      dispatch(getEvents());
    }
  }, [client_id, dispatch]);

  if (error) {
    return (
      <>
        <main className="error">
          <div className="status-bar card">
            <span className="error">
              <h4>There is nothing on your schedule to show at this time</h4>
            </span>
          </div>
        </main>
      </>
    );
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {Array.isArray(events) && events.length > 0 ? (
        <div className="card schedule">
          <table>
            <thead>
              <tr>
                <th>
                  <h4>Event ID</h4>
                </th>
                <th>
                  <h4>Start Date</h4>
                </th>
                <th>
                  <h4>Start Time</h4>
                </th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <>
                  <tr>
                    <td>{event.id}</td>
                    <td>{event.start_date}</td>
                    <td>{event.start_time}</td>
                  </tr>
                </>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        ''
      )}
    </>
  );
}

export default UserScheduleComponent;
