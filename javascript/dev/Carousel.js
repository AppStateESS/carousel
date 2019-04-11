/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"Carousel": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./javascript/Carousel/index.jsx","vendor"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./javascript/Carousel/Form.jsx":
/*!**************************************!*\
  !*** ./javascript/Carousel/Form.jsx ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Form; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _essappstate_canopy_react_buttongroup__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @essappstate/canopy-react-buttongroup */ "./node_modules/@essappstate/canopy-react-buttongroup/build/index.js");
/* harmony import */ var _essappstate_canopy_react_buttongroup__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_essappstate_canopy_react_buttongroup__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _essappstate_canopy_react_bigcheckbox__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @essappstate/canopy-react-bigcheckbox */ "./node_modules/@essappstate/canopy-react-bigcheckbox/build/index.js");
/* harmony import */ var _essappstate_canopy_react_bigcheckbox__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_essappstate_canopy_react_bigcheckbox__WEBPACK_IMPORTED_MODULE_3__);


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }






var Form =
/*#__PURE__*/
function (_Component) {
  _inherits(Form, _Component);

  function Form(props) {
    _classCallCheck(this, Form);

    return _possibleConstructorReturn(this, _getPrototypeOf(Form).call(this, props));
  }

  _createClass(Form, [{
    key: "intervalTime",
    value: function intervalTime() {
      var _this$props = this.props,
          resource = _this$props.resource,
          update = _this$props.update;
      var buttons = [{
        value: '2',
        label: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "2")
      }, {
        value: '4',
        label: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "4")
      }, {
        value: '6',
        label: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "6")
      }, {
        value: '8',
        label: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "8")
      }, {
        value: '10',
        label: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "10")
      }];
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_essappstate_canopy_react_buttongroup__WEBPACK_IMPORTED_MODULE_2___default.a, {
        name: "intervalTime",
        buttons: buttons,
        match: resource.intervalTime,
        handle: update.bind(this, 'intervalTime'),
        activeColor: "primary"
      });
    }
  }, {
    key: "iterations",
    value: function iterations() {
      var _this$props2 = this.props,
          resource = _this$props2.resource,
          update = _this$props2.update;
      var buttons = [{
        value: '0',
        label: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
          className: "fas fa-infinity"
        }))
      }, {
        value: '1',
        label: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "1")
      }, {
        value: '2',
        label: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "2")
      }, {
        value: '3',
        label: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "3")
      }];
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_essappstate_canopy_react_buttongroup__WEBPACK_IMPORTED_MODULE_2___default.a, {
        name: "iterations",
        buttons: buttons,
        match: resource.iterations,
        handle: update.bind(this, 'iterations'),
        vertical: false,
        activeColor: "primary"
      });
    }
  }, {
    key: "indicator",
    value: function indicator() {
      var _this$props3 = this.props,
          resource = _this$props3.resource,
          update = _this$props3.update;
      var buttons = [{
        value: '0',
        label: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "None")
      }, {
        value: '1',
        label: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
          className: "fas fa-circle"
        }), "\xA0Bullets")
      }, {
        value: '2',
        label: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
          className: "fas fa-image"
        }), "\xA0Thumbnails")
      }];
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_essappstate_canopy_react_buttongroup__WEBPACK_IMPORTED_MODULE_2___default.a, {
        name: "indicator",
        buttons: buttons,
        match: resource.indicator,
        handle: update.bind(this, 'indicator'),
        activeColor: "primary"
      });
    }
  }, {
    key: "controls",
    value: function controls() {
      var _this$props4 = this.props,
          resource = _this$props4.resource,
          update = _this$props4.update;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_essappstate_canopy_react_bigcheckbox__WEBPACK_IMPORTED_MODULE_3___default.a, {
        label: "Show controls",
        checked: resource.controls,
        handle: update.bind(this, 'controls')
      });
    }
  }, {
    key: "pause",
    value: function pause() {
      var _this$props5 = this.props,
          resource = _this$props5.resource,
          update = _this$props5.update;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_essappstate_canopy_react_bigcheckbox__WEBPACK_IMPORTED_MODULE_3___default.a, {
        label: "Pause on mouse over",
        checked: resource.pause,
        handle: update.bind(this, 'pause')
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props6 = this.props,
          resource = _this$props6.resource,
          save = _this$props6.save,
          update = _this$props6.update;
      var disableSave = resource && resource.title.length === 0;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", null, "Title"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        type: "text",
        name: "title",
        className: "form-control mb-3",
        placeholder: "Required",
        value: resource.title,
        onChange: update.bind(this, 'title')
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "row"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-sm-6 mb-3"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
        className: "lead"
      }, "Iterations"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "d-inline"
      }, this.iterations())), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-sm-6 mb-3"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
        className: "lead"
      }, "Interval"), this.intervalTime()), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-sm-6 mb-3"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
        className: "lead"
      }, "Indicator"), this.indicator()), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "col-sm-6 mb-3"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, this.controls()), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, this.pause()))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        className: "btn btn-primary",
        disabled: disableSave,
        onClick: save
      }, "Save Carousel"));
    }
  }]);

  return Form;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);


Form.propTypes = {
  resource: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object,
  finish: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func,
  save: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func,
  update: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func
};

/***/ }),

/***/ "./javascript/Carousel/index.jsx":
/*!***************************************!*\
  !*** ./javascript/Carousel/index.jsx ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Carousel; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Extends_Listing__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Extends/Listing */ "./javascript/Extends/Listing.jsx");
/* harmony import */ var _Form__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Form */ "./javascript/Carousel/Form.jsx");


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }






var Carousel =
/*#__PURE__*/
function (_Listing) {
  _inherits(Carousel, _Listing);

  function Carousel(props) {
    var _this;

    _classCallCheck(this, Carousel);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Carousel).call(this, props));
    _this.module = 'carousel';
    _this.role = 'Admin';
    _this.control = 'Carousel';
    _this.label = 'Carousel';
    _this.form = _this.form.bind(_assertThisInitialized(_this));
    _this.defaultResource = {
      id: 0,
      title: '',
      iterations: '2',
      intervalTime: '4',
      indicator: '0',
      controls: true,
      pause: true
    };
    _this.columns = [{
      column: 'title',
      label: 'Title'
    }];
    _this.contextMenu = [{
      handleClick: _this.command.bind(_assertThisInitialized(_this)),
      data: {
        command: 'edit'
      },
      label: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        href: "#"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
        className: "fas fa-edit"
      }), "\xA0Edit Carousel")
    }, {
      handleClick: _this.command.bind(_assertThisInitialized(_this)),
      data: {
        command: 'slides'
      },
      label: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        href: "#"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
        className: "fas fa-images"
      }), "\xA0Update Slides")
    }, {
      handleClick: _this.command.bind(_assertThisInitialized(_this)),
      data: {
        command: 'delete'
      },
      label: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        href: "#"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
        className: "fas fa-trash"
      }), "\xA0Delete Carousel")
    }];
    _this.state.resource = _this.defaultResource;
    return _this;
  }

  _createClass(Carousel, [{
    key: "command",
    value: function command(event, data) {
      event.preventDefault();

      switch (data.command) {
        case 'edit':
          this.editResource(data.name);
          break;

        case 'delete':
          this.deleteResource(data.name);
          break;

        case 'slides':
          location.href = './carousel/Admin/Slide/?carousel=' + this.state.listing[data.name].id;
          break;
      }
    }
  }, {
    key: "form",
    value: function form() {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Form__WEBPACK_IMPORTED_MODULE_3__["default"], {
        close: this.finish,
        update: this.update,
        resource: this.state.resource,
        save: this.save
      });
    }
  }, {
    key: "overlay",
    value: function overlay() {
      return {
        content: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          className: "carousel-form"
        }, this.form()),
        width: '80%',
        title: 'Edit Carousel',
        close: this.load
      };
    }
  }]);

  return Carousel;
}(_Extends_Listing__WEBPACK_IMPORTED_MODULE_2__["default"]);


react_dom__WEBPACK_IMPORTED_MODULE_1___default.a.render(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Carousel, null), document.getElementById('Carousel'));

/***/ }),

/***/ "./javascript/Extends/Grid.jsx":
/*!*************************************!*\
  !*** ./javascript/Extends/Grid.jsx ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @fortawesome/react-fontawesome */ "./node_modules/@fortawesome/react-fontawesome/index.es.js");
/* harmony import */ var _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @fortawesome/free-solid-svg-icons */ "./node_modules/@fortawesome/free-solid-svg-icons/index.es.js");
/* harmony import */ var react_contextmenu__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-contextmenu */ "./node_modules/react-contextmenu/es6/index.js");
/* harmony import */ var _grid_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./grid.scss */ "./javascript/Extends/grid.scss");
/* harmony import */ var _grid_scss__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_grid_scss__WEBPACK_IMPORTED_MODULE_5__);


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }








var Grid = function Grid(_ref) {
  var listing = _ref.listing,
      columns = _ref.columns,
      sortFunction = _ref.sortFunction,
      currentSort = _ref.currentSort,
      contextMenu = _ref.contextMenu;
  var sortIconTrack = {};
  columns.forEach(function (value) {
    sortIconTrack[value.column] = 0;
  });

  if (currentSort.sortBy) {
    sortIconTrack[currentSort.sortBy] = currentSort.sortByDir;
  }

  var MENU_TYPE = 'SIMPLE';

  var collect = function collect(props) {
    return {
      name: props.name
    };
  };

  var headers = function headers(columns, sortFunction) {
    var th = columns.map(function (value, key) {
      var icon;
      var className = [];

      if (sortIconTrack[value.column] === 1) {
        className.push('pointer');
        icon = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_2__["FontAwesomeIcon"], {
          icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_3__["faCaretUp"]
        });
      } else if (sortIconTrack[value.column] === 2) {
        className.push('pointer');
        icon = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_2__["FontAwesomeIcon"], {
          icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_3__["faCaretDown"]
        });
      }

      if (value.className) {
        className.push('bg-primary');
      }

      var style;

      if (value.style && _typeof(value.style) === 'object') {
        style = value.style;
      }

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", {
        style: style,
        className: className,
        key: key,
        onClick: sortFunction.bind(null, value.column)
      }, value.label, "\xA0", icon);
    });
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", null, th);
  };

  var tableClass = 'table table-striped table-hover';
  var menu;

  if (contextMenu) {
    var menuOptions = contextMenu.map(function (value, key) {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_contextmenu__WEBPACK_IMPORTED_MODULE_4__["MenuItem"], {
        onClick: value.handleClick,
        data: value.data,
        key: key
      }, value.label);
    });
    menu = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_contextmenu__WEBPACK_IMPORTED_MODULE_4__["ContextMenu"], {
      id: MENU_TYPE
    }, menuOptions);
  }

  var rows = listing.map(function (resource, key) {
    var stack = columns.map(function (value, subkey) {
      if (value.callback) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
          key: subkey,
          className: value.className
        }, value.callback(resource));
      } else {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
          key: subkey,
          className: value.className
        }, resource[value.column]);
      }
    });

    if (contextMenu) {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_contextmenu__WEBPACK_IMPORTED_MODULE_4__["ContextMenuTrigger"], {
        renderTag: "tr",
        name: key,
        id: MENU_TYPE,
        holdToDisplay: 1000,
        key: key,
        attributes: {
          className: 'context'
        },
        collect: collect
      }, stack);
    } else {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", {
        key: key
      }, stack);
    }
  });
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("table", {
    className: tableClass
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tbody", null, headers(columns, sortFunction), rows)), menu);
};

Grid.propTypes = {
  listing: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.array,
  columns: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.array,
  sortFunction: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func,
  currentSort: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object,
  contextMenu: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.array
};
Grid.defaultProps = {
  contextMenu: null
};
/* harmony default export */ __webpack_exports__["default"] = (Grid);

/***/ }),

