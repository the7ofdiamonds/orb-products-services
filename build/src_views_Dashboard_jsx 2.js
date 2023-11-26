"use strict";
(self["webpackChunkorb_products_services"] = self["webpackChunkorb_products_services"] || []).push([["src_views_Dashboard_jsx"],{

/***/ "./src/controllers/clientSlice.js":
/*!****************************************!*\
  !*** ./src/controllers/clientSlice.js ***!
  \****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addClient: function() { return /* binding */ addClient; },
/* harmony export */   clientSlice: function() { return /* binding */ clientSlice; },
/* harmony export */   getClient: function() { return /* binding */ getClient; }
/* harmony export */ });
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @reduxjs/toolkit */ "./node_modules/@reduxjs/toolkit/dist/redux-toolkit.esm.js");

const initialState = {
  clientLoading: false,
  clientError: '',
  client_id: '',
  stripe_customer_id: '',
  user_email: sessionStorage.getItem('user_email'),
  first_name: '',
  last_name: ''
};
const addClient = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__.createAsyncThunk)('client/addClient', async (_, {
  getState
}) => {
  const {
    user_email
  } = getState().client;
  const {
    company_name,
    tax_id,
    first_name,
    last_name,
    phone,
    address_line_1,
    address_line_2,
    city,
    state,
    zipcode,
    country
  } = getState().customer;
  try {
    const response = await fetch('/wp-json/orb/v1/users/clients', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        company_name: company_name,
        tax_id: tax_id,
        first_name: first_name,
        last_name: last_name,
        user_email: user_email,
        phone: phone,
        address_line_1: address_line_1,
        address_line_2: address_line_2,
        city: city,
        state: state,
        zipcode: zipcode,
        country: country
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
    throw error;
  }
});
const getClient = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__.createAsyncThunk)('client/getClient', async (_, {
  getState
}) => {
  const {
    user_email
  } = getState().client;
  const encodedEmail = encodeURIComponent(user_email);
  try {
    const response = await fetch(`/wp-json/orb/v1/users/client/${encodedEmail}`, {
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
    throw error;
  }
});
const clientSlice = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__.createSlice)({
  name: 'client',
  initialState,
  extraReducers: builder => {
    builder.addCase(addClient.pending, state => {
      state.clientLoading = true;
      state.clientError = '';
    }).addCase(addClient.fulfilled, (state, action) => {
      state.clientLoading = false;
      state.clientError = null;
      state.client_id = action.payload.client_id;
      state.stripe_customer_id = action.payload.stripe_customer_id;
    }).addCase(addClient.rejected, (state, action) => {
      state.clientLoading = false;
      state.clientError = action.error.message;
    }).addCase(getClient.pending, state => {
      state.clientLoading = true;
      state.clientError = '';
    }).addCase(getClient.fulfilled, (state, action) => {
      state.clientLoading = false;
      state.clientError = null;
      state.client_id = action.payload.id;
      state.first_name = action.payload.first_name;
      state.last_name = action.payload.last_name;
      state.stripe_customer_id = action.payload.stripe_customer_id;
    }).addCase(getClient.rejected, (state, action) => {
      state.clientLoading = false;
      state.clientError = action.error.message;
    });
  }
});
/* harmony default export */ __webpack_exports__["default"] = (clientSlice);

/***/ }),

/***/ "./src/controllers/scheduleSlice.js":
/*!******************************************!*\
  !*** ./src/controllers/scheduleSlice.js ***!
  \******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getAvailableTimes: function() { return /* binding */ getAvailableTimes; },
