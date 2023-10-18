"use strict";
(self["webpackChunkorb_products_services"] = self["webpackChunkorb_products_services"] || []).push([["src_views_ClientSelections_jsx"],{

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

/***/ "./src/views/ClientSelections.jsx":
/*!****************************************!*\
  !*** ./src/views/ClientSelections.jsx ***!
  \****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _controllers_servicesSlice_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../controllers/servicesSlice.js */ "./src/controllers/servicesSlice.js");
/* harmony import */ var _controllers_clientSlice_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../controllers/clientSlice.js */ "./src/controllers/clientSlice.js");
/* harmony import */ var _controllers_quoteSlice_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../controllers/quoteSlice.js */ "./src/controllers/quoteSlice.js");
/* harmony import */ var _loading_LoadingComponent_jsx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../loading/LoadingComponent.jsx */ "./src/loading/LoadingComponent.jsx");
/* harmony import */ var _components_StatusBar_jsx__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/StatusBar.jsx */ "./src/views/components/StatusBar.jsx");








function SelectionsComponent() {
  const dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useDispatch)();
  const [messageType, setMessageType] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('info');
  const [message, setMessage] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('Check the boxes next to the services you would like performed.');
  const [checkedItems, setCheckedItems] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
  const {
    servicesLoading,
    services
  } = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useSelector)(state => state.services);
  const {
    user_email,
    stripe_customer_id
  } = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useSelector)(state => state.client);
  const {
    loading,
    quotes,
    quoteError,
    quote_id,
    status,
    selections,
    total,
    stripe_quote_id
  } = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useSelector)(state => state.quote);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (user_email) {
      dispatch((0,_controllers_clientSlice_js__WEBPACK_IMPORTED_MODULE_3__.getClient)()).then(response => {
        if (response.error !== undefined) {
          console.error(response.error.message);
          setMessageType('error');
          setMessage(response.error.message);
        }
      });
    }
  }, [user_email, dispatch]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (stripe_customer_id) {
      dispatch((0,_controllers_quoteSlice_js__WEBPACK_IMPORTED_MODULE_4__.getClientQuotes)()).then(response => {
        if (response.error !== undefined) {
          console.error(response.error.message);
          setMessageType('error');
          setMessage(response.error.message);
        }
      });
    }
  }, [stripe_customer_id, dispatch]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (quotes) {
      const filteredQuotes = [];
      quotes.forEach(quote => {
        const timestampNow = Math.floor(Date.now() / 1000);
        const timestamp = parseInt(quote.expires_at);
        const createdAt = new Date(quote.created_at).getTime();
        const status = quote.status;
        if (timestampNow < timestamp) {
          if (status === 'draft' || status === 'open' || status === 'accepted') {
            filteredQuotes.push(createdAt);
          }
        }
      });
      if (filteredQuotes.length > 0) {
        const earliestDate = Math.min(...filteredQuotes);
        quotes.forEach(quote => {
          if (new Date(quote.created_at).getTime() === earliestDate) {
            dispatch((0,_controllers_quoteSlice_js__WEBPACK_IMPORTED_MODULE_4__.getQuote)(quote.stripe_quote_id)).then(response => {
              if (response.error !== undefined) {
                console.error(response.error.message);
                setMessageType('error');
                setMessage(response.error.message);
              }
            });
          }
        });
      }
    }
  }, [quotes, dispatch]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (stripe_quote_id) {
      dispatch((0,_controllers_quoteSlice_js__WEBPACK_IMPORTED_MODULE_4__.getQuote)()).then(response => {
        if (response.error !== undefined) {
          console.error(response.error.message);
          setMessageType('error');
          setMessage(response.error.message);
        }
      });
    }
  }, [stripe_quote_id, dispatch]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (stripe_customer_id) {
      dispatch((0,_controllers_servicesSlice_js__WEBPACK_IMPORTED_MODULE_2__.fetchServices)()).then(response => {
        if (response.error !== undefined) {
          console.error(response.error.message);
          setMessageType('error');
          setMessage(response.error.message);
        }
      });
    }
  }, [stripe_customer_id, dispatch]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    dispatch((0,_controllers_quoteSlice_js__WEBPACK_IMPORTED_MODULE_4__.addSelections)(checkedItems));
  }, [dispatch, checkedItems]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    dispatch((0,_controllers_quoteSlice_js__WEBPACK_IMPORTED_MODULE_4__.calculateSelections)(services.cost));
  }, [dispatch, services.cost, checkedItems]);
  const handleCheckboxChange = (event, id, price_id, description, cost) => {
    const isChecked = event.target.checked;
    setCheckedItems(prevItems => {
      if (isChecked) {
        const newItem = {
          id,
          price_id,
          description,
          cost
        };
        return [...prevItems, newItem];
      } else {
        return prevItems.filter(item => item.id !== id);
      }
    });
  };
  const handleClick = () => {
    if (selections.length === 0) {
      setMessageType('error');
    } else if (stripe_quote_id && status === 'canceled' && selections.length > 0 || stripe_quote_id === '' && status === '' && selections.length > 0 && stripe_customer_id) {
      dispatch((0,_controllers_quoteSlice_js__WEBPACK_IMPORTED_MODULE_4__.createQuote)(selections)).then(response => {
        if (response.error !== undefined) {
          console.error(response.error.message);
          setMessageType('error');
          setMessage(response.error.message);
        }
      });
    } else if (stripe_quote_id && status === 'draft' && selections.length > 0) {
      dispatch((0,_controllers_quoteSlice_js__WEBPACK_IMPORTED_MODULE_4__.updateStripeQuote)()).then(response => {
        if (response.error !== undefined) {
          console.error(response.error.message);
          setMessageType('error');
          setMessage(response.error.message);
        }
      });
    } else if (stripe_quote_id && status === 'draft') {
      dispatch((0,_controllers_quoteSlice_js__WEBPACK_IMPORTED_MODULE_4__.finalizeQuote)()).then(response => {
        if (response.error !== undefined) {
          console.error(response.error.message);
          setMessageType('error');
          setMessage(response.error.message);
        }
      });
    } else if (quote_id && (status === 'open' || status === 'accepted')) {
      window.location.href = `/billing/quote/${quote_id}`;
    }
  };
  if (servicesLoading) {
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_loading_LoadingComponent_jsx__WEBPACK_IMPORTED_MODULE_5__["default"], null);
  }
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", null, "SELECTIONS"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "quote-card card"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("table", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("thead", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", {
    colSpan: 2
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", {
    className: "description-label"
  }, "DESCRIPTION")), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", {
    className: "cost-label"
  }, "COST")))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("tbody", null, services && services.length ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, services.map(service => {
    const {
      id,
      price_id,
      description,
      cost
    } = service;
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", {
      key: price_id,
      id: "quote_option"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
      className: "input selection feature-selection",
      type: "checkbox",
      name: "quote[checkbox][]",
      checked: checkedItems.some(item => item.price_id === price_id),
      onChange: event => handleCheckboxChange(event, id, price_id, description, cost)
    })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", {
      className: "feature-description"
    }, description), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", {
      className: "feature-cost table-number",
      id: "feature_cost"
    }, new Intl.NumberFormat('us', {
      style: 'currency',
      currency: 'USD'
    }).format(cost)));
  })) : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", {
    colSpan: 3
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", null, "No features to show yet")))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("tfoot", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", {
    colSpan: 2
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", {
    className: "subtotal-label"
  }, "TOTAL")), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", {
    className: "subtotal"
  }, new Intl.NumberFormat('us', {
    style: 'currency',
    currency: 'USD'
  }).format(total))))))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_StatusBar_jsx__WEBPACK_IMPORTED_MODULE_6__["default"], {
    message: message,
    messageType: messageType
  }), quote_id && (status === 'open' || status === 'accepted') ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    onClick: handleClick
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", null, "QUOTE")) : '');
}
/* harmony default export */ __webpack_exports__["default"] = (SelectionsComponent);

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
//# sourceMappingURL=src_views_ClientSelections_jsx.js.map