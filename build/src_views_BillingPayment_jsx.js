"use strict";
(self["webpackChunkorb_products_services"] = self["webpackChunkorb_products_services"] || []).push([["src_views_BillingPayment_jsx"],{

/***/ "./src/error/ErrorComponent.jsx":
/*!**************************************!*\
  !*** ./src/error/ErrorComponent.jsx ***!
  \**************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

function ErrorComponent(props) {
  const {
    error
  } = props;
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("main", {
    className: "error"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "status-bar card error"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, error)));
}
/* harmony default export */ __webpack_exports__["default"] = (ErrorComponent);

/***/ }),

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

/***/ "./src/views/BillingPayment.jsx":
/*!**************************************!*\
  !*** ./src/views/BillingPayment.jsx ***!
  \**************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router/dist/index.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _components_PaymentNavigation_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/PaymentNavigation.jsx */ "./src/views/components/PaymentNavigation.jsx");
/* harmony import */ var _controllers_clientSlice_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../controllers/clientSlice.js */ "./src/controllers/clientSlice.js");
/* harmony import */ var _controllers_customerSlice_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../controllers/customerSlice.js */ "./src/controllers/customerSlice.js");
/* harmony import */ var _controllers_invoiceSlice_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../controllers/invoiceSlice.js */ "./src/controllers/invoiceSlice.js");
/* harmony import */ var _controllers_paymentSlice_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../controllers/paymentSlice.js */ "./src/controllers/paymentSlice.js");
/* harmony import */ var _controllers_receiptSlice_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../controllers/receiptSlice.js */ "./src/controllers/receiptSlice.js");
/* harmony import */ var _loading_LoadingComponent_jsx__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../loading/LoadingComponent.jsx */ "./src/loading/LoadingComponent.jsx");
/* harmony import */ var _error_ErrorComponent_jsx__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../error/ErrorComponent.jsx */ "./src/error/ErrorComponent.jsx");
/* harmony import */ var _components_StatusBar_jsx__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./components/StatusBar.jsx */ "./src/views/components/StatusBar.jsx");













function PaymentComponent() {
  const {
    id
  } = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_11__.useParams)();
  const [messageType, setMessageType] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('');
  const [message, setMessage] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('');
  const {
    user_email
  } = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useSelector)(state => state.client);
  const {
    stripe_invoice_id,
    status,
    amount_remaining
  } = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useSelector)(state => state.invoice);
  const {
    paymentLoading,
    paymentError
  } = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useSelector)(state => state.payment);
  const {
    receipt_id
  } = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useSelector)(state => state.receipt);
  const dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useDispatch)();
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (user_email) {
      dispatch((0,_controllers_clientSlice_js__WEBPACK_IMPORTED_MODULE_3__.getClient)()).then(response => {
        if (response.error !== undefined) {
          console.error(response.error.message);
          setMessageType('error');
          setMessage(response.error.message);
        } else {
          dispatch((0,_controllers_customerSlice_js__WEBPACK_IMPORTED_MODULE_4__.getStripeCustomer)(response.payload.stripe_customer_id)).then(response => {
            if (response.error !== undefined) {
              console.error(response.error.message);
              setMessageType('error');
              setMessage(response.error.message);
            } else {
              dispatch((0,_controllers_invoiceSlice_js__WEBPACK_IMPORTED_MODULE_5__.getInvoiceByID)(id, response.payload.stripe_customer_id)).then(response => {
                if (response.error !== undefined) {
                  console.error(response.error.message);
                  setMessageType('error');
                  setMessage(response.error.message);
                } else {
                  dispatch((0,_controllers_invoiceSlice_js__WEBPACK_IMPORTED_MODULE_5__.getStripeInvoice)(response.payload.stripe_invoice_id)).then(response => {
                    if (response.error !== undefined) {
                      console.error(response.error.message);
                      setMessageType('error');
                      setMessage(response.error.message);
                    } else {
                      dispatch((0,_controllers_paymentSlice_js__WEBPACK_IMPORTED_MODULE_6__.getPaymentIntent)(response.payload.payment_intent_id)).then(response => {
                        if (response.error !== undefined) {
                          console.error(response.error.message);
                          setMessageType('error');
                          setMessage(response.error.message);
                        }
                      });
                    }
                  });
                }
              });
            }
          });
        }
      });
    }
  }, [user_email, dispatch]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (status === 'open') {
      setMessage('Choose a payment method');
    } else if (status === 'paid' && amount_remaining === 0) {
      setMessage('This invoice has been paid in full.');
    }
  }, [status, amount_remaining]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (stripe_invoice_id) {
      dispatch((0,_controllers_receiptSlice_js__WEBPACK_IMPORTED_MODULE_7__.getReceipt)()).then(response => {
        if (response.error !== undefined) {
          console.error(response.error.message);
          setMessageType('error');
          setMessage(response.error.message);
        }
      });
    }
  }, [stripe_invoice_id, dispatch]);
  const handleClick = () => {
    if (receipt_id) {
      window.location.href = `/billing/receipt/${receipt_id}`;
    }
  };
  if (paymentLoading) {
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_loading_LoadingComponent_jsx__WEBPACK_IMPORTED_MODULE_8__["default"], null);
  }
  if (paymentError) {
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_error_ErrorComponent_jsx__WEBPACK_IMPORTED_MODULE_9__["default"], {
      error: paymentError
    });
  }
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", {
    className: "title"
  }, "PAYMENT"), status === 'open' ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_PaymentNavigation_jsx__WEBPACK_IMPORTED_MODULE_2__["default"], null) : '', (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_StatusBar_jsx__WEBPACK_IMPORTED_MODULE_10__["default"], {
    message: message,
    messageType: messageType
  }), receipt_id && status == 'paid' ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    onClick: handleClick
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", null, "RECEIPT")) : '');
}
/* harmony default export */ __webpack_exports__["default"] = (PaymentComponent);

/***/ }),

/***/ "./src/views/components/PaymentNavigation.jsx":
/*!****************************************************!*\
  !*** ./src/views/components/PaymentNavigation.jsx ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/dist/index.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router/dist/index.js");



function PaymentNavigationComponent() {
  const {
    id
  } = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_1__.useParams)();
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "payment-options"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_router_dom__WEBPACK_IMPORTED_MODULE_2__.NavLink, {
    to: `/billing/payment/wallet/${id}`
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    className: "mobile-btn",
    id: "mobile-btn"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", null, "WALLET"))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_router_dom__WEBPACK_IMPORTED_MODULE_2__.NavLink, {
    to: `/billing/payment/card/${id}`
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    className: "debit-credit-btn",
    id: "debit-credit-btn"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", null, "CARD")))));
}
/* harmony default export */ __webpack_exports__["default"] = (PaymentNavigationComponent);

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
//# sourceMappingURL=src_views_BillingPayment_jsx.js.map