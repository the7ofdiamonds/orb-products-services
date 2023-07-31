import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  events: [],
  error: null,
  start_date: '',
  start_time: '',
  due_date: '',
  event_date_time: ''
};

export const fetchCalendarEvents = createAsyncThunk(
  'schedule/fetchCalendarEvents',
  async () => {
    const response = await axios.get('/wp-json/orb/v1/schedule');
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


export const sendInvites = createAsyncThunk(
  'schedule/sendInvites',
  async (_, { getState }) => {
    const { event_date_time } = getState().schedule;
    const { invoice_id } = getState().invoice;

    const eventData = {
      description: `Invoice #${invoice_id}`,
      start: event_date_time,
      attendees: ['jamel.c.lyons@gmail.com'],
    };
    console.log(eventData);
    axios.post('/wp-json/orb/v1/schedule/invite', eventData)
      .then((response) => {
        // Handle the response if needed
        console.log('Event created successfully:', response.data);
      })
      .catch((error) => {
        // Handle the error if there's an issue with the request
        console.error('Error creating event:', error);
      });
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
        state.event = action.payload;
        state.error = null;
      })
      .addCase(sendInvites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to send out invites';
      });
  },
});

export const { updateDate, updateTime, updateDueDate, updateEvent } = scheduleSlice.actions;
export default scheduleSlice.reducer;