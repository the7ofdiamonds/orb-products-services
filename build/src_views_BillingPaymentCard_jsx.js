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

/***/ "./src/utils/FormatCreditNumber.js":
/*!*****************************************!*\
  !*** ./src/utils/FormatCreditNumber.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FormatCreditNumber: () => (/* binding */ FormatCreditNumber)
/* harmony export */ });
const FormatCreditNumber = number => number.split('').reduce((seed, next, index) => {
  if (index !== 0 && !(index % 4)) seed += ' ';
  return seed + next;
}, '');

/***/ }),

/***/ "./src/utils/FormatCurrency.js":
/*!*************************************!*\
  !*** ./src/utils/FormatCurrency.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FormatCurrency: () => (/* binding */ FormatCurrency)
/* harmony export */ });
const FormatCurrency = (number, locales, currency) => {
  const Number = number / 100;
  const Locales = locales ? locales.toLowerCase() : 'us';
  const Currency = currency || 'USD';
  return new Intl.NumberFormat(Locales, {
    style: 'currency',
    currency: Currency
  }).format(Number);
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
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router/dist/index.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _payment_Navigation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./payment/Navigation */ "./src/views/payment/Navigation.jsx");
/* harmony import */ var _controllers_clientSlice__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../controllers/clientSlice */ "./src/controllers/clientSlice.js");
/* harmony import */ var _controllers_invoiceSlice__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../controllers/invoiceSlice */ "./src/controllers/invoiceSlice.js");
/* harmony import */ var _controllers_paymentSlice__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../controllers/paymentSlice */ "./src/controllers/paymentSlice.js");
/* harmony import */ var _controllers_receiptSlice__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../controllers/receiptSlice */ "./src/controllers/receiptSlice.js");
/* harmony import */ var _utils_DisplayStatus__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../utils/DisplayStatus */ "./src/utils/DisplayStatus.js");
/* harmony import */ var _utils_PaymentMethod__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../utils/PaymentMethod */ "./src/utils/PaymentMethod.js");
/* harmony import */ var _utils_FormatCreditNumber__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../utils/FormatCreditNumber */ "./src/utils/FormatCreditNumber.js");
/* harmony import */ var _utils_FormatCurrency__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../utils/FormatCurrency */ "./src/utils/FormatCurrency.js");
/* harmony import */ var _loading_LoadingComponent__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../loading/LoadingComponent */ "./src/loading/LoadingComponent.jsx");
/* harmony import */ var _error_ErrorComponent_jsx__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../error/ErrorComponent.jsx */ "./src/error/ErrorComponent.jsx");
/* harmony import */ var _views_components_StatusBar__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../views/components/StatusBar */ "./src/views/components/StatusBar.jsx");
















