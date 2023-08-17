import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getClient } from '../../controllers/clientSlice';
import { getClientEvents } from '../../controllers/scheduleSlice';

function UserScheduleComponent() {
  const dispatch = useDispatch();

  const { user_email, client_id } = useSelector((state) => state.client);
  const { loading, scheduleError, events } = useSelector(
    (state) => state.schedule
  );

  useEffect(() => {
    if (user_email) {
      dispatch(getClient());
    }
  }, [user_email, dispatch]);

  useEffect(() => {
    if (client_id) {
      dispatch(getClientEvents());
    }
  }, [client_id, dispatch]);

  if (scheduleError) {
    return (
      <>
        <div className="status-bar card error">
          <span>
            <h4>{scheduleError}</h4>
          </span>
        </div>
      </>
    );
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  const now = new Date().getTime();
  let sortedEvents = [];

  if (Array.isArray(events)) {
    sortedEvents = events.slice().sort((a, b) => {
      const timeDiffA = new Date(a.start_date + ' ' + a.start_time) - now;
      const timeDiffB = new Date(b.start_date + ' ' + b.start_time) - now;

      return timeDiffA - timeDiffB;
    });
  }

  return (
    <>
      {Array.isArray(sortedEvents) && sortedEvents.length > 0 ? (
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
              {sortedEvents.map((event) => (
                <tr key={event.id}>
                  <td>{event.id}</td>
                  <td>{event.start_date}</td>
                  <td>{event.start_time}</td>
                </tr>
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
