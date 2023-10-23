"use strict";
(self["webpackChunkorb_products_services"] = self["webpackChunkorb_products_services"] || []).push([["src_views_BillingReceipt_jsx"],{

/***/ "./src/loading/LoadingComponent.jsx":
/*!******************************************!*\
  !*** ./src/loading/LoadingComponent.jsx ***!
  \******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

function LoadingComponent() {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "loading"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h1", null, "Loading......"));
}
/* harmony default export */ __webpack_exports__["default"] = (LoadingComponent);

/***/ }),

/***/ "./src/utils/PhoneNumberFormatter.js":
/*!*******************************************!*\
  !*** ./src/utils/PhoneNumberFormatter.js ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
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
/* harmony default export */ __webpack_exports__["default"] = (formatPhoneNumber);

/***/ }),

/***/ "./src/views/BillingReceipt.jsx":
/*!**************************************!*\
  !*** ./src/views/BillingReceipt.jsx ***!
  \**************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router/dist/index.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _controllers_clientSlice_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../controllers/clientSlice.js */ "./src/controllers/clientSlice.js");
/* harmony import */ var _controllers_customerSlice_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../controllers/customerSlice.js */ "./src/controllers/customerSlice.js");
/* harmony import */ var _controllers_invoiceSlice_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../controllers/invoiceSlice.js */ "./src/controllers/invoiceSlice.js");
/* harmony import */ var _controllers_paymentSlice_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../controllers/paymentSlice.js */ "./src/controllers/paymentSlice.js");
/* harmony import */ var _controllers_receiptSlice_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../controllers/receiptSlice.js */ "./src/controllers/receiptSlice.js");
/* harmony import */ var _utils_PhoneNumberFormatter_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utils/PhoneNumberFormatter.js */ "./src/utils/PhoneNumberFormatter.js");
/* harmony import */ var _loading_LoadingComponent_jsx__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../loading/LoadingComponent.jsx */ "./src/loading/LoadingComponent.jsx");
/* harmony import */ var _components_StatusBar_jsx__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./components/StatusBar.jsx */ "./src/views/components/StatusBar.jsx");












