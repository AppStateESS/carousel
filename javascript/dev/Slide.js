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
/******/ 		"Slide": 0
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
/******/ 	deferredModules.push(["./javascript/Slide/index.jsx","vendor"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

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

/***/ "./javascript/Slide/Form.js":
/*!**********************************!*\
  !*** ./javascript/Slide/Form.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_dropzone_uploader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-dropzone-uploader */ "./node_modules/react-dropzone-uploader/dist/react-dropzone-uploader.umd.js");
/* harmony import */ var react_dropzone_uploader__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_dropzone_uploader__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _essappstate_canopy_react_bigcheckbox__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @essappstate/canopy-react-bigcheckbox */ "./node_modules/@essappstate/canopy-react-bigcheckbox/build/index.js");
/* harmony import */ var _essappstate_canopy_react_bigcheckbox__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_essappstate_canopy_react_bigcheckbox__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./style.scss */ "./javascript/Slide/style.scss");
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_style_scss__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react_dropzone_uploader_dist_styles_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-dropzone-uploader/dist/styles.css */ "./node_modules/react-dropzone-uploader/dist/styles.css");
/* harmony import */ var react_dropzone_uploader_dist_styles_css__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_dropzone_uploader_dist_styles_css__WEBPACK_IMPORTED_MODULE_5__);









var Form = function Form(_ref) {
  var close = _ref.close,
      update = _ref.update,
      resource = _ref.resource,
      save = _ref.save,
      upload = _ref.upload;
  var uploadPrompt = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    key: "1"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "upload-text"
  }, "Click to browse", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), "- or -", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), "drag image or video file here."));
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "mb-3"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_essappstate_canopy_react_bigcheckbox__WEBPACK_IMPORTED_MODULE_3___default.a, {
    label: "Active",
    checked: resource.active,
    handle: update.bind(null, 'active')
  })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_dropzone_uploader__WEBPACK_IMPORTED_MODULE_2___default.a, {
    classNames: {
      dropzone: 'dropzone'
    },
    accept: "image/jpg,image/png,video/mp4,video/webm",
    getUploadParams: upload,
    maxFiles: 1,
    multiple: false,
    canCancel: false,
    canRestart: false,
    minSizeBytes: 1024,
    maxSizeBytes: 8388608,
    inputContent: uploadPrompt,
    autoUpload: true
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "row mt-3 mb-3"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-sm-3"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", null, "Title")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-sm-9"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    className: "form-control",
    type: "text",
    name: "title",
    placeholder: "Appears on image, above caption",
    value: resource.title,
    onChange: update.bind(null, 'title')
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "ml-3"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_essappstate_canopy_react_bigcheckbox__WEBPACK_IMPORTED_MODULE_3___default.a, {
    label: "Show title",
    checked: resource.show_title,
    handle: update.bind(null, 'show_title')
  })))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "row mb-3"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-sm-3"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
    htmlFor: "caption"
  }, "Caption")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-sm-9"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("textarea", {
    className: "form-control",
    placeholder: "If not blank, appears on image, below title.",
    name: "caption",
    value: resource.caption,
    onChange: update.bind(null, 'caption')
  }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "row"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-sm-3"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
    htmlFor: "caption_zone"
  }, "Caption zone")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "col-sm-4"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("select", {
    className: "form-control",
    name: "caption_zone",
    value: resource.caption_zone,
    onChange: update.bind(null, 'caption_zone')
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
    value: "",
    disabled: "disabled"
  }, "Choose where you want your caption to appear"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
    value: "0",
    label: "Center"
  }, "Center"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
    value: "1",
    label: "Top left"
  }, "Top left"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
    value: "2",
    label: "Top right"
  }, "Top right"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
    value: "3",
    label: "Bottom left"
  }, "Bottom left"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
    value: "4",
    label: "Bottom right"
  }, "Bottom right")))));
};

Form.propTypes = {
  resource: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object,
  finish: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func,
  save: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func,
  update: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func
};
/* harmony default export */ __webpack_exports__["default"] = (Form);

/***/ }),

/***/ "./javascript/Slide/index.jsx":
/*!************************************!*\
  !*** ./javascript/Slide/index.jsx ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Slide; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Extends_Listing__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Extends/Listing */ "./javascript/Extends/Listing.jsx");
/* harmony import */ var _Form__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Form */ "./javascript/Slide/Form.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_4__);


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }






/* global carouselId, $ */

var Slide =
/*#__PURE__*/
function (_Listing) {
  _inherits(Slide, _Listing);

  function Slide(props) {
    var _this;

    _classCallCheck(this, Slide);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Slide).call(this, props));
    _this.state.overlay = true;
    _this.module = 'carousel';
    _this.role = 'Admin';
    _this.control = 'Slide';
    _this.label = 'Slide';
    _this.defaultResource = {
      id: 0,
      title: '',
      show_title: false,
      filepath: '',
      caption: '',
      queue: 0,
      url: '',
      caption_zone: 0,
      active: true,
      width: 0,
      height: 0,
      type: 0
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
      }), "\xA0Edit slide")
    }, {
      handleClick: _this.command.bind(_assertThisInitialized(_this)),
      data: {
        command: 'delete'
      },
      label: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        href: "#"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
        className: "fas fa-trash"
      }), "\xA0Delete slide")
    }];
    _this.state.resource = _this.defaultResource;
    _this.upload = _this.upload.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Slide, [{
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
      }
    }
  }, {
    key: "upload",
    value: function upload(_upload) {
      var formData = new FormData();
      formData.append('carouselId', this.props.carouselId);
      formData.append('file', _upload.file);
      $.ajax({
        url: './carousel/Admin/Slide/upload',
        type: 'POST',
        data: formData,
        cache: false,
        dataType: 'json',
        processData: false,
        contentType: false,
        success: function success(data) {
          console.log(data);
        },
        error: function error(data) {
          console.log(data);
          alert('Sorry but your file is unacceptable. It may be of the wrong type or too large ' + '(8MB is the maximum allowed). Please try again.');
        }
      });
    }
  }, {
    key: "overlay",
    value: function overlay() {
      var title = this.state.resource.id > 0 ? 'Edit slide' : 'Create slide';
      var form = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Form__WEBPACK_IMPORTED_MODULE_3__["default"], {
        close: this.finish,
        update: this.update,
        resource: this.state.resource,
        upload: this.upload,
        save: this.save
      });
      return {
        content: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          className: "slide-form"
        }, form),
        width: '80%',
        title: title,
        close: this.load
      };
    }
  }]);

  return Slide;
}(_Extends_Listing__WEBPACK_IMPORTED_MODULE_2__["default"]);


Slide.propTypes = {
  carouselId: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.string
};
react_dom__WEBPACK_IMPORTED_MODULE_1___default.a.render(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Slide, {
  carouselId: carouselId
}), document.getElementById('Slide'));

/***/ }),

