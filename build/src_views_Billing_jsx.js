"use strict";
(self["webpackChunkorb_products_services"] = self["webpackChunkorb_products_services"] || []).push([["src_views_Billing_jsx"],{

/***/ "./src/views/Billing.jsx":
/*!*******************************!*\
  !*** ./src/views/Billing.jsx ***!
  \*******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _billing_UserReceipt__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./billing/UserReceipt */ "./src/views/billing/UserReceipt.jsx");
/* harmony import */ var _billing_UserInvoice__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./billing/UserInvoice */ "./src/views/billing/UserInvoice.jsx");
/* harmony import */ var _billing_UserQuote__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./billing/UserQuote */ "./src/views/billing/UserQuote.jsx");





function Billing() {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("section", {
    className: "billing"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", {
    className: "title"
  }, "billing"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_billing_UserReceipt__WEBPACK_IMPORTED_MODULE_1__["default"], null), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_billing_UserInvoice__WEBPACK_IMPORTED_MODULE_2__["default"], null), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_billing_UserQuote__WEBPACK_IMPORTED_MODULE_3__["default"], null)));
}
/* harmony default export */ __webpack_exports__["default"] = (Billing);

/***/ }),

/***/ "./src/views/billing/UserInvoice.jsx":
/*!*******************************************!*\
  !*** ./src/views/billing/UserInvoice.jsx ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _controllers_clientSlice__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../controllers/clientSlice */ "./src/controllers/clientSlice.js");
/* harmony import */ var _controllers_invoiceSlice__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../controllers/invoiceSlice */ "./src/controllers/invoiceSlice.js");





function UserInvoiceComponent() {
  const dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useDispatch)();
  const {
    user_email,
    stripe_customer_id
  } = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useSelector)(state => state.client);
  const {
    invoiceLoading,
    invoiceError,
    invoices
  } = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useSelector)(state => state.invoice);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (user_email) {
      dispatch((0,_controllers_clientSlice__WEBPACK_IMPORTED_MODULE_2__.getClient)());
    }
  }, [user_email, dispatch]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (stripe_customer_id) {
      dispatch((0,_controllers_invoiceSlice__WEBPACK_IMPORTED_MODULE_3__.getClientInvoices)());
    }
  }, [stripe_customer_id, dispatch]);
  if (invoiceLoading) {
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, "Loading...");
  }
  if (invoiceError) {
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "status-bar card error"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", null, invoiceError))));
  }
  const now = new Date().getTime();
  let sortedInvoices = [];
  if (Array.isArray(invoices)) {
    sortedInvoices = invoices.slice().sort((a, b) => {
      const timeDiffA = Math.abs(a.due_date - now);
      const timeDiffB = Math.abs(b.due_date - now);
      return timeDiffA - timeDiffB;
    });
  }
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, Array.isArray(sortedInvoices) && sortedInvoices.length > 0 ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "card invoice"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("table", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("thead", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", null, "Invoice ID")), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", null, "Status")), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", null, "Balance")), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", null, "Due Date")), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", null, "Quote ID")), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", null, "Page")))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("tbody", null, sortedInvoices.map(invoice => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null, invoice.id), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null, invoice.status), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null, new Intl.NumberFormat('us', {
    style: 'currency',
    currency: 'USD'
  }).format(invoice.amount_remaining)), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null, invoice.due_date ? new Date(invoice.due_date * 1000).toLocaleString() : ''), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null, invoice.quote_id), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null, invoice.status === 'deleted' ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h5", null, "Deleted") : invoice.status === 'paid' ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: `/services/invoice/${invoice.id}`
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h5", null, "View"))) : invoice.status === 'void' ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h5", null, "Void") : invoice.status === 'uncollectible' ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h5", null, "Uncollectible") : invoice.status === 'open' ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: `/services/invoice/${invoice.id}`
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h5", null, "Continue")) : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    onClick: async () => await dispatch((0,_controllers_invoiceSlice__WEBPACK_IMPORTED_MODULE_3__.deleteInvoice)(invoice.stripe_invoice_id)).then(() => {
      dispatch((0,_controllers_invoiceSlice__WEBPACK_IMPORTED_MODULE_3__.getClientInvoices)());
    })
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h5", null, "Delete")))))))))) : '');
}
/* harmony default export */ __webpack_exports__["default"] = (UserInvoiceComponent);

/***/ }),

/***/ "./src/views/billing/UserQuote.jsx":
/*!*****************************************!*\
  !*** ./src/views/billing/UserQuote.jsx ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _controllers_clientSlice__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../controllers/clientSlice */ "./src/controllers/clientSlice.js");
