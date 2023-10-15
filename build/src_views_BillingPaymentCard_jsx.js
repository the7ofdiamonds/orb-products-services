"use strict";
(self["webpackChunkorb_services"] = self["webpackChunkorb_services"] || []).push([["src_views_BillingPaymentCard_jsx"],{

/***/ "./src/error/ErrorComponent.jsx":
/*!**************************************!*\
  !*** ./src/error/ErrorComponent.jsx ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);

function ErrorComponent(props) {
  const {
    error
  } = props;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("main", {
    className: "error"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "status-bar card error"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, error)));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ErrorComponent);

/***/ }),

/***/ "./src/loading/LoadingComponent.jsx":
/*!******************************************!*\
  !*** ./src/loading/LoadingComponent.jsx ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);

function LoadingComponent() {
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "loading"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h1", null, "Loading......"));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (LoadingComponent);

/***/ }),

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

/***/ "./src/utils/PaymentMethod.js":
/*!************************************!*\
  !*** ./src/utils/PaymentMethod.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PaymentMethodGenerator: () => (/* binding */ PaymentMethodGenerator)
/* harmony export */ });
function PaymentMethodGenerator(payment_method) {
  let paymentMethod = '';
  if (payment_method) {
    const paymentType = payment_method.type;
    const paymentCard = payment_method.card;
    const paymentFundingType = paymentCard.funding;
    const paymentBrand = paymentCard.brand;
    const country = paymentCard.country;
    const last4 = paymentCard.last4;
    const wallet = payment_method.wallet;
    if (paymentType === 'card') {
      paymentMethod = `${paymentFundingType !== 'unknown' ? paymentFundingType : ''} ${paymentType} ${country} ${paymentBrand} ${last4}`;
    } else if (paymentType === 'wallet' && wallet !== null) {
      paymentMethod = wallet;
    } else {
      paymentMethod = paymentType;
    }
    if (payment_method.card_present) {
      const cardPresent = payment_method.card_present;
      const cardPresentFunding = cardPresent.card_present;
      const cardPresentBrand = cardPresent.brand;
      const cardPresentCountry = cardPresent.country;
      const cardPresentLast4 = cardPresent.last4;
      paymentMethod = `${cardPresentFunding !== 'unknown' ? cardPresentFunding : ''} ${paymentType} ${cardPresentCountry} ${cardPresentBrand} ${cardPresentLast4}`;
    }
  }
  return paymentMethod;
}

/***/ }),

/***/ "./src/views/BillingPaymentCard.jsx":
/*!******************************************!*\
  !*** ./src/views/BillingPaymentCard.jsx ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router/dist/index.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _payment_Navigation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./payment/Navigation */ "./src/views/payment/Navigation.jsx");
/* harmony import */ var _controllers_clientSlice__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../controllers/clientSlice */ "./src/controllers/clientSlice.js");
/* harmony import */ var _controllers_invoiceSlice__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../controllers/invoiceSlice */ "./src/controllers/invoiceSlice.js");
/* harmony import */ var _controllers_paymentSlice__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../controllers/paymentSlice */ "./src/controllers/paymentSlice.js");
/* harmony import */ var _controllers_receiptSlice__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../controllers/receiptSlice */ "./src/controllers/receiptSlice.js");
/* harmony import */ var _utils_DisplayStatus__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../utils/DisplayStatus */ "./src/utils/DisplayStatus.js");
/* harmony import */ var _utils_PaymentMethod__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../utils/PaymentMethod */ "./src/utils/PaymentMethod.js");
/* harmony import */ var _stripe_react_stripe_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @stripe/react-stripe-js */ "./node_modules/@stripe/react-stripe-js/dist/react-stripe.umd.js");
/* harmony import */ var _stripe_react_stripe_js__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_stripe_react_stripe_js__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _loading_LoadingComponent__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../loading/LoadingComponent */ "./src/loading/LoadingComponent.jsx");
/* harmony import */ var _error_ErrorComponent_jsx__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../error/ErrorComponent.jsx */ "./src/error/ErrorComponent.jsx");
/* harmony import */ var _views_components_StatusBar__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../views/components/StatusBar */ "./src/views/components/StatusBar.jsx");












// Stripe




