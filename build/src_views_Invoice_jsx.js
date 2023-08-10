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
/* harmony import */ var _controllers_quoteSlice_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../controllers/quoteSlice.js */ "./src/controllers/quoteSlice.js");
/* harmony import */ var _controllers_invoiceSlice_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../controllers/invoiceSlice.js */ "./src/controllers/invoiceSlice.js");
/* harmony import */ var _controllers_paymentSlice_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../controllers/paymentSlice.js */ "./src/controllers/paymentSlice.js");









function InvoiceComponent() {
  const {
    id
  } = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_8__.useParams)();
  const {
    user_email,
    stripe_customer_id
  } = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__.useSelector)(state => state.client);
  const {
    loading,
    error,
    status,
    quote_id,
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
    event_id,
    due_date,
    amount_due,
    subtotal,
    tax,
    payment_intent_id,
    items
  } = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__.useSelector)(state => state.invoice);
  const {
    client_secret
  } = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__.useSelector)(state => state.payment);
  const dueDate = new Date(due_date * 1000).toLocaleString();
  const amountDue = amount_due / 100;
  const subTotal = subtotal / 100;
  const Tax = tax / 100;
  const grandTotal = amount_due / 100;
  const dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__.useDispatch)();
  const navigate = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_8__.useNavigate)();
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (user_email) {
      dispatch((0,_controllers_clientSlice_js__WEBPACK_IMPORTED_MODULE_3__.getClient)());
    }
  }, [user_email, dispatch]);
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (stripe_customer_id) {
      dispatch((0,_controllers_customerSlice_js__WEBPACK_IMPORTED_MODULE_4__.getStripeCustomer)());
    }
  }, [stripe_customer_id, dispatch]);
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (stripe_customer_id) {
      dispatch((0,_controllers_invoiceSlice_js__WEBPACK_IMPORTED_MODULE_6__.getInvoice)(id));
    }
  }, [id, stripe_customer_id, dispatch]);
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (stripe_invoice_id) {
      dispatch((0,_controllers_invoiceSlice_js__WEBPACK_IMPORTED_MODULE_6__.getStripeInvoice)(stripe_invoice_id));
    }
  }, [stripe_invoice_id, dispatch]);
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (quote_id && stripe_customer_id) {
      dispatch((0,_controllers_quoteSlice_js__WEBPACK_IMPORTED_MODULE_5__.getQuote)(quote_id));
    }
  }, [quote_id, stripe_customer_id, dispatch]);
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (payment_intent_id) {
      dispatch((0,_controllers_paymentSlice_js__WEBPACK_IMPORTED_MODULE_7__.getPaymentIntent)());
    }
  }, [payment_intent_id, dispatch]);

  //Event id mast be validated
  const handleClick = async () => {
    if (status === 'paid') {
      navigate(`/services/receipt/${id}`);
    } else if (status === 'open' && event_id && client_secret) {
      navigate(`/services/payment/${id}`);
    } else if (status === 'open' && client_secret) {
      navigate(`/services/schedule/${id}`);
    } else if (stripe_invoice_id) {
      await dispatch((0,_controllers_invoiceSlice_js__WEBPACK_IMPORTED_MODULE_6__.finalizeInvoice)()).then(() => {
        dispatch((0,_controllers_invoiceSlice_js__WEBPACK_IMPORTED_MODULE_6__.getInvoice)(id));
      }).then(() => {
        navigate(`/services/schedule/${id}`);
      });
    }
  };
  console.log(customer_tax_ids.length);
  if (error) {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("main", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "status-bar card error"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, "You have either entered the wrong Invoice ID, or you are not the client to whom this invoice belongs.")));
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
    colSpan: 2
  }, customer_name), Array.isArray(customer_tax_ids) && customer_tax_ids.length > 0 && customer_tax_ids.map((tax, index) => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", {
    className: "bill-to-tax-id-type",
    key: index
  }, tax.type), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", {
    className: "bill-to-tax-id",
    key: index
  }, tax.value)))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", {
    className: "bill-to-address"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", {
    colSpan: 2
  }, address_line_1), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null, address_line_2)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", {
    className: "bill-to-city"
  }, city), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", {
    className: "bill-to-state"
  }, state), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", {
    className: "bill-to-zipcode"
  }, postal_code)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", {
    className: "bill-to-phone"
  }, customer_phone), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", {
    className: "bill-to-email",
    colSpan: 2
  }, customer_email), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", {
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
  }, "TOTAL")))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("tbody", null, items && items.length > 0 && items.map(item => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", {
    id: "quote_option"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", {
    className: "feature-id"
  }, item.price.product), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", {
    className: "feature-name",
    id: "feature_name",
    colSpan: 4
  }, item.description), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", {
    className: "feature-cost  table-number",
    id: "feature_cost"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", null, new Intl.NumberFormat('us', {
    style: 'currency',
    currency: 'USD'
  }).format(item.amount / 100)))))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("tfoot", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", {
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
  }, status === 'paid' ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", null, "RECEIPT") : (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", null, "SCHEDULE")));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (InvoiceComponent);

/***/ })

}]);
//# sourceMappingURL=src_views_Invoice_jsx.js.map