"use strict";
(self["webpackChunkorb_services"] = self["webpackChunkorb_services"] || []).push([["src_views_Receipt_jsx"],{

/***/ "./src/utils/PhoneNumberFormatter.js":
/*!*******************************************!*\
  !*** ./src/utils/PhoneNumberFormatter.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const formatPhoneNumber = phoneNumber => {
  if (typeof phoneNumber !== 'string' || phoneNumber.trim() === '') {
    return ''; // Return an empty string for invalid phone numbers
  }

  // Remove all non-digit characters from the phone number
  const cleaned = phoneNumber.replace(/\D/g, '');

  // Apply the desired phone number format
  const regex = /^(\d{1})(\d{3})(\d{3})(\d{4})$/;
  const formatted = cleaned.replace(regex, '+$1 ($2) $3-$4');
  return formatted;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (formatPhoneNumber);

/***/ }),

/***/ "./src/views/Receipt.jsx":
/*!*******************************!*\
  !*** ./src/views/Receipt.jsx ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router/dist/index.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _controllers_clientSlice_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../controllers/clientSlice.js */ "./src/controllers/clientSlice.js");
/* harmony import */ var _controllers_customerSlice_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../controllers/customerSlice.js */ "./src/controllers/customerSlice.js");
/* harmony import */ var _controllers_invoiceSlice_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../controllers/invoiceSlice.js */ "./src/controllers/invoiceSlice.js");
/* harmony import */ var _controllers_paymentSlice_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../controllers/paymentSlice.js */ "./src/controllers/paymentSlice.js");
/* harmony import */ var _controllers_receiptSlice_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../controllers/receiptSlice.js */ "./src/controllers/receiptSlice.js");
/* harmony import */ var _utils_PhoneNumberFormatter_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../utils/PhoneNumberFormatter.js */ "./src/utils/PhoneNumberFormatter.js");
/* harmony import */ var _controllers_scheduleSlice_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../controllers/scheduleSlice.js */ "./src/controllers/scheduleSlice.js");











