"use strict";
(self["webpackChunkorb_services"] = self["webpackChunkorb_services"] || []).push([["src_views_payment_Card_jsx"],{

/***/ "./src/utils/DisplayStatus.js":
/*!************************************!*\
  !*** ./src/utils/DisplayStatus.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   displayStatus: () => (/* binding */ displayStatus),
/* harmony export */   displayStatusType: () => (/* binding */ displayStatusType)
/* harmony export */ });
const displayStatus = status => {
  if (status === "requires_payment_method") {
    return 'Choose a payment method';
  }
  if (status === 'succeeded') {
    return 'Your transaction was successful. Thank you. ';
  }
  if (status === 'processing') {
    return `This transaction is currently processing you may revisit this page at a later time for an update and a confirmation email will be sent.`;
  }
  if (status === 'requires_confirmation' || status === 'requires_action' || status === 'requires_capture') {}
  if (status === 'canceled') {
    return 'This transaction has been canceled';
  }
  return status;
};
const displayStatusType = status => {
  if (status === 'succeeded') {
    return 'success';
  }
  if (status === 'processing' || status === 'requires_confirmation' || status === 'requires_action' || status === 'requires_capture') {
    return 'caution';
  }
  if (status === 'canceled') {
    return 'error';
  }
  return status;
};

/***/ }),

/***/ "./src/views/payment/Card.jsx":
/*!************************************!*\
  !*** ./src/views/payment/Card.jsx ***!
  \************************************/
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
/* harmony import */ var _Navigation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Navigation */ "./src/views/payment/Navigation.jsx");
/* harmony import */ var _controllers_clientSlice__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../controllers/clientSlice */ "./src/controllers/clientSlice.js");
/* harmony import */ var _controllers_invoiceSlice__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../controllers/invoiceSlice */ "./src/controllers/invoiceSlice.js");
/* harmony import */ var _controllers_paymentSlice__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../controllers/paymentSlice */ "./src/controllers/paymentSlice.js");
/* harmony import */ var _controllers_receiptSlice__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../controllers/receiptSlice */ "./src/controllers/receiptSlice.js");
/* harmony import */ var _utils_DisplayStatus__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../utils/DisplayStatus */ "./src/utils/DisplayStatus.js");
/* harmony import */ var _stripe_react_stripe_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @stripe/react-stripe-js */ "./node_modules/@stripe/react-stripe-js/dist/react-stripe.umd.js");
/* harmony import */ var _stripe_react_stripe_js__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_stripe_react_stripe_js__WEBPACK_IMPORTED_MODULE_9__);











// Stripe

