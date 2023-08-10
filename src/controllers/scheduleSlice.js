import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  events: [],
  error: null,
  event_id: 0,
  invoice_id: '',
  start_date_time: '',
  end_date_time: '',
  attendees: '',
  calendar_link: '',
  start_date: '',
  start_time: '',
  due_date: '',
  event_date_time: '',
  event: ''
};

export const fetchCalendarEvents = createAsyncThunk(
  'schedule/fetchCalendarEvents',
  async () => {
    const response = await axios.get('/wp-json/orb/v1/office-hours');
    return response.data;
  });

function combineDateTimeToTimestamp(dateString, timeString) {
  const date = new Date(dateString);
  const [hours, minutes] = timeString.split(':');
  date.setHours(parseInt(hours, 10));
  date.setMinutes(parseInt(minutes, 10));
  return (date.getTime()) / 1000;
}

function formattedDate(start_date) {
  const date = new Date(start_date);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

function formattedTime(start_time) {
  const [time, period] = start_time.split(' ');
  const [hours, minutes] = time.split(':');

  let formattedHours = parseInt(hours, 10);
  if (period === 'PM' && formattedHours !== 12) {
    formattedHours += 12;
  } else if (period === 'AM' && formattedHours === 12) {
    formattedHours = 0;
  }

  const formattedHoursString = String(formattedHours).padStart(2, '0');
  const formattedMinutesString = String(minutes).padStart(2, '0');

  return `${formattedHoursString}:${formattedMinutesString}:00`;
}

function combineDateTime(start_date, start_time) {
  const date = formattedDate(start_date);
  const time = formattedTime(start_time);

  return `${date}T${time}`
}

export const sendInvites = createAsyncThunk('schedule/sendInvites',
  async (invoice_id, { getState }) => {
    const { client_id } = getState().client;
    const { start_date, start_time, event_date_time } = getState().schedule;

    const eventData = {
      client_id: client_id,
      start: event_date_time,
      start_date: start_date,
      start_time: start_time,
      description: invoice_id,
      attendees: ['jamel.c.lyons@gmail.com'],
    };
    
    try {
      const response = await axios.post('/wp-json/orb/v1/schedule/events/invite', eventData)
      return response.data;
    } catch {
      console.error('Error getting event:', error);
      throw new Error('Error getting event:', error);
    }
  });

export const saveEvent = createAsyncThunk('schedule/saveEvent',
  async (_, { getState }) => {
    const { client_id } = getState().client;
    const {
      event_id,
      invoice_id,
      start_date_time,
      end_date_time,
      attendees,
      calendar_link } = getState().schedule;

    const eventData = {
      client_id: client_id,
      event_id: event_id,
      invoice_id: invoice_id,
      start_date_time: start_date_time,
      end_date_time: end_date_time,
      attendees: attendees,
      calendar_link: calendar_link
    };

    try {
      const response = await axios.post('/wp-json/orb/v1/schedule', eventData);
      console.log(response.data)
      return response.data;
    } catch (error) {
      console.error('Error getting event:', error);
      throw new Error('Error getting event:', error);
    }
  });

export const getEvent = createAsyncThunk('schedule/getEvent', async (_, { getState }) => {
  const { invoice_id } = getState().receipt;

  try {
    const response = await axios.get(`/wp-json/orb/v1/schedule/event/${invoice_id}`);
    return response.data;
  } catch (error) {
    console.error('Error getting event:', error);
    throw new Error('Error getting event:', error);
  }
});

export const getEvents = createAsyncThunk('schedule/getEvents', async (_, { getState }) => {
  const { client_id } = getState().client;

  try {
    const response = await axios.get(`/wp-json/orb/v1/schedule/events/${client_id}`);
    return response.data;
  } catch (error) {
    console.error('Error getting event:', error);
    throw new Error('Error getting event:', error);
  }
});

export const scheduleSlice = createSlice({
  name: 'schedule',
  initialState,
  reducers: {
    updateDate: (state, action) => {
      state.start_date = action.payload;
    },
    updateTime: (state, action) => {
      state.start_time = action.payload;
    },
    updateDueDate: (state) => {
      state.due_date = combineDateTimeToTimestamp(
        state.start_date,
        state.start_time
      );
    },
    updateEvent: (state) => {
      state.event_date_time = combineDateTime(
        state.start_date,
        state.start_time
      )
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCalendarEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCalendarEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.events = action.payload;
        state.error = null;
      })
      .addCase(fetchCalendarEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch calendar events';
      })
      .addCase(sendInvites.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendInvites.fulfilled, (state, action) => {
        state.loading = false;
        state.event_id = action.payload;
        state.error = null;
      })
      .addCase(sendInvites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to send out invites';
      })
      .addCase(saveEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveEvent.fulfilled, (state, action) => {
        state.loading = false;
        state.event_id = action.payload;
      })
      .addCase(saveEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to send out invites';
      })
      .addCase(getEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getEvent.fulfilled, (state, action) => {
        state.loading = false;
        state.schedule_id = action.payload.schedule_id;
        state.event_id = action.payload.event_id;
        state.invoice_id = action.payload.invoice_id;
        state.start_date = action.payload.start_date;
        state.start_time = action.payload.start_time;
        state.attendees = action.payload.attendees;
        state.calendar_link = action.payload.htmlLink;
        state.error = null;
      })
      .addCase(getEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to send out invites';
      })
      .addCase(getEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.events = action.payload;
        state.error = null;
      })
      .addCase(getEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to send out invites';
      });
  },
});

export const { updateDate, updateTime, updateDueDate, updateEvent } = scheduleSlice.actions;
export default scheduleSlice.reducer;