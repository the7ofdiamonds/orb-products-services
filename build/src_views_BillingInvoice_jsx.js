"use strict";
(self["webpackChunkorb_products_services"] = self["webpackChunkorb_products_services"] || []).push([["src_views_BillingInvoice_jsx"],{

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

/***/ "./src/views/BillingInvoice.jsx":
/*!**************************************!*\
  !*** ./src/views/BillingInvoice.jsx ***!
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
/* harmony import */ var _loading_LoadingComponent_jsx__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../loading/LoadingComponent.jsx */ "./src/loading/LoadingComponent.jsx");
/* harmony import */ var _error_ErrorComponent_jsx__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../error/ErrorComponent.jsx */ "./src/error/ErrorComponent.jsx");
/* harmony import */ var _components_StatusBar_jsx__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./components/StatusBar.jsx */ "./src/views/components/StatusBar.jsx");












function InvoiceComponent() {
  const {
    id
  } = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_10__.useParams)();
  const [messageType, setMessageType] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('info');
  const [message, setMessage] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('To start receiving the services listed above, please use the payment button below.');
  const {
    user_email
  } = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useSelector)(state => state.client);
  const {
    invoiceLoading,
    invoiceError,
    status,
    customer_name,
    customer_tax_ids,
    address_line_1,
    address_line_2,
    city,
    state,
    postal_code,
    customer_phone,
    customer_email,
    stripe_invoice_id,
    due_date,
    amount_due,
    subtotal,
    tax,
    payment_intent_id,
    items
  } = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useSelector)(state => state.invoice);
  const {
    paymentStatus,
    client_secret
  } = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useSelector)(state => state.payment);
  const {
    receipt_id
  } = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useSelector)(state => state.receipt);
  const dueDate = new Date(due_date * 1000).toLocaleString();
  const amountDue = amount_due / 100;
  const subTotal = subtotal / 100;
  const Tax = tax / 100;
  const grandTotal = amount_due / 100;
  const dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useDispatch)();
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (user_email) {
      dispatch((0,_controllers_clientSlice_js__WEBPACK_IMPORTED_MODULE_2__.getClient)()).then(response => {
        if (response.error !== undefined) {
          console.error(response.error.message);
          setMessageType('error');
          setMessage(response.error.message);
        } else {
          dispatch((0,_controllers_customerSlice_js__WEBPACK_IMPORTED_MODULE_3__.getStripeCustomer)()).then(response => {
            if (response.error !== undefined) {
              console.error(response.error.message);
              setMessageType('error');
              setMessage(response.error.message);
            } else {
              dispatch((0,_controllers_invoiceSlice_js__WEBPACK_IMPORTED_MODULE_4__.getInvoiceByID)(id)).then(response => {
                if (response.error !== undefined) {
                  console.error(response.error.message);
                  setMessageType('error');
                  setMessage(response.error.message);
                } else {
                  dispatch((0,_controllers_invoiceSlice_js__WEBPACK_IMPORTED_MODULE_4__.getStripeInvoice)(response.payload.stripe_invoice_id)).then(response => {
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
  }, [user_email, dispatch]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (payment_intent_id) {
      dispatch((0,_controllers_paymentSlice_js__WEBPACK_IMPORTED_MODULE_5__.getPaymentIntent)()).then(response => {
        if (response.error !== undefined) {
          console.error(response.error.message);
          setMessageType('error');
          setMessage(response.error.message);
        }
      });
    }
  }, [payment_intent_id, dispatch]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (status === 'paid' && stripe_invoice_id) {
      dispatch((0,_controllers_receiptSlice_js__WEBPACK_IMPORTED_MODULE_6__.getReceipt)()).then(response => {
        if (response.error !== undefined) {
          console.error(response.error.message);
          setMessageType('error');
          setMessage(response.error.message);
        } else {
          console.log(response.payload.id);
          (0,_controllers_receiptSlice_js__WEBPACK_IMPORTED_MODULE_6__.updateReceiptID)(response.payload.id);
        }
      });
    }
  }, [stripe_invoice_id, status, dispatch]);
  const handleClick = async () => {
    if (status === 'paid' && receipt_id) {
      window.location.href = `/billing/receipt/${receipt_id}`;
    } else if (status === 'open' && client_secret) {
      window.location.href = `/billing/payment/${id}`;
    } else if (status === 'draft' && stripe_invoice_id) {
      dispatch((0,_controllers_invoiceSlice_js__WEBPACK_IMPORTED_MODULE_4__.finalizeInvoice)()).then(response => {
        if (response.error !== undefined) {
          console.error(response.error.message);
          setMessageType('error');
          setMessage(response.error.message);
        } else {
          dispatch((0,_controllers_paymentSlice_js__WEBPACK_IMPORTED_MODULE_5__.getPaymentIntent)(response.payload.payment_intent_id)).then(response => {
            if (response.error !== undefined) {
              console.error(response.error.message);
              setMessageType('error');
              setMessage(response.error.message);
            } else {
              dispatch((0,_controllers_paymentSlice_js__WEBPACK_IMPORTED_MODULE_5__.updateClientSecret)(response.payload.client_secret)).then(response => {
                if (response.error !== undefined) {
                  console.error(response.error.message);
                  setMessageType('error');
                  setMessage(response.error.message);
                } else {
                  window.location.href = `/billing/receipt/${receipt_id}`;
                }
              });
            }
          });
        }
      });
    }
  };
  if (invoiceLoading) {
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_loading_LoadingComponent_jsx__WEBPACK_IMPORTED_MODULE_7__["default"], null);
  }
  if (invoiceError) {
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_error_ErrorComponent_jsx__WEBPACK_IMPORTED_MODULE_8__["default"], {
      error: invoiceError
    });
  }
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", {
    className: "title"
  }, "INVOICE"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "invoice-card card"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("table", {
    className: "invoice-table",
    id: "service_invoice"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("thead", {
    className: "invoice-table-head",
    id: "service-total-header"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", {
    className: "bill-to-label",
    colSpan: 2
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", null, "BILL TO:")), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", {
    className: "bill-to-name",
    colSpan: 2
  }, customer_name), Array.isArray(customer_tax_ids) && customer_tax_ids.length > 0 && customer_tax_ids.map((tax, index) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", {
    className: "bill-to-tax-id-type",
    key: index
  }, tax.type), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", {
    className: "bill-to-tax-id",
    key: index
  }, tax.value)))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", {
    className: "bill-to-address"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", {
    colSpan: 2
  }, address_line_1), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null, address_line_2)), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", {
    className: "bill-to-city"
  }, city), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", {
    className: "bill-to-state"
  }, state), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", {
    className: "bill-to-zipcode"
  }, postal_code)), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", {
    className: "bill-to-phone"
  }, customer_phone), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null)), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", {
    className: "bill-to-email",
    colSpan: 2
  }, customer_email), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null)), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", {
    className: "bill-to-due"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", {
    className: "bill-to-due-date-label",
    colSpan: 2
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", null, "DUE DATE")), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", {
    className: "bill-to-due-date",
    colSpan: 2
  }, dueDate ? dueDate : 'N/A'), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", {
    className: "bill-to-total-due-label"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", null, "TOTAL DUE")), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", {
    className: "bill-to-total-due"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", null, amount_due ? new Intl.NumberFormat('us', {
    style: 'currency',
    currency: 'USD'
  }).format(amountDue) : 'N/A'))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", {
    className: "invoice-labels"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", {
    className: "number-label"
  }, "NO.")), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", {
    colSpan: 4
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", {
    className: "description-label"
  }, "DESCRIPTION")), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", {
    className: "total-label"
  }, "TOTAL")))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("tbody", null, items && items.length > 0 && items.map(item => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", {
    id: "quote_option"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", {
    className: "feature-id"
  }, item.price.product), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", {
    className: "feature-name",
    id: "feature_name",
    colSpan: 4
  }, item.description), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", {
    className: "feature-cost  table-number",
    id: "feature_cost"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", null, new Intl.NumberFormat('us', {
    style: 'currency',
    currency: 'USD'
  }).format(item.amount / 100)))))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("tfoot", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", {
    className: "subtotal-label"
  }, "SUBTOTAL")), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", {
    className: "subtotal table-number"
  }, new Intl.NumberFormat('us', {
    style: 'currency',
    currency: 'USD'
  }).format(subTotal)))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", {
    className: "tax-label"
  }, "TAX")), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", {
    className: "tax table-number"
  }, new Intl.NumberFormat('us', {
    style: 'currency',
    currency: 'USD'
  }).format(Tax)))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", {
    className: "grand-total-label"
  }, "GRAND TOTAL")), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", {
    className: "grand-total table-number"
  }, new Intl.NumberFormat('us', {
    style: 'currency',
    currency: 'USD'
  }).format(grandTotal))))))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_StatusBar_jsx__WEBPACK_IMPORTED_MODULE_9__["default"], {
    message: message,
    messageType: messageType
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    onClick: handleClick
  }, status === 'paid' && receipt_id || paymentStatus === 'succeeded' && receipt_id ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", null, "RECEIPT") : status === 'open' && client_secret ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", null, "PAYMENT") : ''));
}
/* harmony default export */ __webpack_exports__["default"] = (InvoiceComponent);

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
//# sourceMappingURL=src_views_BillingInvoice_jsx.js.map