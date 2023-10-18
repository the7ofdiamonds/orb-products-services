"use strict";
(self["webpackChunkorb_products_services"] = self["webpackChunkorb_products_services"] || []).push([["src_views_ClientStart_jsx"],{

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

/***/ "./src/views/ClientStart.jsx":
/*!***********************************!*\
  !*** ./src/views/ClientStart.jsx ***!
  \***********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router/dist/index.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _controllers_clientSlice__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../controllers/clientSlice */ "./src/controllers/clientSlice.js");
/* harmony import */ var _controllers_customerSlice_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../controllers/customerSlice.js */ "./src/controllers/customerSlice.js");
/* harmony import */ var _loading_LoadingComponent__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../loading/LoadingComponent */ "./src/loading/LoadingComponent.jsx");
/* harmony import */ var _components_StatusBar__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/StatusBar */ "./src/views/components/StatusBar.jsx");








function ClientComponent() {
  const dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useDispatch)();
  const navigate = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_6__.useNavigate)();
  const [messageType, setMessageType] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('info');
  const [message, setMessage] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('To receive a quote, please fill out the form above with the required information.');
  const {
    user_email,
    first_name,
    last_name,
    stripe_customer_id
  } = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useSelector)(state => state.client);
  const {
    customerLoading,
    company_name,
    tax_id,
    address_line_1,
    address_line_2,
    city,
    state,
    zipcode,
    phone
  } = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useSelector)(state => state.customer);
  const handleCompanyNameChange = event => {
    dispatch((0,_controllers_customerSlice_js__WEBPACK_IMPORTED_MODULE_3__.updateCompanyName)(event.target.value));
  };
  const handleTaxIDChange = event => {
    dispatch((0,_controllers_customerSlice_js__WEBPACK_IMPORTED_MODULE_3__.updateTaxID)(event.target.value));
  };
  const handleFirstNameChange = event => {
    dispatch((0,_controllers_customerSlice_js__WEBPACK_IMPORTED_MODULE_3__.updateFirstName)(event.target.value));
  };
  const handleLastNameChange = event => {
    dispatch((0,_controllers_customerSlice_js__WEBPACK_IMPORTED_MODULE_3__.updateLastName)(event.target.value));
  };
  const handlePhoneChange = event => {
    dispatch((0,_controllers_customerSlice_js__WEBPACK_IMPORTED_MODULE_3__.updatePhone)(event.target.value));
  };
  const handleAddressChange = event => {
    dispatch((0,_controllers_customerSlice_js__WEBPACK_IMPORTED_MODULE_3__.updateAddress)(event.target.value));
  };
  const handleAddressChange2 = event => {
    dispatch((0,_controllers_customerSlice_js__WEBPACK_IMPORTED_MODULE_3__.updateAddress2)(event.target.value));
  };
  const handleCityChange = event => {
    dispatch((0,_controllers_customerSlice_js__WEBPACK_IMPORTED_MODULE_3__.updateCity)(event.target.value));
  };
  const handleStateChange = event => {
    dispatch((0,_controllers_customerSlice_js__WEBPACK_IMPORTED_MODULE_3__.updateState)(event.target.value));
  };
  const handleZipcodeChange = event => {
    dispatch((0,_controllers_customerSlice_js__WEBPACK_IMPORTED_MODULE_3__.updateZipcode)(event.target.value));
  };
  const [isFomCompleted, setIsFormCompleted] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (user_email) {
      dispatch((0,_controllers_clientSlice__WEBPACK_IMPORTED_MODULE_2__.getClient)(user_email)).then(response => {
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
            }
          });
        }
      });
    }
  }, [user_email, dispatch]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (address_line_1 && city && state && zipcode) {
      setIsFormCompleted(true);
    }
  }, [first_name, last_name, address_line_1, city, state, zipcode]);
  const handleClick = async () => {
    if (first_name === '') {
      setMessage('Please provide a first name.');
      setMessageType('error');
    } else if (last_name === '') {
      setMessage('Please provide last name.');
      setMessageType('error');
    } else if (address_line_1 === '') {
      setMessage('Please provide an address.');
      setMessageType('error');
    } else if (city === '') {
      setMessage('Please provide the city.');
      setMessageType('error');
    } else if (state === '') {
      setMessage('Please provide the state.');
      setMessageType('error');
    } else if (zipcode === '') {
      setMessage('Please provide zipcode.');
      setMessageType('error');
    } else if (isFomCompleted && stripe_customer_id === '' || stripe_customer_id === undefined) {
      dispatch((0,_controllers_clientSlice__WEBPACK_IMPORTED_MODULE_2__.addClient)()).then(response => {
        if (response.error === undefined) {
          window.location.href = '/client/selections';
        } else {
          console.error(response.error.message);
          setMessageType('error');
          setMessage(response.error.message);
        }
      });
    } else if (stripe_customer_id) {
      dispatch((0,_controllers_customerSlice_js__WEBPACK_IMPORTED_MODULE_3__.updateStripeCustomer)()).then(response => {
        if (response.error === undefined) {
          window.location.href = '/client/selections';
        } else {
          console.error(response.error.message);
          setMessageType('error');
          setMessage(response.error.message);
        }
      });
    }
  };
  if (customerLoading) {
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_loading_LoadingComponent__WEBPACK_IMPORTED_MODULE_4__["default"], null);
  }
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", {
    className: "title"
  }, "CLIENT DETAILS"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "client-details card",
    id: "client-details"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("form", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("table", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("thead", null), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("tbody", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", {
    colSpan: 2
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    className: "input",
    name: "company_name",
    id: "company_name",
    placeholder: "Company Name",
    onChange: handleCompanyNameChange,
    value: company_name
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    className: "input",
    name: "tax_id",
    id: "tax_id",
    placeholder: "Tax ID",
    onChange: handleTaxIDChange,
    value: tax_id
  }))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    className: "input",
    name: "first_name",
    id: "first_name",
    placeholder: "First Name",
    onChange: handleFirstNameChange,
    value: first_name
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    className: "input",
    name: "last_name",
    id: "last_name",
    placeholder: "Last Name",
    onChange: handleLastNameChange,
    value: last_name
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    className: "input",
    name: "phone",
    type: "tel",
    placeholder: "Phone",
    onChange: handlePhoneChange,
    value: phone
  }))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", {
    colSpan: 2
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    className: "input",
    name: "address_line_1",
    id: "bill_to_street",
    placeholder: "Street Address",
    onChange: handleAddressChange,
    value: address_line_1
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    className: "input",
    name: "address_line_2",
    id: "bill_to_street2",
    placeholder: "Suite #",
    onChange: handleAddressChange2,
    value: address_line_2
  }))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    className: "input",
    name: "city",
    id: "bill_to_city",
    placeholder: "City",
    onChange: handleCityChange,
    value: city
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    className: "input",
    name: "state",
    id: "bill_to_state",
    placeholder: "State",
    onChange: handleStateChange,
    value: state
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    className: "input",
    name: "zipcode",
    id: "bill_to_zipcode",
    placeholder: "Zipcode",
    onChange: handleZipcodeChange,
    value: zipcode
  })))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("tfoot", null)))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_StatusBar__WEBPACK_IMPORTED_MODULE_5__["default"], {
    message: message,
    messageType: messageType
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    id: "selections_button",
    onClick: handleClick
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", null, "selections")));
}
/* harmony default export */ __webpack_exports__["default"] = (ClientComponent);

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
//# sourceMappingURL=src_views_ClientStart_jsx.js.map