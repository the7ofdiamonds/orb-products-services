"use strict";
(self["webpackChunkorb_services"] = self["webpackChunkorb_services"] || []).push([["src_views_Invoice_jsx"],{

/***/ "./src/views/Invoice.jsx":
/*!*******************************!*\
  !*** ./src/views/Invoice.jsx ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router/dist/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _controllers_clientSlice_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../controllers/clientSlice.js */ "./src/controllers/clientSlice.js");
/* harmony import */ var _controllers_customerSlice_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../controllers/customerSlice.js */ "./src/controllers/customerSlice.js");
/* harmony import */ var _controllers_scheduleSlice_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../controllers/scheduleSlice.js */ "./src/controllers/scheduleSlice.js");
/* harmony import */ var _controllers_invoiceSlice_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../controllers/invoiceSlice.js */ "./src/controllers/invoiceSlice.js");
/* harmony import */ var _controllers_paymentSlice_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../controllers/paymentSlice.js */ "./src/controllers/paymentSlice.js");









function InvoiceComponent() {
  const {
    id
  } = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_8__.useParams)();
  const {
    user_email,
    first_name,
    last_name,
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
    event_id
  } = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__.useSelector)(state => state.schedule);
  const {
    loading,
    error,
    status,
    stripe_invoice_id,
    due_date,
    amount_due,
    selections,
    subtotal,
    tax,
    payment_intent_id
  } = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__.useSelector)(state => state.invoice);
  const {
    client_secret
  } = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__.useSelector)(state => state.payment);
  const dueDate = new Date(due_date * 1000).toLocaleString();
  const amountDue = amount_due;
  const subTotal = subtotal;
  const Tax = tax;
  const grandTotal = amount_due;
  const dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__.useDispatch)();
  const navigate = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_8__.useNavigate)();
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
      dispatch((0,_controllers_invoiceSlice_js__WEBPACK_IMPORTED_MODULE_6__.getInvoice)(id, stripe_customer_id));
    }
  }, [dispatch, id, stripe_customer_id]);
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (stripe_invoice_id) {
      dispatch((0,_controllers_invoiceSlice_js__WEBPACK_IMPORTED_MODULE_6__.getStripeInvoice)(stripe_invoice_id));
    }
  }, [dispatch, stripe_invoice_id]);
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (event_id) {
      dispatch((0,_controllers_scheduleSlice_js__WEBPACK_IMPORTED_MODULE_5__.saveEvent)());
    }
  }, [event_id, dispatch]);
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (payment_intent_id) {
      dispatch((0,_controllers_paymentSlice_js__WEBPACK_IMPORTED_MODULE_7__.getPaymentIntent)());
    }
  }, [payment_intent_id, dispatch]);
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (status && payment_intent_id && client_secret) {
      dispatch((0,_controllers_invoiceSlice_js__WEBPACK_IMPORTED_MODULE_6__.updateInvoice)());
    }
  }, [status, payment_intent_id, client_secret, dispatch]);
  const handleClick = () => {
    if (status === 'paid') {
      navigate(`/services/receipt/${id}`);
    } else if (status === 'open' && client_secret) {
      navigate(`/services/payment/${id}`);
    } else if (stripe_invoice_id) {
      dispatch((0,_controllers_paymentSlice_js__WEBPACK_IMPORTED_MODULE_7__.finalizeInvoice)());
      dispatch((0,_controllers_scheduleSlice_js__WEBPACK_IMPORTED_MODULE_5__.sendInvites)());
    }
  };
  if (error) {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("main", {
      className: "error"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "status-bar card"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      className: "error"
    }, "You have either entered the wrong Invoice ID, or you are not the client to whom this invoice belongs.")));
  }
  if (loading) {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, "Loading...");
  }
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", {
    className: "title"
  }, "INVOICE"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "invoice-card card"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("table", {
    className: "invoice-table",
    id: "service_invoice"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("thead", {
    className: "invoice-table-head",
    id: "service-total-header"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", {
    className: "bill-to-label",
    colSpan: 2
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", null, "BILL TO:")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", {
    className: "bill-to-name",
    colSpan: 4
  }, first_name, " ", last_name, " O/B/O ", company_name)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", {
    className: "bill-to-address"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", {
    colSpan: 2
  }, address_line_1), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null, address_line_2)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", {
    className: "bill-to-city"
  }, city), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", {
    className: "bill-to-state"
  }, state), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", {
    className: "bill-to-zipcode"
  }, zipcode)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", {
    className: "bill-to-phone"
  }, phone), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", {
    className: "bill-to-email",
    colSpan: 2
  }, user_email), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", {
    className: "bill-to-due"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", {
    className: "bill-to-due-date-label",
    colSpan: 2
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", null, "DUE DATE")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", {
    className: "bill-to-due-date",
    colSpan: 2
  }, dueDate ? dueDate : 'N/A'), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", {
    className: "bill-to-total-due-label"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", null, "TOTAL DUE")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", {
    className: "bill-to-total-due"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", null, amount_due ? new Intl.NumberFormat('us', {
    style: 'currency',
    currency: 'USD'
  }).format(amountDue) : 'N/A'))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", {
    className: "invoice-labels"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", {
    className: "number-label"
  }, "NO.")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", {
    colSpan: 4
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", {
    className: "description-label"
  }, "DESCRIPTION")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", {
    className: "total-label"
  }, "TOTAL")))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("tbody", null, selections && selections.length > 0 && selections.map(selection => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", {
    id: "quote_option"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", {
    className: "feature-id"
  }, selection.id), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", {
    className: "feature-name",
    id: "feature_name",
    colSpan: 4
  }, selection.description), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", {
    className: "feature-cost  table-number",
    id: "feature_cost"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", null, new Intl.NumberFormat('us', {
    style: 'currency',
    currency: 'USD'
  }).format(selection.cost)))))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("tfoot", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", {
    className: "subtotal-label"
  }, "SUBTOTAL")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", {
    className: "subtotal table-number"
  }, new Intl.NumberFormat('us', {
    style: 'currency',
    currency: 'USD'
  }).format(subTotal)))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", {
    className: "tax-label"
  }, "TAX")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", {
    className: "tax table-number"
  }, new Intl.NumberFormat('us', {
    style: 'currency',
    currency: 'USD'
  }).format(Tax)))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", {
    className: "grand-total-label"
  }, "GRAND TOTAL")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", {
    className: "grand-total table-number"
  }, new Intl.NumberFormat('us', {
    style: 'currency',
    currency: 'USD'
  }).format(grandTotal))))))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    onClick: handleClick
  }, status === 'paid' ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", null, "RECEIPT") : (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", null, "PAYMENT")));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (InvoiceComponent);

/***/ })

}]);
//# sourceMappingURL=src_views_Invoice_jsx.js.map