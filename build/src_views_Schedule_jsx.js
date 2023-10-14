"use strict";
(self["webpackChunkorb_services"] = self["webpackChunkorb_services"] || []).push([["src_views_Schedule_jsx"],{

/***/ "./src/views/Schedule.jsx":
/*!********************************!*\
  !*** ./src/views/Schedule.jsx ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router/dist/index.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _controllers_clientSlice__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../controllers/clientSlice */ "./src/controllers/clientSlice.js");
/* harmony import */ var _controllers_scheduleSlice_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../controllers/scheduleSlice.js */ "./src/controllers/scheduleSlice.js");
/* harmony import */ var _controllers_servicesSlice__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../controllers/servicesSlice */ "./src/controllers/servicesSlice.js");
/* harmony import */ var _controllers_quoteSlice__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../controllers/quoteSlice */ "./src/controllers/quoteSlice.js");
/* harmony import */ var _controllers_invoiceSlice__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../controllers/invoiceSlice */ "./src/controllers/invoiceSlice.js");
/* harmony import */ var _controllers_receiptSlice__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../controllers/receiptSlice */ "./src/controllers/receiptSlice.js");
/* harmony import */ var _utils_Schedule__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../utils/Schedule */ "./src/utils/Schedule.js");
/* harmony import */ var _components_NavigationLogin__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./components/NavigationLogin */ "./src/views/components/NavigationLogin.jsx");