const CardPaymentComponent = () => {
  const {
    id
  } = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_15__.useParams)();
  const [messageType, setMessageType] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('info');
  const [message, setMessage] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('Please enter your card number, expiration date, and the code on the back.');
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
    account_country,
    currency,
    amount_due,
    amount_paid,
    remaining_balance
  } = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__.useSelector)(state => state.invoice);
  const {
    paymentLoading,
    paymentError,
    client_secret
  } = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__.useSelector)(state => state.payment);
  const {
    receipt_id,
    payment_method
  } = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__.useSelector)(state => state.receipt);
  const [cardNumber, setCardNumber] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
  const [expMonth, setExpMonth] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
  const [expYear, setExpYear] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
  const [CVC, setCVC] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
  const handleCardNumberChange = e => {
    setCardNumber(e.target.value);
  };
  const handleExpMonthChange = e => {
    setExpMonth(e.target.value);
  };
  const handleExpYearChange = e => {
    setExpYear(e.target.value);
  };
  const handleCVCChange = e => {
    setCVC(e.target.value);
  };
  const dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__.useDispatch)();
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (user_email) {
      dispatch((0,_controllers_clientSlice__WEBPACK_IMPORTED_MODULE_4__.getClient)(user_email)).then(response => {
        if (response.error !== undefined) {
          console.error(response.error.message);
          setMessageType('error');
          setMessage(response.error.message);
        } else {
          dispatch((0,_controllers_invoiceSlice__WEBPACK_IMPORTED_MODULE_5__.getInvoiceByID)(id)).then(response => {
            if (response.error !== undefined) {
              console.error(response.error.message);
              setMessageType('error');
              setMessage(response.error.message);
            }
          });
        }
      });
    }
  }, [user_email, dispatch]);
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (stripe_invoice_id) {
      dispatch((0,_controllers_invoiceSlice__WEBPACK_IMPORTED_MODULE_5__.getStripeInvoice)(stripe_invoice_id));
    }
  }, [dispatch, stripe_invoice_id]);
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (payment_intent_id) {
      dispatch((0,_controllers_paymentSlice__WEBPACK_IMPORTED_MODULE_6__.getPaymentIntent)(payment_intent_id));
    }
  }, [payment_intent_id, dispatch]);
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (payment_method && stripe_invoice_id) {
      dispatch((0,_controllers_invoiceSlice__WEBPACK_IMPORTED_MODULE_5__.getStripeInvoice)(stripe_invoice_id));
    }
  }, [payment_method, dispatch]);
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (payment_method) {
      dispatch((0,_controllers_receiptSlice__WEBPACK_IMPORTED_MODULE_7__.getPaymentMethod)(payment_method));
    }
  }, [payment_method, dispatch]);
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (payment_method) {
      dispatch((0,_controllers_receiptSlice__WEBPACK_IMPORTED_MODULE_7__.updatePaymentMethod)((0,_utils_PaymentMethod__WEBPACK_IMPORTED_MODULE_9__.PaymentMethodGenerator)(payment_method)));
    }
  }, [dispatch, payment_method]);
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (status === 'paid') {
      dispatch((0,_controllers_receiptSlice__WEBPACK_IMPORTED_MODULE_7__.postReceipt)());
    }
  }, [dispatch, status]);
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    const input = document.getElementById('credit-card-input');
    if (input) {
      input.addEventListener('input', () => input.value = (0,_utils_FormatCreditNumber__WEBPACK_IMPORTED_MODULE_10__.FormatCreditNumber)(input.value.replaceAll(' ', '')));
    }
  }, [cardNumber]);
  const handleSubmit = () => {
    console.log(cardNumber);
  };
  if (paymentLoading) {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_loading_LoadingComponent__WEBPACK_IMPORTED_MODULE_12__["default"], null);
  }
  if (paymentError) {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_error_ErrorComponent_jsx__WEBPACK_IMPORTED_MODULE_13__["default"], {
      error: paymentError
    });
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
  }, cardNumber ? cardNumber : '0000 0000 0000 0000'), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "flexbox"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "box"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "card-holder-name"
  }, first_name, " ", last_name)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "box"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "expiration"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h5", null, expMonth ? expMonth : '00'), "/", (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h5", null, expYear ? expYear : '0000'))))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "back"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "box"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, "CVC"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "cvv-box"
  }, CVC ? CVC : '0000'), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: "",
    alt: ""
  })))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("form", {
    className: "payment-card-form"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    id: "credit-card-input",
    type: "text",
    size: 16,
    maxLength: 19,
    placeholder: "0000 0000 0000 0000",
    onChange: handleCardNumberChange,
    value: cardNumber
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "text",
    size: 1,
    maxLength: 2,
    placeholder: "00",
    onChange: handleExpMonthChange,
    value: expMonth
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "text",
    size: 3,
    maxLength: 4,
    placeholder: "0000",
    onChange: handleExpYearChange,
    value: expYear
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "text",
    size: 3,
    maxLength: 4,
    placeholder: "CVC",
    onChange: handleCVCChange,
    value: CVC
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_views_components_StatusBar__WEBPACK_IMPORTED_MODULE_14__["default"], {
    message: message,
    messageType: messageType
  }), amount_due ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", null, "Amount: ", (0,_utils_FormatCurrency__WEBPACK_IMPORTED_MODULE_11__.FormatCurrency)(amount_due, account_country, currency)) : '', (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    type: "submit",
    onClick: handleSubmit
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", null, "PAY")));
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
    to: `/billing/payment/wallet/${id}`
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    className: "mobile-btn",
    id: "mobile-btn"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", null, "WALLET"))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_router_dom__WEBPACK_IMPORTED_MODULE_2__.NavLink, {
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