function ReceiptComponent() {
  const {
    id
  } = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_10__.useParams)();
  const dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useDispatch)();
  const [messageType, setMessageType] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('info');
  const [message, setMessage] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('');
  const {
    user_email,
    stripe_customer_id
  } = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useSelector)(state => state.client);
  const {
    company_name,
    address_line_1,
    address_line_2,
    city,
    state,
    zipcode,
    phone
  } = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useSelector)(state => state.customer);
  const {
    selections,
    subtotal,
    tax,
    amount_due,
    amount_paid,
    amount_remaining,
    payment_date,
    payment_intent_id
  } = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useSelector)(state => state.invoice);
  const {
    loading,
    stripe_invoice_id,
    payment_method,
    first_name,
    last_name
  } = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useSelector)(state => state.receipt);
  const timestamp = payment_date * 1000;
  const paymentDate = new Date(timestamp);
  const formattedPhone = (0,_utils_PhoneNumberFormatter_js__WEBPACK_IMPORTED_MODULE_7__["default"])(phone);
  const Subtotal = subtotal / 100;
  const Tax = tax / 100;
  const amountDue = amount_due / 100;
  const amountPaid = amount_paid / 100;
  const Balance = amount_remaining / 100;
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (user_email) {
      dispatch((0,_controllers_clientSlice_js__WEBPACK_IMPORTED_MODULE_2__.getClient)()).then(response => {
        if (response.error !== undefined) {
          console.error(response.error.message);
          setMessageType('error');
          setMessage(response.error.message);
        } else {
          dispatch((0,_controllers_customerSlice_js__WEBPACK_IMPORTED_MODULE_3__.getStripeCustomer)(response.payload.stripe_customer_id)).then(response => {
            if (response.error !== undefined) {
              console.error(response.error.message);
              setMessageType('error');
              setMessage(response.error.message);
            }
          });
        }
      });
    }
  }, [dispatch, user_email]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (stripe_customer_id) {
      dispatch((0,_controllers_receiptSlice_js__WEBPACK_IMPORTED_MODULE_6__.getReceiptByID)(id)).then(response => {
        if (response.error !== undefined) {
          console.error(response.error.message);
          setMessageType('error');
          setMessage(response.error.message);
        } else {
          dispatch((0,_controllers_receiptSlice_js__WEBPACK_IMPORTED_MODULE_6__.getPaymentMethod)(response.payload.payment_method_id)).then(response => {
            if (response.error !== undefined) {
              console.error(response.error.message);
              setMessageType('error');
              setMessage(response.error.message);
            }
          });
        }
      });
    }
  }, [dispatch, id, stripe_customer_id]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (stripe_invoice_id) {
      dispatch((0,_controllers_invoiceSlice_js__WEBPACK_IMPORTED_MODULE_4__.getStripeInvoice)(stripe_invoice_id)).then(response => {
        if (response.error !== undefined) {
          console.error(response.error.message);
          setMessageType('error');
          setMessage(response.error.message);
        }
      });
    }
  }, [dispatch, stripe_invoice_id]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (payment_intent_id) {
      dispatch((0,_controllers_paymentSlice_js__WEBPACK_IMPORTED_MODULE_5__.getPaymentIntent)(payment_intent_id)).then(response => {
        if (response.error !== undefined) {
          console.error(response.error.message);
          setMessageType('error');
          setMessage(response.error.message);
        }
      });
    }
  }, [dispatch, payment_intent_id]);
  const handleClickDashboard = () => {
    window.location = '/dashboard';
  };
  const handleClickBilling = () => {
    window.location = '/billing';
  };
  if (loading) {
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_loading_LoadingComponent_jsx__WEBPACK_IMPORTED_MODULE_8__["default"], null);
  }
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("section", {
    className: "receipt"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", {
    className: "title"
  }, "RECEIPT"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "receipt-card card"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "thead"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tr receipt-number"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "th"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", null, "RECEIPT NUMBER")), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "td"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h5", null, id))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tr payment-date"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "th"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", null, "PAYMENT DATE")), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "td"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h5", null, paymentDate.toLocaleString()))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tr payment-method"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "th"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", null, "PAYMENT TYPE")), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "td"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h5", null, payment_method))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tr client-details"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "th"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", null, "PAID BY")), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "td"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h5", null, first_name, " ", last_name, " O/B/O ", company_name)), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tr address-line-1"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "td"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h5", null, address_line_1)), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "td"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h5", null, address_line_2))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tr address-line-2"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "td"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h5", null, `${city},`)), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "td"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h5", null, state)), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "td"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h5", null, zipcode))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tr phone"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "td"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: `tel:${phone}`
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h5", null, formattedPhone)))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tr email"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "td"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h5", null, user_email))))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("table", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("thead", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", null, "NO.")), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", null, "DESCRIPTION")), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", null, "TOTAL"))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("tbody", null, selections && selections.length > 0 && selections.map(selection => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h5", null, selection.id)), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h5", null, selection.description)), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", {
    className: "selections-cost"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h5", null, new Intl.NumberFormat('us', {
    style: 'currency',
    currency: 'USD'
  }).format(selection.cost))))))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tfoot"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tr subtotal"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "th subtotal-label"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", null, "SUBTOTAL")), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "td subtotal-number"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h5", null, new Intl.NumberFormat('us', {
    style: 'currency',
    currency: 'USD'
  }).format(Subtotal)))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tr tax"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "th tax-label"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", null, "TAX")), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "td tax-number"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h5", null, new Intl.NumberFormat('us', {
    style: 'currency',
    currency: 'USD'
  }).format(Tax)))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tr grand-total"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "th grand-total-label"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", null, "GRAND TOTAL")), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "td grand-total-number"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h5", null, new Intl.NumberFormat('us', {
    style: 'currency',
    currency: 'USD'
  }).format(amountDue)))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tr amount-paid"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "th amount-paid-label"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", null, "AMOUNT PAID")), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "td amount-paid-number"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h5", null, new Intl.NumberFormat('us', {
    style: 'currency',
    currency: 'USD'
  }).format(amountPaid)))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "tr balance"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "th balance-label"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", null, "BALANCE")), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "td balance-number"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h5", null, new Intl.NumberFormat('us', {
    style: 'currency',
    currency: 'USD'
  }).format(Balance)))))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_StatusBar_jsx__WEBPACK_IMPORTED_MODULE_9__["default"], {
    message: message,
    messageType: messageType
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "actions"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    onClick: handleClickDashboard
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", null, "DASHBOARD")), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    onClick: handleClickBilling
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", null, "BILLING")))));
}
/* harmony default export */ __webpack_exports__["default"] = (ReceiptComponent);

/***/ }),

/***/ "./src/views/components/StatusBar.jsx":
/*!********************************************!*\
  !*** ./src/views/components/StatusBar.jsx ***!
  \********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

function StatusBarComponent(props) {
  const {
    message,
    messageType
  } = props;
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, message && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `status-bar card ${messageType}`
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, message)));
}
/* harmony default export */ __webpack_exports__["default"] = (StatusBarComponent);

/***/ })

}]);
//# sourceMappingURL=src_views_BillingReceipt_jsx.js.map