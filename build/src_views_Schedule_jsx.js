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
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router/dist/index.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _controllers_clientSlice__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../controllers/clientSlice */ "./src/controllers/clientSlice.js");
/* harmony import */ var _controllers_scheduleSlice_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../controllers/scheduleSlice.js */ "./src/controllers/scheduleSlice.js");
/* harmony import */ var _controllers_invoiceSlice_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../controllers/invoiceSlice.js */ "./src/controllers/invoiceSlice.js");







function ScheduleComponent() {
  const {
    user_email,
    client_id,
    stripe_customer_id
  } = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__.useSelector)(state => state.client);
  const {
    total
  } = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__.useSelector)(state => state.quote);
  const {
    loading,
    error,
    events,
    start_date,
    start_time
  } = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__.useSelector)(state => state.schedule);
  const {
    invoice_id
  } = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__.useSelector)(state => state.invoice);
  const [availableDates, setAvailableDates] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
  const [availableTimes, setAvailableTimes] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
  const [selectedDate, setSelectedDate] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
  const [selectedTime, setSelectedTime] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
  const dateSelectRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
  const timeSelectRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
  const dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__.useDispatch)();
  const navigate = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_6__.useNavigate)();
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    dispatch((0,_controllers_clientSlice__WEBPACK_IMPORTED_MODULE_3__.getClient)());
  }, [user_email, dispatch]);
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (client_id && stripe_customer_id) {
      dispatch((0,_controllers_scheduleSlice_js__WEBPACK_IMPORTED_MODULE_4__.fetchCalendarEvents)());
    }
  }, [client_id, stripe_customer_id, dispatch]);
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
  };
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (events) {
      getEvents();
    }
  }, [events]);
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    dateSelectRef.current = document.getElementById('date_select');
    timeSelectRef.current = document.getElementById('time_select');
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
  const handleClick = () => {
    if (stripe_customer_id && total > 0) {
      dispatch((0,_controllers_invoiceSlice_js__WEBPACK_IMPORTED_MODULE_5__.saveInvoice)());
    }
  };
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (invoice_id) {
      navigate(`/services/invoice/${invoice_id}`);
    }
  }, [navigate, invoice_id]);
  if (error) {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, "Error: ", error);
  }
  if (loading) {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, "Loading...");
  }
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", {
    className: "title"
  }, "SCHEDULE"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "schedule",
    id: "schedule"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "schedule-select"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
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
    min: new Date().toISOString().split('T')[0] // Disable past dates
  }, availableDates ? availableDates.map((date, index) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    key: index,
    value: date
  }, date)) : (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    disabled: true
  }, "No Available Dates") // Show "No Available Dates" message
  )), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
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
  }, availableTimes && availableTimes.length > 0 ? availableTimes.map((time, index) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    key: index,
    value: time
  }, time)) : (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    disabled: true
  }, "No Available Times"))))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    onClick: handleClick
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", null, "CONFIRM")));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ScheduleComponent);

/***/ })

}]);
//# sourceMappingURL=src_views_Schedule_jsx.js.map