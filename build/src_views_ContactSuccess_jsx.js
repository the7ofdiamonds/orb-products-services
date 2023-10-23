"use strict";
(self["webpackChunkorb_products_services"] = self["webpackChunkorb_products_services"] || []).push([["src_views_ContactSuccess_jsx"],{

/***/ "./src/views/ContactSuccess.jsx":
/*!**************************************!*\
  !*** ./src/views/ContactSuccess.jsx ***!
  \**************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);


function ContactSuccessComponent() {
  const urlParams = new URLSearchParams(window.location.search);
  const firstName = urlParams.get('first_name');
  const email = urlParams.get('email');
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("main", {
    className: "contact-success"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "status-bar card success"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", null, "Thank You, ", firstName, ". Your message has been sent, and a reply will be sent to ", email, "."))));
}
/* harmony default export */ __webpack_exports__["default"] = (ContactSuccessComponent);

/***/ })

}]);
//# sourceMappingURL=src_views_ContactSuccess_jsx.js.map