function ReceiptComponent() {
  const {
    id
  } = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_10__.useParams)();
  const dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__.useDispatch)();
  const {
    user_email,
    client_id,
    stripe_customer_id
  } = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__.useSelector)(state => state.client);
  const {
    company_name,
    address_line_1,
    address_line_2,
    city,
    state,
    zipcode,
    phone
  } = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__.useSelector)(state => state.customer);
  const {
    status,
    stripe_invoice_id,
    selections,
    subtotal,
    tax,
    amount_due,
    amount_paid,
    amount_remaining,
    payment_date,
    payment_intent_id
  } = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__.useSelector)(state => state.invoice);
  const {
    start_date,
    start_time
  } = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__.useSelector)(state => state.schedule);
  const {
    payment_method_id
  } = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__.useSelector)(state => state.payment);
  const {
    loading,
    error,
    invoice_id,
    payment_method,
    first_name,
    last_name
  } = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__.useSelector)(state => state.receipt);
  const [messageType, setMessageType] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
  const [message, setMessage] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
  const timestamp = payment_date * 1000;
  const paymentDate = new Date(timestamp);
  const formattedPhone = (0,_utils_PhoneNumberFormatter_js__WEBPACK_IMPORTED_MODULE_8__["default"])(phone);
  const Subtotal = subtotal / 100;
  const Tax = tax / 100;
  const amountDue = amount_due / 100;
  const amountPaid = amount_paid / 100;
  const Balance = amount_remaining / 100;
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (user_email) {
      dispatch((0,_controllers_clientSlice_js__WEBPACK_IMPORTED_MODULE_3__.getClient)());
    }
  }, [dispatch, user_email]);
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (stripe_customer_id) {
      dispatch((0,_controllers_customerSlice_js__WEBPACK_IMPORTED_MODULE_4__.getStripeCustomer)());
    }
  }, [dispatch, stripe_customer_id]);
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (stripe_customer_id) {
      dispatch((0,_controllers_receiptSlice_js__WEBPACK_IMPORTED_MODULE_7__.getReceipt)(id));
    }
  }, [dispatch, id, stripe_customer_id]);
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (!payment_method && payment_method_id) {
      dispatch((0,_controllers_receiptSlice_js__WEBPACK_IMPORTED_MODULE_7__.getPaymentMethod)(payment_method_id));
    }
  }, [dispatch, payment_method_id]);
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (invoice_id) {
      dispatch((0,_controllers_invoiceSlice_js__WEBPACK_IMPORTED_MODULE_5__.getInvoice)(invoice_id));
    }
  }, [dispatch, invoice_id]);
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (invoice_id) {
      dispatch((0,_controllers_scheduleSlice_js__WEBPACK_IMPORTED_MODULE_9__.getEvent)());
    }
  }, [invoice_id, dispatch]);
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (start_date && start_time) {
      setMessageType('info');
      setMessage(`Make sure to confirm your appointment for ${start_date} @ ${start_time}.`);
    }
  }, [start_date, start_time]);
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (stripe_invoice_id) {
      dispatch((0,_controllers_invoiceSlice_js__WEBPACK_IMPORTED_MODULE_5__.getStripeInvoice)());
    }
  }, [dispatch, stripe_invoice_id]);
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (status) {
      dispatch((0,_controllers_invoiceSlice_js__WEBPACK_IMPORTED_MODULE_5__.updateInvoiceStatus)());
    }
  }, [status, dispatch]);
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (payment_intent_id) {
      dispatch((0,_controllers_paymentSlice_js__WEBPACK_IMPORTED_MODULE_6__.getPaymentIntent)(payment_intent_id));
    }
  }, [dispatch, payment_intent_id]);
  const handleClick = () => {
    window.location = '/dashboard';
  };
  if (error) {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("main", {
      className: "error"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "status-bar card error"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, "You have either entered the wrong Receipt ID, or you are not the client to whom this receipt belongs.")));
  }
  if (loading) {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, "Loading...");
  }
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", {
    className: "title"
  }, "RECEIPT"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "receipt-card card"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "thead"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tr receipt-number"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "th"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", null, "RECEIPT NUMBER")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "td"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h5", null, id))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tr payment-date"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "th"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", null, "PAYMENT DATE")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "td"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h5", null, paymentDate.toLocaleString()))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tr payment-method"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "th"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", null, "PAYMENT TYPE")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "td"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h5", {
    className: "payment-method"
  }, payment_method ? payment_method : 'No Payment Method Provided'))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tr client-details"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "th"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", null, "PAID BY")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "td"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h5", null, first_name, " ", last_name, " O/B/O ", company_name)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tr address-line-1"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "td"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h5", null, address_line_1)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "td"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h5", null, address_line_2))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tr address-line-2"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "td"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h5", null, `${city},`)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "td"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h5", null, state)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "td"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h5", null, zipcode))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tr phone"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "td"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: `tel:${phone}`
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h5", null, formattedPhone)))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tr email"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "td"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h5", null, user_email))))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("table", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("thead", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", null, "NO.")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", null, "DESCRIPTION")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", null, "TOTAL"))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("tbody", null, selections && selections.length > 0 && selections.map(selection => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h5", null, selection.id)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h5", null, selection.description)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", {
    className: "selections-cost"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h5", null, new Intl.NumberFormat('us', {
    style: 'currency',
    currency: 'USD'
  }).format(selection.cost))))))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tfoot"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tr subtotal"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "th subtotal-label"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", null, "SUBTOTAL")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "td subtotal-number"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h5", null, new Intl.NumberFormat('us', {
    style: 'currency',
    currency: 'USD'
  }).format(Subtotal)))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tr tax"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "th tax-label"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", null, "TAX")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "td tax-number"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h5", null, new Intl.NumberFormat('us', {
    style: 'currency',
    currency: 'USD'
  }).format(Tax)))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tr grand-total"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "th grand-total-label"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", null, "GRAND TOTAL")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "td grand-total-number"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h5", null, new Intl.NumberFormat('us', {
    style: 'currency',
    currency: 'USD'
  }).format(amountDue)))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tr amount-paid"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "th amount-paid-label"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", null, "AMOUNT PAID")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "td amount-paid-number"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h5", null, new Intl.NumberFormat('us', {
    style: 'currency',
    currency: 'USD'
  }).format(amountPaid)))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tr balance"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "th balance-label"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", null, "BALANCE")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "td balance-number"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h5", null, new Intl.NumberFormat('us', {
    style: 'currency',
    currency: 'USD'
  }).format(Balance)))))), message && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `status-bar card ${messageType}`
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, message)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    id: "quote_button",
    onClick: handleClick
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", null, "DASHBOARD")));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ReceiptComponent);

/***/ })

}]);
//# sourceMappingURL=src_views_Receipt_jsx.js.map