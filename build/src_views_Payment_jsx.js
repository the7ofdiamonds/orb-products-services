"use strict";
(self["webpackChunkorb_services"] = self["webpackChunkorb_services"] || []).push([["src_views_Payment_jsx"],{

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

/***/ "./src/views/Payment.jsx":
/*!*******************************!*\
  !*** ./src/views/Payment.jsx ***!
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
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router/dist/index.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _payment_Navigation_jsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./payment/Navigation.jsx */ "./src/views/payment/Navigation.jsx");
/* harmony import */ var _controllers_invoiceSlice_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../controllers/invoiceSlice.js */ "./src/controllers/invoiceSlice.js");
/* harmony import */ var _controllers_paymentSlice_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../controllers/paymentSlice.js */ "./src/controllers/paymentSlice.js");
/* harmony import */ var _controllers_receiptSlice_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../controllers/receiptSlice.js */ "./src/controllers/receiptSlice.js");
/* harmony import */ var _utils_DisplayStatus_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utils/DisplayStatus.js */ "./src/utils/DisplayStatus.js");









function PaymentComponent() {
  const {
    id
  } = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_8__.useParams)();
  const {
    stripe_invoice_id
  } = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__.useSelector)(state => state.invoice);
  const {
    loading,
    error,
    status,
    payment_method_id,
    payment_intent
  } = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__.useSelector)(state => state.payment);
  const {
    receipt_id
  } = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__.useSelector)(state => state.receipt);
  const [messageType, setMessageType] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
  const [message, setMessage] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('Choose a payment method');
  const dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__.useDispatch)();
  const navigate = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_8__.useNavigate)();
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    dispatch((0,_controllers_invoiceSlice_js__WEBPACK_IMPORTED_MODULE_4__.getInvoice)(id));
  }, [dispatch, id]);
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (payment_intent) {
      dispatch((0,_controllers_paymentSlice_js__WEBPACK_IMPORTED_MODULE_5__.getPaymentIntent)());
    }
  }, [dispatch, payment_intent]);
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (status) {
      setMessage((0,_utils_DisplayStatus_js__WEBPACK_IMPORTED_MODULE_7__.displayStatus)(status));
      setMessageType((0,_utils_DisplayStatus_js__WEBPACK_IMPORTED_MODULE_7__.displayStatusType)(status));
    }
  }, [status]);
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (payment_method_id) {
      dispatch((0,_controllers_receiptSlice_js__WEBPACK_IMPORTED_MODULE_6__.getPaymentMethod)());
    }
  }, [dispatch, payment_method_id]);
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (stripe_invoice_id) {
      dispatch((0,_controllers_invoiceSlice_js__WEBPACK_IMPORTED_MODULE_4__.getStripeInvoice)(stripe_invoice_id));
    }
  }, [dispatch, stripe_invoice_id]);
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (receipt_id) {
      dispatch((0,_controllers_receiptSlice_js__WEBPACK_IMPORTED_MODULE_6__.getReceipt)(receipt_id));
    }
  }, [dispatch, receipt_id]);
  if (receipt_id) {
    navigate(`/services/receipt/${receipt_id}`);
  }
  if (error) {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("main", null, "Error: ", error);
  }
  if (loading) {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("main", null, "Loading...");
  }
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_payment_Navigation_jsx__WEBPACK_IMPORTED_MODULE_3__["default"], null), message !== '' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "status-bar card"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: `${messageType}`
  }, message)), receipt_id && status == 'succeeded' && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    onClick: handleClick
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", null, "RECEIPT")));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PaymentComponent);

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
//# sourceMappingURL=src_views_Payment_jsx.js.map