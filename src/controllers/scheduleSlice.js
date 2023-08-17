import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { combineDateTimeToTimestamp, combineDateTime } from '../utils/Schedule';

const initialState = {
  loading: false,
  events: [],
  scheduleError: null,
  event_id: 0,
  invoice_id: '',
  start_date_time: '',
  end_date_time: '',
  summary: '',
  description: '',
  attendees: [],
  calendar_link: '',
  start_date: '',
  start_time: '',
  due_date: '',
  event_date_time: '',
  event: '',
  office_hours: []
};

export const getOfficeHours = createAsyncThunk('schedule/getOfficeHours',
  async () => {

    try {
      const response = await fetch('/wp-json/orb/v1/office-hours', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = errorData.message;
        throw new Error(errorMessage);
      }

      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.log(error)
      throw error.message;
    }
  });

export const fetchCalendarEvents = createAsyncThunk('schedule/fetchCalendarEvents',
  async () => {

    try {
      const response = await fetch('/wp-json/orb/v1/schedule/events', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = errorData.message;
        throw new Error(errorMessage);
      }

      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.log(error)
      throw error.message;
    }
  });

export const sendInvites = createAsyncThunk('schedule/sendInvites',
  async (_, { getState }) => {
    const { client_id } = getState().client;
    const { start_date, start_time, event_date_time, summary, description, attendees } = getState().schedule;

    try {
      const response = await fetch('/wp-json/orb/v1/schedule/events/invite', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          client_id: client_id,
          start: event_date_time,
          start_date: start_date,
          start_time: start_time,
          summary: summary,
          description: description,
          attendees: attendees,
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = errorData.message;
        throw new Error(errorMessage);
      }

      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.log(error)
      throw error.message;
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

    try {
      const response = await fetch('/wp-json/orb/v1/schedule', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          client_id: client_id,
          event_id: event_id,
          invoice_id: invoice_id,
          start_date_time: start_date_time,
          end_date_time: end_date_time,
          attendees: attendees,
          calendar_link: calendar_link
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = errorData.message;
        throw new Error(errorMessage);
      }

      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.log(error)
      throw error.message;
    }
  });

export const getEvent = createAsyncThunk('schedule/getEvent', async (_, { getState }) => {
  const { invoice_id } = getState().receipt;

  try {
    const response = await fetch(`/wp-json/orb/v1/schedule/event/${invoice_id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage = errorData.message;
      throw new Error(errorMessage);
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.log(error)
    throw error.message;
  }
});

export const getClientEvents = createAsyncThunk('schedule/getClientEvents', async (_, { getState }) => {
  const { client_id } = getState().client;

  try {
    const response = await fetch(`/wp-json/orb/v1/schedule/events/${client_id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage = errorData.message;
      throw new Error(errorMessage);
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.log(error)
    throw error.message;
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
    updateSummary: (state, action) => {
      state.summary = action.payload;
    },
    updateDescription: (state, action) => {
      state.description = action.payload;
    },
    updateAttendees: (state, action) => {
      state.attendees = action.payload;
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
      .addCase(getOfficeHours.pending, (state) => {
        state.loading = true;
        state.scheduleError = null;
      })
      .addCase(getOfficeHours.fulfilled, (state, action) => {
        state.loading = false;
        state.office_hours = action.payload;
        state.scheduleError = null;
      })
      .addCase(getOfficeHours.rejected, (state, action) => {
        state.loading = false;
        state.scheduleError = action.error.message || 'Failed to get office hours';
      })
      .addCase(fetchCalendarEvents.pending, (state) => {
        state.loading = true;
        state.scheduleError = null;
      })
      .addCase(fetchCalendarEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.events = action.payload;
        state.scheduleError = null;
      })
      .addCase(fetchCalendarEvents.rejected, (state, action) => {
        state.loading = false;
        state.scheduleError = action.error.message || 'Failed to fetch calendar events';
      })
      .addCase(sendInvites.pending, (state) => {
        state.loading = true;
        state.scheduleError = null;
      })
      .addCase(sendInvites.fulfilled, (state, action) => {
        state.loading = false;
        state.scheduleError = null;
        state.event_id = action.payload;
      })
      .addCase(sendInvites.rejected, (state, action) => {
        state.loading = false;
        state.scheduleError = action.error.message || 'Failed to send out invites';
      })
      .addCase(saveEvent.pending, (state) => {
        state.loading = true;
        state.scheduleError = null;
      })
      .addCase(saveEvent.fulfilled, (state, action) => {
        state.loading = false;
        state.event_id = action.payload;
      })
      .addCase(saveEvent.rejected, (state, action) => {
        state.loading = false;
        state.scheduleError = action.error.message || 'Failed to send out invites';
      })
      .addCase(getEvent.pending, (state) => {
        state.loading = true;
        state.scheduleError = null;
      })
      .addCase(getEvent.fulfilled, (state, action) => {
        state.loading = false;
        state.event_id = action.payload.event_id;
        state.google_event_id = action.payload.google_event_id;
        state.invoice_id = action.payload.invoice_id;
        state.start_date = action.payload.start_date;
        state.start_time = action.payload.start_time;
        state.attendees = action.payload.attendees;
        state.calendar_link = action.payload.htmlLink;
        state.scheduleError = null;
      })
      .addCase(getEvent.rejected, (state, action) => {
        state.loading = false;
        state.scheduleError = action.error.message || 'Failed to send out invites';
      })
      .addCase(getClientEvents.pending, (state) => {
        state.loading = true;
        state.scheduleError = null;
      })
      .addCase(getClientEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.events = action.payload;
        state.scheduleError = null;
      })
      .addCase(getClientEvents.rejected, (state, action) => {
        state.loading = false;
        state.scheduleError = action.error.message || 'Failed to send out invites';
      });
  },
});

export const {
  updateDate,
  updateTime,
  updateDueDate,
  updateSummary,
  updateDescription,
  updateAttendees,
  updateEvent } = scheduleSlice.actions;
export default scheduleSlice.reducer;