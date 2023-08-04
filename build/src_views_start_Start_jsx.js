"use strict";
(self["webpackChunkorb_services"] = self["webpackChunkorb_services"] || []).push([["src_views_start_Start_jsx"],{

/***/ "./src/views/start/Client.jsx":
/*!************************************!*\
  !*** ./src/views/start/Client.jsx ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router/dist/index.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _controllers_clientSlice__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../controllers/clientSlice */ "./src/controllers/clientSlice.js");
/* harmony import */ var _controllers_customerSlice_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../controllers/customerSlice.js */ "./src/controllers/customerSlice.js");






function ClientComponent() {
  const dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__.useDispatch)();
  const navigate = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_5__.useNavigate)();
  const [messageType, setMessageType] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
  const [message, setMessage] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('To receive a quote, please fill out the form above with the required information.');
  const {
    loading,
    error,
    user_email,
    client_id,
    stripe_customer_id
  } = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__.useSelector)(state => state.client);
  const {
    first_name,
    last_name,
    zipcode
  } = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__.useSelector)(state => state.customer);
  const handleCompanyNameChange = event => {
    dispatch((0,_controllers_customerSlice_js__WEBPACK_IMPORTED_MODULE_4__.updateCompanyName)(event.target.value));
  };
  const handleTaxIDChange = event => {
    dispatch((0,_controllers_customerSlice_js__WEBPACK_IMPORTED_MODULE_4__.updateTaxID)(event.target.value));
  };
  const handleFirstNameChange = event => {
    dispatch((0,_controllers_customerSlice_js__WEBPACK_IMPORTED_MODULE_4__.updateFirstName)(event.target.value));
  };
  const handleLastNameChange = event => {
    dispatch((0,_controllers_customerSlice_js__WEBPACK_IMPORTED_MODULE_4__.updateLastName)(event.target.value));
  };
  const handlePhoneChange = event => {
    dispatch((0,_controllers_customerSlice_js__WEBPACK_IMPORTED_MODULE_4__.updatePhone)(event.target.value));
  };
  const handleAddressChange = event => {
    dispatch((0,_controllers_customerSlice_js__WEBPACK_IMPORTED_MODULE_4__.updateAddress)(event.target.value));
  };
  const handleAddressChange2 = event => {
    dispatch((0,_controllers_customerSlice_js__WEBPACK_IMPORTED_MODULE_4__.updateAddress2)(event.target.value));
  };
  const handleCityChange = event => {
    dispatch((0,_controllers_customerSlice_js__WEBPACK_IMPORTED_MODULE_4__.updateCity)(event.target.value));
  };
  const handleStateChange = event => {
    dispatch((0,_controllers_customerSlice_js__WEBPACK_IMPORTED_MODULE_4__.updateState)(event.target.value));
  };
  const handleZipcodeChange = event => {
    dispatch((0,_controllers_customerSlice_js__WEBPACK_IMPORTED_MODULE_4__.updateZipcode)(event.target.value));
  };
  const [isFomCompleted, setIsFormCompleted] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (user_email) {
      dispatch((0,_controllers_clientSlice__WEBPACK_IMPORTED_MODULE_3__.getClient)(user_email));
    }
  }, [user_email, dispatch]);
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (stripe_customer_id) {
      navigate('/services/selections');
    }
  }, [stripe_customer_id, navigate]);
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (first_name && last_name && zipcode) {
      setIsFormCompleted(true);
    }
  }, [first_name, last_name, zipcode]);
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (isFomCompleted) {
      dispatch((0,_controllers_clientSlice__WEBPACK_IMPORTED_MODULE_3__.addClient)());
    }
  }, [isFomCompleted, dispatch]);
  const handleClick = () => {
    if (first_name === '') {
      setMessage('Please provide a first name.');
      setMessageType('error');
    } else if (last_name === '') {
      setMessage('Please provide last name.');
      setMessageType('error');
    } else if (zipcode === '') {
      setMessage('Please provide zipcode.');
      setMessageType('error');
    } else if (client_id && stripe_customer_id) {
      navigate('/services/quote');
    }
  };
  if (error) {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("main", {
      className: "error"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "status-bar card"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      className: "error"
    }, "\"We encountered an issue while loading this page. Please try again, and if the problem persists, kindly contact the website administrators for assistance.\"")));
  }

  // Create loading animation
  if (loading) {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("main", null, "Loading...");
  }
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", {
    className: "title"
  }, "CLIENT DETAILS"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "client-details card",
    id: "client-details"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("form", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("table", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("thead", null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("tbody", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", {
    colSpan: 2
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    className: "input",
    name: "company_name",
    id: "company_name",
    placeholder: "Company Name",
    onChange: handleCompanyNameChange
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    className: "input",
    name: "tax_id",
    id: "tax_id",
    placeholder: "Tax ID",
    onChange: handleTaxIDChange
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    className: "input",
    name: "first_name",
    id: "first_name",
    placeholder: "First Name",
    onChange: handleFirstNameChange
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    className: "input",
    name: "last_name",
    id: "last_name",
    placeholder: "Last Name",
    onChange: handleLastNameChange
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    className: "input",
    name: "phone",
    type: "tel",
    placeholder: "Phone",
    onChange: handlePhoneChange
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", {
    colSpan: 2
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    className: "input",
    name: "address_line_1",
    id: "bill_to_street",
    placeholder: "Street Address",
    onChange: handleAddressChange
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    className: "input",
    name: "address_line_2",
    id: "bill_to_street2",
    placeholder: "Suite #",
    onChange: handleAddressChange2
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    className: "input",
    name: "city",
    id: "bill_to_city",
    placeholder: "City",
    onChange: handleCityChange
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    className: "input",
    name: "state",
    id: "bill_to_state",
    placeholder: "State",
    onChange: handleStateChange
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    className: "input",
    name: "zipcode",
    id: "bill_to_zipcode",
    placeholder: "Zipcode",
    onChange: handleZipcodeChange
  })))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("tfoot", null)))), message && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "status-bar card"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: `${messageType}`
  }, message)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    id: "quote_button",
    onClick: handleClick
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", null, "QUOTE")));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ClientComponent);

/***/ }),

/***/ "./src/views/start/Start.jsx":
/*!***********************************!*\
  !*** ./src/views/start/Start.jsx ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Client */ "./src/views/start/Client.jsx");


function Start() {
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Client__WEBPACK_IMPORTED_MODULE_1__["default"], null));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Start);

/***/ })

}]);
//# sourceMappingURL=src_views_start_Start_jsx.js.map