const CardPaymentComponent = () => {
  const {
    id
  } = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_14__.useParams)();
  const [messageType, setMessageType] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('info');
  const [message, setMessage] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('Please enter your card number, expiration date and the code on the back.');
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
    paymentError,
    client_secret
  } = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__.useSelector)(state => state.payment);
  const {
    receipt_id,
    payment_method,
    brand,
    last4
  } = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__.useSelector)(state => state.receipt);

  // Setup so card displays input
  const [cardNumber, setCardNumber] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
  const [validThruMonth, setValidThruMonth] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
  const [validThruYear, setValidThruYear] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
  const [CVC, setCVC] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
  const [paymentMethodID, setPaymentMethodID] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
  const dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__.useDispatch)();
  const navigate = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_14__.useNavigate)();
  const stripe = (0,_stripe_react_stripe_js__WEBPACK_IMPORTED_MODULE_10__.useStripe)();
  const elements = (0,_stripe_react_stripe_js__WEBPACK_IMPORTED_MODULE_10__.useElements)();
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (user_email) {
      dispatch((0,_controllers_clientSlice__WEBPACK_IMPORTED_MODULE_4__.getClient)(user_email));
    }
  }, [user_email, dispatch]);
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (stripe_customer_id) {
      dispatch((0,_controllers_invoiceSlice__WEBPACK_IMPORTED_MODULE_5__.getInvoiceByID)(id, stripe_customer_id));
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

  // useEffect(() => {
  //   if (status) {
  //     dispatch(updateInvoiceStatus());
  //   }
  // }, [dispatch, status]);

  // useEffect(() => {
  //   if (status) {
  //     setMessage(displayStatus(status));
  //     setMessageType(displayStatusType(status));
  //   }
  // }, [status]);

  // useEffect(() => {
  //   if (receipt_id) {
  //     navigate(`/services/receipt/${receipt_id}`);
  //   }
  // }, [receipt_id, navigate]);

  const handleSubmit = async event => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const result = await stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: elements.getElement(_stripe_react_stripe_js__WEBPACK_IMPORTED_MODULE_10__.CardElement)
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
      dispatch((0,_controllers_receiptSlice__WEBPACK_IMPORTED_MODULE_7__.updatePaymentMethod)((0,_utils_PaymentMethod__WEBPACK_IMPORTED_MODULE_9__.PaymentMethodGenerator)(payment_method)));
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
  if (paymentError) {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_error_ErrorComponent_jsx__WEBPACK_IMPORTED_MODULE_12__["default"], {
      error: paymentError
    });
  }
  if (loading) {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_loading_LoadingComponent__WEBPACK_IMPORTED_MODULE_11__["default"], null);
  }
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_payment_Navigation__WEBPACK_IMPORTED_MODULE_3__["default"], null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "debit-credit-card card"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "front"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
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
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_stripe_react_stripe_js__WEBPACK_IMPORTED_MODULE_10__.CardElement, null)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_views_components_StatusBar__WEBPACK_IMPORTED_MODULE_13__["default"], {
    message: message,
    messageType: messageType
  }), client_secret ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    type: "submit",
    disabled: !stripe,
    onClick: handleSubmit
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", null, "PAY")) : '');
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CardPaymentComponent);

/***/ }),

/***/ "./src/views/components/StatusBar.jsx":
/*!********************************************!*\
  !*** ./src/views/components/StatusBar.jsx ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);

function StatusBar(props) {
  const {
    message,
    messageType
  } = props;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, message && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `status-bar card ${messageType}`
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, message)));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (StatusBar);

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
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "payment-options"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_router_dom__WEBPACK_IMPORTED_MODULE_2__.NavLink, {
    to: `/billing/payment/mobile/${id}`
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    className: "mobile-btn",
    id: "mobile-btn"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", null, "MOBILE"))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_router_dom__WEBPACK_IMPORTED_MODULE_2__.NavLink, {
    to: `/billing/payment/card/${id}`
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    className: "debit-credit-btn",
    id: "debit-credit-btn"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", null, "CARD")))));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PaymentNavigationComponent);

/***/ })

}]);
//# sourceMappingURL=src_views_BillingPaymentCard_jsx.js.map