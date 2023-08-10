"use strict";
(self["webpackChunkorb_services"] = self["webpackChunkorb_services"] || []).push([["src_views_Dashboard_jsx"],{

/***/ "./src/views/Dashboard.jsx":
/*!*********************************!*\
  !*** ./src/views/Dashboard.jsx ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _dashboard_UserSchedule__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./dashboard/UserSchedule */ "./src/views/dashboard/UserSchedule.jsx");
/* harmony import */ var _dashboard_UserReceipt__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./dashboard/UserReceipt */ "./src/views/dashboard/UserReceipt.jsx");
/* harmony import */ var _dashboard_UserInvoice__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./dashboard/UserInvoice */ "./src/views/dashboard/UserInvoice.jsx");
/* harmony import */ var _dashboard_UserQuote__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./dashboard/UserQuote */ "./src/views/dashboard/UserQuote.jsx");







function DashboardComponent() {
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_dashboard_UserSchedule__WEBPACK_IMPORTED_MODULE_3__["default"], null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_dashboard_UserReceipt__WEBPACK_IMPORTED_MODULE_4__["default"], null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_dashboard_UserInvoice__WEBPACK_IMPORTED_MODULE_5__["default"], null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_dashboard_UserQuote__WEBPACK_IMPORTED_MODULE_6__["default"], null));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DashboardComponent);

/***/ }),

/***/ "./src/views/dashboard/UserInvoice.jsx":
/*!*********************************************!*\
  !*** ./src/views/dashboard/UserInvoice.jsx ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _controllers_clientSlice__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../controllers/clientSlice */ "./src/controllers/clientSlice.js");
/* harmony import */ var _controllers_invoiceSlice__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../controllers/invoiceSlice */ "./src/controllers/invoiceSlice.js");





function UserInvoiceComponent() {
  const dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__.useDispatch)();
  const {
    user_email,
    stripe_customer_id
  } = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__.useSelector)(state => state.client);
  const {
    loading,
    invoiceError,
    invoices,
    stripe_invoice_id
  } = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__.useSelector)(state => state.invoice);
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (user_email) {
      dispatch((0,_controllers_clientSlice__WEBPACK_IMPORTED_MODULE_3__.getClient)());
    }
  }, [user_email, dispatch]);
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (stripe_customer_id) {
      dispatch((0,_controllers_invoiceSlice__WEBPACK_IMPORTED_MODULE_4__.getClientInvoices)());
    }
  }, [stripe_customer_id, dispatch]);
  if (invoiceError) {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "status-bar card error"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", null, invoiceError))));
  }
  if (loading) {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, "Loading...");
  }
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, Array.isArray(invoices) && invoices.length > 0 ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "card invoice"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("table", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("thead", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", null, "Invoice ID")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", null, "Status")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", null, "Balance")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", null, "Due Date")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", null, "Quote ID")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", null, "Page")))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("tbody", null, invoices.map(invoice => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null, invoice.id), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null, invoice.status), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null, new Intl.NumberFormat('us', {
    style: 'currency',
    currency: 'USD'
  }).format(invoice.amount_remaining)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null, invoice.due_date), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null, invoice.quote_id), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null, invoice.status === 'deleted' ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h5", null, "Deleted") : invoice.status === 'paid' ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: `/services/invoice/${invoice.id}`
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h5", null, "View"))) : invoice.status === 'void' ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h5", null, "Void") : invoice.status === 'uncollectible' ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h5", null, "Uncollectible") : invoice.status === 'open' ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: `/services/invoice/${invoice.id}`
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h5", null, "Continue")) : (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    onClick: async () => await dispatch((0,_controllers_invoiceSlice__WEBPACK_IMPORTED_MODULE_4__.deleteInvoice)(invoice.stripe_invoice_id)).then(() => {
      dispatch((0,_controllers_invoiceSlice__WEBPACK_IMPORTED_MODULE_4__.getClientInvoices)());
    })
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h5", null, "Delete")))))))))) : '');
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (UserInvoiceComponent);

/***/ }),

/***/ "./src/views/dashboard/UserQuote.jsx":
/*!*******************************************!*\
  !*** ./src/views/dashboard/UserQuote.jsx ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _controllers_clientSlice__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../controllers/clientSlice */ "./src/controllers/clientSlice.js");
/* harmony import */ var _controllers_quoteSlice__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../controllers/quoteSlice */ "./src/controllers/quoteSlice.js");





