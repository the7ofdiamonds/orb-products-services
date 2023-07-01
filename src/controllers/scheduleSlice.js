import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  events: [],
  error: null,
};

// Add the apikey and calendarid to the .env file
const apiKey = 'AIzaSyCxrvBdk7ykEDhAU7ECUXTsG59SNEvEZ_A';
const calendarId = 'jclyonsenterprises@gmail.com';
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

// Add confirmation for date and time
export const scheduleSlice = createSlice({
  name: 'schedule',
  initialState,
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
      });
  },
});

export default scheduleSlice.reducer;