/* harmony import */ var _controllers_quoteSlice__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../controllers/quoteSlice */ "./src/controllers/quoteSlice.js");





function UserQuoteComponent() {
  const dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useDispatch)();
  const {
    user_email,
    stripe_customer_id
  } = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useSelector)(state => state.client);
  const {
    loading,
    quoteError,
    quotes,
    pdf
  } = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useSelector)(state => state.quote);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (user_email) {
      dispatch((0,_controllers_clientSlice__WEBPACK_IMPORTED_MODULE_2__.getClient)());
    }
  }, [user_email, dispatch]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (stripe_customer_id) {
      dispatch((0,_controllers_quoteSlice__WEBPACK_IMPORTED_MODULE_3__.getClientQuotes)());
    }
  }, [stripe_customer_id, dispatch]);
  if (quoteError) {
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "status-bar card error"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", null, quoteError))));
  }
  if (loading) {
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, "Loading...");
  }
  const now = new Date().getTime();
  let sortedQuotes = [];
  if (Array.isArray(quotes)) {
    sortedQuotes = quotes.slice().sort((a, b) => {
      const timeDiffA = Math.abs(a.expires_at - now);
      const timeDiffB = Math.abs(b.expires_at - now);
      return timeDiffA - timeDiffB;
    });
  }
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, Array.isArray(sortedQuotes) && sortedQuotes.length > 0 ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "card quote"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("table", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("thead", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", null, "Quote ID")), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", null, "Status")), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", null, "Total")), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", null, "Page")))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("tbody", null, sortedQuotes.map(quote => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null, quote.id), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null, quote.status), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null, new Intl.NumberFormat('us', {
    style: 'currency',
    currency: 'USD'
  }).format(quote.amount_total)), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null, quote.status === 'accepted' ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h5", null, "Accepted") : quote.status === 'canceled' ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h5", null, "Canceled") : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: `/services/quote/${quote.id}`
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h5", null, "Confirm"))))))))) : '');
}
/* harmony default export */ __webpack_exports__["default"] = (UserQuoteComponent);

/***/ }),

/***/ "./src/views/billing/UserReceipt.jsx":
/*!*******************************************!*\
  !*** ./src/views/billing/UserReceipt.jsx ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _controllers_clientSlice__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../controllers/clientSlice */ "./src/controllers/clientSlice.js");
/* harmony import */ var _controllers_receiptSlice__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../controllers/receiptSlice */ "./src/controllers/receiptSlice.js");





function UserReceiptComponent() {
  const dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useDispatch)();
  const {
    user_email,
    stripe_customer_id
  } = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useSelector)(state => state.client);
  const {
    loading,
    receiptError,
    receipts
  } = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useSelector)(state => state.receipt);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (user_email) {
      dispatch((0,_controllers_clientSlice__WEBPACK_IMPORTED_MODULE_2__.getClient)());
    }
  }, [user_email, dispatch]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (stripe_customer_id) {
      dispatch((0,_controllers_receiptSlice__WEBPACK_IMPORTED_MODULE_3__.getClientReceipts)());
    }
  }, [stripe_customer_id, dispatch]);
  if (receiptError) {
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "status-bar card error"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", null, receiptError))));
  }
  if (loading) {
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, "Loading...");
  }
  const now = new Date().getTime();
  let sortedReceipts = [];
  if (Array.isArray(receipts)) {
    sortedReceipts = receipts.slice().sort((a, b) => {
      const timeDiffA = Math.abs(a.payment_date - now);
      const timeDiffB = Math.abs(b.payment_date - now);
      return timeDiffA - timeDiffB;
    });
  }
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, Array.isArray(sortedReceipts) && sortedReceipts.length > 0 ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "card receipt"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("table", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("thead", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", null, "Receipt ID")), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", null, "Amount Paid")), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", null, "Balance")), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", null, "Invoice ID")), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", null, "PDF")))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("tbody", null, sortedReceipts.map(receipt => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", {
    key: receipt.id
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null, receipt.id), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null, new Intl.NumberFormat('us', {
    style: 'currency',
    currency: 'USD'
  }).format(receipt.amount_paid)), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null, new Intl.NumberFormat('us', {
    style: 'currency',
    currency: 'USD'
  }).format(receipt.balance)), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null, receipt.invoice_id), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: receipt.receipt_pdf_url,
    target: "_blank"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h5", null, "Download")))))))))) : '');
}
/* harmony default export */ __webpack_exports__["default"] = (UserReceiptComponent);

/***/ })

}]);
//# sourceMappingURL=src_views_Billing_jsx.js.map