/***/ "./javascript/Extends/Listing.jsx":
/*!****************************************!*\
  !*** ./javascript/Extends/Listing.jsx ***!
  \****************************************/
/*! exports provided: debounce, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "debounce", function() { return debounce; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Listing; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _essappstate_react_navbar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @essappstate/react-navbar */ "./node_modules/@essappstate/react-navbar/build/index.js");
/* harmony import */ var _essappstate_react_navbar__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_essappstate_react_navbar__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _essappstate_react_waiting__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @essappstate/react-waiting */ "./node_modules/@essappstate/react-waiting/build/index.js");
/* harmony import */ var _essappstate_react_waiting__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_essappstate_react_waiting__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Grid__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Grid */ "./javascript/Extends/Grid.jsx");
/* harmony import */ var _essappstate_canopy_react_overlay__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @essappstate/canopy-react-overlay */ "./node_modules/@essappstate/canopy-react-overlay/build/index.js");
/* harmony import */ var _essappstate_canopy_react_overlay__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_essappstate_canopy_react_overlay__WEBPACK_IMPORTED_MODULE_4__);


function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }






/* global $ */

function debounce(fn, delay) {
  var timer = null;
  return function () {
    var context = this,
        args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function () {
      fn.apply(context, args);
    }, delay);
  };
}

var Listing =
/*#__PURE__*/
function (_Component) {
  _inherits(Listing, _Component);

  _createClass(Listing, [{
    key: "delayLoad",
    value: function delayLoad() {
      this.load();
    }
  }]);

  function Listing(props) {
    var _this;

    _classCallCheck(this, Listing);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Listing).call(this, props));
    _this.state = {
      search: '',
      listing: [],
      loading: true,
      message: null,
      messageType: 'danger',
      overlay: false,
      resource: {}
    };
    _this.module = 'module';
    _this.role = 'role';
    _this.control = 'control';
    _this.label = 'label';
    _this.sortBy = null;
    _this.sortByDir = 0;
    _this.defaultResource = {};
    _this.save = _this.save.bind(_assertThisInitialized(_this));
    _this.showGrid = _this.showGrid.bind(_assertThisInitialized(_this));
    _this.load = _this.load.bind(_assertThisInitialized(_this));
    _this.reset = _this.reset.bind(_assertThisInitialized(_this));
    _this.sortByColumn = _this.sortByColumn.bind(_assertThisInitialized(_this));
    _this.handle = _this.handle.bind(_assertThisInitialized(_this));
    _this.overlayOn = _this.overlayOn.bind(_assertThisInitialized(_this));
    _this.overlayOff = _this.overlayOff.bind(_assertThisInitialized(_this));
    _this.editResource = _this.editResource.bind(_assertThisInitialized(_this));
    _this.delayLoad = debounce(_this.delayLoad, 1000);
    _this.update = _this.update.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Listing, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.load();
      this.setState({
        resource: this.defaultResource
      });
    }
  }, {
    key: "finish",
    value: function finish() {
      this.load();
      this.overlayOff();
    }
  }, {
    key: "overlayOn",
    value: function overlayOn() {
      this.setState({
        overlay: true
      });
    }
  }, {
    key: "overlayOff",
    value: function overlayOff() {
      this.setState({
        overlay: false
      });
    }
  }, {
    key: "loadResource",
    value: function loadResource(key) {
      var resource = Object.assign({}, this.state.listing[key]);
      this.setState({
        resource: resource
      });
    }
  }, {
    key: "editResource",
    value: function editResource(key) {
      this.loadResource(key);
      this.overlayOn();
    }
  }, {
    key: "deleteResource",
    value: function deleteResource(key) {
      var _this2 = this;

      var resource = this.state.listing[key];

      if (confirm('Are you sure you want to delete this carousel along with all it\'s slides?')) {
        $.ajax({
          url: this.getUrl() + '/' + resource.id,
          dataType: 'json',
          type: 'delete',
          success: function success() {
            _this2.setMessage(_this2.label + ' deleted.', 'success');

            _this2.load();
          },
          error: function error() {
            _this2.setMessage('Sorry. An error prevented deleting the ' + _this2.label, 'danger');
          }
        });
      }
    }
  }, {
    key: "handle",
    value: function handle(varname, value) {
      if (_typeof(value) === 'object') {
        value = value.target.value;
      }

      var resource = this.state.resource;
      resource[varname] = value;
      this.setState({
        resource: resource
      });
    }
  }, {
    key: "reset",
    value: function reset() {
      this.overlayOff();
      this.setState({
        resource: Object.assign({}, this.defaultResource)
      });
    }
  }, {
    key: "getSearch",
    value: function getSearch() {
      var _this3 = this;

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_essappstate_react_navbar__WEBPACK_IMPORTED_MODULE_1__["NavbarSearch"], {
        value: this.state.search,
        placeholder: "Search",
        onChange: function onChange(e) {
          _this3.updateSearch(e.target.value);
        }
      });
    }
  }, {
    key: "updateSearch",
    value: function updateSearch(search) {
      this.setState({
        search: search
      });

      if (search.length > 2 || search.length === 0) {
        this.delayLoad();
      }
    }
  }, {
    key: "sortByColumn",
    value: function sortByColumn(column) {
      if (column === this.sortBy) {
        switch (this.sortByDir) {
          case 0:
            this.sortByDir = 1;
            break;

          case 1:
            this.sortByDir = 2;
            break;

          case 2:
            this.sortByDir = 0;
            this.sortBy = null;
        }
      } else {
        this.sortByDir = 1;
        this.sortBy = column;
      }

      this.load();
    }
  }, {
    key: "getUrl",
    value: function getUrl() {
      return "".concat(this.module, "/").concat(this.role, "/").concat(this.control);
    }
  }, {
    key: "load",
    value: function load() {
      var _this4 = this;

      var url = this.getUrl();
      $.ajax({
        url: url,
        data: {
          search: this.state.search,
          sortBy: this.sortBy,
          sortByDir: this.sortByDir
        },
        dataType: 'json',
        type: 'get',
        success: function success(data) {
          _this4.setState({
            listing: data.listing,
            loading: false
          });
        },
        error: function error() {
          _this4.setState({
            loading: false
          });

          _this4.setMessage('Could not access server');
        }
      });
    }
  }, {
    key: "showGrid",
    value: function showGrid() {}
  }, {
    key: "setMessage",
    value: function setMessage(message) {
      var _this5 = this;

      var messageType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'danger';
      setTimeout(function () {
        _this5.clearMessage();
      }, 5000);
      this.setState({
        message: message,
        messageType: messageType
      });
    }
  }, {
    key: "clearMessage",
    value: function clearMessage() {
      this.setState({
        message: null,
        messageType: 'danger'
      });
    }
  }, {
    key: "save",
    value: function save() {
      var _this6 = this;

      var type = 'post';
      var url = this.getUrl();

      if (this.state.resource.id !== '0') {
        url = url + '/' + this.state.resource.id;
        type = 'put';
      }

      $.ajax({
        url: url,
        data: _objectSpread({}, this.state.resource),
        dataType: 'json',
        type: type,
        success: function success() {
          _this6.load();

          _this6.setMessage(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
            className: "far fa-thumbs-up"
          }), "\xA0Save successful."), 'success');
        },
        error: function error() {
          _this6.setMessage(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
            className: "fas fa-exclamation-triangle"
          }), "\xA0Unable to save\xA0", _this6.label, "."));
        },
        complete: function complete() {
          return _this6.reset();
        }
      });
    }
  }, {
    key: "message",
    value: function message() {
      var cn = "alert alert-".concat(this.state.messageType, " alert-dismissible fade show");

      if (this.state.message) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          className: cn
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, this.state.message), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
          type: "button",
          className: "close",
          "data-dismiss": "alert",
          "aria-label": "Close"
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
          "aria-hidden": "true"
        }, "\xD7")));
      }
    }
  }, {
    key: "navbarButton",
    value: function navbarButton() {
      var label = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
        className: "fas fa-plus"
      }), "\xA0Create");
      var button = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_essappstate_react_navbar__WEBPACK_IMPORTED_MODULE_1__["NavbarButton"], {
        color: "outline-primary",
        label: label,
        handleClick: this.overlayOn
      });
      return button;
    }
  }, {
    key: "update",
    value: function update(varname, value) {
      var changeValue;

      if (_typeof(value) === 'object') {
        changeValue = value.target.value;
      } else {
        changeValue = value;
      }

      var resource = this.state.resource;
      resource[varname] = changeValue;
      this.setState({
        resource: resource
      });
    }
  }, {
    key: "navbar",
    value: function navbar() {
      var button = this.navbarButton();
      var search = this.getSearch();
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_essappstate_react_navbar__WEBPACK_IMPORTED_MODULE_1__["Navbar"], {
        leftSide: [button],
        rightSide: [search],
        background: "light",
        className: "border rounded"
      });
    }
  }, {
    key: "title",
    value: function title() {
      return null;
    }
  }, {
    key: "showOverlay",
    value: function showOverlay() {
      var _this7 = this;

      var overlay = this.overlay();

      if (overlay === null) {
        return;
      }

      var width;

      if (overlay.width) {
        width = overlay.width;
      }

      var title;

      if (overlay.title) {
        title = overlay.title;
      }

      var close;

      if (overlay.close) {
        close = function close() {
          overlay.close();

          _this7.overlayOff();
        };
      } else {
        close = this.overlayOff;
      }

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_essappstate_canopy_react_overlay__WEBPACK_IMPORTED_MODULE_4___default.a, {
        show: this.state.overlay,
        width: width,
        title: title,
        close: close
      }, overlay.content);
    }
  }, {
    key: "content",
    value: function content() {
      if (this.state.loading) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_essappstate_react_waiting__WEBPACK_IMPORTED_MODULE_2___default.a, null));
      }

      if (this.state.listing.length === 0) {
        var content = [];
        content.push(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
          key: "1"
        }, "No ", this.label.toLowerCase(), "s found."));

        if (this.state.search.length > 0) {
          content.push(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
            key: "2"
          }, "\xA0You may want to broaden your search."));
        }

        return content;
      }

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Grid__WEBPACK_IMPORTED_MODULE_3__["default"], {
        listing: this.state.listing,
        edit: this.editResource,
        contextMenu: this.contextMenu,
        columns: this.columns,
        sortFunction: this.sortByColumn,
        currentSort: {
          sortBy: this.sortBy,
          sortByDir: this.sortByDir
        }
      });
    }
  }, {
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, this.showOverlay()), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, this.navbar()), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, this.message()), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, this.title()), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "mt-3"
      }, this.content()));
    }
  }]);

  return Listing;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);



