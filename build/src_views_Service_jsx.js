"use strict";
(self["webpackChunkorb_products_services"] = self["webpackChunkorb_products_services"] || []).push([["src_views_Service_jsx"],{

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
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", null, error))));
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

/***/ "./src/views/Service.jsx":
/*!*******************************!*\
  !*** ./src/views/Service.jsx ***!
  \*******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router/dist/index.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _controllers_serviceSlice_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../controllers/serviceSlice.js */ "./src/controllers/serviceSlice.js");
/* harmony import */ var _loading_LoadingComponent_jsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../loading/LoadingComponent.jsx */ "./src/loading/LoadingComponent.jsx");
/* harmony import */ var _error_ErrorComponent_jsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../error/ErrorComponent.jsx */ "./src/error/ErrorComponent.jsx");







function Service() {
  const location = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_5__.useLocation)();
  const servicePath = location.pathname.split('/')[2];
  const {
    serviceLoading,
    serviceError
  } = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useSelector)(state => state.service);
  const {
    title,
    description,
    features,
    action_word,
    content,
    price,
    icon
  } = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useSelector)(state => state.service);
  const dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useDispatch)();
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    dispatch((0,_controllers_serviceSlice_js__WEBPACK_IMPORTED_MODULE_2__.fetchService)(servicePath));
  }, [dispatch, servicePath]);
  if (serviceLoading) {
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_loading_LoadingComponent_jsx__WEBPACK_IMPORTED_MODULE_3__["default"], null);
  }
  if (serviceError) {
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_error_ErrorComponent_jsx__WEBPACK_IMPORTED_MODULE_4__["default"], {
      error: serviceError
    });
  }
  const handleClick = () => {
    window.location.href = '/client/start';
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("section", {
    className: "service"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", null, title), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "service-icon"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
    className: icon
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "service-features-card card"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", null, "Includes"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "service-features"
  }, features && features.length ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, features.map(feature => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "feature-name",
    id: "feature_name"
  }, feature.name)))) : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", null, "No features to show yet"))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "details-card card"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", null, description), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "details"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, content))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "pricing"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", null, "Starting at", ' ', new Intl.NumberFormat('us', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    className: "start-btn",
    onClick: handleClick
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
    class: "fas fa-power-off"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", null, action_word))));
}
/* harmony default export */ __webpack_exports__["default"] = (Service);

/***/ })

}]);
//# sourceMappingURL=src_views_Service_jsx.js.map