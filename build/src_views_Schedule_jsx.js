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
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router/dist/index.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _controllers_clientSlice__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../controllers/clientSlice */ "./src/controllers/clientSlice.js");
/* harmony import */ var _controllers_scheduleSlice_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../controllers/scheduleSlice.js */ "./src/controllers/scheduleSlice.js");
/* harmony import */ var _controllers_servicesSlice__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../controllers/servicesSlice */ "./src/controllers/servicesSlice.js");
/* harmony import */ var _controllers_quoteSlice__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../controllers/quoteSlice */ "./src/controllers/quoteSlice.js");
/* harmony import */ var _controllers_invoiceSlice__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../controllers/invoiceSlice */ "./src/controllers/invoiceSlice.js");
/* harmony import */ var _controllers_receiptSlice__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../controllers/receiptSlice */ "./src/controllers/receiptSlice.js");










function ScheduleComponent() {
  const {
    id
  } = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_9__.useParams)();
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
    attendees
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
  const [availableDates, setAvailableDates] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
  const [availableTimes, setAvailableTimes] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
  const [selectedDate, setSelectedDate] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
  const [selectedTime, setSelectedTime] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
  const [selectedSummary, setSelectedSummary] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
  const [selectedDescription, setSelectedDescription] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
  const [selectedAttendees, setSelectedAttendees] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([user_email]);
  const [messageType, setMessageType] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('info');
  const [message, setMessage] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('Choose a date and time to start');
  const dateSelectRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
  const timeSelectRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
  const summarySelectRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
  const descriptionSelectRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
  const attendeesSelectRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
  const dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__.useDispatch)();
  const navigate = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_9__.useNavigate)();
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    dispatch((0,_controllers_clientSlice__WEBPACK_IMPORTED_MODULE_3__.getClient)());
  }, [user_email, dispatch]);
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (client_id && stripe_customer_id) {
      dispatch((0,_controllers_scheduleSlice_js__WEBPACK_IMPORTED_MODULE_4__.fetchCalendarEvents)());
    }
  }, [client_id, stripe_customer_id, dispatch]);
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (scheduleError) {
      setMessageType('error');
      setMessage(scheduleError);
    }
  }, [messageType, message]);
  const getEvents = () => {
    const datesAvail = events.map(event => {
      const dateTime = event.start;
      const date = dateTime.split('T')[0];
      return new Date(date).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    });
    setAvailableDates(datesAvail);
    setSelectedDate(datesAvail[0]);
    if (dateSelectRef.current) {
      const selectedIndex = dateSelectRef.current.selectedIndex;
      if (selectedIndex >= 0) {
        const timesAvail = events.map(event => {
          const dateTime = event.start;
          const time = dateTime.split('T')[1];
          const start = time.split('-')[0];
          const endTime = time.split('-')[1];
          const startHour = parseInt(start, 10);
          const endHour = parseInt(endTime, 10) < 12 ? parseInt(endTime, 10) + 12 : parseInt(endTime, 10);
          const hours = [];
          for (let i = startHour; i <= endHour; i++) {
            hours.push(i);
          }
          return hours.map(hr => {
            return new Date(0, 0, 0, hr, 0, 0, 0).toLocaleTimeString('en-US', {
              hour12: true,
              hour: '2-digit',
              minute: '2-digit'
            });
          });
        });
        setAvailableTimes(timesAvail[selectedIndex]);
      }
    }
  };
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (events) {
      getEvents();
    }
  }, [events]);
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    dateSelectRef.current = document.getElementById('date_select');
    timeSelectRef.current = document.getElementById('time_select');
    summarySelectRef.current = document.getElementById('summary_select');
    descriptionSelectRef.current = document.getElementById('description_select');
    attendeesSelectRef.current = document.getElementById('description_select');
    if (availableDates && availableDates.length > 0) {
      setSelectedDate(availableDates[0]);
    }
  }, [availableDates]);
  const handleDateChange = event => {
    if (dateSelectRef.current) {
      getEvents();
      setSelectedDate(event.target.value);
      dispatch((0,_controllers_scheduleSlice_js__WEBPACK_IMPORTED_MODULE_4__.updateDate)(event.target.value));
      dispatch((0,_controllers_scheduleSlice_js__WEBPACK_IMPORTED_MODULE_4__.updateDueDate)());
    }
  };
  const handleTimeChange = event => {
    if (timeSelectRef.current) {
      getEvents();
      setSelectedTime(event.target.value);
      dispatch((0,_controllers_scheduleSlice_js__WEBPACK_IMPORTED_MODULE_4__.updateTime)(event.target.value));
      dispatch((0,_controllers_scheduleSlice_js__WEBPACK_IMPORTED_MODULE_4__.updateDueDate)());
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
    if (summary && descriptionSelectRef.current && descriptionSelectRef.current.options.length > 0) {
      setSelectedDescription(descriptionSelectRef.current.options[0].value);
      dispatch((0,_controllers_scheduleSlice_js__WEBPACK_IMPORTED_MODULE_4__.updateDescription)(descriptionSelectRef.current.options[0].value));
    }
  }, [summary, dispatch]);
  const handleDescriptionChange = event => {
    if (descriptionSelectRef.current) {
      setSelectedDescription(event.target.value);
      dispatch((0,_controllers_scheduleSlice_js__WEBPACK_IMPORTED_MODULE_4__.updateDescription)(event.target.value));
    }
  };

  // Attendees
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (description !== '' && user_email) {
      dispatch((0,_controllers_scheduleSlice_js__WEBPACK_IMPORTED_MODULE_4__.updateAttendees)(selectedAttendees));
    }
  }, [description, dispatch]);
  const handleAttendeeChange = (event, index) => {
    const updatedAttendees = [...selectedAttendees];
    updatedAttendees[index] = event.target.value;
    setSelectedAttendees(updatedAttendees);
  };
  const handleAddAttendee = () => {
    setSelectedAttendees([...selectedAttendees]);
  };
  const handleRemoveAttendee = index => {
    const updatedAttendees = selectedAttendees.filter((_, i) => i !== index);
    setSelectedAttendees(updatedAttendees);
  };
  const handleClick = () => {
    if (event_date_time) {
      dispatch((0,_controllers_scheduleSlice_js__WEBPACK_IMPORTED_MODULE_4__.sendInvites)(id));
    }
  };

  // useEffect(() => {
  //   if (event_id) {
  //     window.location.href = '/dashboard';
  //   }
  // }, [event_id]);

  if (scheduleError) {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "status-bar card error"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, scheduleError));
  }
  if (loading) {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, "Loading...");
  }
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "office-hours-card card"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("table", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("thead", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", null, "SUN"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", null, "MON"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", null, "TUE"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", null, "WED"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", null, "THU"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", null, "FRI"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", null, "SAT")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null, "1PM - 5PM"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null, "9AM - 5PM"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null, "9AM - 5PM"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null, "9AM - 5PM"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null, "9AM - 5PM"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null, "8AM - 4PM"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null, "CLOSED")))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
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
  }, "Quote#", quote.id)))) : '', attendees && attendees.length > 0 ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "attendees-select card"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    htmlFor: "attendees"
  }, "Attendees"), attendees.map((attendee, index) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "attendee"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", {
    key: index
  }, attendee), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    onClick: handleAddAttendee
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", null, "+"))))) : '', (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "additional-attendee card",
    id: "additional_attendee"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    htmlFor: "attendees"
  }, "Additional Attendee"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "attendee"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "email"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    className: "remove-attendee",
    onClick: handleRemoveAttendee
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", null, "-")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    className: "add-attendee",
    onClick: handleAttendeeChange
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", null, "+")))), message && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `status-bar card ${messageType}`
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, message)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    onClick: handleClick
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", null, "CONFIRM")));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ScheduleComponent);

/***/ })

}]);
//# sourceMappingURL=src_views_Schedule_jsx.js.map