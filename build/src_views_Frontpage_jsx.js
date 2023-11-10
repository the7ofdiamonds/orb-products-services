"use strict";
(self["webpackChunkorb_products_services"] = self["webpackChunkorb_products_services"] || []).push([["src_views_Frontpage_jsx"],{

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

/***/ "./src/views/Frontpage.jsx":
/*!*********************************!*\
  !*** ./src/views/Frontpage.jsx ***!
  \*********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _controllers_servicesSlice_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../controllers/servicesSlice.js */ "./src/controllers/servicesSlice.js");
/* harmony import */ var _loading_LoadingComponent_jsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../loading/LoadingComponent.jsx */ "./src/loading/LoadingComponent.jsx");
/* harmony import */ var _error_ErrorComponent_jsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../error/ErrorComponent.jsx */ "./src/error/ErrorComponent.jsx");
/* harmony import */ var _ServicesHero__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ServicesHero */ "./src/views/ServicesHero.jsx");
/* harmony import */ var _Services__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Services */ "./src/views/Services.jsx");
/* harmony import */ var _ProductsHero__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./ProductsHero */ "./src/views/ProductsHero.jsx");
/* harmony import */ var _Products__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Products */ "./src/views/Products.jsx");










function Frontpage() {
  const description = 'Business in your hand';
  const heroButtonText = 'start';
  const heroButtonLink = '/start';
  const dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useDispatch)();
  const {
    servicesLoading,
    servicesError,
    services
  } = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useSelector)(state => state.services);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    dispatch((0,_controllers_servicesSlice_js__WEBPACK_IMPORTED_MODULE_2__.fetchServices)());
  }, [dispatch]);

  // if (servicesLoading) {
  //   return <LoadingComponent />;
  // }

  // if (servicesError) {
  //   return <ErrorComponent error={servicesError} />;
  // }

  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ServicesHero__WEBPACK_IMPORTED_MODULE_5__["default"], {
    description: description,
    heroButtonText: heroButtonText,
    heroButtonLink: heroButtonLink,
    services: services
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Services__WEBPACK_IMPORTED_MODULE_6__["default"], {
    services: services
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ProductsHero__WEBPACK_IMPORTED_MODULE_7__["default"], null), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Products__WEBPACK_IMPORTED_MODULE_8__["default"], null));
}
/* harmony default export */ __webpack_exports__["default"] = (Frontpage);

/***/ }),

/***/ "./src/views/Products.jsx":
/*!********************************!*\
  !*** ./src/views/Products.jsx ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);


function Products() {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, "Products");
}
/* harmony default export */ __webpack_exports__["default"] = (Products);

/***/ }),

/***/ "./src/views/ProductsHero.jsx":
/*!************************************!*\
  !*** ./src/views/ProductsHero.jsx ***!
  \************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);


function ProductsHero() {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, "ProductsHero");
}
/* harmony default export */ __webpack_exports__["default"] = (ProductsHero);

/***/ }),

/***/ "./src/views/Services.jsx":
/*!********************************!*\
  !*** ./src/views/Services.jsx ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _controllers_servicesSlice_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../controllers/servicesSlice.js */ "./src/controllers/servicesSlice.js");
/* harmony import */ var _loading_LoadingComponent_jsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../loading/LoadingComponent.jsx */ "./src/loading/LoadingComponent.jsx");
/* harmony import */ var _error_ErrorComponent_jsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../error/ErrorComponent.jsx */ "./src/error/ErrorComponent.jsx");






function Services(props) {
  const {
    servicesLoading,
    servicesError,
    services
  } = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useSelector)(state => state.services);
  console.log(services);
  const servicesToRender = props.services || services;
  const dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_1__.useDispatch)();
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    dispatch((0,_controllers_servicesSlice_js__WEBPACK_IMPORTED_MODULE_2__.fetchServices)());
  }, [dispatch]);
  if (servicesLoading) {
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_loading_LoadingComponent_jsx__WEBPACK_IMPORTED_MODULE_3__["default"], null);
  }
  if (servicesError) {
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_error_ErrorComponent_jsx__WEBPACK_IMPORTED_MODULE_4__["default"], {
      error: servicesError
    });
  }
  const handleServiceClick = serviceId => {
    window.location.href = `/services/${serviceId}`;
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("section", {
    className: "services"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", {
    className: "title"
  }, "SERVICES"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "services-list"
  }, props.services && props.services || services && services.length ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, servicesToRender.map(service => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "service"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "services-card card",
    key: service.price_id
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "services-title"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "services-icon"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
    className: service.icon
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", {
    className: "services-name title"
  }, service.title)), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "services-features"
  }, Array.isArray(service.features) && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("ul", null, service.features.map(feature => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
    key: feature.id
  }, feature.name)))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "services-pricing"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", null, "Starting at", ' ', new Intl.NumberFormat('us', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(service.price)))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "services-action"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    onClick: () => handleServiceClick(service.slug),
    className: "services-btn"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
    className: service.icon
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", null, service.action_word))))))) : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", null, "No services found."))));
}
/* harmony default export */ __webpack_exports__["default"] = (Services);

/***/ }),

/***/ "./src/views/ServicesHero.jsx":
/*!************************************!*\
  !*** ./src/views/ServicesHero.jsx ***!
  \************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ServicesHeroAnimation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ServicesHeroAnimation */ "./src/views/ServicesHeroAnimation.jsx");



function ServicesHero(props) {
  const {
    description,
    heroButtonText,
    heroButtonLink,
    services
  } = props;
  const start = () => {
    window.location.href = heroButtonLink;
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("main", {
    class: "hero"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", {
    className: "title"
  }, description), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "hero-card card"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ServicesHeroAnimation__WEBPACK_IMPORTED_MODULE_1__["default"], {
    services: services
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    class: "start-btn",
    onClick: start
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
    class: "fas fa-power-off"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", {
    className: "title"
  }, heroButtonText)));
}
/* harmony default export */ __webpack_exports__["default"] = (ServicesHero);

/***/ }),

/***/ "./src/views/ServicesHeroAnimation.jsx":
/*!*********************************************!*\
  !*** ./src/views/ServicesHeroAnimation.jsx ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);


function ServicesHeroAnimation(props) {
  const {
    services
  } = props;
  const servicesList = document.querySelector('.hero-animation-services');
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (servicesList) {
      const totalServices = servicesList.children.length;
      for (let i = 0; i < totalServices; i++) {
        servicesList.appendChild(servicesList.children[i].cloneNode(true));
      }
      document.documentElement.style.setProperty('--total-services', totalServices);
    }
  }, [servicesList]);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, services && services.length > 0 ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "hero-animation"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "hero-icons"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
    class: "fa-regular fa-lightbulb"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
    class: "fa-solid fa-plus"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
    class: "fa-solid fa-credit-card"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
    class: "fa-solid fa-equals"
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "hero-animation-services",
    id: "hero-animation-services"
  }, services.map((service, index) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    class: "hero-animation-service",
    id: "hero-animation-service",
    key: index
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", null, service.title)))))) : '');
}
/* harmony default export */ __webpack_exports__["default"] = (ServicesHeroAnimation);

/***/ })

}]);
//# sourceMappingURL=src_views_Frontpage_jsx.js.map