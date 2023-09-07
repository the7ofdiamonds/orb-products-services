"use strict";
(self["webpackChunkorb_services"] = self["webpackChunkorb_services"] || []).push([["src_views_Support_jsx"],{

/***/ "./src/views/Support.jsx":
/*!*******************************!*\
  !*** ./src/views/Support.jsx ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


function SupportComponent() {
  const [messageType, setMessageType] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
  const [message, setMessage] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
  const [formData, setFormData] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({
    first_name: '',
    last_name: '',
    email: '',
    subject: '',
    message: ''
  });
  const {
    first_name,
    last_name,
    email,
    subject,
    msg
  } = formData;
  const handleInputChange = e => {
    const {
      name,
      value
    } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  const handleSubmit = async () => {
    try {
      const response = await fetch('/wp-json/orb/v1/email/support', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          first_name: first_name,
          last_name: last_name,
          email: email,
          subject: subject,
          message: msg
        })
      });
      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = errorData.message;
        setMessage(errorMessage);
        setMessageType('error');
        throw new Error(errorMessage);
      }
      const responseData = await response.json();
      setMessage(responseData.message);
      setMessageType('success');
      setTimeout(() => {
        window.location.href = `/support/success?first_name=${encodeURIComponent(first_name)}&email=${encodeURIComponent(email)}`;
      }, 3000);
      return responseData;
    } catch (error) {
      setMessage(error.message);
      setMessageType('error');
      throw error.message;
    }
  };
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "support-card card"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("form", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("table", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("tbody", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "text",
    name: "first_name",
    className: "input",
    id: "first_name",
    placeholder: "First Name",
    onChange: handleInputChange,
    value: first_name
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "text",
    name: "last_name",
    className: "input",
    id: "last_name",
    placeholder: "Last Name",
    onChange: handleInputChange,
    value: last_name
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", {
    colSpan: 2
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    name: "email",
    type: "email",
    id: "support_email",
    className: "input",
    placeholder: "Email",
    onChange: handleInputChange,
    value: email
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", {
    colSpan: 2
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    name: "subject",
    type: "text",
    id: "support_subject",
    className: "input",
    placeholder: "Subject",
    onChange: handleInputChange,
    value: subject
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", {
    colSpan: 2
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("textarea", {
    name: "msg",
    type: "text",
    id: "support_message",
    placeholder: "Message",
    onChange: handleInputChange,
    value: msg
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", {
    colSpan: 2
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "hidden",
    name: "action",
    value: "thfw_email_support"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    className: "sendmsg",
    id: "support_submit",
    name: "submit",
    type: "button",
    value: "submit",
    onClick: handleSubmit
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", null, "SEND")))))))), message && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `status-bar card ${messageType}`
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, message)));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SupportComponent);

/***/ })

}]);
//# sourceMappingURL=src_views_Support_jsx.js.map