/* harmony export */   getClientEvents: function() { return /* binding */ getClientEvents; },
/* harmony export */   getCommunicationPreferences: function() { return /* binding */ getCommunicationPreferences; },
/* harmony export */   getEvent: function() { return /* binding */ getEvent; },
/* harmony export */   getOfficeHours: function() { return /* binding */ getOfficeHours; },
/* harmony export */   saveEvent: function() { return /* binding */ saveEvent; },
/* harmony export */   scheduleSlice: function() { return /* binding */ scheduleSlice; },
/* harmony export */   sendInvites: function() { return /* binding */ sendInvites; },
/* harmony export */   updateAttendees: function() { return /* binding */ updateAttendees; },
/* harmony export */   updateCommunicationPreference: function() { return /* binding */ updateCommunicationPreference; },
/* harmony export */   updateDate: function() { return /* binding */ updateDate; },
/* harmony export */   updateDescription: function() { return /* binding */ updateDescription; },
/* harmony export */   updateDueDate: function() { return /* binding */ updateDueDate; },
/* harmony export */   updateEvent: function() { return /* binding */ updateEvent; },
/* harmony export */   updateSummary: function() { return /* binding */ updateSummary; },
/* harmony export */   updateTime: function() { return /* binding */ updateTime; }
/* harmony export */ });
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @reduxjs/toolkit */ "./node_modules/@reduxjs/toolkit/dist/redux-toolkit.esm.js");
/* harmony import */ var _utils_Schedule__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/Schedule */ "./src/utils/Schedule.js");


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
  office_hours: [],
  communication_preferences: '',
  preferred_communication_type: ''
};
const getOfficeHours = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_1__.createAsyncThunk)('schedule/getOfficeHours', async () => {
  try {
    const response = await fetch('/wp-json/orb/v1/schedule/office-hours', {
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
    console.log(error);
    throw error.message;
  }
});
const getAvailableTimes = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_1__.createAsyncThunk)('schedule/getAvailableTimes', async () => {
  try {
    const response = await fetch('/wp-json/orb/v1/schedule/available-times', {
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
    console.log(error);
    throw error.message;
  }
});
const sendInvites = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_1__.createAsyncThunk)('schedule/sendInvites', async (_, {
  getState
}) => {
  const {
    client_id
  } = getState().client;
  const {
    start_date,
    start_time,
    event_date_time,
    summary,
    description,
    attendees
  } = getState().schedule;
  try {
    const response = await fetch('/wp-json/orb/v1/event', {
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
        attendees: attendees
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
    console.log(error);
    throw error.message;
  }
});
const saveEvent = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_1__.createAsyncThunk)('schedule/saveEvent', async (_, {
  getState
}) => {
  const {
    client_id
  } = getState().client;
  const {
    event_id,
    invoice_id,
    start_date_time,
    end_date_time,
    attendees,
    calendar_link
  } = getState().schedule;
  try {
    const response = await fetch('/wp-json/orb/v1/events', {
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
    console.log(error);
    throw error.message;
  }
});
const getEvent = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_1__.createAsyncThunk)('schedule/getEvent', async (_, {
  getState
}) => {
  const {
    invoice_id
  } = getState().receipt;
  try {
    const response = await fetch(`/wp-json/orb/v1/event/${invoice_id}`, {
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
    console.log(error);
    throw error.message;
  }
});
const getClientEvents = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_1__.createAsyncThunk)('schedule/getClientEvents', async (_, {
  getState
}) => {
  const {
    client_id
  } = getState().client;
  try {
    const response = await fetch(`/wp-json/orb/v1/events/client/${client_id}`, {
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
    console.log(error);
    throw error.message;
  }
});
const getCommunicationPreferences = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_1__.createAsyncThunk)('schedule/getCommunicationPreferences', async (_, {
  getState
}) => {
  try {
    const response = await fetch(`/wp-json/orb/v1/schedule/communication`, {
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
    console.log(error);
    throw error.message;
  }
});
const scheduleSlice = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_1__.createSlice)({
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
    updateCommunicationPreference: (state, action) => {
      state.preferred_communication_type = action.payload;
    },
    updateAttendees: (state, action) => {
      state.attendees = action.payload;
    },
    updateDueDate: state => {
      state.due_date = (0,_utils_Schedule__WEBPACK_IMPORTED_MODULE_0__.combineDateTimeToTimestamp)(state.start_date, state.start_time);
    },
    updateEvent: state => {
      state.event_date_time = (0,_utils_Schedule__WEBPACK_IMPORTED_MODULE_0__.combineDateTime)(state.start_date, state.start_time);
    }
  },
  extraReducers: builder => {
    builder.addCase(getOfficeHours.pending, state => {
      state.loading = true;
      state.scheduleError = null;
    }).addCase(getOfficeHours.fulfilled, (state, action) => {
      state.loading = false;
      state.office_hours = action.payload;
      state.scheduleError = null;
    }).addCase(getOfficeHours.rejected, (state, action) => {
      state.loading = false;
      state.scheduleError = action.error.message || 'Failed to get office hours';
    }).addCase(getAvailableTimes.pending, state => {
      state.loading = true;
      state.scheduleError = null;
    }).addCase(getAvailableTimes.fulfilled, (state, action) => {
      state.loading = false;
      state.events = action.payload;
      state.scheduleError = null;
    }).addCase(getAvailableTimes.rejected, (state, action) => {
      state.loading = false;
      state.scheduleError = action.error.message || 'Failed to fetch calendar events';
    }).addCase(sendInvites.pending, state => {
      state.loading = true;
      state.scheduleError = null;
    }).addCase(sendInvites.fulfilled, (state, action) => {
      state.loading = false;
      state.scheduleError = null;
      state.event_id = action.payload;
    }).addCase(sendInvites.rejected, (state, action) => {
      state.loading = false;
      state.scheduleError = action.error.message || 'Failed to send out invites';
    }).addCase(saveEvent.pending, state => {
      state.loading = true;
      state.scheduleError = null;
    }).addCase(saveEvent.fulfilled, (state, action) => {
      state.loading = false;
      state.event_id = action.payload;
    }).addCase(saveEvent.rejected, (state, action) => {
      state.loading = false;
      state.scheduleError = action.error.message || 'Failed to send out invites';
    }).addCase(getEvent.pending, state => {
      state.loading = true;
      state.scheduleError = null;
    }).addCase(getEvent.fulfilled, (state, action) => {
      state.loading = false;
      state.event_id = action.payload.event_id;
      state.google_event_id = action.payload.google_event_id;
      state.invoice_id = action.payload.invoice_id;
      state.start_date = action.payload.start_date;
      state.start_time = action.payload.start_time;
      state.attendees = action.payload.attendees;
      state.calendar_link = action.payload.htmlLink;
      state.scheduleError = null;
    }).addCase(getEvent.rejected, (state, action) => {
      state.loading = false;
      state.scheduleError = action.error.message || 'Failed to send out invites';
    }).addCase(getClientEvents.pending, state => {
      state.loading = true;
      state.scheduleError = null;
    }).addCase(getClientEvents.fulfilled, (state, action) => {
      state.loading = false;
      state.events = action.payload;
      state.scheduleError = null;
    }).addCase(getClientEvents.rejected, (state, action) => {
      state.loading = false;
      state.scheduleError = action.error.message || 'Failed to send out invites';
    }).addCase(getCommunicationPreferences.pending, state => {
      state.loading = true;
      state.scheduleError = null;
    }).addCase(getCommunicationPreferences.fulfilled, (state, action) => {
      state.loading = false;
      state.communication_preferences = action.payload;
      state.scheduleError = null;
    }).addCase(getCommunicationPreferences.rejected, (state, action) => {
      state.loading = false;
      state.scheduleError = action.error.message || 'Failed to send out invites';
    });
  }
});
const {
  updateDate,
  updateTime,
  updateDueDate,
  updateSummary,
  updateDescription,
  updateCommunicationPreference,
  updateAttendees,
  updateEvent
} = scheduleSlice.actions;
/* harmony default export */ __webpack_exports__["default"] = (scheduleSlice.reducer);

/***/ }),

/***/ "./src/utils/Schedule.js":
/*!*******************************!*\
  !*** ./src/utils/Schedule.js ***!
  \*******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   combineDateTime: function() { return /* binding */ combineDateTime; },
/* harmony export */   combineDateTimeToTimestamp: function() { return /* binding */ combineDateTimeToTimestamp; },
/* harmony export */   datesAvail: function() { return /* binding */ datesAvail; },
/* harmony export */   formatOfficeHours: function() { return /* binding */ formatOfficeHours; },
/* harmony export */   formatTime: function() { return /* binding */ formatTime; },
/* harmony export */   formattedDate: function() { return /* binding */ formattedDate; },
/* harmony export */   formattedTime: function() { return /* binding */ formattedTime; },
/* harmony export */   timesAvail: function() { return /* binding */ timesAvail; }
/* harmony export */ });
const combineDateTimeToTimestamp = (dateString, timeString) => {
  try {
    const date = new Date(dateString);
    const [hours, minutes] = timeString.split(':');
    date.setHours(parseInt(hours, 10));
    date.setMinutes(parseInt(minutes, 10));
    if (isNaN(date.getTime())) {
      throw new Error('Invalid date or time format');
    }
    return Math.floor(date.getTime() / 1000);
  } catch (error) {
    console.error('Error in combineDateTimeToTimestamp:', error.message);
    return null;
  }
};
const formattedDate = start_date => {
  const date = new Date(start_date);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};
const formattedTime = start_time => {
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
};
const combineDateTime = (start_date, start_time) => {
  const date = formattedDate(start_date);
  const time = formattedTime(start_time);
  return `${date}T${time}`;
};
const formatTime = time => {
  const hr = time.split(':')[0];
  return new Date(0, 0, 0, hr, 0, 0, 0).toLocaleTimeString('en-US', {
    hour12: true,
    hour: '2-digit',
    minute: '2-digit'
  });
};
const formatOfficeHours = office_hours => {
  let officeHours = [];
  office_hours.map(day => {
    let workDay = {};
    if (day.start === '' || day.end === '') {
      workDay = {
        'dayofweek': day.day,
        'start': day.start,
        'end': day.end
      };
    } else {
      workDay = {
        'dayofweek': day.day,
        'start': formatTime(day.start),
        'end': formatTime(day.end)
      };
    }
    officeHours.push(workDay);
  });
  return officeHours;
};
const datesAvail = events => {
  const availableDates = [];
  for (const key in events) {
    if (events.hasOwnProperty(key)) {
      const [year, month, day] = key.split('-');
      const date = new Date(year, month - 1, day);
      const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long'
      };
      const formattedDate = date.toLocaleDateString(undefined, options);
      availableDates.push(formattedDate);
    }
  }
  return availableDates;
};
function formatDate(inputDate) {
  const dateObject = new Date(inputDate);
  const year = dateObject.getFullYear();
  const month = String(dateObject.getMonth() + 1).padStart(2, '0');
  const day = String(dateObject.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
function addHoursToTime(dateTime, hoursToAdd) {
  const parsedTime = new Date(dateTime);
  parsedTime.setHours(parsedTime.getHours() + hoursToAdd);
  const resultTime = parsedTime.toLocaleTimeString('en-US', {
    hour12: true,
    hour: '2-digit',
    minute: '2-digit'
  });
  return resultTime;
}
const timesAvail = (events, key) => {
  const date = formatDate(key);
  const value = events[date];
  const hours = [];
  if (value && value.length > 0) {
    value.forEach(element => {
      const startHr = element['start'].split(':')[0];
      const endHr = element['end'].split(':')[0];
      const dateTime = `${date}T${element['start']}`;
      let j = parseInt(endHr, 10) - parseInt(startHr, 10);
      if (value.length > 1) {
        for (let i = 0; i < j; ++i) {
          hours.push(addHoursToTime(`${date}T${element['start']}`, i));
        }
      } else {
        for (let i = 0; i < j; ++i) {
          hours.push(addHoursToTime(dateTime, i));
        }
      }
    });
  } else {
    console.log('No events found for the given date.');
    return [];
  }
  return hours;
};

/***/ }),