const CardPaymentComponent = () => {
  const {
    id
  } = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_10__.useParams)();
  const {
    user_email,
    first_name,
    last_name,
    stripe_customer_id
  } = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__.useSelector)(state => state.client);
  const {
    stripe_invoice_id,
    payment_intent_id,
    status,
    amount_paid,
    remaining_balance
  } = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__.useSelector)(state => state.invoice);
  const {
    loading,
    error,
    client_secret
  } = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__.useSelector)(state => state.payment);
  const {
    receipt_id,
    payment_method,
    brand,
    last4
  } = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__.useSelector)(state => state.receipt);
  const [messageType, setMessageType] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
  const [message, setMessage] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('Choose a payment method');

  // Setup so card displays input
  const [cardNumber, setCardNumber] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
  const [validThruMonth, setValidThruMonth] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
  const [validThruYear, setValidThruYear] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
  const [CVC, setCVC] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
  const [paymentMethodID, setPaymentMethodID] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
  const dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__.useDispatch)();
  const navigate = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_10__.useNavigate)();
  const stripe = (0,_stripe_react_stripe_js__WEBPACK_IMPORTED_MODULE_9__.useStripe)();
  const elements = (0,_stripe_react_stripe_js__WEBPACK_IMPORTED_MODULE_9__.useElements)();
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (user_email) {
      dispatch((0,_controllers_clientSlice__WEBPACK_IMPORTED_MODULE_4__.getClient)(user_email));
    }
  }, [user_email, dispatch]);
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (stripe_customer_id) {
      dispatch((0,_controllers_invoiceSlice__WEBPACK_IMPORTED_MODULE_5__.getInvoice)(id, stripe_customer_id));
    }
  }, [dispatch, id, stripe_customer_id]);
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (stripe_invoice_id) {
      dispatch((0,_controllers_invoiceSlice__WEBPACK_IMPORTED_MODULE_5__.getStripeInvoice)(stripe_invoice_id));
    }
  }, [dispatch, stripe_invoice_id]);
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (payment_intent_id) {
      dispatch((0,_controllers_paymentSlice__WEBPACK_IMPORTED_MODULE_6__.getPaymentIntent)(payment_intent_id));
    }
  }, [dispatch, payment_intent_id]);
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (status) {
      dispatch((0,_controllers_invoiceSlice__WEBPACK_IMPORTED_MODULE_5__.updateInvoiceStatus)());
    }
  }, [dispatch, status]);
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (status) {
      setMessage((0,_utils_DisplayStatus__WEBPACK_IMPORTED_MODULE_8__.displayStatus)(status));
      setMessageType((0,_utils_DisplayStatus__WEBPACK_IMPORTED_MODULE_8__.displayStatusType)(status));
    }
  }, [status]);
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (receipt_id) {
      navigate(`/services/receipt/${receipt_id}`);
    }
  }, [receipt_id, navigate]);
  const handleSubmit = async event => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const result = await stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: elements.getElement(_stripe_react_stripe_js__WEBPACK_IMPORTED_MODULE_9__.CardElement)
      }
    });
    if (result.error) {
      setMessage(result.error.message);
      setMessageType('error');
    }
    if (result.paymentIntent) {
      let status = result.paymentIntent.status;
      setMessage((0,_utils_DisplayStatus__WEBPACK_IMPORTED_MODULE_8__.displayStatus)(status));
      setMessageType((0,_utils_DisplayStatus__WEBPACK_IMPORTED_MODULE_8__.displayStatusType)(status));
      dispatch((0,_controllers_receiptSlice__WEBPACK_IMPORTED_MODULE_7__.getPaymentMethod)(result.paymentIntent.payment_method));
    }
  };
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (brand !== '' && last4 !== '') {
      const paymentMethodCard = `${brand} - ${last4}`;
      dispatch((0,_controllers_receiptSlice__WEBPACK_IMPORTED_MODULE_7__.updatePaymentMethod)(paymentMethodCard));
    }
  }, [dispatch, brand, last4]);
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (payment_method && stripe_invoice_id) {
      dispatch((0,_controllers_invoiceSlice__WEBPACK_IMPORTED_MODULE_5__.getStripeInvoice)(stripe_invoice_id));
    }
  }, [dispatch, payment_method]);
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (status === 'paid') {
      dispatch((0,_controllers_receiptSlice__WEBPACK_IMPORTED_MODULE_7__.postReceipt)());
    }
  }, [dispatch, status]);
  if (error) {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, "Error: ", error);
  }
  if (loading) {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, "Loading...");
  }
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Navigation__WEBPACK_IMPORTED_MODULE_3__["default"], null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "debit-credit-card card"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "front"
  }, "n", ' ', (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "image"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: "",
    alt: ""
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: "",
    alt: ""
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "card-number-box"
  }, cardNumber ? cardNumber : '#### #### #### ####'), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "flexbox"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "box"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "card-holder-name"
  }, first_name, " ", last_name)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "box"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, "VALID THRU"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "expiration"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "exp-month"
  }, "Month"), " /", (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "exp-year"
  }, "Year"))))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "back"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "box"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, "cvv"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "cvv-box"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: "",
    alt: ""
  })))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("form", {
    className: "stripe-card card",
    onSubmit: handleSubmit
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_stripe_react_stripe_js__WEBPACK_IMPORTED_MODULE_9__.CardElement, null)), message && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `status-bar card ${messageType}`
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, message)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    type: "submit",
    disabled: !stripe,
    onClick: handleSubmit
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", null, "PAY")));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CardPaymentComponent);

/***/ }),

/***/ "./src/views/payment/Navigation.jsx":
/*!******************************************!*\
  !*** ./src/views/payment/Navigation.jsx ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/dist/index.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router/dist/index.js");



function PaymentNavigationComponent() {
  const {
    id
  } = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_1__.useParams)();
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", {
    className: "title"
  }, "PAYMENT"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "payment-options"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_router_dom__WEBPACK_IMPORTED_MODULE_2__.NavLink, {
    to: `/services/payment/${id}/mobile`
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    className: "mobile-btn",
    id: "mobile-btn"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", null, "MOBILE"))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_router_dom__WEBPACK_IMPORTED_MODULE_2__.NavLink, {
    to: `/services/payment/${id}/card`
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    className: "debit-credit-btn",
    id: "debit-credit-btn"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", null, "CARD")))));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PaymentNavigationComponent);

/***/ })

}]);
//# sourceMappingURL=src_views_payment_Card_jsx.js.map