function UserQuoteComponent() {
  const dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__.useDispatch)();
  const {
    user_email,
    stripe_customer_id
  } = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__.useSelector)(state => state.client);
  const {
    loading,
    quoteError,
    quotes,
    pdf
  } = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__.useSelector)(state => state.quote);
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (user_email) {
      dispatch((0,_controllers_clientSlice__WEBPACK_IMPORTED_MODULE_3__.getClient)());
    }
  }, [user_email, dispatch]);
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (stripe_customer_id) {
      dispatch((0,_controllers_quoteSlice__WEBPACK_IMPORTED_MODULE_4__.getClientQuotes)());
    }
  }, [stripe_customer_id, dispatch]);
  if (quoteError) {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "status-bar card error"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", null, quoteError))));
  }
  if (loading) {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, "Loading...");
  }
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, Array.isArray(quotes) && quotes.length > 0 ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "card quote"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("table", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("thead", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", null, "Quote ID")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", null, "Status")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", null, "Total")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", null, "Page")))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("tbody", null, quotes.map(quote => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null, quote.id), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null, quote.status), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null, new Intl.NumberFormat('us', {
    style: 'currency',
    currency: 'USD'
  }).format(quote.amount_total)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null, quote.status === 'accepted' ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h5", null, "Accepted") : quote.status === 'canceled' ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h5", null, "Canceled") : (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: `/services/quote/${quote.id}`
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h5", null, "Confirm"))))))))) : '');
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (UserQuoteComponent);

/***/ }),

/***/ "./src/views/dashboard/UserReceipt.jsx":
/*!*********************************************!*\
  !*** ./src/views/dashboard/UserReceipt.jsx ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _controllers_clientSlice__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../controllers/clientSlice */ "./src/controllers/clientSlice.js");
/* harmony import */ var _controllers_receiptSlice__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../controllers/receiptSlice */ "./src/controllers/receiptSlice.js");





function UserReceiptComponent() {
  const dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__.useDispatch)();
  const {
    user_email,
    stripe_customer_id
  } = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__.useSelector)(state => state.client);
  const {
    loading,
    receiptError,
    receipts
  } = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__.useSelector)(state => state.receipt);
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (user_email) {
      dispatch((0,_controllers_clientSlice__WEBPACK_IMPORTED_MODULE_3__.getClient)());
    }
  }, [user_email, dispatch]);
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (stripe_customer_id) {
      dispatch((0,_controllers_receiptSlice__WEBPACK_IMPORTED_MODULE_4__.getClientReceipts)());
    }
  }, [stripe_customer_id, dispatch]);
  if (receiptError) {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "status-bar card error"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", null, receiptError))));
  }
  if (loading) {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, "Loading...");
  }
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, Array.isArray(receipts) && receipts.length > 0 ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "card receipt"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("table", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("thead", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", null, "Receipt ID")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", null, "Amount Paid")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", null, "Balance")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", null, "Invoice ID")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", null, "PDF")))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("tbody", null, receipts.map(receipt => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", {
    key: receipt.id
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null, receipt.id), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null, new Intl.NumberFormat('us', {
    style: 'currency',
    currency: 'USD'
  }).format(receipt.amount_paid)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null, new Intl.NumberFormat('us', {
    style: 'currency',
    currency: 'USD'
  }).format(receipt.balance)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null, receipt.invoice_id), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: receipt.receipt_pdf_url,
    target: "_blank"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h5", null, "Download")))))))))) : '');
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (UserReceiptComponent);

/***/ }),

/***/ "./src/views/dashboard/UserSchedule.jsx":
/*!**********************************************!*\
  !*** ./src/views/dashboard/UserSchedule.jsx ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _controllers_clientSlice__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../controllers/clientSlice */ "./src/controllers/clientSlice.js");
/* harmony import */ var _controllers_scheduleSlice__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../controllers/scheduleSlice */ "./src/controllers/scheduleSlice.js");





function UserScheduleComponent() {
  const dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__.useDispatch)();
  const {
    user_email,
    client_id
  } = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__.useSelector)(state => state.client);
  const {
    loading,
    error,
    events
  } = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__.useSelector)(state => state.schedule);
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (user_email) {
      dispatch((0,_controllers_clientSlice__WEBPACK_IMPORTED_MODULE_3__.getClient)());
    }
  }, [user_email, dispatch]);
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (client_id) {
      dispatch((0,_controllers_scheduleSlice__WEBPACK_IMPORTED_MODULE_4__.getEvents)());
    }
  }, [client_id, dispatch]);
  if (error) {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("main", {
      className: "error"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "status-bar card"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      className: "error"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", null, "There is nothing on your schedule to show at this time")))));
  }
  if (loading) {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, "Loading...");
  }
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, Array.isArray(events) && events.length > 0 ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "card schedule"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("table", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("thead", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", null, "Event ID")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", null, "Start Date")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", null, "Start Time")))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("tbody", null, events.map(event => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null, event.id), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null, event.start_date), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null, event.start_time))))))) : '');
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (UserScheduleComponent);

/***/ })

}]);
//# sourceMappingURL=src_views_Dashboard_jsx.js.map