/***/ "./src/views/Dashboard.jsx":
/*!*********************************!*\
  !*** ./src/views/Dashboard.jsx ***!
  \*********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _schedule_UserSchedule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./schedule/UserSchedule */ "./src/views/schedule/UserSchedule.jsx");




function DashboardComponent() {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("main", {
    className: "dashboard"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_schedule_UserSchedule__WEBPACK_IMPORTED_MODULE_2__["default"], null)));
}
/* harmony default export */ __webpack_exports__["default"] = (DashboardComponent);

/***/ }),

/***/ "./src/views/schedule/UserSchedule.jsx":
/*!*********************************************!*\
  !*** ./src/views/schedule/UserSchedule.jsx ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _controllers_clientSlice__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../controllers/clientSlice */ "./src/controllers/clientSlice.js");
/* harmony import */ var _controllers_scheduleSlice__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../controllers/scheduleSlice */ "./src/controllers/scheduleSlice.js");





function UserScheduleComponent() {
  const dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useDispatch)();
  const {
    user_email,
    client_id
  } = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useSelector)(state => state.client);
  const {
    loading,
    scheduleError,
    events
  } = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useSelector)(state => state.schedule);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (user_email) {
      dispatch((0,_controllers_clientSlice__WEBPACK_IMPORTED_MODULE_2__.getClient)());
    }
  }, [user_email, dispatch]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (client_id) {
      dispatch((0,_controllers_scheduleSlice__WEBPACK_IMPORTED_MODULE_3__.getClientEvents)());
    }
  }, [client_id, dispatch]);
  if (scheduleError) {
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "status-bar card error"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", null, scheduleError))));
  }
  if (loading) {
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, "Loading...");
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
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, Array.isArray(sortedEvents) && sortedEvents.length > 0 ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "card schedule"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("table", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("thead", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", null, "Event ID")), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", null, "Start Date")), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", null, "Start Time")))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("tbody", null, sortedEvents.map(event => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", {
    key: event.id
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null, event.id), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null, event.start_date), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null, event.start_time)))))) : '');
}
/* harmony default export */ __webpack_exports__["default"] = (UserScheduleComponent);

/***/ })

}]);
//# sourceMappingURL=src_views_Dashboard_jsx.js.map