/***/ "./javascript/Slide/style.scss":
/*!*************************************!*\
  !*** ./javascript/Slide/style.scss ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../node_modules/css-loader!../../node_modules/sass-loader/lib/loader.js!./style.scss */ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./javascript/Slide/style.scss");

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


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./javascript/Slide/style.scss":
/*!********************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./javascript/Slide/style.scss ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".slide-form label {\n  font-size: 18px; }\n\n.dropzone {\n  min-height: 300px;\n  text-align: center;\n  border: 3px dashed #e3e3e3;\n  font-size: 36px;\n  position: relative; }\n  .dropzone .upload-text {\n    color: #636363; }\n  .dropzone:hover {\n    cursor: pointer; }\n", ""]);

// exports


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vamF2YXNjcmlwdC9FeHRlbmRzL0dyaWQuanN4Iiwid2VicGFjazovLy8uL2phdmFzY3JpcHQvRXh0ZW5kcy9MaXN0aW5nLmpzeCIsIndlYnBhY2s6Ly8vLi9qYXZhc2NyaXB0L0V4dGVuZHMvZ3JpZC5zY3NzPzE1MjciLCJ3ZWJwYWNrOi8vLy4vamF2YXNjcmlwdC9TbGlkZS9Gb3JtLmpzIiwid2VicGFjazovLy8uL2phdmFzY3JpcHQvU2xpZGUvaW5kZXguanN4Iiwid2VicGFjazovLy8uL2phdmFzY3JpcHQvU2xpZGUvc3R5bGUuc2Nzcz9jY2Q5Iiwid2VicGFjazovLy8uL2phdmFzY3JpcHQvRXh0ZW5kcy9ncmlkLnNjc3MiLCJ3ZWJwYWNrOi8vLy4vamF2YXNjcmlwdC9TbGlkZS9zdHlsZS5zY3NzIl0sIm5hbWVzIjpbIkdyaWQiLCJsaXN0aW5nIiwiY29sdW1ucyIsInNvcnRGdW5jdGlvbiIsImN1cnJlbnRTb3J0IiwiY29udGV4dE1lbnUiLCJzb3J0SWNvblRyYWNrIiwiZm9yRWFjaCIsInZhbHVlIiwiY29sdW1uIiwic29ydEJ5Iiwic29ydEJ5RGlyIiwiTUVOVV9UWVBFIiwiY29sbGVjdCIsInByb3BzIiwibmFtZSIsImhlYWRlcnMiLCJ0aCIsIm1hcCIsImtleSIsImljb24iLCJjbGFzc05hbWUiLCJwdXNoIiwiZmFDYXJldFVwIiwiZmFDYXJldERvd24iLCJzdHlsZSIsImJpbmQiLCJsYWJlbCIsInRhYmxlQ2xhc3MiLCJtZW51IiwibWVudU9wdGlvbnMiLCJoYW5kbGVDbGljayIsImRhdGEiLCJyb3dzIiwicmVzb3VyY2UiLCJzdGFjayIsInN1YmtleSIsImNhbGxiYWNrIiwicHJvcFR5cGVzIiwiUHJvcFR5cGVzIiwiYXJyYXkiLCJmdW5jIiwib2JqZWN0IiwiZGVmYXVsdFByb3BzIiwiZGVib3VuY2UiLCJmbiIsImRlbGF5IiwidGltZXIiLCJjb250ZXh0IiwiYXJncyIsImFyZ3VtZW50cyIsImNsZWFyVGltZW91dCIsInNldFRpbWVvdXQiLCJhcHBseSIsIkxpc3RpbmciLCJsb2FkIiwic3RhdGUiLCJzZWFyY2giLCJsb2FkaW5nIiwibWVzc2FnZSIsIm1lc3NhZ2VUeXBlIiwib3ZlcmxheSIsIm1vZHVsZSIsInJvbGUiLCJjb250cm9sIiwiZGVmYXVsdFJlc291cmNlIiwic2F2ZSIsInNob3dHcmlkIiwicmVzZXQiLCJzb3J0QnlDb2x1bW4iLCJoYW5kbGUiLCJvdmVybGF5T24iLCJvdmVybGF5T2ZmIiwiZWRpdFJlc291cmNlIiwiZGVsYXlMb2FkIiwidXBkYXRlIiwic2V0U3RhdGUiLCJPYmplY3QiLCJhc3NpZ24iLCJsb2FkUmVzb3VyY2UiLCJjb25maXJtIiwiJCIsImFqYXgiLCJ1cmwiLCJnZXRVcmwiLCJpZCIsImRhdGFUeXBlIiwidHlwZSIsInN1Y2Nlc3MiLCJzZXRNZXNzYWdlIiwiZXJyb3IiLCJ2YXJuYW1lIiwidGFyZ2V0IiwiZSIsInVwZGF0ZVNlYXJjaCIsImxlbmd0aCIsImNsZWFyTWVzc2FnZSIsImNvbXBsZXRlIiwiY24iLCJidXR0b24iLCJjaGFuZ2VWYWx1ZSIsIm5hdmJhckJ1dHRvbiIsImdldFNlYXJjaCIsIndpZHRoIiwidGl0bGUiLCJjbG9zZSIsImNvbnRlbnQiLCJ0b0xvd2VyQ2FzZSIsInNob3dPdmVybGF5IiwibmF2YmFyIiwiQ29tcG9uZW50IiwiRm9ybSIsInVwbG9hZCIsInVwbG9hZFByb21wdCIsImFjdGl2ZSIsImRyb3B6b25lIiwic2hvd190aXRsZSIsImNhcHRpb24iLCJjYXB0aW9uX3pvbmUiLCJmaW5pc2giLCJTbGlkZSIsImZpbGVwYXRoIiwicXVldWUiLCJoZWlnaHQiLCJjb21tYW5kIiwiZXZlbnQiLCJwcmV2ZW50RGVmYXVsdCIsImRlbGV0ZVJlc291cmNlIiwiZm9ybURhdGEiLCJGb3JtRGF0YSIsImFwcGVuZCIsImNhcm91c2VsSWQiLCJmaWxlIiwiY2FjaGUiLCJwcm9jZXNzRGF0YSIsImNvbnRlbnRUeXBlIiwiY29uc29sZSIsImxvZyIsImFsZXJ0IiwiZm9ybSIsInN0cmluZyIsIlJlYWN0RE9NIiwicmVuZGVyIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0JBQVEsb0JBQW9CO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQWlCLDRCQUE0QjtBQUM3QztBQUNBO0FBQ0EsMEJBQWtCLDJCQUEyQjtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtB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Q2xGLFNBQU4sR0FBa0I7QUFDaEI2RixZQUFVLEVBQUU1RixpREFBUyxDQUFDcUc7QUFETixDQUFsQjtBQUlBQyxnREFBUSxDQUFDQyxNQUFULENBQWdCLDJEQUFDLEtBQUQ7QUFBTyxZQUFVLEVBQUVYO0FBQW5CLEVBQWhCLEVBQWtEWSxRQUFRLENBQUNDLGNBQVQsQ0FDaEQsT0FEZ0QsQ0FBbEQsRTs7Ozs7Ozs7Ozs7O0FDdkhBLGNBQWMsbUJBQU8sQ0FBQywyTUFBb0c7O0FBRTFILDRDQUE0QyxRQUFTOztBQUVyRDtBQUNBOzs7O0FBSUEsZUFBZTs7QUFFZjtBQUNBOztBQUVBLGFBQWEsbUJBQU8sQ0FBQyxzR0FBbUQ7O0FBRXhFOztBQUVBLEdBQUcsS0FBVSxFQUFFLEU7Ozs7Ozs7Ozs7O0FDbkJmLDJCQUEyQixtQkFBTyxDQUFDLGdHQUErQztBQUNsRjs7O0FBR0E7QUFDQSxjQUFjLFFBQVMsYUFBYSx5QkFBeUIsRUFBRSwyQkFBMkIsOEJBQThCLHVCQUF1QixpQkFBaUIsK0NBQStDLG9DQUFvQyxxQkFBcUIsRUFBRTs7QUFFMVE7Ozs7Ozs7Ozs7OztBQ1BBLDJCQUEyQixtQkFBTyxDQUFDLGdHQUErQztBQUNsRjs7O0FBR0E7QUFDQSxjQUFjLFFBQVMsc0JBQXNCLG9CQUFvQixFQUFFLGVBQWUsc0JBQXNCLHVCQUF1QiwrQkFBK0Isb0JBQW9CLHVCQUF1QixFQUFFLDRCQUE0QixxQkFBcUIsRUFBRSxxQkFBcUIsc0JBQXNCLEVBQUU7O0FBRTNTIiwiZmlsZSI6IlNsaWRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG4gXHRmdW5jdGlvbiB3ZWJwYWNrSnNvbnBDYWxsYmFjayhkYXRhKSB7XG4gXHRcdHZhciBjaHVua0lkcyA9IGRhdGFbMF07XG4gXHRcdHZhciBtb3JlTW9kdWxlcyA9IGRhdGFbMV07XG4gXHRcdHZhciBleGVjdXRlTW9kdWxlcyA9IGRhdGFbMl07XG5cbiBcdFx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG4gXHRcdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuIFx0XHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwLCByZXNvbHZlcyA9IFtdO1xuIFx0XHRmb3IoO2kgPCBjaHVua0lkcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdGNodW5rSWQgPSBjaHVua0lkc1tpXTtcbiBcdFx0XHRpZihpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pIHtcbiBcdFx0XHRcdHJlc29sdmVzLnB1c2goaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdWzBdKTtcbiBcdFx0XHR9XG4gXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gMDtcbiBcdFx0fVxuIFx0XHRmb3IobW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcbiBcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuIFx0XHRcdFx0bW9kdWxlc1ttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdGlmKHBhcmVudEpzb25wRnVuY3Rpb24pIHBhcmVudEpzb25wRnVuY3Rpb24oZGF0YSk7XG5cbiBcdFx0d2hpbGUocmVzb2x2ZXMubGVuZ3RoKSB7XG4gXHRcdFx0cmVzb2x2ZXMuc2hpZnQoKSgpO1xuIFx0XHR9XG5cbiBcdFx0Ly8gYWRkIGVudHJ5IG1vZHVsZXMgZnJvbSBsb2FkZWQgY2h1bmsgdG8gZGVmZXJyZWQgbGlzdFxuIFx0XHRkZWZlcnJlZE1vZHVsZXMucHVzaC5hcHBseShkZWZlcnJlZE1vZHVsZXMsIGV4ZWN1dGVNb2R1bGVzIHx8IFtdKTtcblxuIFx0XHQvLyBydW4gZGVmZXJyZWQgbW9kdWxlcyB3aGVuIGFsbCBjaHVua3MgcmVhZHlcbiBcdFx0cmV0dXJuIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCk7XG4gXHR9O1xuIFx0ZnVuY3Rpb24gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKSB7XG4gXHRcdHZhciByZXN1bHQ7XG4gXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBkZWZlcnJlZE1vZHVsZXMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHR2YXIgZGVmZXJyZWRNb2R1bGUgPSBkZWZlcnJlZE1vZHVsZXNbaV07XG4gXHRcdFx0dmFyIGZ1bGZpbGxlZCA9IHRydWU7XG4gXHRcdFx0Zm9yKHZhciBqID0gMTsgaiA8IGRlZmVycmVkTW9kdWxlLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHR2YXIgZGVwSWQgPSBkZWZlcnJlZE1vZHVsZVtqXTtcbiBcdFx0XHRcdGlmKGluc3RhbGxlZENodW5rc1tkZXBJZF0gIT09IDApIGZ1bGZpbGxlZCA9IGZhbHNlO1xuIFx0XHRcdH1cbiBcdFx0XHRpZihmdWxmaWxsZWQpIHtcbiBcdFx0XHRcdGRlZmVycmVkTW9kdWxlcy5zcGxpY2UoaS0tLCAxKTtcbiBcdFx0XHRcdHJlc3VsdCA9IF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gZGVmZXJyZWRNb2R1bGVbMF0pO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRyZXR1cm4gcmVzdWx0O1xuIFx0fVxuXG4gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuIFx0Ly8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4gXHQvLyBQcm9taXNlID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxuIFx0dmFyIGluc3RhbGxlZENodW5rcyA9IHtcbiBcdFx0XCJTbGlkZVwiOiAwXG4gXHR9O1xuXG4gXHR2YXIgZGVmZXJyZWRNb2R1bGVzID0gW107XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdHZhciBqc29ucEFycmF5ID0gd2luZG93W1wid2VicGFja0pzb25wXCJdID0gd2luZG93W1wid2VicGFja0pzb25wXCJdIHx8IFtdO1xuIFx0dmFyIG9sZEpzb25wRnVuY3Rpb24gPSBqc29ucEFycmF5LnB1c2guYmluZChqc29ucEFycmF5KTtcbiBcdGpzb25wQXJyYXkucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrO1xuIFx0anNvbnBBcnJheSA9IGpzb25wQXJyYXkuc2xpY2UoKTtcbiBcdGZvcih2YXIgaSA9IDA7IGkgPCBqc29ucEFycmF5Lmxlbmd0aDsgaSsrKSB3ZWJwYWNrSnNvbnBDYWxsYmFjayhqc29ucEFycmF5W2ldKTtcbiBcdHZhciBwYXJlbnRKc29ucEZ1bmN0aW9uID0gb2xkSnNvbnBGdW5jdGlvbjtcblxuXG4gXHQvLyBhZGQgZW50cnkgbW9kdWxlIHRvIGRlZmVycmVkIGxpc3RcbiBcdGRlZmVycmVkTW9kdWxlcy5wdXNoKFtcIi4vamF2YXNjcmlwdC9TbGlkZS9pbmRleC5qc3hcIixcInZlbmRvclwiXSk7XG4gXHQvLyBydW4gZGVmZXJyZWQgbW9kdWxlcyB3aGVuIHJlYWR5XG4gXHRyZXR1cm4gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKTtcbiIsIid1c2Ugc3RyaWN0J1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJ1xuaW1wb3J0IHtGb250QXdlc29tZUljb259IGZyb20gJ0Bmb3J0YXdlc29tZS9yZWFjdC1mb250YXdlc29tZSdcbmltcG9ydCB7ZmFDYXJldFVwLCBmYUNhcmV0RG93bn0gZnJvbSAnQGZvcnRhd2Vzb21lL2ZyZWUtc29saWQtc3ZnLWljb25zJ1xuaW1wb3J0IHtDb250ZXh0TWVudSwgTWVudUl0ZW0sIENvbnRleHRNZW51VHJpZ2dlcn0gZnJvbSBcInJlYWN0LWNvbnRleHRtZW51XCJcbmltcG9ydCAnLi9ncmlkLnNjc3MnXG5cbmNvbnN0IEdyaWQgPSAoe2xpc3RpbmcsIGNvbHVtbnMsIHNvcnRGdW5jdGlvbiwgY3VycmVudFNvcnQsIGNvbnRleHRNZW51fSkgPT4ge1xuICBjb25zdCBzb3J0SWNvblRyYWNrID0ge31cbiAgY29sdW1ucy5mb3JFYWNoKCh2YWx1ZSkgPT4ge1xuICAgIHNvcnRJY29uVHJhY2tbdmFsdWUuY29sdW1uXSA9IDBcbiAgfSlcbiAgaWYgKGN1cnJlbnRTb3J0LnNvcnRCeSkge1xuICAgIHNvcnRJY29uVHJhY2tbY3VycmVudFNvcnQuc29ydEJ5XSA9IGN1cnJlbnRTb3J0LnNvcnRCeURpclxuICB9XG5cbiAgY29uc3QgTUVOVV9UWVBFID0gJ1NJTVBMRSdcbiAgY29uc3QgY29sbGVjdCA9IChwcm9wcykgPT4ge1xuICAgIHJldHVybiB7bmFtZTogcHJvcHMubmFtZX1cbiAgfVxuXG4gIGNvbnN0IGhlYWRlcnMgPSAoY29sdW1ucywgc29ydEZ1bmN0aW9uKSA9PiB7XG4gICAgY29uc3QgdGggPSBjb2x1bW5zLm1hcCgodmFsdWUsIGtleSkgPT4ge1xuICAgICAgbGV0IGljb25cbiAgICAgIGxldCBjbGFzc05hbWUgPSBbXVxuICAgICAgaWYgKHNvcnRJY29uVHJhY2tbdmFsdWUuY29sdW1uXSA9PT0gMSkge1xuICAgICAgICBjbGFzc05hbWUucHVzaCgncG9pbnRlcicpXG4gICAgICAgIGljb24gPSA8Rm9udEF3ZXNvbWVJY29uIGljb249e2ZhQ2FyZXRVcH0vPlxuICAgICAgfSBlbHNlIGlmIChzb3J0SWNvblRyYWNrW3ZhbHVlLmNvbHVtbl0gPT09IDIpIHtcbiAgICAgICAgY2xhc3NOYW1lLnB1c2goJ3BvaW50ZXInKVxuICAgICAgICBpY29uID0gPEZvbnRBd2Vzb21lSWNvbiBpY29uPXtmYUNhcmV0RG93bn0vPlxuICAgICAgfVxuICAgICAgaWYgKHZhbHVlLmNsYXNzTmFtZSkge1xuICAgICAgICBjbGFzc05hbWUucHVzaCgnYmctcHJpbWFyeScpXG4gICAgICB9XG5cbiAgICAgIGxldCBzdHlsZVxuICAgICAgaWYgKHZhbHVlLnN0eWxlICYmIHR5cGVvZiB2YWx1ZS5zdHlsZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgc3R5bGUgPSB2YWx1ZS5zdHlsZVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gKFxuICAgICAgICA8dGhcbiAgICAgICAgICBzdHlsZT17c3R5bGV9XG4gICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWV9XG4gICAgICAgICAga2V5PXtrZXl9XG4gICAgICAgICAgb25DbGljaz17c29ydEZ1bmN0aW9uLmJpbmQobnVsbCwgdmFsdWUuY29sdW1uKX0+e3ZhbHVlLmxhYmVsfSZuYnNwO3tpY29ufVxuICAgICAgICA8L3RoPlxuICAgICAgKVxuICAgIH0pXG4gICAgcmV0dXJuICg8dHI+e3RofTwvdHI+KVxuICB9XG4gIGxldCB0YWJsZUNsYXNzID0gJ3RhYmxlIHRhYmxlLXN0cmlwZWQgdGFibGUtaG92ZXInXG5cbiAgbGV0IG1lbnVcbiAgaWYgKGNvbnRleHRNZW51KSB7XG4gICAgbGV0IG1lbnVPcHRpb25zID0gY29udGV4dE1lbnUubWFwKCh2YWx1ZSwga2V5KSA9PiB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8TWVudUl0ZW0gb25DbGljaz17dmFsdWUuaGFuZGxlQ2xpY2t9IGRhdGE9e3ZhbHVlLmRhdGF9IGtleT17a2V5fT5cbiAgICAgICAgICB7dmFsdWUubGFiZWx9XG4gICAgICAgIDwvTWVudUl0ZW0+XG4gICAgICApXG4gICAgfSlcbiAgICBtZW51ID0gKFxuICAgICAgPENvbnRleHRNZW51IGlkPXtNRU5VX1RZUEV9PlxuICAgICAgICB7bWVudU9wdGlvbnN9XG4gICAgICA8L0NvbnRleHRNZW51PlxuICAgIClcbiAgfVxuXG4gIGxldCByb3dzID0gbGlzdGluZy5tYXAoKHJlc291cmNlLCBrZXkpID0+IHtcbiAgICBsZXQgc3RhY2sgPSBjb2x1bW5zLm1hcCgodmFsdWUsIHN1YmtleSkgPT4ge1xuICAgICAgaWYgKHZhbHVlLmNhbGxiYWNrKSB7XG4gICAgICAgIHJldHVybiA8dGQga2V5PXtzdWJrZXl9IGNsYXNzTmFtZT17dmFsdWUuY2xhc3NOYW1lfT57dmFsdWUuY2FsbGJhY2socmVzb3VyY2UpfTwvdGQ+XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gPHRkIGtleT17c3Via2V5fSBjbGFzc05hbWU9e3ZhbHVlLmNsYXNzTmFtZX0+e3Jlc291cmNlW3ZhbHVlLmNvbHVtbl19PC90ZD5cbiAgICAgIH1cbiAgICB9KVxuICAgIFxuICAgIGlmIChjb250ZXh0TWVudSkge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPENvbnRleHRNZW51VHJpZ2dlclxuICAgICAgICAgIHJlbmRlclRhZz1cInRyXCJcbiAgICAgICAgICBuYW1lPXtrZXl9XG4gICAgICAgICAgaWQ9e01FTlVfVFlQRX1cbiAgICAgICAgICBob2xkVG9EaXNwbGF5PXsxMDAwfVxuICAgICAgICAgIGtleT17a2V5fVxuICAgICAgICAgIGF0dHJpYnV0ZXM9e3tjbGFzc05hbWU6ICdjb250ZXh0J319XG4gICAgICAgICAgY29sbGVjdD17Y29sbGVjdH0+XG4gICAgICAgICAge3N0YWNrfVxuICAgICAgICA8L0NvbnRleHRNZW51VHJpZ2dlcj5cbiAgICAgIClcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuICg8dHIga2V5PXtrZXl9PlxuICAgICAgICB7c3RhY2t9XG4gICAgICA8L3RyPilcbiAgICB9XG4gIH0pXG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2PlxuICAgICAgPHRhYmxlIGNsYXNzTmFtZT17dGFibGVDbGFzc30+XG4gICAgICAgIDx0Ym9keT5cbiAgICAgICAgICB7aGVhZGVycyhjb2x1bW5zLCBzb3J0RnVuY3Rpb24pfVxuICAgICAgICAgIHtyb3dzfVxuICAgICAgICA8L3Rib2R5PlxuICAgICAgPC90YWJsZT5cbiAgICAgIHttZW51fVxuICAgIDwvZGl2PlxuICApXG59XG5cbkdyaWQucHJvcFR5cGVzID0ge1xuICBsaXN0aW5nOiBQcm9wVHlwZXMuYXJyYXksXG4gIGNvbHVtbnM6IFByb3BUeXBlcy5hcnJheSxcbiAgc29ydEZ1bmN0aW9uOiBQcm9wVHlwZXMuZnVuYyxcbiAgY3VycmVudFNvcnQ6IFByb3BUeXBlcy5vYmplY3QsXG4gIGNvbnRleHRNZW51OiBQcm9wVHlwZXMuYXJyYXlcbn1cblxuR3JpZC5kZWZhdWx0UHJvcHMgPSB7XG4gIGNvbnRleHRNZW51OiBudWxsXG59XG5leHBvcnQgZGVmYXVsdCBHcmlkXG4iLCIndXNlIHN0cmljdCdcbmltcG9ydCBSZWFjdCwge0NvbXBvbmVudH0gZnJvbSAncmVhY3QnXG5pbXBvcnQge05hdmJhciwgTmF2YmFyQnV0dG9uLCBOYXZiYXJTZWFyY2h9IGZyb20gJ0Blc3NhcHBzdGF0ZS9yZWFjdC1uYXZiYXInXG5pbXBvcnQgV2FpdGluZyBmcm9tICdAZXNzYXBwc3RhdGUvcmVhY3Qtd2FpdGluZydcbmltcG9ydCBHcmlkIGZyb20gJy4vR3JpZCdcbmltcG9ydCBPdmVybGF5IGZyb20gJ0Blc3NhcHBzdGF0ZS9jYW5vcHktcmVhY3Qtb3ZlcmxheSdcbi8qIGdsb2JhbCAkICovXG5cbmV4cG9ydCBmdW5jdGlvbiBkZWJvdW5jZShmbiwgZGVsYXkpIHtcbiAgdmFyIHRpbWVyID0gbnVsbFxuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIHZhciBjb250ZXh0ID0gdGhpcyxcbiAgICAgIGFyZ3MgPSBhcmd1bWVudHNcbiAgICBjbGVhclRpbWVvdXQodGltZXIpXG4gICAgdGltZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgIGZuLmFwcGx5KGNvbnRleHQsIGFyZ3MpXG4gICAgfSwgZGVsYXkpXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGlzdGluZyBleHRlbmRzIENvbXBvbmVudCB7XG4gIGRlbGF5TG9hZCgpIHtcbiAgICB0aGlzLmxvYWQoKVxuICB9XG5cbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcylcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgc2VhcmNoOiAnJyxcbiAgICAgIGxpc3Rpbmc6IFtdLFxuICAgICAgbG9hZGluZzogdHJ1ZSxcbiAgICAgIG1lc3NhZ2U6IG51bGwsXG4gICAgICBtZXNzYWdlVHlwZTogJ2RhbmdlcicsXG4gICAgICBvdmVybGF5OiBmYWxzZSxcbiAgICAgIHJlc291cmNlOiB7fVxuICAgIH1cbiAgICB0aGlzLm1vZHVsZSA9ICdtb2R1bGUnXG4gICAgdGhpcy5yb2xlID0gJ3JvbGUnXG4gICAgdGhpcy5jb250cm9sID0gJ2NvbnRyb2wnXG4gICAgdGhpcy5sYWJlbCA9ICdsYWJlbCdcbiAgICB0aGlzLnNvcnRCeSA9IG51bGxcbiAgICB0aGlzLnNvcnRCeURpciA9IDBcbiAgICB0aGlzLmRlZmF1bHRSZXNvdXJjZSA9IHt9XG4gICAgdGhpcy5zYXZlID0gdGhpcy5zYXZlLmJpbmQodGhpcylcbiAgICB0aGlzLnNob3dHcmlkID0gdGhpcy5zaG93R3JpZC5iaW5kKHRoaXMpXG4gICAgdGhpcy5sb2FkID0gdGhpcy5sb2FkLmJpbmQodGhpcylcbiAgICB0aGlzLnJlc2V0ID0gdGhpcy5yZXNldC5iaW5kKHRoaXMpXG4gICAgdGhpcy5zb3J0QnlDb2x1bW4gPSB0aGlzLnNvcnRCeUNvbHVtbi5iaW5kKHRoaXMpXG4gICAgdGhpcy5oYW5kbGUgPSB0aGlzLmhhbmRsZS5iaW5kKHRoaXMpXG4gICAgdGhpcy5vdmVybGF5T24gPSB0aGlzLm92ZXJsYXlPbi5iaW5kKHRoaXMpXG4gICAgdGhpcy5vdmVybGF5T2ZmID0gdGhpcy5vdmVybGF5T2ZmLmJpbmQodGhpcylcbiAgICB0aGlzLmVkaXRSZXNvdXJjZSA9IHRoaXMuZWRpdFJlc291cmNlLmJpbmQodGhpcylcbiAgICB0aGlzLmRlbGF5TG9hZCA9IGRlYm91bmNlKHRoaXMuZGVsYXlMb2FkLCAxMDAwKVxuICAgIHRoaXMudXBkYXRlID0gdGhpcy51cGRhdGUuYmluZCh0aGlzKVxuICB9XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgdGhpcy5sb2FkKClcbiAgICB0aGlzLnNldFN0YXRlKHtyZXNvdXJjZTogdGhpcy5kZWZhdWx0UmVzb3VyY2V9KVxuICB9XG5cbiAgZmluaXNoKCkge1xuICAgIHRoaXMubG9hZCgpXG4gICAgdGhpcy5vdmVybGF5T2ZmKClcbiAgfVxuXG4gIG92ZXJsYXlPbigpIHtcbiAgICB0aGlzLnNldFN0YXRlKHtvdmVybGF5OiB0cnVlfSlcbiAgfVxuXG4gIG92ZXJsYXlPZmYoKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7b3ZlcmxheTogZmFsc2V9KVxuICB9XG5cbiAgbG9hZFJlc291cmNlKGtleSkge1xuICAgIGNvbnN0IHJlc291cmNlID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5zdGF0ZS5saXN0aW5nW2tleV0pXG4gICAgdGhpcy5zZXRTdGF0ZSh7cmVzb3VyY2V9KVxuICB9XG5cbiAgZWRpdFJlc291cmNlKGtleSkge1xuICAgIHRoaXMubG9hZFJlc291cmNlKGtleSlcbiAgICB0aGlzLm92ZXJsYXlPbigpXG4gIH1cbiAgXG4gIGRlbGV0ZVJlc291cmNlKGtleSkge1xuICAgIGNvbnN0IHJlc291cmNlID0gdGhpcy5zdGF0ZS5saXN0aW5nW2tleV1cbiAgICBpZiAoY29uZmlybSgnQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGRlbGV0ZSB0aGlzIGNhcm91c2VsIGFsb25nIHdpdGggYWxsIGl0XFwncyBzbGlkZXM/JykpIHtcbiAgICAgICQuYWpheCh7XG4gICAgICAgIHVybDogdGhpcy5nZXRVcmwoKSArICcvJyArIHJlc291cmNlLmlkLFxuICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgICAgICB0eXBlOiAnZGVsZXRlJyxcbiAgICAgICAgc3VjY2VzczogKCk9PntcbiAgICAgICAgICB0aGlzLnNldE1lc3NhZ2UodGhpcy5sYWJlbCArICAnIGRlbGV0ZWQuJywgJ3N1Y2Nlc3MnKVxuICAgICAgICAgIHRoaXMubG9hZCgpXG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yOiAoKT0+e1xuICAgICAgICAgIHRoaXMuc2V0TWVzc2FnZSgnU29ycnkuIEFuIGVycm9yIHByZXZlbnRlZCBkZWxldGluZyB0aGUgJyArIHRoaXMubGFiZWwsICdkYW5nZXInKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgfVxuXG4gIGhhbmRsZSh2YXJuYW1lLCB2YWx1ZSkge1xuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSB7XG4gICAgICB2YWx1ZSA9IHZhbHVlLnRhcmdldC52YWx1ZVxuICAgIH1cbiAgICBjb25zdCByZXNvdXJjZSA9IHRoaXMuc3RhdGUucmVzb3VyY2VcbiAgICByZXNvdXJjZVt2YXJuYW1lXSA9IHZhbHVlXG4gICAgdGhpcy5zZXRTdGF0ZSh7cmVzb3VyY2V9KVxuICB9XG5cbiAgcmVzZXQoKSB7XG4gICAgdGhpcy5vdmVybGF5T2ZmKClcbiAgICB0aGlzLnNldFN0YXRlKHtyZXNvdXJjZTogT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5kZWZhdWx0UmVzb3VyY2UpfSlcbiAgfVxuXG4gIGdldFNlYXJjaCgpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPE5hdmJhclNlYXJjaFxuICAgICAgICB2YWx1ZT17dGhpcy5zdGF0ZS5zZWFyY2h9XG4gICAgICAgIHBsYWNlaG9sZGVyPVwiU2VhcmNoXCJcbiAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiB7XG4gICAgICAgICAgdGhpcy51cGRhdGVTZWFyY2goZS50YXJnZXQudmFsdWUpXG4gICAgICAgIH19Lz5cbiAgICApXG4gIH1cblxuICB1cGRhdGVTZWFyY2goc2VhcmNoKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7c2VhcmNofSlcblxuICAgIGlmIChzZWFyY2gubGVuZ3RoID4gMiB8fCBzZWFyY2gubGVuZ3RoID09PSAwKSB7XG4gICAgICB0aGlzLmRlbGF5TG9hZCgpXG4gICAgfVxuICB9XG5cbiAgc29ydEJ5Q29sdW1uKGNvbHVtbikge1xuICAgIGlmIChjb2x1bW4gPT09IHRoaXMuc29ydEJ5KSB7XG4gICAgICBzd2l0Y2ggKHRoaXMuc29ydEJ5RGlyKSB7XG4gICAgICAgIGNhc2UgMDpcbiAgICAgICAgICB0aGlzLnNvcnRCeURpciA9IDFcbiAgICAgICAgICBicmVha1xuXG4gICAgICAgIGNhc2UgMTpcbiAgICAgICAgICB0aGlzLnNvcnRCeURpciA9IDJcbiAgICAgICAgICBicmVha1xuXG4gICAgICAgIGNhc2UgMjpcbiAgICAgICAgICB0aGlzLnNvcnRCeURpciA9IDBcbiAgICAgICAgICB0aGlzLnNvcnRCeSA9IG51bGxcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zb3J0QnlEaXIgPSAxXG4gICAgICB0aGlzLnNvcnRCeSA9IGNvbHVtblxuICAgIH1cblxuICAgIHRoaXMubG9hZCgpXG4gIH1cblxuICBnZXRVcmwoKSB7XG4gICAgcmV0dXJuIGAke3RoaXMubW9kdWxlfS8ke3RoaXMucm9sZX0vJHt0aGlzLmNvbnRyb2x9YFxuICB9XG5cbiAgbG9hZCgpIHtcbiAgICBjb25zdCB1cmwgPSB0aGlzLmdldFVybCgpXG4gICAgJC5hamF4KHtcbiAgICAgIHVybCxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgc2VhcmNoOiB0aGlzLnN0YXRlLnNlYXJjaCxcbiAgICAgICAgc29ydEJ5OiB0aGlzLnNvcnRCeSxcbiAgICAgICAgc29ydEJ5RGlyOiB0aGlzLnNvcnRCeURpclxuICAgICAgfSxcbiAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICB0eXBlOiAnZ2V0JyxcbiAgICAgIHN1Y2Nlc3M6IChkYXRhKSA9PiB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2xpc3Rpbmc6IGRhdGEubGlzdGluZywgbG9hZGluZzogZmFsc2V9KVxuICAgICAgfSxcbiAgICAgIGVycm9yOiAoKSA9PiB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2xvYWRpbmc6IGZhbHNlfSlcbiAgICAgICAgdGhpcy5zZXRNZXNzYWdlKCdDb3VsZCBub3QgYWNjZXNzIHNlcnZlcicpXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIHNob3dHcmlkKCkge31cblxuICBzZXRNZXNzYWdlKG1lc3NhZ2UsIG1lc3NhZ2VUeXBlID0gJ2RhbmdlcicpIHtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuY2xlYXJNZXNzYWdlKClcbiAgICB9LCA1MDAwKVxuXG4gICAgdGhpcy5zZXRTdGF0ZSh7bWVzc2FnZSwgbWVzc2FnZVR5cGV9KVxuICB9XG5cbiAgY2xlYXJNZXNzYWdlKCkge1xuICAgIHRoaXMuc2V0U3RhdGUoe21lc3NhZ2U6IG51bGwsIG1lc3NhZ2VUeXBlOiAnZGFuZ2VyJ30pXG4gIH1cblxuICBzYXZlKCkge1xuICAgIGxldCB0eXBlID0gJ3Bvc3QnXG4gICAgbGV0IHVybCA9IHRoaXMuZ2V0VXJsKClcbiAgICBpZiAodGhpcy5zdGF0ZS5yZXNvdXJjZS5pZCAhPT0gJzAnKSB7XG4gICAgICB1cmwgPSB1cmwgKyAnLycgKyB0aGlzLnN0YXRlLnJlc291cmNlLmlkXG4gICAgICB0eXBlID0gJ3B1dCdcbiAgICB9XG4gICAgJC5hamF4KHtcbiAgICAgIHVybCxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgLi4udGhpcy5zdGF0ZS5yZXNvdXJjZVxuICAgICAgfSxcbiAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICB0eXBlLFxuICAgICAgc3VjY2VzczogKCkgPT4ge1xuICAgICAgICB0aGlzLmxvYWQoKVxuICAgICAgICB0aGlzLnNldE1lc3NhZ2UoXG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxpIGNsYXNzTmFtZT1cImZhciBmYS10aHVtYnMtdXBcIj48L2k+Jm5ic3A7U2F2ZSBzdWNjZXNzZnVsLjwvZGl2PixcbiAgICAgICAgICAnc3VjY2VzcydcbiAgICAgICAgKVxuICAgICAgfSxcbiAgICAgIGVycm9yOiAoKSA9PiB7XG4gICAgICAgIHRoaXMuc2V0TWVzc2FnZShcbiAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPGkgY2xhc3NOYW1lPVwiZmFzIGZhLWV4Y2xhbWF0aW9uLXRyaWFuZ2xlXCI+PC9pPiZuYnNwO1VuYWJsZSB0byBzYXZlJm5ic3A7e3RoaXMubGFiZWx9LjwvZGl2PlxuICAgICAgICApXG4gICAgICB9LFxuICAgICAgY29tcGxldGU6ICgpID0+IHRoaXMucmVzZXQoKVxuXG4gICAgfSlcbiAgfVxuXG4gIG1lc3NhZ2UoKSB7XG4gICAgY29uc3QgY24gPSBgYWxlcnQgYWxlcnQtJHt0aGlzLnN0YXRlLm1lc3NhZ2VUeXBlfSBhbGVydC1kaXNtaXNzaWJsZSBmYWRlIHNob3dgXG4gICAgaWYgKHRoaXMuc3RhdGUubWVzc2FnZSkge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e2NufT5cbiAgICAgICAgICA8c3Bhbj57dGhpcy5zdGF0ZS5tZXNzYWdlfTwvc3Bhbj5cbiAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzc05hbWU9XCJjbG9zZVwiIGRhdGEtZGlzbWlzcz1cImFsZXJ0XCIgYXJpYS1sYWJlbD1cIkNsb3NlXCI+XG4gICAgICAgICAgICA8c3BhbiBhcmlhLWhpZGRlbj1cInRydWVcIj4mdGltZXM7PC9zcGFuPlxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIClcbiAgICB9XG4gIH1cblxuICBuYXZiYXJCdXR0b24oKSB7XG4gICAgY29uc3QgbGFiZWwgPSAoXG4gICAgICA8c3Bhbj5cbiAgICAgICAgPGkgY2xhc3NOYW1lPVwiZmFzIGZhLXBsdXNcIj48L2k+Jm5ic3A7Q3JlYXRlPC9zcGFuPlxuICAgIClcbiAgICBjb25zdCBidXR0b24gPSAoXG4gICAgICA8TmF2YmFyQnV0dG9uXG4gICAgICAgIGNvbG9yPVwib3V0bGluZS1wcmltYXJ5XCJcbiAgICAgICAgbGFiZWw9e2xhYmVsfVxuICAgICAgICBoYW5kbGVDbGljaz17dGhpcy5vdmVybGF5T259Lz5cbiAgICApXG4gICAgcmV0dXJuIGJ1dHRvblxuICB9XG5cbiAgdXBkYXRlKHZhcm5hbWUsIHZhbHVlKSB7XG4gICAgbGV0IGNoYW5nZVZhbHVlXG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIGNoYW5nZVZhbHVlID0gdmFsdWUudGFyZ2V0LnZhbHVlXG4gICAgfSBlbHNlIHtcbiAgICAgIGNoYW5nZVZhbHVlID0gdmFsdWVcbiAgICB9XG4gICAgY29uc3Qge3Jlc291cmNlfSA9IHRoaXMuc3RhdGVcbiAgICByZXNvdXJjZVt2YXJuYW1lXSA9IGNoYW5nZVZhbHVlXG4gICAgdGhpcy5zZXRTdGF0ZSh7cmVzb3VyY2V9KVxuICB9XG5cbiAgbmF2YmFyKCkge1xuICAgIGNvbnN0IGJ1dHRvbiA9IHRoaXMubmF2YmFyQnV0dG9uKClcblxuICAgIGNvbnN0IHNlYXJjaCA9IHRoaXMuZ2V0U2VhcmNoKClcbiAgICByZXR1cm4gPE5hdmJhclxuICAgICAgbGVmdFNpZGU9e1tidXR0b25dfVxuICAgICAgcmlnaHRTaWRlPXtbc2VhcmNoXX1cbiAgICAgIGJhY2tncm91bmQ9XCJsaWdodFwiXG4gICAgICBjbGFzc05hbWU9XCJib3JkZXIgcm91bmRlZFwiLz5cbiAgfVxuXG4gIHRpdGxlKCkge1xuICAgIHJldHVybiBudWxsXG4gIH1cblxuICBzaG93T3ZlcmxheSgpIHtcbiAgICBjb25zdCBvdmVybGF5ID0gdGhpcy5vdmVybGF5KClcbiAgICBpZiAob3ZlcmxheSA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgbGV0IHdpZHRoXG4gICAgaWYgKG92ZXJsYXkud2lkdGgpIHtcbiAgICAgIHdpZHRoID0gb3ZlcmxheS53aWR0aFxuICAgIH1cblxuICAgIGxldCB0aXRsZVxuICAgIGlmIChvdmVybGF5LnRpdGxlKSB7XG4gICAgICB0aXRsZSA9IG92ZXJsYXkudGl0bGVcbiAgICB9XG5cbiAgICBsZXQgY2xvc2VcbiAgICBpZiAob3ZlcmxheS5jbG9zZSkge1xuICAgICAgY2xvc2UgPSAoKSA9PiB7XG4gICAgICAgIG92ZXJsYXkuY2xvc2UoKVxuICAgICAgICB0aGlzLm92ZXJsYXlPZmYoKVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBjbG9zZSA9IHRoaXMub3ZlcmxheU9mZlxuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICA8T3ZlcmxheSBzaG93PXt0aGlzLnN0YXRlLm92ZXJsYXl9IHdpZHRoPXt3aWR0aH0gdGl0bGU9e3RpdGxlfSBjbG9zZT17Y2xvc2V9PntvdmVybGF5LmNvbnRlbnR9PC9PdmVybGF5PlxuICAgIClcblxuICB9XG5cbiAgY29udGVudCgpIHtcbiAgICBpZiAodGhpcy5zdGF0ZS5sb2FkaW5nKSB7XG4gICAgICByZXR1cm4gPGRpdj48V2FpdGluZy8+PC9kaXY+XG4gICAgfVxuICAgIGlmICh0aGlzLnN0YXRlLmxpc3RpbmcubGVuZ3RoID09PSAwKSB7XG4gICAgICBjb25zdCBjb250ZW50ID0gW11cbiAgICAgIGNvbnRlbnQucHVzaCg8c3BhbiBrZXk9XCIxXCI+Tm8ge3RoaXMubGFiZWwudG9Mb3dlckNhc2UoKX1zIGZvdW5kLjwvc3Bhbj4pXG4gICAgICBpZiAodGhpcy5zdGF0ZS5zZWFyY2gubGVuZ3RoID4gMCkge1xuICAgICAgICBjb250ZW50LnB1c2goPHNwYW4ga2V5PVwiMlwiPiZuYnNwO1lvdSBtYXkgd2FudCB0byBicm9hZGVuIHlvdXIgc2VhcmNoLjwvc3Bhbj4pXG4gICAgICB9XG4gICAgICByZXR1cm4gY29udGVudFxuICAgIH1cbiAgICByZXR1cm4gKFxuICAgICAgPEdyaWRcbiAgICAgICAgbGlzdGluZz17dGhpcy5zdGF0ZS5saXN0aW5nfVxuICAgICAgICBlZGl0PXt0aGlzLmVkaXRSZXNvdXJjZX1cbiAgICAgICAgY29udGV4dE1lbnU9e3RoaXMuY29udGV4dE1lbnV9XG4gICAgICAgIGNvbHVtbnM9e3RoaXMuY29sdW1uc31cbiAgICAgICAgc29ydEZ1bmN0aW9uPXt0aGlzLnNvcnRCeUNvbHVtbn1cbiAgICAgICAgY3VycmVudFNvcnQ9e3tcbiAgICAgICAgICBzb3J0Qnk6IHRoaXMuc29ydEJ5LFxuICAgICAgICAgIHNvcnRCeURpcjogdGhpcy5zb3J0QnlEaXJcbiAgICAgICAgfX0vPlxuICAgIClcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAgPGRpdj57dGhpcy5zaG93T3ZlcmxheSgpfTwvZGl2PlxuICAgICAgICA8ZGl2Pnt0aGlzLm5hdmJhcigpfTwvZGl2PlxuICAgICAgICA8ZGl2Pnt0aGlzLm1lc3NhZ2UoKX08L2Rpdj5cbiAgICAgICAgPGRpdj57dGhpcy50aXRsZSgpfTwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm10LTNcIj57dGhpcy5jb250ZW50KCl9PC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApXG4gIH1cbn1cbiIsIlxudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL2dyaWQuc2Nzc1wiKTtcblxuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG5cbnZhciB0cmFuc2Zvcm07XG52YXIgaW5zZXJ0SW50bztcblxuXG5cbnZhciBvcHRpb25zID0ge1wiaG1yXCI6dHJ1ZX1cblxub3B0aW9ucy50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1cbm9wdGlvbnMuaW5zZXJ0SW50byA9IHVuZGVmaW5lZDtcblxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2FscztcblxuaWYobW9kdWxlLmhvdCkge1xuXHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9ncmlkLnNjc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL2dyaWQuc2Nzc1wiKTtcblxuXHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXG5cdFx0dmFyIGxvY2FscyA9IChmdW5jdGlvbihhLCBiKSB7XG5cdFx0XHR2YXIga2V5LCBpZHggPSAwO1xuXG5cdFx0XHRmb3Ioa2V5IGluIGEpIHtcblx0XHRcdFx0aWYoIWIgfHwgYVtrZXldICE9PSBiW2tleV0pIHJldHVybiBmYWxzZTtcblx0XHRcdFx0aWR4Kys7XG5cdFx0XHR9XG5cblx0XHRcdGZvcihrZXkgaW4gYikgaWR4LS07XG5cblx0XHRcdHJldHVybiBpZHggPT09IDA7XG5cdFx0fShjb250ZW50LmxvY2FscywgbmV3Q29udGVudC5sb2NhbHMpKTtcblxuXHRcdGlmKCFsb2NhbHMpIHRocm93IG5ldyBFcnJvcignQWJvcnRpbmcgQ1NTIEhNUiBkdWUgdG8gY2hhbmdlZCBjc3MtbW9kdWxlcyBsb2NhbHMuJyk7XG5cblx0XHR1cGRhdGUobmV3Q29udGVudCk7XG5cdH0pO1xuXG5cdG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufSIsIid1c2Ugc3RyaWN0J1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJ1xuaW1wb3J0IERyb3B6b25lIGZyb20gJ3JlYWN0LWRyb3B6b25lLXVwbG9hZGVyJ1xuaW1wb3J0IEJpZ0NoZWNrYm94IGZyb20gJ0Blc3NhcHBzdGF0ZS9jYW5vcHktcmVhY3QtYmlnY2hlY2tib3gnXG5pbXBvcnQgJy4vc3R5bGUuc2NzcydcbmltcG9ydCAncmVhY3QtZHJvcHpvbmUtdXBsb2FkZXIvZGlzdC9zdHlsZXMuY3NzJ1xuXG5jb25zdCBGb3JtID0gKHtjbG9zZSwgdXBkYXRlLCByZXNvdXJjZSwgc2F2ZSwgdXBsb2FkfSkgPT4ge1xuXG4gIGNvbnN0IHVwbG9hZFByb21wdCA9IChcbiAgICA8ZGl2IGtleT1cIjFcIj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwidXBsb2FkLXRleHRcIj5DbGljayB0byBicm93c2U8YnIvPi0gb3IgLTxici8+ZHJhZyBpbWFnZSBvciB2aWRlbyBmaWxlIGhlcmUuPC9kaXY+XG4gICAgPC9kaXY+XG4gIClcblxuICByZXR1cm4gKFxuICAgIDxkaXY+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1iLTNcIj5cbiAgICAgICAgPEJpZ0NoZWNrYm94XG4gICAgICAgICAgbGFiZWw9XCJBY3RpdmVcIlxuICAgICAgICAgIGNoZWNrZWQ9e3Jlc291cmNlLmFjdGl2ZX1cbiAgICAgICAgICBoYW5kbGU9e3VwZGF0ZS5iaW5kKG51bGwsICdhY3RpdmUnKX0vPlxuICAgICAgPC9kaXY+XG4gICAgICA8RHJvcHpvbmVcbiAgICAgICAgY2xhc3NOYW1lcz17e1xuICAgICAgICAgIGRyb3B6b25lOiAnZHJvcHpvbmUnXG4gICAgICAgIH19XG4gICAgICAgIGFjY2VwdD1cImltYWdlL2pwZyxpbWFnZS9wbmcsdmlkZW8vbXA0LHZpZGVvL3dlYm1cIlxuICAgICAgICBnZXRVcGxvYWRQYXJhbXM9e3VwbG9hZH1cbiAgICAgICAgbWF4RmlsZXM9ezF9XG4gICAgICAgIG11bHRpcGxlPXtmYWxzZX1cbiAgICAgICAgY2FuQ2FuY2VsPXtmYWxzZX1cbiAgICAgICAgY2FuUmVzdGFydD17ZmFsc2V9XG4gICAgICAgIG1pblNpemVCeXRlcz17MTAyNH1cbiAgICAgICAgbWF4U2l6ZUJ5dGVzPXs4Mzg4NjA4fVxuICAgICAgICBpbnB1dENvbnRlbnQ9e3VwbG9hZFByb21wdH1cbiAgICAgICAgYXV0b1VwbG9hZD17dHJ1ZX0vPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3cgbXQtMyBtYi0zXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLXNtLTNcIj5cbiAgICAgICAgICA8bGFiZWw+VGl0bGU8L2xhYmVsPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtc20tOVwiPlxuICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCJcbiAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgIG5hbWU9XCJ0aXRsZVwiXG4gICAgICAgICAgICBwbGFjZWhvbGRlcj1cIkFwcGVhcnMgb24gaW1hZ2UsIGFib3ZlIGNhcHRpb25cIlxuICAgICAgICAgICAgdmFsdWU9e3Jlc291cmNlLnRpdGxlfVxuICAgICAgICAgICAgb25DaGFuZ2U9e3VwZGF0ZS5iaW5kKG51bGwsICd0aXRsZScpfS8+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtbC0zXCI+XG4gICAgICAgICAgICA8QmlnQ2hlY2tib3hcbiAgICAgICAgICAgICAgbGFiZWw9XCJTaG93IHRpdGxlXCJcbiAgICAgICAgICAgICAgY2hlY2tlZD17cmVzb3VyY2Uuc2hvd190aXRsZX1cbiAgICAgICAgICAgICAgaGFuZGxlPXt1cGRhdGUuYmluZChudWxsLCAnc2hvd190aXRsZScpfS8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvdyBtYi0zXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLXNtLTNcIj5cbiAgICAgICAgICA8bGFiZWwgaHRtbEZvcj1cImNhcHRpb25cIj5DYXB0aW9uPC9sYWJlbD5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLXNtLTlcIj5cbiAgICAgICAgICA8dGV4dGFyZWFcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cImZvcm0tY29udHJvbFwiXG4gICAgICAgICAgICBwbGFjZWhvbGRlcj1cIklmIG5vdCBibGFuaywgYXBwZWFycyBvbiBpbWFnZSwgYmVsb3cgdGl0bGUuXCJcbiAgICAgICAgICAgIG5hbWU9XCJjYXB0aW9uXCJcbiAgICAgICAgICAgIHZhbHVlPXtyZXNvdXJjZS5jYXB0aW9ufVxuICAgICAgICAgICAgb25DaGFuZ2U9e3VwZGF0ZS5iaW5kKG51bGwsICdjYXB0aW9uJyl9Lz5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLXNtLTNcIj5cbiAgICAgICAgICA8bGFiZWwgaHRtbEZvcj1cImNhcHRpb25fem9uZVwiPkNhcHRpb24gem9uZTwvbGFiZWw+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1zbS00XCI+XG4gICAgICAgICAgPHNlbGVjdFxuICAgICAgICAgICAgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCJcbiAgICAgICAgICAgIG5hbWU9XCJjYXB0aW9uX3pvbmVcIlxuICAgICAgICAgICAgdmFsdWU9e3Jlc291cmNlLmNhcHRpb25fem9uZX1cbiAgICAgICAgICAgIG9uQ2hhbmdlPXt1cGRhdGUuYmluZChudWxsLCAnY2FwdGlvbl96b25lJyl9PlxuICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIlwiIGRpc2FibGVkPVwiZGlzYWJsZWRcIj5DaG9vc2Ugd2hlcmUgeW91IHdhbnQgeW91ciBjYXB0aW9uIHRvIGFwcGVhcjwvb3B0aW9uPlxuICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIjBcIiBsYWJlbD1cIkNlbnRlclwiPkNlbnRlcjwvb3B0aW9uPlxuICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIjFcIiBsYWJlbD1cIlRvcCBsZWZ0XCI+VG9wIGxlZnQ8L29wdGlvbj5cbiAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCIyXCIgbGFiZWw9XCJUb3AgcmlnaHRcIj5Ub3AgcmlnaHQ8L29wdGlvbj5cbiAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCIzXCIgbGFiZWw9XCJCb3R0b20gbGVmdFwiPkJvdHRvbSBsZWZ0PC9vcHRpb24+XG4gICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiNFwiIGxhYmVsPVwiQm90dG9tIHJpZ2h0XCI+Qm90dG9tIHJpZ2h0PC9vcHRpb24+XG4gICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIClcbn1cblxuRm9ybS5wcm9wVHlwZXMgPSB7XG4gIHJlc291cmNlOiBQcm9wVHlwZXMub2JqZWN0LFxuICBmaW5pc2g6IFByb3BUeXBlcy5mdW5jLFxuICBzYXZlOiBQcm9wVHlwZXMuZnVuYyxcbiAgdXBkYXRlOiBQcm9wVHlwZXMuZnVuY1xufVxuXG5leHBvcnQgZGVmYXVsdCBGb3JtXG4iLCIndXNlIHN0cmljdCdcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nXG5pbXBvcnQgTGlzdGluZyBmcm9tICcuLi9FeHRlbmRzL0xpc3RpbmcnXG5pbXBvcnQgRm9ybSBmcm9tICcuL0Zvcm0nXG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnXG5cbi8qIGdsb2JhbCBjYXJvdXNlbElkLCAkICovXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNsaWRlIGV4dGVuZHMgTGlzdGluZyB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpXG4gICAgdGhpcy5zdGF0ZS5vdmVybGF5ID0gdHJ1ZVxuICAgIHRoaXMubW9kdWxlID0gJ2Nhcm91c2VsJ1xuICAgIHRoaXMucm9sZSA9ICdBZG1pbidcbiAgICB0aGlzLmNvbnRyb2wgPSAnU2xpZGUnXG4gICAgdGhpcy5sYWJlbCA9ICdTbGlkZSdcbiAgICB0aGlzLmRlZmF1bHRSZXNvdXJjZSA9IHtcbiAgICAgIGlkOiAwLFxuICAgICAgdGl0bGU6ICcnLFxuICAgICAgc2hvd190aXRsZTogZmFsc2UsXG4gICAgICBmaWxlcGF0aDogJycsXG4gICAgICBjYXB0aW9uOiAnJyxcbiAgICAgIHF1ZXVlOiAwLFxuICAgICAgdXJsOiAnJyxcbiAgICAgIGNhcHRpb25fem9uZTogMCxcbiAgICAgIGFjdGl2ZTogdHJ1ZSxcbiAgICAgIHdpZHRoOiAwLFxuICAgICAgaGVpZ2h0OiAwLFxuICAgICAgdHlwZTogMFxuICAgIH1cbiAgICB0aGlzLmNvbHVtbnMgPSBbXG4gICAgICB7XG4gICAgICAgIGNvbHVtbjogJ3RpdGxlJyxcbiAgICAgICAgbGFiZWw6ICdUaXRsZSdcbiAgICAgIH1cbiAgICBdXG4gICAgdGhpcy5jb250ZXh0TWVudSA9IFtcbiAgICAgIHtcbiAgICAgICAgaGFuZGxlQ2xpY2s6IHRoaXMuY29tbWFuZC5iaW5kKHRoaXMpLFxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgY29tbWFuZDogJ2VkaXQnXG4gICAgICAgIH0sXG4gICAgICAgIGxhYmVsOiAoXG4gICAgICAgICAgPGEgaHJlZj1cIiNcIj5cbiAgICAgICAgICAgIDxpIGNsYXNzTmFtZT1cImZhcyBmYS1lZGl0XCI+PC9pPiZuYnNwO0VkaXQgc2xpZGU8L2E+XG4gICAgICAgIClcbiAgICAgIH0sIHtcbiAgICAgICAgaGFuZGxlQ2xpY2s6IHRoaXMuY29tbWFuZC5iaW5kKHRoaXMpLFxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgY29tbWFuZDogJ2RlbGV0ZSdcbiAgICAgICAgfSxcbiAgICAgICAgbGFiZWw6IChcbiAgICAgICAgICA8YSBocmVmPVwiI1wiPlxuICAgICAgICAgICAgPGkgY2xhc3NOYW1lPVwiZmFzIGZhLXRyYXNoXCI+PC9pPiZuYnNwO0RlbGV0ZSBzbGlkZTwvYT5cbiAgICAgICAgKVxuICAgICAgfVxuICAgIF1cbiAgICB0aGlzLnN0YXRlLnJlc291cmNlID0gdGhpcy5kZWZhdWx0UmVzb3VyY2VcbiAgICB0aGlzLnVwbG9hZCA9IHRoaXMudXBsb2FkLmJpbmQodGhpcylcbiAgfVxuXG4gIGNvbW1hbmQoZXZlbnQsIGRhdGEpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgc3dpdGNoIChkYXRhLmNvbW1hbmQpIHtcbiAgICAgIGNhc2UgJ2VkaXQnOlxuICAgICAgICB0aGlzLmVkaXRSZXNvdXJjZShkYXRhLm5hbWUpXG4gICAgICAgIGJyZWFrXG5cbiAgICAgIGNhc2UgJ2RlbGV0ZSc6XG4gICAgICAgIHRoaXMuZGVsZXRlUmVzb3VyY2UoZGF0YS5uYW1lKVxuICAgICAgICBicmVha1xuXG4gICAgfVxuICB9XG5cbiAgdXBsb2FkKHVwbG9hZCkge1xuICAgIGxldCBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSgpXG4gICAgZm9ybURhdGEuYXBwZW5kKCdjYXJvdXNlbElkJywgdGhpcy5wcm9wcy5jYXJvdXNlbElkKVxuICAgIGZvcm1EYXRhLmFwcGVuZCgnZmlsZScsIHVwbG9hZC5maWxlKVxuICAgICQuYWpheCh7XG4gICAgICB1cmw6ICcuL2Nhcm91c2VsL0FkbWluL1NsaWRlL3VwbG9hZCcsXG4gICAgICB0eXBlOiAnUE9TVCcsXG4gICAgICBkYXRhOiBmb3JtRGF0YSxcbiAgICAgIGNhY2hlOiBmYWxzZSxcbiAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICBwcm9jZXNzRGF0YTogZmFsc2UsXG4gICAgICBjb250ZW50VHlwZTogZmFsc2UsXG4gICAgICBzdWNjZXNzOiAoZGF0YSkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhkYXRhKVxuICAgICAgfSxcbiAgICAgIGVycm9yOiAoZGF0YSkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhkYXRhKVxuICAgICAgICBhbGVydChcbiAgICAgICAgICAnU29ycnkgYnV0IHlvdXIgZmlsZSBpcyB1bmFjY2VwdGFibGUuIEl0IG1heSBiZSBvZiB0aGUgd3JvbmcgdHlwZSBvciB0b28gbGFyZ2UgJyArXG4gICAgICAgICAgJyg4TUIgaXMgdGhlIG1heGltdW0gYWxsb3dlZCkuIFBsZWFzZSB0cnkgYWdhaW4uJ1xuICAgICAgICApXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIG92ZXJsYXkoKSB7XG4gICAgY29uc3QgdGl0bGUgPSB0aGlzLnN0YXRlLnJlc291cmNlLmlkID4gMCA/ICdFZGl0IHNsaWRlJyA6ICdDcmVhdGUgc2xpZGUnXG4gICAgY29uc3QgZm9ybSA9IChcbiAgICAgIDxGb3JtXG4gICAgICAgIGNsb3NlPXt0aGlzLmZpbmlzaH1cbiAgICAgICAgdXBkYXRlPXt0aGlzLnVwZGF0ZX1cbiAgICAgICAgcmVzb3VyY2U9e3RoaXMuc3RhdGUucmVzb3VyY2V9XG4gICAgICAgIHVwbG9hZD17dGhpcy51cGxvYWR9XG4gICAgICAgIHNhdmU9e3RoaXMuc2F2ZX0vPlxuICAgIClcbiAgICByZXR1cm4ge2NvbnRlbnQ6ICg8ZGl2IGNsYXNzTmFtZT1cInNsaWRlLWZvcm1cIj57Zm9ybX1cbiAgICA8L2Rpdj4pLCB3aWR0aDogJzgwJScsIHRpdGxlOiB0aXRsZSwgY2xvc2U6IHRoaXMubG9hZH1cbiAgfVxufVxuXG5TbGlkZS5wcm9wVHlwZXMgPSB7XG4gIGNhcm91c2VsSWQ6IFByb3BUeXBlcy5zdHJpbmdcbn1cblxuUmVhY3RET00ucmVuZGVyKDxTbGlkZSBjYXJvdXNlbElkPXtjYXJvdXNlbElkfS8+LCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcbiAgJ1NsaWRlJ1xuKSlcbiIsIlxudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL3N0eWxlLnNjc3NcIik7XG5cbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuXG52YXIgdHJhbnNmb3JtO1xudmFyIGluc2VydEludG87XG5cblxuXG52YXIgb3B0aW9ucyA9IHtcImhtclwiOnRydWV9XG5cbm9wdGlvbnMudHJhbnNmb3JtID0gdHJhbnNmb3JtXG5vcHRpb25zLmluc2VydEludG8gPSB1bmRlZmluZWQ7XG5cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qc1wiKShjb250ZW50LCBvcHRpb25zKTtcblxuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG5cbmlmKG1vZHVsZS5ob3QpIHtcblx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vc3R5bGUuc2Nzc1wiLCBmdW5jdGlvbigpIHtcblx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vc3R5bGUuc2Nzc1wiKTtcblxuXHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXG5cdFx0dmFyIGxvY2FscyA9IChmdW5jdGlvbihhLCBiKSB7XG5cdFx0XHR2YXIga2V5LCBpZHggPSAwO1xuXG5cdFx0XHRmb3Ioa2V5IGluIGEpIHtcblx0XHRcdFx0aWYoIWIgfHwgYVtrZXldICE9PSBiW2tleV0pIHJldHVybiBmYWxzZTtcblx0XHRcdFx0aWR4Kys7XG5cdFx0XHR9XG5cblx0XHRcdGZvcihrZXkgaW4gYikgaWR4LS07XG5cblx0XHRcdHJldHVybiBpZHggPT09IDA7XG5cdFx0fShjb250ZW50LmxvY2FscywgbmV3Q29udGVudC5sb2NhbHMpKTtcblxuXHRcdGlmKCFsb2NhbHMpIHRocm93IG5ldyBFcnJvcignQWJvcnRpbmcgQ1NTIEhNUiBkdWUgdG8gY2hhbmdlZCBjc3MtbW9kdWxlcyBsb2NhbHMuJyk7XG5cblx0XHR1cGRhdGUobmV3Q29udGVudCk7XG5cdH0pO1xuXG5cdG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufSIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikoZmFsc2UpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiLmNvbnRleHQge1xcbiAgY3Vyc29yOiBjb250ZXh0LW1lbnU7IH1cXG5cXG5uYXYucmVhY3QtY29udGV4dG1lbnUge1xcbiAgYm9yZGVyOiAxcHggc29saWQgIzU5NTk1OTtcXG4gIGJvcmRlci1yYWRpdXM6IDRweDtcXG4gIHBhZGRpbmc6IDZweDtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC45KTtcXG4gIGJveC1zaGFkb3c6IDVweCA1cHggNXB4ICM5ZDlkOWQ7XFxuICBtaW4td2lkdGg6IDEwMHB4OyB9XFxuXCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKShmYWxzZSk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIuc2xpZGUtZm9ybSBsYWJlbCB7XFxuICBmb250LXNpemU6IDE4cHg7IH1cXG5cXG4uZHJvcHpvbmUge1xcbiAgbWluLWhlaWdodDogMzAwcHg7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBib3JkZXI6IDNweCBkYXNoZWQgI2UzZTNlMztcXG4gIGZvbnQtc2l6ZTogMzZweDtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTsgfVxcbiAgLmRyb3B6b25lIC51cGxvYWQtdGV4dCB7XFxuICAgIGNvbG9yOiAjNjM2MzYzOyB9XFxuICAuZHJvcHpvbmU6aG92ZXIge1xcbiAgICBjdXJzb3I6IHBvaW50ZXI7IH1cXG5cIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG4iXSwic291cmNlUm9vdCI6IiJ9