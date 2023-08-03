"use strict";
(self["webpackChunkorb_services"] = self["webpackChunkorb_services"] || []).push([["src_views_Selections_jsx"],{

/***/ "./src/views/Selections.jsx":
/*!**********************************!*\
  !*** ./src/views/Selections.jsx ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router/dist/index.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _controllers_servicesSlice_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../controllers/servicesSlice.js */ "./src/controllers/servicesSlice.js");
/* harmony import */ var _controllers_clientSlice_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../controllers/clientSlice.js */ "./src/controllers/clientSlice.js");
/* harmony import */ var _controllers_quoteSlice_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../controllers/quoteSlice.js */ "./src/controllers/quoteSlice.js");
/* harmony import */ var _controllers_invoiceSlice_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../controllers/invoiceSlice.js */ "./src/controllers/invoiceSlice.js");








function SelectionsComponent() {
  const {
    loading,
    error,
    services
  } = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__.useSelector)(state => state.services);
  const {
    user_email,
    stripe_customer_id
  } = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__.useSelector)(state => state.client);
  const {
    total,
    selections,
    quote_id
  } = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__.useSelector)(state => state.quote);
  const dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__.useDispatch)();
  const navigate = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_7__.useNavigate)();
  const [checkedItems, setCheckedItems] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (user_email) {
      dispatch((0,_controllers_clientSlice_js__WEBPACK_IMPORTED_MODULE_4__.getClient)());
    }
  }, [user_email, dispatch]);
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (stripe_customer_id) {
      dispatch((0,_controllers_servicesSlice_js__WEBPACK_IMPORTED_MODULE_3__.fetchServices)());
    }
  }, [stripe_customer_id, dispatch]);
  const handleCheckboxChange = (event, price_id, description, cost) => {
    const isChecked = event.target.checked;
    setCheckedItems(prevItems => {
      if (isChecked) {
        const newItem = {
          price_id,
          description,
          cost
        };
        return [...prevItems, newItem];
      } else {
        return prevItems.filter(item => item.price_id !== price_id);
      }
    });
  };
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    dispatch((0,_controllers_quoteSlice_js__WEBPACK_IMPORTED_MODULE_5__.addSelections)(checkedItems));
  }, [dispatch, checkedItems]);
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    dispatch((0,_controllers_quoteSlice_js__WEBPACK_IMPORTED_MODULE_5__.calculateSelections)(services.cost));
  }, [dispatch, services.cost, checkedItems]);
  const handleClick = () => {
    if (selections.length > 0) {
      dispatch((0,_controllers_quoteSlice_js__WEBPACK_IMPORTED_MODULE_5__.createQuote)(selections));
    }
  };
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (total > 0 && quote_id) {
      navigate(`/services/quote/${quote_id}`);
    }
  });
  if (error) {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("main", {
      className: "error"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "status-bar card"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      className: "error"
    }, "There was an error loading the available services at this time.")));
  }
  if (loading) {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, "Loading...");
  }
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", null, "SELECTIONS"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "quote-card card"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("table", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("thead", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", {
    colSpan: 2
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", {
    className: "description-label"
  }, "DESCRIPTION")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", {
    className: "cost-label"
  }, "COST")))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("tbody", null, services && services.length ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)((react__WEBPACK_IMPORTED_MODULE_1___default().Fragment), null, services.map(service => {
    const {
      price_id,
      description,
      cost
    } = service;
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", {
      key: price_id,
      id: "quote_option"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
      className: "input selection feature-selection",
      type: "checkbox",
      name: "quote[checkbox][]",
      checked: checkedItems.some(item => item.price_id === price_id),
      onChange: event => handleCheckboxChange(event, price_id, description, cost)
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", {
      className: "feature-description"
    }, description), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", {
      className: "feature-cost table-number",
      id: "feature_cost"
    }, new Intl.NumberFormat('us', {
      style: 'currency',
      currency: 'USD'
    }).format(cost)));
  })) : (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", {
    colSpan: 3
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", null, "No features to show yet")))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("tfoot", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", {
    colSpan: 2
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", {
    className: "subtotal-label"
  }, "TOTAL")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", {
    className: "subtotal"
  }, new Intl.NumberFormat('us', {
    style: 'currency',
    currency: 'USD'
  }).format(total))))))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    onClick: handleClick
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", null, "QUOTE")));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SelectionsComponent);

/***/ })

}]);
//# sourceMappingURL=src_views_Selections_jsx.js.map