/***/ }),

/***/ "./javascript/Extends/grid.scss":
/*!**************************************!*\
  !*** ./javascript/Extends/grid.scss ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../node_modules/css-loader!../../node_modules/sass-loader/lib/loader.js!./grid.scss */ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./javascript/Extends/grid.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./javascript/Extends/grid.scss":
/*!*********************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./javascript/Extends/grid.scss ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".context {\n  cursor: context-menu; }\n\nnav.react-contextmenu {\n  border: 1px solid #595959;\n  border-radius: 4px;\n  padding: 6px;\n  background-color: rgba(255, 255, 255, 0.9);\n  box-shadow: 5px 5px 5px #9d9d9d;\n  min-width: 100px; }\n", ""]);

// exports


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vamF2YXNjcmlwdC9DYXJvdXNlbC9Gb3JtLmpzeCIsIndlYnBhY2s6Ly8vLi9qYXZhc2NyaXB0L0Nhcm91c2VsL2luZGV4LmpzeCIsIndlYnBhY2s6Ly8vLi9qYXZhc2NyaXB0L0V4dGVuZHMvR3JpZC5qc3giLCJ3ZWJwYWNrOi8vLy4vamF2YXNjcmlwdC9FeHRlbmRzL0xpc3RpbmcuanN4Iiwid2VicGFjazovLy8uL2phdmFzY3JpcHQvRXh0ZW5kcy9ncmlkLnNjc3M/MTUyNyIsIndlYnBhY2s6Ly8vLi9qYXZhc2NyaXB0L0V4dGVuZHMvZ3JpZC5zY3NzIl0sIm5hbWVzIjpbIkZvcm0iLCJwcm9wcyIsInJlc291cmNlIiwidXBkYXRlIiwiYnV0dG9ucyIsInZhbHVlIiwibGFiZWwiLCJpbnRlcnZhbFRpbWUiLCJiaW5kIiwiaXRlcmF0aW9ucyIsImluZGljYXRvciIsImNvbnRyb2xzIiwicGF1c2UiLCJzYXZlIiwiZGlzYWJsZVNhdmUiLCJ0aXRsZSIsImxlbmd0aCIsIkNvbXBvbmVudCIsInByb3BUeXBlcyIsIlByb3BUeXBlcyIsIm9iamVjdCIsImZpbmlzaCIsImZ1bmMiLCJDYXJvdXNlbCIsIm1vZHVsZSIsInJvbGUiLCJjb250cm9sIiwiZm9ybSIsImRlZmF1bHRSZXNvdXJjZSIsImlkIiwiY29sdW1ucyIsImNvbHVtbiIsImNvbnRleHRNZW51IiwiaGFuZGxlQ2xpY2siLCJjb21tYW5kIiwiZGF0YSIsInN0YXRlIiwiZXZlbnQiLCJwcmV2ZW50RGVmYXVsdCIsImVkaXRSZXNvdXJjZSIsIm5hbWUiLCJkZWxldGVSZXNvdXJjZSIsImxvY2F0aW9uIiwiaHJlZiIsImxpc3RpbmciLCJjb250ZW50Iiwid2lkdGgiLCJjbG9zZSIsImxvYWQiLCJMaXN0aW5nIiwiUmVhY3RET00iLCJyZW5kZXIiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiR3JpZCIsInNvcnRGdW5jdGlvbiIsImN1cnJlbnRTb3J0Iiwic29ydEljb25UcmFjayIsImZvckVhY2giLCJzb3J0QnkiLCJzb3J0QnlEaXIiLCJNRU5VX1RZUEUiLCJjb2xsZWN0IiwiaGVhZGVycyIsInRoIiwibWFwIiwia2V5IiwiaWNvbiIsImNsYXNzTmFtZSIsInB1c2giLCJmYUNhcmV0VXAiLCJmYUNhcmV0RG93biIsInN0eWxlIiwidGFibGVDbGFzcyIsIm1lbnUiLCJtZW51T3B0aW9ucyIsInJvd3MiLCJzdGFjayIsInN1YmtleSIsImNhbGxiYWNrIiwiYXJyYXkiLCJkZWZhdWx0UHJvcHMiLCJkZWJvdW5jZSIsImZuIiwiZGVsYXkiLCJ0aW1lciIsImNvbnRleHQiLCJhcmdzIiwiYXJndW1lbnRzIiwiY2xlYXJUaW1lb3V0Iiwic2V0VGltZW91dCIsImFwcGx5Iiwic2VhcmNoIiwibG9hZGluZyIsIm1lc3NhZ2UiLCJtZXNzYWdlVHlwZSIsIm92ZXJsYXkiLCJzaG93R3JpZCIsInJlc2V0Iiwic29ydEJ5Q29sdW1uIiwiaGFuZGxlIiwib3ZlcmxheU9uIiwib3ZlcmxheU9mZiIsImRlbGF5TG9hZCIsInNldFN0YXRlIiwiT2JqZWN0IiwiYXNzaWduIiwibG9hZFJlc291cmNlIiwiY29uZmlybSIsIiQiLCJhamF4IiwidXJsIiwiZ2V0VXJsIiwiZGF0YVR5cGUiLCJ0eXBlIiwic3VjY2VzcyIsInNldE1lc3NhZ2UiLCJlcnJvciIsInZhcm5hbWUiLCJ0YXJnZXQiLCJlIiwidXBkYXRlU2VhcmNoIiwiY2xlYXJNZXNzYWdlIiwiY29tcGxldGUiLCJjbiIsImJ1dHRvbiIsImNoYW5nZVZhbHVlIiwibmF2YmFyQnV0dG9uIiwiZ2V0U2VhcmNoIiwidG9Mb3dlckNhc2UiLCJzaG93T3ZlcmxheSIsIm5hdmJhciJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0JBQVEsb0JBQW9CO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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LEVBR0Usd0VBQU0sS0FBS3JDLE9BQUwsRUFBTixDQUhGLEVBSUUsd0VBQU0sS0FBSy9FLEtBQUwsRUFBTixDQUpGLEVBS0U7QUFBSyxpQkFBUyxFQUFDO0FBQWYsU0FBdUIsS0FBSzhCLE9BQUwsRUFBdkIsQ0FMRixDQURGO0FBU0Q7Ozs7RUE3VWtDNUIsK0M7Ozs7Ozs7Ozs7Ozs7O0FDbkJyQyxjQUFjLG1CQUFPLENBQUMsMk1BQW1HOztBQUV6SCw0Q0FBNEMsUUFBUzs7QUFFckQ7QUFDQTs7OztBQUlBLGVBQWU7O0FBRWY7QUFDQTs7QUFFQSxhQUFhLG1CQUFPLENBQUMsc0dBQW1EOztBQUV4RTs7QUFFQSxHQUFHLEtBQVUsRUFBRSxFOzs7Ozs7Ozs7OztBQ25CZiwyQkFBMkIsbUJBQU8sQ0FBQyxnR0FBK0M7QUFDbEY7OztBQUdBO0FBQ0EsY0FBYyxRQUFTLGFBQWEseUJBQXlCLEVBQUUsMkJBQTJCLDhCQUE4Qix1QkFBdUIsaUJBQWlCLCtDQUErQyxvQ0FBb0MscUJBQXFCLEVBQUU7O0FBRTFRIiwiZmlsZSI6IkNhcm91c2VsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG4gXHRmdW5jdGlvbiB3ZWJwYWNrSnNvbnBDYWxsYmFjayhkYXRhKSB7XG4gXHRcdHZhciBjaHVua0lkcyA9IGRhdGFbMF07XG4gXHRcdHZhciBtb3JlTW9kdWxlcyA9IGRhdGFbMV07XG4gXHRcdHZhciBleGVjdXRlTW9kdWxlcyA9IGRhdGFbMl07XG5cbiBcdFx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG4gXHRcdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuIFx0XHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwLCByZXNvbHZlcyA9IFtdO1xuIFx0XHRmb3IoO2kgPCBjaHVua0lkcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdGNodW5rSWQgPSBjaHVua0lkc1tpXTtcbiBcdFx0XHRpZihpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pIHtcbiBcdFx0XHRcdHJlc29sdmVzLnB1c2goaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdWzBdKTtcbiBcdFx0XHR9XG4gXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gMDtcbiBcdFx0fVxuIFx0XHRmb3IobW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcbiBcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuIFx0XHRcdFx0bW9kdWxlc1ttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdGlmKHBhcmVudEpzb25wRnVuY3Rpb24pIHBhcmVudEpzb25wRnVuY3Rpb24oZGF0YSk7XG5cbiBcdFx0d2hpbGUocmVzb2x2ZXMubGVuZ3RoKSB7XG4gXHRcdFx0cmVzb2x2ZXMuc2hpZnQoKSgpO1xuIFx0XHR9XG5cbiBcdFx0Ly8gYWRkIGVudHJ5IG1vZHVsZXMgZnJvbSBsb2FkZWQgY2h1bmsgdG8gZGVmZXJyZWQgbGlzdFxuIFx0XHRkZWZlcnJlZE1vZHVsZXMucHVzaC5hcHBseShkZWZlcnJlZE1vZHVsZXMsIGV4ZWN1dGVNb2R1bGVzIHx8IFtdKTtcblxuIFx0XHQvLyBydW4gZGVmZXJyZWQgbW9kdWxlcyB3aGVuIGFsbCBjaHVua3MgcmVhZHlcbiBcdFx0cmV0dXJuIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCk7XG4gXHR9O1xuIFx0ZnVuY3Rpb24gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKSB7XG4gXHRcdHZhciByZXN1bHQ7XG4gXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBkZWZlcnJlZE1vZHVsZXMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHR2YXIgZGVmZXJyZWRNb2R1bGUgPSBkZWZlcnJlZE1vZHVsZXNbaV07XG4gXHRcdFx0dmFyIGZ1bGZpbGxlZCA9IHRydWU7XG4gXHRcdFx0Zm9yKHZhciBqID0gMTsgaiA8IGRlZmVycmVkTW9kdWxlLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHR2YXIgZGVwSWQgPSBkZWZlcnJlZE1vZHVsZVtqXTtcbiBcdFx0XHRcdGlmKGluc3RhbGxlZENodW5rc1tkZXBJZF0gIT09IDApIGZ1bGZpbGxlZCA9IGZhbHNlO1xuIFx0XHRcdH1cbiBcdFx0XHRpZihmdWxmaWxsZWQpIHtcbiBcdFx0XHRcdGRlZmVycmVkTW9kdWxlcy5zcGxpY2UoaS0tLCAxKTtcbiBcdFx0XHRcdHJlc3VsdCA9IF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gZGVmZXJyZWRNb2R1bGVbMF0pO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRyZXR1cm4gcmVzdWx0O1xuIFx0fVxuXG4gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuIFx0Ly8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4gXHQvLyBQcm9taXNlID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxuIFx0dmFyIGluc3RhbGxlZENodW5rcyA9IHtcbiBcdFx0XCJDYXJvdXNlbFwiOiAwXG4gXHR9O1xuXG4gXHR2YXIgZGVmZXJyZWRNb2R1bGVzID0gW107XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdHZhciBqc29ucEFycmF5ID0gd2luZG93W1wid2VicGFja0pzb25wXCJdID0gd2luZG93W1wid2VicGFja0pzb25wXCJdIHx8IFtdO1xuIFx0dmFyIG9sZEpzb25wRnVuY3Rpb24gPSBqc29ucEFycmF5LnB1c2guYmluZChqc29ucEFycmF5KTtcbiBcdGpzb25wQXJyYXkucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrO1xuIFx0anNvbnBBcnJheSA9IGpzb25wQXJyYXkuc2xpY2UoKTtcbiBcdGZvcih2YXIgaSA9IDA7IGkgPCBqc29ucEFycmF5Lmxlbmd0aDsgaSsrKSB3ZWJwYWNrSnNvbnBDYWxsYmFjayhqc29ucEFycmF5W2ldKTtcbiBcdHZhciBwYXJlbnRKc29ucEZ1bmN0aW9uID0gb2xkSnNvbnBGdW5jdGlvbjtcblxuXG4gXHQvLyBhZGQgZW50cnkgbW9kdWxlIHRvIGRlZmVycmVkIGxpc3RcbiBcdGRlZmVycmVkTW9kdWxlcy5wdXNoKFtcIi4vamF2YXNjcmlwdC9DYXJvdXNlbC9pbmRleC5qc3hcIixcInZlbmRvclwiXSk7XG4gXHQvLyBydW4gZGVmZXJyZWQgbW9kdWxlcyB3aGVuIHJlYWR5XG4gXHRyZXR1cm4gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKTtcbiIsIid1c2Ugc3RyaWN0J1xuaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tICdyZWFjdCdcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcydcbmltcG9ydCBCdXR0b25Hcm91cCBmcm9tICdAZXNzYXBwc3RhdGUvY2Fub3B5LXJlYWN0LWJ1dHRvbmdyb3VwJ1xuaW1wb3J0IEJpZ0NoZWNrYm94IGZyb20gJ0Blc3NhcHBzdGF0ZS9jYW5vcHktcmVhY3QtYmlnY2hlY2tib3gnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZvcm0gZXh0ZW5kcyBDb21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKVxuICB9XG5cbiAgaW50ZXJ2YWxUaW1lKCkge1xuICAgIGNvbnN0IHtyZXNvdXJjZSwgdXBkYXRlfSA9IHRoaXMucHJvcHNcbiAgICBjb25zdCBidXR0b25zID0gW1xuICAgICAge1xuICAgICAgICB2YWx1ZTogJzInLFxuICAgICAgICBsYWJlbDogKDxzcGFuPjI8L3NwYW4+KVxuICAgICAgfSwge1xuICAgICAgICB2YWx1ZTogJzQnLFxuICAgICAgICBsYWJlbDogKDxzcGFuPjQ8L3NwYW4+KVxuICAgICAgfSwge1xuICAgICAgICB2YWx1ZTogJzYnLFxuICAgICAgICBsYWJlbDogKDxzcGFuPjY8L3NwYW4+KVxuICAgICAgfSwge1xuICAgICAgICB2YWx1ZTogJzgnLFxuICAgICAgICBsYWJlbDogKDxzcGFuPjg8L3NwYW4+KVxuICAgICAgfSwge1xuICAgICAgICB2YWx1ZTogJzEwJyxcbiAgICAgICAgbGFiZWw6ICg8c3Bhbj4xMDwvc3Bhbj4pXG4gICAgICB9XG4gICAgXVxuICAgIHJldHVybiA8QnV0dG9uR3JvdXBcbiAgICAgIG5hbWU9XCJpbnRlcnZhbFRpbWVcIlxuICAgICAgYnV0dG9ucz17YnV0dG9uc31cbiAgICAgIG1hdGNoPXtyZXNvdXJjZS5pbnRlcnZhbFRpbWV9XG4gICAgICBoYW5kbGU9e3VwZGF0ZS5iaW5kKHRoaXMsICdpbnRlcnZhbFRpbWUnKX1cbiAgICAgIGFjdGl2ZUNvbG9yPVwicHJpbWFyeVwiLz5cbiAgfVxuXG4gIGl0ZXJhdGlvbnMoKSB7XG4gICAgY29uc3Qge3Jlc291cmNlLCB1cGRhdGV9ID0gdGhpcy5wcm9wc1xuICAgIGNvbnN0IGJ1dHRvbnMgPSBbXG4gICAgICB7XG4gICAgICAgIHZhbHVlOiAnMCcsXG4gICAgICAgIGxhYmVsOiAoPHNwYW4+XG4gICAgICAgICAgPGkgY2xhc3NOYW1lPVwiZmFzIGZhLWluZmluaXR5XCI+PC9pPlxuICAgICAgICA8L3NwYW4+KVxuICAgICAgfSwge1xuICAgICAgICB2YWx1ZTogJzEnLFxuICAgICAgICBsYWJlbDogKDxzcGFuPjE8L3NwYW4+KVxuICAgICAgfSwge1xuICAgICAgICB2YWx1ZTogJzInLFxuICAgICAgICBsYWJlbDogKDxzcGFuPjI8L3NwYW4+KVxuICAgICAgfSwge1xuICAgICAgICB2YWx1ZTogJzMnLFxuICAgICAgICBsYWJlbDogKDxzcGFuPjM8L3NwYW4+KVxuICAgICAgfVxuICAgIF1cbiAgICByZXR1cm4gPEJ1dHRvbkdyb3VwXG4gICAgICBuYW1lPVwiaXRlcmF0aW9uc1wiXG4gICAgICBidXR0b25zPXtidXR0b25zfVxuICAgICAgbWF0Y2g9e3Jlc291cmNlLml0ZXJhdGlvbnN9XG4gICAgICBoYW5kbGU9e3VwZGF0ZS5iaW5kKHRoaXMsICdpdGVyYXRpb25zJyl9XG4gICAgICB2ZXJ0aWNhbD17ZmFsc2V9XG4gICAgICBhY3RpdmVDb2xvcj1cInByaW1hcnlcIi8+XG4gIH1cblxuICBpbmRpY2F0b3IoKSB7XG4gICAgY29uc3Qge3Jlc291cmNlLCB1cGRhdGV9ID0gdGhpcy5wcm9wc1xuICAgIGNvbnN0IGJ1dHRvbnMgPSBbXG4gICAgICB7XG4gICAgICAgIHZhbHVlOiAnMCcsXG4gICAgICAgIGxhYmVsOiAoPHNwYW4+Tm9uZTwvc3Bhbj4pXG4gICAgICB9LCB7XG4gICAgICAgIHZhbHVlOiAnMScsXG4gICAgICAgIGxhYmVsOiAoPHNwYW4+XG4gICAgICAgICAgPGkgY2xhc3NOYW1lPVwiZmFzIGZhLWNpcmNsZVwiPjwvaT4mbmJzcDtCdWxsZXRzPC9zcGFuPilcbiAgICAgIH0sIHtcbiAgICAgICAgdmFsdWU6ICcyJyxcbiAgICAgICAgbGFiZWw6IChcbiAgICAgICAgICA8c3Bhbj5cbiAgICAgICAgICAgIDxpIGNsYXNzTmFtZT1cImZhcyBmYS1pbWFnZVwiPjwvaT4mbmJzcDtUaHVtYm5haWxzPC9zcGFuPlxuICAgICAgICApXG4gICAgICB9XG4gICAgXVxuICAgIHJldHVybiA8QnV0dG9uR3JvdXBcbiAgICAgIG5hbWU9XCJpbmRpY2F0b3JcIlxuICAgICAgYnV0dG9ucz17YnV0dG9uc31cbiAgICAgIG1hdGNoPXtyZXNvdXJjZS5pbmRpY2F0b3J9XG4gICAgICBoYW5kbGU9e3VwZGF0ZS5iaW5kKHRoaXMsICdpbmRpY2F0b3InKX1cbiAgICAgIGFjdGl2ZUNvbG9yPVwicHJpbWFyeVwiLz5cbiAgfVxuXG4gIGNvbnRyb2xzKCkge1xuICAgIGNvbnN0IHtyZXNvdXJjZSwgdXBkYXRlfSA9IHRoaXMucHJvcHNcbiAgICByZXR1cm4gPEJpZ0NoZWNrYm94XG4gICAgICBsYWJlbD1cIlNob3cgY29udHJvbHNcIlxuICAgICAgY2hlY2tlZD17cmVzb3VyY2UuY29udHJvbHN9XG4gICAgICBoYW5kbGU9e3VwZGF0ZS5iaW5kKHRoaXMsICdjb250cm9scycpfS8+XG4gIH1cblxuICBwYXVzZSgpIHtcbiAgICBjb25zdCB7cmVzb3VyY2UsIHVwZGF0ZX0gPSB0aGlzLnByb3BzXG4gICAgcmV0dXJuIDxCaWdDaGVja2JveFxuICAgICAgbGFiZWw9XCJQYXVzZSBvbiBtb3VzZSBvdmVyXCJcbiAgICAgIGNoZWNrZWQ9e3Jlc291cmNlLnBhdXNlfVxuICAgICAgaGFuZGxlPXt1cGRhdGUuYmluZCh0aGlzLCAncGF1c2UnKX0vPlxuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHtyZXNvdXJjZSwgc2F2ZSwgdXBkYXRlfSA9IHRoaXMucHJvcHNcbiAgICBjb25zdCBkaXNhYmxlU2F2ZSA9IHJlc291cmNlICYmIHJlc291cmNlLnRpdGxlLmxlbmd0aCA9PT0gMFxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICA8bGFiZWw+VGl0bGU8L2xhYmVsPlxuICAgICAgICA8aW5wdXRcbiAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgbmFtZT1cInRpdGxlXCJcbiAgICAgICAgICBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2wgbWItM1wiXG4gICAgICAgICAgcGxhY2Vob2xkZXI9XCJSZXF1aXJlZFwiXG4gICAgICAgICAgdmFsdWU9e3Jlc291cmNlLnRpdGxlfVxuICAgICAgICAgIG9uQ2hhbmdlPXt1cGRhdGUuYmluZCh0aGlzLCAndGl0bGUnKX0vPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLXNtLTYgbWItM1wiPlxuICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImxlYWRcIj5JdGVyYXRpb25zPC9sYWJlbD5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZC1pbmxpbmVcIj57dGhpcy5pdGVyYXRpb25zKCl9PC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtc20tNiBtYi0zXCI+XG4gICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwibGVhZFwiPkludGVydmFsPC9sYWJlbD57dGhpcy5pbnRlcnZhbFRpbWUoKX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1zbS02IG1iLTNcIj5cbiAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJsZWFkXCI+SW5kaWNhdG9yPC9sYWJlbD57dGhpcy5pbmRpY2F0b3IoKX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1zbS02IG1iLTNcIj5cbiAgICAgICAgICAgIDxkaXY+e3RoaXMuY29udHJvbHMoKX08L2Rpdj5cbiAgICAgICAgICAgIDxkaXY+e3RoaXMucGF1c2UoKX08L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYnRuIGJ0bi1wcmltYXJ5XCIgZGlzYWJsZWQ9e2Rpc2FibGVTYXZlfSBvbkNsaWNrPXtzYXZlfT5TYXZlIENhcm91c2VsPC9idXR0b24+XG4gICAgICA8L2Rpdj5cbiAgICApXG4gIH1cbn1cbkZvcm0ucHJvcFR5cGVzID0ge1xuICByZXNvdXJjZTogUHJvcFR5cGVzLm9iamVjdCxcbiAgZmluaXNoOiBQcm9wVHlwZXMuZnVuYyxcbiAgc2F2ZTogUHJvcFR5cGVzLmZ1bmMsXG4gIHVwZGF0ZTogUHJvcFR5cGVzLmZ1bmMsXG59XG4iLCIndXNlIHN0cmljdCdcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nXG5pbXBvcnQgTGlzdGluZyBmcm9tICcuLi9FeHRlbmRzL0xpc3RpbmcnXG5pbXBvcnQgRm9ybSBmcm9tICcuL0Zvcm0nXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENhcm91c2VsIGV4dGVuZHMgTGlzdGluZyB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpXG4gICAgdGhpcy5tb2R1bGUgPSAnY2Fyb3VzZWwnXG4gICAgdGhpcy5yb2xlID0gJ0FkbWluJ1xuICAgIHRoaXMuY29udHJvbCA9ICdDYXJvdXNlbCdcbiAgICB0aGlzLmxhYmVsID0gJ0Nhcm91c2VsJ1xuICAgIHRoaXMuZm9ybSA9IHRoaXMuZm9ybS5iaW5kKHRoaXMpXG4gICAgdGhpcy5kZWZhdWx0UmVzb3VyY2UgPSB7XG4gICAgICBpZDogMCxcbiAgICAgIHRpdGxlOiAnJyxcbiAgICAgIGl0ZXJhdGlvbnM6ICcyJyxcbiAgICAgIGludGVydmFsVGltZTogJzQnLFxuICAgICAgaW5kaWNhdG9yOiAnMCcsXG4gICAgICBjb250cm9sczogdHJ1ZSxcbiAgICAgIHBhdXNlOiB0cnVlXG4gICAgfVxuICAgIHRoaXMuY29sdW1ucyA9IFtcbiAgICAgIHtcbiAgICAgICAgY29sdW1uOiAndGl0bGUnLFxuICAgICAgICBsYWJlbDogJ1RpdGxlJ1xuICAgICAgfVxuICAgIF1cbiAgICB0aGlzLmNvbnRleHRNZW51ID0gW1xuICAgICAge1xuICAgICAgICBoYW5kbGVDbGljazogdGhpcy5jb21tYW5kLmJpbmQodGhpcyksXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICBjb21tYW5kOiAnZWRpdCdcbiAgICAgICAgfSxcbiAgICAgICAgbGFiZWw6IChcbiAgICAgICAgICA8YSBocmVmPVwiI1wiPlxuICAgICAgICAgICAgPGkgY2xhc3NOYW1lPVwiZmFzIGZhLWVkaXRcIj48L2k+Jm5ic3A7RWRpdCBDYXJvdXNlbDwvYT5cbiAgICAgICAgKVxuICAgICAgfSwge1xuICAgICAgICBoYW5kbGVDbGljazogdGhpcy5jb21tYW5kLmJpbmQodGhpcyksXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICBjb21tYW5kOiAnc2xpZGVzJ1xuICAgICAgICB9LFxuICAgICAgICBsYWJlbDogKFxuICAgICAgICAgIDxhIGhyZWY9XCIjXCI+XG4gICAgICAgICAgICA8aSBjbGFzc05hbWU9XCJmYXMgZmEtaW1hZ2VzXCI+PC9pPiZuYnNwO1VwZGF0ZSBTbGlkZXM8L2E+XG4gICAgICAgIClcbiAgICAgIH0sIHtcbiAgICAgICAgaGFuZGxlQ2xpY2s6IHRoaXMuY29tbWFuZC5iaW5kKHRoaXMpLFxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgY29tbWFuZDogJ2RlbGV0ZSdcbiAgICAgICAgfSxcbiAgICAgICAgbGFiZWw6IChcbiAgICAgICAgICA8YSBocmVmPVwiI1wiPlxuICAgICAgICAgICAgPGkgY2xhc3NOYW1lPVwiZmFzIGZhLXRyYXNoXCI+PC9pPiZuYnNwO0RlbGV0ZSBDYXJvdXNlbDwvYT5cbiAgICAgICAgKVxuICAgICAgfVxuICAgIF1cbiAgICB0aGlzLnN0YXRlLnJlc291cmNlID0gdGhpcy5kZWZhdWx0UmVzb3VyY2VcbiAgfVxuXG4gIGNvbW1hbmQoZXZlbnQsIGRhdGEpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgc3dpdGNoIChkYXRhLmNvbW1hbmQpIHtcbiAgICAgIGNhc2UgJ2VkaXQnOlxuICAgICAgICB0aGlzLmVkaXRSZXNvdXJjZShkYXRhLm5hbWUpXG4gICAgICAgIGJyZWFrXG5cbiAgICAgIGNhc2UgJ2RlbGV0ZSc6XG4gICAgICAgIHRoaXMuZGVsZXRlUmVzb3VyY2UoZGF0YS5uYW1lKVxuICAgICAgICBicmVha1xuXG4gICAgICBjYXNlICdzbGlkZXMnOlxuICAgICAgICBsb2NhdGlvbi5ocmVmID0gJy4vY2Fyb3VzZWwvQWRtaW4vU2xpZGUvP2Nhcm91c2VsPScgKyB0aGlzLnN0YXRlLmxpc3RpbmdbZGF0YS5uYW1lXS5pZFxuICAgICAgICBicmVha1xuICAgIH1cbiAgfVxuXG4gIGZvcm0oKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxGb3JtXG4gICAgICAgIGNsb3NlPXt0aGlzLmZpbmlzaH1cbiAgICAgICAgdXBkYXRlPXt0aGlzLnVwZGF0ZX1cbiAgICAgICAgcmVzb3VyY2U9e3RoaXMuc3RhdGUucmVzb3VyY2V9XG4gICAgICAgIHNhdmU9e3RoaXMuc2F2ZX0vPlxuICAgIClcbiAgfVxuXG4gIG92ZXJsYXkoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNvbnRlbnQ6IDxkaXYgY2xhc3NOYW1lPVwiY2Fyb3VzZWwtZm9ybVwiPnt0aGlzLmZvcm0oKX08L2Rpdj4sXG4gICAgICB3aWR0aDogJzgwJScsXG4gICAgICB0aXRsZTogJ0VkaXQgQ2Fyb3VzZWwnLFxuICAgICAgY2xvc2U6IHRoaXMubG9hZFxuICAgIH1cbiAgfVxuXG59XG5SZWFjdERPTS5yZW5kZXIoPENhcm91c2VsLz4sIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdDYXJvdXNlbCcpKVxuIiwiJ3VzZSBzdHJpY3QnXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnXG5pbXBvcnQge0ZvbnRBd2Vzb21lSWNvbn0gZnJvbSAnQGZvcnRhd2Vzb21lL3JlYWN0LWZvbnRhd2Vzb21lJ1xuaW1wb3J0IHtmYUNhcmV0VXAsIGZhQ2FyZXREb3dufSBmcm9tICdAZm9ydGF3ZXNvbWUvZnJlZS1zb2xpZC1zdmctaWNvbnMnXG5pbXBvcnQge0NvbnRleHRNZW51LCBNZW51SXRlbSwgQ29udGV4dE1lbnVUcmlnZ2VyfSBmcm9tIFwicmVhY3QtY29udGV4dG1lbnVcIlxuaW1wb3J0ICcuL2dyaWQuc2NzcydcblxuY29uc3QgR3JpZCA9ICh7bGlzdGluZywgY29sdW1ucywgc29ydEZ1bmN0aW9uLCBjdXJyZW50U29ydCwgY29udGV4dE1lbnV9KSA9PiB7XG4gIGNvbnN0IHNvcnRJY29uVHJhY2sgPSB7fVxuICBjb2x1bW5zLmZvckVhY2goKHZhbHVlKSA9PiB7XG4gICAgc29ydEljb25UcmFja1t2YWx1ZS5jb2x1bW5dID0gMFxuICB9KVxuICBpZiAoY3VycmVudFNvcnQuc29ydEJ5KSB7XG4gICAgc29ydEljb25UcmFja1tjdXJyZW50U29ydC5zb3J0QnldID0gY3VycmVudFNvcnQuc29ydEJ5RGlyXG4gIH1cblxuICBjb25zdCBNRU5VX1RZUEUgPSAnU0lNUExFJ1xuICBjb25zdCBjb2xsZWN0ID0gKHByb3BzKSA9PiB7XG4gICAgcmV0dXJuIHtuYW1lOiBwcm9wcy5uYW1lfVxuICB9XG5cbiAgY29uc3QgaGVhZGVycyA9IChjb2x1bW5zLCBzb3J0RnVuY3Rpb24pID0+IHtcbiAgICBjb25zdCB0aCA9IGNvbHVtbnMubWFwKCh2YWx1ZSwga2V5KSA9PiB7XG4gICAgICBsZXQgaWNvblxuICAgICAgbGV0IGNsYXNzTmFtZSA9IFtdXG4gICAgICBpZiAoc29ydEljb25UcmFja1t2YWx1ZS5jb2x1bW5dID09PSAxKSB7XG4gICAgICAgIGNsYXNzTmFtZS5wdXNoKCdwb2ludGVyJylcbiAgICAgICAgaWNvbiA9IDxGb250QXdlc29tZUljb24gaWNvbj17ZmFDYXJldFVwfS8+XG4gICAgICB9IGVsc2UgaWYgKHNvcnRJY29uVHJhY2tbdmFsdWUuY29sdW1uXSA9PT0gMikge1xuICAgICAgICBjbGFzc05hbWUucHVzaCgncG9pbnRlcicpXG4gICAgICAgIGljb24gPSA8Rm9udEF3ZXNvbWVJY29uIGljb249e2ZhQ2FyZXREb3dufS8+XG4gICAgICB9XG4gICAgICBpZiAodmFsdWUuY2xhc3NOYW1lKSB7XG4gICAgICAgIGNsYXNzTmFtZS5wdXNoKCdiZy1wcmltYXJ5JylcbiAgICAgIH1cblxuICAgICAgbGV0IHN0eWxlXG4gICAgICBpZiAodmFsdWUuc3R5bGUgJiYgdHlwZW9mIHZhbHVlLnN0eWxlID09PSAnb2JqZWN0Jykge1xuICAgICAgICBzdHlsZSA9IHZhbHVlLnN0eWxlXG4gICAgICB9XG5cbiAgICAgIHJldHVybiAoXG4gICAgICAgIDx0aFxuICAgICAgICAgIHN0eWxlPXtzdHlsZX1cbiAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZX1cbiAgICAgICAgICBrZXk9e2tleX1cbiAgICAgICAgICBvbkNsaWNrPXtzb3J0RnVuY3Rpb24uYmluZChudWxsLCB2YWx1ZS5jb2x1bW4pfT57dmFsdWUubGFiZWx9Jm5ic3A7e2ljb259XG4gICAgICAgIDwvdGg+XG4gICAgICApXG4gICAgfSlcbiAgICByZXR1cm4gKDx0cj57dGh9PC90cj4pXG4gIH1cbiAgbGV0IHRhYmxlQ2xhc3MgPSAndGFibGUgdGFibGUtc3RyaXBlZCB0YWJsZS1ob3ZlcidcblxuICBsZXQgbWVudVxuICBpZiAoY29udGV4dE1lbnUpIHtcbiAgICBsZXQgbWVudU9wdGlvbnMgPSBjb250ZXh0TWVudS5tYXAoKHZhbHVlLCBrZXkpID0+IHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxNZW51SXRlbSBvbkNsaWNrPXt2YWx1ZS5oYW5kbGVDbGlja30gZGF0YT17dmFsdWUuZGF0YX0ga2V5PXtrZXl9PlxuICAgICAgICAgIHt2YWx1ZS5sYWJlbH1cbiAgICAgICAgPC9NZW51SXRlbT5cbiAgICAgIClcbiAgICB9KVxuICAgIG1lbnUgPSAoXG4gICAgICA8Q29udGV4dE1lbnUgaWQ9e01FTlVfVFlQRX0+XG4gICAgICAgIHttZW51T3B0aW9uc31cbiAgICAgIDwvQ29udGV4dE1lbnU+XG4gICAgKVxuICB9XG5cbiAgbGV0IHJvd3MgPSBsaXN0aW5nLm1hcCgocmVzb3VyY2UsIGtleSkgPT4ge1xuICAgIGxldCBzdGFjayA9IGNvbHVtbnMubWFwKCh2YWx1ZSwgc3Via2V5KSA9PiB7XG4gICAgICBpZiAodmFsdWUuY2FsbGJhY2spIHtcbiAgICAgICAgcmV0dXJuIDx0ZCBrZXk9e3N1YmtleX0gY2xhc3NOYW1lPXt2YWx1ZS5jbGFzc05hbWV9Pnt2YWx1ZS5jYWxsYmFjayhyZXNvdXJjZSl9PC90ZD5cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiA8dGQga2V5PXtzdWJrZXl9IGNsYXNzTmFtZT17dmFsdWUuY2xhc3NOYW1lfT57cmVzb3VyY2VbdmFsdWUuY29sdW1uXX08L3RkPlxuICAgICAgfVxuICAgIH0pXG4gICAgXG4gICAgaWYgKGNvbnRleHRNZW51KSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8Q29udGV4dE1lbnVUcmlnZ2VyXG4gICAgICAgICAgcmVuZGVyVGFnPVwidHJcIlxuICAgICAgICAgIG5hbWU9e2tleX1cbiAgICAgICAgICBpZD17TUVOVV9UWVBFfVxuICAgICAgICAgIGhvbGRUb0Rpc3BsYXk9ezEwMDB9XG4gICAgICAgICAga2V5PXtrZXl9XG4gICAgICAgICAgYXR0cmlidXRlcz17e2NsYXNzTmFtZTogJ2NvbnRleHQnfX1cbiAgICAgICAgICBjb2xsZWN0PXtjb2xsZWN0fT5cbiAgICAgICAgICB7c3RhY2t9XG4gICAgICAgIDwvQ29udGV4dE1lbnVUcmlnZ2VyPlxuICAgICAgKVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gKDx0ciBrZXk9e2tleX0+XG4gICAgICAgIHtzdGFja31cbiAgICAgIDwvdHI+KVxuICAgIH1cbiAgfSlcblxuICByZXR1cm4gKFxuICAgIDxkaXY+XG4gICAgICA8dGFibGUgY2xhc3NOYW1lPXt0YWJsZUNsYXNzfT5cbiAgICAgICAgPHRib2R5PlxuICAgICAgICAgIHtoZWFkZXJzKGNvbHVtbnMsIHNvcnRGdW5jdGlvbil9XG4gICAgICAgICAge3Jvd3N9XG4gICAgICAgIDwvdGJvZHk+XG4gICAgICA8L3RhYmxlPlxuICAgICAge21lbnV9XG4gICAgPC9kaXY+XG4gIClcbn1cblxuR3JpZC5wcm9wVHlwZXMgPSB7XG4gIGxpc3Rpbmc6IFByb3BUeXBlcy5hcnJheSxcbiAgY29sdW1uczogUHJvcFR5cGVzLmFycmF5LFxuICBzb3J0RnVuY3Rpb246IFByb3BUeXBlcy5mdW5jLFxuICBjdXJyZW50U29ydDogUHJvcFR5cGVzLm9iamVjdCxcbiAgY29udGV4dE1lbnU6IFByb3BUeXBlcy5hcnJheVxufVxuXG5HcmlkLmRlZmF1bHRQcm9wcyA9IHtcbiAgY29udGV4dE1lbnU6IG51bGxcbn1cbmV4cG9ydCBkZWZhdWx0IEdyaWRcbiIsIid1c2Ugc3RyaWN0J1xuaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tICdyZWFjdCdcbmltcG9ydCB7TmF2YmFyLCBOYXZiYXJCdXR0b24sIE5hdmJhclNlYXJjaH0gZnJvbSAnQGVzc2FwcHN0YXRlL3JlYWN0LW5hdmJhcidcbmltcG9ydCBXYWl0aW5nIGZyb20gJ0Blc3NhcHBzdGF0ZS9yZWFjdC13YWl0aW5nJ1xuaW1wb3J0IEdyaWQgZnJvbSAnLi9HcmlkJ1xuaW1wb3J0IE92ZXJsYXkgZnJvbSAnQGVzc2FwcHN0YXRlL2Nhbm9weS1yZWFjdC1vdmVybGF5J1xuLyogZ2xvYmFsICQgKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGRlYm91bmNlKGZuLCBkZWxheSkge1xuICB2YXIgdGltZXIgPSBudWxsXG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGNvbnRleHQgPSB0aGlzLFxuICAgICAgYXJncyA9IGFyZ3VtZW50c1xuICAgIGNsZWFyVGltZW91dCh0aW1lcilcbiAgICB0aW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgZm4uYXBwbHkoY29udGV4dCwgYXJncylcbiAgICB9LCBkZWxheSlcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMaXN0aW5nIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgZGVsYXlMb2FkKCkge1xuICAgIHRoaXMubG9hZCgpXG4gIH1cblxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKVxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBzZWFyY2g6ICcnLFxuICAgICAgbGlzdGluZzogW10sXG4gICAgICBsb2FkaW5nOiB0cnVlLFxuICAgICAgbWVzc2FnZTogbnVsbCxcbiAgICAgIG1lc3NhZ2VUeXBlOiAnZGFuZ2VyJyxcbiAgICAgIG92ZXJsYXk6IGZhbHNlLFxuICAgICAgcmVzb3VyY2U6IHt9XG4gICAgfVxuICAgIHRoaXMubW9kdWxlID0gJ21vZHVsZSdcbiAgICB0aGlzLnJvbGUgPSAncm9sZSdcbiAgICB0aGlzLmNvbnRyb2wgPSAnY29udHJvbCdcbiAgICB0aGlzLmxhYmVsID0gJ2xhYmVsJ1xuICAgIHRoaXMuc29ydEJ5ID0gbnVsbFxuICAgIHRoaXMuc29ydEJ5RGlyID0gMFxuICAgIHRoaXMuZGVmYXVsdFJlc291cmNlID0ge31cbiAgICB0aGlzLnNhdmUgPSB0aGlzLnNhdmUuYmluZCh0aGlzKVxuICAgIHRoaXMuc2hvd0dyaWQgPSB0aGlzLnNob3dHcmlkLmJpbmQodGhpcylcbiAgICB0aGlzLmxvYWQgPSB0aGlzLmxvYWQuYmluZCh0aGlzKVxuICAgIHRoaXMucmVzZXQgPSB0aGlzLnJlc2V0LmJpbmQodGhpcylcbiAgICB0aGlzLnNvcnRCeUNvbHVtbiA9IHRoaXMuc29ydEJ5Q29sdW1uLmJpbmQodGhpcylcbiAgICB0aGlzLmhhbmRsZSA9IHRoaXMuaGFuZGxlLmJpbmQodGhpcylcbiAgICB0aGlzLm92ZXJsYXlPbiA9IHRoaXMub3ZlcmxheU9uLmJpbmQodGhpcylcbiAgICB0aGlzLm92ZXJsYXlPZmYgPSB0aGlzLm92ZXJsYXlPZmYuYmluZCh0aGlzKVxuICAgIHRoaXMuZWRpdFJlc291cmNlID0gdGhpcy5lZGl0UmVzb3VyY2UuYmluZCh0aGlzKVxuICAgIHRoaXMuZGVsYXlMb2FkID0gZGVib3VuY2UodGhpcy5kZWxheUxvYWQsIDEwMDApXG4gICAgdGhpcy51cGRhdGUgPSB0aGlzLnVwZGF0ZS5iaW5kKHRoaXMpXG4gIH1cblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICB0aGlzLmxvYWQoKVxuICAgIHRoaXMuc2V0U3RhdGUoe3Jlc291cmNlOiB0aGlzLmRlZmF1bHRSZXNvdXJjZX0pXG4gIH1cblxuICBmaW5pc2goKSB7XG4gICAgdGhpcy5sb2FkKClcbiAgICB0aGlzLm92ZXJsYXlPZmYoKVxuICB9XG5cbiAgb3ZlcmxheU9uKCkge1xuICAgIHRoaXMuc2V0U3RhdGUoe292ZXJsYXk6IHRydWV9KVxuICB9XG5cbiAgb3ZlcmxheU9mZigpIHtcbiAgICB0aGlzLnNldFN0YXRlKHtvdmVybGF5OiBmYWxzZX0pXG4gIH1cblxuICBsb2FkUmVzb3VyY2Uoa2V5KSB7XG4gICAgY29uc3QgcmVzb3VyY2UgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLnN0YXRlLmxpc3Rpbmdba2V5XSlcbiAgICB0aGlzLnNldFN0YXRlKHtyZXNvdXJjZX0pXG4gIH1cblxuICBlZGl0UmVzb3VyY2Uoa2V5KSB7XG4gICAgdGhpcy5sb2FkUmVzb3VyY2Uoa2V5KVxuICAgIHRoaXMub3ZlcmxheU9uKClcbiAgfVxuICBcbiAgZGVsZXRlUmVzb3VyY2Uoa2V5KSB7XG4gICAgY29uc3QgcmVzb3VyY2UgPSB0aGlzLnN0YXRlLmxpc3Rpbmdba2V5XVxuICAgIGlmIChjb25maXJtKCdBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gZGVsZXRlIHRoaXMgY2Fyb3VzZWwgYWxvbmcgd2l0aCBhbGwgaXRcXCdzIHNsaWRlcz8nKSkge1xuICAgICAgJC5hamF4KHtcbiAgICAgICAgdXJsOiB0aGlzLmdldFVybCgpICsgJy8nICsgcmVzb3VyY2UuaWQsXG4gICAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICAgIHR5cGU6ICdkZWxldGUnLFxuICAgICAgICBzdWNjZXNzOiAoKT0+e1xuICAgICAgICAgIHRoaXMuc2V0TWVzc2FnZSh0aGlzLmxhYmVsICsgICcgZGVsZXRlZC4nLCAnc3VjY2VzcycpXG4gICAgICAgICAgdGhpcy5sb2FkKClcbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3I6ICgpPT57XG4gICAgICAgICAgdGhpcy5zZXRNZXNzYWdlKCdTb3JyeS4gQW4gZXJyb3IgcHJldmVudGVkIGRlbGV0aW5nIHRoZSAnICsgdGhpcy5sYWJlbCwgJ2RhbmdlcicpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICB9XG5cbiAgaGFuZGxlKHZhcm5hbWUsIHZhbHVlKSB7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIHZhbHVlID0gdmFsdWUudGFyZ2V0LnZhbHVlXG4gICAgfVxuICAgIGNvbnN0IHJlc291cmNlID0gdGhpcy5zdGF0ZS5yZXNvdXJjZVxuICAgIHJlc291cmNlW3Zhcm5hbWVdID0gdmFsdWVcbiAgICB0aGlzLnNldFN0YXRlKHtyZXNvdXJjZX0pXG4gIH1cblxuICByZXNldCgpIHtcbiAgICB0aGlzLm92ZXJsYXlPZmYoKVxuICAgIHRoaXMuc2V0U3RhdGUoe3Jlc291cmNlOiBPYmplY3QuYXNzaWduKHt9LCB0aGlzLmRlZmF1bHRSZXNvdXJjZSl9KVxuICB9XG5cbiAgZ2V0U2VhcmNoKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8TmF2YmFyU2VhcmNoXG4gICAgICAgIHZhbHVlPXt0aGlzLnN0YXRlLnNlYXJjaH1cbiAgICAgICAgcGxhY2Vob2xkZXI9XCJTZWFyY2hcIlxuICAgICAgICBvbkNoYW5nZT17KGUpID0+IHtcbiAgICAgICAgICB0aGlzLnVwZGF0ZVNlYXJjaChlLnRhcmdldC52YWx1ZSlcbiAgICAgICAgfX0vPlxuICAgIClcbiAgfVxuXG4gIHVwZGF0ZVNlYXJjaChzZWFyY2gpIHtcbiAgICB0aGlzLnNldFN0YXRlKHtzZWFyY2h9KVxuXG4gICAgaWYgKHNlYXJjaC5sZW5ndGggPiAyIHx8IHNlYXJjaC5sZW5ndGggPT09IDApIHtcbiAgICAgIHRoaXMuZGVsYXlMb2FkKClcbiAgICB9XG4gIH1cblxuICBzb3J0QnlDb2x1bW4oY29sdW1uKSB7XG4gICAgaWYgKGNvbHVtbiA9PT0gdGhpcy5zb3J0QnkpIHtcbiAgICAgIHN3aXRjaCAodGhpcy5zb3J0QnlEaXIpIHtcbiAgICAgICAgY2FzZSAwOlxuICAgICAgICAgIHRoaXMuc29ydEJ5RGlyID0gMVxuICAgICAgICAgIGJyZWFrXG5cbiAgICAgICAgY2FzZSAxOlxuICAgICAgICAgIHRoaXMuc29ydEJ5RGlyID0gMlxuICAgICAgICAgIGJyZWFrXG5cbiAgICAgICAgY2FzZSAyOlxuICAgICAgICAgIHRoaXMuc29ydEJ5RGlyID0gMFxuICAgICAgICAgIHRoaXMuc29ydEJ5ID0gbnVsbFxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNvcnRCeURpciA9IDFcbiAgICAgIHRoaXMuc29ydEJ5ID0gY29sdW1uXG4gICAgfVxuXG4gICAgdGhpcy5sb2FkKClcbiAgfVxuXG4gIGdldFVybCgpIHtcbiAgICByZXR1cm4gYCR7dGhpcy5tb2R1bGV9LyR7dGhpcy5yb2xlfS8ke3RoaXMuY29udHJvbH1gXG4gIH1cblxuICBsb2FkKCkge1xuICAgIGNvbnN0IHVybCA9IHRoaXMuZ2V0VXJsKClcbiAgICAkLmFqYXgoe1xuICAgICAgdXJsLFxuICAgICAgZGF0YToge1xuICAgICAgICBzZWFyY2g6IHRoaXMuc3RhdGUuc2VhcmNoLFxuICAgICAgICBzb3J0Qnk6IHRoaXMuc29ydEJ5LFxuICAgICAgICBzb3J0QnlEaXI6IHRoaXMuc29ydEJ5RGlyXG4gICAgICB9LFxuICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgIHR5cGU6ICdnZXQnLFxuICAgICAgc3VjY2VzczogKGRhdGEpID0+IHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7bGlzdGluZzogZGF0YS5saXN0aW5nLCBsb2FkaW5nOiBmYWxzZX0pXG4gICAgICB9LFxuICAgICAgZXJyb3I6ICgpID0+IHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7bG9hZGluZzogZmFsc2V9KVxuICAgICAgICB0aGlzLnNldE1lc3NhZ2UoJ0NvdWxkIG5vdCBhY2Nlc3Mgc2VydmVyJylcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgc2hvd0dyaWQoKSB7fVxuXG4gIHNldE1lc3NhZ2UobWVzc2FnZSwgbWVzc2FnZVR5cGUgPSAnZGFuZ2VyJykge1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5jbGVhck1lc3NhZ2UoKVxuICAgIH0sIDUwMDApXG5cbiAgICB0aGlzLnNldFN0YXRlKHttZXNzYWdlLCBtZXNzYWdlVHlwZX0pXG4gIH1cblxuICBjbGVhck1lc3NhZ2UoKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7bWVzc2FnZTogbnVsbCwgbWVzc2FnZVR5cGU6ICdkYW5nZXInfSlcbiAgfVxuXG4gIHNhdmUoKSB7XG4gICAgbGV0IHR5cGUgPSAncG9zdCdcbiAgICBsZXQgdXJsID0gdGhpcy5nZXRVcmwoKVxuICAgIGlmICh0aGlzLnN0YXRlLnJlc291cmNlLmlkICE9PSAnMCcpIHtcbiAgICAgIHVybCA9IHVybCArICcvJyArIHRoaXMuc3RhdGUucmVzb3VyY2UuaWRcbiAgICAgIHR5cGUgPSAncHV0J1xuICAgIH1cbiAgICAkLmFqYXgoe1xuICAgICAgdXJsLFxuICAgICAgZGF0YToge1xuICAgICAgICAuLi50aGlzLnN0YXRlLnJlc291cmNlXG4gICAgICB9LFxuICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgIHR5cGUsXG4gICAgICBzdWNjZXNzOiAoKSA9PiB7XG4gICAgICAgIHRoaXMubG9hZCgpXG4gICAgICAgIHRoaXMuc2V0TWVzc2FnZShcbiAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPGkgY2xhc3NOYW1lPVwiZmFyIGZhLXRodW1icy11cFwiPjwvaT4mbmJzcDtTYXZlIHN1Y2Nlc3NmdWwuPC9kaXY+LFxuICAgICAgICAgICdzdWNjZXNzJ1xuICAgICAgICApXG4gICAgICB9LFxuICAgICAgZXJyb3I6ICgpID0+IHtcbiAgICAgICAgdGhpcy5zZXRNZXNzYWdlKFxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8aSBjbGFzc05hbWU9XCJmYXMgZmEtZXhjbGFtYXRpb24tdHJpYW5nbGVcIj48L2k+Jm5ic3A7VW5hYmxlIHRvIHNhdmUmbmJzcDt7dGhpcy5sYWJlbH0uPC9kaXY+XG4gICAgICAgIClcbiAgICAgIH0sXG4gICAgICBjb21wbGV0ZTogKCkgPT4gdGhpcy5yZXNldCgpXG5cbiAgICB9KVxuICB9XG5cbiAgbWVzc2FnZSgpIHtcbiAgICBjb25zdCBjbiA9IGBhbGVydCBhbGVydC0ke3RoaXMuc3RhdGUubWVzc2FnZVR5cGV9IGFsZXJ0LWRpc21pc3NpYmxlIGZhZGUgc2hvd2BcbiAgICBpZiAodGhpcy5zdGF0ZS5tZXNzYWdlKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17Y259PlxuICAgICAgICAgIDxzcGFuPnt0aGlzLnN0YXRlLm1lc3NhZ2V9PC9zcGFuPlxuICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT1cImNsb3NlXCIgZGF0YS1kaXNtaXNzPVwiYWxlcnRcIiBhcmlhLWxhYmVsPVwiQ2xvc2VcIj5cbiAgICAgICAgICAgIDxzcGFuIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPiZ0aW1lczs8L3NwYW4+XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKVxuICAgIH1cbiAgfVxuXG4gIG5hdmJhckJ1dHRvbigpIHtcbiAgICBjb25zdCBsYWJlbCA9IChcbiAgICAgIDxzcGFuPlxuICAgICAgICA8aSBjbGFzc05hbWU9XCJmYXMgZmEtcGx1c1wiPjwvaT4mbmJzcDtDcmVhdGU8L3NwYW4+XG4gICAgKVxuICAgIGNvbnN0IGJ1dHRvbiA9IChcbiAgICAgIDxOYXZiYXJCdXR0b25cbiAgICAgICAgY29sb3I9XCJvdXRsaW5lLXByaW1hcnlcIlxuICAgICAgICBsYWJlbD17bGFiZWx9XG4gICAgICAgIGhhbmRsZUNsaWNrPXt0aGlzLm92ZXJsYXlPbn0vPlxuICAgIClcbiAgICByZXR1cm4gYnV0dG9uXG4gIH1cblxuICB1cGRhdGUodmFybmFtZSwgdmFsdWUpIHtcbiAgICBsZXQgY2hhbmdlVmFsdWVcbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnb2JqZWN0Jykge1xuICAgICAgY2hhbmdlVmFsdWUgPSB2YWx1ZS50YXJnZXQudmFsdWVcbiAgICB9IGVsc2Uge1xuICAgICAgY2hhbmdlVmFsdWUgPSB2YWx1ZVxuICAgIH1cbiAgICBjb25zdCB7cmVzb3VyY2V9ID0gdGhpcy5zdGF0ZVxuICAgIHJlc291cmNlW3Zhcm5hbWVdID0gY2hhbmdlVmFsdWVcbiAgICB0aGlzLnNldFN0YXRlKHtyZXNvdXJjZX0pXG4gIH1cblxuICBuYXZiYXIoKSB7XG4gICAgY29uc3QgYnV0dG9uID0gdGhpcy5uYXZiYXJCdXR0b24oKVxuXG4gICAgY29uc3Qgc2VhcmNoID0gdGhpcy5nZXRTZWFyY2goKVxuICAgIHJldHVybiA8TmF2YmFyXG4gICAgICBsZWZ0U2lkZT17W2J1dHRvbl19XG4gICAgICByaWdodFNpZGU9e1tzZWFyY2hdfVxuICAgICAgYmFja2dyb3VuZD1cImxpZ2h0XCJcbiAgICAgIGNsYXNzTmFtZT1cImJvcmRlciByb3VuZGVkXCIvPlxuICB9XG5cbiAgdGl0bGUoKSB7XG4gICAgcmV0dXJuIG51bGxcbiAgfVxuXG4gIHNob3dPdmVybGF5KCkge1xuICAgIGNvbnN0IG92ZXJsYXkgPSB0aGlzLm92ZXJsYXkoKVxuICAgIGlmIChvdmVybGF5ID09PSBudWxsKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBsZXQgd2lkdGhcbiAgICBpZiAob3ZlcmxheS53aWR0aCkge1xuICAgICAgd2lkdGggPSBvdmVybGF5LndpZHRoXG4gICAgfVxuXG4gICAgbGV0IHRpdGxlXG4gICAgaWYgKG92ZXJsYXkudGl0bGUpIHtcbiAgICAgIHRpdGxlID0gb3ZlcmxheS50aXRsZVxuICAgIH1cblxuICAgIGxldCBjbG9zZVxuICAgIGlmIChvdmVybGF5LmNsb3NlKSB7XG4gICAgICBjbG9zZSA9ICgpID0+IHtcbiAgICAgICAgb3ZlcmxheS5jbG9zZSgpXG4gICAgICAgIHRoaXMub3ZlcmxheU9mZigpXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGNsb3NlID0gdGhpcy5vdmVybGF5T2ZmXG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgIDxPdmVybGF5IHNob3c9e3RoaXMuc3RhdGUub3ZlcmxheX0gd2lkdGg9e3dpZHRofSB0aXRsZT17dGl0bGV9IGNsb3NlPXtjbG9zZX0+e292ZXJsYXkuY29udGVudH08L092ZXJsYXk+XG4gICAgKVxuXG4gIH1cblxuICBjb250ZW50KCkge1xuICAgIGlmICh0aGlzLnN0YXRlLmxvYWRpbmcpIHtcbiAgICAgIHJldHVybiA8ZGl2PjxXYWl0aW5nLz48L2Rpdj5cbiAgICB9XG4gICAgaWYgKHRoaXMuc3RhdGUubGlzdGluZy5sZW5ndGggPT09IDApIHtcbiAgICAgIGNvbnN0IGNvbnRlbnQgPSBbXVxuICAgICAgY29udGVudC5wdXNoKDxzcGFuIGtleT1cIjFcIj5ObyB7dGhpcy5sYWJlbC50b0xvd2VyQ2FzZSgpfXMgZm91bmQuPC9zcGFuPilcbiAgICAgIGlmICh0aGlzLnN0YXRlLnNlYXJjaC5sZW5ndGggPiAwKSB7XG4gICAgICAgIGNvbnRlbnQucHVzaCg8c3BhbiBrZXk9XCIyXCI+Jm5ic3A7WW91IG1heSB3YW50IHRvIGJyb2FkZW4geW91ciBzZWFyY2guPC9zcGFuPilcbiAgICAgIH1cbiAgICAgIHJldHVybiBjb250ZW50XG4gICAgfVxuICAgIHJldHVybiAoXG4gICAgICA8R3JpZFxuICAgICAgICBsaXN0aW5nPXt0aGlzLnN0YXRlLmxpc3Rpbmd9XG4gICAgICAgIGVkaXQ9e3RoaXMuZWRpdFJlc291cmNlfVxuICAgICAgICBjb250ZXh0TWVudT17dGhpcy5jb250ZXh0TWVudX1cbiAgICAgICAgY29sdW1ucz17dGhpcy5jb2x1bW5zfVxuICAgICAgICBzb3J0RnVuY3Rpb249e3RoaXMuc29ydEJ5Q29sdW1ufVxuICAgICAgICBjdXJyZW50U29ydD17e1xuICAgICAgICAgIHNvcnRCeTogdGhpcy5zb3J0QnksXG4gICAgICAgICAgc29ydEJ5RGlyOiB0aGlzLnNvcnRCeURpclxuICAgICAgICB9fS8+XG4gICAgKVxuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICA8ZGl2Pnt0aGlzLnNob3dPdmVybGF5KCl9PC9kaXY+XG4gICAgICAgIDxkaXY+e3RoaXMubmF2YmFyKCl9PC9kaXY+XG4gICAgICAgIDxkaXY+e3RoaXMubWVzc2FnZSgpfTwvZGl2PlxuICAgICAgICA8ZGl2Pnt0aGlzLnRpdGxlKCl9PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibXQtM1wiPnt0aGlzLmNvbnRlbnQoKX08L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIClcbiAgfVxufVxuIiwiXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vZ3JpZC5zY3NzXCIpO1xuXG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcblxudmFyIHRyYW5zZm9ybTtcbnZhciBpbnNlcnRJbnRvO1xuXG5cblxudmFyIG9wdGlvbnMgPSB7XCJobXJcIjp0cnVlfVxuXG5vcHRpb25zLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVxub3B0aW9ucy5pbnNlcnRJbnRvID0gdW5kZWZpbmVkO1xuXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanNcIikoY29udGVudCwgb3B0aW9ucyk7XG5cbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuXG5pZihtb2R1bGUuaG90KSB7XG5cdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL2dyaWQuc2Nzc1wiLCBmdW5jdGlvbigpIHtcblx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vZ3JpZC5zY3NzXCIpO1xuXG5cdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cblx0XHR2YXIgbG9jYWxzID0gKGZ1bmN0aW9uKGEsIGIpIHtcblx0XHRcdHZhciBrZXksIGlkeCA9IDA7XG5cblx0XHRcdGZvcihrZXkgaW4gYSkge1xuXHRcdFx0XHRpZighYiB8fCBhW2tleV0gIT09IGJba2V5XSkgcmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRpZHgrKztcblx0XHRcdH1cblxuXHRcdFx0Zm9yKGtleSBpbiBiKSBpZHgtLTtcblxuXHRcdFx0cmV0dXJuIGlkeCA9PT0gMDtcblx0XHR9KGNvbnRlbnQubG9jYWxzLCBuZXdDb250ZW50LmxvY2FscykpO1xuXG5cdFx0aWYoIWxvY2FscykgdGhyb3cgbmV3IEVycm9yKCdBYm9ydGluZyBDU1MgSE1SIGR1ZSB0byBjaGFuZ2VkIGNzcy1tb2R1bGVzIGxvY2Fscy4nKTtcblxuXHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0fSk7XG5cblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59IiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKShmYWxzZSk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIuY29udGV4dCB7XFxuICBjdXJzb3I6IGNvbnRleHQtbWVudTsgfVxcblxcbm5hdi5yZWFjdC1jb250ZXh0bWVudSB7XFxuICBib3JkZXI6IDFweCBzb2xpZCAjNTk1OTU5O1xcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xcbiAgcGFkZGluZzogNnB4O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjkpO1xcbiAgYm94LXNoYWRvdzogNXB4IDVweCA1cHggIzlkOWQ5ZDtcXG4gIG1pbi13aWR0aDogMTAwcHg7IH1cXG5cIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG4iXSwic291cmNlUm9vdCI6IiJ9