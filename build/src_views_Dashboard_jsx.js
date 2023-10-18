"use strict";
(self["webpackChunkorb_products_services"] = self["webpackChunkorb_products_services"] || []).push([["src_views_Dashboard_jsx"],{

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
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_schedule_UserSchedule__WEBPACK_IMPORTED_MODULE_2__["default"], null));
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