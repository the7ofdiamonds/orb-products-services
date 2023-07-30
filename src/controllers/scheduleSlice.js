import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  events: [],
  error: null,
  start_date: '',
  start_time: '',
  due_date: '',
  event: ''
};

const apiKey = 'AIzaSyD9bY_bJimcwrWArRY97nY2LqzaOpsvZis';
const calendarId = 'jclyonsenterprises@gmail.com';
const accessToken = 'Bearer ya29.a0AbVbY6NxKsEogAAcg2JUOpQNUW7t7pQ7IXlG1h7q9-MPIZlK-UZQBKtPpO2NhWFd3bKFNctQpO5tEB2jJHKIEoT_5FNpaAUd1R3XHjNozIp-5BrXJ-rzKwM1879MIkNHTxYIPmtGPhoH0PacarMKyUnAgysjaCgYKAegSARISFQFWKvPlZ8CD3RAcjKgP7kfDFs5tPw0163';
const timeNow = new Date();
const currentDate = timeNow.toISOString();
const latestDate = new Date(timeNow.setDate(timeNow.getDate() + 7)).toISOString();

export const fetchCalendarEvents = createAsyncThunk(
  'schedule/fetchCalendarEvents',
  async () => {
    const response = await axios.get(
      `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(
        calendarId
      )}/events?key=${encodeURIComponent(apiKey)}&timeMin=${encodeURIComponent(
        currentDate
      )}&timeMax=${encodeURIComponent(
        latestDate
      )}`
    );

    return response.data.items;
  });

function combineDateTimeToTimestamp(dateString, timeString) {
  const date = new Date(dateString);
  const [hours, minutes] = timeString.split(':');
  date.setHours(parseInt(hours, 10));
  date.setMinutes(parseInt(minutes, 10));
  return (date.getTime()) / 1000;
}

export const sendInvites = createAsyncThunk(
  'schedule/sendInvites',
  async (_, { getState }) => {
    const { event } = getState().schedule;

    try {
      const response = await axios.post(
        `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(
          calendarId
        )}/events?key=${encodeURIComponent(apiKey)}`,
        event,
        {
          headers: {
            Authorization: `${accessToken}`,
          },
        }
      );

      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(error.message || 'Failed to send invites');
    }
  }
);

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
    updateEvent: (state, action) => {
      state.event = action.payload
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