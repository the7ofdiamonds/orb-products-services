"use strict";
(self["webpackChunkorb_products_services"] = self["webpackChunkorb_products_services"] || []).push([["src_views_BillingPaymentWallet_jsx"],{

/***/ "./src/views/BillingPaymentWallet.jsx":
/*!********************************************!*\
  !*** ./src/views/BillingPaymentWallet.jsx ***!
  \********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _stripe_react_stripe_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @stripe/react-stripe-js */ "./node_modules/@stripe/react-stripe-js/dist/react-stripe.umd.js");
/* harmony import */ var _stripe_react_stripe_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_stripe_react_stripe_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_PaymentNavigation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/PaymentNavigation */ "./src/views/components/PaymentNavigation.jsx");




const WalletComponent = () => {
  const stripe = (0,_stripe_react_stripe_js__WEBPACK_IMPORTED_MODULE_1__.useStripe)();
  const elements = (0,_stripe_react_stripe_js__WEBPACK_IMPORTED_MODULE_1__.useElements)();
  const {
    setPaymentRequest,
    paymentRequest
  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)();
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (!stripe || !elements) {
      return;
    }
    const paymentRequest = stripe.paymentRequest({
      country: 'US',
      currency: 'usd',
      requestPayerEmail: true,
      requestPayerName: true,
      total: {
        label: 'Total',
        amount: 1000 // Amount in cents
      }
    });

    paymentRequest.canMakePayment().then(result => {
      if (result) {
        setPaymentRequest(paymentRequest);
      }
    });
  }, [stripe, elements, setPaymentRequest]);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_PaymentNavigation__WEBPACK_IMPORTED_MODULE_2__["default"], null), paymentRequest && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_stripe_react_stripe_js__WEBPACK_IMPORTED_MODULE_1__.PaymentRequestButtonElement, {
    options: {
      paymentRequest
    }
  }));
};
/* harmony default export */ __webpack_exports__["default"] = (WalletComponent);

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

/***/ })

}]);
//# sourceMappingURL=src_views_BillingPaymentWallet_jsx.js.map