function ScheduleComponent() {
  const {
    id
  } = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_11__.useParams)();
  const {
    user_email,
    client_id,
    stripe_customer_id
  } = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__.useSelector)(state => state.client);
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
    communication_preferences
  } = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__.useSelector)(state => state.schedule);
  const {
    availableServices
  } = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__.useSelector)(state => state.services);
  const {
    quotes
  } = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__.useSelector)(state => state.quote);
  const {
    invoices
  } = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__.useSelector)(state => state.invoice);
  const {
    receipts
  } = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__.useSelector)(state => state.receipt);
  const [officeHours, setOfficeHours] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
  const [availableDates, setAvailableDates] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
  const [availableTimes, setAvailableTimes] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
  const [selectedDate, setSelectedDate] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
  const [selectedTime, setSelectedTime] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
  const [selectedSummary, setSelectedSummary] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
  const [selectedDescription, setSelectedDescription] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
  const [selectedCommunicationPreference, setCommunicationPreference] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
  const [selectedAttendees, setSelectedAttendees] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([user_email]);
  const [showAdditionalAttendee, setShowAdditionalAttendee] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const [additionalAttendeeEmail, setAdditionalAttendeeEmail] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
  const [messageType, setMessageType] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('info');
  const [message, setMessage] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('Choose a date');
  const dateSelectRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
  const timeSelectRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
  const summarySelectRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
  const descriptionSelectRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
  const communicationPreferenceSelectRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
  const attendeesSelectRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
  const dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__.useDispatch)();
  const navigate = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_11__.useNavigate)();

  // Office Hours
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    dispatch((0,_controllers_scheduleSlice_js__WEBPACK_IMPORTED_MODULE_4__.getOfficeHours)());
  }, [dispatch]);
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (office_hours) {
      setOfficeHours((0,_utils_Schedule__WEBPACK_IMPORTED_MODULE_9__.formatOfficeHours)(office_hours));
    }
  }, [office_hours]);

  // Client info
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (user_email) {
      dispatch((0,_controllers_clientSlice__WEBPACK_IMPORTED_MODULE_3__.getClient)());
    }
  }, [dispatch]);
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (!user_email) {
      setMessageType('info');
      setMessage('Login to schedule an appointment');
    }
  }, [user_email]);

  // Events
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (client_id && stripe_customer_id) {
      dispatch((0,_controllers_scheduleSlice_js__WEBPACK_IMPORTED_MODULE_4__.getAvailableTimes)());
    }
  }, [client_id, stripe_customer_id, dispatch]);
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (scheduleError) {
      setMessageType('error');
      setMessage(scheduleError);
    }
  }, [messageType, message]);
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (events) {
      setAvailableDates((0,_utils_Schedule__WEBPACK_IMPORTED_MODULE_9__.datesAvail)(events));
    }
  }, [events]);
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    dateSelectRef.current = document.getElementById('date_select');
    timeSelectRef.current = document.getElementById('time_select');
    summarySelectRef.current = document.getElementById('summary_select');
    descriptionSelectRef.current = document.getElementById('description_select');
    attendeesSelectRef.current = document.getElementById('description_select');
  }, []);
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (availableDates && availableDates.length > 0) {
      setSelectedDate(availableDates[0]);
      dispatch((0,_controllers_scheduleSlice_js__WEBPACK_IMPORTED_MODULE_4__.updateDate)(availableDates[0]));
    }
  }, [availableDates]);
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (selectedDate && dateSelectRef.current) {
      const key = dateSelectRef.current.value;
      setAvailableTimes((0,_utils_Schedule__WEBPACK_IMPORTED_MODULE_9__.timesAvail)(events, key));
    }
  }, [selectedDate]);
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (availableTimes) {
      setSelectedTime(availableTimes[0]);
      dispatch((0,_controllers_scheduleSlice_js__WEBPACK_IMPORTED_MODULE_4__.updateTime)(availableTimes[0]));
    }
  }, [availableTimes]);
  const handleDateChange = event => {
    if (dateSelectRef.current) {
      setSelectedDate(event.target.value);
      dispatch((0,_controllers_scheduleSlice_js__WEBPACK_IMPORTED_MODULE_4__.updateDate)(event.target.value));
      setMessage('Choose a time');
      if (dateSelectRef.current.value !== undefined) {
        const key = dateSelectRef.current.value;
        (0,_utils_Schedule__WEBPACK_IMPORTED_MODULE_9__.timesAvail)(events, key);
      } else {
        console.error('selectedIndex is undefined');
      }
    }
  };
  const handleTimeChange = event => {
    if (timeSelectRef.current) {
      setSelectedTime(event.target.value);
      dispatch((0,_controllers_scheduleSlice_js__WEBPACK_IMPORTED_MODULE_4__.updateTime)(event.target.value));
      // dispatch(updateDueDate());
      setMessage('Choose a topic');
    }
  };
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (start_date && start_time) {
      dispatch((0,_controllers_scheduleSlice_js__WEBPACK_IMPORTED_MODULE_4__.updateEvent)());
    }
  }, [start_date, start_time, dispatch]);

  // Summary
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (selectedTime) {
      dispatch((0,_controllers_servicesSlice__WEBPACK_IMPORTED_MODULE_5__.getAvailableServices)());
    }
  }, [selectedTime, dispatch]);
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (availableServices && availableServices.length > 0) {
      setSelectedSummary(availableServices[0].description);
      dispatch((0,_controllers_scheduleSlice_js__WEBPACK_IMPORTED_MODULE_4__.updateSummary)(availableServices[0].description));
    }
  }, [availableServices, dispatch]);
  const handleSummaryChange = event => {
    if (summarySelectRef.current) {
      setSelectedSummary(event.target.value);
      dispatch((0,_controllers_scheduleSlice_js__WEBPACK_IMPORTED_MODULE_4__.updateSummary)(event.target.value));
    }
  };

  // Description
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (summary && stripe_customer_id) {
      dispatch((0,_controllers_receiptSlice__WEBPACK_IMPORTED_MODULE_8__.getClientReceipts)()).then(() => {
        dispatch((0,_controllers_invoiceSlice__WEBPACK_IMPORTED_MODULE_7__.getClientInvoices)());
      }).then(() => {
        dispatch((0,_controllers_quoteSlice__WEBPACK_IMPORTED_MODULE_6__.getClientQuotes)());
      });
    }
  }, [summary, stripe_customer_id, dispatch]);
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (summary && stripe_customer_id) {
      dispatch((0,_controllers_scheduleSlice_js__WEBPACK_IMPORTED_MODULE_4__.getCommunicationPreferences)());
    }
  }, [summary, stripe_customer_id, dispatch]);
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (summary && descriptionSelectRef.current && descriptionSelectRef.current.options.length > 0) {
      setSelectedDescription(descriptionSelectRef.current.options[0].value);
      dispatch((0,_controllers_scheduleSlice_js__WEBPACK_IMPORTED_MODULE_4__.updateDescription)(descriptionSelectRef.current.options[0].value));
    }
  }, [summary, dispatch]);
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (summary && communicationPreferenceSelectRef.current && communicationPreferenceSelectRef.current.options.length > 0) {
      setCommunicationPreference(communicationPreferenceSelectRef.current.options[0].value);
      dispatch((0,_controllers_scheduleSlice_js__WEBPACK_IMPORTED_MODULE_4__.updateCommunicationPreference)(communicationPreferenceSelectRef.current.options[0].value));
    }
  }, [summary, dispatch]);
  const handleDescriptionChange = event => {
    if (descriptionSelectRef.current) {
      setSelectedDescription(event.target.value);
      dispatch((0,_controllers_scheduleSlice_js__WEBPACK_IMPORTED_MODULE_4__.updateDescription)(event.target.value));
      console.log(selectedDescription);
    }
  };
  const handleCommunicationPreferenceChange = event => {
    if (communicationPreferenceSelectRef.current) {
      setCommunicationPreference(event.target.value);
      dispatch((0,_controllers_scheduleSlice_js__WEBPACK_IMPORTED_MODULE_4__.updateCommunicationPreference)(event.target.value));
    }
  };

  // Attendees
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (summary !== '' && user_email) {
      dispatch((0,_controllers_scheduleSlice_js__WEBPACK_IMPORTED_MODULE_4__.updateAttendees)(selectedAttendees));
    }
  }, [summary, dispatch]);
  const handleAttendeeChange = () => {
    if (additionalAttendeeEmail) {
      const updatedAttendees = [user_email, additionalAttendeeEmail];
      setAdditionalAttendeeEmail('');
      dispatch((0,_controllers_scheduleSlice_js__WEBPACK_IMPORTED_MODULE_4__.updateAttendees)(updatedAttendees));
    }
  };
  const handleAddAttendee = () => {
    setShowAdditionalAttendee(prevState => !prevState);
  };
  const handleRemoveAttendee = index => {
    const updatedAttendees = selectedAttendees.filter((_, i) => i !== index);
    setSelectedAttendees(updatedAttendees);
    dispatch((0,_controllers_scheduleSlice_js__WEBPACK_IMPORTED_MODULE_4__.updateAttendees)(updatedAttendees));
  };
  const handleClick = () => {
    if (event_date_time) {
      dispatch((0,_controllers_scheduleSlice_js__WEBPACK_IMPORTED_MODULE_4__.sendInvites)());
    }
  };
  const handleLogin = () => {
    const baseHost = window.location.protocol + '//' + window.location.host;
    window.location.href = `/login/?redirectTo=${baseHost}/schedule/`;
  };
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (event_id) {
      window.location.href = '/dashboard';
    }
  }, [event_id]);
  if (scheduleError) {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "status-bar card error"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, scheduleError));
  }
  if (loading) {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, "Loading...");
  }
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, officeHours && officeHours.length > 0 ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "office-hours-card card"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("table", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("thead", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", null, "SUN"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", null, "MON"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", null, "TUE"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", null, "WED"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", null, "THU"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", null, "FRI"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", null, "SAT"))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("tbody", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", null, officeHours.map(hours => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", {
    key: hours.day
  }, hours.start && hours.end ? `${hours.start} - ${hours.end}` : 'CLOSED'))))))) : '', (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "schedule",
    id: "schedule"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "schedule-select"
  }, availableDates && availableDates.length > 0 ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "date-select card"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    htmlFor: "date"
  }, "Choose a Date"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("select", {
    type: "text",
    name: "date",
    id: "date_select",
    ref: dateSelectRef,
    onChange: handleDateChange,
    defaultValue: selectedDate,
    min: new Date().toISOString().split('T')[0]
  }, availableDates.map((date, index) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    key: index,
    value: date
  }, date)))) : '', availableTimes && availableTimes.length > 0 ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "time-select card"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    htmlFor: "time"
  }, "Choose a Time"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("select", {
    type: "time",
    name: "time",
    id: "time_select",
    ref: timeSelectRef,
    defaultValue: selectedTime,
    onChange: handleTimeChange
  }, availableTimes.map((time, index) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    key: index,
    value: time
  }, time)))) : '')), availableServices && availableServices.length > 0 ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "summary-select card"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    htmlFor: "summary"
  }, "About"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("select", {
    type: "text",
    name: "summary",
    id: "summary_select",
    ref: summarySelectRef,
    onChange: handleSummaryChange,
    defaultValue: selectedSummary
  }, availableServices.map((service, index) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    key: index,
    value: service.description
  }, service.description)))) : '', receipts && receipts.length > 0 || invoices && invoices.length > 0 || quotes && quotes.length > 0 ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "description-select card"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    htmlFor: "description"
  }, "Details"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("select", {
    type: "text",
    name: "description",
    id: "description_select",
    ref: descriptionSelectRef,
    onChange: handleDescriptionChange,
    defaultValue: selectedDescription
  }, receipts.map((receipt, index) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    key: index,
    value: `Receipt#${receipt.id}`
  }, "Receipt#", receipt.id)), invoices.map((invoice, index) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    key: index,
    value: `Invoice#${invoice.id}`
  }, "Invoice#", invoice.id)), quotes.map((quote, index) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    key: index,
    value: `Quote#${quote.id}`
  }, "Quote#", quote.id)))) : '', communication_preferences && communication_preferences.length > 0 ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "communication-select card"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    htmlFor: "summary"
  }, "Preferred Communication Type"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("select", {
    type: "text",
    name: "preferred_communication_type",
    id: "communication_select",
    ref: communicationPreferenceSelectRef,
    onChange: handleCommunicationPreferenceChange,
    defaultValue: selectedCommunicationPreference
  }, communication_preferences.map((communication, index) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    key: index,
    value: communication.type
  }, communication.type)))) : '', attendees && attendees.length > 0 ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "attendees-select card"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    htmlFor: "attendees"
  }, "Attendees"), attendees.map((attendee, index) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "attendee"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", {
    key: index
  }, attendee), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    className: "remove-attendee",
    onClick: handleRemoveAttendee
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", null, "-")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    onClick: handleAddAttendee
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", null, "+"))))) : '', (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `additional-attendee card ${showAdditionalAttendee ? 'view' : ''}`,
    id: "additional_attendee"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    htmlFor: "attendees"
  }, "Additional Attendee"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "attendee"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "email",
    value: additionalAttendeeEmail,
    onChange: event => setAdditionalAttendeeEmail(event.target.value)
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    className: "add-attendee",
    onClick: handleAttendeeChange
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", null, "+")))), message ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `status-bar card ${messageType}`
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, message)) : '', user_email ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    onClick: handleClick
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", null, "SCHEDULE")) : (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_NavigationLogin__WEBPACK_IMPORTED_MODULE_10__["default"], null));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ScheduleComponent);

/***/ }),

/***/ "./src/views/components/NavigationLogin.jsx":
/*!**************************************************!*\
  !*** ./src/views/components/NavigationLogin.jsx ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);

function NavigationLoginComponent() {
  const baseHost = window.location.protocol + '//' + window.location.host;
  const handleLogin = () => {
    window.location.href = `/login/?redirectTo=${baseHost}/schedule/`;
  };
  const handleSignUp = () => {
    window.location.href = `/signup/?redirectTo=${baseHost}/schedule/`;
  };
  const handleForgot = () => {
    window.location.href = `/forgot/?redirectTo=${baseHost}/schedule/`;
  };
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "options"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    onClick: handleLogin
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", null, "LOGIN")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    onClick: handleSignUp
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", null, "SIGN UP")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    onClick: handleForgot
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", null, "FORGOT"))));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (NavigationLoginComponent);

/***/ })

}]);
//# sourceMappingURL=src_views_Schedule_jsx.js.map