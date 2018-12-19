/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 82);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function (useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if (item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function (modules, mediaQuery) {
		if (typeof modules === "string") modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for (var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if (typeof id === "number") alreadyImportedModules[id] = true;
		}
		for (i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if (typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if (mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if (mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */';
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			var styleTarget = fn.call(this, selector);
			// Special case to return head of iframe instead of iframe itself
			if (styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[selector] = styleTarget;
		}
		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(90);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton) options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(11);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _windowOrGlobal = __webpack_require__(5);

var _windowOrGlobal2 = _interopRequireDefault(_windowOrGlobal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Img = function (_Component) {
  _inherits(Img, _Component);

  function Img(props) {
    _classCallCheck(this, Img);

    var _this = _possibleConstructorReturn(this, (Img.__proto__ || Object.getPrototypeOf(Img)).call(this, props));

    _this.state = {
      style: {}
    };
    _this.increasHeightt = _this.increasHeightt.bind(_this);

    return _this;
  }

  _createClass(Img, [{
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      window.removeEventListener("resize", this.increasHeightt);
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      window.addEventListener("resize", this.increasHeightt);
      this.increasHeightt();
    }
  }, {
    key: 'generateAlternativeText',
    value: function generateAlternativeText(src) {
      return src ? src.substring(src.lastIndexOf('/') + 1, src.lastIndexOf('.')) : '';
    }
  }, {
    key: 'removeSpacesfromLink',
    value: function removeSpacesfromLink(src) {
      return src ? src.replace(' ', "%20") : src;
    }
  }, {
    key: 'increasHeightt',
    value: function increasHeightt() {
      if (this.props.increasHeight) {
        var height = _reactDom2.default.findDOMNode(this) ? _reactDom2.default.findDOMNode(this).getBoundingClientRect().height : null;
        var width = _reactDom2.default.findDOMNode(this) ? _reactDom2.default.findDOMNode(this).getBoundingClientRect().width : null;
        width > height && height !== 0 && window.innerWidth < 767 ? this.setState({
          style: {
            marginTop: (width * this.props.increasHeight - height) / 2,
            marginBottom: (width * this.props.increasHeight - height) / 2
          }
        }) : this.setState({
          style: {
            paddingTop: 0,
            paddingBottom: 0
          }
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement('img', {
        src: this.removeSpacesfromLink(this.props.src),
        alt: this.generateAlternativeText(this.props.src),
        style: _extends({}, this.props.style, this.state.style),
        className: this.props.className,
        id: this.props.id,
        onClick: this.props.onClick
      });
    }
  }]);

  return Img;
}(_react.Component);

exports.default = Img;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("react-router-dom");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("window-or-global");

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TapButton = function (_Component) {
  _inherits(TapButton, _Component);

  function TapButton(props) {
    _classCallCheck(this, TapButton);

    var _this = _possibleConstructorReturn(this, (TapButton.__proto__ || Object.getPrototypeOf(TapButton)).call(this, props));

    _this.state = {
      initialStyle: {
        color: _this.props.shape === 'bordered' ? '#fff' : _this.props.color,
        backgroundColor: _this.props.shape === 'bordered' ? 'transparent' : 'transparent',
        borderColor: _this.props.shape === 'bordered' ? '#fff' : _this.props.color
      },
      hoverStyle: {
        color: _this.props.shape === 'bordered' ? _this.props.color : '#fff',
        backgroundColor: _this.props.shape === 'bordered' ? '#fff' : _this.props.color,
        borderColor: _this.props.shape === 'bordered' ? '#fff' : _this.props.color
      },
      style: {}
    };
    return _this;
  }

  _createClass(TapButton, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      __webpack_require__(31);
      if (this.props.hoverStyle) {
        this.setState({
          style: this.state.hoverStyle
        });
      } else {
        this.setState({
          style: this.state.initialStyle
        });
      }
    }
  }, {
    key: 'onMouseOverOut',
    value: function onMouseOverOut(newStyle) {
      if (this.props.hoverStyle) {
        this.setState({ style: this.state.hoverStyle });
      } else {
        this.setState({ style: newStyle });
      }
    }
  }, {
    key: 'composeComponent',
    value: function composeComponent() {
      var _this2 = this;

      if (this.props.actionType && this.props.link && this.props.actionType === 'sms' && this.props.type === 'link') {
        return _react2.default.createElement(
          'a',
          {
            href: this.props.link,
            target: '_blank',
            className: "tapButton " + this.props.shape + ' ' + this.props.className,
            style: _extends({}, this.props.style, this.state.style),
            onMouseOver: function onMouseOver() {
              return _this2.onMouseOverOut(_this2.state.hoverStyle);
            },
            onMouseOut: function onMouseOut() {
              return _this2.onMouseOverOut(_this2.state.initialStyle);
            }
          },
          this.props.text,
          this.props.fontAwesomeIcon ? _react2.default.createElement(
            _react2.default.Fragment,
            null,
            _react2.default.createElement('div', { className: 'buttonIconSpace' }),
            this.props.fontAwesomeIcon
          ) : null
        );
      } else if (this.props.actionType && this.props.link && this.props.actionType === 'link' && this.props.type === 'link') {
        return _react2.default.createElement(
          'a',
          {
            href: this.props.link,
            target: '_blank',
            className: 'tapButton ' + this.props.shape + ' ' + this.props.className,
            style: _extends({}, this.props.style, this.state.style),
            onMouseOver: function onMouseOver() {
              return _this2.onMouseOverOut(_this2.state.hoverStyle);
            },
            onMouseOut: function onMouseOut() {
              return _this2.onMouseOverOut(_this2.state.initialStyle);
            }
          },
          this.props.text,
          this.props.fontAwesomeIcon ? _react2.default.createElement(
            _react2.default.Fragment,
            null,
            _react2.default.createElement('div', { className: 'buttonIconSpace' }),
            this.props.fontAwesomeIcon
          ) : null
        );
      } else {
        return _react2.default.createElement(
          'button',
          {
            id: this.props.id,
            className: "tapButton " + this.props.shape + ' ' + ' ' + this.props.className,
            onClick: this.props.onClick,
            style: _extends({}, this.props.style, this.state.style),
            onMouseOver: function onMouseOver() {
              return _this2.onMouseOverOut(_this2.state.hoverStyle);
            },
            onMouseOut: function onMouseOut() {
              return _this2.onMouseOverOut(_this2.state.initialStyle);
            }
          },
          this.props.loading && this.props.fontAwesomeIcon ? _react2.default.createElement(
            _react2.default.Fragment,
            null,
            this.props.text,
            _react2.default.createElement('div', { className: 'buttonIconSpace' }),
            _react2.default.createElement('i', { className: 'fas fa-spinner big-fa-icon' })
          ) : _react2.default.createElement(
            _react2.default.Fragment,
            null,
            !this.props.loading && this.props.fontAwesomeIcon ? _react2.default.createElement(
              _react2.default.Fragment,
              null,
              this.props.text,
              _react2.default.createElement('div', { className: 'buttonIconSpace' }),
              this.props.fontAwesomeIcon
            ) : _react2.default.createElement(
              _react2.default.Fragment,
              null,
              this.props.loading && !this.props.fontAwesomeIcon ? _react2.default.createElement(
                _react2.default.Fragment,
                null,
                _react2.default.createElement('i', { className: 'fas fa-spinner big-fa-icon' })
              ) : _react2.default.createElement(
                _react2.default.Fragment,
                null,
                !this.props.loading && !this.props.fontAwesomeIcon ? _react2.default.createElement(
                  _react2.default.Fragment,
                  null,
                  this.props.text
                ) : _react2.default.createElement(_react2.default.Fragment, null)
              )
            )
          )
        );
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return this.composeComponent();
    }
  }]);

  return TapButton;
}(_react.Component);

exports.default = TapButton;

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("mobx-react");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = [{"page":"support","slot":"support","color":"#959595","bannerImage":"http://www.tap.company/websiteImages/pages/support/banner/support-main.svg","link":"/support","content":[{"title":{"en":"How can we help you?","ar":"كيف يمكننا مساعدتك؟"},"paragraph":{"en":"We’re absolutely here to help and we’re always very happy to hear\nany of your comments, suggestions, or concerns regarding our service and our company.","ar":"نحن هنا للمساعدة ، وسعداء دائما لسماع تعليقاتك وآرائك بشأن الخدمات التي تقدمها شركتنا."}}]},{"page":"jobs","slot":"jobs","color":"#545454","bannerImage":"http://www.tap.company/websiteImages/pages/jobs/banner/jobs-main.png","link":"/jobs","intro":{"en":"Do you love Tap? Then you’ll fit right in.","ar":"هل تحب تاپ؟ حيّاك هذا مكانك."},"subIntro":{"en":"Tap is on a mission to change how businesses and consumers in the Middle East accept and make payments online. We’ve already helped hundreds of entrepreneurs and thousands of users create healthier businesses and easier transactions through Tap’s platforms and services. Every day, our hard work is spent helping others in our community build better businesses and live better lives.","ar":"لتطبيق تاپ مهمة واحدة هي تغيير النظرة السائدة في الشرق الأوسط لطرق الدفع عبر الإنترنت. لقد ساعدنا المئات لا بل الآلاف من المستخدمين وأصحاب الأعمال حتى الآن في إتمام العمليات المالية بسهولة وسلاسة عبر وسائل وخدمات تاپ. نحن نعمل بجهد كل يوم لبناء حياة أسهل لأفراد مجتمعنا ولنؤسس معهم أعمال أفضل."},"contentTitle":{"en":"Working at Tap means...","ar":"العمل في تاپ يعني..."},"content":[{"icon":"http://www.tap.company/websiteImages/pages/jobs/icons/team-icon.png","title":{"ar":"العمل ضمن فريق واحد","en":"As a team"},"paragraph":{"ar":"لأنّ طبيعة عملنا اليومية تفرض علينا الكثير من التحديات، نحن في فريق عمل تاپ نجتهد كل يوم لمواجهة هذه التحديات وتحقيق أفضل النتائج… ولكن لا مشكلة في فنجان قهوة مع الفريق في ظل هذه الزحمة.","en":"Because of the daily nature of payments, every day brings new challenges for the Tap Team, and every day we work together to meet those challenges. At Tap, we keep the coffee running and the teamwork buzzing."}},{"icon":"http://www.tap.company/websiteImages/pages/jobs/icons/creative-icon.png","title":{"ar":"في طاقمنا .. عقول مبدعة","en":"With creative people"},"paragraph":{"ar":"يقوم نصف طاقم عملنا بالعمل مع المستهلكين ومساعدة العملاء وأصحاب العمل وعلى إيجاد طرق جديدة وسهلة للتواصل مع العالم فيما يقوم النصف الآخر في تحسين خبرة تاپ وبنائها وتصميمها لجعلها وسيلة دفع متطوّرة ومتقدّمة أكثر من أي وقت مضى. ومع كلا القسمين، نستخدم الإبداع والمرح وحب الاكتشاف كوسيلة لتوليد مزيد من العمل الجيّد لبناء شركة نفتخر بها تحوز على ثقة العملاء.","en":"Half of the Tap Team works with the Tap community—helping consumers, helping business owners, and exploring new and exciting ways to connect with the world. The other half works on refining the Tap experience—building, designing, and making Tap an even greater payment tool than ever before. On both sides of the team, we all use our creativity and our joy of discovery to build an organization that our customers love and that we can all be proud of."}},{"icon":"http://www.tap.company/websiteImages/pages/jobs/icons/purpose-icon.png","title":{"ar":"نعمل لهدف","en":"For a purpose"},"paragraph":{"ar":"تنمية الكويت ودول الخليج العربي وتطويرها أحد أهم قيمنا وأكثرها تحدياً – فنحن لا نكتفي بتسويق شركتنا بل بجعل منطقتنا مكاناً فعالاً ينبض بالحيوية والإنتاجية. لذا فإن كل طاقة يبذلها كل موظف لدينا ستترك أثراً إيجابياً في المجتمع من حولنا وفي مسيرته المهنية على حد سواء.","en":"We put our values of making Kuwait and the Gulf a more innovative, daring, and productive place at the heart of how we operate as an organization—not just how we market ourselves. The time and energy you spend with Tap will go towards making a positive impact both on your own career and on the society around you."}}],"subImage":"http://www.tap.company/websiteImages/pages/jobs/banner/Jobs-sub-image.png","subImageContent":{"title":{"ar":"تشعر بأنك من هذا الفريق؟","en":"Sound like your kind of team?"},"paragraph":{"ar":"نحن في تاپ نتعامل مع كل شيء بإبداع وحرفية—\nفإذا كنت تعتمد الطريقة نفسها في عملك، سيسعدنا جداً أن نسمع منك.","en":"At Tap, we approach everything we do thoughtfully and creatively—\nif you feel the same way about your own work, we’d love to hear from you."},"buttonText":{"ar":"شارك في تاپ","en":"Join Tap"}}},{"page":"about","slot":"about","color":"#959595","bannerImage":"https://www.tap.company/websiteImages/pages/about/banner/about-main.jpg","link":"/about","intro":{"en":"Managing your money is no small task, after all.","ar":"إدارة مصاريفك ليست أمراً سهلاً في نهاية المطاف."},"subIntro":{"en":"But just because we all have to manage our money that doesn’t mean we all necessarily like managing our money… and it doesn’t mean that we’re always the best at it, either. And yet, as business owners and regular consumers alike, we all have to deal with the maddening work of managing our money—every single day, no matter what. You’re probably asking yourself the same questions we were. Isn’t that why we have technology? Weren’t we supposed to be living better and better… not more and more stressed out?","ar":"جميعنا مضطرون لإدارة مصاريفنا وحساباتنا بشكل يومي سواء كّنا مستهلكين أو أصحاب أعمال. ولا يعني قيامنا بذلك يومياً أنّنا سعداء بهذه المهمة، ولكنه أمر لا بدّ منه على الرغم من عدم نجاحنا بذلك في أغلب الأوقات.. ولعلّك تسأل نفسك الآن… لماذا كل ذلك؟ ألم توجد التكنولوجيا لجعل حياتنا أبسط وأكثر سهولة وأقل توتراً؟"},"content":[{"title":{"en":"The Beginning","ar":"البداية"},"paragraph":{"en":"That’s exactly where Tap founders found themselves, once upon a time in the year 2014. Or rather, that’s where they found most Middle Eastern business owners and consumers. They found that, for the world’s leading population of young, wealthy, online savvy, technologically advanced users to still have problems buying and selling things online in their part of the world… Something wasn’t clicking. We live in a world where we didn’t have to deal with drawn out set-up procedures, complicated systems, or inflexible payment methods anymore… but somehow we still were.\n\nWe knew there was a better way. And that way was Tap. So, Tap was born in May 2013, in Kuwait—and with it a whole new era of doing business online in the Middle East. Now businesses could finally bill, accept, receive, and make payments online… easier, faster, and smoother than ever before. Payment clearances that used to take days and weeks to setup, now took just a few hours. Integrating local businesses with the global e-commerce platforms became a real possibility.\n\nNow that Tap is around, managing money—and managing it well—became a whole lot cooler.","ar":"أمام هذا السؤال، وجد مؤسسوا تاپ أنفسهم بلا إجابة وكان ذلك بداية لتأسيس تاپ عام 2014. فقد لاحظا أن معظم أصحاب الأعمال والمستهلكين في منطقة الشرق الأوسط يعانون من هذه المسألة. وعلى الرغم من أن مجتمعاتنا مليئة بالشباب الشغوفين بالتكنولوجيا والإنترنت، ما زالت عمليات البيع والشراء الإلكترونية متأخّرة ومن هنا راودتهما هذه الفكرة الجديدة. فنحن نعيش في ظل عالم متقدّم يوفّر علينا عناء الأنظمة والإجراءات المعقّدة ، أو طرق الدفع غير المرنة، لكننا رغم ذلك ما زلنا بعيدين عن تطبيق هذا التقدّم على أرض الواقع. لذلك سعى علي ومحمد إلى إيجاد طريقة أفضل. فكانت تاپ. ولدت تاپ في مايو 2013 في الكويت مشكلة انطلاقة مرحلة جديدة للأعمال عبر الإنترنت في منطقة الشرق الأوسط. حيث بات بإمكان أصحاب الأعمال إعداد الفواتير، قبول المدفوعات، استلام وإجراء العمليات المالية إلكترونياً بسهولة وسرعة وطريقة أكثر سلاسة من قبل وباتت إجراءات الحصول على براءة ذمّة مثلا تتم في خلال عدة ساعات بعد أن كانت تتطلب أياما أو أسابيع وأصبح دمج الأعمال المحلية بنظام العمليات المصرفية العالمة حقيقة ممكنة أصبحت إدارة الأموال بطريقة صحيحة عملية أكثر سهولة ومرحاً مع تاپ الآن."}},{"title":{"en":"Fast forward to present day","ar":"تطوّر سريع ونمو متواصل"},"paragraph":{"en":"Tap now supports over 1000 businesses and major corporations (many of which we’re honored to say you’re familiar with) and has had a (digital!) hand in securing tens of thousands of transactions easily and efficiently for consumers all around the world.\n\nWe’re happily based in Kuwait where our caffeine-fueled team is working day-in, day-out on one really big mission:","ar":"يدعم تطبيق تاپ اليوم أكثر من 100 مؤسسة وشركة رئيسية (ممن نفتخر بالتعامل معهم) وقد نجح في تقديم مساعدته الرقمية في حماية الآلاف من العمليات المصرفية لعدد من العملاء حول العالم بسهولة وفعالية.\nنحن سعداء بانطلاقتنا من الكويت حيث مركزنا وطاقمنا الشغوف الذي يعمل بجهد متواصل على تنفيذ مهمتنا الضخمة:"}}],"subImage":"https://www.tap.company/websiteImages/pages/about/banner/about-sub-image.jpg","subImageContent":{"title":{"ar":"حياتك أسهل وأعمالك أقوى","en":"Making your life easier and your business stronger"}},"conclusion":{"en":"If you’re running a business of any kind and need a simple, powerful way to start selling online and accept payments using goSell\\sell and the possibility to bill clients and collect online payments using goCollect\\collect , Tap was built specifically for you.\n\nAt Tap, our greatest goal is serving our clients, our users, and our community every single day. We believe in thinking differently and doing whatever it takes to get to “yes.” Our job is turn roadblocks into opportunities, both in business and in life. In everything we do we strive to be excellent, to over-deliver, and to leave those we impact with the belief that they can do and be more than they ever thought possible.","ar":"تدير مؤسسة وترغب بنظام مالي بسيط وقوي يساعدك على بيع منتجاتك وإعداد فواتيرك إلكترونياً. goSell\\sell و goCollect\\collect صمّم خصيصاً لتلبية احتياجاتك.\n\nفي تاپ، أهم أهدافنا هو خدمة عملائنا، ومستخدمينا ومجتمعنا كل يوم. نحن نؤمن بالتفكير بطريقة مختلفة ونبذل كل ما في وسعنا لنحقّق ما نطمح إليه . وظيفتنا تحويل العقبات إلى فرص جديدة في الحياة وفي الأعمال. نحن نسعى إلى الأفضل دائماً، وإلى تقديم المزيد وترك أثر وثقة لدى كل عملائنا بأنّ كل شيء ممكن."}},{"page":"api","slot":"api","brandingColor":"#f4dc00","color":"#ffc72d","bannerImage":"https://www.tap.company/websiteImages/pages/api/banner/API-main-image.png","block":{"title":"api","subtitle":{"en":"for developers","ar":"للمطورين"},"image":"https://www.tap.company/websiteImages/blocks/api-1.png","hoverImage":"https://www.tap.company/websiteImages/blocks/api-2.png"},"callToAction":{"title":{"en":"Start Integrating","ar":"ابدأ الدمج"},"paragraph":{"en":"custom e-payment experience, from start to finish.","ar":"تجربة دفع إلكتروني سهلة وسريعة"},"shortTitle":{"en":"Ready to start building?","ar":"هل أنت جاهز للبدء؟"},"shortParagraph":{"en":"Add Tap’s API to your system in minutes!","ar":"دمج سهل وسريع!"},"buttonText":{"en":"Get Started","ar":"ابدأ الآن"},"buttonLink":"/developers","image":"https://www.tap.company/websiteImages/pages/api/icons/api-documentation.png"},"link":"/api","features":[{"icon":"https://www.tap.company/websiteImages/pages/api/icons/build-icon.png","title":{"ar":"إنشاء","en":"Build"},"paragraph":{"ar":"ابدأ بإنشاء الموقع أو التطبيق الخاص بمشروعك.","en":"Maximize the value of Tap for your business, construct a payment framework that fits your unique needs."}},{"icon":"https://www.tap.company/websiteImages/pages/api/icons/connect-icon.png","title":{"ar":"دمج","en":"Connect"},"paragraph":{"ar":"قم بالربط مع تاپ وانضم لأكثر من 1000 مشروع نشط يومياً.","en":"Making it easy to connect businesses with customers, use our API functionality to reach out in your own way."}},{"icon":"https://www.tap.company/websiteImages/pages/api/icons/delight-icon.png","title":{"ar":"تجربة ممتعة","en":"Delight"},"paragraph":{"ar":"وفّر تجربة رائعة لعملائك من خلال بوابة تاپ للدفع الإلكتروني.","en":"Use Tap’s full-featured API to create an experience that your customers will love and remember you by."}}],"statisticsTitle":{"ar":"لمحة عن API تاپ","en":"Access the full power of Tap"},"statistics":[{"icon":"https://www.tap.company/websiteImages/pages/api/icons/icon-integration.png","countTo":1001,"finalText":{"en":"1001+","ar":"1,001"},"description":{"ar":"عملية دمج","en":"World-class integrations"}},{"icon":"https://www.tap.company/websiteImages/pages/api/icons/icon-transaction.png","countTo":1000000000,"finalText":{"en":"1M+","ar":"أكثر من مليون"},"description":{"ar":"عمليّة تحويل","en":"Successful transactions"}},{"icon":"https://www.tap.company/websiteImages/pages/api/icons/icon-country.png","countTo":7,"finalText":{"en":"7","ar":"7"},"description":{"ar":"دول","en":"Available countries"}}],"title":{"ar":"ابدأ بالتطوير مع تاپ","en":"Feature rich"},"paragraph":{"ar":"كل ما تحتاجه لتقديم تجربة دفع إلكتروني رائعة.","en":"Everything you need to build the perfect payment experience: you name it, we’ve got it."},"apiFeatures":[{"icon":"https://www.tap.company/websiteImages/pages/api/icons/Payment-requests.png","title":{"ar":"طلب\nالدفع","en":"Track\nPayments"},"subtitle":{"ar":"وجه زبائنك لبوابة الدفع الإلكتروني الخاصة بتاپ","en":"Direct your payments seamlessly"},"description":{"ar":"يحتاج صاحب العمل لتوفير تفاصيل طلب الدفع، لتقوم تاپ بإرسال رابط الدفع.","en":"Got a custom sales process in mind? Tap’s got your back. All you have to do is submit your Payment Request parameter details to Tap for verification, and we’ll set you up with everything you need to direct your payment requests to the Tap gateway."},"link":"/developers","readMoreText":{"en":"Read more","ar":"اقرأ المزيد"}},{"icon":"https://www.tap.company/websiteImages/pages/api/icons/Track-payments.png","title":{"ar":"تتبّع\nالدفع","en":"Track\nPayments"},"subtitle":{"ar":"تتبع حالة مدفوعاتك أصبح أكثر سهولة!","en":"See your payment status in real-time"},"description":{"ar":"قم بتتبّع ومراقبة حالة طلب الدفع الذي أنشأته.","en":"Looking for more control over your payment cycle? Our Create a Payment API allows you to include a tracking feature to help you see your payment status changes as they happen."},"link":"/developers","readMoreText":{"en":"Read more","ar":"اقرأ المزيد"}},{"icon":"https://www.tap.company/websiteImages/pages/api/icons/Refund.png","title":{"ar":"إرجاع\nالمدفوعات","en":"Painless\nRefund"},"subtitle":{"ar":"إرجاع القيمة المدفوعة إلى الزبون مرّة أخرى","en":"Super simple refund requests"},"description":{"ar":"إعادة المبلغ المدفوع إلى حساب العميل مرّة أخرى.","en":"Our API helps you make the refund process as easy and pain-free as possible through account-to-account refund requests. Just plug it in and watch the magic happen!"},"link":"/developers","readMoreText":{"en":"Read more","ar":"اقرأ المزيد"}}]},{"page":"developers","slot":"developers","color":"#959595","iframeSrc":"https://tappayments.api-docs.io/2.0"},{"page":"activate-payment","slot":"activate-payment"},{"page":"terms-conditions","slot":"terms-conditions","title":{"en":"Terms and Conditions","ar":"Terms and Conditions"},"content":[{"title":{"en":"Ownership of Site; Agreement to Terms of Use","ar":"Ownership of Site; Agreement to Terms of Use"},"paragraph":{"en":"These Terms and Conditions of Use (the “Terms of Use”) apply to the Tap web site located at www.gotapnow.com, and all associated sites linked to www.gotapnow.com by Tap, its subsidiaries and affiliates. The Site is the property of Tap Payments (“Tap”) and its licensors. BY USING THE SITE, YOU AGREE TO THESE TERMS OF USE; IF YOU DO NOT AGREE, DO NOT USE THE SITE.\nTap reserves the right, at its sole discretion, to change, modify, add or remove portions of these Terms of Use, at any time. It is your responsibility to check these Terms of Use periodically for changes. Your continued use of the Site following the posting of changes will mean that you accept and agree to the changes. As long as you comply with these Terms of Use, Tap grants you a personal, non-exclusive, non-transferable, limited privilege to enter and use the Site.","ar":"These Terms and Conditions of Use (the “Terms of Use”) apply to the Tap web site located at www.gotapnow.com, and all associated sites linked to www.gotapnow.com by Tap, its subsidiaries and affiliates. The Site is the property of Tap Payments (“Tap”) and its licensors. BY USING THE SITE, YOU AGREE TO THESE TERMS OF USE; IF YOU DO NOT AGREE, DO NOT USE THE SITE.\nTap reserves the right, at its sole discretion, to change, modify, add or remove portions of these Terms of Use, at any time. It is your responsibility to check these Terms of Use periodically for changes. Your continued use of the Site following the posting of changes will mean that you accept and agree to the changes. As long as you comply with these Terms of Use, Tap grants you a personal, non-exclusive, non-transferable, limited privilege to enter and use the Site."}},{"title":{"en":"Content","ar":"Content"},"paragraph":{"en":"All text, graphics, user interfaces, visual interfaces, photographs, trademarks, logos, sounds, music, artwork and computer code (collectively, 'Content'), including but not limited to the design, structure, selection, coordination, expression, 'look and feel' and arrangement of such Content, contained on the Site is owned, controlled or licensed by or to Apple, and is protected by trade dress, copyright, patent and trademark laws, and various other intellectual property rights and unfair competition laws.\nExcept as expressly provided in these Terms of Use, no part of the Site and no Content may be copied, reproduced, republished, uploaded, posted, publicly displayed, encoded, translated, transmitted or distributed in any way (including 'mirroring') to any other computer, server, Web site or other medium for publication or distribution or for any commercial enterprise, without Tap's express prior written consent. You may use information on Tap services (such as data sheets, knowledge base articles, and similar materials) purposely made available by Tap for downloading from the Site, provided that you (1) not remove any proprietary notice language in all copies of such documents, (2) use such information only for your personal, non-commercial informational purpose and do not copy or post such information on any networked computer or broadcast it in any media, (3) make no modifications to any such information, and (4) not make any additional representations or warranties relating to such documents.","ar":"All text, graphics, user interfaces, visual interfaces, photographs, trademarks, logos, sounds, music, artwork and computer code (collectively, 'Content'), including but not limited to the design, structure, selection, coordination, expression, 'look and feel' and arrangement of such Content, contained on the Site is owned, controlled or licensed by or to Apple, and is protected by trade dress, copyright, patent and trademark laws, and various other intellectual property rights and unfair competition laws.\nExcept as expressly provided in these Terms of Use, no part of the Site and no Content may be copied, reproduced, republished, uploaded, posted, publicly displayed, encoded, translated, transmitted or distributed in any way (including 'mirroring') to any other computer, server, Web site or other medium for publication or distribution or for any commercial enterprise, without Tap's express prior written consent. You may use information on Tap services (such as data sheets, knowledge base articles, and similar materials) purposely made available by Tap for downloading from the Site, provided that you (1) not remove any proprietary notice language in all copies of such documents, (2) use such information only for your personal, non-commercial informational purpose and do not copy or post such information on any networked computer or broadcast it in any media, (3) make no modifications to any such information, and (4) not make any additional representations or warranties relating to such documents."}},{"title":{"en":"Your Use of the Site","ar":"Your Use of the Site"},"paragraph":{"en":"You may not use any “deep-link”, “page-scrape”, “robot”, “spider” or other automatic device, program, algorithm or methodology, or any similar or equivalent manual process, to access, acquire, copy or monitor any portion of the Site or any Content, or in any way reproduce or circumvent the navigational structure or presentation of the Site or any Content, to obtain or attempt to obtain any materials, documents or information through any means not purposely made available through the Site. Tap reserves the right to bar any such activity.\nYou may not attempt to gain unauthorized access to any portion or feature of the Site, or any other systems or networks connected to the Site or to any Tap server, or to any of the services offered on or through the Site, by hacking, password “mining” or any other illegitimate means.\nYou may not probe, scan or test the vulnerability of the Site or any network connected to the Site, nor breach the security or authentication measures on the Site or any network connected to the Site. You may not reverse look-up, trace or seek to trace any information on any other user of or visitor to the Site, or any other customer of Tap, including any Tap account not owned by you, to its source, or exploit the Site or any service or information made available or offered by or through the Site, in any way where the purpose is to reveal any information, including but not limited to personal identification or information, other than your own information, as provided for by the Site. You agree that you will not take any action that imposes an unreasonable or disproportionately large load on the infrastructure of the Site or Tap’s systems or networks, or any systems or networks connected to the Site or to Tap.\nYou agree not to use any device, software or routine to interfere or attempt to interfere with the proper working of the Site or any transaction being conducted on the Site, or with any other person’s use of the Site. You may not forge headers or otherwise manipulate identifiers in order to disguise the origin of any message or transmittal you send to Apple on or through the Site or any service offered on or through the Site. You may not pretend that you are, or that you represent, someone else, or impersonate any other individual or entity.\nYou may not use the Site or any Content for any purpose that is unlawful or prohibited by these Terms of Use, or to solicit the performance of any illegal activity or other activity which infringes the rights of Tap or others.","ar":"You may not use any “deep-link”, “page-scrape”, “robot”, “spider” or other automatic device, program, algorithm or methodology, or any similar or equivalent manual process, to access, acquire, copy or monitor any portion of the Site or any Content, or in any way reproduce or circumvent the navigational structure or presentation of the Site or any Content, to obtain or attempt to obtain any materials, documents or information through any means not purposely made available through the Site. Tap reserves the right to bar any such activity.\nYou may not attempt to gain unauthorized access to any portion or feature of the Site, or any other systems or networks connected to the Site or to any Tap server, or to any of the services offered on or through the Site, by hacking, password “mining” or any other illegitimate means.\nYou may not probe, scan or test the vulnerability of the Site or any network connected to the Site, nor breach the security or authentication measures on the Site or any network connected to the Site. You may not reverse look-up, trace or seek to trace any information on any other user of or visitor to the Site, or any other customer of Tap, including any Tap account not owned by you, to its source, or exploit the Site or any service or information made available or offered by or through the Site, in any way where the purpose is to reveal any information, including but not limited to personal identification or information, other than your own information, as provided for by the Site. You agree that you will not take any action that imposes an unreasonable or disproportionately large load on the infrastructure of the Site or Tap’s systems or networks, or any systems or networks connected to the Site or to Tap.\nYou agree not to use any device, software or routine to interfere or attempt to interfere with the proper working of the Site or any transaction being conducted on the Site, or with any other person’s use of the Site. You may not forge headers or otherwise manipulate identifiers in order to disguise the origin of any message or transmittal you send to Apple on or through the Site or any service offered on or through the Site. You may not pretend that you are, or that you represent, someone else, or impersonate any other individual or entity.\nYou may not use the Site or any Content for any purpose that is unlawful or prohibited by these Terms of Use, or to solicit the performance of any illegal activity or other activity which infringes the rights of Tap or others."}},{"title":{"en":"Purchases; Other Terms and Conditions","ar":"Purchases; Other Terms and Conditions"},"paragraph":{"en":"Additional terms and conditions may apply to purchases of services and to specific portions or features of the Site, including contests, promotions or other similar features, all of which terms are made a part of these Terms of Use by this reference. You agree to abide by such other terms and conditions, including where applicable representing that you are of sufficient legal age to use or participate in such service or feature. If there is a conflict between these Terms of Use and the terms posted for or applicable to a specific portion of the Site or for any service offered on or through the Site, the latter terms shall control with respect to your use of that portion of the Site or the specific service.\nTap’s obligations, if any, with regard to its products and services are governed solely by the agreements pursuant to which they are provided, and nothing on this Site should be construed to alter such agreements. Tap may make changes to any products or services offered on the Site, or to the applicable prices for any such products or services, at any time, without notice. The materials on the Site with respect to products and services may be out of date, and Tap makes no commitment to update the materials on the Site with respect to such products and services.","ar":"Additional terms and conditions may apply to purchases of services and to specific portions or features of the Site, including contests, promotions or other similar features, all of which terms are made a part of these Terms of Use by this reference. You agree to abide by such other terms and conditions, including where applicable representing that you are of sufficient legal age to use or participate in such service or feature. If there is a conflict between these Terms of Use and the terms posted for or applicable to a specific portion of the Site or for any service offered on or through the Site, the latter terms shall control with respect to your use of that portion of the Site or the specific service.\nTap’s obligations, if any, with regard to its products and services are governed solely by the agreements pursuant to which they are provided, and nothing on this Site should be construed to alter such agreements. Tap may make changes to any products or services offered on the Site, or to the applicable prices for any such products or services, at any time, without notice. The materials on the Site with respect to products and services may be out of date, and Tap makes no commitment to update the materials on the Site with respect to such products and services."}},{"title":{"en":"Purchases; Other Terms and Conditions","ar":"Purchases; Other Terms and Conditions"},"paragraph":{"en":"Additional terms and conditions may apply to purchases of services and to specific portions or features of the Site, including contests, promotions or other similar features, all of which terms are made a part of these Terms of Use by this reference. You agree to abide by such other terms and conditions, including where applicable representing that you are of sufficient legal age to use or participate in such service or feature. If there is a conflict between these Terms of Use and the terms posted for or applicable to a specific portion of the Site or for any service offered on or through the Site, the latter terms shall control with respect to your use of that portion of the Site or the specific service.\nTap’s obligations, if any, with regard to its products and services are governed solely by the agreements pursuant to which they are provided, and nothing on this Site should be construed to alter such agreements. Tap may make changes to any products or services offered on the Site, or to the applicable prices for any such products or services, at any time, without notice. The materials on the Site with respect to products and services may be out of date, and Tap makes no commitment to update the materials on the Site with respect to such products and services.","ar":"Additional terms and conditions may apply to purchases of services and to specific portions or features of the Site, including contests, promotions or other similar features, all of which terms are made a part of these Terms of Use by this reference. You agree to abide by such other terms and conditions, including where applicable representing that you are of sufficient legal age to use or participate in such service or feature. If there is a conflict between these Terms of Use and the terms posted for or applicable to a specific portion of the Site or for any service offered on or through the Site, the latter terms shall control with respect to your use of that portion of the Site or the specific service.\nTap’s obligations, if any, with regard to its products and services are governed solely by the agreements pursuant to which they are provided, and nothing on this Site should be construed to alter such agreements. Tap may make changes to any products or services offered on the Site, or to the applicable prices for any such products or services, at any time, without notice. The materials on the Site with respect to products and services may be out of date, and Tap makes no commitment to update the materials on the Site with respect to such products and services."}},{"title":{"en":"Accounts, Passwords and Security","ar":"Accounts, Passwords and Security"},"paragraph":{"en":"Certain features or services offered on or through the Site may require you to open an account. You are entirely responsible for maintaining the confidentiality of the information you hold for your account, including your password, and for any and all activity that occurs under your account as a result of your failing to keep this information secure and confidential. You agree to notify Tap immediately of any unauthorized use of your account or password, or any other breach of security. You may be held liable for losses incurred by Tap or any other user of or visitor to the Site due to someone else using your, password or account as a result of your failing to keep your account information secure and confidential.","ar":"Certain features or services offered on or through the Site may require you to open an account. You are entirely responsible for maintaining the confidentiality of the information you hold for your account, including your password, and for any and all activity that occurs under your account as a result of your failing to keep this information secure and confidential. You agree to notify Tap immediately of any unauthorized use of your account or password, or any other breach of security. You may be held liable for losses incurred by Tap or any other user of or visitor to the Site due to someone else using your, password or account as a result of your failing to keep your account information secure and confidential."}},{"title":{"en":"Privacy","ar":"Privacy"},"paragraph":{"en":"Tap’s Privacy Policy applies to use of this Site, and its terms are made a part of these Terms of Use by this reference. To view Tap’s Privacy Policy, click here. Additionally, by using the Site, you acknowledge and agree that Internet transmissions are never completely private or secure. You understand that any message or information you send to the Site may be read or intercepted by others, even if there is a special notice that a particular transmission (for example, credit card information) is encrypted.","ar":"Tap’s Privacy Policy applies to use of this Site, and its terms are made a part of these Terms of Use by this reference. To view Tap’s Privacy Policy, click here. Additionally, by using the Site, you acknowledge and agree that Internet transmissions are never completely private or secure. You understand that any message or information you send to the Site may be read or intercepted by others, even if there is a special notice that a particular transmission (for example, credit card information) is encrypted."}},{"title":{"en":"Links to Other Sites and to the Apple Site","ar":"Links to Other Sites and to the Apple Site"},"paragraph":{"en":"This Site may contain links to other independent third-party Web sites (“Linked Sites”). These Linked Sites are provided solely as a convenience to our visitors. Such Linked Sites are not under Tap’s control, and Tap is not responsible for and does not endorse the content of such Linked Sites, including any information or materials contained on such Linked Sites. You will need to make your own independent judgment regarding your interaction with these Linked Sites.","ar":"This Site may contain links to other independent third-party Web sites (“Linked Sites”). These Linked Sites are provided solely as a convenience to our visitors. Such Linked Sites are not under Tap’s control, and Tap is not responsible for and does not endorse the content of such Linked Sites, including any information or materials contained on such Linked Sites. You will need to make your own independent judgment regarding your interaction with these Linked Sites."}},{"title":{"en":"Disclaimers","ar":"Disclaimers"},"paragraph":{"en":"TAP DOES NOT PROMISE THAT THE SITE OR ANY CONTENT, SERVICE OR FEATURE OF THE SITE WILL BE ERROR-FREE OR UNINTERRUPTED, OR THAT ANY DEFECTS WILL BE CORRECTED, OR THAT YOUR USE OF THE SITE WILL PROVIDE SPECIFIC RESULTS. THE SITE AND ITS CONTENT ARE DELIVERED ON AN “AS-IS” AND “AS-AVAILABLE” BASIS. ALL INFORMATION PROVIDED ON THE SITE IS SUBJECT TO CHANGE WITHOUT NOTICE. TAP CANNOT ENSURE THAT ANY FILES OR OTHER DATA YOU DOWNLOAD FROM THE SITE WILL BE FREE OF VIRUSES OR CONTAMINATION OR DESTRUCTIVE FEATURES. TAP DISCLAIMS ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING ANY WARRANTIES OF ACCURACY, NON-INFRINGEMENT, MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE. TAP DISCLAIMS ANY AND ALL LIABILITY FOR THE ACTS, OMISSIONS AND CONDUCT OF ANY THIRD PARTIES IN CONNECTION WITH OR RELATED TO YOUR USE OF THE SITE AND/OR ANY TAP SERVICES. YOU ASSUME TOTAL RESPONSIBILITY FOR YOUR USE OF THE SITE AND ANY LINKED SITES. YOUR SOLE REMEDY AGAINST TAP FOR DISSATISFACTION WITH THE SITE OR ANY CONTENT IS TO STOP USING THE SITE OR ANY SUCH CONTENT. THIS LIMITATION OF RELIEF IS A PART OF THE BARGAIN BETWEEN THE PARTIES.\nThe above disclaimer applies to any damages, liability or injuries caused by any failure of performance, error, omission, interruption, deletion, defect, delay in operation or transmission, computer virus, communication line failure, theft or destruction of or unauthorized access to, alteration of, or use, whether for breach of contract, tort, negligence or any other cause of action. Tap reserves the right to do any of the following, at any time, without notice: (1) to modify, suspend or terminate operation of or access to the Site, or any portion of the Site, for any reason; (2) to modify or change the Site, or any portion of the Site, and any applicable policies or terms; and (3) to interrupt the operation of the Site, or any portion of the Site, as necessary to perform routine or non-routine maintenance, error correction, or other changes.","ar":"TAP DOES NOT PROMISE THAT THE SITE OR ANY CONTENT, SERVICE OR FEATURE OF THE SITE WILL BE ERROR-FREE OR UNINTERRUPTED, OR THAT ANY DEFECTS WILL BE CORRECTED, OR THAT YOUR USE OF THE SITE WILL PROVIDE SPECIFIC RESULTS. THE SITE AND ITS CONTENT ARE DELIVERED ON AN “AS-IS” AND “AS-AVAILABLE” BASIS. ALL INFORMATION PROVIDED ON THE SITE IS SUBJECT TO CHANGE WITHOUT NOTICE. TAP CANNOT ENSURE THAT ANY FILES OR OTHER DATA YOU DOWNLOAD FROM THE SITE WILL BE FREE OF VIRUSES OR CONTAMINATION OR DESTRUCTIVE FEATURES. TAP DISCLAIMS ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING ANY WARRANTIES OF ACCURACY, NON-INFRINGEMENT, MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE. TAP DISCLAIMS ANY AND ALL LIABILITY FOR THE ACTS, OMISSIONS AND CONDUCT OF ANY THIRD PARTIES IN CONNECTION WITH OR RELATED TO YOUR USE OF THE SITE AND/OR ANY TAP SERVICES. YOU ASSUME TOTAL RESPONSIBILITY FOR YOUR USE OF THE SITE AND ANY LINKED SITES. YOUR SOLE REMEDY AGAINST TAP FOR DISSATISFACTION WITH THE SITE OR ANY CONTENT IS TO STOP USING THE SITE OR ANY SUCH CONTENT. THIS LIMITATION OF RELIEF IS A PART OF THE BARGAIN BETWEEN THE PARTIES.\nThe above disclaimer applies to any damages, liability or injuries caused by any failure of performance, error, omission, interruption, deletion, defect, delay in operation or transmission, computer virus, communication line failure, theft or destruction of or unauthorized access to, alteration of, or use, whether for breach of contract, tort, negligence or any other cause of action. Tap reserves the right to do any of the following, at any time, without notice: (1) to modify, suspend or terminate operation of or access to the Site, or any portion of the Site, for any reason; (2) to modify or change the Site, or any portion of the Site, and any applicable policies or terms; and (3) to interrupt the operation of the Site, or any portion of the Site, as necessary to perform routine or non-routine maintenance, error correction, or other changes."}},{"title":{"en":"Limitation of Liability","ar":"Limitation of Liability"},"type":"warning","paragraph":{"en":"Except where prohibited by law, in no event will Tap be liable to you for any indirect, consequential, exemplary, incidental or punitive damages, including lost profits, even if Apple has been advised of the possibility of such damages.\nIf, notwithstanding the other provisions of these Terms of Use, Tap is found to be liable to you for any damage or loss which arises out of or is in any way connected with your use of the Site or any Content, Tap’s liability shall in no event exceed the greater of (1) the total of any subscription or similar fees with respect to any service or feature of or on the Site paid in the six months prior to the date of the initial claim made against Tap (but not including the purchase price for any Tap hardware or software products or any AppleCare or similar support program), or (2) US$100.00. Some jurisdictions do not allow limitations of liability, so the foregoing limitation may not apply to you.","ar":"Except where prohibited by law, in no event will Tap be liable to you for any indirect, consequential, exemplary, incidental or punitive damages, including lost profits, even if Apple has been advised of the possibility of such damages.\nIf, notwithstanding the other provisions of these Terms of Use, Tap is found to be liable to you for any damage or loss which arises out of or is in any way connected with your use of the Site or any Content, Tap’s liability shall in no event exceed the greater of (1) the total of any subscription or similar fees with respect to any service or feature of or on the Site paid in the six months prior to the date of the initial claim made against Tap (but not including the purchase price for any Tap hardware or software products or any AppleCare or similar support program), or (2) US$100.00. Some jurisdictions do not allow limitations of liability, so the foregoing limitation may not apply to you."}},{"title":{"en":"Indemnity","ar":"Indemnity"},"type":"warning","paragraph":{"en":"You agree to indemnify and hold Tap, its officers, directors, shareholders, predecessors, successors in interest, employees, agents, subsidiaries and affiliates, harmless from any demands, loss, liability, claims or expenses (including attorneys’ fees), made against Tap by any third party due to or arising out of or in connection with your use of the Site.","ar":"You agree to indemnify and hold Tap, its officers, directors, shareholders, predecessors, successors in interest, employees, agents, subsidiaries and affiliates, harmless from any demands, loss, liability, claims or expenses (including attorneys’ fees), made against Tap by any third party due to or arising out of or in connection with your use of the Site."}},{"title":{"en":"Violation of These Terms of Use","ar":"Violation of These Terms of Use"},"paragraph":{"en":"Tap may disclose any information we have about you (including your identity) if we determine that such disclosure is necessary in connection with any investigation or complaint regarding your use of the Site, or to identify, contact or bring legal action against someone who may be causing injury to or interference with (either intentionally or unintentionally) Tap’s rights or property, or the rights or property of visitors to or users of the Site, including Tap’s customers. Tap reserves the right at all times to disclose any information that Tap deems necessary to comply with any applicable law, regulation, legal process or governmental request. Tap also may disclose your information when Tap determines that applicable law requires or permits such disclosure, including exchanging information with other companies and organizations for fraud protection purposes.\nYou acknowledge and agree that Tap may preserve any transmittal or communication by you with Apple through the Site or any service offered on or through the Site, and may also disclose such data if required to do so by law or Tap determines that such preservation or disclosure is reasonably necessary to (1) comply with legal process, (2) enforce these Terms of Use, (3) respond to claims that any such data violates the rights of others, or (4) protect the rights, property or personal safety of Tap, its employees, users of or visitors to the Site, and the public.\nYou agree that Tap may, in its sole discretion and without prior notice, terminate your access to the Site and/or block your future access to the Site if we determine that you have violated these Terms of Use or other agreements or guidelines which may be associated with your use of the Site. You also agree that any violation by you of these Terms of Use will constitute an unlawful and unfair business practice, and will cause irreparable harm to Tap, for which monetary damages would be inadequate, and you consent to Tap obtaining any injunctive or equitable relief that Apple deems necessary or appropriate in such circumstances. These remedies are in addition to any other remedies Tap may have at law or in equity.\nYou agree that Tap may, in its sole discretion and without prior notice, terminate your access to the Site, for cause, which includes (but is not limited to) (1) requests by law enforcement or other government agencies, (2) a request by you (self-initiated account deletions), (3) discontinuance or material modification of the Site or any service offered on or through the Site, or (4) unexpected technical issues or problems.\nIf Tap does take any legal action against you as a result of your violation of these Terms of Use, Tap will be entitled to recover from you, and you agree to pay, all reasonable attorneys’ fees and costs of such action, in addition to any other relief granted to Tap. You agree that Tap will not be liable to you or to any third party for termination of your access to the Site as a result of any violation of these Terms of Use.","ar":"Tap may disclose any information we have about you (including your identity) if we determine that such disclosure is necessary in connection with any investigation or complaint regarding your use of the Site, or to identify, contact or bring legal action against someone who may be causing injury to or interference with (either intentionally or unintentionally) Tap’s rights or property, or the rights or property of visitors to or users of the Site, including Tap’s customers. Tap reserves the right at all times to disclose any information that Tap deems necessary to comply with any applicable law, regulation, legal process or governmental request. Tap also may disclose your information when Tap determines that applicable law requires or permits such disclosure, including exchanging information with other companies and organizations for fraud protection purposes.\nYou acknowledge and agree that Tap may preserve any transmittal or communication by you with Apple through the Site or any service offered on or through the Site, and may also disclose such data if required to do so by law or Tap determines that such preservation or disclosure is reasonably necessary to (1) comply with legal process, (2) enforce these Terms of Use, (3) respond to claims that any such data violates the rights of others, or (4) protect the rights, property or personal safety of Tap, its employees, users of or visitors to the Site, and the public.\nYou agree that Tap may, in its sole discretion and without prior notice, terminate your access to the Site and/or block your future access to the Site if we determine that you have violated these Terms of Use or other agreements or guidelines which may be associated with your use of the Site. You also agree that any violation by you of these Terms of Use will constitute an unlawful and unfair business practice, and will cause irreparable harm to Tap, for which monetary damages would be inadequate, and you consent to Tap obtaining any injunctive or equitable relief that Apple deems necessary or appropriate in such circumstances. These remedies are in addition to any other remedies Tap may have at law or in equity.\nYou agree that Tap may, in its sole discretion and without prior notice, terminate your access to the Site, for cause, which includes (but is not limited to) (1) requests by law enforcement or other government agencies, (2) a request by you (self-initiated account deletions), (3) discontinuance or material modification of the Site or any service offered on or through the Site, or (4) unexpected technical issues or problems.\nIf Tap does take any legal action against you as a result of your violation of these Terms of Use, Tap will be entitled to recover from you, and you agree to pay, all reasonable attorneys’ fees and costs of such action, in addition to any other relief granted to Tap. You agree that Tap will not be liable to you or to any third party for termination of your access to the Site as a result of any violation of these Terms of Use."}},{"title":{"en":"Governing Law; Dispute Resolution","ar":"Governing Law; Dispute Resolution"},"type":"warning","paragraph":{"en":"You agree that all matters relating to your access to or use of the Site, including all disputes, will be governed by the laws of Kuwait. You agree to the personal jurisdiction by and venue in the state and federal courts in Santa Clara County, California, and waive any objection to such jurisdiction or venue. The preceding provision regarding venue does not apply if you are a consumer based in the European Union. If you are a consumer based in the European Union, you may make a claim in the courts of the country where you reside. Any claim under these Terms of Use must be brought within one (1) year after the cause of action arises, or such claim or cause of action is barred. Claims made under the separate terms and conditions of purchase for goods and services are not subject to this limitation. No recovery may be sought or received for damages other than out-of-pocket expenses, except that the prevailing party will be entitled to costs and attorneys’ fees. In the event of any controversy or dispute between Apple and you arising out of or in connection with your use of the Site, the parties shall attempt, promptly and in good faith, to resolve any such dispute. If we are unable to resolve any such dispute within a reasonable time (not to exceed thirty (30) days), then either party may submit such controversy or dispute to mediation. If the dispute cannot be resolved through mediation, then the parties shall be free to pursue any right or remedy available to them under applicable law.","ar":"You agree that all matters relating to your access to or use of the Site, including all disputes, will be governed by the laws of Kuwait. You agree to the personal jurisdiction by and venue in the state and federal courts in Santa Clara County, California, and waive any objection to such jurisdiction or venue. The preceding provision regarding venue does not apply if you are a consumer based in the European Union. If you are a consumer based in the European Union, you may make a claim in the courts of the country where you reside. Any claim under these Terms of Use must be brought within one (1) year after the cause of action arises, or such claim or cause of action is barred. Claims made under the separate terms and conditions of purchase for goods and services are not subject to this limitation. No recovery may be sought or received for damages other than out-of-pocket expenses, except that the prevailing party will be entitled to costs and attorneys’ fees. In the event of any controversy or dispute between Apple and you arising out of or in connection with your use of the Site, the parties shall attempt, promptly and in good faith, to resolve any such dispute. If we are unable to resolve any such dispute within a reasonable time (not to exceed thirty (30) days), then either party may submit such controversy or dispute to mediation. If the dispute cannot be resolved through mediation, then the parties shall be free to pursue any right or remedy available to them under applicable law."}},{"title":{"en":"Void Where Prohibited","ar":"Void Where Prohibited"},"paragraph":{"en":"Tap administers and operates the www.gotapnow.com Site from its location in Kuwait. Although the Site is accessible worldwide, not all features, products or services discussed, referenced, provided or offered through or on the Site are available to all persons or in all geographic locations, or appropriate or available for use outside Kuwait. Tap reserves the right to limit, in its sole discretion, the provision and quantity of any feature, product or service to any person or geographic area. Any offer for any feature, product or service made on the Site is void where prohibited. If you choose to access the Site from outside Middle East, you do so on your own initiative and you are solely responsible for complying with applicable local laws.","ar":"Tap administers and operates the www.gotapnow.com Site from its location in Kuwait. Although the Site is accessible worldwide, not all features, products or services discussed, referenced, provided or offered through or on the Site are available to all persons or in all geographic locations, or appropriate or available for use outside Kuwait. Tap reserves the right to limit, in its sole discretion, the provision and quantity of any feature, product or service to any person or geographic area. Any offer for any feature, product or service made on the Site is void where prohibited. If you choose to access the Site from outside Middle East, you do so on your own initiative and you are solely responsible for complying with applicable local laws."}},{"title":{"en":"Miscellaneous","ar":"Miscellaneous"},"paragraph":{"en":"You may not use or export or re-export any Content or any copy or adaptation of such Content, or any product or service offered on the Site, in violation of any applicable laws or regulations, including without limitation Kuwait export laws and regulations.\nIf any of the provisions of these Terms of Use are held by a court or other tribunal of competent jurisdiction to be void or unenforceable, such provisions shall be limited or eliminated to the minimum extent necessary and replaced with a valid provision that best embodies the intent of these Terms of Use, so that these Terms of Use shall remain in full force and effect. These Terms of Use constitute the entire agreement between you and Tap with regard to your use of the Site, and any and all other written or oral agreements or understandings previously existing between you and Tap with respect to such use are hereby superseded and cancelled. Other than as provided in a purchase agreement you enter into with Tap, Tap will not accept any counter-offers to these Terms of Use, and all such offers are hereby categorically rejected. Tap’s failure to insist on or enforce strict performance of these Terms of Use shall not be construed as a waiver by Tap of any provision or any right it has to enforce these Terms of Use, nor shall any course of conduct between Tap and you or any other party be deemed to modify any provision of these Terms of Use. These Terms of Use shall not be interpreted or construed to confer any rights or remedies on any third parties.\nTap provides access to Tap international data and, therefore, may contain references or cross references to Tap products, programs and services that are not announced in your country. Such reference does not imply that Tap in your country intends to announce such products, programs or services.","ar":"You may not use or export or re-export any Content or any copy or adaptation of such Content, or any product or service offered on the Site, in violation of any applicable laws or regulations, including without limitation Kuwait export laws and regulations.\nIf any of the provisions of these Terms of Use are held by a court or other tribunal of competent jurisdiction to be void or unenforceable, such provisions shall be limited or eliminated to the minimum extent necessary and replaced with a valid provision that best embodies the intent of these Terms of Use, so that these Terms of Use shall remain in full force and effect. These Terms of Use constitute the entire agreement between you and Tap with regard to your use of the Site, and any and all other written or oral agreements or understandings previously existing between you and Tap with respect to such use are hereby superseded and cancelled. Other than as provided in a purchase agreement you enter into with Tap, Tap will not accept any counter-offers to these Terms of Use, and all such offers are hereby categorically rejected. Tap’s failure to insist on or enforce strict performance of these Terms of Use shall not be construed as a waiver by Tap of any provision or any right it has to enforce these Terms of Use, nor shall any course of conduct between Tap and you or any other party be deemed to modify any provision of these Terms of Use. These Terms of Use shall not be interpreted or construed to confer any rights or remedies on any third parties.\nTap provides access to Tap international data and, therefore, may contain references or cross references to Tap products, programs and services that are not announced in your country. Such reference does not imply that Tap in your country intends to announce such products, programs or services."}},{"title":{"en":"Feedback and Information","ar":"Feedback and Information"},"paragraph":{"en":"Any feedback you provide at this site shall be deemed to be non-confidential. Tap shall be free to use such information on an unrestricted basis.\nThe information contained in this web site is subject to change without notice.\u2028 Tap Payments. TM and copyright © 2016. All rights reserved.","ar":"Any feedback you provide at this site shall be deemed to be non-confidential. Tap shall be free to use such information on an unrestricted basis.\nThe information contained in this web site is subject to change without notice.\u2028 Tap Payments. TM and copyright © 2016. All rights reserved."}}]},{"page":"activate-payment","slot":"activate-payment"},{"page":"privacy-policy","slot":"privacy-policy","title":{"en":"Privacy Policy","ar":"Privacy Policy"},"content":[{"title":{"en":"Collection and Use of Personal Information","ar":"Collection and Use of Personal Information"},"paragraph":{"en":"Personal information is data that can be used to identify or contact a single person.\nYou may be asked to provide your personal information anytime you are in contact with Tap or a Tap affiliated company. Tap and its affiliates may share this personal information with each other and use it consistent with this Privacy Policy. They may also combine it with other information to provide and improve our products, services, content, and advertising. You are not required to provide the personal information that we have requested, but, if you chose not to do so, in many cases we will not be able to provide you with our products or services or respond to any queries you may have. Here are some examples of the types of personal information Tap may collect and how we may use it:","ar":"Personal information is data that can be used to identify or contact a single person.\nYou may be asked to provide your personal information anytime you are in contact with Tap or a Tap affiliated company. Tap and its affiliates may share this personal information with each other and use it consistent with this Privacy Policy. They may also combine it with other information to provide and improve our products, services, content, and advertising. You are not required to provide the personal information that we have requested, but, if you chose not to do so, in many cases we will not be able to provide you with our products or services or respond to any queries you may have. Here are some examples of the types of personal information Tap may collect and how we may use it:"}},{"title":{"en":"What personal information we collect","ar":"What personal information we collect"},"paragraph":{"en":"When you create a Tap business account, download our mobile application or contact us, we may collect a variety of information, including your name, mailing address, phone number, email address, bank account information, company information, civil ID, contact preferences, and credit card information.","ar":"When you create a Tap business account, download our mobile application or contact us, we may collect a variety of information, including your name, mailing address, phone number, email address, bank account information, company information, civil ID, contact preferences, and credit card information."}},{"title":{"en":"How we use your personal information","ar":"How we use your personal information"},"points":[{"paragraph":{"en":"The personal information we collect allows us to keep you posted on Tap’s latest service announcements, updates, and upcoming events. If you don’t want to be on our mailing list, you can opt out anytime by updating your preferences.","ar":"The personal information we collect allows us to keep you posted on Tap’s latest service announcements, updates, and upcoming events. If you don’t want to be on our mailing list, you can opt out anytime by updating your preferences."}},{"paragraph":{"en":"We also use personal information to help us create, develop, operate, deliver, and improve our products, services, content and advertising, and for loss prevention and anti-fraud purposes."}},{"paragraph":{"en":"We may also use personal information for internal purposes such as auditing, data analysis, and research to improve Tap’s products, services, and customer communications.","ar":"We may also use personal information for internal purposes such as auditing, data analysis, and research to improve Tap’s products, services, and customer communications."}},{"paragraph":{"en":"If you enter into a sweepstake, contest, or similar promotion we may use the information you provide to administer those programs.","ar":"If you enter into a sweepstake, contest, or similar promotion we may use the information you provide to administer those programs."}}]},{"title":{"en":"Collection and Use of Non-Personal Information","ar":"Collection and Use of Non-Personal Information"},"paragraph":{"en":"We also collect data in a form that does not, on its own, permit direct association with any specific individual. We may collect, use, transfer, and disclose non-personal information for any purpose. The following are some examples of non-personal information that we collect and how we may use it:","ar":"We also collect data in a form that does not, on its own, permit direct association with any specific individual. We may collect, use, transfer, and disclose non-personal information for any purpose. The following are some examples of non-personal information that we collect and how we may use it:"},"points":[{"type":"warning","paragraph":{"en":"We may collect information such as occupation, language, zip code, area code, unique device identifier, referrer URL, location, and the time zone where a Tap service is used so that we can better understand customer behavior and improve our products, services, and advertising.","ar":"We may collect information such as occupation, language, zip code, area code, unique device identifier, referrer URL, location, and the time zone where a Tap service is used so that we can better understand customer behavior and improve our products, services, and advertising."}},{"paragraph":{"en":"We may collect information regarding customer activities on our website, online platform and from our application. This information is aggregated and used to help us provide more useful information to our customers and to understand which parts of our website, products, and services are of most interest. Aggregated data is considered non‑personal information for the purposes of this Privacy Policy."}},{"paragraph":{"en":"We may collect and store details of how you use our services, including search queries. This information may be used to improve the relevancy of results provided by our services. Except in limited instances to ensure quality of our services over the Internet, such information will not be associated with your IP address.","ar":"We may collect and store details of how you use our services, including search queries. This information may be used to improve the relevancy of results provided by our services. Except in limited instances to ensure quality of our services over the Internet, such information will not be associated with your IP address."}},{"paragraph":{"en":"If we do combine non-personal information with personal information the combined information will be treated as personal information for as long as it remains combined.","ar":"If we do combine non-personal information with personal information the combined information will be treated as personal information for as long as it remains combined."}}]},{"title":{"en":"Cookies and Other Technologies","ar":"Cookies and Other Technologies"},"paragraph":{"en":"Tap’s website, online services, interactive applications, email messages, and advertisements may use “cookies” and other technologies such as pixel tags and web beacons. These technologies help us better understand user behavior, tell us which parts of our websites people have visited, and facilitate and measure the effectiveness of advertisements and web searches. We treat information collected by cookies and other technologies as non‑personal information. However, to the extent that Internet Protocol (IP) addresses or similar identifiers are considered personal information by local law, we also treat these identifiers as personal information. Similarly, to the extent that non-personal information is combined with personal information, we treat the combined information as personal information for the purposes of this Privacy Policy.","ar":"Tap’s website, online services, interactive applications, email messages, and advertisements may use “cookies” and other technologies such as pixel tags and web beacons. These technologies help us better understand user behavior, tell us which parts of our websites people have visited, and facilitate and measure the effectiveness of advertisements and web searches. We treat information collected by cookies and other technologies as non‑personal information. However, to the extent that Internet Protocol (IP) addresses or similar identifiers are considered personal information by local law, we also treat these identifiers as personal information. Similarly, to the extent that non-personal information is combined with personal information, we treat the combined information as personal information for the purposes of this Privacy Policy."}},{"title":{"en":"Service Providers","ar":"Service Providers"},"paragraph":{"en":"Tap shares personal information with companies who provide services such as information processing, extending credit, fulfilling customer orders, delivering products to you, managing and enhancing customer data, providing customer service, assessing your interest in our products and services, and conducting customer research or satisfaction surveys. These companies are obligated to protect your information and may be located wherever Tap operates.","ar":"Tap shares personal information with companies who provide services such as information processing, extending credit, fulfilling customer orders, delivering products to you, managing and enhancing customer data, providing customer service, assessing your interest in our products and services, and conducting customer research or satisfaction surveys. These companies are obligated to protect your information and may be located wherever Tap operates."}},{"title":{"en":"Others","ar":"Others"},"paragraph":{"en":"It may be necessary − by law, legal process, litigation, and/or requests from public and governmental authorities within or outside your country of residence − for Tap to disclose your personal information. We may also disclose information about you if we determine that for purposes of national security, law enforcement, or other issues of public importance, disclosure is necessary or appropriate.\nWe may also disclose information about you if we determine that disclosure is reasonably necessary to enforce our terms and conditions or protect our operations or users.","ar":"It may be necessary − by law, legal process, litigation, and/or requests from public and governmental authorities within or outside your country of residence − for Tap to disclose your personal information. We may also disclose information about you if we determine that for purposes of national security, law enforcement, or other issues of public importance, disclosure is necessary or appropriate.\nWe may also disclose information about you if we determine that disclosure is reasonably necessary to enforce our terms and conditions or protect our operations or users."}},{"title":{"en":"Integrity and Retention of Personal Information","ar":"Integrity and Retention of Personal Information"},"paragraph":{"en":"Tap makes it easy for you to keep your personal information accurate, complete, and up to date. We will retain your personal information for the period necessary to fulfill the purposes outlined in this Privacy Policy unless a longer retention period is required or permitted by law.","ar":"Tap makes it easy for you to keep your personal information accurate, complete, and up to date. We will retain your personal information for the period necessary to fulfill the purposes outlined in this Privacy Policy unless a longer retention period is required or permitted by law."}},{"title":{"en":"Access to Personal Information","ar":"Access to Personal Information"},"paragraph":{"en":"You can help ensure that your contact information and preferences are accurate, complete, and up to date by logging in to your account at https://gotapnow.com/businessname. For other personal information we hold, we will provide you with access for any purpose including to request that we correct the data if it is inaccurate or delete the data if Tap is not required to retain it by law or for legitimate business purposes. We may decline to process requests that are frivolous/vexatious, jeopardize the privacy of others, are extremely impractical, or for which access is not otherwise required by local law.","ar":"You can help ensure that your contact information and preferences are accurate, complete, and up to date by logging in to your account at https://gotapnow.com/businessname. For other personal information we hold, we will provide you with access for any purpose including to request that we correct the data if it is inaccurate or delete the data if Tap is not required to retain it by law or for legitimate business purposes. We may decline to process requests that are frivolous/vexatious, jeopardize the privacy of others, are extremely impractical, or for which access is not otherwise required by local law."}},{"title":{"en":"Third-Party Sites and Services","ar":"Third-Party Sites and Services"},"paragraph":{"en":"Tap websites, applications, and services may contain links to third-party websites, products, and services. Our products and services may also use or offer products or services from third parties. Information collected by third parties, which may include such things as location data or contact details, is governed by their privacy practices. We encourage you to learn about the privacy practices of those third parties.","ar":"Tap websites, applications, and services may contain links to third-party websites, products, and services. Our products and services may also use or offer products or services from third parties. Information collected by third parties, which may include such things as location data or contact details, is governed by their privacy practices. We encourage you to learn about the privacy practices of those third parties."}},{"title":{"en":"Privacy Questions","ar":"Privacy Questions"},"paragraph":{"en":"If you have any questions or concerns about Tap’s Privacy Policy or data processing or if you would like to make a complaint about a possible breach of local privacy laws, please contact us at support@tap.com.kw. You can always contact us by phone at the relevant Tap Support number +965 98868811.\nAll such communications are examined and replies issued where appropriate as soon as possible. If you are unsatisfied with the reply received, you may refer your complaint to the relevant regulator in your jurisdiction. If you ask us, we will endeavor to provide you with information about relevant complaint avenues which may be applicable to your circumstances.\nTap may update its Privacy Policy from time to time. When we change the policy in a material way, a notice will be posted on our website along with the updated Privacy Policy.\nTap Payments. TM and copyright © 2016. All rights reserved.","ar":"If you have any questions or concerns about Tap’s Privacy Policy or data processing or if you would like to make a complaint about a possible breach of local privacy laws, please contact us at support@tap.com.kw. You can always contact us by phone at the relevant Tap Support number +965 98868811.\nAll such communications are examined and replies issued where appropriate as soon as possible. If you are unsatisfied with the reply received, you may refer your complaint to the relevant regulator in your jurisdiction. If you ask us, we will endeavor to provide you with information about relevant complaint avenues which may be applicable to your circumstances.\nTap may update its Privacy Policy from time to time. When we change the policy in a material way, a notice will be posted on our website along with the updated Privacy Policy.\nTap Payments. TM and copyright © 2016. All rights reserved."}}]}]

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Separator = function (_Component) {
  _inherits(Separator, _Component);

  function Separator(props) {
    _classCallCheck(this, Separator);

    var _this = _possibleConstructorReturn(this, (Separator.__proto__ || Object.getPrototypeOf(Separator)).call(this, props));

    _this.state = {};
    return _this;
  }

  _createClass(Separator, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      __webpack_require__(30);
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement('div', { className: 'separator', style: { width: this.props.width } });
    }
  }]);

  return Separator;
}(_react.Component);

exports.default = Separator;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Title = function (_Component) {
  _inherits(Title, _Component);

  function Title() {
    _classCallCheck(this, Title);

    return _possibleConstructorReturn(this, (Title.__proto__ || Object.getPrototypeOf(Title)).apply(this, arguments));
  }

  _createClass(Title, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { style: { position: 'relative' } },
        _react2.default.createElement(
          'h5',
          { style: this.props.style },
          this.props.title
        ),
        this.props.separator
      );
    }
  }]);

  return Title;
}(_react.Component);

exports.default = Title;

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("react-dom");

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LightBox = function (_Component) {
  _inherits(LightBox, _Component);

  function LightBox(props) {
    _classCallCheck(this, LightBox);

    var _this = _possibleConstructorReturn(this, (LightBox.__proto__ || Object.getPrototypeOf(LightBox)).call(this, props));

    _this.state = {
      close: false
    };
    return _this;
  }

  _createClass(LightBox, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      // if(this.state.close){
      //
      // }
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      __webpack_require__(36);
    }
  }, {
    key: 'open',
    value: function open() {}
  }, {
    key: 'close',
    value: function close() {
      this.setState({
        close: true
      });
    }
  }, {
    key: 'preventCloseOnChild',
    value: function preventCloseOnChild(e) {
      e.stopPropagation();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        'div',
        { className: this.props.open ? 'lightBox open' : 'lightBox', onClick: this.props.onClick },
        _react2.default.createElement(
          'div',
          { className: this.props.fullOnSmall ? 'closeLightBox darkIcon' : 'closeLightBox' },
          this.props.fullOnSmall ? _react2.default.createElement(
            _react2.default.Fragment,
            null,
            _react2.default.createElement('i', { className: 'far fa-times-circle iconNoneFullScreenMode' }),
            _react2.default.createElement('i', { className: 'fas fa-times iconOnFullScreenMode' })
          ) : _react2.default.createElement('i', { className: 'far fa-times-circle' })
        ),
        this.props.link ? _react2.default.createElement(
          'iframe',
          { className: 'lightBoxIframe', src: this.props.link, title: 'video' },
          _react2.default.createElement(
            'p',
            null,
            'Your browser does not support iframes.'
          )
        ) : _react2.default.createElement(
          'div',
          { className: this.props.fullOnSmall ? 'lightBoxDialog fullLightBoxDialog' : 'lightBoxDialog', onClick: function onClick(e) {
              return _this2.preventCloseOnChild(e);
            }, style: this.props.dialogueBoxStyle },
          _react2.default.createElement(
            'div',
            { className: 'lightBoxDialogDiv' },
            this.props.children
          )
        )
      );
    }
  }]);

  return LightBox;
}(_react.Component);

exports.default = LightBox;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _windowOrGlobal = __webpack_require__(5);

var _windowOrGlobal2 = _interopRequireDefault(_windowOrGlobal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Banner = function (_Component) {
  _inherits(Banner, _Component);

  function Banner(props) {
    _classCallCheck(this, Banner);

    var _this = _possibleConstructorReturn(this, (Banner.__proto__ || Object.getPrototypeOf(Banner)).call(this, props));

    _this.state = {
      bannerHeight: 0,
      children: _this.props.children,
      reversed: false
    };
    _this.updateWindowDimensions = _this.updateWindowDimensions.bind(_this);
    return _this;
  }

  _createClass(Banner, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      __webpack_require__(28);
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      _windowOrGlobal2.default.addEventListener('resize', this.updateWindowDimensions);
      this.updateWindowDimensions();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _windowOrGlobal2.default.removeEventListener('resize', this.updateWindowDimensions);
    }
  }, {
    key: 'updateWindowDimensions',
    value: function updateWindowDimensions() {
      this.setState({ bannerHeight: _windowOrGlobal2.default.innerHeight - this.props.cropped });
    }
  }, {
    key: 'render',
    value: function render() {
      var style = {};
      {
        this.props.noBackground ? style = {} : style = { backgroundColor: this.props.backgroundColor, backgroundImage: 'url(' + this.props.backgroundImage + ')' };
      }
      return _react2.default.createElement(
        'div',
        { className: this.props.maxContentHeight ? 'maxContentHeight banner' : 'banner', style: { height: this.state.bannerHeight } },
        _react2.default.createElement(
          'div',
          { className: 'bannerBackground',
            style: style },
          _react2.default.createElement(
            'div',
            { className: 'container flexContainer' },
            Array.isArray(this.props.children) ? null : _react2.default.cloneElement(this.props.children, { active: 'active', className: 'oneLayer' }),
            this.props.children[0] ? _react2.default.cloneElement(this.props.children[0], { active: this.props.active, className: 'hidden-sm' }) : null,
            this.props.children[1] ? _react2.default.cloneElement(this.props.children[1], { active: this.props.active, className: '' }) : null,
            this.props.children[0] ? _react2.default.cloneElement(this.props.children[0], { active: this.props.active, className: 'visible-sm' }) : null
          )
        )
      );
    }
  }]);

  return Banner;
}(_react.Component);

exports.default = Banner;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BannerLayer = function (_Component) {
  _inherits(BannerLayer, _Component);

  function BannerLayer(props) {
    _classCallCheck(this, BannerLayer);

    var _this = _possibleConstructorReturn(this, (BannerLayer.__proto__ || Object.getPrototypeOf(BannerLayer)).call(this, props));

    _this.state = {};
    return _this;
  }

  _createClass(BannerLayer, [{
    key: 'componentDidMount',
    value: function componentDidMount() {}
  }, {
    key: 'setActiveOrNot',
    value: function setActiveOrNot(active) {
      if (active && active === 'active') {
        return this.props.className + ' ' + this.props.animation + ' ' + 'bannerLayer';
      } else {
        return this.props.className + ' ' + 'opacityZero' + ' ' + 'bannerLayer';
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: this.setActiveOrNot(this.props.active), style: { width: this.props.width ? this.props.width : '' } },
        this.props.children
      );
    }
  }]);

  return BannerLayer;
}(_react.Component);

exports.default = BannerLayer;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _ArrowControls = __webpack_require__(105);

var _ArrowControls2 = _interopRequireDefault(_ArrowControls);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Slider = function (_Component) {
  _inherits(Slider, _Component);

  function Slider(props) {
    _classCallCheck(this, Slider);

    var _this = _possibleConstructorReturn(this, (Slider.__proto__ || Object.getPrototypeOf(Slider)).call(this, props));

    _this.state = {
      children: _this.props.children,
      SliderWidth: (_react2.default.Children.count(_this.props.children) * 100).toString(),
      bannerWidth: 100 * 1 / _react2.default.Children.count(_this.props.children).toString(),
      right: 'unset',
      left: 'unset',
      childrenActive: [],
      hideControls: '',
      languageSlideDirection: '',
      smooth: true,
      bulletsActive: []
    };
    return _this;
  }

  _createClass(Slider, [{
    key: 'componentWillUpdate',
    value: function componentWillUpdate() {}
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _this2 = this;

      __webpack_require__(39);
      if (this.props.language === 'ar') {
        this.setState({ left: '0', languageSlideDirection: 'left' });
      } else {
        this.setState({ right: '0', languageSlideDirection: 'right' });
      }

      if (this.props.children.length === 1) {
        this.setState({ hideControls: 'hideControls' });
      }
      this.props.children.map(function (child, key) {
        key === 0 ? _this2.state.childrenActive.push('active') : _this2.state.childrenActive.push('');
      });
      this.props.children.map(function (child, key) {
        key === 0 ? _this2.state.bulletsActive.push('bullet active') : _this2.state.bulletsActive.push('bullet');
      });
    }
  }, {
    key: 'updateWindowDimensions',
    value: function updateWindowDimensions() {}
  }, {
    key: 'goNext',
    value: function goNext(smooth, numberOfClicks) {
      this.changeBulletsActive('forward');
      this.setState({
        smooth: smooth
      });
      numberOfClicks = numberOfClicks * 100;
      if (parseInt(this.state[this.state.languageSlideDirection]) + numberOfClicks < parseInt(this.state.SliderWidth)) {
        this.setState(_defineProperty({}, this.state.languageSlideDirection, parseInt(this.state[this.state.languageSlideDirection]) + numberOfClicks + '%'));
        for (var i = 0; i < this.state.childrenActive.length; i++) {
          if (this.state.childrenActive[i] === 'active') {
            if (i + 1 < this.state.childrenActive.length && smooth) {
              this.state.childrenActive[i] = '';
              this.state.childrenActive[i + 1] = 'active';
            }
            break;
          }
        }
      } else {
        this.state.children.push(this.state.children.shift());
        this.goBack(false, 1);
        setTimeout(function () {
          this.goNext(true, 1);
        }.bind(this), 10);
      }
      this.setState();
    }
  }, {
    key: 'goBack',
    value: function goBack(smooth, numberOfClicks) {
      this.changeBulletsActive('backward');
      this.setState({
        smooth: smooth
      });
      numberOfClicks = numberOfClicks * 100;
      if (parseInt(this.state[this.state.languageSlideDirection]) - numberOfClicks >= 0) {
        this.setState(_defineProperty({}, this.state.languageSlideDirection, parseInt(this.state[this.state.languageSlideDirection]) - numberOfClicks + '%'));
        for (var i = 0; i < this.state.childrenActive.length; i++) {
          if (this.state.childrenActive[i] === 'active') {
            if (i - 1 >= 0 && smooth) {
              this.state.childrenActive[i] = '';
              this.state.childrenActive[i - 1] = 'active';
            }
            break;
          }
        }
      } else {
        this.state.children.unshift(this.state.children.pop());
        this.goNext(false, 1);
        setTimeout(function () {
          this.goBack(true, 1);
        }.bind(this), 10);
      }
      this.setState();
    }
  }, {
    key: 'changeBulletsActive',
    value: function changeBulletsActive(forwardOrBackward) {
      if (forwardOrBackward === 'forward') {
        this.state.bulletsActive.unshift(this.state.bulletsActive.pop());
      } else if (forwardOrBackward === 'backward') {
        this.state.bulletsActive.push(this.state.bulletsActive.shift());
      }
      this.setState();
    }
  }, {
    key: 'bulletClick',
    value: function bulletClick(key) {
      var active = void 0;
      this.state.bulletsActive.map(function (bulletActive, key) {
        bulletActive === 'bullet active' ? active = key : null;
      });
      var iritations = Math.abs(key - active);
      for (var i = 0; i < iritations; i++) {
        if (key > active) {
          this.goNext(true, iritations);
        } else if (key < active) {
          this.goBack(true, iritations);
        }
      }
      this.setState();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var style = {};
      {
        this.props.oneBackground ? style = { backgroundColor: this.props.backgroundColor,
          backgroundImage: 'url(' + this.props.backgroundImage + ')',
          backgroundPosition: this.props.backgroundPosition,
          backgroundSize: this.props.backgroundSize
        } : style = {};
      }
      return _react2.default.createElement(
        'div',
        { className: this.props.hideOnSmall ? "sliderContainer hideOnSmall fadeinanimation" : "sliderContainer fadeinanimation", style: style },
        _react2.default.createElement(_ArrowControls2.default, {
          hideControls: this.state.hideControls,
          languageSlideDirection: this.state.languageSlideDirection,
          goBack: function goBack() {
            return _this3.goBack(true, 1);
          },
          goNext: function goNext() {
            return _this3.goNext(true, 1);
          }
        }),
        _react2.default.createElement(
          'div',
          { className: this.state.smooth ? 'slider smooth' : 'slider', style: { width: this.state.SliderWidth + '%', right: this.state.right, left: this.state.left } },
          this.state.children.map(function (child, key) {
            return _react2.default.createElement(
              'div',
              { key: key, className: 'slideContainer', style: { width: _this3.state.bannerWidth + '%' } },
              _react2.default.cloneElement(child, { active: _this3.state.childrenActive[key], noBackground: _this3.props.oneBackground ? true : false })
            );
          })
        ),
        _react2.default.createElement(
          'div',
          { className: "bulletsControls " + this.state.hideControls },
          this.state.bulletsActive.map(function (bulletActive, key) {
            return _react2.default.createElement('div', {
              key: key,
              className: bulletActive,
              onClick: function onClick() {
                return _this3.bulletClick(key);
              }
            });
          })
        )
      );
    }
  }]);

  return Slider;
}(_react.Component);

exports.default = Slider;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function escape(url) {
    if (typeof url !== 'string') {
        return url;
    }
    // If url is already wrapped in quotes, remove them
    if (/^['"].*['"]$/.test(url)) {
        url = url.slice(1, -1);
    }
    // Should url be wrapped?
    // See https://drafts.csswg.org/css-values-3/#urls
    if (/["'() \t\n]/.test(url)) {
        return '"' + url.replace(/"/g, '\\"').replace(/\n/g, '\\n') + '"';
    }

    return url;
};

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _Img = __webpack_require__(3);

var _Img2 = _interopRequireDefault(_Img);

var _errors = __webpack_require__(178);

var _errors2 = _interopRequireDefault(_errors);

var _windowOrGlobal = __webpack_require__(5);

var _windowOrGlobal2 = _interopRequireDefault(_windowOrGlobal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NotFound = function (_Component) {
  _inherits(NotFound, _Component);

  function NotFound(props) {
    _classCallCheck(this, NotFound);

    var _this = _possibleConstructorReturn(this, (NotFound.__proto__ || Object.getPrototypeOf(NotFound)).call(this, props));

    _this.state = {
      pageHeight: ''
    };
    _this.updateWindowDimensions = _this.updateWindowDimensions.bind(_this);
    return _this;
  }

  _createClass(NotFound, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      __webpack_require__(59);
      var lang = this.props.language || this.props.location && this.props.location.pathname.split('/')[2];
      this.props.preferencesStore.setLanguage(lang);
      this.props.preferencesStore.filterJsonStringsBasedOnLanguage(_errors2.default);
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      _windowOrGlobal2.default.addEventListener('resize', this.updateWindowDimensions);
      this.updateWindowDimensions();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _windowOrGlobal2.default.removeEventListener('resize', this.updateWindowDimensions);
    }
  }, {
    key: 'updateWindowDimensions',
    value: function updateWindowDimensions() {
      this.setState({ pageHeight: _windowOrGlobal2.default.innerHeight });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var errorObj = _errors2.default.filter(function (error) {
        return error.error === _this2.props.error;
      })[0];
      return _react2.default.createElement(
        'div',
        { className: 'notFound', style: { height: this.props.pageHeight } },
        _react2.default.createElement(
          'div',
          { className: 'notFoundContent' },
          _react2.default.createElement(_Img2.default, { className: 'notFoundImage', src: errorObj.error_image }),
          _react2.default.createElement('div', { style: { height: '30px' } }),
          _react2.default.createElement(
            'h1',
            { className: 'notFoundTitle' },
            errorObj.error_number
          ),
          _react2.default.createElement(
            'h1',
            { className: 'notFoundParagraph' },
            errorObj.error_message
          )
        )
      );
    }
  }]);

  return NotFound;
}(_react.Component);

exports.default = NotFound;

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = [{"name":"English","slot":"en","shortName":"en"},{"name":"العربية","slot":"ar","shortName":"ar"}]

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _DownloadApp = __webpack_require__(98);

var _DownloadApp2 = _interopRequireDefault(_DownloadApp);

var _CallToActionStore = __webpack_require__(103);

var _CallToActionStore2 = _interopRequireDefault(_CallToActionStore);

var _mobxReact = __webpack_require__(7);

var _TapButton = __webpack_require__(6);

var _TapButton2 = _interopRequireDefault(_TapButton);

var _Img = __webpack_require__(3);

var _Img2 = _interopRequireDefault(_Img);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CallToAction = function (_Component) {
  _inherits(CallToAction, _Component);

  function CallToAction(props) {
    _classCallCheck(this, CallToAction);

    var _this = _possibleConstructorReturn(this, (CallToAction.__proto__ || Object.getPrototypeOf(CallToAction)).call(this, props));

    _this.state = {
      actionType: _react2.default.createElement('div', null)
    };
    return _this;
  }

  _createClass(CallToAction, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      __webpack_require__(38);
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      _CallToActionStore2.default.setLanguage(this.props.language);
      _CallToActionStore2.default.selectCountry(this.props.country_code);
      if (this.props.callToAction && this.props.callToAction.actionType === 'sms') {
        this.setState({
          actionType: _react2.default.createElement(_DownloadApp2.default, {
            product: this.props.callToAction.product,
            partner: this.props.partner,
            placeholder: this.props.callToAction.placeholder,
            buttonText: this.props.callToAction.buttonText,
            linkText: this.props.callToAction.linkText,
            actionType: this.props.callToAction.actionType,
            link: this.props.callToAction.link,
            color: this.props.color,
            language: this.props.language,
            store: _CallToActionStore2.default,
            source: this.props.source,
            actionTitle: this.props.callToAction.actionTitle,
            schedule_for: this.props.schedule_for
          })
        });
      } else if (this.props.callToAction && this.props.callToAction.actionType === 'link') {
        this.setState({
          actionType: _react2.default.createElement(_TapButton2.default, {
            type: 'link',
            link: this.props.callToAction.link,
            text: this.props.callToAction.linkText,
            shape: 'bordered',
            color: this.props.color,
            actionType: this.props.callToAction.actionType,
            language: this.props.language
          })
        });
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {}
  }, {
    key: 'includebreaks',
    value: function includebreaks(text) {
      return text.split("\n").map(function (text, key) {
        return _react2.default.createElement(
          'span',
          { key: key },
          text,
          _react2.default.createElement('br', null)
        );
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _react2.default.Fragment,
        null,
        this.props.callToAction ? _react2.default.createElement(
          'div',
          { className: 'callToAction', style: { textAlign: this.props.center ? 'center' : '' } },
          this.props.partnerLogo ? _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(_Img2.default, { className: 'partnerLogo', src: this.props.partnerLogo }),
            _react2.default.createElement('div', { style: { height: '20px' } })
          ) : null,
          this.props.callToAction.title ? _react2.default.createElement(
            'h3',
            { className: 'callToActionTitle hidden-xs', style: { textAlign: this.props.center ? 'center' : '' } },
            this.includebreaks(this.props.callToAction.title)
          ) : null,
          this.props.callToAction.shortTitle ? _react2.default.createElement(
            'b',
            null,
            _react2.default.createElement(
              'h5',
              { className: 'callToActionTitle visible-xs', style: { textAlign: this.props.center ? 'center' : '' } },
              this.includebreaks(this.props.callToAction.shortTitle)
            )
          ) : null,
          _react2.default.createElement('div', { style: { height: '18px' } }),
          this.state.actionType
        ) : null
      );
    }
  }]);

  return CallToAction;
}(_react.Component);

exports.default = (0, _mobxReact.observer)(CallToAction);

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _TapSelect = __webpack_require__(33);

var _TapSelect2 = _interopRequireDefault(_TapSelect);

var _mobxReact = __webpack_require__(7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TapInput = function (_Component) {
  _inherits(TapInput, _Component);

  function TapInput() {
    _classCallCheck(this, TapInput);

    return _possibleConstructorReturn(this, (TapInput.__proto__ || Object.getPrototypeOf(TapInput)).apply(this, arguments));
  }

  _createClass(TapInput, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      __webpack_require__(35);
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'inputContainer', style: this.props.style },
        _react2.default.createElement(
          'div',
          null,
          this.props.inputFunction ? _react2.default.createElement(_TapSelect2.default, { store: this.props.store,
            className: this.props.inputFunction }) : _react2.default.createElement('div', null),
          _react2.default.createElement('input', {
            placeholder: this.props.placeholder,
            className: this.props.inputFunction ? 'extraPadding tapInput' : 'tapInput',
            type: this.props.type,
            onChange: this.props.onChange,
            onKeyPress: this.props.onKeyPress })
        )
      );
    }
  }]);

  return TapInput;
}(_react.Component);

exports.default = (0, _mobxReact.observer)(TapInput);

/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = require("mobx");

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(11);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _windowOrGlobal = __webpack_require__(5);

var _windowOrGlobal2 = _interopRequireDefault(_windowOrGlobal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ParallaxScroll = function (_Component) {
  _inherits(ParallaxScroll, _Component);

  function ParallaxScroll(props) {
    _classCallCheck(this, ParallaxScroll);

    var _this = _possibleConstructorReturn(this, (ParallaxScroll.__proto__ || Object.getPrototypeOf(ParallaxScroll)).call(this, props));

    _this.state = {
      componentYPosition: 0,
      componentYHeight: 0,
      increase: false,
      oldScrollTop: 0,
      top: 100
    }, _this.handleScroll = _this.handleScroll.bind(_this);
    return _this;
  }

  _createClass(ParallaxScroll, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      __webpack_require__(52);
    }
  }, {
    key: 'handleScroll',
    value: function handleScroll() {
      var newScrollTop = (document.scrollingElement || document.documentElement).scrollTop;
      setTimeout(function () {
        this.setState({ oldScrollTop: (document.scrollingElement || document.documentElement).scrollTop });
      }.bind(this), 100);

      if (newScrollTop + 100 > this.state.componentYPosition && newScrollTop < this.state.componentYPosition + this.state.componentYHeight) {
        if (this.state.oldScrollTop < newScrollTop) {
          this.setState({ top: this.state.top - 0.7 });
        } else {
          this.setState({ top: this.state.top + 0.7 });
        }
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      _windowOrGlobal2.default.addEventListener("scroll", this.handleScroll);
      this.setState({
        componentYPosition: _reactDom2.default.findDOMNode(this).getBoundingClientRect().top,
        componentYHeight: _reactDom2.default.findDOMNode(this).getBoundingClientRect().height
      });
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _windowOrGlobal2.default.removeEventListener("scroll", this.handleScroll);
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'parallaxScroll', style: { height: this.props.height } },
        _react2.default.createElement('div', { className: 'parallaxScrollBackground', style: { backgroundImage: 'url(' + this.props.backgroundImage + ')', top: -this.state.top } }),
        this.props.children ? _react2.default.createElement(
          'div',
          { className: 'parallaxScrollContentBox' },
          _react2.default.createElement(
            'div',
            { className: this.props.withContentBackground ? 'parallaxScrollContent withContentBackground' : 'parallaxScrollContent' },
            this.props.children
          )
        ) : null
      );
    }
  }]);

  return ParallaxScroll;
}(_react.Component);

exports.default = ParallaxScroll;

/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = require("@tap-payments/loader");

/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = [{"product":"collect","slot":"collect","brandingColor":"#ff0031","schedule_for":"GD","bannerImage":"https://www.tap.company/websiteImages/bannerImages/gocollect-en-video.png","videoLink":"https://player.vimeo.com/video/211170801?autoplay=0&byline=0&portrait=0&color=cccccc","subImage":"https://www.tap.company/websiteImages/subImages/gocollect-sub-image.jpg","countries":["kw","om","eg","qa","ae","sa","bh","jo","lb"],"subPages":[{"page":"activate","slot":"activate"},{"page":"plans","slot":"plans"}],"block":{"title":"gocollect","subtitle":{"en":"send bills","ar":"إرسال الفواتير"},"image":"https://www.tap.company/websiteImages/blocks/goCollect.png","hoverImage":"https://www.tap.company/websiteImages/blocks/goCollect.png"},"intro":{"en":"At Tap, we understand that not all businesses are online businesses. Sometimes, you just need the ease of online processing, to streamline your offline business activities. Activities like payments, billing, and collection. That’s what goCollect— Tap’s fully functional mobile billing system service—was built and made for. It’s all the functionality of online payments, built for offline businesses.","ar":"نحن في تاپ، ندرك جيّداً أن ليس جميع الأعمال مرتبطة بشبكة الإنترنت وأنّك تحتاج أن ترتاح بعض الشيء من العمليات الإلكترونية للتركيز على أمور أخرى خارج الشبكة مثل نشاطات الدفع، الفوترة والتحصيل، لذلك قدّمنا لك goCollect_ وهي خدمة إرسال الفواتير وتحصيل المدفوعات الشاملة من تاپ التي أنشئت لهذا السبب بالتحديد. إنّها ببساطة خدمة غير إلكترونية ولكن بسهولة وسرعة خدمات الإنترنت التي تتم أونلاين."}},{"product":"sell","slot":"sell","brandingColor":"#00aff0","bannerImage":"https://www.tap.company/websiteImages/bannerImages/goSell-accept-payments-online.png","subImage":"https://www.tap.company/websiteImages/subImages/gosell-sub-image.png","countries":["kw","om","eg","qa","ae","sa","bh","jo","lb"],"subPages":[{"page":"activate","slot":"activate"},{"page":"plans","slot":"plans"}],"block":{"title":"gosell","subtitle":{"en":"accept online payments","ar":"استقبال المدفوعات الإلكترونية"},"image":"https://www.tap.company/websiteImages/blocks/goSell.png","hoverImage":"https://www.tap.company/websiteImages/blocks/goSell.png"},"intro":{"en":"Whether you’re a powerhouse player or a young solo-preneur, if you’re in business you already know the importance of seizing every financial opportunity. You already know that having a solid e-commerce platform is essential to succeeding in 2017. You already know that, in order for you to make money? You’ve got to know the business of money.","ar":"مهما كانت هويتك أو وظيفتك: المال يبقى المسيطر سواء كنت صاحب شركة أو تعمل منفرداً، أنت تدرك بلا شك أهمية اقتناص الفرص المالية وتعرف جيّداً أن امتلاك قاعدة مالية قوية أمر أساسي لاجتياز عام 2017 بنجاح ولكن كي تعلم ذلك وكي تجني المال، عليك أن تفهم طبيعة العمل في المجال المالي."}},{"product":"tap","slot":"tap","brandingColor":"#EF4123","bannerImage":"https://www.tap.company/websiteImages/bannerImages/gotap-devices-english.png","subImage":"https://www.tap.company/websiteImages/subImages/gotap-sub-image.png","countries":["kw"],"subPages":[{"page":"activate","slot":"activate"},{"page":"plans","slot":"plans"}],"block":{"title":"gotap","subtitle":{"en":"accept instore payments","ar":"استقبل المدفوعات في المتجر"},"image":"https://www.tap.company/websiteImages/blocks/goTap1.png","hoverImage":"https://www.tap.company/websiteImages/blocks/goTap2.png"},"intro":{"en":"If you’re running around your retail store or if you’re a regular at all the local expos -- we’ve got you. Say hello to your new secret weapon: goTap. Now you can accept any payment, anywhere by facilitating portable K-NET and credit card payment for your customers on the fly -- now that’s a game changer.","ar":"رحب بأحدث التقنيات للمبيعات مع goTap ! الآن يمكنك قبول أي دفع من عملائك في أي مكان من خلال تفعيل خدمتنا المتنقلة لمدفوعات ال K-NETوبطاقات الائتمان."}},{"product":"pay","slot":"pay","brandingColor":"#2ace00","schedule_for":"TD","bannerImage":"https://www.tap.company/websiteImages/bannerImages/gopay-eng-video.png","videoLink":"https://player.vimeo.com/video/146118094?autoplay=0&byline=0&portrait=0&color=cccccc","subImage":"https://www.tap.company/websiteImages/subImages/gopay-sub-image.jpg","countries":["kw"],"subPages":[],"block":{"title":"gopay","subtitle":{"en":"pay bills","ar":"دفع الفواتير"},"image":"https://www.tap.company/websiteImages/blocks/goPay.png","hoverImage":"https://www.tap.company/websiteImages/blocks/goPay.png"},"intro":{"en":"Check things off your pay list with goPay, the easy, quick and secure way to prioritize and keep track of your upcoming payments. It is easy to use, and designed to be easy on the eyes too. It’ll help you pay your bills (such as mobile bill payments and top-ups), and remind you with notifications so you always pay on time. You can even pay for more than one bill, all at once.","ar":"goPay يمنحك حلاً سهلاً وبسيطاً لتنظيم مدفوعاتك الشهرية وترتيب أولوياتك ومتابعة مستحقاتك الشهرية دون أي جهد أو عناء. سدّد أكثر من فاتورة في الوقت نفسه واستلم إشعارات بموعد استحقاقها."}},{"product":"pray","slot":"pray","brandingColor":"#3f3e3a","schedule_for":"TD","bannerImage":"https://www.tap.company/websiteImages/bannerImages/gopray-main.png","countries":["kw","om","eg","qa","ae","sa","bh","jo","lb"],"subPages":[],"block":{"title":"gopray","subtitle":{"en":"ramadan kareem","ar":"رمضان كريم"},"image":"https://www.tap.company/websiteImages/blocks/gopray-block.png","hoverImage":"https://www.tap.company/websiteImages/blocks/gopray-block.png"},"intro":{"en":"For Ramadan 2017 and afterwards, we’re making it easier than ever to prioritize faith & prayer effortlessly. Meet goPray. It’s the all-in-one app you’ve been waiting for, and it’s our gift to you.","ar":"بمناسبة حلول شهر رمضان الكريم، تاب تقدم لكم طريقة سهلة وفعالة لمتابعة وتنظيم أوقات العبادات طوال السنة. goPray هو هديتنا لكم."}}]

/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports = [{"name":"Boubyan","slot":"boubyan","logo":"https://www.tap.company/websiteImages/partners/boubyan/boubyan-tap-logo.svg","brandingColor":"#ff0031","paternImage":"https://www.tap.company/websiteImages/partners/boubyan/boubyan-symbol.svg","countries":["kw"],"products":[{"product":"collect","slot":"collect"},{"product":"sell","slot":"sell"},{"product":"tap","slot":"tap"}],"intro":{"en":"Lucky for you, you just got the best of both worlds.","ar":"ومن حسن الطالع أنك قد حصلت على أفضل المميزات بشأن حليّن مختلفين."},"subIntro":{"en":"Boubyan Bank was established in 2004, and they’ve been re-establishing the way banking in Kuwait works every day since then. Boubyan Bank is all about creating fast, open, and synergistic services that work together seamlessly. At Tap, we believe that’s what every business requires to succeed: a fresh perspective, and an ability to handle every new challenge and opportunity with ease. It’s the perfect banking solution for the up-and-coming makers, doers, and dreamers that use Tap to build their businesses from the ground up every day.","ar":"أسُس بنك بوبيان فيي عام 2004 وقد أعادوا تأسيس طريقة العمل البنكية في الكويت بشكل مستمر منذ ذلك الوقت. فكل شئي في بنك بوبيان يدور حول الإنشاء السريع والفتح والخدمات المحفزة التي تعمل معا بسلاسة. في شركة تاب نرى أن كل شركة تسعى إلى النجاح تحتاج إلى: منظور جديد وقدرة على التعامل ببساطة مع كل تحدي وفرصة جديدة. فهذا هو الحل البنكي الأمثل أمام أصحاب الأعمال والتنفيذيون والحالمون الصاعدون الذين يستخدمون خدمة تاب كل يوم في بناء أعمالهم التجارية من البداية حتى الإزدهار."}},{"name":"NBK","slot":"nbk","logo":"https://www.tap.company/websiteImages/partners/nbk/NBK-tap-logo.svg","brandingColor":"#1d4d8a","paternImage":"https://www.tap.company/websiteImages/partners/nbk/NBK-symbol.svg","countries":["kw"],"products":[{"product":"collect","videoLink":"https://player.vimeo.com/video/291702528?autoplay=0&byline=0&portrait=0&color=cccccc","slot":"collect","brandingColor":"#1d4d8a","block":{"title":"gocollect partner","subtitle":{"en":"send bills","ar":"إرسال الفواتير"},"image":"https://www.tap.company/websiteImages/blocks/nbk-collect1.png","hoverImage":"https://www.tap.company/websiteImages/blocks/nbk-collect2.png"}}],"intro":{"en":"Welcome to the next level of e-commerce.","ar":"رحّب بمستوى تجارة إلكترونية جديد"},"subIntro":{"en":"In the world of banking, The National Bank of Kuwait needs no introduction. Prided as the gold standard of financial security, versatility, and reliability around the world -- it’s the fullproof banking partner that every ambitious Tap-reneur deserves. Through years of research, we narrowed down a list of all the banking tools and services that our users required in order to meet all their business needs. The result? An exclusive, power-packed mega suite of tools and services from NBK and Tap to take your business from ‘better’ to ‘best.’","ar":"لا يحتاج بنك الكويت الوطني إلى تعريف في عالم البنوك. فهو يتميز بازدهار المعيار الذهبي مثل الضمان الاجتماعي والبراعة والمصداقية حول العالم -- إنه الشريك البنكي البسيط الذي يستحقه كل رائد طموح في شركة تاب. ومن خلال سنوات من البحث فقد ضيقنا قائمة خاصة بجميع الأدوات والخدمات البنكية التي يطلبها المستخدمون لتلبية احتياجتهم التجارية.  فما هي النتيجة؟ مجموعة ضخمة وحصرية من الأدوات والخدمات التي يقدمها بنك الكويت الوطني وتاب لتحسين تجارتك إلى الأفضل."}},{"name":"Zain","slot":"zain","logo":"https://www.tap.company/websiteImages/partners/zain/zain-tap-logo.svg","brandingColor":"#1f525f","paternImage":"https://www.tap.company/websiteImages/partners/zain/zain-pattern.svg","countries":["kw"],"products":[{"product":"collect","slot":"collect"},{"product":"sell","slot":"sell"},{"product":"tap","slot":"tap"}],"intro":{"en":"Tap into A Wonderful World.","ar":"تاب نحو عالم جميل"},"subIntro":{"en":"For over 30 years, Zain has been inspiring people across the Middle East to tap into ‘A Wonderful World.’ It’s a world where communication is clear, connection is instant, and the experience is bold and colorful in every step of the way. At Tap, it’s the kind of world we aspire to create, for ourselves and for our users. That’s why we teamed up with Zain to bring that same level of speed, clarity, and undeniable innovation, exclusively for our Tap-reneurs.","ar":"ولأكثر من ثلاثين سنة، فإن شركة زين تُلهم الناس عبر الشرق الأوسط 'بالانتقال إلى عالم جميل'. إنه عالم يتميز بوضوح التواصل والاتصال الفوري والخبرة الكبيرة والبهجة في كل خطوة على امتداد الطريق. وفي شركة تاب إنه العالم الذي نتطلع إلي إنشائه لأنفسنا وللمستخدمين. وهذا هو سبب تعاوننا مع شركة زين من أجل تقديم نفس مستوى السرعة والوضوح والإبتكار الذي لا شك فيه المُقتصر على رودا شركة تاب."}}]

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _MainPage = __webpack_require__(88);

var _MainPage2 = _interopRequireDefault(_MainPage);

var _ProductPage = __webpack_require__(116);

var _ProductPage2 = _interopRequireDefault(_ProductPage);

var _Plans = __webpack_require__(158);

var _Plans2 = _interopRequireDefault(_Plans);

var _APIPage = __webpack_require__(162);

var _APIPage2 = _interopRequireDefault(_APIPage);

var _SupportPage = __webpack_require__(165);

var _SupportPage2 = _interopRequireDefault(_SupportPage);

var _AboutPage = __webpack_require__(171);

var _AboutPage2 = _interopRequireDefault(_AboutPage);

var _JobsPage = __webpack_require__(175);

var _JobsPage2 = _interopRequireDefault(_JobsPage);

var _ActivatePage = __webpack_require__(176);

var _ActivatePage2 = _interopRequireDefault(_ActivatePage);

var _IframePage = __webpack_require__(180);

var _IframePage2 = _interopRequireDefault(_IframePage);

var _ErrorPage = __webpack_require__(18);

var _ErrorPage2 = _interopRequireDefault(_ErrorPage);

var _PoliciesPage = __webpack_require__(181);

var _PoliciesPage2 = _interopRequireDefault(_PoliciesPage);

var _ActivatePaymentPage = __webpack_require__(182);

var _ActivatePaymentPage2 = _interopRequireDefault(_ActivatePaymentPage);

var _languages = __webpack_require__(19);

var _languages2 = _interopRequireDefault(_languages);

var _products = __webpack_require__(25);

var _products2 = _interopRequireDefault(_products);

var _pages = __webpack_require__(8);

var _pages2 = _interopRequireDefault(_pages);

var _partners = __webpack_require__(26);

var _partners2 = _interopRequireDefault(_partners);

var _plans = __webpack_require__(185);

var _plans2 = _interopRequireDefault(_plans);

var _metaTags = __webpack_require__(81);

var _metaTags2 = _interopRequireDefault(_metaTags);

var _api = __webpack_require__(186);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var countries = [{ "ID": "132", "country_code": "KW", "country_name_english": "Kuwait", "country_name_arabic": "الكويت", "country_flag_url": "http://img.gotapnow.com/web/countryflag/Kuwait.png", "international_code": "965", "businessTypeAllowed": "all" }, { "ID": "17", "country_code": "BH", "country_name_english": "Bahrain", "country_name_arabic": "البحرين", "country_flag_url": "http://img.gotapnow.com/web/countryflag/Bahrain.png", "international_code": "973", "businessTypeAllowed": "all" }, { "ID": "70", "country_code": "EG", "country_name_english": "Egypt", "country_name_arabic": "مصر", "country_flag_url": "http://img.gotapnow.com/web/countryflag/Egypt.png", "international_code": "20", "businessTypeAllowed": "all" }, { "ID": "124", "country_code": "JO", "country_name_english": "Jordan", "country_name_arabic": "الأردن", "country_flag_url": "http://img.gotapnow.com/web/countryflag/Jordan.png", "international_code": "962", "businessTypeAllowed": "all" }, { "ID": "136", "country_code": "LB", "country_name_english": "Lebanon", "country_name_arabic": "لبنان", "country_flag_url": "http://img.gotapnow.com/web/countryflag/Lebanon.png", "international_code": "961", "businessTypeAllowed": "all" }, { "ID": "184", "country_code": "OM", "country_name_english": "Oman", "country_name_arabic": "عمان", "country_flag_url": "http://img.gotapnow.com/web/countryflag/Oman.png", "international_code": "968", "businessTypeAllowed": "all" }, { "ID": "199", "country_code": "QA", "country_name_english": "Qatar", "country_name_arabic": "قطر", "country_flag_url": "http://img.gotapnow.com/web/countryflag/Qatar.png", "international_code": "974", "businessTypeAllowed": "all" }, { "ID": "212", "country_code": "SA", "country_name_english": "Saudi Arabia", "country_name_arabic": "المملكة العربية السعودية", "country_flag_url": "http://img.gotapnow.com/web/countryflag/Saudi Arabia.png", "international_code": "966", "businessTypeAllowed": "all" }, { "ID": "253", "country_code": "AE", "country_name_english": "United Arab Emirates", "country_name_arabic": "الإمارات", "country_flag_url": "http://img.gotapnow.com/web/countryflag/United Arab Emirates.png", "international_code": "971", "businessTypeAllowed": "all" }]; // import Page from './components/Page/Page.js';


function getMetaTag(pageName, windowLocationHref) {
  var result = _metaTags2.default.filter(function (item) {
    return item.pageTemplate.toLowerCase() === pageName.toLowerCase() && windowLocationHref.indexOf(item.link) > -1;
  });
  return result[0];
}

var routes = [];

countries.map(function (country) {
  _languages2.default.map(function (language) {
    routes.push({
      path: '/' + country.country_code.toLowerCase() + '/' + language.slot,
      exact: true,
      component: _MainPage2.default,
      metaTag: getMetaTag('mainPage', '/' + country.country_code.toLowerCase() + '/' + language.slot),
      compProps: {
        country: country.country_code.toLowerCase(),
        language: language.slot
      }
    });
    _pages2.default.map(function (page) {
      routes.push({
        path: '/' + country.country_code.toLowerCase() + '/' + language.slot + '/' + page.slot,
        exact: true,
        component: page.slot === 'support' ? _SupportPage2.default : page.slot === 'api' ? _APIPage2.default : page.slot === 'about' ? _AboutPage2.default : page.slot === 'jobs' ? _JobsPage2.default : page.slot === 'developers' ? _IframePage2.default : page.slot === 'activate-payment' ? _ActivatePaymentPage2.default : page.slot === 'terms-conditions' || 'privacy-policy' ? _PoliciesPage2.default : null,
        metaTag: getMetaTag(page.slot, '/' + country.country_code.toLowerCase() + '/' + language.slot + '/' + page.slot),
        compProps: {
          country: country.country_code.toLowerCase(),
          language: language.slot,
          page: page.slot
        },
        hideFooter: page.slot === 'developers' ? true : false,
        noItemsHeader: page.slot === 'activate-payment' ? true : false,
        noItemsFooter: page.slot === 'activate-payment' ? true : false
      });
    });
  });
});

_languages2.default.map(function (language) {
  _products2.default.map(function (product) {
    product.countries.map(function (country) {
      routes.push({
        path: '/' + country.toLowerCase() + '/' + language.slot + '/' + product.slot,
        exact: true,
        component: _ProductPage2.default,
        metaTag: getMetaTag('productPage', '/' + country.toLowerCase() + '/' + language.slot + '/' + product.slot),
        compProps: {
          country: country.toLowerCase(),
          language: language.slot,
          product: product.slot
        }
      });
      product.subPages.map(function (subPage) {
        routes.push({
          path: '/' + country.toLowerCase() + '/' + language.slot + '/' + product.slot + '/' + subPage.slot,
          exact: true,
          component: subPage.slot === 'activate' ? _ActivatePage2.default : subPage.slot === 'plans' ? _Plans2.default : null,
          compProps: {
            country: country.toLowerCase(),
            language: language.slot,
            product: product.slot,
            plans: _plans2.default
          },
          headerSpacePC: subPage.slot === 'plans' ? true : false,
          noItemsHeader: subPage.slot === 'activate' ? true : false,
          noItemsFooter: subPage.slot === 'activate' ? true : false
        });
      });
    });
  });
});

_languages2.default.map(function (language) {
  _partners2.default.map(function (partner) {
    partner.countries.map(function (country) {
      routes.push({
        path: '/' + country.toLowerCase() + '/' + language.slot + '/' + partner.slot,
        exact: true,
        component: _MainPage2.default,
        metaTag: getMetaTag('mainPageWithPartner', '/' + country.toLowerCase() + '/' + language.slot + '/' + partner.slot),
        compProps: {
          country: country.toLowerCase(),
          language: language.slot,
          partner: partner.slot
        }
      });
      partner.products.map(function (product) {
        routes.push({
          path: '/' + country.toLowerCase() + '/' + language.slot + '/' + product.slot + '/' + partner.slot,
          exact: true,
          component: _ProductPage2.default,
          metaTag: getMetaTag('productPageWithPartner', '/' + country.toLowerCase() + '/' + language.slot + '/' + product.slot + '/' + partner.slot),
          compProps: {
            country: country.toLowerCase(),
            language: language.slot,
            product: product.slot,
            partner: partner.slot
          }
        });
      });
    });
  });
});

exports.default = routes;

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(89);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(2)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../node_modules/css-loader/index.js!./Banner.css", function() {
			var newContent = require("!!../../../../node_modules/css-loader/index.js!./Banner.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _Separator = __webpack_require__(9);

var _Separator2 = _interopRequireDefault(_Separator);

var _Title = __webpack_require__(10);

var _Title2 = _interopRequireDefault(_Title);

var _FeaturesCategory = __webpack_require__(92);

var _FeaturesCategory2 = _interopRequireDefault(_FeaturesCategory);

var _CategoriesTitles = __webpack_require__(96);

var _CategoriesTitles2 = _interopRequireDefault(_CategoriesTitles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Features = function (_Component) {
  _inherits(Features, _Component);

  function Features() {
    _classCallCheck(this, Features);

    return _possibleConstructorReturn(this, (Features.__proto__ || Object.getPrototypeOf(Features)).apply(this, arguments));
  }

  _createClass(Features, [{
    key: 'categoriesComponentsComposer',
    value: function categoriesComponentsComposer(features, rightPartAnimation, leftPartAnimation) {
      var _this2 = this;

      return features.categories.map(function (category, key) {
        if (category.partners && category.partners.filter(function (partner) {
          return partner === _this2.props.partner;
        })[0] || category.partners === undefined) {
          return _react2.default.createElement(
            'div',
            { key: key, id: category.categoryName.replace(/\s/g, '') },
            features.categories.length === 1 ? _react2.default.createElement(_react2.default.Fragment, null) : _react2.default.createElement('div', { className: key === 0 ? 'hidden-xs' : 'visible-xs', style: { height: '60px' } }),
            features.categories.length === 1 ? _react2.default.createElement(_react2.default.Fragment, null) : _react2.default.createElement('div', { className: 'hidden-xs', style: { height: '150px' } }),
            _react2.default.createElement(_Title2.default, {
              title: category.categoryName,
              separator: _react2.default.createElement(_Separator2.default, { width: '25%' })
            }),
            _react2.default.createElement(_FeaturesCategory2.default, {
              category: category,
              rightPartAnimation: rightPartAnimation,
              leftPartAnimation: leftPartAnimation,
              partner: _this2.props.partner
            })
          );
        } else {
          return _react2.default.createElement(_react2.default.Fragment, { key: key });
        }
      });
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      __webpack_require__(32);
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'features' },
        _react2.default.createElement(
          'div',
          { className: 'container' },
          _react2.default.createElement(_CategoriesTitles2.default, {
            categories: this.props.features.categories,
            partner: this.props.partner
          }),
          this.categoriesComponentsComposer(this.props.features, this.props.rightPartAnimation, this.props.leftPartAnimation)
        )
      );
    }
  }]);

  return Features;
}(_react.Component);

exports.default = Features;

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(91);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(2)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../node_modules/css-loader/index.js!./Separator.css", function() {
			var newContent = require("!!../../../../node_modules/css-loader/index.js!./Separator.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(95);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(2)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../node_modules/css-loader/index.js!./TapButton.css", function() {
			var newContent = require("!!../../../../node_modules/css-loader/index.js!./TapButton.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(97);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(2)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../node_modules/css-loader/index.js!./Features.css", function() {
			var newContent = require("!!../../../../node_modules/css-loader/index.js!./Features.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _SelectOption = __webpack_require__(99);

var _SelectOption2 = _interopRequireDefault(_SelectOption);

var _mobxReact = __webpack_require__(7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TapSelect = function (_Component) {
  _inherits(TapSelect, _Component);

  function TapSelect(props) {
    _classCallCheck(this, TapSelect);

    var _this = _possibleConstructorReturn(this, (TapSelect.__proto__ || Object.getPrototypeOf(TapSelect)).call(this, props));

    _this.state = {
      value: _this.props.value
    };
    return _this;
  }

  _createClass(TapSelect, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      __webpack_require__(34);
    }
  }, {
    key: 'listItemsComponentsComposer',
    value: function listItemsComponentsComposer(items) {
      var _this2 = this;

      return items.map(function (item, key) {
        return _react2.default.createElement(_SelectOption2.default, { key: key, item: item, store: _this2.props.store });
      });
    }
  }, {
    key: 'changeCountry',
    value: function changeCountry(e) {
      this.props.store.selectCountry(e.target.value);
    }
  }, {
    key: 'changeValue',
    value: function changeValue(e) {
      this.setState({
        value: e.target.value
      });
      this.props.onChange ? this.props.onChange() : null;
      this.props.customOnChangeFun ? this.props.customOnChangeFun(this.props.fieldKey, e) : null;
    }
  }, {
    key: 'removeSpacesfromLink',
    value: function removeSpacesfromLink(imageLink) {
      return imageLink ? imageLink.split(' ').join('%20') : imageLink;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      return _react2.default.createElement(
        _react2.default.Fragment,
        null,
        this.props.type && this.props.type === 'customSelect' ? _react2.default.createElement(
          'select',
          { className: this.props.withArrow ? 'selectWithArrow' + ' ' + 'tapSelect' : 'tapSelect',
            value: this.state.value,
            style: this.props.style,
            onChange: this.changeValue.bind(this) },
          _react2.default.createElement(
            'option',
            { value: this.props.value },
            this.props.value
          ),
          this.props.options.map(function (option, key) {
            return _react2.default.createElement(
              'option',
              { value: option.optionValue, key: key },
              option.optionValue
            );
          })
        ) : _react2.default.createElement(
          'select',
          { className: this.props.className,
            value: this.props.store.currentCountry.country_code,
            style: { backgroundImage: 'url(' + this.removeSpacesfromLink(this.props.store.currentCountry.country_flag_url) + ')' },
            onChange: function onChange(e) {
              return _this3.changeCountry(e);
            } },
          this.listItemsComponentsComposer(this.props.store.countries)
        )
      );
    }
  }]);

  return TapSelect;
}(_react.Component);

exports.default = (0, _mobxReact.observer)(TapSelect);

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(100);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(2)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../node_modules/css-loader/index.js!./TapSelect.css", function() {
			var newContent = require("!!../../../../node_modules/css-loader/index.js!./TapSelect.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(101);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(2)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../node_modules/css-loader/index.js!./TapInput.css", function() {
			var newContent = require("!!../../../../node_modules/css-loader/index.js!./TapInput.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(102);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(2)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../node_modules/css-loader/index.js!./lightBox.css", function() {
			var newContent = require("!!../../../../node_modules/css-loader/index.js!./lightBox.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 37 */
/***/ (function(module, exports) {

module.exports = require("node-fetch");

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(104);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(2)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../node_modules/css-loader/index.js!./CallToAction.css", function() {
			var newContent = require("!!../../../../node_modules/css-loader/index.js!./CallToAction.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(106);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(2)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../node_modules/css-loader/index.js!./slider.css", function() {
			var newContent = require("!!../../../../node_modules/css-loader/index.js!./slider.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(109);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(2)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../node_modules/css-loader/index.js!./productsBlocks.css", function() {
			var newContent = require("!!../../../../node_modules/css-loader/index.js!./productsBlocks.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "fonts/CRC25.otf";

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(11);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _windowOrGlobal = __webpack_require__(5);

var _windowOrGlobal2 = _interopRequireDefault(_windowOrGlobal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AnimatedRow = function (_Component) {
  _inherits(AnimatedRow, _Component);

  function AnimatedRow(props) {
    _classCallCheck(this, AnimatedRow);

    var _this = _possibleConstructorReturn(this, (AnimatedRow.__proto__ || Object.getPrototypeOf(AnimatedRow)).call(this, props));

    _this.state = {
      componentYPosition: 0,
      animation: 'animationNotStarted'
    };
    _this.handleScroll = _this.handleScroll.bind(_this);
    return _this;
  }

  _createClass(AnimatedRow, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      __webpack_require__(43);
    }
  }, {
    key: 'getBodyScrollTop',
    value: function getBodyScrollTop() {
      var el = document.scrollingElement || document.documentElement;
      return el.scrollTop;
    }
  }, {
    key: 'handleScroll',
    value: function handleScroll() {
      if (this.getBodyScrollTop() + 500 > this.state.componentYPosition) {
        this.setState({
          animation: this.props.animation
        });
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      _windowOrGlobal2.default.addEventListener("scroll", this.handleScroll);
      this.setState({
        componentYPosition: _reactDom2.default.findDOMNode(this).getBoundingClientRect().top
      });
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _windowOrGlobal2.default.removeEventListener("scroll", this.handleScroll);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var itemsInRow = this.props.itemsInRow ? this.props.itemsInRow : this.props.children.length;
      return _react2.default.createElement(
        'div',
        { className: 'animatedRow', style: this.props.style },
        this.props.children.map(function (child, key) {
          return _react2.default.createElement(
            _react2.default.Fragment,
            { key: key },
            _react2.default.createElement(
              'div',
              {
                key: key,
                className: _this2.props.animation ? _this2.props.fullWidthOnMobile ? 'fullWidthOnMobile ' + _this2.state.animation + ' animatedDiv' : _this2.state.animation + ' animatedDiv' : _this2.props.fullWidthOnMobile ? 'animatedDiv fullWidthOnMobile' : 'animatedDiv',
                style: { width: _this2.props.divWidth ? _this2.props.divWidth : 'calc( ' + (1 / itemsInRow * 100).toString() + '% - 10px )', margin: '5px' }
              },
              child
            ),
            _this2.props.itemsInRow && key + 1 === _this2.props.itemsInRow ? _react2.default.createElement('div', { className: _this2.props.fullWidthOnMobile ? 'noSpaceBetweenRowsOnMobile' : '', style: { height: _this2.props.spaceBetweenRows ? _this2.props.spaceBetweenRows : '20px' } }) : null
          );
        })
      );
    }
  }]);

  return AnimatedRow;
}(_react.Component);

exports.default = AnimatedRow;

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(111);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(2)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../node_modules/css-loader/index.js!./animatedRow.css", function() {
			var newContent = require("!!../../../../node_modules/css-loader/index.js!./animatedRow.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactSlick = __webpack_require__(45);

var _reactSlick2 = _interopRequireDefault(_reactSlick);

var _Title = __webpack_require__(10);

var _Title2 = _interopRequireDefault(_Title);

var _Separator = __webpack_require__(9);

var _Separator2 = _interopRequireDefault(_Separator);

var _Img = __webpack_require__(3);

var _Img2 = _interopRequireDefault(_Img);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TapCarouselSlider = function (_Component) {
  _inherits(TapCarouselSlider, _Component);

  function TapCarouselSlider(props) {
    _classCallCheck(this, TapCarouselSlider);

    var _this = _possibleConstructorReturn(this, (TapCarouselSlider.__proto__ || Object.getPrototypeOf(TapCarouselSlider)).call(this, props));

    _this.state = {};
    return _this;
  }

  _createClass(TapCarouselSlider, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      __webpack_require__(46);
    }
  }, {
    key: 'render',
    value: function render() {
      var _settings;

      var settings = (_settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      }, _defineProperty(_settings, 'dots', false), _defineProperty(_settings, 'autoplay', true), _defineProperty(_settings, 'autoplaySpeed', 4000), _settings);
      var ItemsInSlide = this.props.ItemsInSlide || 4;
      var arr = [];
      var subArr = [];

      {
        this.props.businesses.map(function (businesse, key) {
          key % ItemsInSlide === 0 ? subArr = [] : null;
          subArr.push(businesse);
          key % ItemsInSlide === 0 ? arr.push(subArr) : null;
        });
      }

      return _react2.default.createElement(
        'div',
        null,
        this.props.title ? _react2.default.createElement(_Title2.default, {
          title: this.props.title,
          separator: _react2.default.createElement(_Separator2.default, { width: '25%' })
        }) : null,
        _react2.default.createElement(
          _reactSlick2.default,
          settings,
          arr.map(function (arrayObj, key) {
            return _react2.default.createElement(
              'div',
              { key: key },
              arrayObj.map(function (businesse, key) {
                return _react2.default.createElement(
                  'a',
                  { href: businesse.businesseLink, target: '_blank', key: key },
                  _react2.default.createElement(_Img2.default, { className: 'TapCarouselSliderItem', src: businesse.businesseLogo, style: { width: 1 / ItemsInSlide * 100 + '%' } })
                );
              })
            );
          })
        )
      );
    }
  }]);

  return TapCarouselSlider;
}(_react.Component);

exports.default = TapCarouselSlider;

/***/ }),
/* 45 */
/***/ (function(module, exports) {

module.exports = require("react-slick");

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(112);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(2)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../node_modules/css-loader/index.js!./tapCarouselSlider.css", function() {
			var newContent = require("!!../../../../node_modules/css-loader/index.js!./tapCarouselSlider.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 47 */
/***/ (function(module, exports) {

module.exports = [{"product":"pay","title":{"en":"Bills? Paid. Subscriptions? Renewed.\nWorries? All Gone.","ar":"كل مدفوعاتك بدفعة واحدة"},"shortTitle":{"en":"Bills? Paid.\nWorries? All Gone.","ar":"مدفوعاتك\nفي دفعة واحدة!"},"actionType":"sms","placeholder":{"en":"Mobile Number","ar":"رقم الهاتف"},"buttonText":{"en":"Send a download link","ar":"أرسل رابط التحميل"},"linkText":{"en":"Download the app","ar":"حمّل التطبيق "},"link":{"ios":"https://itunes.apple.com/us/app/gopay!/id1020065700"}},{"product":"collect","title":{"en":"Start Sending Bills\nand Collect Payments Easily","ar":"أرسل الفواتير وحصّل مدفوعاتك بسهولة"},"shortTitle":{"en":"The ease of online\nbuilt for offline","ar":" الإستخدام أونلاين\nحتى عندما تكون أوفلاين"},"actionTitle":{"en":"Please enter your mobile number","ar":"الرجاء إدخال رقم هاتفك"},"actionType":"sms","placeholder":{"en":"Mobile Number","ar":"رقم الهاتف"},"buttonText":{"en":"Send a download link","ar":"أرسل رابط التحميل"},"linkText":{"en":"Download the app","ar":"حمّل التطبيق "},"link":{"ios":"https://itunes.apple.com/us/app/gocollect!/id1157951837?ls=1&mt=8","android":"https://play.google.com/store/apps/details?id=tap.gocollect"}},{"product":"sell","title":{"en":"Start Accepting Online Payments\non your App or Website","ar":"استقبل المدفوعات\nعلى التطبيق الخاص بك\nأو على موقعك الإلكتروني"},"shortTitle":{"en":"Start Accepting\nOnline Payments","ar":"استقبل المدفوعات\nعلى تطبيقك أو موقعك"},"shortTitle_":{"en":"Try the Tap advantage","ar":"جرّب مميّزات تاپ"},"actionType":"link","linkText":{"en":"Open an account","ar":"افتح حساباً"},"link":"/register"},{"product":"tap","title":{"en":"goTap\nGo Everywhere","ar":"goTap\nعملك في كل مكان"},"shortTitle":{"en":"goTap\nGo Everywhere","ar":"goTap\nعملك في كل مكان"},"actionType":"link","linkText":{"en":"Grab your device","ar":"اطلب جهازك"},"link":"/order"}]

/***/ }),
/* 48 */
/***/ (function(module, exports) {

module.exports = {"name":{"en":"Features","ar":"المميّزات"},"items":[{"product":"sell","categories":[{"categoryName":{"en":"Acceptance","ar":"قبول"},"showMoreButtonText":{"en":"more acceptance features","ar":"المزيد من مميزات القبول"},"showLessButtonText":{"en":"Show Less","ar":"أظهر أقل"},"items":[{"title":{"en":"Local, Regional & Global Card Acceptance","ar":"قبول البطاقات المحلية والإقليمية والدولية"},"subtitle":{"en":"Accept everything","ar":"نقبل جميع أنواع البطاقات"},"icon":"https://www.tap.company/websiteImages/productsFeaturesImages/goCollect/Icons/every-way-to-pay.png","description":{"en":"Through Tap, your customers now have the option of paying with their preferred local card, a regional card, or even with an international credit card. Our Charge API allows them to pay for any of your listed products and services in a snap. Whether that’s through KNET, Benefit, Mada, Sadad, Visa, MasterCard, or  American Express. From now on, the only thing you won’t accept is ‘no’ for an answer.","ar":"من خلال شركة تاب يستطيع عملائك اختيار طريقة  الدفع التي يفضلونها ، إما عن طريق بطاقاتهم المحلية أو الإقليمية ، أو حتى عن طريق بطاقة الإئتمان الدولية ، من خلال بوابة الدفع الإلكتروني من تاب للمطورين API تمكنهم من دفع قيمة أي من المنتجات والخدمات في لحظة ، سواء كانت عملية عن طريق  ( كي نت ، بنفت ، مدى ، سداد ، فيزا ، ماستر كارد أو أمريكان إكسبريس) ."},"image":"https://www.tap.company/websiteImages/productsFeaturesImages/general/Illustrations/all-payments.png"},{"title":{"en":"Charge","ar":"الرسوم"},"subtitle":{"en":"An API for the modern age","ar":"بوابة الدفع الإلكتروني للمطورين API تناسب العصر الحديث"},"icon":"https://www.tap.company/websiteImages/productsFeaturesImages/goSell/Icons/icon-Charge.png","description":{"en":"We’re proud to introduce the first and only technology that allows businesses to perform an online payment using a single API endpoint action for any type of local, regional, or global card payment in the MENA region. That means a much simpler development experience on the back-end, with a smoother customer experience on the front-end.","ar":"نحن فخورون لطرحنا التقنية الأولى و الوحيدة التي تسمح للشركات بتنفيذ عملية الدفع عبر الإنترنت بإستخدام بوابة الدفع الإلكتروني للمطورين  API لأي نوع من بطاقات الدفع المحلية ، الإقليمية أو الدولية داخل منطقة الشرق الأوسط وشمال أفريقيا ، هذا يعني أن عملية التطوير أكثر بساطة فيما يخص الواجهة النهائية ، وأكثر سلاسة للعميل  فيما يخص الواجهة الأمامية."},"image":"https://www.tap.company/websiteImages/productsFeaturesImages/goSell/Illustrations/goSell_Charge.png"},{"title":{"en":"Authorize","ar":"التصريح"},"subtitle":{"en":"Put your funds on lockdown","ar":"أمن على مدفوعاتك"},"icon":"https://www.tap.company/websiteImages/productsFeaturesImages/goSell/Icons/icon-Authotize.png","description":{"en":"Take control of your cash flow through our insured authorization process. Now you can block an amount on your supported cards to keep for later use, and you can insure higher customer satisfaction while performing online order fulfillments and logistics.","ar":"تحكم في أموالك عبر نظامنا الآمن ، يمكنك الآن الحجز على أموالك والاحتفاظ بها من أجل إستخدامها فيما بعد ، كما يمكنك ضمان رضاء العملاء أثناء تنفيذ شروط عملية الطلب وتجهيزاته عبر الإنترنت."},"image":"https://www.tap.company/websiteImages/productsFeaturesImages/goSell/Illustrations/goSell_Authorize.png"},{"title":{"en":"Multi-Currency","ar":"العملات المتعددة"},"subtitle":{"en":"Go international","ar":"التوجه إلى مستوى دولي"},"icon":"https://www.tap.company/websiteImages/productsFeaturesImages/goCollect/Icons/Multi_currency.png","description":{"en":"Tap’s payment gateways supports multi-currency charging for all GCC currencies plus the Egyptian Pound along with major global currencies such as the USD, Euro & GBP. You can be an international business-owner, right from where you are.","ar":"بوابة الدفع الخاصة بشركة تاب تدعم عملات متعددة ، جميع العملات الخليجية لدول مجلس التعاون ، بالإضافة إلى الجنيه المصري ، إلى جانب العملات الأجنبية كالدولار ، اليورو و الجنيه الإسترليني . وبذلك يمكنك أن تصبح صاحب أعمال وشركة تجارية دولية من المكان الذي تتواجد فيه."},"image":"https://www.tap.company/websiteImages/productsFeaturesImages/goSell/Illustrations/goSell_MultiCurrency.png"},{"title":{"en":"Dynamic Currency Converter (DCC)","ar":"محول العملات الديناميكي"},"subtitle":{"en":"On-the-spot conversions","ar":"تحويلات فورية"},"icon":"https://www.tap.company/websiteImages/productsFeaturesImages/goSell/Icons/icon-DCC.png","description":{"en":"Stay in the know about the latest currency conversion rate, without any extra research. Our payment gateways gives the business and the customer a chance to choose their currency of preference along with the currency conversion rate at the time of the transaction.","ar":"ابقى على معرفة بآخر أسعار تحويل العملات دون مزيد من البحث ، حيث أن شركة تاب توفر حرية اختيار العملة مصحوبة بسعر تحويل العملة وقت إجراء المعاملة."},"image":"https://www.tap.company/websiteImages/productsFeaturesImages/goSell/Illustrations/goSell_DCC.png"},{"title":{"en":"Card Saving","ar":"حماية البطاقة"},"subtitle":{"en":"Zoom through checkouts!","ar":"أمان سرعة عمليات الدفع!"},"icon":"https://www.tap.company/websiteImages/productsFeaturesImages/goSell/Icons/icon-Card-Saving.png","description":{"en":"Now you can give customers the option to save their card information once they complete a transaction. It’ll make for a speedy, easy, and super secure payment experience the next time they check out.","ar":"الآن يمكنك توفير خيارات حفظ بيانات البطاقة لعملائك بمجرد إتمام المعاملة ، وذلك سيجعل عملية الدفع في المرة التالية سريعة وسهلة وآمنة تماماً ."},"image":"https://www.tap.company/websiteImages/productsFeaturesImages/goSell/Illustrations/goSell_Card_Saving.png"},{"title":{"en":"Schedule","ar":"الموعد المحدد"},"subtitle":{"en":"Schedule tomorrow’s payments today","ar":"حدد الدفعة الآن وادفع لاحقاً"},"icon":"https://www.tap.company/websiteImages/productsFeaturesImages/goSell/Icons/icon-Schedule.png","description":{"en":"Got an advance payment coming up? Check it off your to-do list today by scheduling the payment in advance. You can even choose to authorize (block) the amount of the transaction before capturing it on a scheduled date.","ar":"هل لديك دفعة مقدمة ؟ تأكد من قائمة أعمال اليوم من خلال تحديد الدفع المقدم ، ويمكنك اختيار السماح بـ(حجز) مبلغ المعاملة قبل الحصول عليه في الموعد المحدد."},"image":"https://www.tap.company/websiteImages/productsFeaturesImages/goSell/Illustrations/goSell_Schedule.png"},{"title":{"en":"Subscriptions","ar":"الإشتراكات"},"subtitle":{"en":"Hassle free renewals","ar":"تجديدات خالية من المتاعب "},"icon":"https://www.tap.company/websiteImages/productsFeaturesImages/goSell/Icons/icon-Subscription.png","description":{"en":"Everyone loves a recurring service subscription. The only thing we don’t love? Having to hassle with the monthly renewals. That’s why we allow you to provide your customers with the option to auto-renew subscription payment services. They’ll get a seamless month-to-month service, and you’ll get paid on the fly.","ar":"الجميع يحب الإشتراك في الخدمات ، والشيء الوحيد الذي لا نحبه هو المتاعب الخاصة بتجديد الإشتراكات الشهرية، ولهذا السبب نسمح لك بتزويد العملاء بخيار التجديد التلقائي لخدمة الإشتراك الخاصة بالدفع ، حيث سوف يحصلون على خدمة شهرية سلسة وستستلم الدفعة فوراً."},"image":"https://www.tap.company/websiteImages/productsFeaturesImages/goSell/Illustrations/goSell_Subscription.png"}]},{"categoryName":{"en":"Integration","ar":"الدمج"},"showMoreButtonText":{"en":"more integration features","ar":"المزيد من مميزات الدمج"},"showLessButtonText":{"en":"Show Less","ar":"أظهر أقل"},"items":[{"title":{"en":"Single API Integration","ar":"API"},"subtitle":{"en":"For The Advanced Pros","ar":"للمحترفين"},"icon":"https://www.tap.company/websiteImages/productsFeaturesImages/goCollect/Icons/API.png","description":{"en":"If you’re looking for a little more customization on your Tap gateway, your own developer can easily access the API to make all the desired tweaks without a hitch. Our API documentation is simple to integrate and is available in multiple language codes including PHP, JAVA, and .NET.","ar":"إذا كنت تبحث عن إضفاء لمسة خاصة على حسابك في تاپ يمكن للمطوّر لديك الدخول إلى API لإجراء جميع التعديلات التي ترغب بها وتصميمها وفق رغباتك بسهولة فائقة. ملفات API الخاصة بنا بسيطة جداً ويسهل الإندماج فيها كما أنها متوفّرة بلغات رموز متعدّدة تتضمّن PHP ،JAVA و NET."},"image":"https://www.tap.company/websiteImages/productsFeaturesImages/general/Illustrations/API.png"},{"title":{"en":"Mobile SDK","ar":"حزمة أدوات تطوير برمجيات الهاتف"},"subtitle":{"en":"Your app + the power of Tap","ar":"التطبيق الخاص بك + قوة تاب"},"icon":"https://www.tap.company/websiteImages/productsFeaturesImages/goSell/Icons/icon-Mobile-SDK.png","description":{"en":"Building an iOS or Android app for your business? We’ll help you simplify your API integrations by adopting Tap’s Mobile SDK’s without the lengthy process of API implementation. Not only will it save you a ton of time and work but you’ll also get to take advantage of some powerful Tap features right out of the box. Features such as Local, Regional, & Global Card Acceptance; Multi-Currency; Dynamic Currency Converter (DCC); Card Saving; and Subscriptions.","ar":"هل تقوم بإنشاء تطبيق IOS و أندرويد لشركتك؟ سوف نساعدك في تسهيل إدماج واجهة برمجة التطبيقات الخاصة بك مع تطبيقات IOS  و أندرويد ، من خلال تبني حزمة أدوات تطوير برمجيات هاتف شركة تاب والتي من شأنها أن توفر عليك الكثير من الوقت ، كما ستحصل على ميزة الحصول على بعض الخصائص المبتكرة والقوية لشركة تاب ، فعلى سبيل المثال مميزات قبول البطاقة المحلية و الإقليمية و الدولية و العملات المتعددة وحول العملات الديناميكي وحماية البطاقة بالإضافة إلى الاشتراكات."},"image":"https://www.tap.company/websiteImages/productsFeaturesImages/goSell/Illustrations/goSell_MobileSDK.png"},{"title":{"en":"Beginner-Friendly Plugins","ar":"دمج فوري للمبتدئين"},"subtitle":{"en":"100% Newbie Proofed","ar":"ابتكار جديد 100%"},"icon":"https://www.tap.company/websiteImages/productsFeaturesImages/goCollect/Icons/API.png","description":{"en":"You don’t need to be a computer wizard to connect your website to Tap. An average person can easily activate our single-setup plugin within just a few minutes. Our plugin is 100% compatible with the world’s most popular e-commerce platforms and systems, including WordPress, Magento, OpenCart, PrestaShop, and Shopify. So all you have to worry about is selling awesome products.","ar":"ليس عليك أن تكون خبيراً في الكومبيوتر كي تصل موقعك الإلكتروني بتطبيق تاپ. فأي شخص عادي يمكنه تفعيل الشراكة بين الجهتين خلال دقائق معدودة. شبكتنا موصوله 100% مع أكبر منصات وبرامج العمليات المالية والتجارية الإلكترونية بما فيها، وورد برس، ماغينتو، أوبن كارت، بريستا شوب وشوبي في. لذا فإنّ كل ما عليك أن تقلق بشأنه هو بيع منتجات رائعة!"},"image":"https://www.tap.company/websiteImages/productsFeaturesImages/general/Illustrations/Plug-ins.png"}]},{"categoryName":{"en":"Operations","ar":"عمليات"},"showMoreButtonText":{"en":"more operations features","ar":"المزيد من مميزات العمليات"},"showLessButtonText":{"en":"Show Less","ar":"أظهر أقل"},"items":[{"title":{"en":"Receipts","ar":"الفواتير"},"subtitle":{"en":"Paper-free recordkeeping","ar":"الاحتفاظ بالسجلات"},"icon":"https://www.tap.company/websiteImages/productsFeaturesImages/goCollect/Icons/statements-and-receipt.png","description":{"en":"Your business has the option of sending an email or an SMS receipt to your customer after a successful payment. And if you need to access it later, it’ll be available on record for any historical purposes.","ar":"سوف تستمتع شركتك بالحصول على خيار إرسال إيصال الاستلام عبر رسائل البريد الإلكتروني أو خدمة الرسائل النصية القصيرة بعد إتمام عملية الدفع بنجاح، و إذا أردت الرجوع إليه في وقت لاحق سيكون متوفر ضمن السجلات المحفوظة."},"image":"https://www.tap.company/websiteImages/productsFeaturesImages/goSell/Illustrations/goSell_Receipts.png"},{"title":{"en":"Refunds","ar":"استرجاع الأموال"},"subtitle":{"en":"Super simple refunds","ar":"عملية استرجاع الأموال بسيطة للغاية"},"icon":"https://www.tap.company/websiteImages/productsFeaturesImages/goCollect/Icons/Refund.png","description":{"en":"Refunds have always been tricky business, but with goCollect it's an easy fix. A single click is all it takes. Not only does goCollect help you with the refunding process, but now you also have a detailed picture of all past refunds at a glance.","ar":"دائماً ما تكون عمليات إسترجاع الأموال موضوع معقد ولكن مع goCollect  أصبحت حلاً سهلاً ، فكل ما يتطلبه الأمر هو ضغطة واحدة ، goCollect  لا يساعدك في عملية إسترجاع الأموال فحسب بل يمكنك الآن الحصول على صورة مفصلة عن جميع عمليات استرجاع الأموال الأخيرة في لمحة سريعة."},"image":"https://www.tap.company/websiteImages/productsFeaturesImages/goSell/Illustrations/goSell_Refund_transparent.gif"},{"title":{"en":"Customers","ar":"العملاء"},"subtitle":{"en":"Keep your data organized","ar":"احفظ بياناتك بطريقة منظمة"},"icon":"https://www.tap.company/websiteImages/productsFeaturesImages/goSell/Icons/icon-Customer.png","description":{"en":"We let you link the payments performed by customers to a unique customer account. It’ll make managing future payments and providing customer support a lot easier to handle.","ar":"سنتيح لك ربط عمليات الدفع التي نفذها العميل بحساب مميز للعميل، و الذي من شأنه أن يدير عمليات الدفع المستقبلية ويوفر الدعم بسهولة  أكثر للعميل."},"image":"https://www.tap.company/websiteImages/productsFeaturesImages/goSell/Illustrations/goSell_Customer.png"},{"title":{"en":"Security","ar":"الحماية والأمان"},"subtitle":{"en":"100% Secure","ar":"حماية تثق بها"},"icon":"https://www.tap.company/websiteImages/productsFeaturesImages/goCollect/Icons/Security.png","description":{"en":"There’s nothing our team takes more seriously than keeping you and your business safe while using Tap. That’s why we’ve outfitted our entire system with banking-industry security levels and encryption protocols, as well as remaining compliant with global PCI DSS security standards. At Tap, we have an unwavering commitment to your peace of mind, and that starts with keeping your business completely safe online. That’s a promise.","ar":"فريق عملنا يضع في سلّم أولوياته حماية أعمالك عند استخدامك تاپ. لذلك أنشأنا برنامجنا تماماً وفقاً لمعايير السلامة البنكية وبروتوكول الحماية المتعارف عليه كما أننا ندعم معايير السلامة العالمية وفق برنامج PCI DSS. في تاپ، نلتزم براحة بالك ونعرف جيّدا ً أن تحقيق ذلك يبدأ بضمان سلامة أعمالك الإلكترونية وحمايتها. وهذا وعدنا."},"image":"https://www.tap.company/websiteImages/productsFeaturesImages/general/Illustrations/Security.png"}]},{"categoryName":{"en":"My Account","ar":"حسابي"},"showMoreButtonText":{"en":"more account features","ar":"المزيد من مميزات الحساب"},"showLessButtonText":{"en":"Show Less","ar":"أظهر أقل"},"items":[{"title":{"en":"Flexible Banking Options","ar":"خيارات بنكية مرنة"},"subtitle":{"en":"Well Connected & Well Served","ar":"تواصل وخدمة مميّزة"},"icon":"https://www.tap.company/websiteImages/productsFeaturesImages/general/Icons/Flexible-banking.png","description":{"en":"Tap is connected with every single bank in Kuwait. That means you can easily link your Tap gateway to your favorite bank account and start receiving payments instantly. You also have total freedom to switch from one bank to another anytime you wish while using Tap. No hold up, no grunt work, and absolutely no obligations.","ar":"يرتبط تاپ مع جميع البنوك العاملة في الكويت وهذا يعني أنه بإمكانك استخدام تاپ كوسيلة لدخول حسابك المصرفي وتحويل الأموال مباشرة إلى رصيدك. كما يمكنك الانتقال من أي مصرف إلى آخر عبر استخدامك تاپ. لا انتظار، لا عمل مضني ولا التزامات."},"image":"https://www.tap.company/websiteImages/productsFeaturesImages/general/Illustrations/Flexible-Banking-Options.png","partner":"none"},{"title":{"en":"Same Day Activation","ar":"تفعيل في اليوم نفسه"},"subtitle":{"en":"Start Selling Now","ar":"ابدأ بيع منتجاتك الآن"},"icon":"https://www.tap.company/websiteImages/productsFeaturesImages/goCollect/Icons/Same-Day-Activation.png","description":{"en":"Set up, connect, and collect payment in less than 24 hours. Our online registration system smoothly guides you through all the required steps, and helps you get your online payments collection service up and running in record time. A little more old-school? No problem. Our team of dedicated onboarding assistants is happy to get on the phone with you or through our live chat and get you activated as soon as possible.","ar":"أنشىء حسابك، تواصل وابدأ ببيع منتجك خلال 24 ساعة فقط. فبرنامج التسجيل السلس يرشدك إلى إنجاز جميع الخطوات بسهولة وسرعة ويساعدك على الحصول على مستحقاتك المالية في وقت غير مسبوق. تشعر بأن كل ذلك جديد بالنسبة إليك؟ لا تقلق. طاقمنا من المساعدين المكرّس لخدمتك سيسعده التحدث معك وإتمام عملية تفعيل حسابك بأسرع وقت ممكن."},"image":"https://www.tap.company/websiteImages/productsFeaturesImages/general/Illustrations/Same-Day-Activation.png"},{"title":{"en":"Statements & Receipts","ar":"كشف الحساب والإيصالات"},"subtitle":{"en":"Half The Paperwork, Double The Efficiency","ar":"فعالية أكثر بمعاملات أقل"},"icon":"https://www.tap.company/websiteImages/productsFeaturesImages/goCollect/Icons/statements-and-receipt.png","description":{"en":"Tap’s user dashboard gives you full access to your entire payment and collections history, and provides soft copies of all your receipts for easy printing. All you have to do is login on our website by inserting your email and password to access for your dashboard. You can now download your statement or save it as a PDF.","ar":"يمكنك بفضل لوحة التحكم بحسابك الدخول إلى تاريخ العمليات بالكامل والحصول على نسخ إلكترونية من إيصالاتك التي يسهل طباعتها. الآن أصبح بإمكانك توفير الوقت والجهد من المعاملات والأوراق الكثيرة واستبدال ذلك بإنتاجية أكبر. إنّها صفقة رابحة للجميع: لك وللبيئة على السواء."},"image":"https://www.tap.company/websiteImages/productsFeaturesImages/general/Illustrations/Statements-&-Receipts.png"},{"title":{"en":"Analytics & History","ar":"إحصائيات للمبيعات"},"subtitle":{"en":"Data That Matters To Business","ar":"البيانات التي تفيد أعمالك"},"icon":"https://www.tap.company/websiteImages/productsFeaturesImages/goCollect/Icons/Analytics-&-History.png","description":{"en":"Tap’s analytics dashboard can tell you what’s driving the most effective sales outcomes for your business and what areas you need to focus on most. We also organize each customer’s payment history for you to review in detail whenever you need it. We’ll bring the tools; you bring the drive.","ar":"تقدّم لك لوحة التحكم بحساب تاپ تحليلات تخبرك بأكثر العمليات التسويقية تأثيراً لجهة الدخل في السوق وما هي المجالات التي عليك التركيز عليها أكثر. كما ننظم تاريخ دفوعات كل عميل لديك كي تتمكن من الاطلاع عليها بالتفصيل في أي وقت. نحن نؤمّن لك كل الوسائل لتنطلق…وأنت عليك أن تقود."},"image":"https://www.tap.company/websiteImages/productsFeaturesImages/general/Illustrations/Analytics-&-History.png"},{"title":{"en":"All Businesses Welcome","ar":"جميع الأعمال التجارية"},"subtitle":{"en":"The big, the small, and the in-between","ar":"الصغيرة، الكبيرة والمتوسطة"},"icon":"https://www.tap.company/websiteImages/productsFeaturesImages/goCollect/Icons/All-Businesses-Welcome.png","description":{"en":"At Tap, everyone’s welcome. Our system is built to fit the unique needs and demands of every business, regardless of size or operations. Among our list of favorite Tap users you’ll find mega-giants right alongside some awesome micro businesses, SME’s or Tech Startups. Ready to jump on-board?","ar":"أهلاً بالجميع في تاپ. برنامجنا مصمم ليلائم احتياجات ومتطلبات جميع الشركات بغض النظر عن حجم المؤسسة وطبيعة عملها. ستجد ضمن قائمة عملائنا المفضّلين OSN ،VIVA ،Bein Sports إلى جانب العديد من المؤسسات المنزلية الصغيرة والمجلات أو المطبوعات الإلكترونية مثال مجلة Khaleejesque ،The WalK In Closet و Cake District. مستعد للإنضمام إلينا؟"},"image":"https://www.tap.company/websiteImages/productsFeaturesImages/general/Illustrations/All-Businesses-Welcome.png","partner":"none"},{"title":{"en":"Dedicated Support","ar":"دعم مخصّص"},"subtitle":{"en":"Questions? Don’t Be Shy","ar":"لديك أسئلة؟ لا تتردّد"},"icon":"https://www.tap.company/websiteImages/productsFeaturesImages/goCollect/Icons/Dedicated-Support.png","description":{"en":"Whether it’s set-up, integration, or follow-through—if you’ve ever got a problem, you can count on Tap for the solution. We do our best to make sure that you can keep working at your best. As your dedicated support team, we’re always here for you—just try us. You can easily reach out to our team using the live chat on our website (or in the goCollect application), email us or call us! ","ar":"سواء أردت إنشاء حساب، دمج أو متابعة حسابك – أو واجهتك أي مشكلة يمكنك الاعتماد علينا، فنحن في تاپ نقدّم لكل مشكلة حل لنضمن استمرارية عملك بأفضل حال. طاقمنا المكرّس لخدمتك مستعد دائماً لمساعدتك. جرّبنا."},"image":"https://www.tap.company/websiteImages/productsFeaturesImages/general/Illustrations/Support.png"},{"title":{"en":"Multiple User Accounts","ar":"حساب لمستخدمين متعددين"},"subtitle":{"en":"Team Friendly Systems","ar":"الوصول إلى حساباتك في مكان واحد"},"icon":"https://www.tap.company/websiteImages/productsFeaturesImages/goCollect/Icons/Multi-account.png","description":{"en":"Big team? No worries! Now you can give multiple users access to your account and allow each team member the power to perform their payment activities separately. You’ll still have a complete overview of all the user activity as the admin.","ar":"لا داعي للقلق إذا كان فريق العمل كبير! الآن يمكنك السماح للعديد من المستخدمين من الوصول إلى حسابك، والسماح لكل عضو من الفريق القيام بعملية الدفع بشكل مستقل أو منفصل، وبما أنك المشرف سيكون لك صلاحية الإطلاع على أنشطة المستخدمين."},"image":"https://www.tap.company/websiteImages/productsFeaturesImages/goSell/Illustrations/goSell_Multi_user_account.png"}]},{"categoryName":{"en":"Protect","ar":"حماية"},"showMoreButtonText":{"en":"more protect features","ar":"المزيد من مميزات الحماية"},"showLessButtonText":{"en":"Show Less","ar":"أظهر أقل"},"items":[{"title":{"en":"Risk","ar":"المخاطر"},"subtitle":{"en":"Hyper intelligent risk detection","ar":"اكتشاف المخاطر بذكاء!"},"icon":"https://www.tap.company/websiteImages/productsFeaturesImages/goSell/Icons/icon-risk.png","description":{"en":"Our robust solution detects all the necessary risk measures that need to be taken while performing transactions and identifies the risk level of every transaction -- whether it was made on mobile, tablet or PC. Not only that, but it adapts and evolves it’s intelligence mechanisms based on the behaviour of your business over time. It’s a security system you can count on no matter what.","ar":"الحل القوي الذي نقدمه يكتشف جميع التدابير اللازمة فيما يخص المخاطر التي يجب تجنبها أثناء تنفيذ المعاملات، كما يحدد مستوى الخطورة الخاص بكل معاملة ، سواء تم إجرائها من الهاتف أو التابلت أو الحاسوب الشخصي، وليس هذا فحسب يكيف ويطور آليات الذكاء الخاصة به استناداً إلى نظام عمل شركتك بمرور الوقت ، إنه نظام أمان يمكن الإعتماد عليه."},"image":"https://www.tap.company/websiteImages/productsFeaturesImages/goSell/Illustrations/goSell_Risk.png"},{"title":{"en":"Protection","ar":"الحماية"},"subtitle":{"en":"Above and beyond security","ar":"ما وراء الحماية!"},"icon":"https://www.tap.company/websiteImages/productsFeaturesImages/goSell/Icons/icon-Protection.png","description":{"en":"In addition to risk detection, our safeguarding tools have the option to process risk-free transactions, and to automatically prevent payments that cross the permitted risk levels. We’re even happy to send over a specialized team from Tap to assist your business in protecting against cyber payment fraud, for that extra level of safety and assurance. ","ar":"بالإضافة إلى اكتشاف المخاطر فإن أدوات الحماية الخاصة بنا تحتوي على خيار إدارة معاملات خالية من المخاطر، كما أنها تلقائياً تمنع عمليات الدفع التي تتجاوز مستويات الخطورة المسموح بها، ويسعدنا أن نرسل فريق متخصص من شركة تاب لمساعدة شركتك في الحماية من الاحتيال الإلكتروني لعمليات الدفع و الوصول إلى هذا المستوى من الأمان والثقة."},"image":"https://www.tap.company/websiteImages/productsFeaturesImages/goSell/Illustrations/goSell_Protection.png"},{"title":{"en":"Authentication","ar":"التحقق"},"subtitle":{"en":"Be 100% Assured","ar":"كن متأكداً 100%!"},"icon":"https://www.tap.company/websiteImages/productsFeaturesImages/goSell/Icons/icon-Authentication.png","description":{"en":"In high-risk payment situation, customer identity can be required in order to validate specific types of transactions. Our authentication process protects you from potential fraud attempts by giving you time to check with a customer’s ID, whenever a high-risk situation arises.","ar":"خلال عمليات الدفع شديدة الخطورة يجب  طلب هوية العميل من أجل التأكد من أنواع المعاملات المحددة ، وتقوم عملية التحقق الخاصة بنا بحمايتك من محاولات الاحتيال المحتملة عن طريق إعطائك الوقت للتأكد من هوية العميل في حال ظهور موقف شديد الخطورة."},"image":"https://www.tap.company/websiteImages/productsFeaturesImages/goSell/Illustrations/goSell_Authentication.png"},{"title":{"en":"Card","ar":"بطاقة الدفع"},"subtitle":{"en":"Advanced Card Monitoring","ar":"التحكم في بطاقات الدفع"},"icon":"https://www.tap.company/websiteImages/productsFeaturesImages/goSell/Icons/icon-Card.png","description":{"en":"As more people are exposed to theft and fraud, risk can extend to different types of cards as well. Our card risk activity monitor helps us manage trusted sources of funds via cards that are issued locally, regionally, and globally including debit, credit, prepaid & charge cards, and e-wallets. It keeps us one step ahead of any oncoming security threats.","ar":"نظراً لأن العديد من الأشخاص يتعرضون لعمليات سرقة واحتيال، يمكن أن تمتد الخطورة إلى أنواع مختلفة من بطاقات الدفع على حد سواء، يساعدنا التحكم في نشاط خطورة بطاقة الدفع الخاص بنا في إدارة مصادر الأموال الموثوقة عبر بطاقة الدفع الصادرة محلياً أو إقليمياً أو دولياً، بما في ذلك بطاقات السحب والإيداع، والدفع المسبق، والخصم بالإضافة إلى الحوافظ الإلكترونية، ويحافظ على بقائنا متقدمين بخطوة على تهديدات الأمن القادمة."},"image":"https://www.tap.company/websiteImages/productsFeaturesImages/goSell/Illustrations/goSell_Card.png"},{"title":{"en":"Product","ar":"المنتج"},"subtitle":{"en":"Automatically secure payments","ar":"عمليات دفع آمنة تلقائياً"},"icon":"https://www.tap.company/websiteImages/productsFeaturesImages/goSell/Icons/Product.png","description":{"en":"Additional measures of risk can be associated with intangible items or financial digital tools. In that case, secure payment settings are automatically enabled -- all based on the type of products and related sales behavior within the business.","ar":"يمكن أن تكون التدابير الإضافية للخطورة مصحوبة بعناصر غير ملموسة أو أدوات مالية رقمية، وفي هذه الحالة يتم تفعيل إعدادات الدفع الآمن تلقائياً التي تعتمد على نوع المنتجات وسلوك عمليات البيع ضمن الأعمال."},"image":"https://www.tap.company/websiteImages/productsFeaturesImages/goSell/Illustrations/goSell_Product2.png"},{"title":{"en":"IP Address","ar":"عنوان IP"},"subtitle":{"en":"Location-based sale options","ar":"خيارات البيع المعتمد على الموقع"},"icon":"https://www.tap.company/websiteImages/productsFeaturesImages/goSell/Icons/icon-IP-Address.png","description":{"en":"All of our transactions are channeled through IP addresses. As a business owner, you have the power to permit and block the sales channels of your choice according to the location of your customers.","ar":"يتم تحويل جميع معاملاتنا عبر قنوات عناوين بروتوكول الإنترنت، وكصاحب شركة فأنت تمتلك قوة السماح بقنوات البيع أو منعها حسب اختيارك وفقاً لموقع العميل."},"image":"https://www.tap.company/websiteImages/productsFeaturesImages/goSell/Illustrations/goSell_IP_Address.png"},{"title":{"en":"Billing Address","ar":"عنوان دفع الفواتير"},"subtitle":{"en":"Better address verifications","ar":"تحقق أفضل من العناوين"},"icon":"https://www.tap.company/websiteImages/productsFeaturesImages/goSell/Icons/icon-Billing-address.png","description":{"en":"Tap gives you the power to reduce risk possibility by requiring the verification of billing addresses associated with your customer’s card. This feature is available to cardholders in specific regions such as the US.","ar":"تمنحك شركة تاب قوة تقليل المخاطر المحتملة عن طريق طلب التحقق من عناوين دفع الفواتير المصاحبة لبطاقة الدفع الخاصة بالعميل، هذه الميزة متوفرة لأصحاب البطاقات داخل مناطق معينة مثل الولايات المتحدة الأمريكية."},"image":"https://www.tap.company/websiteImages/productsFeaturesImages/goSell/Illustrations/goSell_Billing_Address.png"}]},{"categoryName":{"en":"Device","ar":"الجهاز"},"showMoreButtonText":{"en":"more device features","ar":"المزيد من مميزات جهازي"},"showLessButtonText":{"en":"Show Less","ar":"أظهر أقل"},"partners":["zain"],"items":[{"title":{"en":"Router","ar":"الراوتر"},"subtitle":{"en":"Online, all the time","ar":"متصل بالإنترنت في جميع الأوقات"},"icon":"https://www.tap.company/websiteImages/productsFeaturesImages/goSell/Icons/icon-Router.png","description":{"en":"Zain will set you and your entire team up with a high speed WiFi router device to keep everyone in the office connected -- all day, every day. You’ll never have to worry about losing a connection as long as you work.","ar":"ستقوم شركة زين بتزويدك أنت وفريق عملك بجهاز راوتر ( واي فاي ) من أجل إبقاء جميع المتواجدين في المكتب متصلين بالإنترنت طوال اليوم، ولن تضطر للقلق بشأن قطع الإتصال طوال فترة عملك."},"image":"https://www.tap.company/websiteImages/productsFeaturesImages/goSell/Illustrations/Zain_Sell_Router.png"},{"title":{"en":"Wifi","ar":"الواي فاي"},"subtitle":{"en":"Everyone’s covered","ar":"يغطي جميع الأجهزة الإلكترونية "},"icon":"https://www.tap.company/websiteImages/productsFeaturesImages/goSell/Icons/icon-Wifi.png","description":{"en":"When it comes to Zain’s WiFi coverage, everyone’s getting a good deal. Go ahead and enjoy office WiFi coverage for up to 100 users at the same time.","ar":"عندما يتعلق الأمر بتغطية الواي فاي التابعة لشركة زين فالجميع يحصل على تعامل رائع، تابع واستمتع بتغطية الواي فاي الذي يصل إلى 100 مستخدم في وقت واحد."},"image":"https://www.tap.company/websiteImages/productsFeaturesImages/goSell/Illustrations/Zain_Sell_Wifi.png"},{"title":{"en":"LTE","ar":"LTE"},"subtitle":{"en":"Turbo-powered Internet","ar":"إنترنت قوي"},"icon":"https://www.tap.company/websiteImages/productsFeaturesImages/goSell/Icons/icon-LTE.png","description":{"en":"With Zain’s 500GB of storage and high speed LTE internet, you’ll never miss a beat of work again. After all, business travels fast -- so why shouldn’t you?","ar":"مع شركة زين بسعة تخزين حجمها 500 جيجا بايت وسرعة انترنت LTE، لن يفوتك ضرب من العمل مرة أخرى، الأعمال تتطور بسرعة ، ويجب عليك ذلك أيضا."},"image":"https://www.tap.company/websiteImages/productsFeaturesImages/goSell/Illustrations/goSell_LTE.png"}]}]},{"product":"collect","categories":[{"categoryName":{"en":"Send Bills","ar":"إرسال الفواتير"},"showMoreButtonText":{"en":"Simple Mobile Billing","ar":"المزيد من مميزات إرسال الفواتير"},"showLessButtonText":{"en":"Show Less","ar":"أظهر أقل"},"items":[{"title":{"en":"Send Bills","ar":"إرسال فاتورة"},"subtitle":{"en":"Super Simple Billing","ar":"إنشاء أسهل وتحصيل أسرع"},"icon":"https://www.tap.company/websiteImages/productsFeaturesImages/goCollect/Icons/Send-bill.png","description":{"en":"Welcome to the world of 2-step billing. All you’ve got to do is click the ‘+’ sign (or give your phone a little shake!), input your bill amount… and voila! Your bill’s all ready to send.","ar":"يمكنك إرسال الفواتير إلى عملائك وتحصيل مدفوعاتك بشكل محترف وسهل وسريع عبر تطبيق goCollect بخطوتين فقط! قم بإدخال مبلغ الفاتورة والوصف أولاً، ومن ثم قم بإدخال بيانات العميل وإرسال الفاتورة بكل سهولة. وعندها سيستلم العميل رسالة نصية قصيرة (SMS) و/ أو بريداً الكترونياً من تاب يحتويان على تفاصيل الفاتورة مع رابط يوفِّر لعملائك خيارات دفع متعددة."},"image":"https://www.tap.company/websiteImages/productsFeaturesImages/goCollect/Illustrations/Send_a_bill.png"},{"title":{"en":"Share a Bill","ar":"مشاركة الفاتورة"},"subtitle":{"en":"Custom-Built Sharing for a Custom-Built Business","ar":"تعدد الخيارات لمرونة أكبر"},"icon":"https://www.tap.company/websiteImages/productsFeaturesImages/goCollect/Icons/Share.png","description":{"en":"With goCollect you can send your bills your way. Email, Messages, WhatsApp, Viber, Facebook — goCollect’s integrated with all your favorite communication apps for you to share from. Even better? We repopulate the bill’s content for your purposes and allow you to edit it however you like.","ar":"تم إعداد آلية إرسال الفواتير عبر تطبيق goCollect لتتلاءم مع جميع وسائل التواصل لمشاركة الفواتير مع العملاء. فيمكنك مشاركة الفاتورة عبر وسائل التواصل المختلفة مثل (البريد الإلكتروني – الواتس آب – فايبر – تويتر – فيسبوك – ماسنجر – إلخ…)، وأيضاً يمكنك تعديل نص الرسالة إن شئت، لمرونة وسهولة أكثر."},"image":"https://www.tap.company/websiteImages/productsFeaturesImages/goCollect/Illustrations/Share_bill.png"},{"title":{"en":"Select from Contacts","ar":"اختر من جهات الاتصال"},"subtitle":{"en":"Bye-Bye Manual. Hello Automated.","ar":"إدخال سريع لوقت أوفر"},"icon":"https://www.tap.company/websiteImages/productsFeaturesImages/goCollect/Icons/Contacts.png","description":{"en":"Already got your client’s contact info saved in your address book? Shave off valuable time by importing their info into your bill with one click. Bye-bye manual entry.","ar":"لا حاجة بعد الآن لإدخال الاسم، ورقم الهاتف، والبريد الإلكتروني للعميل يدويًا، إذ يمكنك من خلال تطبيق goCollect إرسال الفاتورة عن طريق إدخال مبلغ الفاتورة والوصف ثم اختيار أي جهة من جهات قائمة الاتصال المخزنة بهاتفك، ومن ثم إرسالها بضغطة واحدة."},"image":"https://www.tap.company/websiteImages/productsFeaturesImages/goCollect/Illustrations/Select_a_contact.png"},{"title":{"en":"Items","ar":"منتجاتك"},"subtitle":{"en":"Product Listings You’ll Love","ar":"في قائمة واحدة"},"icon":"https://www.tap.company/websiteImages/productsFeaturesImages/goCollect/Icons/items.png","description":{"en":"When it comes to doing business online, saving time definitely counts. goCollect built-in product features makes sending you invoices easier and quicker than ever before. Now you can add all your products with their names, descriptions, prices and images, which you can even import from your Instagram to your items list on your goCollect application. When sending a bill, you will just need to tap the item to be added to your bill. And that’s it.","ar":"مُمارسة الأعمال التجارية عبر الإنترنت بالتأكيد تطلب توفير الوقت، لذلك صُمم goCollect ليساعدك على إرسال فواتيرك بشكلٍ أسهل وأسرع من أي وقتٍ مضى. والآن تستطيع وضع جميع مُنتَجاتك على goCollect، وضم كل ما يتعلق بها من (أسماء – أوصاف – أسعار) مع الصور التي يمكنك استيرادها من حسابك على انستقرام. عند إرسال فاتورة لن تحتاج أكثر من اختيار المُنتج من قائمة مُنتجاتك!"},"image":"https://www.tap.company/websiteImages/productsFeaturesImages/goCollect/Illustrations/Items.png"},{"title":{"en":"Send Bills Abroad","ar":"إرسل الفواتير إلى الخارج"},"subtitle":{"en":"Go Global","ar":"توسع بأعمالك دون حدود"},"icon":"https://www.tap.company/websiteImages/productsFeaturesImages/goCollect/Icons/Send-bills-abroad.png","description":{"en":"You can now send bills internationally, no matter where your clients are, you’ve got the power to send them a bill right to their phones. Just punch in their country code and goCollect will do the rest! Your clients can process a payment using any credit card such as VISA, MasterCard or American Express.","ar":"يمكنك الآن التوسع عالميا وتلبية طلبات عملائك في الدول المختلفة وإدارة أعمالك ضمن نطاق عالمي! فقط أدخل رقم الهاتف الخاص بالعميل في الخارج، وسوف يتم إرسال الفاتورة عن طريق رسالة نصية قصيرة (SMS) تحتوي على رابط الدفع عبر تطبيق goCollect."},"image":"https://www.tap.company/websiteImages/productsFeaturesImages/goCollect/Illustrations/Send_Bills_Abroad.png"},{"title":{"en":"Multi-Currency","ar":"عملات متعددة"},"subtitle":{"en":"Bill Them Worldwide","ar":"اختار العُملة المناسبة لفواتيرك"},"icon":"https://www.tap.company/websiteImages/productsFeaturesImages/goCollect/Icons/Multi_currency.png","description":{"en":"When you’re an international company receiving orders from all around the world, it helps to have an online payment solution provider that can keep up with all your multi-currency transaction needs. Our simple mobile billing system makes it easier than ever for you to choose the currency that you’d like your bills and displayed items to appear in, and lets you convert prices from one currency to another on the spot.","ar":"خروج أعمالك من نطاقها المحلي دليل على النجاح، ونحن نريد أن نساعدك في تحقيق المزيد، goCollect يُسهل عليك عملية اختيار العُملة المناسبة لفواتيرك، مع ظهور عناصر الفاتورة أيضاً. وسيكون بإمكانك تحويل أسعار الفواتير من عملة إلى أخرى بحرّية ومرونة فائقة."},"image":"https://www.tap.company/websiteImages/productsFeaturesImages/goCollect/Illustrations/multi-currancy_480.png"},{"title":{"en":"Copy a Bill’s Link","ar":"نسخ رابط الفاتورة"},"subtitle":{"en":"Copy In A Flash","ar":"تواصل بكل الطرق"},"icon":"https://www.tap.company/websiteImages/productsFeaturesImages/goCollect/Icons/copy-link.png","description":{"en":"Copying the link to your bill couldn’t be easier. Just ‘Tap & Hold’ the link of your bill and goCollect will automatically copy it onto your clipboard for you to paste wherever you like on WhatsApp, email, SMS or any other channel.","ar":"يمكنك نسخ رابط الفاتورة بعد إرسالها، عن طريق الضغط باستمرار على رابط الفاتورة، ومن ثم يمكنك حفظة أو إرسالة مرة أخرى بطريقة مختلفة (واتس آب) إلى العميل بكل سهولة."},"image":"https://www.tap.company/websiteImages/productsFeaturesImages/goCollect/Illustrations/Copy_link.png"},{"title":{"en":"Duplicate a Bill","ar":"تكرار فاتورة"},"subtitle":{"en":"The Same Bill, in Half the Time","ar":"وقت أقل، مبيعات أكثر"},"icon":"https://www.tap.company/websiteImages/productsFeaturesImages/goCollect/Icons/Duplicate-bill.png","description":{"en":"Now you can easily duplicate invoices for different customers, to save time when sending a bill from the goCollect application. A duplicate invoice picks up all the details you’ve already entered, so all you have to do is review it and send it by SMS, email, WhatsApp or on any other social media platform.","ar":"يمكنك تكرار أي فاتورة عبر تطبيق goCollect من خلال الضغط على الفاتورة المراد تكرارها ثم اختيار أمر “تكرار الفاتورة” من ميزة العمليات السريعة، وذلك لاستخدام نفس تفاصيل تلك الفاتورة كالمبلغ والوصف، حيث يمكنك المراجعة والإطلاع على تلك التفاصيل أولًا ومن ثم تستطيع إرسال الفاتورة إلى أي عميل آخر دون عناء أو جهد."},"image":"https://www.tap.company/websiteImages/productsFeaturesImages/goCollect/Illustrations/Duplicate.png"},{"title":{"en":"Send to Multiple People","ar":"إرسال الفاتورة لعدة عملاء"},"subtitle":{"en":"Bring Customers Together","ar":"مزيد من الإنجازات لسوق أكبر"},"icon":"https://www.tap.company/websiteImages/productsFeaturesImages/goCollect/Icons/Multi-bills.png","description":{"en":"If you need to collect the same payment amount from multiple people, like for event tickets or a charity fund, goCollect’s got you covered there as well! Just create a standard bill, then select the ‘Multiple’ option at the bottom left corner of the screen, add the number of payers (control your inventory!) and you’re set. All you have to do is share the link of the bill and your customers can fill out their own contact and payment info — no matter how many they are.","ar":"في تطبيق goCollect يوجد خاصية لإنشاء وإرسال فاتورة معينة لعدة عملاء في نفس الوقت! وذلك من خلال إدخال المبلغ المطلوب، والوصف، ثم الضغط على العديد من العملاء وإرسال الفاتورة ورابط الدفع عبر جميع تطبيقات التواصل مع العملاء مثل (البريد الإلكتروني – الرسائل النصية – الواتس آب – فايبر – تويتر – فيسبوك – ماسنجر – الخ..) ومن ثم يقوم العميل بفتحه وإدخال المعلومات الخاصة به (الاسم – رقم الهاتف – البريد الإلكتروني) لإتمام عملية الدفع بكل سهولة."},"image":"https://www.tap.company/websiteImages/productsFeaturesImages/goCollect/Illustrations/Send_to_Multiple_People.png"}]},{"categoryName":{"en":"Manage Bills","ar":"تنظيم الفواتير"},"showMoreButtonText":{"en":"more manage bill features","ar":"المزيد من مميزات تنظيم الفواتير"},"showLessButtonText":{"en":"Show Less","ar":"أظهر أقل"},"items":[{"title":{"en":"My Bills","ar":"فواتيري"},"subtitle":{"en":"Where The Magic Starts","ar":"نظرة سريعة، معلومات فعالة"},"icon":"https://www.tap.company/websiteImages/productsFeaturesImages/goCollect/Icons/my-bills.png","description":{"en":"With goCollect, you work smarter. Start with the ‘My Bills’ portal for a quick, comprehensive glance of all your sent bills and a real-time tracking on each invoice. You can even start a new bill using the application’s ‘Quick Actions’ module. You’ll love the convenience.","ar":"التفاصيل الصغيرة مهمة لجعل حياتك العملية أسهل مهما كان حجم مبيعاتك، يمكنك الحصول على نظرة سريعة ومرتبة مع الكثير من المعلومات الفعالة للفواتير المرسلة في قائمة “فواتيري” الرئيسية عبر تطبيق goCollect، وذلك طبقاً لتوقيت وتاريخ آخر تحديث تم لكل فاتورة على حدة. لديك الآن خيارات أكثر لعرض وفلترة قائمة الفواتير المرسلة إلى عملائك ومعلومات أقوى لتساعدك على تحصيل أموالك بشكل إحترافي وبسيط."},"image":"https://www.tap.company/websiteImages/productsFeaturesImages/goCollect/Illustrations/My_bills.png"},{"title":{"en":"My Payments","ar":"مدفوعاتي"},"subtitle":{"en":"At-A-Glance Updates","ar":"كل ما تريدة في قائمة واحدة"},"icon":"https://www.tap.company/websiteImages/productsFeaturesImages/goCollect/Icons/My-Payments.png","description":{"en":"With goCollect push notifications & emails, you’ll know instantly whenever a new bill is paid, and the minute the money is in your bank account — cha-ching! For a bigger overview, you’ll also get to see all your paid bills directly from the app under ‘My Bills’, organized by date received. And if you’re looking for a specific bill? You can search for it right from ‘My Payments’ too.","ar":"يمكنك تصنيف الفواتير المرسلة في قائمة “فواتيري” لعرض قائمة بجميع الفواتير المدفوعة فقط! حيث يتم ترتيبها أتوماتيكياً وفقاً لتاريخ الدفع لكل فاتورة. كما يمكنك أيضاً البحث في قائمة الفواتير المدفوعة عن فواتير معينة تحت اسم العميل، أو رقم الهاتف الخاص به أو رقم الفاتورة لعرض الفواتير ذات الصلة لبحثك."},"image":"https://www.tap.company/websiteImages/productsFeaturesImages/goCollect/Illustrations/My_payments.png"},{"title":{"en":"View a Bill","ar":"عرض الفاتورة"},"subtitle":{"en":"Like A Pro, On The Go.","ar":"تفاصيل دقيقة وإحترافية مهنية"},"icon":"https://www.tap.company/websiteImages/productsFeaturesImages/goCollect/Icons/View-bill.png","description":{"en":"With goCollect you can act like a pro, on the go! Keep track of every bill’s specific details right from your phone; check-in on your client’s unique order; and stay updated on the payment status of your bill right from the palm of your hand.","ar":"إذا كنت تعلم أنه يمكنك مشاهدة الفواتير المرسلة في قائمة “فواتيري”! فهذا ليس كل شيء، يمكنك أيضاً الضغط على أي فاتورة واختيار “عرض الفاتورة” لمشاهدة التفاصيل والتحقق مما قد أرسلته إلى العميل الخاص بك وقتما شئت."},"image":"https://www.tap.company/websiteImages/productsFeaturesImages/goCollect/Illustrations/View_bill.png"},{"title":{"en":"Tracking Bills","ar":"تتبع حالة الفاتورة"},"subtitle":{"en":"Your Business Life-changer","ar":"تفاصيل صغيرة لراحة أكبر"},"icon":"https://www.tap.company/websiteImages/productsFeaturesImages/goCollect/Icons/Tracking.png","description":{"en":"goCollect’s powerful tracking tool gives you the status of each bill so you can know when to expect money in your bank account. We’ve followed Whatsapp’s familiar ‘check-mark’ identification model to let you know when a bill has been sent, delivered, viewed, attempted, paid, refunded, and cancelled. Not only that, but you can also know the date of each bill, and the number of reminders you’ve sent each customer. That means you can stay on top of every detail effortlessly and instantly. Use it once and you’ll wonder how you ever lived without it!","ar":"لا داعي للقلق من متابعة وضع الفواتير المرسلة إلى عملائك، فقد إعتمدنا طريقة تطبيق الواتس آب في تتبع حالات الرسائل المرسلة، وتطويرها لتلائم وتناسب احتياجات عملك. فمن خلال نظرة سريعة على القائمة الرئيسية “فواتيري”، يمكنك معرفة حالة الفواتير إذا كانت مدفوعة، أو غير مدفوعة، أو ملغية. ويمكنك أيضاً الضغط على أي فاتورة لاختيار “متابعة الفاتورة” لمعرفة حالة الفاتورة إذا تم استلامها أو مشاهدتها أو تم دفعها من قبل العميل بالوقت والتاريخ."},"image":"https://www.tap.company/websiteImages/productsFeaturesImages/goCollect/Illustrations/Tracking.png"},{"title":{"en":"Quick Actions","ar":"عمليات سريعة"},"subtitle":{"en":"Everything You Need, Instantly","ar":"ميزات فعالة في متناول يديك"},"icon":"https://www.tap.company/websiteImages/productsFeaturesImages/goCollect/Icons/Quick-actions.png","description":{"en":"‘Quick Actions’ makes it really easy for you to do things like send, view, and track your bills in a snap. goCollect places your most important and frequent billing actions under one menu to make running your business a total breeze.","ar":"لقد سهلنا الوصول إلى الميزات الأكثر فعالية والمتعلة بالفواتير المرسلة عبر تطبيق goCollect، يمكنك الضغط على أي فاتورة في قائمة الفواتير الخاصة بك واستخدام أداة “العمليات السريعة” لإجراء العديد من العمليات مثل (إرسال تذكير دفع –مشاركة – عرض –تتبع – إلغاء – تكرار) لجعل حياتك العملية أسهل وفقا لاحتياجاتك الخاصة."},"image":"https://www.tap.company/websiteImages/productsFeaturesImages/goCollect/Illustrations/Quick_actions.png"},{"title":{"en":"Send Reminders","ar":"إرسال تذكير بالدفع"},"subtitle":{"en":"Automatic & Awkward-Free","ar":"المتابعة الأساسية"},"icon":"https://www.tap.company/websiteImages/productsFeaturesImages/goCollect/Icons/Reminder.png","description":{"en":"goCollect takes away any awkward client interactions by sending over a professional payment reminder to nudge your customers to pay on time, with just one click. You can send as many reminders as you want!","ar":"متابعة عمليات تحصيل الفواتير غير المدفوعة تستغرق الكثير من الوقت كما أنها قد تعرضك للكثير من الإحراجات الناتجة عن المحادثات و الاتصالات غير الملائمة مع العملاء، ولكن من خلال القائمة الرئيسية “فواتيري” يمكنك الضغط على أي فاتورة وإرسال تذكير بالدفع بطريقة مهنية وإحترافية من نظام الفواتير الخاص بك عبر تطبيق goCollect."},"image":"https://www.tap.company/websiteImages/productsFeaturesImages/goCollect/Illustrations/Reminder.png"},{"title":{"en":"Cancel a Bill","ar":"إلغاء فاتورة"},"subtitle":{"en":"Cancel In No Time","ar":"بيانات تفيد أعمالك فقط!"},"icon":"https://www.tap.company/websiteImages/productsFeaturesImages/goCollect/Icons/Cancel-bill.png","description":{"en":"Accidentally sent a bill with incorrect information or to the wrong person? No biggie. With goCollect you can cancel it in no time through the ‘Quick Actions’ module. All you have to do is tap on the bill you would like to cancel and click ‘cancel’. You can also choose the reason of cancellation.","ar":"هل أرسلت فاتورة خاطئة؟ لا تقلق، يمكنك إلغاء الفاتورة ببساطة من خلال ميزة العمليات السريعة في تطبيق goCollect، وبالتالي لا يمكن للعميل دفع هذه الفاتورة لتتجنب المتاعب."},"image":"https://www.tap.company/websiteImages/productsFeaturesImages/goCollect/Illustrations/Cancel_bill.png"},{"title":{"en":"Refund a Bill","ar":"إعادة قيمة فاتورة"},"subtitle":{"en":"Painless Refunds","ar":"كل الحلول ممكنة"},"icon":"https://www.tap.company/websiteImages/productsFeaturesImages/goCollect/Icons/Refund.png","description":{"en":"Refunds have always been tricky business, but with goCollect it’s an easy fix. A single click is all it takes. We will automatically get notified and process the refund to the customer with no additional charges! Not only does goCollect help you with the refunding process, but now you also have a detailed picture of all past refunds at a glance.","ar":"عملية إعادة مبلغ إلى العميل كانت دائما بمثابة عناء وإهدار كبير للوقت والجهد، لذلك فقد قمنا بإضافة ميزة فعالة يمكنك من خلالها إرجاع مبلغ مدفوع لفاتورة معينة إلى العميل بضغطة واحدة فقط!"},"image":"https://www.tap.company/websiteImages/productsFeaturesImages/goCollect/Illustrations/Refund.png"},{"title":{"en":"Search","ar":"البحث"},"subtitle":{"en":"Search That Delivers","ar":"متابعة أسهل، وصول أسرع"},"icon":"https://www.tap.company/websiteImages/productsFeaturesImages/goCollect/Icons/Search.png","description":{"en":"When the stack of bills starts piling up, you can find exactly what you’re looking for right from the search bar. Just enter your client’s name, mobile number, or bill/invoice number. goCollect will immediately filter for matches and show you the invoice you’re looking for.","ar":"خاصية البحث من خلال تطبيق goCollect توفر لك الوقت لمتابعة أسرع لفواتيرك، حيث يمكنك البحث برقم الفاتورة لمشاهدتها مباشرة، أو إن كنت ترغب في عرض جميع الفواتير المتعلقة بعميل ما! يمكنك البحث بإسم ذلك العميل، أو رقم الهاتف الخاص به بكل سهولة."},"image":"https://www.tap.company/websiteImages/productsFeaturesImages/goCollect/Illustrations/Search.png"},{"title":{"en":"Report a Bill","ar":"بلّغ عن فاتورة"},"subtitle":{"en":"Reporting That Works","ar":"دعم فعّال"},"icon":"https://www.tap.company/websiteImages/productsFeaturesImages/goCollect/Icons/Report.png","description":{"en":"Got a problem with one of your bills? Maybe you need to correct a mistake or settle a collection issue? All you’ve got to do is report it right through the goCollect app and the Tap team will be right with you to figure it all out.","ar":"لديك مشكلة مع فاتورة من الفواتير وتريد تصحيح خطأ يمنعك من تحصيل مدفوعاتك؟ ما عليك سوى أن تبلّغ عن الفاتورة من خلال تطبيق goCollect وسيقوم فريق تاپ بحل مشكلتك."},"image":"https://www.tap.company/websiteImages/productsFeaturesImages/goCollect/Illustrations/Report.png"}]},{"categoryName":{"en":"My App","ar":"تطبيقي"},"showMoreButtonText":{"en":"more app features","ar":"المزيد من مميزات تطبيقي"},"showLessButtonText":{"en":"Show Less","ar":"أظهر أقل"},"items":[{"title":{"en":"Dashboard","ar":"لوحة التحكم"},"subtitle":{"en":"All Your Transactions — All Laid Out","ar":"جميع معاملاتك في مكان واحد"},"icon":"https://www.tap.company/websiteImages/productsFeaturesImages/goCollect/Icons/Report.png","description":{"en":"Trying to keep up with all your bill transactions? Just turn your phone landscape and BOOM… you’ve got your very own goCollect dashboard! Your current balance with all the payments received, when to expect your next settlement to your bank account, and your pending payments are all laid out for you to see in real time.","ar":"هل تحاول متابعة معاملاتك المالية؟ فقط قم بتدوير هاتفك أفقياً وستظهر أمامك لوحة التحكم الخاصة بحسابك! تُظهر اللوحة رصيدك، تسديداتك القادمة، كذلك التحصيلات قيد الانتظار، معروضة كلها بوضوح ومنظمة أولاً بأول."},"image":"https://www.tap.company/websiteImages/productsFeaturesImages/goCollect/Illustrations/Dashboard_Balance1.png"},{"title":{"en":"Instagram Integration","ar":"دمج انستقرام"},"subtitle":{"en":"Gram & Collect","ar":"صورك بين يديك"},"icon":"https://www.tap.company/websiteImages/productsFeaturesImages/goCollect/Icons/instagram.png","description":{"en":"With goCollect, you’ve got the power to take your awesome Instagram product shots beyond social media. Now you can import your favorite item images straight from your Instagram business account onto the goCollect application in just a few seconds. Even better? You can also have your Instagram profile picture imported as your business logo for your application invoices. Easy, speedy, and super polished!","ar":"الصوِر مُهمّة للتعريف بأعمالك، من خلال goCollect أصبح بإمكانك استخدام صوِر مُنْتجك الموجودة على حسابك في انستقرام، واستيّراد ما تُفضله منها إلى goCollect خلال ثوانٍ معدودة. وسيُمكنك أيضاً استخدام صورة حسابك الشخصيّ على انستقرام كشعار لأعمالك في تطبيق الفواتير، وذلك ليكون الأمر أسهل وأسرع بكثير."},"image":"https://www.tap.company/websiteImages/productsFeaturesImages/goCollect/Illustrations/instgram_integration.png"},{"title":{"en":"Touch ID","ar":"التعرّف بالبصمة"},"subtitle":{"en":"Safer Than Ever, Easier Than Ever","ar":"معلوماتك في آمانٍ تام"},"icon":"https://www.tap.company/websiteImages/productsFeaturesImages/goCollect/Icons/Touch-ID.png","description":{"en":"goCollect keeps all your important business details and daily transactions on lock-down with the best and most advanced financial and digital security practices available worldwide. And if you want more added reassurance, you can use your Touch ID to make logging in to goCollect even more safe and secure. All your payments are 100% secure!","ar":"تأميّن معلومات عملك بالتأكيد عملية مهمة طوال الوقت، goCollect يحافظ على سريّة تفاصيل عملك والمُعاملات اليومية، وذلك من خلال أحدث طُرق التأمين المالي والرقمي على مستوى العالم. وإن كنت تحتاج لاطمئنان أكثر يُمكنك استخدام Touch ID، لدخول أكثر آماناً على حساب goCollect."},"image":"https://www.tap.company/websiteImages/productsFeaturesImages/goCollect/Illustrations/Touch_ID.png"},{"title":{"en":"In App Chat","ar":"دردشة"},"subtitle":{"en":"We’ve Got Your Back","ar":"دائماً في الخدمة"},"icon":"https://www.tap.company/websiteImages/productsFeaturesImages/goCollect/Icons/In_app_chat.png","description":{"en":"At Tap, we’ve always got your back. That’s why we made it super easy for you to chat with our support team right through the goCollect app. If you ever run into any trouble, just hop over into the in-app chat window where you can share images of your issue and see your chat history for future reference. Our gurus are available 24h/7! We’ll even email you a record of your conversation once you’re done. Cause when we say ‘support’ we really mean it.","ar":"في تاپ نحن دائماً في خدمتك، لذلك سهلنا عليك التواصل مع فريق الدعم من خلال تطبيق goCollect، إذا واجهتك أي متاعب يمكنك فتح نافذة الدردشة التي تمكنك من مشاركة الصور لتوضيح مشكلتك، وسوف نقوم بحفظ سجل محادثتك كمرجع لك، نحن عندما نقول “دعم” فنحن حقاً نعنيها!"},"image":"https://www.tap.company/websiteImages/productsFeaturesImages/goCollect/Illustrations/In_App_Chat.png"},{"title":{"en":"Multiple Account Sign-In","ar":"تسجيل دخول متعدّد"},"subtitle":{"en":"Multi-Hustle Approved","ar":"لا تدع الوقت يضيع"},"icon":"https://www.tap.company/websiteImages/productsFeaturesImages/goCollect/Icons/Multi-account.png","description":{"en":"For all you high-flying serial entrepreneurs and multi-business ballers: we know your time is money and we know you like to breeze between different business transactions with minimal effort. goCollect is right there with you. With multiple account sign-in, you can switch between different goCollect accounts on the spot and without missing a beat.","ar":"الوقت يعني المال بالنسبة لرجال الأعمال، ولمزيد من المرونة جعلنا goCollect يُقلل من وقتك الضائع ويخفض من جُهدك، عن طريق تفعيل إمكانية التنقُل بين حساباتك المُختلفة. لتستطيع بذلك التحكُم في جميع أعمالك بسهولة وبدون ملل."},"image":"https://www.tap.company/websiteImages/productsFeaturesImages/goCollect/Illustrations/multiaccount-_480.png"},{"title":{"en":"Account settings","ar":"إعدادات الحساب"},"subtitle":{"en":"Account Updates On The Go","ar":"سهولة تعديل البيانات"},"icon":"https://www.tap.company/websiteImages/productsFeaturesImages/goCollect/Icons/Account_Settings.png","description":{"en":"In business, things change every day. To help you stay right on top of all your changes, we made account information edits super easy to perform right from the goCollect app. Need to edit or add to your business, contact, or bank info? Don’t worry about having to log-in from a desktop or call in to customer service — you can do it right there from your smartphone, on goCollect.","ar":"العالم يتغير من حولك كل يوم، لكن لا تقلق، جعلنا تعديل المعلومات والبيانات على حساب goCollect أكثر ملائمة لاحتياج عملك. بإمكانك الآن وفي أي وقت، تغيير وتعديل ما تريد من معلومات مثل (بيانات الاتصال – المعلومات البنكية) عن طريق تطبيق goCollect على هاتفك الذكي."},"image":"https://www.tap.company/websiteImages/productsFeaturesImages/goCollect/Illustrations/Account_Settings.png"}]},{"categoryName":{"en":"Bank","ar":"بنك"},"showMoreButtonText":{"en":"more bank features","ar":"المزيد من مميزات البنك"},"showLessButtonText":{"en":"Show Less","ar":"أظهر أقل"},"partners":["boubyan","nbk"],"items":[{"title":{"en":"Card","ar":"البطاقة"},"subtitle":{"en":"Your Do-It-All Banking Solution","ar":"تقدم لك جميع الحلول البنكية"},"icon":"https://www.tap.company/websiteImages/productsFeaturesImages/goCollect/Icons/icon-BB-card.png","description":{"en":"We’ll get your company set up with a boubyan Debit/Credit Card. That way, you can authorize and perform transactions for yourself and the team right from your company’s bank account in no time.","ar":"ستمكنك الشركة من إنشاء بطاقة السحب / الائتمان لدى بنك بوبيان. بهذه الطريقة، يمكنك تفويض وإجراء المعاملات لنفسك ولفريق العمل من الحساب البنكي لشركتك في وقت قصير."},"image":"https://www.tap.company/websiteImages/productsFeaturesImages/goCollect/Illustrations/Boubyan-illustration-Card.png","partner":"boubyan"},{"title":{"en":"Card","ar":"البطاقة"},"subtitle":{"en":"Your Do-It-All Banking Solution","ar":"تقدم لك جميع الحلول البنكية"},"icon":"https://www.tap.company/websiteImages/productsFeaturesImages/goCollect/Icons/icon-NBK-card.png","description":{"en":"We’ll get your company set up with a NBK Debit/Credit Card. That way, you can authorize and perform transactions for yourself and the team right from your company’s bank account in no time.","ar":"ستمكنك الشركة من إنشاء بطاقة السحب / الائتمان لدى بنك الكويت الوطني. بهذه الطريقة، يمكنك تفويض وإجراء المعاملات لنفسك ولفريق العمل من الحساب البنكي لشركتك في وقت قصير."},"image":"https://www.tap.company/websiteImages/productsFeaturesImages/goCollect/Illustrations/goCollect-NBK-card.png","partner":"nbk"},{"title":{"en":"Payroll","ar":"كشف الرواتب"},"subtitle":{"en":"Set it and Forget it","ar":"ضع كشف الرواتب ولا تنشغل به"},"icon":"https://www.tap.company/websiteImages/productsFeaturesImages/goCollect/Icons/icon-NBK-Payroll.png","description":{"en":"Once you’ve got your NBK account set up, doing your company’s payroll becomes a breeze. We’ll automate the dispatch of all your salaries on a monthly basis so all you have to do is ‘set it and forget it.’","ar":"بمجرد إنشاء حسابك البنكي لدى بنك الكويت الوطني فإن إعداد كشف رواتب شركتك يصبح أمرا بسيطاً. وسوف نرسل تلقائيا جميع الرواتب على أساس شهري ليكون كل ما عليك فعله هو 'وضع كشف الرواتب وعدم الانشغال به'"},"image":"https://www.tap.company/websiteImages/productsFeaturesImages/goCollect/Illustrations/goCollect-NBK-Payroll.png","partner":"nbk"}]},{"categoryName":{"en":"My Account","ar":"حسابي"},"showMoreButtonText":{"en":"more account features","ar":"المزيد من مميزات حسابي"},"showLessButtonText":{"en":"Show Less","ar":"أظهر أقل"},"items":[{"title":{"en":"Local, Regional & Global Card Acceptance","ar":"كل بطاقات الدفع مقبولة"},"subtitle":{"en":"Accept everything","ar":"ميّزة الخيارات"},"icon":"https://www.tap.company/websiteImages/productsFeaturesImages/goCollect/Icons/every-way-to-pay.png","description":{"en":"Through Tap, your customers now have the option of paying with their preferred local card, a regional card, or even with an international credit card. Our Charge API allows them to pay for any of your listed products and services in a snap. Whether that’s through KNET, Benefit, Mada, Sadad, Visa, MasterCard, or  American Express. From now on, the only thing you won’t accept is ‘no’ for an answer.","ar":"عبر تاپ، يمكن لعملائك استخدام أي بطاقة للدفع، سواء كانت بطاقة محلية او بطاقة ائتمانية دولية. يمكن لجميع أعضاء شبكة تاپ الآن قبول المدفوعات عبر كي- نت، ماستر كارد وأميركان إكسبرس لقاء أي منتج أو خدمة. خيارات أكثر، رضا عملاء أكبر، أرباح أوفر."},"image":"https://www.tap.company/websiteImages/productsFeaturesImages/general/Illustrations/all-payments.png"},{"title":{"en":"Same day Settlement","ar":"تسوية في نفس اليوم"},"subtitle":{"en":"Faster than you can blink","ar":"أسرع من غمضة العين"},"icon":"https://www.tap.company/websiteImages/productsFeaturesImages/goCollect/Icons/icon-BB-same-day-settlement.png","description":{"en":"Once you’ve completed a successful KNET transaction, it’ll be settled into your bank account on the exact same day. Blink and it’s in your account!","ar":"بمجرد انتهائك من معاملة الكي نت بنجاح، سيتم تسوية عملية السداد في حسابك البنكي في نفس اليوم. أغمض عينيك وستجد المعاملة في حساب!"},"image":"https://www.tap.company/websiteImages/productsFeaturesImages/goCollect/Illustrations/Boubyan-illustration-same-day-settlement.png.png","partner":"boubyan"},{"title":{"en":"Next day Settlement","ar":"التسوية في اليوم التالي"},"subtitle":{"en":"Lightning-Fast Settlements","ar":"تسهيل عمليات التسوية"},"icon":"https://www.tap.company/websiteImages/productsFeaturesImages/goCollect/Icons/icon-NBK-next-day-settlement.png","description":{"en":"Once you’ve completed a successful KNET transaction, it’ll be settled into your bank account as soon as the next business day. Talk about fast money!","ar":"بمجرد انتهائك من معاملة كي نت بنجاح، سيتم تسويتها في حسابك البنكي بحلول يوم العمل التالي. نتحدّث هنا عن سرعة تسوية الأموال!"},"image":"https://www.tap.company/websiteImages/productsFeaturesImages/goCollect/Illustrations/Next-day-settlement-illustration.gif","partner":"nbk"},{"title":{"en":"Dedicated Support","ar":"دعم مخصّص"},"subtitle":{"en":"Questions? Don’t Be Shy","ar":"لديك أسئلة؟ لا تتردّد"},"icon":"https://www.tap.company/websiteImages/productsFeaturesImages/goCollect/Icons/Dedicated-Support.png","description":{"en":"Whether it’s set-up, integration, or follow-through—if you’ve ever got a problem, you can count on Tap for the solution. We do our best to make sure that you can keep working at your best. As your dedicated support team, we’re always here for you—just try us. You can easily reach out to our team using the live chat on our website (or in the goCollect application), email us or call us! ","ar":"سواء أردت إنشاء حساب، دمج أو متابعة حسابك – أو واجهتك أي مشكلة يمكنك الاعتماد علينا، فنحن في تاپ نقدّم لكل مشكلة حل لنضمن استمرارية عملك بأفضل حال. طاقمنا المكرّس لخدمتك مستعد دائماً لمساعدتك. جرّبنا."},"image":"https://www.tap.company/websiteImages/productsFeaturesImages/general/Illustrations/Support.png"},{"title":{"en":"Same Day Activation","ar":"تفعيل في اليوم نفسه"},"subtitle":{"en":"Start Selling Now","ar":"ابدأ بيع منتجاتك الآن"},"icon":"https://www.tap.company/websiteImages/productsFeaturesImages/goCollect/Icons/Same-Day-Activation.png","description":{"en":"Set up, connect, and collect payment in less than 24 hours. Our online registration system smoothly guides you through all the required steps, and helps you get your online payments collection service up and running in record time. A little more old-school? No problem. Our team of dedicated onboarding assistants is happy to get on the phone with you or through our live chat and get you activated as soon as possible.","ar":"أنشىء حسابك، تواصل وابدأ ببيع منتجك خلال 24 ساعة فقط. فبرنامج التسجيل السلس يرشدك إلى إنجاز جميع الخطوات بسهولة وسرعة ويساعدك على الحصول على مستحقاتك المالية في وقت غير مسبوق. تشعر بأن كل ذلك جديد بالنسبة إليك؟ لا تقلق. طاقمنا من المساعدين المكرّس لخدمتك سيسعده التحدث معك وإتمام عملية تفعيل حسابك بأسرع وقت ممكن."},"image":"https://www.tap.company/websiteImages/productsFeaturesImages/general/Illustrations/Same-Day-Activation.png"},{"title":{"en":"Statements & Receipts","ar":"كشف الحساب والإيصالات"},"subtitle":{"en":"Half The Paperwork, Double The Efficiency","ar":"فعالية أكثر بمعاملات أقل"},"icon":"https://www.tap.company/websiteImages/productsFeaturesImages/goCollect/Icons/statements-and-receipt.png","description":{"en":"Tap’s user dashboard gives you full access to your entire payment and collections history, and provides soft copies of all your receipts for easy printing. All you have to do is login on our website by inserting your email and password to access for your dashboard. You can now download your statement or save it as a PDF.","ar":"يمكنك بفضل لوحة التحكم بحسابك الدخول إلى تاريخ العمليات بالكامل والحصول على نسخ إلكترونية من إيصالاتك التي يسهل طباعتها. الآن أصبح بإمكانك توفير الوقت والجهد من المعاملات والأوراق الكثيرة واستبدال ذلك بإنتاجية أكبر. إنّها صفقة رابحة للجميع: لك وللبيئة على السواء."},"image":"https://www.tap.company/websiteImages/productsFeaturesImages/general/Illustrations/Statements-&-Receipts.png"},{"title":{"en":"Analytics & History","ar":"إحصائيات للمبيعات"},"subtitle":{"en":"Data That Matters To Business","ar":"البيانات التي تفيد أعمالك"},"icon":"https://www.tap.company/websiteImages/productsFeaturesImages/goCollect/Icons/Analytics-&-History.png","description":{"en":"Tap’s analytics dashboard can tell you what’s driving the most effective sales outcomes for your business and what areas you need to focus on most. We also organize each customer’s payment history for you to review in detail whenever you need it. We’ll bring the tools; you bring the drive.","ar":"تقدّم لك لوحة التحكم بحساب تاپ تحليلات تخبرك بأكثر العمليات التسويقية تأثيراً لجهة الدخل في السوق وما هي المجالات التي عليك التركيز عليها أكثر. كما ننظم تاريخ دفوعات كل عميل لديك كي تتمكن من الاطلاع عليها بالتفصيل في أي وقت. نحن نؤمّن لك كل الوسائل لتنطلق…وأنت عليك أن تقود."},"image":"https://www.tap.company/websiteImages/productsFeaturesImages/general/Illustrations/Analytics-&-History.png"},{"title":{"en":"Single API Integration","ar":"API"},"subtitle":{"en":"For The Advanced Pros","ar":"للمحترفين"},"icon":"https://www.tap.company/websiteImages/productsFeaturesImages/goCollect/Icons/API.png","description":{"en":"If you’re looking for a little more customization on your Tap gateway, your own developer can easily access the API to make all the desired tweaks without a hitch. Our API documentation is simple to integrate and is available in multiple language codes including PHP, JAVA, and .NET.","ar":"إذا كنت تبحث عن إضفاء لمسة خاصة على حسابك في تاپ يمكن للمطوّر لديك الدخول إلى API لإجراء جميع التعديلات التي ترغب بها وتصميمها وفق رغباتك بسهولة فائقة. ملفات API الخاصة بنا بسيطة جداً ويسهل الإندماج فيها كما أنها متوفّرة بلغات رموز متعدّدة تتضمّن PHP ،JAVA و NET."},"image":"https://www.tap.company/websiteImages/productsFeaturesImages/general/Illustrations/API.png"},{"title":{"en":"Security","ar":"الحماية والأمان"},"subtitle":{"en":"100% Secure","ar":"حماية تثق بها"},"icon":"https://www.tap.company/websiteImages/productsFeaturesImages/goCollect/Icons/Security.png","description":{"en":"There’s nothing our team takes more seriously than keeping you and your business safe while using Tap. That’s why we’ve outfitted our entire system with banking-industry security levels and encryption protocols, as well as remaining compliant with global PCI DSS security standards. At Tap, we have an unwavering commitment to your peace of mind, and that starts with keeping your business completely safe online. That’s a promise.","ar":"فريق عملنا يضع في سلّم أولوياته حماية أعمالك عند استخدامك تاپ. لذلك أنشأنا برنامجنا تماماً وفقاً لمعايير السلامة البنكية وبروتوكول الحماية المتعارف عليه كما أننا ندعم معايير السلامة العالمية وفق برنامج PCI DSS. في تاپ، نلتزم براحة بالك ونعرف جيّدا ً أن تحقيق ذلك يبدأ بضمان سلامة أعمالك الإلكترونية وحمايتها. وهذا وعدنا."},"image":"https://www.tap.company/websiteImages/productsFeaturesImages/general/Illustrations/Security.png"},{"title":{"en":"All Businesses Welcome","ar":"جميع الأعمال التجارية"},"subtitle":{"en":"The big, the small, and the in-between","ar":"الصغيرة، الكبيرة والمتوسطة"},"icon":"https://www.tap.company/websiteImages/productsFeaturesImages/goCollect/Icons/All-Businesses-Welcome.png","description":{"en":"At Tap, everyone’s welcome. Our system is built to fit the unique needs and demands of every business, regardless of size or operations. Among our list of favorite Tap users you’ll find mega-giants right alongside some awesome micro businesses, SME’s or Tech Startups. Ready to jump on-board?","ar":"أهلاً بالجميع في تاپ. برنامجنا مصمم ليلائم احتياجات ومتطلبات جميع الشركات بغض النظر عن حجم المؤسسة وطبيعة عملها. ستجد ضمن قائمة عملائنا المفضّلين OSN ،VIVA ،Bein Sports إلى جانب العديد من المؤسسات المنزلية الصغيرة والمجلات أو المطبوعات الإلكترونية مثال مجلة Khaleejesque ،The WalK In Closet و Cake District. مستعد للإنضمام إلينا؟"},"image":"https://www.tap.company/websiteImages/productsFeaturesImages/general/Illustrations/All-Businesses-Welcome.png","partner":"none"}]},{"categoryName":{"en":"Device","ar":"جهازي"},"showMoreButtonText":{"en":"more device features","ar":"المزيد من مميزات جهازي"},"showLessButtonText":{"en":"Show Less","ar":"أظهر أقل"},"partners":["zain"],"items":[{"title":{"en":"Phone","ar":"هاتف"},"subtitle":{"en":"Your business goes where you go","ar":"أعمالك معك في أي مكان تذهب إليه"},"icon":"https://www.tap.company/websiteImages/productsFeaturesImages/goCollect/Icons/icon-zain-smart-phone.png","description":{"en":"Business on the go? You got it. Zain will set you up with a smartphone to perform all your business activities, whenever and wherever. Plus, you’ll get to make the money calls in style with a choice between an iPhone or a Samsung Galaxy.","ar":"القيام بالعمل أثناء الإنتقال؟ أفهمت ذلك. سوف تجهز شركة زين هاتف ذكي لتقوم بتنفيذ جميع أنشطة أعمالك في أي وقت وأي مكان. بالإضافة إلى أنك ستحصل على مكالمات طلب الأموال مع حرية الإختيار ما بين هاتف آيفون أو سامسونج جالاكسي."},"image":"https://www.tap.company/websiteImages/productsFeaturesImages/goCollect/Illustrations/Zain-goCollect-Phone.png"},{"title":{"en":"LTE","ar":"LTE"},"subtitle":{"en":"How about a little more power?","ar":"ماذا عن المزيد من القدرة؟"},"icon":"https://www.tap.company/websiteImages/productsFeaturesImages/goCollect/Icons/icon-zain-internet.png","description":{"en":"Supercharge your business activities with 60GB of stable, high speed internet connection that’ll keep your company running at any place and any time.","ar":"قم بتعزيز أنشطة شركتك بسرعة إنترنت ثابتة وسرعة اتصال فائقة قدرها 60 جيجا بايت من شأنها أن تبُقي شركتك قيد التشغيل في أي وقت وأي مكان."},"image":"https://www.tap.company/websiteImages/productsFeaturesImages/goCollect/Illustrations/Zain-goCollect-LTE.png"},{"title":{"en":"Roaming","ar":"التجوال"},"subtitle":{"en":"Around the world and back","ar":"التجوال في جميع أرجاء العالم"},"icon":"https://www.tap.company/websiteImages/productsFeaturesImages/goCollect/Icons/icon-zain-roaming.png","description":{"en":"Stay on top of business from any part of the world. Zain’s mobile network roaming coverage lets you take your business with you wherever you travel.","ar":"حافظ على بقائك في مقدمة الشركات في أي مكان في العالم. تمكنك تغطية تجوال شبكة إنترنت هاتف زين من اصطحاب أعمالك في أي مكان تسافر إليه."},"image":"https://www.tap.company/websiteImages/productsFeaturesImages/goCollect/Illustrations/Zain-goCollect-Roaming.png"},{"title":{"en":"SMS","ar":"خدمة الرسائل القصيرة"},"subtitle":{"en":"Text more, sell more","ar":"أرسل مزيد من الرسائل النصية وقم ببيع المزيد"},"icon":"https://www.tap.company/websiteImages/productsFeaturesImages/goCollect/Icons/icon-zain-sms.png","description":{"en":"With unlimited SMS, you can text your customers freely and effectively, at any time. No hidden fees and no extra expenses.","ar":"مع خدمة الرسائل النصية غير المحدودة سيمكنك مراسلة عملائك بحرية وفاعلية في أي وقت. بدون رسوم خفية وبدون مصاريف إضافية."},"image":"https://www.tap.company/websiteImages/productsFeaturesImages/goCollect/Illustrations/Zain-goCollect-SMS.png"},{"title":{"en":"Voice Call","ar":" المكالمات الصوتية"},"subtitle":{"en":"Hello? It’s freedom calling.","ar":"مرحبا؟ إنها حرية الإتصال."},"icon":"https://www.tap.company/websiteImages/productsFeaturesImages/goCollect/Icons/icon-zain-voice-call.png","description":{"en":"Talk till you drop with 1,000 free minutes for all business activities and unlimited calls with your team members. Now you’re free to talk with that one chatty customer or have those hour-long conference calls without breaking the bank.","ar":"تحدث حتى 1000 دقيقة مجانية لجميع الأنشطة التجارية بالإضافة إلى المكالمات غير المحدودة مع أعضاء الفريق. الآن أنت تتمتع بحرية الحديث مع العميل كثير الكلام أو المكالمات الجمعية بدون الإخلال بميزانية البنك."},"image":"https://www.tap.company/websiteImages/productsFeaturesImages/goCollect/Illustrations/Zain-goCollect-Voice-call.png"}]}]},{"product":"tap","categories":[{"categoryName":{"en":"Device","ar":"جهازي"},"showMoreButtonText":{"en":"more device features","ar":"المزيد من مميزات جهازي"},"showLessButtonText":{"en":"Show Less","ar":"أظهر أقل"},"items":[{"title":{"en":"Local, Regional & Global Card Acceptance","ar":"كل بطاقات الدفع مقبولة"},"subtitle":{"en":"Accept everything","ar":"ميّزة الخيارات"},"icon":"https://www.tap.company/websiteImages/productsFeaturesImages/goCollect/Icons/every-way-to-pay.png","description":{"en":"Through Tap, your customers now have the option of paying with their preferred local card, a regional card, or even with an international credit card. Our Charge API allows them to pay for any of your listed products and services in a snap. Whether that’s through KNET, Benefit, Mada, Sadad, Visa, MasterCard, or  American Express. From now on, the only thing you won’t accept is ‘no’ for an answer.","ar":"عبر تاپ، يمكن لعملائك استخدام أي بطاقة للدفع، سواء كانت بطاقة محلية او بطاقة ائتمانية دولية. يمكن لجميع أعضاء شبكة تاپ الآن قبول المدفوعات عبر كي- نت، ماستر كارد وأميركان إكسبرس لقاء أي منتج أو خدمة. خيارات أكثر، رضا عملاء أكبر، أرباح أوفر."},"image":"https://www.tap.company/websiteImages/productsFeaturesImages/general/Illustrations/all-payments.png"},{"title":{"en":"Near-Field-Communication","ar":"تواصل قريب المدى"},"subtitle":{"en":"NFC Magic","ar":"عجائب ال!NFC"},"icon":"https://www.tap.company/websiteImages/productsFeaturesImages/goTap/Icons/goTap_NFC.png","description":{"en":"Keep the line moving fast with the power of Near-Field-Communication payment systems. All your customers have to do is tap the device with their card, and, well, that’s it! No swiping or dipping necessary.","ar":"تعرف على قوة أحدث التقنيات: تواصل قريب المدى. لا تخسر وقتك بإدخال بطافتك، فقط امسح بطاقتك على الجهاز وادفع بسهولة."},"image":"https://www.tap.company/websiteImages//productsFeaturesImages/goTap/Illustrations/goTap_feature_artwork_NFC.png"},{"title":{"en":"Refunds","ar":"إعادة المبلغ"},"subtitle":{"en":"Super Easy Refunds","ar":"استرجع بسهولة"},"icon":"https://www.tap.company/websiteImages/productsFeaturesImages/goTap/Icons/goTap_Refund.png","description":{"en":"You know us for making every payment process as easy and pain-free as possible — and that includes refunds. Just like all the Tap services, goTap lets you submit refund requests without any extra pain or hassle.","ar":"اعتدتم مع تاپ على جعل شؤون أعمالكم أكثر سهولة و يسر و ذلك ينطبق على سياسة الاسترجاع. يمكنك مع goTap استرجاع مبيعاتك بأسهل و أسرع الطرق."},"image":"https://www.tap.company/websiteImages//productsFeaturesImages/goTap/Illustrations/goTap_feature_artwork_refund.png"},{"title":{"en":"48 hours delivery","ar":"توصيل خلال 48 ساعة"},"subtitle":{"en":"Lightning Fast Delivery","ar":"توصيل سريع"},"icon":"https://www.tap.company/websiteImages/productsFeaturesImages/goTap/Icons/goTap_48_hours_delivery.png","description":{"en":"At Tap, we get your business up and running in no time! We’ll make sure you have your goTap device all set up and delivered to you within 48 hours guaranteed.","ar":"مرحبا بأسرع طرق التوصيل! سجل معنا وسنقوم بإعداد جهازك وتجهيزه لك خلال 48 ساعة مضمونة."},"image":"https://www.tap.company/websiteImages//productsFeaturesImages/goTap/Illustrations/goTap_feature_artwork_48hours_delivery.gif"},{"title":{"en":"Portable","ar":"جهاز متنقل"},"subtitle":{"en":"Work Everywhere","ar":"عملك في أي مكان"},"icon":"https://www.tap.company/websiteImages/productsFeaturesImages/goTap/Icons/goTap_Portable.png","description":{"en":"goTap let’s you go wherever your business takes you — literally! With GPRS, goTap empowers you to accept contactless K-NET payments, whenever and wherever. You’ll never miss out on a sale again!","ar":"جهاز نقاط البيع من تاپ يجعل عملية تنقلك أكثر بساطة وسهولة، اعمل أينما شئت و استطعت مع جهازنا المتنقل. لن تخسر أي زبون!"},"image":"https://www.tap.company/websiteImages//productsFeaturesImages/goTap/Illustrations/goTap_feature_artwork_portable_Verifone.png"},{"title":{"en":"Expo to Store","ar":"من معرض إلى متجر"},"subtitle":{"en":"Grab ‘N’ Go Payments","ar":"شيل جهازك وانطلق"},"icon":"https://www.tap.company/websiteImages/productsFeaturesImages/goTap/Icons/goTap_Expo_to_Store.png","description":{"en":"You don’t need a huge multi-system setup to use your goTap device — just a free hand! Whether you’re running a 1-day expo booth, or hustling in your own shop, goTap is the perfect ‘Grab ‘N’ Go’ portable payment solution.","ar":"لا تحتاج إلى إعداد نطام كبير لاستعمال جهازك، لا تعقد الأمور و تمتع بسهولة و مرونة الدفع المتنقل."},"image":"https://www.tap.company/websiteImages//productsFeaturesImages/goTap/Illustrations/Expo-to-Store.png"}]},{"categoryName":{"en":"My Account","ar":"حسابي"},"showMoreButtonText":{"en":"more account features","ar":"المزيد من مميزات حسابي"},"showLessButtonText":{"en":"Show Less","ar":"أظهر أقل"},"items":[{"title":{"en":"Next day Settlement","ar":"تسوية السداد في اليوم التالي"},"subtitle":{"en":"Real-time Transaction Data","ar":"تحويل المعاملات في الوقت المحدد"},"icon":"https://www.tap.company/websiteImages/productsFeaturesImages/goTap/Icons/icon-BB-next-day-settlement.png","description":{"en":"Your Tap website dashboard gives you a live stream of your transactions as they appear in your account, in real time. You can literally watch the money pile up.","ar":"توفر لوحة التحكم لموقع شركة تاب الإلكتروني بظهور تحويلاتك داخل حسابك ، يمكنك مشاهدة تراكم الأموال."},"image":"https://www.tap.company/websiteImages//productsFeaturesImages/goTap/Illustrations/Boubyan-gotap-next-day.gif","partner":"boubyan"},{"title":{"en":"Flexible Banking Options","ar":"خيارات بنكية مرنة"},"subtitle":{"en":"Well Connected & Well Served","ar":"تواصل وخدمة مميّزة"},"icon":"https://www.tap.company/websiteImages/productsFeaturesImages/general/Icons/Flexible-banking.png","description":{"en":"Tap is connected with every single bank in Kuwait. That means you can easily link your Tap gateway to your favorite bank account and start receiving payments instantly. You also have total freedom to switch from one bank to another anytime you wish while using Tap. No hold up, no grunt work, and absolutely no obligations.","ar":"يرتبط تاپ مع جميع البنوك العاملة في الكويت وهذا يعني أنه بإمكانك استخدام تاپ كوسيلة لدخول حسابك المصرفي وتحويل الأموال مباشرة إلى رصيدك. كما يمكنك الانتقال من أي مصرف إلى آخر عبر استخدامك تاپ. لا انتظار، لا عمل مضني ولا التزامات."},"image":"https://www.tap.company/websiteImages/productsFeaturesImages/general/Illustrations/Flexible-Banking-Options.png","partner":"none"},{"title":{"en":"Same Day Activation","ar":"تفعيل في اليوم نفسه"},"subtitle":{"en":"Start Selling Now","ar":"ابدأ بيع منتجاتك الآن"},"icon":"https://www.tap.company/websiteImages/productsFeaturesImages/goCollect/Icons/Same-Day-Activation.png","description":{"en":"Set up, connect, and collect payment in less than 24 hours. Our online registration system smoothly guides you through all the required steps, and helps you get your online payments collection service up and running in record time. A little more old-school? No problem. Our team of dedicated onboarding assistants is happy to get on the phone with you or through our live chat and get you activated as soon as possible.","ar":"أنشىء حسابك، تواصل وابدأ ببيع منتجك خلال 24 ساعة فقط. فبرنامج التسجيل السلس يرشدك إلى إنجاز جميع الخطوات بسهولة وسرعة ويساعدك على الحصول على مستحقاتك المالية في وقت غير مسبوق. تشعر بأن كل ذلك جديد بالنسبة إليك؟ لا تقلق. طاقمنا من المساعدين المكرّس لخدمتك سيسعده التحدث معك وإتمام عملية تفعيل حسابك بأسرع وقت ممكن."},"image":"https://www.tap.company/websiteImages/productsFeaturesImages/general/Illustrations/Same-Day-Activation.png"},{"title":{"en":"Dedicated Support","ar":"دعم مخصّص"},"subtitle":{"en":"Questions? Don’t Be Shy","ar":"لديك أسئلة؟ لا تتردّد"},"icon":"https://www.tap.company/websiteImages/productsFeaturesImages/goCollect/Icons/Dedicated-Support.png","description":{"en":"Whether it’s set-up, integration, or follow-through—if you’ve ever got a problem, you can count on Tap for the solution. We do our best to make sure that you can keep working at your best. As your dedicated support team, we’re always here for you—just try us. You can easily reach out to our team using the live chat on our website (or in the goCollect application), email us or call us! ","ar":"سواء أردت إنشاء حساب، دمج أو متابعة حسابك – أو واجهتك أي مشكلة يمكنك الاعتماد علينا، فنحن في تاپ نقدّم لكل مشكلة حل لنضمن استمرارية عملك بأفضل حال. طاقمنا المكرّس لخدمتك مستعد دائماً لمساعدتك. جرّبنا."},"image":"https://www.tap.company/websiteImages/productsFeaturesImages/general/Illustrations/Support.png"},{"title":{"en":"Statements & Receipts","ar":"كشف الحساب والإيصالات"},"subtitle":{"en":"Half The Paperwork, Double The Efficiency","ar":"فعالية أكثر بمعاملات أقل"},"icon":"https://www.tap.company/websiteImages/productsFeaturesImages/goCollect/Icons/statements-and-receipt.png","description":{"en":"Tap’s user dashboard gives you full access to your entire payment and collections history, and provides soft copies of all your receipts for easy printing. All you have to do is login on our website by inserting your email and password to access for your dashboard. You can now download your statement or save it as a PDF.","ar":"يمكنك بفضل لوحة التحكم بحسابك الدخول إلى تاريخ العمليات بالكامل والحصول على نسخ إلكترونية من إيصالاتك التي يسهل طباعتها. الآن أصبح بإمكانك توفير الوقت والجهد من المعاملات والأوراق الكثيرة واستبدال ذلك بإنتاجية أكبر. إنّها صفقة رابحة للجميع: لك وللبيئة على السواء."},"image":"https://www.tap.company/websiteImages/productsFeaturesImages/general/Illustrations/Statements-&-Receipts.png"},{"title":{"en":"Analytics & History","ar":"إحصائيات للمبيعات"},"subtitle":{"en":"Data That Matters To Business","ar":"البيانات التي تفيد أعمالك"},"icon":"https://www.tap.company/websiteImages/productsFeaturesImages/goCollect/Icons/Analytics-&-History.png","description":{"en":"Tap’s analytics dashboard can tell you what’s driving the most effective sales outcomes for your business and what areas you need to focus on most. We also organize each customer’s payment history for you to review in detail whenever you need it. We’ll bring the tools; you bring the drive.","ar":"تقدّم لك لوحة التحكم بحساب تاپ تحليلات تخبرك بأكثر العمليات التسويقية تأثيراً لجهة الدخل في السوق وما هي المجالات التي عليك التركيز عليها أكثر. كما ننظم تاريخ دفوعات كل عميل لديك كي تتمكن من الاطلاع عليها بالتفصيل في أي وقت. نحن نؤمّن لك كل الوسائل لتنطلق…وأنت عليك أن تقود."},"image":"https://www.tap.company/websiteImages/productsFeaturesImages/general/Illustrations/Analytics-&-History.png"},{"title":{"en":"Security","ar":"الحماية والأمان"},"subtitle":{"en":"100% Secure","ar":"حماية تثق بها"},"icon":"https://www.tap.company/websiteImages/productsFeaturesImages/goCollect/Icons/Security.png","description":{"en":"There’s nothing our team takes more seriously than keeping you and your business safe while using Tap. That’s why we’ve outfitted our entire system with banking-industry security levels and encryption protocols, as well as remaining compliant with global PCI DSS security standards. At Tap, we have an unwavering commitment to your peace of mind, and that starts with keeping your business completely safe online. That’s a promise.","ar":"فريق عملنا يضع في سلّم أولوياته حماية أعمالك عند استخدامك تاپ. لذلك أنشأنا برنامجنا تماماً وفقاً لمعايير السلامة البنكية وبروتوكول الحماية المتعارف عليه كما أننا ندعم معايير السلامة العالمية وفق برنامج PCI DSS. في تاپ، نلتزم براحة بالك ونعرف جيّدا ً أن تحقيق ذلك يبدأ بضمان سلامة أعمالك الإلكترونية وحمايتها. وهذا وعدنا."},"image":"https://www.tap.company/websiteImages/productsFeaturesImages/general/Illustrations/Security.png"},{"title":{"en":"All Businesses Welcome","ar":"جميع الأعمال التجارية"},"subtitle":{"en":"The big, the small, and the in-between","ar":"الصغيرة، الكبيرة والمتوسطة"},"icon":"https://www.tap.company/websiteImages/productsFeaturesImages/goCollect/Icons/All-Businesses-Welcome.png","description":{"en":"At Tap, everyone’s welcome. Our system is built to fit the unique needs and demands of every business, regardless of size or operations. Among our list of favorite Tap users you’ll find mega-giants right alongside some awesome micro businesses, SME’s or Tech Startups. Ready to jump on-board?","ar":"أهلاً بالجميع في تاپ. برنامجنا مصمم ليلائم احتياجات ومتطلبات جميع الشركات بغض النظر عن حجم المؤسسة وطبيعة عملها. ستجد ضمن قائمة عملائنا المفضّلين OSN ،VIVA ،Bein Sports إلى جانب العديد من المؤسسات المنزلية الصغيرة والمجلات أو المطبوعات الإلكترونية مثال مجلة Khaleejesque ،The WalK In Closet و Cake District. مستعد للإنضمام إلينا؟"},"image":"https://www.tap.company/websiteImages/productsFeaturesImages/general/Illustrations/All-Businesses-Welcome.png","partner":"none"}]}]},{"product":"pay","categories":[{"categoryName":{"en":"Features","ar":"مميّزات"},"showMoreButtonText":{"en":"more features","ar":"المزيد من المميّزات"},"showLessButtonText":{"en":"Show Less","ar":"أظهر أقل"},"items":[{"title":{"en":"List","ar":"القائمة"},"subtitle":{"en":"Flow Through Your Finances.","ar":"راقب مصاريفك"},"icon":"https://www.tap.company/websiteImages/productsFeaturesImages/goPay/Icons/gopay-Icon-MyList.png","description":{"en":"Simply enter your relevant information upon access and let goPay take it from there! goPay will instantly retrieve all your connected payments and bills, and automatically prioritize them for you in a clear list format. No stress, no clutter, no confusion. Just focus, clarity, and instant peace of mind. Yeah–just like that.","ar":"ببساطة أدخل كل المعلومات المتعلّقة بالفاتورة ودع goPay يتولّى المهمة بعد ذلك! سيقوم goPay باسترجاع جميع فواتيرك ومدفوعاتك المتعلّقة بها وينظمها تبعاً للأولوية في قائمة واضحة وسهلة الاستخدام. لا مكان للقلق أو الفوضى أو التوتر. بل للتركيز، الوضوح، السرعة وراحة البال. تماماً.."},"image":"https://www.tap.company/websiteImages/productsFeaturesImages/goPay/Illustrations/goPay_My_list.png","videoButtonText":{"en":"Watch the video","ar":"شاهد الفيديو"},"video":{"en":"//player.vimeo.com/video/158805402?width=1080&autoplay=0&byline=0&portrait=0&color=cccccc","ar":"//player.vimeo.com/video/161346948?width=1080&autoplay=0&byline=0&portrait=0&color=cccccc"}},{"title":{"en":"Multiple Payments","ar":"الدفع لأكثر من جهة"},"subtitle":{"en":"All Together, All At Once.","ar":"عدّة فواتير. بلمسة واحدة"},"icon":"https://www.tap.company/websiteImages/productsFeaturesImages/goPay/Icons/gopay-Icon-multi-payments.png","description":{"en":"You can now pay for things like your bills, your subscriptions, and your iTunes cards all together, all at once. So while the rest of the world is busy hopping from site to site trying to figure out all their different payments at the same time, you’ll be taking it easy. Because with goPay, life is good.","ar":"يمكنك الآن تسديد فواتيرك، أو اشتراكاتك أو بطاقاتك من متجر iTunes بلمسة واحدة. وفّر على نفسك عناء التنقّل من موقع إلكتروني إلى آخر وإدخال بياناتك لتسديد مستحقاتك… ودع ذلك للآخرين! أمّا أنت فاختر الطريقة الأسهل. goPay خيارك لحياة أفضل."},"image":"https://www.tap.company/websiteImages/productsFeaturesImages/goPay/Illustrations/goPay_Multi_Payments.png","videoButtonText":{"en":"Watch the video","ar":"شاهد الفيديو"},"video":{"en":"//player.vimeo.com/video/158877162?width=1080&autoplay=0&byline=0&portrait=0&color=cccccc","ar":"//player.vimeo.com/video/161347019?width=1080&autoplay=0&byline=0&portrait=0&color=cccccc"}},{"title":{"en":"Notifications","ar":"الإشعارات"},"subtitle":{"en":"Never Fall Behind","ar":"لا تنس مواعيد فواتيرك"},"icon":"https://www.tap.company/websiteImages/productsFeaturesImages/goPay/Icons/gopay-Icon-notifications.png","description":{"en":"Whenever an upcoming payment due date comes up on your calendar, goPay sends you a speedy little notification to remind you to take care of it in case you forgot. Because when life’s too busy to remember all the big stuff, goPay remembers them for you. (You can take the credit though—we won’t tell.)","ar":"عند حلول موعد استحقاق أي من فواتيرك، سيقوم goPay بإرسال إشعار سريع لتذكيرك بتسديدها. عندما تنشغل بأمور الحياة و تصبح غير قادر على تذكّر كل الأشياء المهمة، يقوم goPay بتذكّرها عنك (وهذا هو السر الذي لن يعرفه أحد سوى أنت)."},"image":"https://www.tap.company/websiteImages/productsFeaturesImages/goPay/Illustrations/goPay_Notifications.png","videoButtonText":{"en":"Watch the video","ar":"شاهد الفيديو"},"video":{"en":"//player.vimeo.com/video/158877223?width=1080&autoplay=0&byline=0&portrait=0&color=cccccc","ar":"//player.vimeo.com/video/161347079?width=1080&autoplay=0&byline=0&portrait=0&color=cccccc"}},{"title":{"en":"Scan","ar":"مسح البطاقة"},"subtitle":{"en":"Heavy-Duty Protection. Guaranteed.","ar":"حماية مضمونة"},"icon":"https://www.tap.company/websiteImages/productsFeaturesImages/goPay/Icons/gopay-Icon-Scan.png","description":{"en":"With goPay’s scan feature, check out just got a whole lot faster! What used to take several minutes now takes only a few seconds. Just place your card in front of your phone’s camera, and goPay’s engine will instantly recognize and input the information for you. Because you’re cool and snazzy like that.","ar":"مع ميّزة المسح، جميع إجراءاتك أصبحت أسهل وأسرع! فأي عملية كانت تحتاج إلى عدّة دقائق أصبحت تتم بلحظات معدودة. فقط ضع بطاقتك أمام كاميرا الهاتف، وسيقوم محرّك goPay بالتعرّف إليها وعرض البيانات المتعلّقة بشأنها كل ذلك لأنّنا نفهم مزاجك!"},"image":"https://www.tap.company/websiteImages/productsFeaturesImages/goPay/Illustrations/goPay_Scan.png","videoButtonText":{"en":"Watch the video","ar":"شاهد الفيديو"},"video":{"en":"//player.vimeo.com/video/158877347?width=1080&autoplay=0&byline=0&portrait=0&color=cccccc","ar":"//player.vimeo.com/video/161348708?width=1080&autoplay=0&byline=0&portrait=0&color=cccccc"}},{"title":{"en":"Receipts","ar":"الإيصالات"},"subtitle":{"en":"Know Where Your Money’s Going.","ar":"نظّم مدفوعاتك"},"icon":"https://www.tap.company/websiteImages/productsFeaturesImages/goPay/Icons/gopay-Icon-Receipts.png","description":{"en":"Whenever you make a purchase through goPay you can choose to have your receipts stored as a screen capture on your phone’s camera roll for later reference. That means that you can now access your entire transaction history at any time, and in one place. Which also means that you can now finally track down that odd 100 KD that keeps disappearing on you every month.","ar":"ستتمكّن خلال التسوّق من حفظ صورة لفاتورتك في التطبيق عبر كاميرا هاتفك النقّال للاطلاع عليها لاحقاً. ما يعني إمكانية الدخول إلى مدفوعاتك السابقة في أي وقت ومن مكان واحد وبالتالي ستتمكّن من مراقبة مصاريفك بالكامل واكتشاف سر الاختفاء المتواصل للـ100 د.ك كل شهر من رصيدك."},"image":"https://www.tap.company/websiteImages/productsFeaturesImages/goPay/Illustrations/goPay_Receipts.png","videoButtonText":{"en":"Watch the video","ar":"شاهد الفيديو"},"video":{"en":"//player.vimeo.com/video/158877256?width=1080&autoplay=0&byline=0&portrait=0&color=cccccc","ar":"//player.vimeo.com/video/161347591?width=1080&autoplay=0&byline=0&portrait=0&color=cccccc"}},{"title":{"en":"Security","ar":"الحماية والأمان"},"subtitle":{"en":"Heavy-Duty Protection. Guaranteed.","ar":"حماية مضمونة"},"icon":"https://www.tap.company/websiteImages/productsFeaturesImages/goPay/Icons/gopay-Icon-Security.png","description":{"en":"You can absolutely rest assured knowing that all of your financial and personal details are fully protected within goPay’s encrypted and multi-level security operations. For your complete peace of mind goPay is backed with global banking grade protective measures that are compliant with PCI DSS security standards. Which is all technical finance lingo for: we’ve got you covered.","ar":"يمكنك التأكد تماماً من أن جميع بياناتك المصرفية والشخصية محمية بالكامل بفضل إجراءات الحماية القوية المطبّقة في goPay. ومن أجل راحة بالك، يعتمد goPay أعلى أنظمة حماية بنكية مدعومة بمعايير PCI DSS لنؤمن تغطيتك بالكامل."},"image":"https://www.tap.company/websiteImages/productsFeaturesImages/goPay/Illustrations/goPay_Security.png","videoButtonText":{"en":"Watch the video","ar":"شاهد الفيديو"},"video":{"en":"//player.vimeo.com/video/158877390?width=1080&autoplay=0&byline=0&portrait=0&color=cccccc","ar":"//player.vimeo.com/video/161348208?width=1080&autoplay=0&byline=0&portrait=0&color=cccccc"}}]}]}]}

/***/ }),
/* 49 */
/***/ (function(module, exports) {

module.exports = {"intro":{"en":"We are Tap.\nWe’re in the business of money.\nAnd you’re in the right place.","ar":"نحن تاپ. نعمل في المجال المالي.\nوأنت الآن في المكان الصحيح."},"subIntro":{"en":"Here’s why we do what we do best.","ar":"لهذه الأسباب، نحن نقدّم أفضل ما لدينا من خدمات."}}

/***/ }),
/* 50 */
/***/ (function(module, exports) {

module.exports = [{"product":"collect","title":{"en":"Businesses","ar":"المتاجر"},"businessesList":[{"id":"0","businesseName":"Alive Yoga","businesseLogo":"https://www.tap.company/websiteImages/businessesLogos/goCollect/goCollect-aliveyoga.svg","businesseLink":"https://aliveyoga.com/"},{"id":"1","businesseName":"Gold Gym","businesseLogo":"https://www.tap.company/websiteImages/businessesLogos/goCollect/goCollect-golds_gym.svg","businesseLink":"https://www.goldsgym.com"},{"id":"2","businesseName":"Let's Meat","businesseLogo":"https://www.tap.company/websiteImages/businessesLogos/goCollect/goCollect-lets_meat.svg","businesseLink":"https://www.instagram.com/letsmeatkw/?hl=en"},{"id":"3","businesseName":"Coded","businesseLogo":"https://www.tap.company/websiteImages/businessesLogos/goCollect/goCollect-coded.svg","businesseLink":"https://www.joincoded.com/"},{"id":"4","businesseName":"Erada","businesseLogo":"https://www.tap.company/websiteImages/businessesLogos/goCollect/goCollect_erada_business_incubator.svg","businesseLink":"https://www.erada.io/"},{"id":"5","businesseName":"Hilton Kuwait Resort","businesseLogo":"https://www.tap.company/websiteImages/businessesLogos/goCollect/goCollect-hilton.svg","businesseLink":"https://www3.hilton.com/en/hotels/kuwait/hilton-kuwait-resort-KWIHIHI/index.html"},{"id":"6","businesseName":"miamakeup","businesseLogo":"https://www.tap.company/websiteImages/businessesLogos/goCollect/goCollect-mia.svg","businesseLink":"https://www.miamakeup.it/en/"},{"id":"7","businesseName":"Angelato","businesseLogo":"https://www.tap.company/websiteImages/businessesLogos/goCollect/goCollect-angelato.svg","businesseLink":"https://www.instagram.com/angelato_kwt/?hl=en"},{"id":"8","businesseName":"flare fitness","businesseLogo":"https://www.tap.company/websiteImages/businessesLogos/goCollect/goCollect-flare_fitness.svg","businesseLink":"https://www.flare.fitness/"},{"id":"9","businesseName":"Ora","businesseLogo":"https://www.tap.company/websiteImages/businessesLogos/goCollect/goCollect-ora.svg","businesseLink":"https://www.instagram.com/ora.kw/?hl=en"},{"id":"10","businesseName":"hanan dashti","businesseLogo":"https://www.tap.company/websiteImages/businessesLogos/goCollect/goCollect-hanan_dashti.svg","businesseLink":"https://hanan-dashti.com/"},{"id":"11","businesseName":"salto","businesseLogo":"https://www.tap.company/websiteImages/businessesLogos/goCollect/goCollect-salto.svg","businesseLink":"https://www.saltokw.com/"},{"id":"12","businesseName":"Etheco","businesseLogo":"https://www.tap.company/websiteImages/businessesLogos/goCollect/goCollect-etheco.svg","businesseLink":"https://shopetheco.com/password"},{"id":"13","businesseName":"amirahalshaalan","businesseLogo":"https://www.tap.company/websiteImages/businessesLogos/goCollect/goCollect-AS.svg","businesseLink":"https://www.instagram.com/amirahalshaalan/"},{"id":"14","businesseName":"gulfrun","businesseLogo":"https://www.tap.company/websiteImages/businessesLogos/goCollect/goCollect-gulfrun.svg","businesseLink":"https://www.gulfrun.com/"},{"id":"15","businesseName":"porshe club","businesseLogo":"https://www.tap.company/websiteImages/businessesLogos/goCollect/goCollect-porshe_club.svg","businesseLink":"https://www.instagram.com/porscheclubq8/"}]},{"product":"sell","title":{"en":"Businesses","ar":"المتاجر"},"businessesList":[{"businesseName":"Myhome","businesseLogo":"https://www.tap.company/websiteImages/businessesLogos/goSell/goSell_my_home.svg","businesseLink":"https://aliveyoga.com/"},{"businesseName":"srvme","businesseLogo":"https://www.tap.company/websiteImages/businessesLogos/goSell/goSell_srvme.svg","businesseLink":"https://www.instagram.com/srvme.kuwait/?hl=en"},{"businesseName":"Loyac","businesseLogo":"https://www.tap.company/websiteImages/businessesLogos/goSell/goSell_loyac.svg","businesseLink":"https://www.loyac.org/default_en.aspx"},{"businesseName":"DOH","businesseLogo":"https://www.tap.company/websiteImages/businessesLogos/goSell/goSell_doh.svg","businesseLink":"https://www.instagram.com/dohkw/?hl=en"},{"businesseName":"Spark","businesseLogo":"https://www.tap.company/websiteImages/businessesLogos/goSell/goSell_spark.svg","businesseLink":"https://www.sparkathletic.com/"},{"businesseName":"Skiplino","businesseLogo":"https://www.tap.company/websiteImages/businessesLogos/goSell/goSell_skiplino.svg","businesseLink":"https://skiplino.com/"},{"businesseName":"Joa","businesseLogo":"https://www.tap.company/websiteImages/businessesLogos/goSell/goSell_joa.svg","businesseLink":"https://www.instagram.com/joa.kw/?hl=en"},{"businesseName":"SeoulKool","businesseLogo":"https://www.tap.company/websiteImages/businessesLogos/goSell/goSell_seoul_kool.svg","businesseLink":"https://www.seoulkool.me/"},{"businesseName":"Tatami","businesseLogo":"https://www.tap.company/websiteImages/businessesLogos/goSell/goSell_tatami.svg","businesseLink":"http://www.tatami-japanese.com/"},{"businesseName":"bee","businesseLogo":"https://www.tap.company/websiteImages/businessesLogos/goSell/goSell_pantybee.svg","businesseLink":"https://www.pantrybee.com/"},{"businesseName":"Coulr","businesseLogo":"https://www.tap.company/websiteImages/businessesLogos/goSell/goSell_coulr.svg","businesseLink":"https://coulr.com/"},{"businesseName":"belbait","businesseLogo":"https://www.tap.company/websiteImages/businessesLogos/goSell/goSell_belbait.svg","businesseLink":"https://bilbayt.com/kw/en"},{"businesseName":"Craft","businesseLogo":"https://www.tap.company/websiteImages/businessesLogos/goSell/goSell_craft.svg","businesseLink":"https://www.craftandcompany.co/"},{"businesseName":"Khaleejesque","businesseLogo":"https://www.tap.company/websiteImages/businessesLogos/goSell/goSell_khaleejesque.svg","businesseLink":"https://khaleejesque.com/"},{"businesseName":"nuqat","businesseLogo":"https://www.tap.company/websiteImages/businessesLogos/goSell/goSell_nuqat.svg","businesseLink":"http://www.nuqat.me/en/nuqat-foundation"},{"businesseName":"the proteges","businesseLogo":"https://www.tap.company/websiteImages/businessesLogos/goSell/goSell_the_proteges.svg","businesseLink":"http://www.theproteges.org/"}]},{"product":"pay","title":{"en":"Businesses","ar":"المتاجر"},"businessesList":[{"businesseName":"zain","businesseLogo":"https://www.tap.company/websiteImages/businessesLogos/goPay/goPay_zain.svg","businesseLink":"https://www.kw.zain.com/ar/kw"},{"businesseName":"ooredoo","businesseLogo":"https://www.tap.company/websiteImages/businessesLogos/goPay/goPay_ooredoo.png","businesseLink":"https://www.ooredoo.com.kw/portal/en/index"},{"businesseName":"viva","businesseLogo":"https://www.tap.company/websiteImages/businessesLogos/goPay/goPay_viva.png","businesseLink":"http://www.viva.com.kw/ar/"},{"businesseName":"itunes","businesseLogo":"https://www.tap.company/websiteImages/businessesLogos/goPay/goPay_itunes.png","businesseLink":"https://www.apple.com/itunes/"},{"businesseName":"flare fitness","businesseLogo":"https://www.tap.company/websiteImages/businessesLogos/goPay/goPay-flare_fitness.svg","businesseLink":"https://www.flare.fitness/"},{"businesseName":"salto","businesseLogo":"https://www.tap.company/websiteImages/businessesLogos/goPay/goPay-salto.svg","businesseLink":"https://www.saltokw.com/"},{"businesseName":"coded","businesseLogo":"https://www.tap.company/websiteImages/businessesLogos/goPay/goPay-coded.svg","businesseLink":"https://www.joincoded.com/"},{"businesseName":"as","businesseLogo":"https://www.tap.company/websiteImages/businessesLogos/goPay/gopay_AS.svg","businesseLink":"https://www.instagram.com/amirahalshaalan/"}]}]

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(115);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(2)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../node_modules/css-loader/index.js!./mainPage.css", function() {
			var newContent = require("!!../../../../node_modules/css-loader/index.js!./mainPage.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(117);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(2)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../node_modules/css-loader/index.js!./parallaxScroll.css", function() {
			var newContent = require("!!../../../../node_modules/css-loader/index.js!./parallaxScroll.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(120);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(2)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../node_modules/css-loader/index.js!./testimonialsQuotes.css", function() {
			var newContent = require("!!../../../../node_modules/css-loader/index.js!./testimonialsQuotes.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./App.css": 55,
	"./ar.css": 123,
	"./components/APIPage/apiPage.css": 56,
	"./components/ActivatePage/activatePage.css": 57,
	"./components/ActivatePaymentPage/activatePayment.css": 58,
	"./components/AnimatedRow/animatedRow.css": 43,
	"./components/Banner/Banner.css": 28,
	"./components/CallToAction/CallToAction.css": 38,
	"./components/ErrorPage/notFound.css": 59,
	"./components/Feature/feature.css": 61,
	"./components/Features/Features.css": 32,
	"./components/Footer/Footer.css": 62,
	"./components/Header/Header.css": 64,
	"./components/IframePage/iframePage.css": 65,
	"./components/LightBox/lightBox.css": 36,
	"./components/Loader/loader.css": 66,
	"./components/MainPage/mainPage.css": 51,
	"./components/Page/page.css": 67,
	"./components/ParallaxScroll/parallaxScroll.css": 52,
	"./components/Plans/plans.css": 68,
	"./components/Planss/plans.css": 138,
	"./components/ProductPage/productPage.css": 69,
	"./components/ProductsBlocks/productsBlocks.css": 40,
	"./components/SendEmailFrom/sendEmailForm.css": 70,
	"./components/Separator/Separator.css": 30,
	"./components/Slider/slider.css": 39,
	"./components/TapAddress/tapAddress.css": 71,
	"./components/TapButton/TapButton.css": 31,
	"./components/TapCarouselSlider/tapCarouselSlider.css": 46,
	"./components/TapInput/TapInput.css": 35,
	"./components/TapLink/tapLink.css": 72,
	"./components/TapSelect/TapSelect.css": 34,
	"./components/TapTabs/tabTabs.css": 144,
	"./components/TapTextArea/tapTextArea.css": 73,
	"./components/TeamMembers/teamMembers.css": 74,
	"./components/TestimonialsQuotes/testimonialsQuotes.css": 53,
	"./en.css": 148,
	"./fadeAnimation.css": 75,
	"./rightLeftAnimation.css": 76,
	"./shortRightLeftAnimation.css": 77,
	"./topBottomAnimation.css": 78
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 54;

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(122);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(2)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!./App.css", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!./App.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(127);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(2)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../node_modules/css-loader/index.js!./apiPage.css", function() {
			var newContent = require("!!../../../../node_modules/css-loader/index.js!./apiPage.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(128);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(2)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../node_modules/css-loader/index.js!./activatePage.css", function() {
			var newContent = require("!!../../../../node_modules/css-loader/index.js!./activatePage.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(129);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(2)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../node_modules/css-loader/index.js!./activatePayment.css", function() {
			var newContent = require("!!../../../../node_modules/css-loader/index.js!./activatePayment.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(130);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(2)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../node_modules/css-loader/index.js!./notFound.css", function() {
			var newContent = require("!!../../../../node_modules/css-loader/index.js!./notFound.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "fonts/CRC25.otf";

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(131);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(2)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../node_modules/css-loader/index.js!./feature.css", function() {
			var newContent = require("!!../../../../node_modules/css-loader/index.js!./feature.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(132);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(2)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../node_modules/css-loader/index.js!./Footer.css", function() {
			var newContent = require("!!../../../../node_modules/css-loader/index.js!./Footer.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "fonts/neue-helvetica-arabic.ttf";

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(133);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(2)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../node_modules/css-loader/index.js!./Header.css", function() {
			var newContent = require("!!../../../../node_modules/css-loader/index.js!./Header.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(134);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(2)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../node_modules/css-loader/index.js!./iframePage.css", function() {
			var newContent = require("!!../../../../node_modules/css-loader/index.js!./iframePage.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(135);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(2)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../node_modules/css-loader/index.js!./loader.css", function() {
			var newContent = require("!!../../../../node_modules/css-loader/index.js!./loader.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(136);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(2)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../node_modules/css-loader/index.js!./page.css", function() {
			var newContent = require("!!../../../../node_modules/css-loader/index.js!./page.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(137);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(2)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../node_modules/css-loader/index.js!./plans.css", function() {
			var newContent = require("!!../../../../node_modules/css-loader/index.js!./plans.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(140);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(2)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../node_modules/css-loader/index.js!./productPage.css", function() {
			var newContent = require("!!../../../../node_modules/css-loader/index.js!./productPage.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(141);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(2)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../node_modules/css-loader/index.js!./sendEmailForm.css", function() {
			var newContent = require("!!../../../../node_modules/css-loader/index.js!./sendEmailForm.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(142);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(2)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../node_modules/css-loader/index.js!./tapAddress.css", function() {
			var newContent = require("!!../../../../node_modules/css-loader/index.js!./tapAddress.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(143);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(2)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../node_modules/css-loader/index.js!./tapLink.css", function() {
			var newContent = require("!!../../../../node_modules/css-loader/index.js!./tapLink.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(146);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(2)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../node_modules/css-loader/index.js!./tapTextArea.css", function() {
			var newContent = require("!!../../../../node_modules/css-loader/index.js!./tapTextArea.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(147);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(2)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../node_modules/css-loader/index.js!./teamMembers.css", function() {
			var newContent = require("!!../../../../node_modules/css-loader/index.js!./teamMembers.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(154);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(2)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!./fadeAnimation.css", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!./fadeAnimation.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(155);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(2)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!./rightLeftAnimation.css", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!./rightLeftAnimation.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(156);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(2)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!./shortRightLeftAnimation.css", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!./shortRightLeftAnimation.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(157);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(2)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!./topBottomAnimation.css", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!./topBottomAnimation.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _mobxReact = __webpack_require__(7);

var _TapInput = __webpack_require__(21);

var _TapInput2 = _interopRequireDefault(_TapInput);

var _TapButton = __webpack_require__(6);

var _TapButton2 = _interopRequireDefault(_TapButton);

var _TapSelect = __webpack_require__(33);

var _TapSelect2 = _interopRequireDefault(_TapSelect);

var _TapTextArea = __webpack_require__(169);

var _TapTextArea2 = _interopRequireDefault(_TapTextArea);

var _Img = __webpack_require__(3);

var _Img2 = _interopRequireDefault(_Img);

var _axios = __webpack_require__(17);

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SendEmailFrom = function (_Component) {
  _inherits(SendEmailFrom, _Component);

  function SendEmailFrom(props) {
    _classCallCheck(this, SendEmailFrom);

    var _this = _possibleConstructorReturn(this, (SendEmailFrom.__proto__ || Object.getPrototypeOf(SendEmailFrom)).call(this, props));

    _this.state = {
      fieldsValues: [],
      loading: false,
      success: false
    };

    _this.onValueChange = _this.onValueChange.bind(_this);
    return _this;
  }

  _createClass(SendEmailFrom, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _this2 = this;

      __webpack_require__(70);
      this.props.fields.map(function (field, key) {
        _this2.state.fieldsValues.push({ value: '' });
      });
    }
  }, {
    key: 'onValueChange',
    value: function onValueChange(key, e) {
      this.state.fieldsValues[key].value = e.target.value;
    }
  }, {
    key: 'sendEmail',
    value: function sendEmail(fields) {
      var _this3 = this;

      this.setState({ loading: true });
      var template_params = {};
      fields.map(function (field, key) {
        template_params[field.fieldkey] = _this3.state.fieldsValues[key].value;
      });
      _axios2.default.post('https://api.emailjs.com/api/v1.0/email/send', {
        service_id: 'tap_payments',
        template_id: this.props.template_id,
        user_id: 'user_4bWTbHQ0owEYh7cYK1PFD',
        template_params: template_params
      }).then(function (response) {
        return response.data;
      }).then(function (data) {
        _this3.setState({ loading: false, success: true });
        setTimeout(function () {
          this.setState({ success: false });
        }.bind(_this3), 4500);
      }).catch(function (error) {
        _this3.setState({ loading: false });
        alert('something went wrong!');
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var fieldsStyle = this.props.fieldsStyle;
      return _react2.default.createElement(
        'div',
        { className: 'sendEmailFrom' },
        _react2.default.createElement(
          'div',
          { className: this.state.success ? 'hidenDiv sendEmailFromForm opacityTransition' : 'shownDiv sendEmailFromForm opacityTransition' },
          _react2.default.createElement(
            'h1',
            null,
            this.props.title
          ),
          _react2.default.createElement('br', null),
          this.props.fields ? this.props.fields.map(function (field, key) {
            return _react2.default.createElement(
              _react2.default.Fragment,
              { key: key },
              field.type === 'input' ? _react2.default.createElement(
                _react2.default.Fragment,
                null,
                _react2.default.createElement(_TapInput2.default, {
                  placeholder: field.title,
                  style: fieldsStyle,
                  onChange: function onChange(e) {
                    return _this4.onValueChange(key, e);
                  }
                }),
                _react2.default.createElement('br', null),
                _react2.default.createElement('br', null)
              ) : _react2.default.createElement(
                _react2.default.Fragment,
                null,
                field.type === 'select' ? _react2.default.createElement(
                  _react2.default.Fragment,
                  null,
                  _react2.default.createElement(_TapSelect2.default, {
                    type: 'customSelect',
                    value: field.title,
                    options: field.options,
                    withArrow: true,
                    style: fieldsStyle,
                    customOnChangeFun: _this4.onValueChange,
                    fieldKey: key
                  }),
                  _react2.default.createElement('br', null),
                  _react2.default.createElement('br', null)
                ) : _react2.default.createElement(
                  _react2.default.Fragment,
                  null,
                  field.type === 'textArea' ? _react2.default.createElement(
                    _react2.default.Fragment,
                    null,
                    _react2.default.createElement(_TapTextArea2.default, {
                      placeholder: field.title,
                      style: fieldsStyle,
                      onChange: function onChange(e) {
                        return _this4.onValueChange(key, e);
                      }
                    }),
                    _react2.default.createElement('br', null),
                    _react2.default.createElement('br', null)
                  ) : null
                )
              )
            );
          }) : null,
          _react2.default.createElement(_TapButton2.default, {
            text: this.props.buttonText,
            shape: 'bordered colored',
            color: this.props.buttonColor,
            hoverStyle: true,
            style: fieldsStyle,
            onClick: function onClick() {
              return _this4.sendEmail(_this4.props.fields);
            },
            loading: this.state.loading
          })
        ),
        _react2.default.createElement(
          'div',
          { className: this.state.success ? 'shownDiv formSentSuccesfully opacityTransition' : 'hidenDiv formSentSuccesfully opacityTransition' },
          _react2.default.createElement(
            'div',
            { className: 'formSentSuccesfullyContent container' },
            _react2.default.createElement(_Img2.default, { src: 'https://image.flaticon.com/icons/svg/291/291201.svg', className: 'formSentSuccesfullyImage', alt: 'success_icon' }),
            _react2.default.createElement('div', { style: { height: '20px' } }),
            _react2.default.createElement(
              'h3',
              null,
              this.props.successMessage
            ),
            _react2.default.createElement(
              'h6',
              null,
              this.props.successSubMessage
            )
          )
        )
      );
    }
  }]);

  return SendEmailFrom;
}(_react.Component);

exports.default = (0, _mobxReact.observer)(SendEmailFrom);

/***/ }),
/* 80 */
/***/ (function(module, exports) {

module.exports = [{"key":"contactus","template_id":"contact_us","title":{"en":"Get in Touch","ar":"تواصل معنا"},"requiredText":{"en":"(required)","ar":"(مطلوب)"},"fields":[{"type":"input","fieldkey":"name","title":{"en":"Your Name","ar":"الاسم"},"required":true},{"type":"input","fieldkey":"email_address","title":{"en":"Your Email","ar":"بريدك الإلكتروني"},"required":true},{"type":"input","fieldkey":"phone_number","title":{"en":"Phone Number","ar":"رقم الهاتف"},"required":false},{"type":"select","fieldkey":"product_name","title":{"en":"Product Name","ar":"اسم المنتج"},"options":[{"optionValue":{"en":"goPay","ar":"goPay"}},{"optionValue":{"en":"goSell","ar":"goSell"}},{"optionValue":{"en":"goCollect","ar":"goCollect"}},{"optionValue":{"en":"goTap","ar":"goTap"}},{"optionValue":{"en":"API","ar":"API"}}],"required":false},{"type":"input","fieldkey":"subject","title":{"en":"Subject","ar":"الموضوع"},"required":false},{"type":"textArea","fieldkey":"message","title":{"en":"Write your message..","ar":"نص الرسالة ..."},"required":false}],"buttonText":{"en":"Send","ar":"إرسال"}},{"key":"applyforajob","template_id":"apply_for_a_job","title":{"en":"Apply for a position now","ar":"تقدم إلى وظيفة الآن"},"requiredText":{"en":"(required)","ar":"(مطلوب)"},"fields":[{"type":"input","fieldkey":"name","title":{"en":"Your Name","ar":"الاسم"},"required":true},{"type":"input","fieldkey":"email_address","title":{"en":"Your Email","ar":"بريدك الإلكتروني"},"required":true},{"type":"input","fieldkey":"phone_number","title":{"en":"Phone Number","ar":"رقم الهاتف"},"required":true},{"type":"input","fieldkey":"applying_for","title":{"en":"Position Applying for","ar":"الوظيفة المتقدم لها"},"required":false},{"type":"input","fieldkey":"linkedin","title":{"en":"LinkedIn","ar":"LinkedIn"},"required":false},{"type":"textArea","fieldkey":"brief","title":{"en":"Write a brief about you..","ar":"اكتب لنا نبذة عنك.."},"required":false}],"buttonText":{"en":"Apply","ar":"تقدم"}}]

/***/ }),
/* 81 */
/***/ (function(module, exports) {

module.exports = [{"pageTemplate":"productPage","link":"/collect","image":"https://www.tap.company/websiteImages/ogImages/tap.png","title":{"en":"goCollect! by Tap | Create & Send Invoices Easily","ar":"goCollect! | خدمة إرسال و تحصيل الفواتير بسهوله من تاپ"},"description":{"en":"Tap's goCollect service allows you to send invoices to your customers via SMS, email & social media & collect payments by major debit & credit cards.","ar":"هي خدمة من تاپ لإرسال وتحصيل الفواتيرعن طريق الرسائل القصيرة والإيميل أو مشاركتها على مواقع التواصل الاجتماعي goCollect وقبول الدفع ببطاقات الائتمان بسهوله"},"keyWords":{"en":"Tap , goCollect , invoice , payment , online payment , invoicing system kuwait , quick invoice , send invoice , send bill , billing , online invoice , free invoice template","ar":"تاب , جو كوليكت , فاتورة , دفع , دفع اونلاين , فواتير الكويت , فاتورة سريعة , ارسال فاتورة , حساب التاجر , فاتورة علي الانترنت , نموذج فاتورة , تحصيل , فواتير"}},{"pageTemplate":"productPage","link":"/sell","image":"https://www.tap.company/websiteImages/ogImages/tap.png","title":{"en":"goSell! by Tap | Accept Payments Online","ar":"goSell | خدمة قبول الدفع الالكتروني من تاپ"},"description":{"en":"Tap's goSell service is an online payment gateway that allows you to accept major debit & credit card payments; KNET, Visa & MasterCard, on apps & websites","ar":"هي خدمة تسمح بقبول عمليات الدفع الالكتروني بـ كي نت وفيزا وماستر كارد عن طريق دمج الاضافات المساعدة أو ربط بوابة دفع goSell الكتروني للتطبيقات والمواقع"},"keyWords":{"en":"Tap, goSell, sell, Online, payments, plugin, API, gateway, Integration, e-commerce, kuwait payment gateway, knet Kuwait payment gateway, online payment services","ar":"تاب , جو سيل , بيع في الكويت , تجارة الكترونية , بوابة دفع الكترونية , بوابة دفع في الكويت , خدمة الدفع كينت , كي نت , دفع كي نت , ووردبريس , اوبن كارت , متجر الكتروني , طلبات عبر الانترنت"}},{"pageTemplate":"productPage","link":"/pay","image":"https://www.tap.company/websiteImages/ogImages/tap.png","title":{"en":"goPay! by Tap | Bill Payments To-do List App","ar":"goPay! | كل مدفوعاتك في تطبيق واحد من تاپ"},"description":{"en":"goPay is an app that allows you to keep track of your upcoming To-do list of bill payments & check things off your pay list in an easy, quick & secure way","ar":"تطبيق يمكنك من تنظيم ومتابعة مدفوعاتك ومستحقاتك الشهرية وترتيب أولوياتك ودفع أكثر من فاتورة في الوقت نفسه بطريقة سهلة goPay وسريعة وآمنة"},"keyWords":{"en":"Tap , goPay , Tap payments , Payments kuwait , mobile payments , pay bills , pay invoice , pay online , ooredoo bill , zain bill , viva bill , itunes card , xbox card , internet kuwait , mobile pay , prepaid cards , netflix kuwait , pay by visa , pay by mastercard , knet ,online payment services","ar":"تاب , جوتاب , تاب للدفع , مدفوعات الكويت , دفع من الموبايل , دفع فاتورة , دفع الفواتير , دفع اونلاين , فاتورة اوريدو , فاتورة زين , دفع فواتير زين , دفع فواتير فيفا , دفع فاتورة التليفون, دفع فاتورة الكهرباء , ادفعلي , الانترنت في الكويت , دفع فاتورة الموبايل , كروت مسبقة الدفع , دفع من ايفون , دفع مخالفات المرور الكويت , كي نت الكويت , كي نت فيفا , كي نت الوطنيه , فيزا , ماستركارد , امريكان اكسبرس"}},{"pageTemplate":"productPage","link":"/tap","image":"https://www.tap.company/websiteImages/ogImages/tap.png","title":{"en":"goTap! by Tap | Accept any Payment Anywhere","ar":"goTap! | استقبل المدفوعات من أي مكان من تاپ"},"description":{"en":"If you’re running around your retail store or if you’re a regular at all the local expos, now you can accept any payment, anywhere by facilitating portable K-NET and credit card payment for your customers on the fly.","ar":"رحب بأحدث التقنيات للمبيعات مع goTap ! الآن يمكنك قبول أي دفع من عملائك في أي مكان من خلال تفعيل خدمتنا المتنقلة لمدفوعات ال K-NETوبطاقات الائتمان."},"keyWords":{"en":"Tap , goTap , Tap payments , Payments kuwait , POS , kuwait , NFC , Near-Field-Communication , pay by visa , pay by mastercard , knet ,online payment services","ar":"تاب , جوباي , تاب للدفع , مدفوعات الكويت , دفع من الموبايل , دفع فاتورة , دفع الفواتير , دفع اونلاين , فاتورة اوريدو , فاتورة زين , دفع فواتير زين , دفع فواتير فيفا , دفع فاتورة التليفون, دفع فاتورة الكهرباء , ادفعلي , الانترنت في الكويت , دفع فاتورة الموبايل , كروت مسبقة الدفع , دفع من ايفون , دفع مخالفات المرور الكويت , كي نت الكويت , كي نت فيفا , كي نت الوطنيه , فيزا , ماستركارد , امريكان اكسبرس"}},{"pageTemplate":"productPageWithPartner","link":"/collect/boubyan","partner":"Boubyan","image":"https://www.tap.company/websiteImages/ogImages/tap.png","title":{"en":"goCollect! by Tap | Create & Send Invoices Easily with Boubyan bank","ar":"من تاپ goCollect! | خدمة إرسال و تحصيل الفواتير مع بنك بوبيان"},"description":{"en":"..........","ar":".........."},"keyWords":{"en":"..........","ar":".........."}},{"pageTemplate":"mainPageWithPartner","link":"/boubyan","partner":"Boubyan","image":"https://www.tap.company/websiteImages/ogImages/tap.png","title":{"en":"Tap | Boubyan bank","ar":"تاب | بنك بوبيان"},"description":{"en":"..........","ar":".........."},"keyWords":{"en":"..........","ar":".........."}},{"pageTemplate":"mainPageWithPartner","link":"/nbk","partner":"nbk","image":"https://www.tap.company/websiteImages/ogImages/tap.png","title":{"en":"Tap | nbk","ar":"تاب | بنك الكويت الوطني"},"description":{"en":"..........","ar":".........."},"keyWords":{"en":"..........","ar":".........."}},{"pageTemplate":"mainPageWithPartner","link":"/zain","partner":"zain","image":"https://www.tap.company/websiteImages/ogImages/tap.png","title":{"en":"Tap | zain","ar":"تاب | زين"},"description":{"en":"..........","ar":".........."},"keyWords":{"en":"..........","ar":".........."}},{"pageTemplate":"productPageWithPartner","link":"/collect/nbk","partner":"NBK","image":"https://www.tap.company/websiteImages/ogImages/tap.png","title":{"en":"goCollect! by Tap | Create & Send Invoices Easily with NBK","ar":"من تاپ goCollect! | خدمة إرسال و تحصيل الفواتير مع بنك الكويت الوطني"},"description":{"en":"..........","ar":".........."},"keyWords":{"en":"..........","ar":".........."}},{"pageTemplate":"productPageWithPartner","link":"/collect/zain","partner":"Zain","image":"https://www.tap.company/websiteImages/ogImages/tap.png","title":{"en":"goCollect! by Tap | Create & Send Invoices Easily with Zain","ar":"من تاپ goCollect! | خدمة إرسال و تحصيل الفواتير مع زين"},"description":{"en":"..........","ar":".........."},"keyWords":{"en":"..........","ar":".........."}},{"pageTemplate":"api","link":"/api","image":"https://www.tap.company/websiteImages/ogImages/tap.png","title":{"en":"API Payment Gateway & E-Commerce Plugins | Tap","ar":"بوابة الدفع الالكتروني من تاپ للمطورين | API"},"description":{"en":"Tap provides API Documentation & E-Commerce Plugins allowing developers to integrate card payment acceptance of KNET, Visa, & MasterCard on apps & websites","ar":"من تاپ للمطورين لتمكنهم من دمج بوابة دفع الكتروني وإضافات لمنصات التجارة الالكترونية لقبول عمليات الدفع بـ كي نت وفيزا API وماستركارد للتطبيقات والمواقع"},"keyWords":{"en":"Tap, API, Payment Gateway, E-commerce plugins, knet payment gateway, integration, api , Tap Payments, Payment, kuwait payment gateway, knet, integration, ecommerce gateway, wordpress gateway, Shopify gateway, Magento gateway, Opencart , WooCommerce gateway","ar":"بوابة دفع الكترونية , حلول الدفع , الدفع في الكويت , دمج بوابة دفع , قبول الدفع اونلاين , حلول الدفع للمنصات الالكترونية , بوابة دفع في الكويت"}},{"pageTemplate":"support","link":"/support","image":"https://www.tap.company/websiteImages/ogImages/tap.png","title":{"en":"Tap | Support","ar":"تاب | دعم"},"description":{"en":"Your comments, suggestions, or concerns matter to us and our team is here to listen, assist and enhance the Tap experience.","ar":"تعليقاتكم، اقتراحات، أو اهتمامتكم تعني لنا الكثير وفريقنا دائما هنا للاستماع إليكم والمساعدة والإجابة على استفساراتكم لتعزيز تجربتكم مع تاب."},"keyWords":{"en":"support, contact us, assist, answer, question, help","ar":"دعم، مساعدة، تواصل معنا، خدمة العملاء، جواب، أسئلة، استفسار"}},{"pageTemplate":"jobs","link":"/jobs","image":"https://www.tap.company/websiteImages/ogImages/tap.png","title":{"en":"Tap | Jobs","ar":"تاپ | وظائف"},"description":{"en":"Join the Tap Team and explore new ways to connect with the world refining the way payments should be and work on making Tap the greatest payment tool.","ar":"انضم لفريق تاب واستكشف طرق جديدة للتواصل مع العالم وتعرف على ما يجب أن تكون عليه طرق الدفع الإلكتروني الحديثة واعمل على جعل تاب أفضل وسيلة دفع."},"keyWords":{"en":"job opportunities kuwait, Tap careers","ar":"فرص عمل في الكويت، وظائف تاب"}},{"pageTemplate":"about","link":"/about","image":"https://www.tap.company/websiteImages/ogImages/tap.png","title":{"en":"Tap | Our Story","ar":"تاپ | قصتنا"},"description":{"en":"Tap is on a mission to help businesses grow with financial solutions billing systems, payment gateways, simplifying online and mobile payments.","ar":"تاب مهمتها هي مساعدة الشركات على النمو من خلال توفير حلول مالية مثل نظام الفوترة وبوابة الدفع، وتبسيط عمليات الدفع عبر الهاتف والانترنت للتجار والمستهلكين."},"keyWords":{"en":"Secure payment gateway Kuwait","ar":"حلول بوابة الدفع الإلكتروني دفع آمن"}},{"pageTemplate":"developers","link":"/developers","image":"https://www.tap.company/websiteImages/ogImages/tap.png","title":{"en":"Tap | Developers","ar":"تاپ | للمطورين"},"description":{"en":"Integrate Tap's payment gatway on your website or app","ar":"قم بدمج بوابة الدفهع الإلكتروني من تاب على موقعك الإلكتروني أو تطبيقك"},"keyWords":{"en":"app, website, application, api, payment gateway, Tap payments","ar":"موقع إلكتروني، تطبيق هاتف، بوابة دفع إلكتروني، تاب"}},{"pageTemplate":"mainPage","link":"/","image":"https://www.tap.company/websiteImages/ogImages/tap.png","title":{"en":"Tap | Online Payment Services","ar":"تاپ | خدمات الدفع الإلكتروني"},"description":{"en":"Tap Payments simplifies online payment & acceptance for businesses with an easy, quick & secure experience for people paying on websites & apps.","ar":"تاب تسهل طرق الدفع والتحصيل للشركات التجارية عبر الانترنت بطريقة سهلة، سريعة وآمنة للمستخدمين على التطبيقات و المواقع الالكترونية."},"keyWords":{"en":"online payments, sms payments, mastercard, visa, knet, hesabe, edfa3ly, myfatoorah, payment gateway","ar":"تاب , تاب للدفع , تاب الكويت، تحصيل، دفع اونلاين، فيزا، ماستر، دفع، حسابي، كي_نت، ادفع_اونلاين، الدفع من الموبايل"}}]

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _express = __webpack_require__(83);

var _express2 = _interopRequireDefault(_express);

var _cors = __webpack_require__(84);

var _cors2 = _interopRequireDefault(_cors);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _server = __webpack_require__(85);

var _reactRouterDom = __webpack_require__(4);

var _serializeJavascript = __webpack_require__(86);

var _serializeJavascript2 = _interopRequireDefault(_serializeJavascript);

var _App = __webpack_require__(87);

var _App2 = _interopRequireDefault(_App);

var _routes = __webpack_require__(27);

var _routes2 = _interopRequireDefault(_routes);

var _exenv = __webpack_require__(220);

var _exenv2 = _interopRequireDefault(_exenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.use((0, _cors2.default)());
app.use(_express2.default.static("public"));

app.get("*", function (req, res, next) {
  var activeRoute = _routes2.default.find(function (route) {
    return (0, _reactRouterDom.matchPath)(req.url, route);
  }) || {};

  var promise = activeRoute.fetchInitialData ? activeRoute.fetchInitialData(req.path) : Promise.resolve();

  promise.then(function (data) {
    var context = { data: data };

    var markup = _exenv2.default.canUseDOM ? (0, _server.renderToString)(_react2.default.createElement(
      _reactRouterDom.StaticRouter,
      { location: req.url, context: context },
      _react2.default.createElement(_App2.default, null)
    )) : '';

    res.send("\n      <!DOCTYPE html>\n      <html>\n        <head>\n          <title>Tap | Online payment Services</title>\n          <script src=\"/bundle.js\" defer></script>\n          <script>window.__INITIAL_DATA__ = " + (0, _serializeJavascript2.default)(data) + "</script>\n          " + "<Link rel=\"shortcut icon\" href=\"https://www.tap.company/images/VND75.ico\"/>" + "\n          " + "<link rel=\"manifest\" href=\"%PUBLIC_URL%/manifest.json\">" + "\n          " + "<link rel=\"stylesheet\" href=\"https://use.fontawesome.com/releases/v5.2.0/css/all.css\" integrity=\"sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ\" crossorigin=\"anonymous\">" + "\n          " + "<link rel=\"stylesheet\" type=\"text/css\" charset=\"UTF-8\" href=\"https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css\" />" + "\n          " + "<link rel=\"stylesheet\" type=\"text/css\" href=\"https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css\" />" + "\n          " + "<link rel=\"stylesheet\" href=\"https://stackpath.bootstrapcdn.com/bootstrap/4.1.2/css/bootstrap.min.css\" integrity=\"sha384-Smlep5jCw/wG7hdkwQ/Z5nLIefveQRIY9nfy6xoR1uRYBtpZgI6339F5dgvm/e9B\" crossorigin=\"anonymous\">" + "\n          " + "<meta name=\"viewport\" content=\"width=device-width,minimum-scale=1,maximum-scale=1\">" + "\n\n        </head>\n\n        <body>\n          <div id=\"app\">" + markup + "</div>\n          " + "<script src=\"https://code.jquery.com/jquery-3.3.1.slim.min.js\" integrity=\"sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo\" crossorigin=\"anonymous\"></script>\n          <script src=\"https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js\" integrity=\"sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49\" crossorigin=\"anonymous\"></script>\n          <script src=\"https://stackpath.bootstrapcdn.com/bootstrap/4.1.2/js/bootstrap.min.js\" integrity=\"sha384-o+RDsa0aLu++PJvFqy8fFScvbHFLtbvScb8AjopnFD+iEQ7wo/CG0xlczd+2O/em\" crossorigin=\"anonymous\"></script>\n          <script src=\"https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.6.15/browser-polyfill.min.js\"></script>\n          <script async src=\"https://www.googletagmanager.com/gtag/js?id=UA-64928426-19\"></script>\n            <script>\n              window.dataLayer = window.dataLayer || [];\n              function gtag(){dataLayer.push(arguments);}\n              gtag('js', new Date());\n\n              gtag('config', 'UA-64928426-19');\n            </script>\n          <script async defer src=\"https://maps.googleapis.com/maps/api/js?key=AIzaSyApaAVAecsdLIL6lhd9M2glYlE3-98jdJY\" type=\"text/javascript\"></script>" + "\n        </body>\n      </html>\n    ");
  }).catch(next);
});

app.listen(3000, function () {
  console.log("Server is listening on port: 3000");
});

/*
  1) Just get shared App rendering to string on server then taking over on client.
  2) Pass data to <App /> on server. Show diff. Add data to window then pick it up on the client too.
  3) Instead of static data move to dynamic data (github gists)
  4) add in routing.
*/

/***/ }),
/* 83 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 84 */
/***/ (function(module, exports) {

module.exports = require("cors");

/***/ }),
/* 85 */
/***/ (function(module, exports) {

module.exports = require("react-dom/server");

/***/ }),
/* 86 */
/***/ (function(module, exports) {

module.exports = require("serialize-javascript");

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _routes = __webpack_require__(27);

var _routes2 = _interopRequireDefault(_routes);

var _mobxReact = __webpack_require__(7);

var _reactRouterDom = __webpack_require__(4);

var _Navbar = __webpack_require__(188);

var _Navbar2 = _interopRequireDefault(_Navbar);

var _NoMatch = __webpack_require__(189);

var _NoMatch2 = _interopRequireDefault(_NoMatch);

var _Loader = __webpack_require__(190);

var _Loader2 = _interopRequireDefault(_Loader);

var _Page = __webpack_require__(191);

var _Page2 = _interopRequireDefault(_Page);

var _ErrorPage = __webpack_require__(18);

var _ErrorPage2 = _interopRequireDefault(_ErrorPage);

var _UserPreferencesStore = __webpack_require__(217);

var _UserPreferencesStore2 = _interopRequireDefault(_UserPreferencesStore);

var _languages = __webpack_require__(19);

var _languages2 = _interopRequireDefault(_languages);

var _products = __webpack_require__(25);

var _products2 = _interopRequireDefault(_products);

var _pages = __webpack_require__(8);

var _pages2 = _interopRequireDefault(_pages);

var _partners = __webpack_require__(26);

var _partners2 = _interopRequireDefault(_partners);

var _reactIntercom = __webpack_require__(219);

var _reactIntercom2 = _interopRequireDefault(_reactIntercom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_Component) {
  _inherits(App, _Component);

  function App() {
    _classCallCheck(this, App);

    return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).apply(this, arguments));
  }

  _createClass(App, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      if (this.props.location !== prevProps.location) {
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      }
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      __webpack_require__(55);
      __webpack_require__(76);
      __webpack_require__(77);
      __webpack_require__(78);
      __webpack_require__(75);
      _UserPreferencesStore2.default.saveUrlKeys(this.props.location.search);
    }
  }, {
    key: 'checkParamsExistance',
    value: function checkParamsExistance(link) {
      var _this2 = this;

      var params = link.split('/');
      params = params.filter(function (param) {
        return param !== '';
      });
      var orderedParams = [];
      params.map(function (param) {
        _this2.possibilitiesArray().map(function (possibility) {
          possibility.arr.map(function (arrItem) {
            arrItem.slot === param || arrItem.country_code && arrItem.country_code.toLowerCase() === param ? orderedParams.push({
              param: param,
              order: possibility.order,
              type: possibility.type
            }) : null;
          });
        });
      });

      var allParamsCalssified = false;
      params.length === orderedParams.length ? allParamsCalssified = true : allParamsCalssified = false;

      this.possibilitiesArray().map(function (possibility) {
        possibility.defaultValue && !orderedParams.filter(function (orderedParam) {
          return orderedParam.type === possibility.type;
        })[0] ? orderedParams.push({ param: possibility.defaultValue, order: possibility.order, type: possibility.type, defaultValue: true }) : null;
      });

      orderedParams.sort(function (a, b) {
        return a.order > b.order ? 1 : b.order > a.order ? -1 : 0;
      });

      var redirectLink = '';
      orderedParams.map(function (orderedParam) {
        redirectLink = redirectLink + '/' + orderedParam.param;
      });

      if (allParamsCalssified && redirectLink !== link) {
        return {
          result: 'redirect',
          redirectLink: redirectLink
        };
      } else {
        return {
          result: 'notFound'
        };
      }
    }
  }, {
    key: 'possibilitiesArray',
    value: function possibilitiesArray() {
      var arr = [{
        arr: _UserPreferencesStore2.default.availableCountries,
        order: 1,
        type: 'country',
        defaultValue: _UserPreferencesStore2.default.country_code
      }, {
        arr: _languages2.default,
        order: 2,
        type: 'language',
        defaultValue: _UserPreferencesStore2.default.language
      }, {
        arr: _pages2.default,
        order: 3,
        type: 'page'
      }, {
        arr: _products2.default,
        order: 4,
        type: 'product'
      }, {
        arr: _partners2.default,
        order: 5,
        type: 'partner'
      }, {
        arr: [{
          "page": "activate",
          "slot": "activate"
        }, {
          "page": "plans",
          "slot": "plans"
        }],
        order: 6,
        type: "subpage"
      }];
      return arr;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      return _react2.default.createElement(
        'div',
        { className: 'App', dir: _UserPreferencesStore2.default.language === 'ar' ? 'rtl' : 'ltr' },
        _react2.default.createElement(_reactIntercom2.default, { appID: 'raqrpxm0', user: _UserPreferencesStore2.default.intercomUser }),
        _UserPreferencesStore2.default.getCurrentCountryLoading || _UserPreferencesStore2.default.getAvailableCountriesLoading ? _react2.default.createElement(_Loader2.default, null) : _react2.default.createElement(
          _reactRouterDom.Switch,
          null,
          _routes2.default.map(function (_ref) {
            var path = _ref.path,
                exact = _ref.exact,
                compProps = _ref.compProps,
                hideFooter = _ref.hideFooter,
                Component = _ref.component,
                rest = _objectWithoutProperties(_ref, ['path', 'exact', 'compProps', 'hideFooter', 'component']);

            return _react2.default.createElement(_reactRouterDom.Route, { key: path, path: path, exact: exact, render: function render(props) {
                return _react2.default.createElement(
                  _Page2.default,
                  _extends({}, props, rest, compProps, { preferencesStore: _UserPreferencesStore2.default }),
                  _react2.default.createElement(Component, _extends({}, props, rest, compProps, { preferencesStore: _UserPreferencesStore2.default }))
                );
              } });
          }),
          _react2.default.createElement(_reactRouterDom.Route, { render: function render(props) {
              return _react2.default.createElement(
                _react2.default.Fragment,
                null,
                _this3.checkParamsExistance(props.location.pathname).result === 'redirect' ? _react2.default.createElement(_reactRouterDom.Redirect, { to: _this3.checkParamsExistance(props.location.pathname).redirectLink }) : _react2.default.createElement(
                  _react2.default.Fragment,
                  null,
                  _react2.default.createElement(_ErrorPage2.default, _extends({}, props, { preferencesStore: _UserPreferencesStore2.default, error: 'notfound' }))
                )
              );
            } })
        )
      );
    }
  }]);

  return App;
}(_react.Component);

exports.default = (0, _reactRouterDom.withRouter)((0, _mobxReact.observer)(App));

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(4);

var _Banner = __webpack_require__(13);

var _Banner2 = _interopRequireDefault(_Banner);

var _BannerLayer = __webpack_require__(14);

var _BannerLayer2 = _interopRequireDefault(_BannerLayer);

var _Features = __webpack_require__(29);

var _Features2 = _interopRequireDefault(_Features);

var _CallToAction = __webpack_require__(20);

var _CallToAction2 = _interopRequireDefault(_CallToAction);

var _Slider = __webpack_require__(15);

var _Slider2 = _interopRequireDefault(_Slider);

var _ProductsBlocks = __webpack_require__(107);

var _ProductsBlocks2 = _interopRequireDefault(_ProductsBlocks);

var _LightBox = __webpack_require__(12);

var _LightBox2 = _interopRequireDefault(_LightBox);

var _TapButton = __webpack_require__(6);

var _TapButton2 = _interopRequireDefault(_TapButton);

var _AnimatedRow = __webpack_require__(42);

var _AnimatedRow2 = _interopRequireDefault(_AnimatedRow);

var _Title = __webpack_require__(10);

var _Title2 = _interopRequireDefault(_Title);

var _Separator = __webpack_require__(9);

var _Separator2 = _interopRequireDefault(_Separator);

var _TapCarouselSlider = __webpack_require__(44);

var _TapCarouselSlider2 = _interopRequireDefault(_TapCarouselSlider);

var _Img = __webpack_require__(3);

var _Img2 = _interopRequireDefault(_Img);

var _callToAction = __webpack_require__(47);

var _callToAction2 = _interopRequireDefault(_callToAction);

var _features = __webpack_require__(48);

var _features2 = _interopRequireDefault(_features);

var _tapPageIntro = __webpack_require__(49);

var _tapPageIntro2 = _interopRequireDefault(_tapPageIntro);

var _news = __webpack_require__(113);

var _news2 = _interopRequireDefault(_news);

var _businesses = __webpack_require__(50);

var _businesses2 = _interopRequireDefault(_businesses);

var _mainPageHighlights = __webpack_require__(114);

var _mainPageHighlights2 = _interopRequireDefault(_mainPageHighlights);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MainPage = function (_Component) {
  _inherits(MainPage, _Component);

  function MainPage(props) {
    _classCallCheck(this, MainPage);

    var _this = _possibleConstructorReturn(this, (MainPage.__proto__ || Object.getPrototypeOf(MainPage)).call(this, props));

    _this.state = {
      openLightBox: false,
      lightBoxLink: ''
    };
    return _this;
  }

  _createClass(MainPage, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      __webpack_require__(51);

      var preferencesStore = this.props.preferencesStore;
      preferencesStore.filterJsonStringsBasedOnLanguage(_features2.default.items);
      preferencesStore.filterJsonStringsBasedOnLanguage(_features2.default);
      preferencesStore.filterJsonStringsBasedOnLanguage(_callToAction2.default);
      preferencesStore.filterJsonStringsBasedOnLanguage(_tapPageIntro2.default);
      preferencesStore.filterJsonStringsBasedOnLanguage(_news2.default);
      preferencesStore.filterJsonStringsBasedOnLanguage(_businesses2.default);
      preferencesStore.filterJsonStringsBasedOnLanguage(_mainPageHighlights2.default);
    }
  }, {
    key: 'includebreaks',
    value: function includebreaks(text) {
      return text.split("\n").map(function (text, key) {
        return _react2.default.createElement(
          'span',
          { key: key },
          text,
          _react2.default.createElement('br', null)
        );
      });
    }
  }, {
    key: 'getVideoLink',
    value: function getVideoLink(partner, productObj) {
      var videoLink = '';
      partner ? videoLink = partner.products.filter(function (product) {
        return product.product === productObj.product;
      })[0].videoLink : videoLink = productObj.videoLink;
      videoLink ? null : videoLink = productObj.videoLink;

      return videoLink;
    }
  }, {
    key: 'filterHightlights',
    value: function filterHightlights() {
      var _this2 = this;

      var arr = [];
      _mainPageHighlights2.default.map(function (highlight) {
        if (highlight.countries) {
          highlight.countries.map(function (country_code) {
            country_code === _this2.props.preferencesStore.country_code ? arr.push(highlight) : null;
          });
        } else {
          arr.push(highlight);
        }
      });

      var blocks = arr.filter(function (obj) {
        return obj.hasBlock;
      }).slice(0, 4);

      var slot = null;
      arr.filter(function (obj) {
        return obj.smimilar;
      }).length > 1 ? slot = arr.filter(function (obj) {
        return obj.smimilar;
      })[0].slot : null;

      var mykey = null;
      slot ? arr.map(function (obj, key) {
        obj.slot === slot ? mykey = key : null;
      }) : null;

      mykey !== null ? arr.splice(mykey, 1) : null;

      var banners = arr.filter(function (obj) {
        return obj.hasBanner;
      }).slice(0, 4);
      return { banners: banners, blocks: blocks };
    }
  }, {
    key: 'openLightBoxFunction',
    value: function openLightBoxFunction(link) {
      if (link) {
        this.setState({
          openLightBox: true,
          lightBoxLink: link
        });
      }
    }
  }, {
    key: 'closeLightBoxFunction',
    value: function closeLightBoxFunction() {
      this.setState({
        openLightBox: false
      });
      setTimeout(function () {
        this.setState({
          lightBoxLink: ''
        });
      }.bind(this), 200);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      this.filterHightlights();
      var preferencesStore = this.props.preferencesStore;

      var partner = false;
      var string = this.props.partner;
      string ? partner = preferencesStore.getCurrentPartner(string) : partner = false;

      var productsObjects = [];
      string ? partner.products.map(function (product) {
        productsObjects.push(preferencesStore.getProduct(product.product));
      }) : productsObjects = preferencesStore.getProducts();

      var businessesList = [];
      _businesses2.default.filter(function (business) {
        return business.product === 'pay';
      })[0] ? businessesList = _businesses2.default.filter(function (business) {
        return business.product === 'pay';
      })[0].businessesList : businessesList = null;

      var businessesListTitle = '';
      _businesses2.default.filter(function (business) {
        return business.product === 'pay';
      })[0] ? businessesListTitle = _businesses2.default.filter(function (business) {
        return business.product === 'pay';
      })[0].title : businessesListTitle = null;

      var banners = partner ? productsObjects : this.filterHightlights().banners;
      var blocks = partner ? productsObjects : this.filterHightlights().blocks;

      return _react2.default.createElement(
        _react2.default.Fragment,
        null,
        partner && partner.products.length === 1 ? _react2.default.createElement(_reactRouterDom.Redirect, { to: '/' + this.props.country + '/' + this.props.language + '/' + partner.products[0].slot + '/' + this.props.partner }) : _react2.default.createElement(
          _react2.default.Fragment,
          null,
          _react2.default.createElement(_LightBox2.default, {
            link: this.state.lightBoxLink,
            open: this.state.openLightBox,
            onClick: function onClick() {
              return _this3.closeLightBoxFunction();
            }
          }),
          _react2.default.createElement(
            _Slider2.default,
            {
              language: preferencesStore.language,
              oneBackground: partner ? true : false,
              backgroundColor: partner ? partner.brandingColor : '',
              backgroundImage: partner ? partner.paternImage : '',
              hideOnSmall: banners.length > 1
            },
            banners.map(function (banner, key) {
              return _react2.default.createElement(
                _Banner2.default,
                {
                  key: key,
                  preferencesStore: preferencesStore,
                  cropped: 65,
                  backgroundColor: partner ? partner.brandingColor : banner.brandingColor,
                  backgroundImage: partner ? partner.paternImage : banner.paternImage ? banner.paternImage : null,
                  reverse: true,
                  maxContentHeight: true
                },
                _react2.default.createElement(
                  _BannerLayer2.default,
                  {
                    animation: 'shortFromLeft' },
                  _react2.default.createElement(_CallToAction2.default, {
                    partnerLogo: partner ? partner.logo : banner.logo ? banner.logo : null,
                    callToAction: preferencesStore.getCallToAction(_callToAction2.default, banner.product),
                    country_code: preferencesStore.country_code,
                    language: preferencesStore.language,
                    color: partner ? partner.brandingColor : banner.brandingColor,
                    source: partner ? partner.slot : banner.partner ? banner.partner : '',
                    schedule_for: banner.schedule_for ? banner.schedule_for : null
                  })
                ),
                _react2.default.createElement(
                  _BannerLayer2.default,
                  {
                    animation: 'shortFromRight' },
                  _react2.default.createElement(_Img2.default, {
                    src: preferencesStore.getProduct(banner.product).bannerImage,
                    className: _this3.getVideoLink(partner, banner) ? 'openLightBox bannerImage videoLightBox' : 'bannerImage',
                    onClick: function onClick() {
                      return _this3.openLightBoxFunction(_this3.getVideoLink(partner, banner));
                    }
                  })
                )
              );
            })
          ),
          _react2.default.createElement(_ProductsBlocks2.default, {
            productsObjects: blocks,
            language: this.props.match.params.language,
            partner: this.props.match.params.partner || this.props.match.params.page
          }),
          partner ? _react2.default.createElement(
            'div',
            { className: 'container' },
            _react2.default.createElement('div', { style: { height: '80px' } }),
            _react2.default.createElement(
              'h4',
              null,
              this.includebreaks(partner.intro)
            ),
            _react2.default.createElement('div', { style: { height: '40px' } }),
            _react2.default.createElement(
              'h5',
              null,
              this.includebreaks(partner.subIntro)
            ),
            _react2.default.createElement('div', { style: { height: '80px' } })
          ) : _react2.default.createElement(
            _react2.default.Fragment,
            null,
            _react2.default.createElement(
              'div',
              { className: 'container' },
              _react2.default.createElement('div', { style: { height: '120px' } }),
              _react2.default.createElement(_TapCarouselSlider2.default, {
                title: businessesListTitle ? businessesListTitle : null,
                businesses: businessesList,
                ItemsInSlide: 4,
                language: preferencesStore.language
              }),
              _react2.default.createElement('div', { style: { height: '80px' } }),
              _react2.default.createElement(_Title2.default, {
                title: _news2.default.title,
                separator: _react2.default.createElement(_Separator2.default, { width: '30%' })
              }),
              _react2.default.createElement(
                _AnimatedRow2.default,
                {
                  fullWidthOnMobile: true,
                  itemsInRow: 5,
                  spaceBetweenRows: '40px'
                },
                _news2.default.items.map(function (item, key) {
                  return _react2.default.createElement(
                    'div',
                    { key: key, className: 'lessOpacityOnHover' },
                    item.link ? _react2.default.createElement(
                      _react2.default.Fragment,
                      null,
                      _react2.default.createElement(
                        'a',
                        { href: item.link, target: '_blank' },
                        _react2.default.createElement(_Img2.default, { src: item.image, alt: 'newsImage', style: { width: '160px' } })
                      )
                    ) : _react2.default.createElement(
                      _react2.default.Fragment,
                      null,
                      _react2.default.createElement(_Img2.default, { src: item.image, alt: 'newsImage', style: { width: '160px' } })
                    )
                  );
                })
              ),
              _react2.default.createElement('div', { style: { height: '120px' } })
            )
          )
        )
      );
    }
  }]);

  return MainPage;
}(_react.Component);

exports.default = MainPage;

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "\n.banner {\n    width: 100%;\n    overflow: hidden;\n    min-height: 550px !important;\n}\n\n.bannerBackground {\n    height: 100%;\n    width: 100%;\n    z-index: -1;\n    background-size: 150%;\n    background-position: top 130px center;\n    background-repeat: no-repeat;\n\t  display: flex;\n    justify-content: center;\n    align-items: center;\n}\n\n.flexContainer{\n\tdisplay: flex;\n    flex-direction: row;\n    justify-content: space-between;\n    align-items: center;\n    height: 100%;\n    margin-right: 0px;\n    margin-left: 0px;\n}\n\n.bannerLayer{\n    padding-top: 30px;\n\t  position: relative;\n    -webkit-transition: 0.4s ease-in-out;\n    -webkit-transition:  0.4s ease-in-out;\n    -o-transition:  0.4s ease-in-out;\n    transition: 0.4s ease-in-out;\n    width: 50%;\n    margin: auto;\n    z-index: 9;\n}\n\n.oneLayer{\n  width: 85%;\n}\n\n.bannerImage{\n\twidth: 80%;\n\theight: auto;\n\tz-index: 1;\n  margin-right: 15%;\n  margin-left: 15%;\n}\n\n/* .bannerImage {\n  max-width: 390px;\n  height: auto;\n} */\n\n.opacityZero{\n\topacity: 0;\n}\n\n@media screen and (max-width: 1200px) {\n\t.bannerLayer{\n\t\twidth: 50%;\n\t}\n  .oneLayer{\n    width: 85%;\n  }\n}\n\n@media screen and (max-width: 992px) {\n\t.bannerLayer{\n\t  padding-top: 0px;\n\t\tmargin:auto;\n\t\twidth: 100%;\n\t}\n\t.flexContainer{\n\t\twidth: 100%;\n\t\tdisplay: block;\n\t\theight: auto;\n\t}\n\t.bannerImage {\n\t    width: 66%;\n\t    margin-left: auto;\n\t    margin-right: auto;\n\t}\n}\n\n@media screen and (max-width: 767px) {\n  .banner.maxContentHeight{\n    height: max-content !important;\n  }\n\t.banner{\n\t    padding-bottom: 60px;\n\t    padding-top: 90px;\n\t}\n\t.bannerLayer{\n\t    top: -20%;\n\t}\n  .oneLayer{\n    width: 100%;\n  }\n\t.bannerImage {\n\t    width: 285px;\n\t}\n}\n", ""]);

// exports


/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
	// get current location
	var location = typeof window !== "undefined" && window.location;

	if (!location) {
		throw new Error("fixUrls requires window.location");
	}

	// blank or null?
	if (!css || typeof css !== "string") {
		return css;
	}

	var baseUrl = location.protocol + "//" + location.host;
	var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
 This regular expression is just a way to recursively match brackets within
 a string.
 	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
    (  = Start a capturing group
      (?:  = Start a non-capturing group
          [^)(]  = Match anything that isn't a parentheses
          |  = OR
          \(  = Match a start parentheses
              (?:  = Start another non-capturing groups
                  [^)(]+  = Match anything that isn't a parentheses
                  |  = OR
                  \(  = Match a start parentheses
                      [^)(]*  = Match anything that isn't a parentheses
                  \)  = Match a end parentheses
              )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
  \)  = Match a close parens
 	 /gi  = Get all matches, not the first.  Be case insensitive.
  */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function (fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl.trim().replace(/^"(.*)"$/, function (o, $1) {
			return $1;
		}).replace(/^'(.*)'$/, function (o, $1) {
			return $1;
		});

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
			return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
			//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "\n.separator{\n    margin: auto;\n    height: 18px;\n    box-shadow: 0px 7px 10px -7px;\n    background-color: transparent;\n    margin-bottom: 15px;\n    overflow: hidden;\n    color: #e2e2e2;\n}\n\n", ""]);

// exports


/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _Feature = __webpack_require__(93);

var _Feature2 = _interopRequireDefault(_Feature);

var _Separator = __webpack_require__(9);

var _Separator2 = _interopRequireDefault(_Separator);

var _TapButton = __webpack_require__(6);

var _TapButton2 = _interopRequireDefault(_TapButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FeatureCategory = function (_Component) {
  _inherits(FeatureCategory, _Component);

  function FeatureCategory(props) {
    _classCallCheck(this, FeatureCategory);

    var _this = _possibleConstructorReturn(this, (FeatureCategory.__proto__ || Object.getPrototypeOf(FeatureCategory)).call(this, props));

    _this.state = {
      hiddenFeatures: 'hiddenItem hide',
      showButton: 'shownItem'
    };
    return _this;
  }

  _createClass(FeatureCategory, [{
    key: 'showFeatures',
    value: function showFeatures() {

      this.setState({
        hiddenFeatures: 'shownItem'
      });

      this.setState({ showButton: 'hiddenItem' });
      setTimeout(function () {
        this.setState({ showButton: 'hiddenItem hide' });
      }.bind(this), 500);
    }
  }, {
    key: 'hideFeatures',
    value: function hideFeatures(middleFeatureId) {

      this.setState({ hiddenFeatures: 'hiddenItem' });
      setTimeout(function () {
        this.setState({ hiddenFeatures: 'hiddenItem hide' });
      }.bind(this), 500);

      this.setState({
        showButton: 'shownItem'
      });

      document.getElementById(middleFeatureId).scrollIntoView({ behavior: 'smooth' });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var category = this.props.category;
      var middleFeatureId = category.categoryName.replace(/\s/g, '') + 'middle';
      var features = category.items.filter(function (feature) {
        return feature.partner === _this2.props.partner || feature.partner === undefined;
      });
      return features.map(function (feature, key) {
        return _react2.default.createElement(
          'div',
          {
            key: key,
            id: key === 3 ? middleFeatureId : '',
            className: key > 3 ? _this2.state.hiddenFeatures : '' },
          _react2.default.createElement(_Feature2.default, {
            id: key,
            feature: feature,
            rightPartAnimation: _this2.props.rightPartAnimation,
            leftPartAnimation: _this2.props.leftPartAnimation
          }),
          key === 3 && features.length > 4 ? _react2.default.createElement(
            'div',
            { className: _this2.state.showButton },
            _react2.default.createElement('div', { style: { height: '70px' } }),
            _react2.default.createElement(_TapButton2.default, {
              text: category.showMoreButtonText,
              shape: 'bordered colored',
              product: 'general',
              fontAwesomeIcon: _react2.default.createElement('i', { className: 'fas fa-angle-down' }),
              onClick: function onClick() {
                return _this2.showFeatures();
              },
              className: _this2.state.showButton,
              style: { width: '280px' },
              color: '#585858'
            })
          ) : null,
          key === features.length - 1 && features.length > 4 ? _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement('div', { style: { height: '70px' } }),
            _react2.default.createElement(_TapButton2.default, {
              text: category.showLessButtonText,
              shape: 'bordered colored',
              product: 'general',
              fontAwesomeIcon: _react2.default.createElement('i', { className: 'fas fa-angle-up' }),
              onClick: function onClick() {
                return _this2.hideFeatures(middleFeatureId);
              },
              style: { width: '280px' },
              color: '#585858'
            })
          ) : _react2.default.createElement(_Separator2.default, { width: '90%' })
        );
      });
    }
  }]);

  return FeatureCategory;
}(_react.Component);

exports.default = FeatureCategory;

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(11);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _FeatureDescription = __webpack_require__(94);

var _FeatureDescription2 = _interopRequireDefault(_FeatureDescription);

var _Img = __webpack_require__(3);

var _Img2 = _interopRequireDefault(_Img);

var _windowOrGlobal = __webpack_require__(5);

var _windowOrGlobal2 = _interopRequireDefault(_windowOrGlobal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Feature = function (_Component) {
  _inherits(Feature, _Component);

  function Feature(props) {
    _classCallCheck(this, Feature);

    var _this = _possibleConstructorReturn(this, (Feature.__proto__ || Object.getPrototypeOf(Feature)).call(this, props));

    _this.state = {
      firstSide: _react2.default.createElement('div', null),
      secondSide: _react2.default.createElement('div', null),
      componentYPosition: 0,
      componentYHeight: 0,
      startAnimation: false,
      descriptionActive: ''
    };
    _this.handleScroll = _this.handleScroll.bind(_this);
    return _this;
  }

  _createClass(Feature, [{
    key: 'getBodyScrollTop',
    value: function getBodyScrollTop() {
      var el = document.scrollingElement || document.documentElement;
      return el.scrollTop;
    }
  }, {
    key: 'handleScroll',
    value: function handleScroll() {
      if (this.getBodyScrollTop() + 500 > this.state.componentYPosition) {
        this.setState({
          startAnimation: true
        });
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      _windowOrGlobal2.default.addEventListener("scroll", this.handleScroll);
      this.setState({
        componentYPosition: _reactDom2.default.findDOMNode(this).getBoundingClientRect().top,
        componentYHeight: _reactDom2.default.findDOMNode(this).getBoundingClientRect().height
      });
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _windowOrGlobal2.default.removeEventListener("scroll", this.handleScroll);
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      var firstSide = _react2.default.createElement(_FeatureDescription2.default, { feature: this.props.feature });
      var secondSide = _react2.default.createElement(
        'div',
        { className: ' featureImage ' },
        _react2.default.createElement(_Img2.default, { src: this.props.feature.image, style: { width: '100%' } })
      );

      if (this.props.id % 2 === 0) {
        this.setState({
          firstSide: firstSide,
          secondSide: secondSide
        });
      } else {
        this.setState({
          firstSide: secondSide,
          secondSide: firstSide
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'feature row', style: this.props.style },
        _react2.default.createElement(
          'div',
          { className: this.state.startAnimation ? this.props.leftPartAnimation + ' colomn-6 ' + this.state.descriptionActive : 'zeroOpacity  colomn-6 ' },
          this.state.firstSide
        ),
        _react2.default.createElement(
          'div',
          { className: this.state.startAnimation ? this.props.rightPartAnimation + ' colomn-6 ' + this.state.descriptionActive : 'zeroOpacity  colomn-6 ' },
          this.state.secondSide
        )
      );
    }
  }]);

  return Feature;
}(_react.Component);

exports.default = Feature;

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _Img = __webpack_require__(3);

var _Img2 = _interopRequireDefault(_Img);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FeatureDescription = function (_Component) {
  _inherits(FeatureDescription, _Component);

  function FeatureDescription(props) {
    _classCallCheck(this, FeatureDescription);

    var _this = _possibleConstructorReturn(this, (FeatureDescription.__proto__ || Object.getPrototypeOf(FeatureDescription)).call(this, props));

    _this.state = {
      descriptionActive: ''
    };
    // this.descriptionToggle = this.descriptionToggle.bind(this);
    return _this;
  }

  _createClass(FeatureDescription, [{
    key: 'descriptionToggle',
    value: function descriptionToggle() {
      if (this.state.descriptionActive === 'active') {
        this.setState({
          descriptionActive: ''
        });
      } else if (this.state.descriptionActive === '') {
        this.setState({
          descriptionActive: 'active'
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        'div',
        { className: ' featureDescription ' },
        _react2.default.createElement(
          'div',
          { className: 'featureShortDescription', onClick: function onClick() {
              return _this2.descriptionToggle();
            } },
          _react2.default.createElement(_Img2.default, { className: 'featureIcon', src: this.props.feature.icon }),
          _react2.default.createElement('div', { style: { width: '24px', display: 'inline-block' } }),
          _react2.default.createElement(
            'div',
            { className: 'titleSubtitle' },
            _react2.default.createElement(
              'b',
              null,
              _react2.default.createElement(
                'h5',
                { className: 'title' },
                this.props.feature.title
              )
            ),
            _react2.default.createElement(
              'em',
              null,
              _react2.default.createElement(
                'b',
                null,
                _react2.default.createElement(
                  'h6',
                  { className: 'subtitle' },
                  this.props.feature.subtitle
                )
              )
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { className: " description " + this.state.descriptionActive },
          _react2.default.createElement('div', { style: { height: '15px' } }),
          _react2.default.createElement(
            'h6',
            null,
            this.props.feature.description
          )
        )
      );
    }
  }]);

  return FeatureDescription;
}(_react.Component);

exports.default = FeatureDescription;

/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "\n.tapButton{\n\twidth: 240px;\n\theight: 46px;\n\tdisplay: inline-block;\n\tborder:none;\n\tborder-radius: 5px;\n\tcursor: pointer;\n\ttext-align: center;\n\tvertical-align: top;\n    -webkit-transition: 0.2s;\n    -webkit-transition:  0.2s;\n    -o-transition:  0.2s;\n    transition: 0.2s;\n    padding-left: 2px;\n    padding-right: 2px;\n}\n\n.tapButton.bordered.general{\n\tcolor: #4b4847;\n\tborder: 2px solid #4b4847;\n}\n\n.tapButton.bordered.general:hover{\n\tcolor: #fff;\n\tbackground-color: #4b4847;\n}\n\n.big-fa-icon{\n\tfont-size: larger;\n\topacity: 0.8;\n\t-webkit-transition: opacity 0.7s;\n\t-moz-transition: opacity 0.7s;\n\ttransition: opacity 0.7s;\n}\n\na.tapButton{\n\tline-height: 38px;\n}\n\na.tapButton:hover{\n\ttext-decoration: none;\n}\n\n.tapButton.bordered{\n\tborder: 2px solid #fff;\n\tbackground-color: transparent;\n\tcolor: #fff;\n}\n\n.tapButton.bordered:hover{\n\tbackground-color: #fff;\n\tcolor: #4b4847;\n}\n\n.tapButton.bordered.collect:hover{\n\tcolor: #ff0031;\n}\n\n.tapButton.bordered.sell:hover{\n\tcolor: #00aff0;\n}\n\n.tapButton.bordered.pay:hover{\n\tcolor: #2ace00;\n}\n\n.tapButton.bordered.api:hover{\n\tcolor: #fffc00;\n}\n\n.tapButton.bordered.tap:hover{\n\tcolor: #EF4123;\n}\n\n.fa-spinner {\n\t\t-webkit-animation: rotation 2s infinite linear;\n}\n\n@-webkit-keyframes rotation {\n\t\tfrom {\n\t\t\t\t-webkit-transform: rotate(0deg);\n\t\t}\n\t\tto {\n\t\t\t\t-webkit-transform: rotate(359deg);\n\t\t}\n}\n\n.buttonIconSpace{\n\tdisplay: inline-block;\n\twidth: 10px;\n}\n\n@media screen and (max-width: 1200px) {\n    .tapButton{\n        width: 215px;\n    }\n\t.buttonIconSpace{\n\t\t/*width: 5px;*/\n\t}\n}\n\n@media screen and (max-width: 992px) {\n    .tapButton{\n\t\twidth: 240px;\n    }\n}\n\n@media screen and (max-width: 767px) {\n    .tapButton{\n\t\t/* width: 215px; */\n    }\n}\n", ""]);

// exports


/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _Separator = __webpack_require__(9);

var _Separator2 = _interopRequireDefault(_Separator);

var _Title = __webpack_require__(10);

var _Title2 = _interopRequireDefault(_Title);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CategoriesTitles = function (_Component) {
  _inherits(CategoriesTitles, _Component);

  function CategoriesTitles() {
    _classCallCheck(this, CategoriesTitles);

    return _possibleConstructorReturn(this, (CategoriesTitles.__proto__ || Object.getPrototypeOf(CategoriesTitles)).apply(this, arguments));
  }

  _createClass(CategoriesTitles, [{
    key: 'goToCategory',
    value: function goToCategory(id, e) {
      document.getElementById(id).scrollIntoView({ behavior: 'smooth', block: "start" });
    }
  }, {
    key: 'componentsComposer',
    value: function componentsComposer() {
      var _this2 = this;

      return this.props.categories.map(function (category, key) {
        if (category.partners && category.partners.filter(function (partner) {
          return partner === _this2.props.partner;
        })[0] || category.partners === undefined) {
          return _react2.default.createElement(
            'div',
            { key: key,
              style: { width: (100 * 1 / _this2.props.categories.length).toString() + '%', display: 'inline-block', cursor: 'pointer' },
              onClick: function onClick(e) {
                return _this2.goToCategory(category.categoryName.replace(/\s/g, ''), e);
              } },
            _react2.default.createElement(_Title2.default, {
              title: category.categoryName
            })
          );
        } else {
          return _react2.default.createElement(_react2.default.Fragment, { key: key });
        }
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'categoriesTitles' },
        this.props.categories.length > 1 ? _react2.default.createElement(
          _react2.default.Fragment,
          null,
          this.componentsComposer(),
          _react2.default.createElement(_Separator2.default, { width: '90%' })
        ) : null
      );
    }
  }]);

  return CategoriesTitles;
}(_react.Component);

exports.default = CategoriesTitles;

/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "\n.feature {\n    text-align: -webkit-auto;\n\ttext-align: justify;\n    margin: 80px 0 65px 0;\n}\n\n.featureImage{\n\ttext-align: center;\n}\n\n.featureIcon{\n\twidth: 52px;\n\theight: auto;\n\tvertical-align: top;\n}\n\n.titleSubtitle{\n\tdisplay: inline-block;\n}\n\n.subtitle {\n    margin-top: -5px;\n}\n\n.description {\n\t-webkit-transition: max-height 0.5s;\n\t-moz-transition: max-height 0.5s;\n\ttransition: max-height 0.5s;\n}\n\n.zeroOpacity{\n\topacity: 0;\n}\n\n.shownItem{\n\tdisplay: initial;\n}\n\n.hiddenItem{\n\topacity: 0;\n\t-webkit-transition: opacity 0.3s;\n\t-moz-transition: opacity 0.3s;\n\ttransition: opacity 0.3s;\n}\n\n.hiddenItem.hide{\n\tdisplay: none;\n}\n\n.colomn-6{\n\twidth: 50%;\n}\n\n@media screen and (max-width: 992px) {\n\t.featureImage>img {\n\t    width: 100%;\n\t}\n}\n\n@media screen and (max-width: 767px) {\n\t.feature {\n\t    text-align: -webkit-auto;\n\t    margin: 25px 0 0 0;\n\t}\n\t.colomn-6{\n\t\twidth: 100%;\n\t}\n\t.featureShortDescription{\n\t\tcursor: pointer;\n\t}\n\t.featureImage{\n\t\tdisplay: none;\n\t}\n\t.description{\n\t\tmargin-top: 0px;\n\t\tmax-height: 0;\n\t\toverflow: hidden;\n\t}\n\t.description.active{\n\t\tmax-height: 300px;\n\t}\n\t.categoriesTitles{\n\t\tdisplay: none;\n\t}\n\t.titleSubtitle {\n\t    width: 70%;\n\t    word-wrap: break-word;\n\t}\n}", ""]);

// exports


/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _mobxReact = __webpack_require__(7);

var _TapInput = __webpack_require__(21);

var _TapInput2 = _interopRequireDefault(_TapInput);

var _TapButton = __webpack_require__(6);

var _TapButton2 = _interopRequireDefault(_TapButton);

var _LightBox = __webpack_require__(12);

var _LightBox2 = _interopRequireDefault(_LightBox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DownloadApp = function (_Component) {
  _inherits(DownloadApp, _Component);

  function DownloadApp(props) {
    _classCallCheck(this, DownloadApp);

    var _this = _possibleConstructorReturn(this, (DownloadApp.__proto__ || Object.getPrototypeOf(DownloadApp)).call(this, props));

    _this.state = {
      openLightBox: false
    };
    return _this;
  }

  _createClass(DownloadApp, [{
    key: 'openLightBoxFunction',
    value: function openLightBoxFunction() {
      this.setState({
        openLightBox: true
      });
    }
  }, {
    key: 'closeLightBoxFunction',
    value: function closeLightBoxFunction() {
      this.setState({
        openLightBox: false
      });
    }
  }, {
    key: 'handleKeyPress',
    value: function handleKeyPress(event, send_sms, redirectLink) {
      if (event.which === 13) {
        this.props.store.sendSms(this.props.schedule_for, this.props.source, this.props.partner, send_sms, redirectLink);
      }
    }
  }, {
    key: 'getLink',
    value: function getLink(link) {
      if (typeof link === 'string') {
        return link;
      } else {
        var userAgent = navigator.userAgent || navigator.vendor || window.opera;
        var returnValue = '';
        if (/android/i.test(userAgent)) {
          returnValue = link["android"];
        } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
          returnValue = link["ios"];
        } else {
          returnValue = link["ios"];
        }

        return returnValue;
      }
    }
  }, {
    key: 'autoOpenLink',
    value: function autoOpenLink() {
      if (window.location.href.indexOf('download=true') > -1) {
        window.location.href = this.getLink(this.props.link);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      this.autoOpenLink();
      return _react2.default.createElement(
        'div',
        { className: 'downloadApp' },
        _react2.default.createElement(
          'div',
          { className: 'hidden-xs' },
          _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
              'div',
              { className: this.props.store.showSuccessMsg ? 'sendSmsForm fadeOutItem' : 'sendSmsForm fadeInItem',
                style: { transitionDelay: this.props.store.showSuccessMsg ? '0s' : '1s' }
              },
              _react2.default.createElement(_TapInput2.default, {
                type: 'text',
                placeholder: this.props.placeholder,
                inputFunction: 'countryPicker',
                countryCode: this.props.countryCode,
                store: this.props.store,
                onChange: function onChange(e) {
                  return _this2.props.store.getValue(e);
                },
                onKeyPress: function onKeyPress(e) {
                  return _this2.handleKeyPress(e, 1, _this2.getLink(_this2.props.link));
                }
              }),
              _react2.default.createElement('div', { className: 'fieldsSpace' }),
              _react2.default.createElement(_TapButton2.default, {
                type: 'button',
                text: this.props.buttonText,
                fontAwesomeIcon: _react2.default.createElement('i', { className: 'fas fa-arrow-circle-down big-fa-arrow-circle-down' }),
                shape: 'bordered',
                store: this.props.store,
                actionType: this.props.actionType,
                color: this.props.color,
                onClick: function onClick() {
                  return _this2.props.store.sendSms(_this2.props.schedule_for, _this2.props.source, _this2.props.partner, 1, '');
                },
                loading: this.props.store.loading
              })
            ),
            _react2.default.createElement(
              'p',
              { className: this.props.store.showSuccessMsg ? 'msg successMessage fadeInItem' : 'msg successMessage fadeOutItem',
                style: { transitionDelay: this.props.store.showSuccessMsg ? '1s' : '0s' } },
              this.props.store.successMsg
            )
          ),
          _react2.default.createElement(
            'p',
            { className: this.props.store.showValidateMsg ? 'msg validateMsg fadeInItem' : 'msg validateMsg fadeOutItem' },
            this.props.store.validateMsg
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'visible-xs' },
          window.location.href.indexOf('download=true') > -1 || this.props.partner === '' ? _react2.default.createElement(_TapButton2.default, {
            type: 'link',
            link: this.getLink(this.props.link),
            text: this.props.linkText,
            fontAwesomeIcon: _react2.default.createElement('i', { className: 'fas fa-arrow-circle-down big-fa-arrow-circle-down' }),
            shape: 'bordered',
            actionType: this.props.actionType,
            language: this.props.language,
            color: this.props.color
          }) : _react2.default.createElement(
            _react2.default.Fragment,
            null,
            _react2.default.createElement(_TapButton2.default, {
              type: 'button',
              text: this.props.linkText,
              fontAwesomeIcon: _react2.default.createElement('i', { className: 'fas fa-arrow-circle-down big-fa-arrow-circle-down' }),
              shape: 'bordered',
              actionType: this.props.actionType,
              language: this.props.language,
              color: this.props.color,
              className: 'openLightBox',
              onClick: function onClick() {
                return _this2.openLightBoxFunction();
              }
            }),
            _react2.default.createElement(
              _LightBox2.default,
              {
                open: this.state.openLightBox,
                onClick: function onClick() {
                  return _this2.closeLightBoxFunction();
                }
              },
              _react2.default.createElement(
                'p',
                { className: 'grayText' },
                this.props.actionTitle
              ),
              _react2.default.createElement(_TapInput2.default, {
                type: 'text',
                placeholder: this.props.placeholder,
                inputFunction: 'countryPicker',
                countryCode: this.props.countryCode,
                store: this.props.store,
                onChange: function onChange(e) {
                  return _this2.props.store.getValue(e);
                },
                onKeyPress: function onKeyPress(e) {
                  return _this2.handleKeyPress(e, 0, _this2.getLink(_this2.props.link));
                },
                style: { border: '1px solid #eaeaea' }
              }),
              _react2.default.createElement('div', { style: { height: '10px' } }),
              _react2.default.createElement(_TapButton2.default, {
                type: 'button',
                id: 'CloseLightBox',
                text: this.props.linkText.substr(0, this.props.linkText.indexOf(' ')),
                fontAwesomeIcon: _react2.default.createElement('i', { className: 'fas fa-arrow-circle-down big-fa-arrow-circle-down' }),
                shape: 'bordered colored',
                actionType: this.props.actionType,
                language: this.props.language,
                color: this.props.color,
                hoverStyle: true,
                onClick: function onClick() {
                  return _this2.props.store.sendSms(_this2.props.schedule_for, _this2.props.source, _this2.props.partner, 0, _this2.getLink(_this2.props.link));
                },
                loading: this.props.store.loading
              }),
              _react2.default.createElement(
                'p',
                { className: this.props.store.showValidateMsg ? 'msg validateMsg fadeInItem grayText' : 'msg validateMsg fadeOutItem grayText' },
                this.props.store.validateMsg
              )
            )
          )
        )
      );
    }
  }]);

  return DownloadApp;
}(_react.Component);

exports.default = (0, _mobxReact.observer)(DownloadApp);

/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SelectOption = function (_Component) {
  _inherits(SelectOption, _Component);

  function SelectOption() {
    _classCallCheck(this, SelectOption);

    return _possibleConstructorReturn(this, (SelectOption.__proto__ || Object.getPrototypeOf(SelectOption)).apply(this, arguments));
  }

  _createClass(SelectOption, [{
    key: "decideLanguage",
    value: function decideLanguage(string1, string2) {
      if (string1.length > string2.length) {
        return string1;
      } else {
        return string2;
      }
    }
  }, {
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "option",
        { className: "selectOption", value: this.props.item.country_code },
        this.decideLanguage(this.props.item.country_name_arabic, this.props.item.country_name_english),
        " (+",
        this.props.item.international_code,
        ")"
      );
    }
  }]);

  return SelectOption;
}(_react.Component);

exports.default = SelectOption;

/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "\nselect::-ms-expand {\n    display: none;\n}\n\n.countryPicker {\n    position: absolute;\n    width: 46px;\n    height: 46px;\n    background-color: #fff;\n    border-radius: 5px;\n    background-position: center;\n    background-size: 20px;\n    background-repeat: no-repeat;\n    cursor: pointer;\n    border: 0 !important;\n     -webkit-appearance: none !important;\n     -moz-appearance: none;\n     background-image: linear-gradient(red, orange);\n     z-index: 9;\n     color: transparent;\n}\n\n.SelectOption{\n\tcolor: #454545;\n}\n\n.tapSelect{\n  background-color: #fff;\n  cursor: pointer;\n  border: 0;\n   -webkit-appearance: none !important;\n   -moz-appearance: none;\n   height: 46px;\n   width: 240px;\n   border-radius: 5px;\n   padding-right: 15px;\n   padding-left: 15px;\n}\n\n.selectWithArrow{\n  background-size: 17px;\n  background-repeat: no-repeat;\n  background-image: url(http://www.austinlawrencepartners.com/wp-content/uploads/arrow-down-gray-hi-600x380.png);\n  background-position: center right 15px;\n}\n\n[dir=rtl] .selectWithArrow{\n  background-position: center left 15px;\n}\n", ""]);

// exports


/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "\n.inputContainer{\n\twidth: 240px;\n  display: inline-block;\n  vertical-align: top;\n\tborder-radius: 5px;\n}\n\n.tapInput{\n\tborder:none;\n\theight: 46px;\n\tborder-radius: 5px;\n\twidth: 100%;\n  padding-right: 15px;\n  padding-left: 15px;\n\tline-height: 47px;\n}\n\n.extraPadding{\n  padding-right: 46px;\n  padding-left: 46px;\n}\n\n@media screen and (max-width: 1200px) {\n    .inputContainer{\n        width: 215px;\n    }\n}\n\n@media screen and (max-width: 992px) {\n    .inputContainer{\n\t\twidth: 240px;\n    }\n}\n", ""]);

// exports


/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "\n.lightBox {\n    display: flex;\n    top: 0;\n    position: fixed;\n    left: 0;\n    width: 100%;\n    opacity: 0;\n    pointer-events: none;\n    height: 100%;\n    background-color: #0000007a;\n    -webkit-transition: 200ms;\n    -moz-transition: 200ms;\n    -o-transition: 200ms;\n    transition: 200ms;\n    z-index: 9999999999;\n    -ms-flex-align: center;\n    align-items: center;\n}\n\n.lightBox.open{\n  opacity: 1;\n  pointer-events: auto;\n  -webkit-transition: opacity 0.5s;\n\t-moz-transition: opacity 0.5s;\n\ttransition: opacity 0.5s;\n}\n\n.lightBox.open.fullOpacity{\n    opacity:  1;\n}\n\n.lightBox.NoOpacity{\n    display: flex;\n    opacity:  0;\n}\n\n.lightBoxIframe{\n    width: 63%;\n    height: 100%;\n    border: none;\n    margin: auto;\n}\n\n.openLightBox{\n    cursor: pointer;\n}\n\n.closeLightBox {\n    cursor: pointer;\n    position: absolute;\n    right: 15px;\n    top: 5px;\n    font-size: xx-large;\n    color: #fff;\n}\n\n.lightBoxDialog{\n  background-color: #f7f7f7;\n  height: fit-content;\n  width: calc(100% - 50px);\n  padding: 15px 15px;\n  margin: 20px auto;\n  border-radius: 5px;\n  display: flex;\n  -ms-flex-align: center;\n  align-items: center;\n  -webkit-transition: 100ms;\n  -moz-transition: 100ms;\n  -o-transition: 100ms;\n  transition: 100ms;\n}\n\n.iconNoneFullScreenMode{\n  display: block;\n}\n.iconOnFullScreenMode{\n  display: none;\n}\n\n.lightBoxDialog>.lightBoxDialogDiv{\n  margin: auto;\n  width:100%;\n}\n\n@media screen and (max-width: 992px) {\n    .lightBoxIframe{\n        width: 90%;\n        height: 100%;\n    }\n    .closeLightBox {\n        right: 20px;\n        top: 0px;\n    }\n\n    .closeLightBox.darkIcon{\n        right: 20px;\n        top: 10px;\n        text-align: right;\n        height: 50px;\n        width: 50px;\n        font-size: x-large;\n        color: gray;\n    }\n    .closeLightBox.darkIcon>i{\n      pointer-events: none;\n    }\n    .lightBoxDialog.fullLightBoxDialog{\n      width: 100% !important;\n      height: 100% !important;\n      padding: 0 !important;\n      border-radius: 0;\n    }\n    .iconOnFullScreenMode{\n      display: block;\n    }\n    .iconNoneFullScreenMode{\n      display:  none;\n    }\n}\n\n@media screen and (max-width: 767px) {\n\n}\n", ""]);

// exports


/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _mobx = __webpack_require__(22);

var _nodeFetch = __webpack_require__(37);

var _nodeFetch2 = _interopRequireDefault(_nodeFetch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CallToActionStore = function () {
  function CallToActionStore() {
    _classCallCheck(this, CallToActionStore);

    this.language = '';
    this.international_code = '';
    this.loading = false;
    this.countries = [];
    this.currentCountry = { country_flag_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Circle_Platinum_Solid.svg/2000px-Circle_Platinum_Solid.svg.png' };
    this.showSuccessMsg = false;
    this.successMsg = '';
    this.mobile_number = '';
    this.showValidateMsg = false;
    this.validateMsg = '';
  }

  _createClass(CallToActionStore, [{
    key: 'retriveCountries',
    value: function retriveCountries() {
      var _this = this;

      (0, _nodeFetch2.default)('https://partners.payments.tap.company/api/v1.3/api/Country/GetAllCountries?language_code=' + this.language).then(function (results) {
        return results.json();
      }).then(function (data) {
        _this.countries = data;
      });
    }
  }, {
    key: 'setLanguage',
    value: function setLanguage(language) {
      this.language = language;
    }
  }, {
    key: 'selectCountry',
    value: function selectCountry(country_code) {
      if (this.countries.length === 0) {
        this.retriveCountries();
        setTimeout(function () {
          this.setCurrentCountry(country_code);
        }.bind(this), 2100);
      } else {
        this.setCurrentCountry(country_code);
      }
    }
  }, {
    key: 'setCurrentCountry',
    value: function setCurrentCountry(country_code) {
      var _this2 = this;

      this.countries.map(function (country) {
        return country.country_code.toLowerCase() === country_code.toLowerCase() ? _this2.currentCountry = country : _this2.currentCountry = _this2.currentCountry;
      });
    }
  }, {
    key: 'getValue',
    value: function getValue(event) {
      this.mobile_number = event.target.value;
    }
  }, {
    key: 'sendSms',
    value: function sendSms(schedule_for, source, partner, send_sms, redirectLink) {
      this.loading = true;
      console.log('source ' + source);
      console.log('partner ' + partner);
      console.log('schedule_for ' + schedule_for);
      console.log('send_sms ' + send_sms);
      console.log('redirectLink ' + redirectLink);
      var mypostrequest = new XMLHttpRequest();
      var this_ = this;
      source ? null : source = 'tap';
      mypostrequest.open("POST", "https://partners.payments.tap.company/api/v1.3/api/Mobile/ValidateMobile?mobile_number=" + this.mobile_number + "&country_code=" + this.currentCountry.country_code + "&language_code=" + this.language, true);
      mypostrequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      mypostrequest.send('mobile_number=' + this.mobile_number + '&country_code=' + this.currentCountry.country_code + '&language_code=' + this.language);
      mypostrequest.onreadystatechange = function () {
        if (mypostrequest.readyState === 4) {
          if (mypostrequest.status === 200 || window.location.href.indexOf("http") === -1) {
            if (JSON.parse(mypostrequest.responseText).is_valid) {
              var postrequest = new XMLHttpRequest();
              postrequest.open("POST", "https://partners.payments.tap.company/api/v1.3/api/SMS/SendSMS", true);
              postrequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
              postrequest.send('mobile_number=' + this_.currentCountry.international_code + this_.mobile_number + '&source=' + source + '&partner=' + partner + '&country_code=' + this_.currentCountry.country_code + '&schedule_for=' + schedule_for + '&language_code=' + this_.language + '&send_sms=' + send_sms + '&add_lead=' + 1);
              postrequest.onreadystatechange = function () {
                if (postrequest.readyState === 4) {
                  if (postrequest.status === 200 || window.location.href.indexOf("http") === -1) {
                    this_.successMsg = JSON.parse(postrequest.responseText).response_message;
                    this_.showSuccessMsg = true;
                    this_.loading = false;
                    setTimeout(function () {
                      this_.showSuccessMsg = false;
                    }, 5000);
                    if (!send_sms) {
                      window.location.href = redirectLink;
                    }
                  } else {
                    this.loading = false;
                    alert("An error has occured making the request");
                  }
                }
              };
            } else {
              this_.validateMsg = JSON.parse(mypostrequest.responseText).response_message;
              this_.showValidateMsg = true;
              this_.loading = false;
              setTimeout(function () {
                this_.showValidateMsg = false;
              }, 5000);
            }
          } else {
            //alert("An error has occured making the request");
          }
        }
      };
    }
  }]);

  return CallToActionStore;
}();

(0, _mobx.decorate)(CallToActionStore, {
  language: _mobx.observable,
  international_code: _mobx.observable,
  loading: _mobx.observable,
  currentCountry: _mobx.observable,
  countries: _mobx.observable,
  showSuccessMsg: _mobx.observable,
  successMsg: _mobx.observable,
  mobile_number: _mobx.observable,
  validateMsg: _mobx.observable,
  showValidateMsg: _mobx.observable
});

var store = new CallToActionStore();
store.retriveCountries();
exports.default = store;

/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "\n.callToAction{\n\tcolor: #fff;\n\ttext-align: justify;\n\tz-index: 2;\n}\n\n.fieldsSpace{\n\twidth: 15px;\n\tdisplay: inline-block;\n}\n\n.callToActionTitle{\n    text-align: initial;\n}\n\n.hidden-xs{\n\tflex-direction: column;\n\tdisplay: inline-flex !important;\n\twidth: 100%;\n\t/* align-items: center; */\n}\n\n.hidden-sm{\n\tdisplay: inline-block !important;\n}\n\n.visible-sm,.visible-xs{\n    display: none !important;\n}\n\n.partnerLogo{\n\theight: 50px;\n\twidth: auto;\n}\n\n.sendSmsForm,.msg{\n\t-webkit-transition: opacity 0.7s;\n\t-moz-transition: opacity 0.7s;\n\ttransition: opacity 0.7s;\n}\n\n.msg{\n\tmargin: 0;\n\theight: 46px;\n}\n\n.grayText{\n\tcolor: #828282;\n}\n\n.successMessage{\n\tmargin-top: -46px;\n}\n\n.validateMsg{\n\tmargin-top: 15px;\n}\n\n.downloadApp{\n\theight: 60px;\n}\n\n.fadeOutItem{\n\topacity: 0;\n\tpointer-events: none;\n}\n\n.fadeInItem{\n\topacity: 1;\n\tpointer-events: auto;\n}\n\n.big-fa-arrow-circle-down{\n\tfont-size: larger;\n\topacity: 0.8;\n\t-webkit-transition: opacity 0.7s;\n\t-moz-transition: opacity 0.7s;\n\ttransition: opacity 0.7s;\n}\n\n@media screen and (max-width: 992px) {\n\t.callToAction{\n\t\t/*position: absolute;*/\n\t\ttext-align: center;\n\t\t/*top: -23%;*/\n\t}\n\t.callToActionTitle{\n\t    text-align: center;\n\t}\n\t.hidden-sm{\n\t\tdisplay: none !important;\n\t}\n\t.visible-sm{\n\t    display: inline-block !important;\n\t}\n}\n\n@media screen and (max-width: 767px) {\n\t.callToAction {\n\t\ttop: -17%;\n\t}\n\t.callToActionTitle{\n\t    text-align: center;\n\t}\n\t.hidden-xs{\n\t\tdisplay: none !important;\n\t}\n\n\t.visible-xs{\n\t\t  flex-direction: column;\n\t    display: inline-flex !important;\n\t\t\twidth: 100%;\n\t\t\talign-items: center;\n\t}\n\t.partnerLogo{\n\t\theight: 40px;\n\t\twidth: auto;\n\t}\n\n\t.msg{\n\t\theight: 18px;\n\t\tfont-size: 14px;\n\t\tmargin-top: 7px;\n\t}\n}\n", ""]);

// exports


/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ArrowControls = function (_Component) {
  _inherits(ArrowControls, _Component);

  function ArrowControls(props) {
    _classCallCheck(this, ArrowControls);

    var _this = _possibleConstructorReturn(this, (ArrowControls.__proto__ || Object.getPrototypeOf(ArrowControls)).call(this, props));

    _this.state = {};

    return _this;
  }

  _createClass(ArrowControls, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: "sliderControls " + this.props.hideControls },
        _react2.default.createElement(
          'div',
          {
            className: this.props.languageSlideDirection === 'right' ? 'sliderControl goBack' : 'sliderControl goNext',
            onClick: this.props.goBack },
          _react2.default.createElement('i', {
            className: this.props.languageSlideDirection === 'right' ? 'fas fa-chevron-left' : 'fas fa-chevron-right' })
        ),
        _react2.default.createElement(
          'div',
          {
            className: this.props.languageSlideDirection === 'right' ? 'sliderControl goNext' : 'sliderControl goBack',
            onClick: this.props.goNext },
          _react2.default.createElement('i', {
            className: this.props.languageSlideDirection === 'right' ? 'fas fa-chevron-right' : 'fas fa-chevron-left' })
        )
      );
    }
  }]);

  return ArrowControls;
}(_react.Component);

exports.default = ArrowControls;

/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "\n.slider{\n\tposition: relative;\n}\n\n\n.fadeinanimation {\n    -webkit-animation-name: fadeinanimation; /* Safari 4.0 - 8.0 */\n    -webkit-animation-duration: 0.5s; /* Safari 4.0 - 8.0 */\n    animation-name: fadeinanimation;\n    animation-duration: 0.5s;\n}\n\n/* Safari 4.0 - 8.0 */\n@-webkit-keyframes fadeinanimation {\n    0%   {opacity:0; }\n    100% {opacity:1; }\n}\n\n/* Standard syntax */\n@keyframes fadeinanimation {\n    0%   {opacity:0; }\n    100% {opacity:1; }\n}\n\n.slider.smooth{\n\tposition: relative;\n    -webkit-transition: 0.6s ease-in-out;\n    -webkit-transition:  0.6s ease-in-out;\n    -webkit-transition-delay: 0.3s; /* Safari */\n    -o-transition:  0.6s ease-in-out;\n    transition: 0.6s ease-in-out;\n    transition-delay: 0.3s;\n}\n\n.sliderContainer{\n\toverflow-x: hidden;\n    overflow-y: hidden;\n    height: 100%;\n    width: 100%;\n    z-index: -1;\n    background-size: 150%;\n    background-position: top 130px center;\n    background-repeat: no-repeat;\n}\n\n.sliderControls{\n    width: 100%;\n    position: absolute;\n    top: 45%;\n    z-index: 9;\n    color:#fff;\n}\n\n.sliderControl{\n\tfont-size: x-large;\n\tdisplay: inline-block;\n\twidth: 50px;\n\theight: 50px;\n\tborder: 3px solid #fff;\n\tborder-radius: 500px;\n\tcursor: pointer;\n}\n\n.sliderControl>i{\n\ttext-align: center;\n\tvertical-align: middle;\n}\n\n.goNext{\n\tfloat: right;\n\tmargin-right: 20px;\n    /*-webkit-margin-start: 24px;*/\n}\n\n.goBack{\n\tfloat: left;\t\n\tmargin-left:  20px;\n}\n\n.goBack,.goNext{\n    opacity: 0;\n\tposition: relative;\n    -webkit-transition: 0.3s ;\n    -webkit-transition:  0.3s ;\n    -o-transition:  0.3s ;\n    transition: 0.3s ;\n}\n\n.goBack:hover,.goNext:hover{\n    opacity: 0.7;\n}\n\n.slideContainer{\n\tdisplay: inline-block;\n\tvertical-align:top;\n/*\tborder-left: 1px solid #fff;\n\tborder-right: 1px solid #fff;*/\n}\n\n.hideControls{\n\tdisplay: none;\n}\n\n.bulletsControls {\n    margin-top: -40px;\n    position: absolute;\n    width: 100%;\n    text-align: center;\n}\n\n.bullet {\n    height: 10px;\n    width: 10px;\n    background-color:  #fff;\n    border-radius:  500px;\n    display:  inline-block;\n    margin: 0 5px;\n    opacity: 0.7;\n    cursor: pointer;\n}\n\n.bullet.active{\n    opacity: 1;\n}\n\n@media screen and (max-width: 767px) {\n    .sliderControls{\n        display: none;\n    }\n    .hideOnSmall{\n        display: none;\n    }\n}", ""]);

// exports


/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _ProductBlock = __webpack_require__(108);

var _ProductBlock2 = _interopRequireDefault(_ProductBlock);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ProductsBlocks = function (_Component) {
  _inherits(ProductsBlocks, _Component);

  function ProductsBlocks() {
    _classCallCheck(this, ProductsBlocks);

    return _possibleConstructorReturn(this, (ProductsBlocks.__proto__ || Object.getPrototypeOf(ProductsBlocks)).apply(this, arguments));
  }

  _createClass(ProductsBlocks, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      __webpack_require__(40);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        _react2.default.Fragment,
        null,
        this.props.productsObjects.length > 1 ? _react2.default.createElement(
          'div',
          { className: 'productsBlocks' },
          this.props.productsObjects.map(function (productObj, key) {
            return _react2.default.createElement(_ProductBlock2.default, {
              key: key,
              blocksNumber: _this2.props.productsObjects.length,
              title: productObj.block.title,
              subtitle: productObj.block.subtitle,
              image: productObj.block.image,
              hoverImage: productObj.block.hoverImage,
              hoverColor: productObj.brandingColor || productObj.color,
              link: '/' + productObj.slot + '/' + (_this2.props.partner ? _this2.props.partner : ''),
              language: _this2.props.language
            });
          })
        ) : null
      );
    }
  }]);

  return ProductsBlocks;
}(_react.Component);

exports.default = ProductsBlocks;

/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(4);

var _windowOrGlobal = __webpack_require__(5);

var _windowOrGlobal2 = _interopRequireDefault(_windowOrGlobal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ProductBlock = function (_Component) {
  _inherits(ProductBlock, _Component);

  function ProductBlock(props) {
    _classCallCheck(this, ProductBlock);

    var _this = _possibleConstructorReturn(this, (ProductBlock.__proto__ || Object.getPrototypeOf(ProductBlock)).call(this, props));

    _this.state = {
      initialStyle: {
        width: (100 * 1 / _this.props.blocksNumber).toString() + '%',
        backgroundImage: 'url(' + _this.props.image + ')',
        backgroundColor: 'transparent'
      },
      hoverStyle: {
        width: (100 * 1 / _this.props.blocksNumber).toString() + '%',
        backgroundImage: 'url(' + _this.props.hoverImage + ')',
        backgroundColor: _this.props.hoverColor
      },
      style: {},
      ipadWidth: _this.props.blocksNumber % 2 === 0 ? 'halfWidth' : '',
      mobile: _windowOrGlobal2.default.innerWidth <= 767 ? true : false
    };
    return _this;
  }

  _createClass(ProductBlock, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.determineStyleBasedOnWindowWidth();
      _windowOrGlobal2.default.addEventListener("resize", this.determineStyleBasedOnWindowWidth.bind(this));
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _windowOrGlobal2.default.removeEventListener("resize", this.determineStyleBasedOnWindowWidth.bind(this));
    }
  }, {
    key: 'determineStyleBasedOnWindowWidth',
    value: function determineStyleBasedOnWindowWidth() {
      this.setState({ mobile: _windowOrGlobal2.default.innerWidth <= 767 ? true : false });
      if (this.state.mobile) {
        this.changeStyle(this.state.hoverStyle);
      } else {
        this.changeStyle(this.state.initialStyle);
      }
    }
  }, {
    key: 'onMouseOverOut',
    value: function onMouseOverOut(style) {
      if (!this.state.mobile) {
        this.changeStyle(style);
      }
    }
  }, {
    key: 'changeStyle',
    value: function changeStyle(newStyle) {
      this.setState({ style: newStyle });
    }
  }, {
    key: 'checkStringStyle',
    value: function checkStringStyle(text) {
      return text.split(" ").map(function (text, key) {
        return text.indexOf('\\') > -1 ? _react2.default.createElement(
          'span',
          { key: key, style: { fontStyle: 'italic' }, className: 'blockTitle circe' },
          text.replace('\\', '') + ' '
        ) : text + ' ';
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        _reactRouterDom.Link,
        {
          to: this.props.link },
        _react2.default.createElement(
          'div',
          {
            className: 'productBlock ' + this.state.ipadWidth,
            style: this.state.style,
            onMouseOver: function onMouseOver() {
              return _this2.onMouseOverOut(_this2.state.hoverStyle);
            },
            onMouseOut: function onMouseOut() {
              return _this2.onMouseOverOut(_this2.state.initialStyle);
            }
          },
          _react2.default.createElement(
            'div',
            { className: 'productBlockTitle' },
            _react2.default.createElement(
              'h2',
              { className: 'blockTitle circe' },
              this.checkStringStyle(this.props.title)
            ),
            _react2.default.createElement(
              'h5',
              { className: this.props.language === 'en' ? 'blockSubtitle circe' : 'blockSubtitle' },
              this.props.subtitle
            )
          )
        )
      );
    }
  }]);

  return ProductBlock;
}(_react.Component);

exports.default = ProductBlock;

/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

var escape = __webpack_require__(16);
exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "\n.productsBlocks{\n\tbackground: linear-gradient(to bottom, rgba(252,252,252,1) 0%, rgba(252,252,252,1) 53%, rgba(248,248,248,1) 60%, rgba(227,227,227,1) 100%);\n}\n.productBlock {\n\theight:200px;\n    display: inline-block;\n    background-repeat: no-repeat;\n    background-size: auto 120px;\n    background-position: center bottom;\n    color: #454545;\n    -webkit-transition: background 0.4s, color 0.4s;\n    -webkit-transition:  background 0.4s, color 0.4s;\n    -o-transition: background 0.4s, color 0.4s;\n    transition: background 0.4s, color 0.4s;\n    border: 1px solid #ffffff96;\n}\n\n\n.productBlock:hover {\n    color: #fff;\n}\n\n.productBlockTitle{\n\tmargin-top: 10px;\n}\n\n.blockTitle{\n\tmargin: 0;\n\tmargin-top: 12px;\n}\n\n.blockSubtitle {\n\tmargin-top: -7px;\n\tfont-size: large;\n}\n\n@font-face{\n    font-family: 'circe';\n    src: url(" + escape(__webpack_require__(41)) + "),\n    url(" + escape(__webpack_require__(41)) + ");\n}\n\n@font-face{\n    font-family: 'circe_IE'; src: url(" + escape(__webpack_require__(110)) + ");\n}\n\n.circe{\n    font-family: 'circe','Muli-ExtraLight';\n}\n\n@media screen and (max-width: 992px) {\n\t/* .productBlock.halfWidth {\n\t\twidth :50% !important;\n\t}\n\t.productBlock.fullWidth{\n\t\twidth :100% !important;\n\t} */\n\t.productBlock{\n\t\twidth :50% !important;\n\t}\n}\n\n@media screen and (max-width: 767px) {\n\t.productBlock {\n\t\theight: 170px;\n\t}\n\t.productBlock {\n\t\t\twidth :100% !important;\n\t\t\tbackground-size: auto 108px;\n\t    background-position: center bottom -15px;\n\t}\n  .productsBlocks{\n      padding-top: 52px;\n  }\n  .productBlock {\n      color: #fff;\n  }\n}\n", ""]);

// exports


/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "fonts/CRC25.eot";

/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "\n.animatedRow{\n    /* display: flex; */\n    margin: auto;\n}\n\n.animatedDiv {\n  display: inline-block;\n  vertical-align: top;\n}\n\n\n.animateFromTop {\n    position: relative;\n    -webkit-animation-name: bottom; /* Safari 4.0 - 8.0 */\n    -webkit-animation-duration: 0.5s; /* Safari 4.0 - 8.0 */\n    animation-name: bottom;\n    animation-duration: 0.5s;\n}\n\n.animationNotStarted{\n  opacity: 0;\n}\n\n@media screen and (max-width: 767px) {\n  .noSpaceBetweenRowsOnMobile{\n    height: 0px !important;\n  }\n  .fullWidthOnMobile{\n    width: 100% !important;\n    margin-bottom: 40px !important;\n  }\n  .fullWidthOnMobile:last-child{\n    margin-bottom: 5px !important;\n  }\n}\n\n/* Safari 4.0 - 8.0 */\n@-webkit-keyframes bottom  {\n    0%   {opacity:0; bottom:100px; }\n    100% {opacity:1;  bottom:0px; }\n}\n\n/* Standard syntax */\n@keyframes bottom  {\n    0%   {opacity:0; bottom:100px; }\n    100% {opacity:1;  bottom:0px; }\n}\n\n/*********************************************************************/\n\n.animateFromButtom {\n    position: relative;\n    -webkit-animation-name: top; /* Safari 4.0 - 8.0 */\n    -webkit-animation-duration: 0.5s; /* Safari 4.0 - 8.0 */\n    animation-name: top;\n    animation-duration: 0.5s;\n}\n\n/* Safari 4.0 - 8.0 */\n@-webkit-keyframes top {\n    0%   {opacity:0; top: 100px; }\n    100% {opacity:1;  top: 0px; }\n}\n\n/* Standard syntax */\n@keyframes top  {\n    0%   {opacity:0; top: 100px; }\n    100% {opacity:1;  top : 0px; }\n}\n", ""]);

// exports


/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "\n.TapCarouselSliderItem{\n  width: 25%;\n  padding: 0 6%;\n  display: inline-block !important;\n}\n\n.slick-arrow{\n  height: 30px;\n  width: 30px;\n  opacity: 0.6;\n  -webkit-transition: 300ms;\n  -moz-transition: 300ms;\n  -o-transition: 300ms;\n  transition: 300ms;\n}\n\n.slick-arrow:hover{\n  opacity: 0.3;\n}\n\n\n.slick-prev:before,.slick-next:before,[dir=rtl] .slick-next:before,[dir=rtl] .slick-prev:before{\n  content: '';\n}\n[dir=ltr] .slick-arrow.slick-next{\n  background-image: url(https://image.flaticon.com/icons/svg/271/271228.svg);\n}\n\n[dir=rtl] .slick-prev{\n  background-image: url(https://image.flaticon.com/icons/svg/271/271228.svg) !important;\n}\n\n[dir=ltr] .slick-arrow.slick-prev{\n  background-image: url(https://image.flaticon.com/icons/svg/271/271220.svg);\n}\n[dir=rtl] .slick-next{\n  background-image: url(https://image.flaticon.com/icons/svg/271/271220.svg) !important;\n}\n\n@media screen and (max-width: 767px) {\n  .TapCarouselSliderItem{\n    width: 170px !important;\n    padding: 10px 9% !important;\n  }\n  .slick-arrow{\n    display: none !important\n  }\n}\n", ""]);

// exports


/***/ }),
/* 113 */
/***/ (function(module, exports) {

module.exports = {"title":{"en":"In The News","ar":"في الأخبار"},"items":[{"name":"forbes","image":"https://www.tap.company/websiteImages/inthenews/forbes.svg"},{"name":"bazar","image":"https://www.tap.company/websiteImages/inthenews/bazar.svg","link":"http://bazaar.town/tap-the-smart-way-to-pay/"},{"name":"nuwait","image":"https://www.tap.company/websiteImages/inthenews/nuwait.svg","link":"http://nuwait.net.kw/video/online-payment-gets-boost-kuwait-video"},{"name":"skynews","image":"https://www.tap.company/websiteImages/inthenews/skynews.svg","link":"http://www.skynewsarabia.com/web/episode/X3Los8CYU4I/PLPMXgosg0OYNFgab2VX1piaYqZYvmjour?headline=%D8%A2%D9%81%D8%A7%D9%82%20%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D8%AB%D9%85%D8%A7%D8%B1%20--%20%D8%A7%D9%84%D9%83%D9%88%D9%8A%D8%AA%20%D8%A8%D9%8A%D8%A6%D8%A9%20%D9%85%D8%AD%D9%81%D8%B2%D8%A9%20%D9%84%D8%A7%D8%AD%D8%AA%D8%B6%D8%A7%D9%86%20%D9%85%D8%B4%D8%A7%D8%B1%D9%8A%D8%B9%20%D8%A7%D9%84%D8%AA%D9%83%D9%86%D9%88%D9%84%D9%88%D8%AC%D9%8A%D8%A7%20%D8%A7%D9%84%D9%86%D8%A7%D8%B4%D8%A6%D8%A9&programName=%D8%A2%D9%81%D8%A7%D9%82%20%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D8%AB%D9%85%D8%A7%D8%B1&imageUrl=https://i.ytimg.com/vi/X3Los8CYU4I"},{"name":"arabnet","image":"https://www.tap.company/websiteImages/inthenews/arabnet.svg","link":"https://www.arabnet.me/english/editorials/Business/E-Commerce/Tap--Payment-Solutions-Made-Easy-Quick-and-Secure"},{"name":"khaleejsque","image":"https://www.tap.company/websiteImages/inthenews/khaleejesque.svg","link":"http://www.tap.company/websiteImages/inthenews/Science-Culture-Tap-Liltera-R-Williams-April-.pdf"},{"name":"aljarida","image":"https://www.tap.company/websiteImages/inthenews/aljarida.svg","link":"http://www.aljarida.com/articles/1537021096968581600/"},{"name":"AlAnba","image":"https://www.tap.company/websiteImages/inthenews/alanba.svg","link":"https://www.alanba.com.kw/ar/economy-news/856026/16-09-2018-%D8%A8%D9%88%D8%A8%D9%8A%D8%A7%D9%86-%D9%8A%D9%88%D9%82%D8%B9-%D8%A7%D8%AA%D9%81%D8%A7%D9%82%D9%8A%D8%A9-%D8%AA%D8%B9%D8%A7%D9%88%D9%86-tap-payments"},{"name":"alrai","image":"https://www.tap.company/websiteImages/inthenews/alrai.svg","link":"http://m.alraimedia.com/ar/article/economics/2017/10/03/795804/nr/kuwait"},{"name":"alqabas","image":"https://www.tap.company/websiteImages/inthenews/alqabas.svg","link":"https://alqabas.com/444557/"}]}

/***/ }),
/* 114 */
/***/ (function(module, exports) {

module.exports = [{"smimilar":true,"hasBanner":true,"hasBlock":true,"product":"collect","slot":"collect","brandingColor":"#ff0031","schedule_for":"GD","bannerImage":"https://www.tap.company/websiteImages/bannerImages/gocollect-en-video.png","videoLink":"https://player.vimeo.com/video/211170801?autoplay=0&byline=0&portrait=0&color=cccccc","subImage":"https://www.tap.company/websiteImages/subImages/gocollect-sub-image.jpg","countries":["kw","om","eg","qa","ae","sa","bh","jo","lb"],"block":{"title":"gocollect","subtitle":{"en":"send bills","ar":"إرسال الفواتير"},"image":"https://www.tap.company/websiteImages/blocks/goCollect.png","hoverImage":"https://www.tap.company/websiteImages/blocks/goCollect.png"}},{"hasBanner":true,"hasBlock":true,"product":"sell","slot":"sell","brandingColor":"#00aff0","bannerImage":"https://www.tap.company/websiteImages/bannerImages/goSell-accept-payments-online.png","subImage":"https://www.tap.company/websiteImages/subImages/gosell-sub-image.png","countries":["kw","om","eg","qa","ae","sa","bh","jo","lb"],"block":{"title":"gosell","subtitle":{"en":"accept online payments","ar":"استقبال المدفوعات الإلكترونية"},"image":"https://www.tap.company/websiteImages/blocks/goSell.png","hoverImage":"https://www.tap.company/websiteImages/blocks/goSell.png"}},{"hasBanner":true,"hasBlock":true,"product":"pay","slot":"pay","brandingColor":"#2ace00","schedule_for":"TD","bannerImage":"https://www.tap.company/websiteImages/bannerImages/gopay-eng-video.png","videoLink":"https://player.vimeo.com/video/146118094?autoplay=0&byline=0&portrait=0&color=cccccc","subImage":"https://www.tap.company/websiteImages/subImages/gopay-sub-image.jpg","countries":["kw"],"block":{"title":"gopay","subtitle":{"en":"pay bills","ar":"دفع الفواتير"},"image":"https://www.tap.company/websiteImages/blocks/goPay.png","hoverImage":"https://www.tap.company/websiteImages/blocks/goPay.png"}},{"smimilar":true,"hasBanner":true,"hasBlock":true,"product":"collect","partner":"nbk","slot":"nbk","brandingColor":"#1d4d8a","schedule_for":"GD","paternImage":"https://www.tap.company/websiteImages/partners/nbk/NBK-symbol.svg","logo":"https://www.tap.company/websiteImages/partners/nbk/NBK-tap-logo.svg","bannerImage":"https://www.tap.company/websiteImages/bannerImages/gocollect-en-video.png","videoLink":"https://player.vimeo.com/video/291702528?autoplay=0&byline=0&portrait=0&color=cccccc","subImage":"https://www.tap.company/websiteImages/subImages/gocollect-sub-image.jpg","countries":["kw"],"block":{"title":"gocollect \\partner","subtitle":{"en":"send bills","ar":"إرسال الفواتير"},"image":"https://www.tap.company/websiteImages/blocks/nbk-collect1.png","hoverImage":"https://www.tap.company/websiteImages/blocks/nbk-collect2.png"}},{"hasBanner":false,"hasBlock":true,"slot":"api","brandingColor":"#ffc72d","block":{"title":"api","subtitle":{"en":"for developers","ar":"للمطورين"},"image":"https://www.tap.company/websiteImages/blocks/api-1.png","hoverImage":"https://www.tap.company/websiteImages/blocks/api-2.png"}}]

/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, ".lessOpacityOnHover{\n  -webkit-transition: 200ms;\n  -moz-transition: 200ms;\n  -o-transition: 200ms;\n  transition: 200ms;\n}\n\n.lessOpacityOnHover:hover{\n  opacity: 0.4;\n}\n", ""]);

// exports


/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _mobxReact = __webpack_require__(7);

var _Banner = __webpack_require__(13);

var _Banner2 = _interopRequireDefault(_Banner);

var _BannerLayer = __webpack_require__(14);

var _BannerLayer2 = _interopRequireDefault(_BannerLayer);

var _Features = __webpack_require__(29);

var _Features2 = _interopRequireDefault(_Features);

var _CallToAction = __webpack_require__(20);

var _CallToAction2 = _interopRequireDefault(_CallToAction);

var _Slider = __webpack_require__(15);

var _Slider2 = _interopRequireDefault(_Slider);

var _LightBox = __webpack_require__(12);

var _LightBox2 = _interopRequireDefault(_LightBox);

var _TapCarouselSlider = __webpack_require__(44);

var _TapCarouselSlider2 = _interopRequireDefault(_TapCarouselSlider);

var _ParallaxScroll = __webpack_require__(23);

var _ParallaxScroll2 = _interopRequireDefault(_ParallaxScroll);

var _TestimonialsQuotes = __webpack_require__(118);

var _TestimonialsQuotes2 = _interopRequireDefault(_TestimonialsQuotes);

var _Img = __webpack_require__(3);

var _Img2 = _interopRequireDefault(_Img);

var _callToAction = __webpack_require__(47);

var _callToAction2 = _interopRequireDefault(_callToAction);

var _features = __webpack_require__(48);

var _features2 = _interopRequireDefault(_features);

var _tapPageIntro = __webpack_require__(49);

var _tapPageIntro2 = _interopRequireDefault(_tapPageIntro);

var _businesses = __webpack_require__(50);

var _businesses2 = _interopRequireDefault(_businesses);

var _testimonials = __webpack_require__(121);

var _testimonials2 = _interopRequireDefault(_testimonials);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// import {NavLink}  from 'react-router-dom';

// import headful from 'headful';

// import ProductsBlocks from '../../components/ProductsBlocks/ProductsBlocks.js';


// import preferencesStore from '../../stores/UserPreferencesStore.js';

var ProductPage = function (_Component) {
  _inherits(ProductPage, _Component);

  function ProductPage(props) {
    _classCallCheck(this, ProductPage);

    var _this = _possibleConstructorReturn(this, (ProductPage.__proto__ || Object.getPrototypeOf(ProductPage)).call(this, props));

    _this.state = {
      openLightBox: false,
      lightBoxLink: ''
    };
    return _this;
  }

  _createClass(ProductPage, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var language = this.props.preferencesStore.language;
      __webpack_require__(54)("./" + language + '.css');
      __webpack_require__(69);
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      var preferencesStore = this.props.preferencesStore;
      preferencesStore.filterJsonStringsBasedOnLanguage(_features2.default.items);
      preferencesStore.filterJsonStringsBasedOnLanguage(_features2.default);
      preferencesStore.filterJsonStringsBasedOnLanguage(_callToAction2.default);
      preferencesStore.filterJsonStringsBasedOnLanguage(_tapPageIntro2.default);
      preferencesStore.filterJsonStringsBasedOnLanguage(_businesses2.default);
      preferencesStore.filterJsonStringsBasedOnLanguage(_testimonials2.default);
    }
  }, {
    key: 'includebreaks',
    value: function includebreaks(text) {
      return text.split("\n").map(function (text, key) {
        return _react2.default.createElement(
          'span',
          { key: key },
          text,
          _react2.default.createElement('br', null)
        );
      });
    }
  }, {
    key: 'openLightBoxFunction',
    value: function openLightBoxFunction(link) {
      if (link) {
        this.setState({
          openLightBox: true,
          lightBoxLink: link
        });
      }
    }
  }, {
    key: 'closeLightBoxFunction',
    value: function closeLightBoxFunction() {
      this.setState({
        openLightBox: false
      });
      setTimeout(function () {
        this.setState({
          lightBoxLink: ''
        });
      }.bind(this), 200);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var partnerString = this.props.partner ? this.props.partner : '';

      var source = this.props.preferencesStore.pageUrlKeys.src && this.props.preferencesStore.pageUrlKeys.src === 'partner' && this.props.partner ? this.props.partner : '';

      var preferencesStore = this.props.preferencesStore;
      var partner = false;
      this.props.partner ? partner = preferencesStore.getCurrentPartner(this.props.partner) : partner = false;

      var string = this.props.product;
      var product = preferencesStore.getProduct(string);
      var sliderChildrenArray = [];
      sliderChildrenArray.push(product);

      var schedule_for = '';
      product && product.schedule_for ? schedule_for = product.schedule_for : null;

      var videoLink = '';
      partner ? videoLink = partner.products.filter(function (product) {
        return product.product === string;
      })[0].videoLink : videoLink = product.videoLink;
      videoLink ? null : videoLink = product.videoLink;

      var businessesList = [];
      _businesses2.default.filter(function (business) {
        return business.product === product.product;
      })[0] ? businessesList = _businesses2.default.filter(function (business) {
        return business.product === product.product;
      })[0].businessesList : businessesList = null;

      var businessesListTitle = '';
      _businesses2.default.filter(function (business) {
        return business.product === product.product;
      })[0] ? businessesListTitle = _businesses2.default.filter(function (business) {
        return business.product === product.product;
      })[0].title : businessesListTitle = null;

      var ProductTestimonials = [];
      _testimonials2.default.filter(function (testimonial) {
        return testimonial.product === product.product;
      })[0] ? ProductTestimonials = _testimonials2.default.filter(function (testimonial) {
        return testimonial.product === product.product;
      })[0].testimonials : ProductTestimonials = null;

      var ProductTestimonialsTitle = '';
      _testimonials2.default.filter(function (testimonial) {
        return testimonial.product === product.product;
      })[0] ? ProductTestimonialsTitle = _testimonials2.default.filter(function (testimonial) {
        return testimonial.product === product.product;
      })[0].title : ProductTestimonialsTitle = null;

      return _react2.default.createElement(
        _react2.default.Fragment,
        null,
        _react2.default.createElement(_LightBox2.default, {
          link: this.state.lightBoxLink,
          open: this.state.openLightBox,
          onClick: function onClick() {
            return _this2.closeLightBoxFunction();
          }
        }),
        _react2.default.createElement(
          _Slider2.default,
          {
            language: preferencesStore.language,
            oneBackground: true,
            backgroundColor: partner ? partner.brandingColor : product.brandingColor,
            backgroundImage: partner.paternImage,
            hideOnSmall: false
          },
          sliderChildrenArray.map(function (child, key) {
            return _react2.default.createElement(
              _Banner2.default,
              {
                key: key,
                preferencesStore: preferencesStore,
                cropped: 65,
                backgroundColor: partner ? partner.brandingColor : product.brandingColor,
                backgroundImage: partner ? partner.paternImage : '',
                reverse: true,
                maxContentHeight: true },
              _react2.default.createElement(
                _BannerLayer2.default,
                {
                  animation: 'shortFromLeft' },
                _react2.default.createElement(_CallToAction2.default, {
                  partnerLogo: partner ? partner.logo : null,
                  callToAction: preferencesStore.getCallToAction(_callToAction2.default, product.product),
                  country_code: preferencesStore.country_code,
                  language: preferencesStore.language,
                  color: partner ? partner.brandingColor : product.brandingColor,
                  source: source,
                  schedule_for: schedule_for,
                  partner: partnerString
                })
              ),
              _react2.default.createElement(
                _BannerLayer2.default,
                {
                  animation: 'shortFromRight' },
                _react2.default.createElement(_Img2.default, {
                  src: product.bannerImage,
                  alt: 'bannerImage',
                  className: videoLink ? 'bannerImage openLightBox' : 'bannerImage',
                  onClick: function onClick() {
                    return _this2.openLightBoxFunction(videoLink);
                  },
                  increasHeight: 1.105
                })
              )
            );
          })
        ),
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement('div', { className: 'hidden-xs', style: { height: '45px' } }),
          _react2.default.createElement('div', { style: { height: '45px' } }),
          _react2.default.createElement(
            'div',
            { className: 'container' },
            _react2.default.createElement(
              'h5',
              { style: { color: partner ? '' : product.brandingColor } },
              partner ? partner.subIntro : product.intro
            ),
            _react2.default.createElement('div', { style: { height: '70px' } }),
            _react2.default.createElement(
              'h4',
              { className: 'hidden-xs' },
              this.includebreaks(partner ? partner.intro : _tapPageIntro2.default.intro)
            ),
            _react2.default.createElement(
              'h5',
              { className: 'visible-xs' },
              this.includebreaks(partner ? partner.intro : _tapPageIntro2.default.intro)
            ),
            _react2.default.createElement('div', { style: { height: '100px' } })
          ),
          ProductTestimonials ? _react2.default.createElement(
            'div',
            { className: 'container' },
            _react2.default.createElement(_TestimonialsQuotes2.default, {
              title: ProductTestimonialsTitle,
              testimonials: ProductTestimonials,
              language: preferencesStore.language
            }),
            _react2.default.createElement('div', { style: { height: '140px' } })
          ) : null,
          _react2.default.createElement(_Features2.default, {
            features: preferencesStore.getFeatures(_features2.default.items, product.product),
            title: _features2.default.name,
            rightPartAnimation: 'appearFromRight',
            leftPartAnimation: 'appearFromLeft',
            partner: this.props.partner
          })
        ),
        product.subImage ? _react2.default.createElement(
          _react2.default.Fragment,
          null,
          _react2.default.createElement('div', { style: { height: '140px' } }),
          _react2.default.createElement(_ParallaxScroll2.default, {
            backgroundImage: product.subImage
          })
        ) : null,
        businessesList ? _react2.default.createElement(
          'div',
          { className: 'container' },
          _react2.default.createElement('div', { style: { height: '140px' } }),
          _react2.default.createElement(_TapCarouselSlider2.default, {
            title: businessesListTitle ? businessesListTitle : null,
            businesses: businessesList,
            ItemsInSlide: 4,
            language: preferencesStore.language
          }),
          _react2.default.createElement('div', { style: { height: '140px' } })
        ) : null,
        _react2.default.createElement(
          'div',
          { className: '', style: { backgroundColor: partner ? partner.brandingColor : product.brandingColor, padding: '40px 0px' } },
          _react2.default.createElement(_CallToAction2.default, {
            callToAction: preferencesStore.getCallToAction(_callToAction2.default, product.product),
            country_code: preferencesStore.country_code,
            language: preferencesStore.language,
            color: partner ? partner.brandingColor : product.brandingColor,
            source: source,
            center: true,
            schedule_for: schedule_for,
            partner: partnerString
          })
        )
      );
    }
  }]);

  return ProductPage;
}(_react.Component);

exports.default = (0, _mobxReact.observer)(ProductPage);

/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "\n.parallaxScroll{\n  height: 350px;\n  overflow: hidden;\n  position: relative;\n}\n\n.parallaxScrollBackground{\n  background-size: cover;\n  height: 150%;\n  pointer-events: none;\n  position: absolute;\n  left: 0;\n  right: 0;\n  top: 0;\n  background-attachment: scroll;\n  background-color: transparent;\n  background-size: cover;\n  background-position: 50% 0;\n}\n\n.parallaxScrollContentBox{\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  display: flex;\n  flex-direction: row;\n  align-items :center;\n}\n.parallaxScrollContent{\n  width: 100%;\n  margin: 10%;\n  padding: 5% 10%;}\n\n.parallaxScrollContent.withContentBackground{\n  background-color: #ffffffb5;\n}\n\n/* .parallaxScroll{\n  height: 350px;\n  overflow: hidden;\n}\n\n.parallaxScrollBackground{\n  height: 150%;\n  background-size: cover;\n\n} */\n", ""]);

// exports


/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(4);

var _TestimonialQuote = __webpack_require__(119);

var _TestimonialQuote2 = _interopRequireDefault(_TestimonialQuote);

var _Title = __webpack_require__(10);

var _Title2 = _interopRequireDefault(_Title);

var _Separator = __webpack_require__(9);

var _Separator2 = _interopRequireDefault(_Separator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TestimonialsQuotes = function (_Component) {
  _inherits(TestimonialsQuotes, _Component);

  function TestimonialsQuotes() {
    _classCallCheck(this, TestimonialsQuotes);

    return _possibleConstructorReturn(this, (TestimonialsQuotes.__proto__ || Object.getPrototypeOf(TestimonialsQuotes)).apply(this, arguments));
  }

  _createClass(TestimonialsQuotes, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      __webpack_require__(53);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        _react2.default.Fragment,
        null,
        this.props.title ? _react2.default.createElement(
          _react2.default.Fragment,
          null,
          _react2.default.createElement(_Title2.default, {
            title: this.props.title,
            separator: _react2.default.createElement(_Separator2.default, { width: '25%' })
          }),
          _react2.default.createElement('div', { style: { height: '20px' } })
        ) : null,
        this.props.testimonials.length > 1 ? _react2.default.createElement(
          'div',
          { className: 'testimonialsQuotes' },
          this.props.testimonials.map(function (testimonialObj, key) {
            return _react2.default.createElement(_TestimonialQuote2.default, {
              key: key,
              testimonialNumber: _this2.props.testimonials.length,
              image: testimonialObj.testimonialImage,
              qoute: testimonialObj.qoute,
              name: testimonialObj.name,
              role: testimonialObj.role,
              businessName: testimonialObj.businessName,
              language: _this2.props.language
            });
          })
        ) : null
      );
    }
  }]);

  return TestimonialsQuotes;
}(_react.Component);

exports.default = TestimonialsQuotes;

/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(4);

var _reactDom = __webpack_require__(11);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _Img = __webpack_require__(3);

var _Img2 = _interopRequireDefault(_Img);

var _windowOrGlobal = __webpack_require__(5);

var _windowOrGlobal2 = _interopRequireDefault(_windowOrGlobal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TestimonialQuote = function (_Component) {
	_inherits(TestimonialQuote, _Component);

	function TestimonialQuote(props) {
		_classCallCheck(this, TestimonialQuote);

		var _this = _possibleConstructorReturn(this, (TestimonialQuote.__proto__ || Object.getPrototypeOf(TestimonialQuote)).call(this, props));

		_this.state = {
			componentYPosition: 0,
			componentYHeight: 0,
			startAnimation: false,
			descriptionActive: '',
			animation: _this.props.animationClass ? _this.props.animationClass : 'shownTestimonialQuote'
		};
		_this.handleScroll = _this.handleScroll.bind(_this);
		return _this;
	}

	_createClass(TestimonialQuote, [{
		key: 'getBodyScrollTop',
		value: function getBodyScrollTop() {
			var el = document.scrollingElement || document.documentElement;
			return el.scrollTop;
		}
	}, {
		key: 'handleScroll',
		value: function handleScroll() {
			if (this.getBodyScrollTop() + 500 > this.state.componentYPosition) {
				this.setState({
					startAnimation: true
				});
			}
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			_windowOrGlobal2.default.addEventListener("scroll", this.handleScroll);
			this.setState({
				componentYPosition: _reactDom2.default.findDOMNode(this).getBoundingClientRect().top
			});
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			_windowOrGlobal2.default.removeEventListener("scroll", this.handleScroll);
		}
	}, {
		key: 'render',
		value: function render() {
			var bigSpace = '30px';
			var smallSpace = '10px';
			return _react2.default.createElement(
				'div',
				{
					className: this.state.startAnimation ? this.state.animation + ' TestimonialQuote' : 'hiddenTestimonialQuote TestimonialQuote',
					style: { width: (100 * 1 / this.props.testimonialNumber).toString() + '%' } },
				_react2.default.createElement(_Img2.default, { className: this.state.startAnimation ? 'circleImage circleImageNormalSize' : 'circleImage circleImageSmallSize', src: this.props.image }),
				_react2.default.createElement('div', { style: { height: bigSpace } }),
				_react2.default.createElement(
					'h3',
					{ className: 'quotationsMarks' },
					_react2.default.createElement('i', { className: this.props.language === 'ar' ? "fas fa-quote-right" : "fas fa-quote-left" }),
					' ' + this.props.qoute + ' ',
					_react2.default.createElement('i', { className: this.props.language === 'ar' ? "fas fa-quote-left" : "fas fa-quote-right" })
				),
				_react2.default.createElement('div', { style: { height: bigSpace } }),
				_react2.default.createElement(
					'h5',
					{ className: 'quoterName' },
					this.props.name
				),
				_react2.default.createElement(
					'h5',
					{ className: 'quoterRole' },
					this.props.role
				),
				_react2.default.createElement('div', { style: { height: smallSpace } }),
				_react2.default.createElement(
					'h5',
					{ className: 'quoterBusName' },
					this.props.businessName
				)
			);
		}
	}]);

	return TestimonialQuote;
}(_react.Component);

exports.default = TestimonialQuote;

/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, ".testimonialsQuotes{\n\tdisplay: flex;\n}\n\n.TestimonialQuote{\n\tdisplay: inline-block;\n\tvertical-align: top;\n\tmargin: 0px 5px;\n\t-webkit-transition: opacity 0.7s;\n     -moz-transition: opacity 0.7s;\n      -ms-transition: opacity 0.7s;\n       -o-transition: opacity 0.7s;\n          transition: opacity 0.7s;\n}\n\n.hiddenTestimonialQuote{\n\topacity:0;\n}\n\n.shownTestimonialQuote{\n\topacity: 1;\n  /* animation-duration: 0.5s; */\n}\n\n.circleImage.circleImageSmallSize{\n\twidth: 40%;\n}\n\n.circleImage.circleImageNormalSize{\n\twidth: 60%;\n}\n\n.circleImage{\n\tborder-radius: 50%;\n\theight: auto;\n\t-webkit-transition: width 0.4s;\n     -moz-transition: width 0.4s;\n      -ms-transition: width 0.4s;\n       -o-transition: width 0.4s;\n          transition: width 0.4s;\n}\n\n.quotationsMarks{\n\tfont-size: medium;\n\tquotes: \"'\" \"'\";\n\tmargin: 0;\n\tfont-style: italic;\n}\n\n.quoterName{\n\tfont-size: medium;\n\tfont-weight: bold;\n\tmargin: 0;\n}\n\n.quoterRole{\n\tfont-size: medium;\n\tmargin: 0;\n}\n\n\n.quoterBusName{\n\tfont-size: medium;\n\tfont-weight: bold;\n\tmargin: 0;\n}\n\n@media screen and (max-width: 767px) {\n\t.TestimonialQuote{\n\t\twidth :100% !important;\n\t\tmargin-bottom: 40px;\n\t}\n\t.testimonialsQuotes{\n\t\tdisplay: block;\n\t}\n\t.circleImage.circleImageNormalSize{\n\t\twidth: 150px;\n\t\theight: 150px;\n\t}\n}\n", ""]);

// exports


/***/ }),
/* 121 */
/***/ (function(module, exports) {

module.exports = [{"product":"collect","title":{"en":"Our Community","ar":"مجتمعنا"},"testimonials":[{"testimonialImage":"https://www.tap.company//websiteImages/testimonials/darha.png","qoute":{"en":"Tap has made our lives easier! From the great around the clock customer service to creating products that fit our sometimes unconventional needs.","ar":"أثّر على شييّن الصّراحة مو بس المبيعات، تاپ أثّر على راحتي وراحة الزبون."},"name":{"en":"Noaf & Budour","ar":"هيا العمر"},"role":{"en":"Founders","ar":"المالك"},"businessName":{"en":"Qout Market","ar":"دار هاء"}},{"testimonialImage":"https://www.tap.company//websiteImages/testimonials/yalwa.jpg","qoute":{"en":"Perfect payment solutions for our brides are just a click away!","ar":"حل الدفع الأمثل لعروساتنا على بعد ضغطة واحدة! "},"name":{"en":"Aroob Al Abdaly","ar":"عروب العبدلي"},"role":{"en":"Managing Partner","ar":"شريك إداري"},"businessName":{"en":"Yalwah","ar":"يلوه"}},{"testimonialImage":"https://www.tap.company//websiteImages/testimonials/sirdablab.jpg","qoute":{"en":"Tap is the most convenient way to accept payment via email or SMS.","ar":"تاپ أنسب طريقة نستقبل فيها المدفوعات عن طريق الإيميل أو الرسائل القصيرة."},"name":{"en":"Haider Almosawi","ar":"حيدر الموسوي"},"role":{"en":"CEO & Co-founder","ar":"رئيس مجلس الإدارة والمؤسس"},"businessName":{"en":"Sirdab Lab","ar":"سرداب لاب"}},{"testimonialImage":"https://www.tap.company//websiteImages/testimonials/proteges.jpg","qoute":{"en":"Tap provided one of the best customer service experience I have come across in Kuwait.","ar":"تاپ قد وفر أفضل تجربة خدمة زبائن قد رأيتها في الكويت!"},"name":{"en":"Ahmad Salamah","ar":"إيمان الرشيد"},"role":{"en":"Deputy General Manager","ar":"نائب المدير العام"},"businessName":{"en":"The Proteges","ar":"ذا بروتيجز"}}]},{"product":"sell","title":{"en":"Our Community","ar":"مجتمعنا"},"testimonials":[{"testimonialImage":"https://www.tap.company//websiteImages/testimonials/bilbayt.jpg","qoute":{"en":"Tap has truly enabled Bilbayt.com to serve it’s customer base effectively while also delivering the excellent user experience and interface we were searching for.","ar":"لقد مكنت تاپ Bilbayt.com من خدمة عملائها بشكل فعال، كما تقدم أيضا تجربة ممتازة وواجهة مستخدم كنا نسعى لها"},"name":{"en":"Ahmad Salamah","ar":"أحمد سلامة"},"role":{"en":"Co-founder & CEO","ar":"المؤسس المشارك والرئيس التنفيذي"},"businessName":{"en":"Bilbayt.com","ar":"بالبيت"}},{"testimonialImage":"https://www.tap.company//websiteImages/testimonials/nuqat.jpg","qoute":{"en":"Tap has untapped the potential of our website through a well streamlined payment process!","ar":"تاپ قد أطلقت إمكانات موقعنا عن طريق تبسيط عملية الدفع!"},"name":{"en":"Hussa Al Humaidhi","ar":"حصة الحميضي"},"role":{"en":"Founding Member","ar":"عضو مؤسس"},"businessName":{"en":"Nuqat","ar":"نقاط"}},{"testimonialImage":"https://www.tap.company//websiteImages/testimonials/opensouq.jpg","qoute":{"en":"We at OpenSooq.com are very happy with Tap, it proved to be a very reliable payment partner for us and our users love it!","ar":"نحن في OpenSooq.com سعيدون جداً بتاپ، لقد أثبتت أنها شركة جديرة بالثقة لنا ولعملائنا"},"name":{"en":"Anas Elayyan","ar":"أنس العليان"},"role":{"en":"Head of Business Development","ar":"رئيس تطوير الأعمال"},"businessName":{"en":"OpenSooq.com","ar":"السوق المفتوح"}},{"testimonialImage":"https://www.tap.company//websiteImages/testimonials/sirdablab.jpg","qoute":{"en":"Tap is the most convenient way to accept payment via email or SMS.","ar":"تاپ أنسب طريقة نستقبل فيها المدفوعات عن طريق الإيميل أو الرسائل القصيرة."},"name":{"en":"Haider Almosawi","ar":"حيدر الموسوي"},"role":{"en":"CEO & Co-founder","ar":"رئيس مجلس الإدارة والمؤسس"},"businessName":{"en":"Sirdab Lab","ar":"سرداب لاب"}}]},{"product":"tap","title":{"en":"Our Community","ar":"مجتمعنا"},"testimonials":[{"testimonialImage":"https://www.tap.company//websiteImages/testimonials/bilbayt.jpg","qoute":{"en":"Tap has truly enabled Bilbayt.com to serve it’s customer base effectively while also delivering the excellent user experience and interface we were searching for.","ar":"لقد مكنت تاپ Bilbayt.com من خدمة عملائها بشكل فعال، كما تقدم أيضا تجربة ممتازة وواجهة مستخدم كنا نسعى لها"},"name":{"en":"Ahmad Salamah","ar":"أحمد سلامة"},"role":{"en":"Co-founder & CEO","ar":"المؤسس المشارك والرئيس التنفيذي"},"businessName":{"en":"Bilbayt.com","ar":"بالبيت"}},{"testimonialImage":"https://www.tap.company//websiteImages/testimonials/nuqat.jpg","qoute":{"en":"Tap has untapped the potential of our website through a well streamlined payment process!","ar":"تاپ قد أطلقت إمكانات موقعنا عن طريق تبسيط عملية الدفع!"},"name":{"en":"Hussa Al Humaidhi","ar":"حصة الحميضي"},"role":{"en":"Founding Member","ar":"عضو مؤسس"},"businessName":{"en":"Nuqat","ar":"نقاط"}},{"testimonialImage":"https://www.tap.company//websiteImages/testimonials/opensouq.jpg","qoute":{"en":"We at OpenSooq.com are very happy with Tap, it proved to be a very reliable payment partner for us and our users love it!","ar":"نحن في OpenSooq.com سعيدون جداً بتاپ، لقد أثبتت أنها شركة جديرة بالثقة لنا ولعملائنا"},"name":{"en":"Anas Elayyan","ar":"أنس العليان"},"role":{"en":"Head of Business Development","ar":"رئيس تطوير الأعمال"},"businessName":{"en":"OpenSooq.com","ar":"السوق المفتوح"}},{"testimonialImage":"https://www.tap.company//websiteImages/testimonials/sirdablab.jpg","qoute":{"en":"Tap is the most convenient way to accept payment via email or SMS.","ar":"تاپ أنسب طريقة نستقبل فيها المدفوعات عن طريق الإيميل أو الرسائل القصيرة."},"name":{"en":"Haider Almosawi","ar":"حيدر الموسوي"},"role":{"en":"CEO & Co-founder","ar":"رئيس مجلس الإدارة والمؤسس"},"businessName":{"en":"Sirdab Lab","ar":"سرداب لاب"}}]}]

/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "\n.App{\n\ttext-align: center;\n}\n\nbody,html{\n  scroll-behavior: smooth;\n}\n\nbody {\n  margin: 0;\n  padding: 0;\n  font-family: sans-serif;\n  background-color: #f7f7f7;\n  font-size:  16px;\n  color: #454545;\n  font-weight: 200;\n}\n\ninput:focus, button:focus, select:focus{\n\toutline:0;\n}\n", ""]);

// exports


/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(124);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(2)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!./ar.css", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!./ar.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

var escape = __webpack_require__(16);
exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "@font-face{\n    font-family: \"helvetica-arabic\";\n    src: url(" + escape(__webpack_require__(125)) + "),\n    url(" + escape(__webpack_require__(126)) + ");\n}\n\n*{\n  font-family: 'helvetica-arabic';\n  /* direction: rtl; */\n}\n", ""]);

// exports


/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "fonts/neue-helvetica-arabic-light.ttf";

/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "fonts/neue-helvetica-arabic-light.eot";

/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "@media screen and (max-width: 767px) {\n\n  .bottomCallToAction{\n    width: 100% !important;\n    text-align: center !important;\n  }\n\n  .bottomFeaturedImage{\n    display: none !important\n  }\n\n  .bottomCallToActionStrip{\n    padding: 50px 0 60px 0 !important;\n  }\n}\n", ""]);

// exports


/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "\n\n/* Safari 4.0 - 8.0 */\n@-webkit-keyframes smoothFade {\n    0%   {opacity:0; }\n    100% {opacity:1; }\n}\n\n/* Standard syntax */\n@keyframes smoothFade {\n    0%   {opacity:0; }\n    100% {opacity:1; }\n}\n\n.activatePage{\n  display: flex;\n  flex-direction: column;\n  position: relative;\n  -webkit-animation-name: smoothFade; /* Safari 4.0 - 8.0 */\n  -webkit-animation-duration: 0.3s; /* Safari 4.0 - 8.0 */\n  animation-name: smoothFade;\n  animation-duration: 0.3s;\n}\n\n.activatePageConetent{\n  margin: auto;\n}\n\n.activateProductImage{\n  width: 110px;\n  height: 110px;\n  box-shadow: 0px 0px 250px 30px rgba(255, 255, 255, 0.76);\n  border-radius: 25px;\n}\n\n.activateProductMessage{\n  color: #fff;\n}\n\n.productSquarePlaceHolder{\n  width: 110px;\n  height: 110px;\n  margin: auto;\n  border-radius: 25px;\n  padding: 15px;\n  transition: box-shadow 0.3s ease-in-out;\n  transition-delay: 0.3s;\n  transition-duration: 0.7s;\n}\n\n.productSquarePlaceHolder.productSquarePlaceHolderglow{\n  box-shadow: 0px 0px 250px 30px rgba(255, 255, 255, 0.76);\n}\n\n.myOpacityTransition.myHeightTransition{\n  transition: opacity 0.5s ease-in-out 0.5s, max-height 0.7s ease-in-out;\n  /* transition-duration: 1s; */\n}\n\n/* .myHeightTransition{\n  transition: max-height 0.3s ease-in-out;\n  transition-duration: 0.6s;\n} */\n", ""]);

// exports


/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "\n\n/* Safari 4.0 - 8.0 */\n@-webkit-keyframes smoothFadeIn {\n    0%   {opacity:0; }\n    100% {opacity:1; }\n}\n\n/* Standard syntax */\n@keyframes smoothFadeIn {\n    0%   {opacity:0; }\n    100% {opacity:1; }\n}\n\n.activatePaymentPage{\n  -webkit-animation-name: smoothFadeIn; /* Safari 4.0 - 8.0 */\n  -webkit-animation-duration: 0.3s; /* Safari 4.0 - 8.0 */\n  animation-name: smoothFadeIn;\n  animation-duration: 0.3s;\n  position: relative;\n  display: flex;\n  flex-direction: column;\n}\n\n.activatePaymentPageBackground{\n  position: absolute;\n  height: 100%;\n  width: 100%;\n  -webkit-transition: opacity 3s ease-out;\n  -moz-transition: opacity 3s ease-out;\n  -o-transition: opacity 3s ease-out;\n  transition: opacity 3s ease-out;\n  display: flex;\n  flex-direction: column;\n}\n\n.activatePaymentPageConetent{\n  margin: auto;\n  z-index: 9;\n}\n\n.activatePaymentImage{\n  width: 110px;\n  height: 110px;\n  box-shadow: 0px 0px 250px 30px rgba(255, 255, 255, 0.76);\n  border-radius: 25px;\n}\n\n.activatePaymentMessage{\n  color: #fff;\n}\n\n.paymentSquarePlaceHolder{\n  width: 110px;\n  height: 110px;\n  margin: auto;\n  border-radius: 25px;\n  padding: 28px;\n  transition: box-shadow 0.3s ease-in-out;\n  transition-delay: 0.3s;\n  transition-duration: 0.7s;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  -webkit-animation-name: smoothFadeIn; /* Safari 4.0 - 8.0 */\n  -webkit-animation-duration: 0.3s; /* Safari 4.0 - 8.0 */\n  animation-name: smoothFadeIn;\n  animation-duration: 0.3s;\n  background-color: #fff;\n}\n\n.paymentSquarePlaceHolder.paymentSquarePlaceHolderglow{\n  box-shadow: 0px 0px 250px 30px rgba(255, 255, 255, 0.76);\n}\n\n.myOpacityTransition1.myHeightTransition1{\n  transition: opacity 0.5s ease-in-out 0.5s, max-height 0.7s ease-in-out;\n  /* transition-duration: 1s; */\n}\n\n/* .myHeightTransition{\n  transition: max-height 0.3s ease-in-out;\n  transition-duration: 0.6s;\n} */\n", ""]);

// exports


/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

var escape = __webpack_require__(16);
exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "@font-face{\n    font-family: 'circe';\n    src: url(" + escape(__webpack_require__(60)) + "),\n    url(" + escape(__webpack_require__(60)) + ");\n}\n\n.notFound{\n  display: flex;\n  flex-direction: row;\n  justify-content: center;\n  height: -webkit-fill-available;\n  align-items: center;\n}\n\n.notFoundContent{\n}\n\n.notFoundTitle{\n  font-size: 120px;\n  font-family: 'circe'\n}\n\n.notFoundImage{\n  width: 420px;\n}\n\n.notFoundParagraph{\n  font-size: 25px;\n  font-family: 'circe'\n}\n", ""]);

// exports


/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, ".tapFeatureIconDiv\n{\n  display: inline-block;\n  width: 250px;\n}\n\n.tapFeatureParagraph\n{\n  display: inline-block;\n  width: calc(100% - 250px);\n}\n\n.tapFeatureIcon\n{\n  vertical-align: top;\n  width: 60px;\n  height: 60px;\n}\n\n.tapFeatureTitle\n{\n  margin: 10px 20px;\n}\n\n.tapFeatureIcon,.tapFeatureTitle\n{\n  display: inline-block;\n  float: left;\n}\n\n.tapFeatureParagraphWithIcon{\n  text-align: left;\n}\n\n[dir=rtl] .tapFeatureParagraphWithIcon{\n  text-align: right;\n}\n\n[dir=rtl] .tapFeatureIcon,[dir=rtl] .tapFeatureTitle\n{\n  float: right;\n}\n\n.tapFeatureSubtitleLink{\n  -webkit-transition: 300ms;\n  -moz-transition: 300ms;\n  -o-transition: 300ms;\n  transition: 300ms;\n}\n\n.tapFeatureLink{\n  -webkit-transition: 300ms;\n  -moz-transition: 300ms;\n  -o-transition: 300ms;\n  transition: 300ms;\n}\n\n.tapFeatureLink:hover{\n  color: #000;\n  text-decoration: underline;\n}\n\n@media screen and (max-width: 767px) {\n  .tapFeatureIconDiv,.tapFeatureParagraph\n  {\n    width: 100%;\n  }\n  .tapFeatureParagraph{\n    margin-top: 10px;\n  }\n}\n", ""]);

// exports


/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

var escape = __webpack_require__(16);
exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "@font-face{\n    font-family: 'neue-helvetica-ar';\n    src: url(" + escape(__webpack_require__(63)) + "),\n    url(" + escape(__webpack_require__(63)) + ");\n}\n\n.footer{\n\tbackground-color: lightgray !important;\n\toverflow: hidden;\n}\n\n.leftSide{\n\tfloat: left;\n\ttext-align: left;\n\tdisplay: inline-block;\n}\n\n.menusSide{\n\twidth: 69%;\n}\n\n.imagesSide{\n\twidth: 31%;\n}\n\n.rightSide{\n\tfloat: right;\n\ttext-align: right;\n\tdisplay: inline-block;\n}\n\n.footerMenu{\n    display: inline-block;\n    vertical-align: top;\n    width: 33.33%;\n}\n\n.footerMenuTitle{\n\tfont-size: 12px;\n\tcursor: default;\n}\n\n.footerMenuItems{\n\tpadding: 0;\n\tlist-style-type: none;\n\tfont-size: 11px;\n\tmargin-bottom: 30px;\n\t-webkit-transition: max-height 1s;\n\t-moz-transition: max-height 1s;\n\ttransition: max-height 1s;\n}\n\n.footerLink{\n\tcolor: inherit;\n}\n\n.footerLink:hover{\n\ttext-decoration:  none;\n\tcolor: inherit;\n\topacity: 0.5;\n}\n\n.footerImage{\n\twidth: auto;\n}\n\n.appsStores{\n\theight:37px;\n}\n\n.paymnetMethods{\n\theight: 32px;\n}\n\n.securityMethods{\n\theight: 25px;\n}\n\n.footerFirstSection{\n\toverflow: hidden;\n\tpadding-top: 60px;\n\tpadding-bottom: 30px;\n}\n\n.footerSecondSection{\n    border-top: 1px solid #b5b5b5;\n    padding: 35px 0;\n    overflow: hidden;\n    font-size: 12px;\n}\n\n.socialMediaLink{\n\tfont-size: initial;\n}\n\n.iconSpace {\n    display: inline-block;\n    width: 10px;\n}\n\n.languageSwitcher,.countrySwitcher{\n\tmargin-left: 10px;\n\tmargin-right: 10px;\n}\n\n.languageSwitcher>.footerLink{\n\tfont-family: 'neue-helvetica-ar';\n}\n\n.secondFooterItem{\n\n}\n\n.textSpace{\n\tdisplay: inline-block;\n\twidth: 15px;\n}\n\n.languageSwitcher,.socialMedia,.countrySwitcher{\n\tdisplay: inline-block;\n}\n\n.choice{\n\tcursor: pointer;\n\tfont-size: 13px;\n}\n\n.dropdown-menu {\n    padding: 10px;\n    left: -10px !important;\n}\n\n.countryList {\n    background-color: #fff;\n    padding: 10px;\n    text-align: initial;\n    border-radius: 3px;\n    border: 1px solid #cccccc;\n    position: absolute;\n    margin-left: -10px;\n    margin-right: -10px;\n    margin-top: -244px;\n    -webkit-transition: opacity 200ms;\n    -moz-transition: opacity 200ms;\n    -o-transition: opacity 200ms;\n    transition: opacity 200ms;\n}\n\n.countryList.openList {\n\topacity: 1;\n\tpointer-events: auto;\n}\n\n.countryList.closeList {\n\topacity: 0;\n\tpointer-events: none;\n}\n\n.countryListItems{\n\tpadding-top: 4px;\n\tpadding-bottom: 4px;\n}\n\n.countryFlag{\n\twidth: 17px;\n\theight: auto;\n\tvertical-align: sub;\n}\n\n.flagSpace{\n    display: inline-block;\n    width: 3px;\n}\n\n.MenuTitleIcon{\n\tdisplay: none;\n}\n\n.imageSpace {\n    display: inline-block;\n    width: 15px;\n}\n\n@media screen and (max-width: 1199px) {\n\t.menusSide,.imagesSide{\n\t\twidth: 100%;\n\t\tfloat: none;\n\t\ttext-align: center;\n\t\tdisplay: block;\n\t}\n\t.footerMenu{\n\t\twidth: 100%;\n\t\ttext-align: justify;\n\t\tborder-bottom: 1px solid gray;\n\t}\n\n\t.footerMenuTitle{\n\t\tcursor: pointer;\n\t\tpadding: 8px 0;\n\t}\n\n\t.footerMenuTitle,.footerMenuItems{\n\t\tfont-size: 15px;\n\t}\n\n\t.footerMenuItems{\n\t\tmargin:0;\n\t\tpadding-bottom: 8px;\n\t}\n\t.footerMenuItems>li{\n\t\tline-height: 2;\n\t}\n\t.MenuTitleIcon{\n\t\tdisplay: inline-block;\n\t\twidth: 25px;\n\t\ttext-align: end;\n\t}\n\t.MenuTitleText{\n\t\tdisplay: inline-block;\n\t\twidth: calc(100% - 25px);\n\t}\n\t.footerMenuItems{\n\t\tmax-height: 0;\n\t\toverflow: hidden;\n\t}\n\t.footerMenuItems.active{\n\t\tmax-height: 150px;\n\t}\n\t.menusSide{\n\t\tmargin-bottom: 40px;\n\t}\n\t.footerImage {\n\t    margin-left: 7px;\n\t    margin-right: 7px;\n\t}\n\t.imageSpace {\n\t    display: none;\n\t    width: 0px;\n\t}\n}\n\n@media screen and (max-width: 992px) {\n\t.secondFooterItem{\n\t\tmargin-left: 15px;\n\t\tmargin-right: 15px;\n\t}\n\t.rightSide,.leftSide{\n\t\twidth: 100%;\n\t\tfloat: none;\n\t\ttext-align: center;\n\t\tdisplay: block;\n\t}\n\n\t.languageSwitcher,.socialMedia,.countrySwitcher,.secondFooterItem:nth-of-type(1){\n\t    display: block;\n\t    margin-bottom: 12px;\n\t    margin-left: auto;\n\t    margin-right: auto;\n\t    width: fit-content;\n\t}\n\t.iconSpace,.textSpace {\n\t    display: none;\n\t    width: 0px;\n\t}\n\t.socialMediaLink{\n\t\tmargin-left: 5px;\n\t\tmargin-right: 5px;\n\t}\n}\n\n@media screen and (max-width: 767px) {\n\t.securityMethods {\n\t    height: 23px;\n\t    margin-left: 2px !important;\n\t    margin-right: 2px !important;\n\t}\n}\n", ""]);

// exports


/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "\n.header{\n\toverflow: hidden;\n\tposition: fixed;\n\ttop: 0;\n\tleft: 0;\n\twidth: 100%;\n\tbackground-color: rgba(0, 0, 0, 0.45);\n\tz-index: 99;\n\tcolor: #fff;\n}\n\n.navigationHeader{\n\toverflow: hidden;\n\theight: 85px;\n\t-webkit-transition: 200ms;\n\t-moz-transition: 200ms;\n\t-o-transition: 200ms;\n\ttransition: 200ms;\n}\n\n.navigationHeader.shrinked{\n\theight: 60px;\n}\n\n.center{\n\ttext-align: center;\n\tmargin: 5px 0 5px 0;\n}\n\n.logo{\n\twidth: 46px;\n\theight: 74.55px;\n}\n\n.headerDiv{\n\tdisplay: inline-block;\n\tvertical-align: top;\n}\n\n.headerMenu{\n\tmargin: 24px 0 24px 0;\n\twidth: calc(50% - 23px);\n}\n\n.headerMenu.shrinked{\n\tmargin: 13px 0 13px 0;\n}\n\n.rightMenu{\n\ttext-align: end;\n}\n\n.leftMenu{\n\ttext-align: start;\n}\n\n.menuItem{\n\tdisplay: inline-block;\n/*\tpadding: 0 5.4%;*/\n}\n\n.menuItemSpace{\n\tdisplay: inline-block;\n\twidth: 5.4%;\n}\n\n.activeMenuItem{\n\tbackground-image: url(https://www.tap.company/websiteImages/dot.png);\n\tbackground-repeat: no-repeat;\n\tbackground-size: 60px;\n\tbackground-position: center top 60%;\n\tpadding-bottom: 7px;\n}\n/*.leftMenu>div>.menuItem:nth-of-type(1){\n\t-webkit-padding-start: 0px;\n}\n.leftMenu>div>.menuItem:last-of-type{\n\t-webkit-padding-end: 0px;\n}\n\n\n.rightMenu>div>.menuItem:nth-of-type(1){\n\t-webkit-padding-start: 0px;\n}\n.rightMenu>div>.menuItem:last-of-type{\n\t-webkit-padding-end: 0px;\n}*/\n\n.menuItem > a {\n\tdisplay: inline-block;\n    color: #D8D8D8;\n    text-decoration: none;\n    -webkit-transition: 300ms;\n    -moz-transition: 300ms;\n    -o-transition: 300ms;\n    transition: 300ms;\n}\n\n.mobileIcon{\n\tdisplay: none;\n}\n\n.menuItem > a:hover{\n    opacity: 0.4 !important;\n}\n\n.loginHeader{\n    overflow: hidden;\n\t-webkit-transition: max-height 0.7s;\n\t-moz-transition: max-height 0.7s;\n\ttransition: max-height 0.7s;\n}\n\n.loginHeaderContainer{\n\tpadding: 15px 0;\n    border-bottom: 1px solid rgba(255, 255, 255, 0.5019607843137255);\n}\n\n.loginHeaderSide1,.loginHeaderSide2{\n\tdisplay: inline-block;\n}\n\n.loginHeaderSide1{\n\ttext-align: justify;\n\twidth: 97%;\n}\n\n.loginHeaderSide2{\n\ttext-align: end;\n\twidth: 3%;\n    vertical-align: -webkit-baseline-middle;\n}\n\n.closeLoginHeader{\n\tfont-size: large;\n\tcursor: pointer;\n}\n\n.fieldsSpace{\n\tdisplay: inline-block;\n\twidth: 20px;\n}\n\na.loginLink {\n    color: inherit;\n    vertical-align: -webkit-baseline-middle;\n    line-height: 2.9;\n    color: #D8D8D8;\n    text-decoration: none;\n    -webkit-transition: 300ms;\n    -moz-transition: 300ms;\n    -o-transition: 300ms;\n    transition: 300ms;\n}\n\na.loginLink:hover {\n\topacity: 0.7;\n}\n\n.loginHeader.closed{\n\tmax-height: 0px;\n}\n\n.loginHeader.opened{\n\tmax-height: 100px;\n}\n\n.modal-backdrop.fade.show {\n    z-index: -1;\n}\n\n.modal {\n    position: fixed;\n    color: initial;\n    background-color: #0000003d;\n}\n\n.modal-dialog {\n    top: 35%;\n}\n\n.mobileMenu{\n\tdisplay: none;\n}\n\n@media screen and (max-width: 992px) {\n\t.menuItem{\n/*\t\tpadding: 0 3%;*/\n\t}\n\n\t.menuItemSpace{\n\t\twidth: 3%;\n\t}\n}\n\n@media screen and (max-width: 767px) {\n\t.hiddenOnMobileView{\n\t\tdisplay: none;\n\t}\n\t.loginHeader{\n\t\tdisplay: none;\n\t}\n\t.header{\n\t\theight: 52px !important;\n\t}\n\t.headerMenu{\n\t\tdisplay: none;\n\t}\n\t.lgogDiv{\n\t\tfloat: left;\n\t}\n\t.logo{\n\t\twidth: 40px;\n\t\theight: 64px;\n\t}\n\t.mobileIcon{\n\t\tdisplay: inline-block;\n\t\tfloat: right;\n\t}\n\t.menuIcon{\n\t\tcursor: pointer;\n\t    width: 44px;\n\t    height: auto;\n\t    padding: 9px;\n\t    border: 1px solid #fff;\n\t    border-radius: 4px;\n\t    margin: 3px 0;\n\t}\n\t.mobileMenu {\n\t\ttext-align: justify;\n\t\tdisplay: block;\n\t\toverflow: hidden;\n\t\tmax-height: 0px;\n\t    position: fixed;\n\t    top: 52px;\n\t    left: 0;\n\t    width: 100%;\n\t    border-top: 1px solid #fff3;\n\t    background-color: rgba(0, 0, 0, 0.45);\n\t\t-webkit-transition: max-height 0.5s;\n\t\t-moz-transition: max-height 0.5s;\n\t\ttransition: max-height 0.5s;\n\t\tz-index: 999999999999;\n\t}\n\t.mobileMenu.active {\n\t\tmax-height: 300px;\n\t}\n\t.menuItem{\n\t    display: block;\n\t    padding: 5px 0px;\n\t    text-align: initial;\n\t}\n\t.menuItem:nth-of-type(1){\n\t\tpadding-top: 15px;\n\t}\n\t.menuItem:last-of-type{\n\t\tpadding-bottom: 15px;\n\t}\n\t.hidden-xs{\n\t\tdisplay: none;\n\t}\n\t.menuItemSpace{\n\t\twidth: 0px;\n\t\tdisplay: none;\n\t}\n}\n", ""]);

// exports


/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, ".iframePage{\n      position: absolute;\n      right: 0;\n      top: 0;\n      width: 100%;\n      height: 100%;\n      border: 0;\n}\n", ""]);

// exports


/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, ".loaderImage {\n    width: 80px;\n    height: 80px;\n    margin:  auto;\n}\n\n.loaderContainer {\n    background-color: #fff;\n    opacity: 0.7;\n    height: 100%;\n    width:  100%;\n    top: 0;\n    left:  0;\n    position:  absolute;\n    display: flex;\n    -webkit-transition: 200ms;\n    -moz-transition: 200ms;\n    -o-transition: 200ms;\n    transition: 200ms;\n}\n\n.fadeoutanimation {\n    position: relative;\n    -webkit-animation-name: fadeoutanimation; /* Safari 4.0 - 8.0 */\n    -webkit-animation-duration: 0.5s; /* Safari 4.0 - 8.0 */\n    /* -webkit-animation-delay: 0.4s; */\n    animation-name: fadeoutanimation;\n    animation-duration: 0.5s;\n    /* animation-delay: 0.4s; */\n    /*opacity: 0;*/\n}\n\n/* Safari 4.0 - 8.0 */\n@-webkit-keyframes fadeoutanimation {\n    0%   {opacity:1;}\n    100% {opacity:0;}\n}\n\n/* Standard syntax */\n@keyframes fadeoutanimation {\n    0%   {opacity:1;}\n    100% {opacity:0;}\n}\n\n@media screen and (max-width: 767px) {\n  .loaderImage {\n      width: 60px;\n      height: 60px;\n      margin:  auto;\n  }\n}\n", ""]);

// exports


/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "\n.page {\n\toverflow-x: hidden;\n\toverflow-y: hidden;\n}\n", ""]);

// exports


/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "\n.plans{\n\twidth: 100%;\n\tdisplay: inline-flex;\n}\n\n.FeaturesTitles{\n  background-color: #f1f1f1;\n}\n\n.FeaturesTitles,.plan{\n\tpadding: 15px;\n  border-radius: 3px;\n}\n\n.plan{\n\tbackground: #fff;\n\tdisplay: inline-block;\n  box-shadow: 0px 1px 10px #eaeaea;\n\t-webkit-transition: 0.2s ease-in-out;\n\t-webkit-transition:  0.2s ease-in-out;\n\t-o-transition:  0.2s ease-in-out;\n\ttransition: 0.2s ease-in-out;\n\tcursor: pointer;\n}\n\n.plan:hover{\n\tbox-shadow: 0px 5px 20px #6b5e5e;\n}\n\n.planIcon{\n\twidth: 75%;\n\theight: auto;\n\tmargin: auto;\n}\n\n.featureValue{\n\tmargin: 0;\n\tfont-size: smaller;\n\tcolor: #b7b7b7;\n\tline-height: 1.3;\n}\n\n.featureName{\n\tmargin: 0;\n}\n\n.featureValue.featureSubValue{\n\tfont-size: x-small;\n}\n\n.featureName.subSubFeature{\n\tfont-size: 13px;\n\tfont-style: italic;\n\tcolor: #818181;\n}\n\n.featureName.subFeature{\n\tcolor: #818181;\n}\n\nhr.planFeatureSeperator{\n\tmargin-top: 10px;\n\tmargin-bottom: 10px;\n\tborder-top: 1px solid #ededed;\n}\n\n.featureValueFalse,.featureValueTrue{\n\n}\n\n.featureValueTrue{\n\tcolor: #2ace00;\n}\n\n.invisibleText{\n\topacity: 0;\n\tpointer-events: none;\n}\n\n.featureSubValue{\n\tfont-size: 13px;\n}\n\n.featureName.featureTitle {\n    position: absolute;\n}\n\n.hideThis{\n\topacity: 0;\n\tpointer-events: none;\n}\n\n.planFeature{\n\t-webkit-transition: 0.7s;\n\t-webkit-transition:  0.7s;\n\t-o-transition:  0.7s;\n\ttransition: 0.7s;\n\tmax-height: 100px;\n}\n\n.hiddenPlanFeature{\n\tmax-height: 0;\n\topacity: 0;\n\tpointer-events: none;\n}\n\n.activeSlickSlide{\n\topacity: 1;\n\t-webkit-transition: opacity 1s;\n\ttransition: opacity 0.7s;\n}\n\n.nonActiveSlickSlide{\n\topacity: 0.5;\n\t-webkit-transition: opacity 1s;\n\ttransition: opacity 0.7s;\n}\n\n.slick-track {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    justify-items: center;\n    place-items: center;\n}\n.slick-slide {\n    float: none !important;\n    margin: 5px;\n}\n\n.visible-sm {\n\t\tdisplay: none !important;\n}\n\n.hidden-sm {\n\tdisplay: inline-block !important;\n\t/* width: max-content; */\n}\n\n.recommendedPlan {\n    position: absolute;\n    height: 37px;\n    width: 37px;\n    background-image: url(https://www.tap.company/wp-content/uploads/2018/10/recommended.svg);\n    background-repeat: no-repeat;\n    background-size: contain;\n    transform: rotate(-30deg);\n}\n\np.featureName.mainFeature {\n    font-size: xx-large;\n\t\tmargin-bottom: -5px;\n}\n\n.priceAmount{\n\tfont-size: 22px;\n\tfont-weight: 700;\n}\n.pricePercentage{\n\tfont-size: small;\n\tposition: absolute;\n\tmargin-top: 5px;\n\tfont-weight: 900;\n}\n\nspan.priceAfterSlash {\n    margin-left: 20px;\n\t\tfont-weight: 700;\n\t\tfont-size: 14px;\n}\n\n@media screen and (max-width: 1199px) {\n\t.FeaturesTitles,.plan{\n\t\tpadding: 7px;\n\t}\n}\n\n@media screen and (max-width: 992px) {\n\n\t.planBody {\n\t    height: 300px;\n\t    overflow: auto;\n\t}\n\n\t.visible-sm {\n\t    display: inline-block !important;\n\t}\n\n\t.hidden-sm {\n\t\t\tdisplay: none !important;\n\t}\n\n\t.noPadding{\n\t\t\tpadding: 0 !important;\n\t\t\tmax-width: 100%;\n\t}\n\t.FeaturesTitles,.plan{\n\t\tpadding: 15px;\n\t}\n\t.planIcon{\n\t\twidth: 12%;\n\t\theight: auto;\n\t}\n\t.FeaturesTitles{\n\t\tdisplay: none;\n\t}\n\t.plans{\n\t\tdisplay: block;\n\t}\n\n\t.plan{\n\t\twidth: 100% !important;\n\t\tmargin-bottom: 15px\n\t}\n\t.hideThis{\n\t\topacity: 1;\n\t\t/* pointer-events: auto; */\n\t}\n\t.moreLessButtonContainer{\n\t\tpointer-events: auto;\n\t}\n\t.featureName.featureTitle {\n\t    position: relative;\n\t}\n\t.planFeature{\n\t\tmax-height: 150px;\n\t}\n\t.hiddenPlanFeature{\n\t\tmax-height: 0;\n\t}\n\t.plan:hover{\n  \tbox-shadow: 0px 1px 10px #eaeaea;\n\t}\n}\n", ""]);

// exports


/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(139);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(2)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../node_modules/css-loader/index.js!./plans.css", function() {
			var newContent = require("!!../../../../node_modules/css-loader/index.js!./plans.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "/*\n.plans{\n\twidth: 100%;\n\tpadding: 20px;\n}\n\n.plans{\n\tbox-shadow: 0px 1px 15px lightgrey;\n\tborder-radius: 2px;\n}\n\n.plan{\n\tbackground: #fff;\n\tdisplay: inline-block;\n    padding: 15px;\n    box-shadow: 0px 1px 15px lightgrey;\n    border-radius: 2px;\n}\n\n.plansDivs{\n\tdisplay: inline-flex;\n\twidth: 100%;\n}\n\n.planIcon{\n\twidth: 60%;\n\theight: auto;\n}\n\n.featureValue{\n\tmargin: 0;\n\tfont-size: smaller;\n\tcolor: #b7b7b7;\n\tline-height: 1.3;\n}\n\n.featureName{\n\tmargin: 0;\n}\n\n.featureRow{\n\tborder-top: 1px solid #cfcfcf;\n\twidth: 100%;\n}\n\n.featureValue.featureSubValue{\n\tfont-size: x-small;\n}\n\n.featureName.subSubFeature{\n\tfont-size: smaller;\n\tfont-style: italic;\n\tcolor: #818181;\n}\n\n.featureName.subFeature{\n\tcolor: #818181;\n}\n\nhr.planFeatureSeperator{\n\tmargin-top: 1.7rem;\n\tmargin-bottom: 1.7rem;\n\tborder-top: 1px solid #cfcfcf;\n}\n\n.featureValueFalse,.featureValueTrue{\n\tdisplay: block;\n\tmargin-top: 5px;\n\tfont-size: x-small;\n}\n\n.featureValueTrue{\n\tcolor: #2ace00;\n} */\n\n\n/***********************************************************************************/\n/***********************************************************************************/\n/***********************************************************************************/\n/***********************************************************************************/\n\n\n/* .plans{\n  box-shadow: 0px 1px 15px lightgrey;\n\tborder-radius: 2px;\n  padding: 15px;\n  background-color: #fff;\n}\n\n.plansHeader{\n\n}\n\n.planHeader{\n  display: inline-block;\n}\n\n.planIcon{\n\twidth: 50%;\n\theight: auto;\n}\n\n.featureName{\n\tmargin: 0;\n  background-color: #fff;\n  padding: 5px;\n  position: absolute;\n  margin-top: -20px;\n  left: 0;\n  right: 0;\n  margin-left: auto;\n  margin-right: auto;\n  width: max-content;\n}\n\n.featureNamewithSeperator{\n  position: absolute;\n  left: 0;\n  right: 0;\n  margin-left: auto;\n  margin-right: auto;\n  width: 200px;\n}\n\n.featureValue{\n\tmargin: 0;\n\tfont-size: smaller;\n\tcolor: #b7b7b7;\n\tline-height: 1.3;\n}\n\n\n.featureName.subSubFeature{\n\tfont-size: smaller;\n\tfont-style: italic;\n\tcolor: #818181;\n}\n\n.plansflexContainer{\n  width: 100%;\n  display: inline-flex;\n}\n\n.featureValueFalse,.featureValueTrue{\n\tdisplay: block;\n\tmargin-top: 5px;\n\tfont-size: x-small;\n}\n\n.featureValueTrue{\n\tcolor: #2ace00;\n}\n\n.featureValue.featureSubValue{\n\tfont-size: x-small;\n}\n\n.featureName.subSubFeature{\n\tfont-size: smaller;\n\tfont-style: italic;\n\tcolor: #818181;\n}\n\n.featureName.subFeature{\n\tcolor: #818181;\n}\n\nhr.planFeatureSeperator{\n\tmargin-top: 0.1rem;\n\tmargin-bottom: 0.1rem;\n\tborder-top: 1px solid #ececec;\n} */\n", ""]);

// exports


/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, ".visible-xs{\n  display: none;\n}\n\n@media screen and (max-width: 767px) {\n  .hidden-xs{\n      display: none;\n  }\n  .visible-xs{\n    display: flex;\n  }\n}\n", ""]);

// exports


/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, ".sendEmailFrom{\n  position: relative;\n}\n\n.sendEmailFromForm{\n  /* position: absolute; */\n}\n\n.formSentSuccesfully{\n  position: absolute;\n  top: 0;\n  width: 100%;\n  height: 100%;\n  display: flex;\n  display: flex;\n  align-items: center;\n  justify-items: center;\n  place-items: center;\n  flex-direction: row;\n}\n\n.formSentSuccesfullyContent {\n    width: 100%;\n    height: min-content;\n}\n\n.formSentSuccesfullyImage{\n  width: 80px;\n}\n\n.formSentSuccesfullyMessage{\n\n}\n\n.formSentSuccesfullySubMessage{\n\n}\n\n.opacityTransition{\n  -webkit-transition: opacity 0.3s;\n\t-moz-transition: opacity 0.3s;\n\ttransition: opacity 0.3s;\n}\n\n.shownDiv{\n  opacity: 1;\n  transition-delay: 0.5s;\n}\n\n.hidenDiv{\n  opacity: 0;\n  pointer-events: none;\n}\n", ""]);

// exports


/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, ".hidden-xs{\n\tflex-direction: column;\n\tdisplay: inline-flex !important;\n\twidth: 100%;\n\t/* align-items: center; */\n}\n\n.hidden-sm{\n\tdisplay: inline-block !important;\n}\n\n.visible-sm,.visible-xs{\n    display: none !important;\n}\n\n.tapAddress{\n  position: absolute;\n  margin: 50px;\n  z-index: 9;\n}\n\n.tapAddressBlock{\n  padding: 17px 30px;\n  border-radius: 5px;\n  background-color: #fff;\n  box-shadow: 0px 1px 5px #e4e4e4;\n}\n\n.tapAdressText,.tapAddressIcon{\n  display: inline-block;\n  vertical-align: top;\n}\n\n.tapAddressIcon{\n  height: 15px;\n  width: 15px;\n  background-size: cover;\n  background-repeat: no-repeat;\n  margin-top: 4px;\n}\n\n.tapAdressDetailsIcon{\n  background-image: url(https://image.flaticon.com/icons/svg/484/484167.svg);\n}\n\n.tapAdressPhoneNumberIcon{\n  background-image: url(https://image.flaticon.com/icons/svg/17/17216.svg);\n}\n\n.tapAdressTitle,.tapAdressDetails,.tapAdressPhoneNumber{\n  /* padding: 0 50px; */\n  text-align: justify;\n}\n\n.tapAddressBlockWithButton{\n    width: 460px;\n}\n\n.tapAddressCountrySwitcher,.tapAddressBlockWithButton{\n  display: inline-block;\n}\n\n.tapAddressCountrySwitcher{\n  width: 46px;\n  vertical-align: top;\n\n}\n.tapAddressCountry{\n  background-color: #fff;\n  width: 46px;\n  height: 46px;\n  vertical-align: top;\n  box-shadow: 0px 1px 5px #e4e4e4;\n  border-radius: 3px;\n  background-size: 20px;\n  background-repeat: no-repeat;\n  background-position: center;\n}\n\n@media screen and (max-width: 992px) {\n\t.hidden-sm{\n\t\tdisplay: none !important;\n\t}\n\t.visible-sm{\n\t    display: inline-block !important;\n\t}\n}\n\n@media screen and (max-width: 767px) {\n  .hidden-xs{\n\t\tdisplay: none !important;\n\t}\n\t.visible-xs{\n\t\t  flex-direction: column;\n\t    display: inline-flex !important;\n\t\t\twidth: 100%;\n\t\t\talign-items: center;\n\t}\n  .tapAddress{\n    margin: 0px;\n    width: 100%;\n    bottom: 0;\n    background-color: #fff;\n  }\n  .tapAddressCountrySwitcher{\n    display: none;\n  }\n  .tapAddressBlockWithButton{\n      width: 100%;\n      /* padding-bottom: 15px; */\n  }\n  .tapAddressBlock{\n    padding: 30px 30px;\n    border-radius: 0px;\n    box-shadow: none;\n  }\n}\n", ""]);

// exports


/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, ".readMoreLink{\n  color: #0066cc;\n  -webkit-transition: color 0.4s ease-in-out;\n\t-webkit-transition:  color 0.4s ease-in-out;\n\t-o-transition:  color 0.4s ease-in-out;\n\ttransition: color 0.4s ease-in-out;\n  font-size: small;\n}\n\n.readMoreLink:hover{\n  text-decoration: underline;\n  color: #000000;\n}\n", ""]);

// exports


/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(145);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(2)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../node_modules/css-loader/index.js!./tabTabs.css", function() {
			var newContent = require("!!../../../../node_modules/css-loader/index.js!./tabTabs.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "\n\n.taptabs{\n    width: 100%;\n}\n", ""]);

// exports


/***/ }),
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, ".tapTextArea{\n  background-color: #fff;\n  border-radius: 5px;\n  border: none;\n  width: 240px;\n  height: 150px;\n  padding: 10px 15px;\n}\n", ""]);

// exports


/***/ }),
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, ".teamMembers{\n  /* display: flex;\n  flex-direction: row; */\n}\n\n.teamMember{\n  width: calc(33.33%);\n  height: auto;\n  display: inline-flex;\n  text-align: center;\n  /* -webkit-transition: 400ms;\n  -moz-transition: 400ms;\n  -o-transition: 400ms;\n  transition: 400ms; */\n}\n\n.teamMemberContainer{\n  text-align: center;\n  margin: auto;\n  padding: 40px;\n  border-radius: 10px;\n  -webkit-transition: 400ms;\n  -moz-transition: 400ms;\n  -o-transition: 400ms;\n  transition: 400ms;\n}\n\n.teamMemberContainer:hover{\n  background-color: #fff;\n  box-shadow: 0px 0px 10px #ccc;\n}\n\n.teamMemberImage{\n  width: 170px;\n  height: 170px;\n  background-size: cover;\n  margin: auto;\n  -webkit-transition: 400ms;\n  -moz-transition: 400ms;\n  -o-transition: 400ms;\n  transition: 400ms;\n}\n\n@media screen and (max-width: 992px) {\n  .teamMember{\n    width: 50%;\n  }\n}\n\n@media screen and (max-width: 767px) {\n  .teamMember{\n    width: 100%;\n  }\n}\n", ""]);

// exports


/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(149);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(2)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!./en.css", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!./en.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

var escape = __webpack_require__(16);
exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "@font-face{\n    font-family: \"Muli-ExtraLight\";\n    src: url(" + escape(__webpack_require__(150)) + "),\n    url(" + escape(__webpack_require__(151)) + "); \n}\n\n@font-face{\n    font-family: \"Muli-Light\";\n    src: url(" + escape(__webpack_require__(152)) + "),\n    url(" + escape(__webpack_require__(153)) + ");\n}\n\n*{\n  font-family: 'Muli-ExtraLight';\n}\n\nb{\n  font-family: 'Muli-Light','Muli-ExtraLight';\t\n}", ""]);

// exports


/***/ }),
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "fonts/Muli-ExtraLight.ttf";

/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "fonts/Muli-ExtraLight.eot";

/***/ }),
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "fonts/Muli-Light.ttf";

/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "fonts/Muli-Light.eot";

/***/ }),
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "\n.fade {\n    position: relative;\n    -webkit-animation-name: fade; /* Safari 4.0 - 8.0 */\n    -webkit-animation-duration: 0.3s; /* Safari 4.0 - 8.0 */\n    animation-name: fade;\n    animation-duration: 0.3s;\n}\n\n/* Safari 4.0 - 8.0 */\n@-webkit-keyframes fade {\n    0%   {opacity:0; }\n    100% {opacity:1; }\n}\n\n/* Standard syntax */\n@keyframes fade {\n    0%   {opacity:0; }\n    100% {opacity:1; }\n}\n\n\n", ""]);

// exports


/***/ }),
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "\n.appearFromRight {\n    position: relative;\n    -webkit-animation-name: left; /* Safari 4.0 - 8.0 */\n    -webkit-animation-duration: 1.5s; /* Safari 4.0 - 8.0 */\n    animation-name: left;\n    animation-duration: 1.5s;\n}\n\n/* Safari 4.0 - 8.0 */\n@-webkit-keyframes left  {\n    0%   {opacity:0; left:100px; } \n    50%   { left:-10px; } \n    100% {opacity:1;  left:0px; }\n}\n\n/* Standard syntax */\n@keyframes left  {\n    0%   {opacity:0; left:100px; }\n    50%   { left:-10px; } \n    100% {opacity:1;  left:0px; }\n}\n\n/*********************************************************************/\n\n.appearFromLeft {\n    position: relative;\n    -webkit-animation-name: right; /* Safari 4.0 - 8.0 */\n    -webkit-animation-duration: 1.5s; /* Safari 4.0 - 8.0 */\n    animation-name: right;\n    animation-duration: 1.5s;\n}\n\n/* Safari 4.0 - 8.0 */\n@-webkit-keyframes right {\n    0%   {opacity:0; right: 100px; }\n    50%   { right :-10px; } \n    100% {opacity:1;  right: 0px; }\n}\n\n/* Standard syntax */\n@keyframes right  {\n    0%   {opacity:0; right: 100px; }\n    50%   { right :-10px; }\n    100% {opacity:1;  right : 0px; }\n}", ""]);

// exports


/***/ }),
/* 156 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "\n.shortFromRight {\n    position: relative;\n    -webkit-animation-name: shortFromRight; /* Safari 4.0 - 8.0 */\n    -webkit-animation-duration: 1.5s; /* Safari 4.0 - 8.0 */\n    animation-name: shortFromRight;\n    animation-duration: 1.5s;\n}\n\n/* Safari 4.0 - 8.0 */\n@-webkit-keyframes shortFromRight  {\n    0%   {opacity:0; left:100px; } \n    50%   {opacity:0;} \n    100% {opacity:1;  left:0px; }\n}\n\n/* Standard syntax */\n@keyframes shortFromRight  {\n    0%   {opacity:0; left:100px; }\n    50%   {opacity:0;} \n    100% {opacity:1;  left:0px; }\n}\n\n/*********************************************************************/\n\n.shortFromLeft {\n    position: relative;\n    -webkit-animation-name: shortFromLeft; /* Safari 4.0 - 8.0 */\n    -webkit-animation-duration: 1.5s; /* Safari 4.0 - 8.0 */\n    animation-name: shortFromLeft;\n    animation-duration: 1.5s;\n}\n\n/* Safari 4.0 - 8.0 */\n@-webkit-keyframes shortFromLeft {\n    0%   {opacity:0; right: 100px; }\n    50%   {opacity:0;} \n    100% {opacity:1;  right: 0px; }\n}\n\n/* Standard syntax */\n@keyframes shortFromLeft  {\n    0%   {opacity:0; right: 100px; }\n    50%   {opacity:0;}\n    100% {opacity:1;  right : 0px; }\n}", ""]);

// exports


/***/ }),
/* 157 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "\n.appearFromTop {\n    position: relative;\n    -webkit-animation-name: bottom; /* Safari 4.0 - 8.0 */\n    -webkit-animation-duration: 2s; /* Safari 4.0 - 8.0 */\n    animation-name: bottom;\n    animation-duration: 2s;\n}\n\n/* Safari 4.0 - 8.0 */\n@-webkit-keyframes bottom  {\n    0%   {opacity:0; bottom:100px; } \n    100% {opacity:1;  bottom:0px; }\n}\n\n/* Standard syntax */\n@keyframes bottom  {\n    0%   {opacity:0; bottom:100px; }\n    100% {opacity:1;  bottom:0px; }\n}\n\n/*********************************************************************/\n\n.appearFromBottom {\n    position: relative;\n    -webkit-animation-name: top; /* Safari 4.0 - 8.0 */\n    -webkit-animation-duration: 2s; /* Safari 4.0 - 8.0 */\n    animation-name: top;\n    animation-duration: 2s;\n}\n\n/* Safari 4.0 - 8.0 */\n@-webkit-keyframes top {\n    0%   {opacity:0; top: 100px; }\n    100% {opacity:1;  top: 0px; }\n}\n\n/* Standard syntax */\n@keyframes top  {\n    0%   {opacity:0; top: 100px; }\n    100% {opacity:1;  top : 0px; }\n}", ""]);

// exports


/***/ }),
/* 158 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _mobxReact = __webpack_require__(7);

var _Plan = __webpack_require__(159);

var _Plan2 = _interopRequireDefault(_Plan);

var _reactSlick = __webpack_require__(45);

var _reactSlick2 = _interopRequireDefault(_reactSlick);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Plans = function (_Component) {
  _inherits(Plans, _Component);

  function Plans(props) {
    _classCallCheck(this, Plans);

    var _this = _possibleConstructorReturn(this, (Plans.__proto__ || Object.getPrototypeOf(Plans)).call(this, props));

    _this.state = {
      newIndex: 0
    };
    return _this;
  }

  _createClass(Plans, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      __webpack_require__(68);
    }
  }, {
    key: 'changeActiveStyle',
    value: function changeActiveStyle(newIndex) {
      this.setState({
        newIndex: newIndex
      });
    }
  }, {
    key: 'plansComposer',
    value: function plansComposer(plans, planFeatures, showLessButtonText, showMoreButtonText, planPricing, subscribeButtonText, color, mobileView) {
      return _react2.default.createElement(
        _react2.default.Fragment,
        null,
        plans.map(function (plan, key) {
          return _react2.default.createElement(
            _react2.default.Fragment,
            { key: key },
            key === plans.length || mobileView ? null : _react2.default.createElement('div', { style: { width: '15px' } }),
            _react2.default.createElement(_Plan2.default, {
              key: key,
              plan: plan,
              planFeatures: planFeatures,
              width: 1 / (plans.length + 1) * 100 + '%',
              display: 'values',
              showLessButtonText: showLessButtonText,
              showMoreButtonText: showMoreButtonText,
              subscribeButtonText: subscribeButtonText,
              planPricing: planPricing,
              color: color
            })
          );
        })
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: '50px',
        beforeChange: function beforeChange(oldIndex, newIndex) {
          _this2.changeActiveStyle(newIndex);
        }
      };
      var plans = this.props.plans.plans;
      var planFeatures = this.props.plans.planFeatures;
      var showLessButtonText = this.props.plans.showLessButtonText;
      var showMoreButtonText = this.props.plans.showMoreButtonText;
      var planPricing = this.props.plans.planPricing;
      var subscribeButtonText = this.props.plans.subscribeButtonText;
      var color = this.props.preferencesStore.getProduct(this.props.product).brandingColor;
      return _react2.default.createElement(
        _react2.default.Fragment,
        null,
        _react2.default.createElement(
          'div',
          { className: 'container hidden-sm' },
          _react2.default.createElement(
            'div',
            { className: 'plans' },
            _react2.default.createElement(
              _react2.default.Fragment,
              null,
              _react2.default.createElement(_Plan2.default, {
                plan: plans[0],
                planFeatures: planFeatures,
                width: 1 / (plans.length + 1) * 100 + '%',
                display: 'titles',
                showLessButtonText: showLessButtonText,
                showMoreButtonText: showMoreButtonText,
                subscribeButtonText: subscribeButtonText,
                planPricing: planPricing,
                color: color
              })
            ),
            this.plansComposer(plans, planFeatures, showLessButtonText, showMoreButtonText, planPricing, subscribeButtonText, color, false)
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'container visible-sm noPadding' },
          _react2.default.createElement(
            _reactSlick2.default,
            settings,
            plans.map(function (plan, key) {
              return _react2.default.createElement(
                'div',
                { key: key, className: _this2.state.newIndex === key ? 'activeSlickSlide' : 'nonActiveSlickSlide' },
                _react2.default.createElement(_Plan2.default, {
                  key: key,
                  plan: plan,
                  planFeatures: planFeatures,
                  width: 1 / (plans.length + 1) * 100 + '%',
                  display: 'values',
                  showLessButtonText: showLessButtonText,
                  showMoreButtonText: showMoreButtonText,
                  planPricing: planPricing,
                  color: color
                })
              );
            })
          )
        )
      );
    }
  }]);

  return Plans;
}(_react.Component);

exports.default = (0, _mobxReact.observer)(Plans);

/***/ }),
/* 159 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _PlanFeature = __webpack_require__(160);

var _PlanFeature2 = _interopRequireDefault(_PlanFeature);

var _TapButton = __webpack_require__(6);

var _TapButton2 = _interopRequireDefault(_TapButton);

var _LightBox = __webpack_require__(12);

var _LightBox2 = _interopRequireDefault(_LightBox);

var _Img = __webpack_require__(3);

var _Img2 = _interopRequireDefault(_Img);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// import {observer} from 'mobx-react';


var Plan = function (_Component) {
  _inherits(Plan, _Component);

  function Plan(props) {
    _classCallCheck(this, Plan);

    var _this = _possibleConstructorReturn(this, (Plan.__proto__ || Object.getPrototypeOf(Plan)).call(this, props));

    _this.state = {
      currentPlan: {}
    };
    _this.handleOutsideClick = _this.handleOutsideClick.bind(_this);
    // this.handleScroll = this.handleScroll.bind(this);
    return _this;
  }

  _createClass(Plan, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      document.addEventListener('click', this.handleOutsideClick, false);
      // document.getElementById('planBody').addEventListener('scroll', this.handleScroll, false);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      document.removeEventListener('click', this.handleOutsideClick, false);
      // document.getElementById('planBody').removeEventListener('scroll', this.handleScroll, false);
    }
  }, {
    key: 'handleOutsideClick',
    value: function handleOutsideClick(e) {
      if (e.target.className.indexOf('openLightBox') > -1 && e.target.className.indexOf(this.props.id) > -1) {}
    }
  }, {
    key: 'handleScroll',
    value: function handleScroll(e) {
      var scrollTop = e.target.scrollTop;
      var elems = document.getElementsByClassName('planBody');
      for (var i = 0; i < elems.length; i++) {
        elems[i].scrollTop = scrollTop;
      }
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {}
  }, {
    key: 'includebreaks',
    value: function includebreaks(text) {
      return text.split("\n").map(function (text, key) {
        return _react2.default.createElement(
          'span',
          { key: key },
          text,
          _react2.default.createElement('br', null)
        );
      });
    }
  }, {
    key: 'planPriceFormat',
    value: function planPriceFormat(text) {
      var amount = text.indexOf('.') > -1 ? text.substring(0, text.indexOf('.')) : text;
      var percentage = text.indexOf('.') > -1 ? text.substring(text.indexOf('.'), text.indexOf('.') + 3) : '';
      var afterSlash = text.indexOf('/') > -1 ? text.substring(text.indexOf('/'), text.length) : '';
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'span',
          { className: 'priceAmount' },
          amount
        ),
        percentage === '' ? _react2.default.createElement('span', null) : _react2.default.createElement(
          'span',
          { className: 'pricePercentage' },
          percentage
        ),
        afterSlash === '' ? _react2.default.createElement('span', null) : _react2.default.createElement(
          'span',
          { className: 'priceAfterSlash' },
          afterSlash
        )
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var plan = this.props.plan;
      var showMoreButtonText = this.props.showMoreButtonText;
      var showLessButtonText = this.props.showLessButtonText;
      var planPricing = this.props.planPricing.filter(function (price) {
        return price.priceType === 'monthly';
      })[0];
      var subscribeButtonText = this.props.subscribeButtonText;
      var color = this.props.color;
      return _react2.default.createElement(
        'div',
        { className: this.props.display === 'values' ? 'plan' : 'FeaturesTitles', style: { width: this.props.width } },
        _react2.default.createElement(
          'div',
          { className: this.props.display === 'values' ? 'planHeader' : 'hideThis' },
          _react2.default.createElement(_Img2.default, { className: 'planIcon hidden-xs', src: this.props.plan.planIcon, style: { backgroundColor: color } }),
          _react2.default.createElement('div', { style: { height: '15px' } }),
          _react2.default.createElement(
            'h2',
            { className: 'priceAmount', style: { margin: '0' } },
            this.props.plan.planName
          ),
          _react2.default.createElement('hr', { className: 'planFeatureSeperator' }),
          _react2.default.createElement('div', { style: { height: '10px' } }),
          this.planPriceFormat(planPricing.PriceTitle[plan.planName]),
          _react2.default.createElement('div', { style: { height: '15px' } }),
          _react2.default.createElement(_TapButton2.default, {
            type: 'button',
            style: { width: '90%' },
            shape: 'bordered colored',
            color: '#146ebd',
            className: 'openLightBox planLightBox',
            text: subscribeButtonText
          }),
          _react2.default.createElement('div', { style: { height: '15px' } }),
          _react2.default.createElement('hr', { className: 'planFeatureSeperator' })
        ),
        _react2.default.createElement(
          'div',
          { className: 'planBody', onScroll: function onScroll(e) {
              _this2.handleScroll(e);
            } },
          this.props.planFeatures.map(function (planFeature, key) {
            return _react2.default.createElement(_PlanFeature2.default, {
              key: key,
              theKey: key,
              planFeature: planFeature,
              plan: _this2.props.plan,
              display: _this2.props.display,
              showLessButtonText: showLessButtonText,
              showMoreButtonText: showMoreButtonText
            });
          }),
          _react2.default.createElement(
            'div',
            { className: this.props.display === 'titles' ? 'hideThis' : 'hidden-sm', style: { width: '100%' } },
            _react2.default.createElement('hr', { className: 'planFeatureSeperator' }),
            _react2.default.createElement('div', { style: { height: '10px' } }),
            _react2.default.createElement(_TapButton2.default, {
              type: 'button',
              style: { width: '90%' },
              shape: 'bordered colored',
              color: '#146ebd',
              text: subscribeButtonText
            }),
            _react2.default.createElement('div', { style: { height: '10px' } })
          )
        )
      );
    }
  }]);

  return Plan;
}(_react.Component);

exports.default = Plan;

/***/ }),
/* 160 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _TapLink = __webpack_require__(161);

var _TapLink2 = _interopRequireDefault(_TapLink);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// import TapButton from '../../components/TapButton/TapButton.js';


var PlanFeature = function (_Component) {
  _inherits(PlanFeature, _Component);

  function PlanFeature(props) {
    _classCallCheck(this, PlanFeature);

    var _this = _possibleConstructorReturn(this, (PlanFeature.__proto__ || Object.getPrototypeOf(PlanFeature)).call(this, props));

    _this.state = {
      shown: 'hiddenPlanFeature',
      buttonText: _this.props.showMoreButtonText
      // fontAwesomeIcon: <i class="fas fa-angle-down"></i>
    };
    _this.handleOutsideClick = _this.handleOutsideClick.bind(_this);
    return _this;
  }

  _createClass(PlanFeature, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      document.addEventListener('click', this.handleOutsideClick, false);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      document.removeEventListener('click', this.handleOutsideClick, false);
    }
  }, {
    key: 'handleOutsideClick',
    value: function handleOutsideClick(e) {
      if (e.target.id.indexOf(this.props.planFeature.featureName.replace(/\s/g, '') + 'Feature') > -1) {
        this.openClose();
      }
    }
  }, {
    key: 'openClose',
    value: function openClose() {
      if (this.state.shown === 'hiddenPlanFeature') {
        this.setState({
          shown: '',
          buttonText: this.props.showLessButtonText
          // fontAwesomeIcon: <i class="fas fa-angle-up"></i>
        });
      } else {
        this.setState({
          shown: 'hiddenPlanFeature',
          buttonText: this.props.showMoreButtonText
          // fontAwesomeIcon: <i class="fas fa-angle-down"></i>
        });
      }
    }
  }, {
    key: 'includebreaks',
    value: function includebreaks(text) {
      return text.split("\n").map(function (text, key) {
        return _react2.default.createElement(
          'span',
          { key: key },
          text,
          _react2.default.createElement('br', null)
        );
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var theKey = this.props.theKey;
      var planFeature = this.props.planFeature;
      var numberOfFeaturesShown = 3;
      if (planFeature.subFeatures && planFeature.subFeatures.length === 4) {
        numberOfFeaturesShown = 1;
      }
      return _react2.default.createElement(
        _react2.default.Fragment,
        null,
        theKey === 0 ? null : _react2.default.createElement('hr', { className: 'planFeatureSeperator' }),
        _react2.default.createElement(
          'div',
          { className: this.props.display === 'titles' ? 'displayThis' : 'hideThis' },
          _react2.default.createElement(
            'p',
            { className: 'featureName featureTitle' },
            planFeature.featureName
          )
        ),
        _react2.default.createElement(
          'div',
          { className: this.props.display === 'values' ? 'displayThis' : 'hideThis' },
          planFeature.featureValue[this.props.plan.planName] === '' ? _react2.default.createElement(
            'p',
            { className: 'featureName invisibleText' },
            '........'
          ) : _react2.default.createElement(
            'p',
            { className: planFeature.mainFeature && planFeature.mainFeature === 'true' ? 'featureName mainFeature' : 'featureName' },
            planFeature.featureValue[this.props.plan.planName]
          ),
          planFeature.featureSubValue ? _react2.default.createElement(
            _react2.default.Fragment,
            null,
            planFeature.mainFeature && planFeature.mainFeature === 'true' ? null : _react2.default.createElement('div', { style: { height: '5px' } }),
            planFeature.featureSubValue[this.props.plan.planName] === '' ? _react2.default.createElement(
              'p',
              { className: 'featureName featureSubValue invisibleText' },
              '........'
            ) : _react2.default.createElement(
              'p',
              { className: 'featureName featureSubValue' },
              planFeature.featureSubValue[this.props.plan.planName] === 'true' ? _react2.default.createElement('i', { className: 'fas fa-check featureValueTrue featureSubValue' }) : _react2.default.createElement(
                _react2.default.Fragment,
                null,
                planFeature.featureSubValue[this.props.plan.planName] === 'false' ? '-' : this.includebreaks(planFeature.featureSubValue[this.props.plan.planName])
              )
            )
          ) : null
        ),
        planFeature.subFeatures ? _react2.default.createElement(
          _react2.default.Fragment,
          null,
          planFeature.subFeatures.map(function (subFeature, key) {
            return _react2.default.createElement(
              'div',
              { key: key, className: key >= numberOfFeaturesShown ? _this2.state.shown + ' planFeature' : 'planFeature' },
              _react2.default.createElement(
                _react2.default.Fragment,
                null,
                _react2.default.createElement('div', { style: { height: '10px' } }),
                _react2.default.createElement(
                  'div',
                  { className: _this2.props.display === 'titles' ? 'displayThis' : 'hideThis' },
                  _react2.default.createElement(
                    'p',
                    { className: 'featureName subFeature featureTitle' },
                    subFeature.featureName
                  )
                ),
                _react2.default.createElement(
                  'div',
                  { className: _this2.props.display === 'values' ? 'displayThis' : 'hideThis' },
                  subFeature.featureValue[_this2.props.plan.planName] === '' ? _react2.default.createElement(
                    'p',
                    { className: 'featureName subFeature invisibleText' },
                    '........'
                  ) : _react2.default.createElement(
                    'p',
                    { className: 'featureName subFeature' },
                    subFeature.featureValue[_this2.props.plan.planName] === 'true' ? _react2.default.createElement('i', { className: 'fas fa-check featureValueTrue' }) : _react2.default.createElement(
                      _react2.default.Fragment,
                      null,
                      subFeature.featureValue[_this2.props.plan.planName] === 'false' ? '-' : _this2.includebreaks(subFeature.featureValue[_this2.props.plan.planName])
                    )
                  ),
                  subFeature.featureSubValue ? _react2.default.createElement(
                    _react2.default.Fragment,
                    null,
                    subFeature.featureSubValue[_this2.props.plan.planName] === '' ? _react2.default.createElement(
                      'p',
                      { className: 'featureName featureSubValue invisibleText' },
                      '........'
                    ) : _react2.default.createElement(
                      'p',
                      { className: 'featureName subFeature featureSubValue' },
                      subFeature.featureSubValue[_this2.props.plan.planName] === 'true' ? _react2.default.createElement('i', { className: 'fas fa-check featureValueTrue subFeature featureSubValue' }) : _react2.default.createElement(
                        _react2.default.Fragment,
                        null,
                        subFeature.featureSubValue[_this2.props.plan.planName] === 'false' ? '-' : _this2.includebreaks(subFeature.featureSubValue[_this2.props.plan.planName])
                      )
                    )
                  ) : null
                )
              ),
              _react2.default.createElement(
                _react2.default.Fragment,
                null,
                subFeature.subFeatures ? _react2.default.createElement(
                  _react2.default.Fragment,
                  null,
                  subFeature.subFeatures.map(function (subFeature, key) {
                    return _react2.default.createElement(
                      _react2.default.Fragment,
                      null,
                      _react2.default.createElement('div', { style: { height: '10px' } }),
                      _react2.default.createElement(
                        'div',
                        { className: _this2.props.display === 'titles' ? 'displayThis' : 'hideThis' },
                        _react2.default.createElement(
                          'p',
                          { className: 'featureName subSubFeature featureTitle' },
                          subFeature.featureName
                        )
                      ),
                      _react2.default.createElement(
                        'div',
                        { className: _this2.props.display === 'values' ? 'displayThis' : 'hideThis' },
                        subFeature.featureValue[_this2.props.plan.planName] === '' ? _react2.default.createElement(
                          'p',
                          { className: 'featureName subSubFeature invisibleText' },
                          '........'
                        ) : _react2.default.createElement(
                          'p',
                          { className: 'featureName subSubFeature' },
                          subFeature.featureValue[_this2.props.plan.planName] === 'true' ? _react2.default.createElement('i', { className: 'fas fa-check subSubFeature featureValueTrue' }) : _react2.default.createElement(
                            _react2.default.Fragment,
                            null,
                            subFeature.featureValue[_this2.props.plan.planName] === 'false' ? '-' : _this2.includebreaks(subFeature.featureValue[_this2.props.plan.planName])
                          )
                        )
                      )
                    );
                  })
                ) : null
              )
            );
          })
        ) : null,
        planFeature.subFeatures && planFeature.subFeatures.length - 1 >= numberOfFeaturesShown ? _react2.default.createElement(
          'div',
          { className: this.props.display === 'values' ? 'displayThis moreLessButtonContainer' : 'hideThis moreLessButtonContainer' },
          _react2.default.createElement('div', { style: { height: '10px' } }),
          _react2.default.createElement(_TapLink2.default, {
            text: this.state.buttonText,
            id: planFeature.featureName.replace(/\s/g, '') + 'Feature'
          })
        ) : null
      );
    }
  }]);

  return PlanFeature;
}(_react.Component);

exports.default = PlanFeature;

/***/ }),
/* 161 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TapLink = function (_Component) {
  _inherits(TapLink, _Component);

  function TapLink(props) {
    _classCallCheck(this, TapLink);

    var _this = _possibleConstructorReturn(this, (TapLink.__proto__ || Object.getPrototypeOf(TapLink)).call(this, props));

    _this.state = {
      initialStyle: {
        color: _this.props.shape === 'bordered' ? '#fff' : _this.props.color,
        backgroundColor: _this.props.shape === 'bordered' ? 'transparent' : 'transparent',
        borderColor: _this.props.shape === 'bordered' ? '#fff' : _this.props.color
      },
      hoverStyle: {
        color: _this.props.shape === 'bordered' ? _this.props.color : '#fff',
        backgroundColor: _this.props.shape === 'bordered' ? '#fff' : _this.props.color,
        borderColor: _this.props.shape === 'bordered' ? '#fff' : _this.props.color
      },
      style: {}
    };
    return _this;
  }

  _createClass(TapLink, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      __webpack_require__(72);
      if (this.props.hoverStyle) {
        this.setState({
          style: this.state.hoverStyle
        });
      } else {
        this.setState({
          style: this.state.initialStyle
        });
      }
    }
  }, {
    key: 'onMouseOverOut',
    value: function onMouseOverOut(newStyle) {
      if (this.props.hoverStyle) {
        this.setState({ style: this.state.hoverStyle });
      } else {
        this.setState({ style: newStyle });
      }
    }
  }, {
    key: 'composeComponent',
    value: function composeComponent() {
      if (this.props.type === 'link') {
        return _react2.default.createElement(
          'a',
          {
            id: this.props.id,
            className: this.props.className + ' readMoreLink',
            onClick: this.props.onClick,
            href: this.props.link },
          this.props.text,
          ' ',
          this.props.fontAwesomeIcon
        );
      } else {
        return _react2.default.createElement(
          'p',
          {
            id: this.props.id,
            className: this.props.className + ' readMoreLink',
            onClick: this.props.onClick },
          this.props.text,
          ' ',
          this.props.fontAwesomeIcon
        );
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return this.composeComponent();
    }
  }]);

  return TapLink;
}(_react.Component);

exports.default = TapLink;

/***/ }),
/* 162 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(4);

var _Banner = __webpack_require__(13);

var _Banner2 = _interopRequireDefault(_Banner);

var _BannerLayer = __webpack_require__(14);

var _BannerLayer2 = _interopRequireDefault(_BannerLayer);

var _Slider = __webpack_require__(15);

var _Slider2 = _interopRequireDefault(_Slider);

var _Separator = __webpack_require__(9);

var _Separator2 = _interopRequireDefault(_Separator);

var _TapButton = __webpack_require__(6);

var _TapButton2 = _interopRequireDefault(_TapButton);

var _AnimatedRow = __webpack_require__(42);

var _AnimatedRow2 = _interopRequireDefault(_AnimatedRow);

var _Title = __webpack_require__(10);

var _Title2 = _interopRequireDefault(_Title);

var _Counter = __webpack_require__(163);

var _Counter2 = _interopRequireDefault(_Counter);

var _Feature = __webpack_require__(164);

var _Feature2 = _interopRequireDefault(_Feature);

var _Img = __webpack_require__(3);

var _Img2 = _interopRequireDefault(_Img);

var _pages = __webpack_require__(8);

var _pages2 = _interopRequireDefault(_pages);

var _axios = __webpack_require__(17);

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var APIPage = function (_Component) {
  _inherits(APIPage, _Component);

  function APIPage(props) {
    _classCallCheck(this, APIPage);

    var _this = _possibleConstructorReturn(this, (APIPage.__proto__ || Object.getPrototypeOf(APIPage)).call(this, props));

    _this.state = {};
    return _this;
  }

  _createClass(APIPage, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      __webpack_require__(56);
      var preferencesStore = this.props.preferencesStore;
      preferencesStore.filterJsonStringsBasedOnLanguage(_pages2.default);
      this.getPlatforms();
    }
  }, {
    key: 'includebreaks',
    value: function includebreaks(text) {
      var _this2 = this;

      return text.split("\n").map(function (text, key) {
        return _react2.default.createElement(
          'span',
          { key: key },
          _this2.includeLinks(text),
          _react2.default.createElement('br', null)
        );
      });
    }
  }, {
    key: 'includeLinks',
    value: function includeLinks(text) {
      return text.split(" ").map(function (text, key) {
        return text.indexOf('\\') > -1 ? _react2.default.createElement(
          _reactRouterDom.Link,
          { style: { color: '#000', textDecoration: 'underline' }, to: text.split("\\")[1] },
          text.split("\\")[0] + ' '
        ) : text + ' ';
      });
    }
  }, {
    key: 'getPlatforms',
    value: function getPlatforms() {
      var arr = [{
        name: "wordpress",
        displayname: "WordPress",
        image: "http://www.tap.company/register/reg-imgs/platforms/WordPress.svg",
        documentationurl: "https://wordpress.org/plugins/tap-payments"
      }, {
        name: "opencart",
        displayname: "OpenCart",
        image: "http://www.tap.company/register/reg-imgs/platforms/OpenCart.svg",
        documentationurl: "https://www.opencart.com/index.php?route=marketplace/extension/info&extension_id=28240"
      }, {
        name: "prestashop",
        displayname: "PrestaShop",
        image: "http://www.tap.company/register/reg-imgs/platforms/PrestaShop.svg",
        documentationurl: "http://www.tap.company/Plugins/Prestashop/PrestaShop.rar"
      }, {
        name: "ecwid",
        displayname: "Ecwid",
        image: "http://www.tap.company/register/reg-imgs/platforms/Ecwid.svg",
        documentationurl: "https://support.ecwid.com/hc/en-us/articles/207100429-Payment-options#SowhatIneedtostartacceptingcreditcardsactually?"
      }, {
        name: "joomla",
        "displayname": "Joomla",
        image: "http://www.tap.company/register/reg-imgs/platforms/Joomla.svg",
        documentationurl: "http://www.tap.company/Plugins/Joomla/Joomla.zip"
      }, {
        name: "magento",
        displayname: "Magento",
        image: "http://www.tap.company/register/reg-imgs/platforms/Magento.svg",
        documentationurl: "http://www.tap.company/Plugins/Magento/Magento.rar"
      }, {
        name: "shopify",
        displayname: "Shopify",
        image: "http://www.tap.company/register/reg-imgs/platforms/Shopify.svg",
        documentationurl: "https://help.shopify.com/manual/payments/third-party-gateways"
      }];
      return arr;
    }
  }, {
    key: 'getProgrammingLanguages',
    value: function getProgrammingLanguages() {
      var arr = [{
        "name": "php",
        "displayname": "PHP",
        "image": "http://www.tap.company/register/reg-imgs/platforms/PHP.svg",
        "documentationurl": "http://www.tap.company/developers/"
      }, {
        "name": "python",
        "displayname": "Python",
        "image": "http://www.tap.company/register/reg-imgs/platforms/Python.svg",
        "documentationurl": "http://www.tap.company/developers/"
      }, {
        "name": "aspnet",
        "displayname": "ASP.NET",
        "image": "http://www.tap.company/register/reg-imgs/platforms/ASP.NET.svg",
        "documentationurl": "http://www.tap.company/developers/"
      }, {
        "name": "java",
        "displayname": "Java",
        "image": "http://www.tap.company/register/reg-imgs/platforms/Java.svg",
        "documentationurl": "http://www.tap.company/developers/"
      }, {
        "name": "nodejs",
        "displayname": "Node.js",
        "image": "http://www.tap.company/register/reg-imgs/platforms/Node.js.svg",
        "documentationurl": "http://www.tap.company/developers/"
      }, {
        "name": "rubyonrails",
        "displayname": "Ruby on Rails",
        "image": "http://www.tap.company/register/reg-imgs/platforms/Ruby%20on%20Rails.svg",
        "documentationurl": "http://www.tap.company/developers/"
      }];
      return arr;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var preferencesStore = this.props.preferencesStore;
      var pageObj = _pages2.default.filter(function (page) {
        return page.page === 'api';
      })[0];
      var banners = [pageObj];
      var platforms = this.getPlatforms();
      var programmingLanguages = this.getProgrammingLanguages();
      var titleStyle = {
        position: 'absolute',
        fontSize: '17px',
        left: '0',
        right: '0',
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '80px',
        backgroundColor: '#f7f7f7',
        marginTop: '5px'
      };

      return _react2.default.createElement(
        _react2.default.Fragment,
        null,
        _react2.default.createElement(
          _Slider2.default,
          {
            language: preferencesStore.language,
            oneBackground: true,
            backgroundColor: pageObj.color,
            backgroundImage: pageObj.bannerImage,
            backgroundSize: '900px',
            backgroundPosition: 'center',
            hideOnSmall: banners.length > 1
          },
          banners.map(function (banner, key) {
            return _react2.default.createElement(
              _Banner2.default,
              {
                key: 0,
                preferencesStore: preferencesStore,
                cropped: 65 },
              _react2.default.createElement(
                _BannerLayer2.default,
                null,
                pageObj.callToAction ? _react2.default.createElement(
                  'div',
                  null,
                  _react2.default.createElement(
                    'h1',
                    { style: { color: '#fff', fontSize: '54px' } },
                    pageObj.callToAction.title
                  ),
                  _react2.default.createElement('div', { style: { height: '7px' } }),
                  _react2.default.createElement(
                    'h5',
                    { style: { color: '#fff' } },
                    pageObj.callToAction.paragraph
                  ),
                  _react2.default.createElement('div', { style: { height: '15px' } }),
                  _react2.default.createElement(_TapButton2.default, {
                    shape: 'bordered',
                    color: pageObj.color,
                    text: pageObj.callToAction.buttonText,
                    hoverStyle: true,
                    type: 'link',
                    link: pageObj.callToAction.buttonLink,
                    actionType: 'link'
                  })
                ) : null
              )
            );
          })
        ),
        _react2.default.createElement(
          'div',
          { className: 'container' },
          pageObj.features ? _react2.default.createElement(
            _react2.default.Fragment,
            null,
            _react2.default.createElement('div', { style: { height: '120px' } }),
            _react2.default.createElement(
              _AnimatedRow2.default,
              {
                animation: 'animateFromButtom',
                fullWidthOnMobile: true },
              pageObj.features.map(function (feature, key) {
                return _react2.default.createElement(
                  'div',
                  { key: key },
                  _react2.default.createElement(_Img2.default, { src: feature.icon, style: { width: '40%' } }),
                  _react2.default.createElement(
                    'h5',
                    null,
                    feature.title
                  ),
                  _react2.default.createElement('div', { style: { height: '15px' } }),
                  _react2.default.createElement(
                    'h6',
                    null,
                    feature.paragraph
                  )
                );
              })
            )
          ) : null,
          platforms ? _react2.default.createElement(
            _react2.default.Fragment,
            null,
            _react2.default.createElement('div', { style: { height: '140px' } }),
            _react2.default.createElement(_Title2.default, {
              style: titleStyle,
              title: 'Plugins',
              separator: _react2.default.createElement(_Separator2.default, { width: '30%' })
            }),
            _react2.default.createElement('div', { style: { height: '5px' } }),
            _react2.default.createElement(
              _AnimatedRow2.default,
              {
                style: { width: '90%' },
                divWidth: '120px'
              },
              platforms.map(function (platform, key) {
                return _react2.default.createElement(
                  _react2.default.Fragment,
                  { key: key },
                  _react2.default.createElement(
                    'a',
                    { href: platform.documentationurl, target: '_blank' },
                    _react2.default.createElement(_Img2.default, { src: platform.image, style: { width: '100%' } })
                  )
                );
              })
            )
          ) : null,
          programmingLanguages ? _react2.default.createElement(
            _react2.default.Fragment,
            null,
            _react2.default.createElement('div', { style: { height: '5px' } }),
            _react2.default.createElement(_Title2.default, {
              style: titleStyle,
              title: 'API',
              separator: _react2.default.createElement(_Separator2.default, { width: '30%' })
            }),
            _react2.default.createElement('div', { style: { height: '5px' } }),
            _react2.default.createElement(
              _AnimatedRow2.default,
              {
                style: { width: '90%' },
                divWidth: '120px'
              },
              programmingLanguages.map(function (programmingLanguage, key) {
                return _react2.default.createElement(
                  _react2.default.Fragment,
                  { key: key },
                  _react2.default.createElement(
                    'a',
                    { href: programmingLanguage.documentationurl, target: '_blank' },
                    _react2.default.createElement(_Img2.default, { src: programmingLanguage.image, style: { width: '100%' } })
                  )
                );
              })
            )
          ) : null,
          pageObj.statistics ? _react2.default.createElement(
            _react2.default.Fragment,
            null,
            _react2.default.createElement('div', { style: { height: '140px' } }),
            _react2.default.createElement(_Title2.default, {
              title: pageObj.statisticsTitle,
              separator: _react2.default.createElement(_Separator2.default, { width: '30%' })
            }),
            _react2.default.createElement(
              _AnimatedRow2.default,
              {
                animation: 'animateFromButtom',
                fullWidthOnMobile: true
              },
              pageObj.statistics.map(function (statistic, key) {
                return _react2.default.createElement(
                  _react2.default.Fragment,
                  { key: key },
                  _react2.default.createElement(_Img2.default, { src: statistic.icon, style: { width: '100px' } }),
                  _react2.default.createElement(_Counter2.default, {
                    countTo: statistic.countTo,
                    finalText: statistic.finalText
                  }),
                  _react2.default.createElement('div', { style: { height: '5px' } }),
                  _react2.default.createElement(
                    'h6',
                    null,
                    statistic.description
                  )
                );
              })
            )
          ) : null,
          pageObj.title ? _react2.default.createElement(
            _react2.default.Fragment,
            null,
            _react2.default.createElement('div', { style: { height: '140px' } }),
            _react2.default.createElement(_Title2.default, {
              title: pageObj.title,
              separator: _react2.default.createElement(_Separator2.default, { width: '30%' })
            })
          ) : null,
          pageObj.paragraph ? _react2.default.createElement(
            _react2.default.Fragment,
            null,
            _react2.default.createElement('div', { style: { height: '20px' } }),
            _react2.default.createElement(
              'h6',
              null,
              pageObj.paragraph
            )
          ) : null,
          pageObj.apiFeatures ? _react2.default.createElement(
            _react2.default.Fragment,
            null,
            _react2.default.createElement('div', { style: { height: '60px' } }),
            pageObj.apiFeatures.map(function (feature, key) {
              return _react2.default.createElement(
                _react2.default.Fragment,
                { key: key },
                key !== 0 ? _react2.default.createElement('div', { style: { height: '30px' } }) : null,
                _react2.default.createElement(_Feature2.default, {
                  icon: feature.icon,
                  title: _this3.includebreaks(feature.title),
                  subtitle: feature.subtitle,
                  description: feature.description,
                  readMoreText: feature.readMoreText,
                  link: feature.link,
                  language: preferencesStore.language
                }),
                _react2.default.createElement('div', { style: { height: '30px' } }),
                key !== pageObj.apiFeatures.length - 1 ? _react2.default.createElement(_Separator2.default, { width: '100%' }) : null
              );
            })
          ) : null
        ),
        pageObj.callToAction ? _react2.default.createElement(
          _react2.default.Fragment,
          null,
          _react2.default.createElement('div', { style: { height: '140px' } }),
          _react2.default.createElement(
            'div',
            { className: 'bottomCallToActionStrip', style: { backgroundColor: pageObj.color, padding: '20px 0px 0px 0px' } },
            _react2.default.createElement(
              'div',
              { className: 'container' },
              _react2.default.createElement(
                'div',
                { className: 'bottomFeaturedImage', style: { width: '50%', display: 'inline-block' } },
                _react2.default.createElement(_Img2.default, { src: pageObj.callToAction.image })
              ),
              _react2.default.createElement(
                'div',
                { className: 'bottomCallToAction', style: { width: '50%', display: 'inline-block', verticalAlign: 'middle', textAlign: 'justify' } },
                _react2.default.createElement(
                  'b',
                  null,
                  _react2.default.createElement(
                    'h2',
                    { style: { color: '#fff' } },
                    pageObj.callToAction.shortTitle
                  )
                ),
                _react2.default.createElement('div', { style: { height: '7px' } }),
                _react2.default.createElement(
                  'h5',
                  { style: { color: '#fff' } },
                  pageObj.callToAction.shortParagraph
                ),
                _react2.default.createElement('div', { style: { height: '15px' } }),
                _react2.default.createElement(_TapButton2.default, {
                  shape: 'bordered',
                  color: pageObj.color,
                  text: pageObj.callToAction.buttonText,
                  hoverStyle: true,
                  type: 'link',
                  link: pageObj.callToAction.buttonLink,
                  actionType: 'link'
                })
              )
            )
          )
        ) : null
      );
    }
  }]);

  return APIPage;
}(_react.Component);

exports.default = APIPage;

/***/ }),
/* 163 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Counter = function (_Component) {
  _inherits(Counter, _Component);

  function Counter(props) {
    _classCallCheck(this, Counter);

    var _this = _possibleConstructorReturn(this, (Counter.__proto__ || Object.getPrototypeOf(Counter)).call(this, props));

    _this.state = { seconds: 0 };
    return _this;
  }

  _createClass(Counter, [{
    key: 'tick',
    value: function tick() {
      var _this2 = this;

      var increase = Math.floor(this.props.countTo / 1000);
      increase === 0 ? increase = 1 : increase = increase;
      if (this.state.seconds < this.props.countTo) {
        this.setState(function (prevState) {
          return {
            seconds: prevState.seconds + increase
          };
        });
      } else {
        this.setState(function (prevState) {
          return {
            seconds: _this2.props.finalText
          };
        });
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this3 = this;

      var interval = 1 / this.props.countTo;
      this.props.countTo < 100 ? interval = 300 : interval = interval;
      this.interval = setInterval(function () {
        return _this3.tick();
      }, interval);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      clearInterval(this.interval);
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'h5',
        null,
        this.state.seconds
      );
    }
  }]);

  return Counter;
}(_react.Component);

exports.default = Counter;

/***/ }),
/* 164 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _Img = __webpack_require__(3);

var _Img2 = _interopRequireDefault(_Img);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Feature = function (_Component) {
  _inherits(Feature, _Component);

  function Feature(props) {
    _classCallCheck(this, Feature);

    return _possibleConstructorReturn(this, (Feature.__proto__ || Object.getPrototypeOf(Feature)).call(this, props));
  }

  _createClass(Feature, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      __webpack_require__(61);
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {}
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {}
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'tapFeatureParagraphWithIcon' },
        _react2.default.createElement(
          'div',
          { className: 'tapFeatureIconDiv' },
          _react2.default.createElement(_Img2.default, { className: 'tapFeatureIcon', src: this.props.icon }),
          _react2.default.createElement(
            'h6',
            { className: 'tapFeatureTitle' },
            this.props.title
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'tapFeatureParagraph' },
          _react2.default.createElement(
            'a',
            { href: this.props.link, style: { color: '#000' }, className: 'tapFeatureSubtitleLink' },
            _react2.default.createElement(
              'b',
              null,
              _react2.default.createElement(
                'h5',
                null,
                this.props.subtitle
              )
            )
          ),
          _react2.default.createElement(
            'h6',
            null,
            this.props.description + ' ',
            _react2.default.createElement(
              'span',
              null,
              _react2.default.createElement(
                'a',
                { href: this.props.link, className: 'tapFeatureLink' },
                this.props.readMoreText + ' ',
                _react2.default.createElement('i', { className: this.props.language === 'ar' ? 'fas fa-angle-left' : 'fas fa-angle-right' })
              )
            )
          )
        )
      );
    }
  }]);

  return Feature;
}(_react.Component);

exports.default = Feature;

/***/ }),
/* 165 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _windowOrGlobal = __webpack_require__(5);

var _windowOrGlobal2 = _interopRequireDefault(_windowOrGlobal);

var _Banner = __webpack_require__(13);

var _Banner2 = _interopRequireDefault(_Banner);

var _BannerLayer = __webpack_require__(14);

var _BannerLayer2 = _interopRequireDefault(_BannerLayer);

var _Slider = __webpack_require__(15);

var _Slider2 = _interopRequireDefault(_Slider);

var _Map = __webpack_require__(166);

var _Map2 = _interopRequireDefault(_Map);

var _TapAddress = __webpack_require__(168);

var _TapAddress2 = _interopRequireDefault(_TapAddress);

var _LightBox = __webpack_require__(12);

var _LightBox2 = _interopRequireDefault(_LightBox);

var _SendEmailFrom = __webpack_require__(79);

var _SendEmailFrom2 = _interopRequireDefault(_SendEmailFrom);

var _Img = __webpack_require__(3);

var _Img2 = _interopRequireDefault(_Img);

var _pages = __webpack_require__(8);

var _pages2 = _interopRequireDefault(_pages);

var _formsFields = __webpack_require__(80);

var _formsFields2 = _interopRequireDefault(_formsFields);

var _addresses = __webpack_require__(170);

var _addresses2 = _interopRequireDefault(_addresses);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SupportPage = function (_Component) {
  _inherits(SupportPage, _Component);

  function SupportPage(props) {
    _classCallCheck(this, SupportPage);

    var _this = _possibleConstructorReturn(this, (SupportPage.__proto__ || Object.getPrototypeOf(SupportPage)).call(this, props));

    _this.state = {
      mapHeight: 0,
      openLightBox: false
    };
    _this.updateWindowDimensions = _this.updateWindowDimensions.bind(_this);
    return _this;
  }

  _createClass(SupportPage, [{
    key: 'openLightBoxFunction',
    value: function openLightBoxFunction() {
      this.setState({
        openLightBox: true
      });
    }
  }, {
    key: 'closeLightBoxFunction',
    value: function closeLightBoxFunction() {
      this.setState({
        openLightBox: false
      });
      setTimeout(function () {
        this.setState({
          lightBoxLink: ''
        });
      }.bind(this), 200);
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      var preferencesStore = this.props.preferencesStore;
      preferencesStore.filterJsonStringsBasedOnLanguage(_pages2.default);
      preferencesStore.filterJsonStringsBasedOnLanguage(_formsFields2.default);
      preferencesStore.filterJsonStringsBasedOnLanguage(_addresses2.default);
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      _windowOrGlobal2.default.addEventListener('resize', this.updateWindowDimensions);
      this.updateWindowDimensions();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _windowOrGlobal2.default.removeEventListener('resize', this.updateWindowDimensions);
    }
  }, {
    key: 'updateWindowDimensions',
    value: function updateWindowDimensions() {
      this.setState({ mapHeight: _windowOrGlobal2.default.innerHeight });
    }
  }, {
    key: 'includebreaks',
    value: function includebreaks(text) {
      return text.split("\n").map(function (text, key) {
        return _react2.default.createElement(
          'span',
          { key: key },
          text,
          _react2.default.createElement('br', null)
        );
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var preferencesStore = this.props.preferencesStore;
      var pageObj = _pages2.default.filter(function (page) {
        return page.page === 'support';
      })[0];
      var banners = [pageObj];
      var formFields = _formsFields2.default.filter(function (formFields) {
        return formFields.key === 'contactus';
      })[0];
      var addressObj = preferencesStore.getValueBasedOnCountryCode(_addresses2.default);

      return _react2.default.createElement(
        _react2.default.Fragment,
        null,
        _react2.default.createElement(
          _LightBox2.default,
          {
            open: this.state.openLightBox,
            onClick: function onClick() {
              return _this2.closeLightBoxFunction();
            },
            dialogueBoxStyle: { width: '55%' },
            fullOnSmall: true
          },
          _react2.default.createElement('div', { style: { height: '50px' } }),
          _react2.default.createElement(_SendEmailFrom2.default, {
            title: formFields.title,
            fields: formFields.fields,
            template_id: formFields.template_id,
            successMessage: formFields.successMessage,
            successSubMessage: formFields.successSubMessage,
            buttonText: formFields.buttonText,
            buttonColor: pageObj.color,
            fieldsStyle: { width: '80%', border: '1px solid #e0e0e0' }
          }),
          _react2.default.createElement('div', { style: { height: '50px' } })
        ),
        _react2.default.createElement(
          _Slider2.default,
          {
            language: preferencesStore.language,
            oneBackground: true,
            backgroundColor: pageObj.color,
            hideOnSmall: banners.length > 1
          },
          banners.map(function (banner, key) {
            return _react2.default.createElement(
              _Banner2.default,
              {
                key: 0,
                preferencesStore: preferencesStore,
                cropped: 65 },
              _react2.default.createElement(
                _BannerLayer2.default,
                {
                  animation: '' },
                _react2.default.createElement(_Img2.default, { src: banner.bannerImage })
              )
            );
          })
        ),
        pageObj.content ? pageObj.content.map(function (paragraph, key) {
          return _react2.default.createElement(
            _react2.default.Fragment,
            { key: key },
            _react2.default.createElement('div', { style: { height: '80px' } }),
            _react2.default.createElement(
              'h2',
              null,
              paragraph.title
            ),
            _react2.default.createElement('div', { style: { height: '20px' } }),
            _react2.default.createElement(
              'h5',
              null,
              _this2.includebreaks(paragraph.paragraph)
            ),
            _react2.default.createElement('div', { style: { height: '80px' } })
          );
        }) : null,
        _react2.default.createElement(
          _Map2.default,
          {
            height: this.state.mapHeight,
            lat: 29.3460378,
            lng: 48.0848072,
            zoom: 15
          },
          _react2.default.createElement(_TapAddress2.default, {
            title: addressObj.address.addressTitle,
            address: this.includebreaks(addressObj.address.addressDetails),
            phoneNumber: addressObj.phoneNumber,
            buttonColor: pageObj.color,
            buttonText: formFields.title,
            onButtonClick: function onButtonClick() {
              return _this2.openLightBoxFunction();
            }
          })
        )
      );
    }
  }]);

  return SupportPage;
}(_react.Component);

exports.default = SupportPage;

/***/ }),
/* 166 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _googleMapReact = __webpack_require__(167);

var _googleMapReact2 = _interopRequireDefault(_googleMapReact);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Map = function (_Component) {
  _inherits(Map, _Component);

  function Map() {
    _classCallCheck(this, Map);

    return _possibleConstructorReturn(this, (Map.__proto__ || Object.getPrototypeOf(Map)).apply(this, arguments));
  }

  _createClass(Map, [{
    key: 'render',
    value: function render() {

      return _react2.default.createElement(
        'div',
        { className: 'google-map', style: { height: this.props.height ? this.props.height : '500px', position: 'relative' } },
        this.props.children,
        _react2.default.createElement(_googleMapReact2.default, {
          defaultCenter: { lat: this.props.lat, lng: this.props.lng },
          defaultZoom: this.props.zoom })
      );
    }
  }]);

  return Map;
}(_react.Component);

exports.default = Map;

/***/ }),
/* 167 */
/***/ (function(module, exports) {

module.exports = require("google-map-react");

/***/ }),
/* 168 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _TapButton = __webpack_require__(6);

var _TapButton2 = _interopRequireDefault(_TapButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TapAddress = function (_Component) {
  _inherits(TapAddress, _Component);

  function TapAddress(props) {
    _classCallCheck(this, TapAddress);

    var _this = _possibleConstructorReturn(this, (TapAddress.__proto__ || Object.getPrototypeOf(TapAddress)).call(this, props));

    _this.state = {};
    return _this;
  }

  _createClass(TapAddress, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      __webpack_require__(71);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        _react2.default.Fragment,
        null,
        _react2.default.createElement(
          'div',
          { className: 'tapAddress' },
          _react2.default.createElement(
            'div',
            { className: 'tapAddressCountrySwitcher' },
            _react2.default.createElement('div', { className: 'tapAddressCountry', style: { backgroundImage: 'url(' + 'http://img.gotapnow.com/web/countryflag/Kuwait.png' + ')' } })
          ),
          _react2.default.createElement(
            'div',
            { className: 'tapAddressBlockWithButton' },
            _react2.default.createElement(
              'div',
              { className: 'tapAddressBlock' },
              _react2.default.createElement(
                'div',
                { className: 'tapAdressTitle' },
                _react2.default.createElement('div', { className: 'tapAddressIcon' }),
                _react2.default.createElement('div', { style: { width: '30px', display: 'inline-block' } }),
                _react2.default.createElement(
                  'b',
                  null,
                  _react2.default.createElement(
                    'h6',
                    { className: 'tapAdressText' },
                    this.props.title
                  )
                )
              ),
              _react2.default.createElement('div', { style: { height: '10px' } }),
              _react2.default.createElement(
                'div',
                { className: 'tapAdressDetails' },
                _react2.default.createElement('div', { className: 'tapAdressDetailsIcon tapAddressIcon' }),
                _react2.default.createElement('div', { style: { width: '30px', display: 'inline-block' } }),
                _react2.default.createElement(
                  'h6',
                  { className: 'tapAdressText' },
                  this.props.address
                )
              ),
              _react2.default.createElement('div', { style: { height: '10px' } }),
              _react2.default.createElement(
                'div',
                { className: 'tapAdressPhoneNumber' },
                _react2.default.createElement('div', { className: 'tapAdressPhoneNumberIcon tapAddressIcon' }),
                _react2.default.createElement('div', { style: { width: '30px', display: 'inline-block' } }),
                _react2.default.createElement(
                  'h6',
                  { className: 'tapAdressText' },
                  this.props.phoneNumber
                ),
                _react2.default.createElement(
                  'span',
                  { className: 'visible-xs' },
                  _react2.default.createElement('div', { style: { height: '15px' } }),
                  _react2.default.createElement(_TapButton2.default, {
                    style: { width: '100%' },
                    shape: 'bordered colored',
                    color: this.props.buttonColor,
                    hoverStyle: true,
                    text: this.props.buttonText,
                    onClick: function onClick() {
                      return _this2.props.onButtonClick();
                    }
                  })
                )
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'hidden-xs' },
              _react2.default.createElement('div', { style: { height: '15px' } }),
              _react2.default.createElement(_TapButton2.default, {
                style: { width: '100%' },
                shape: 'bordered colored',
                color: this.props.buttonColor,
                hoverStyle: true,
                text: this.props.buttonText,
                onClick: function onClick() {
                  return _this2.props.onButtonClick();
                }
              })
            )
          )
        )
      );
    }
  }]);

  return TapAddress;
}(_react.Component);

exports.default = TapAddress;

/***/ }),
/* 169 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _mobxReact = __webpack_require__(7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TapTextArea = function (_Component) {
  _inherits(TapTextArea, _Component);

  function TapTextArea() {
    _classCallCheck(this, TapTextArea);

    return _possibleConstructorReturn(this, (TapTextArea.__proto__ || Object.getPrototypeOf(TapTextArea)).apply(this, arguments));
  }

  _createClass(TapTextArea, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      __webpack_require__(73);
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _react2.default.Fragment,
        null,
        _react2.default.createElement('textarea', {
          style: this.props.style,
          className: 'tapTextArea',
          placeholder: this.props.placeholder,
          onChange: this.props.onChange
        })
      );
    }
  }]);

  return TapTextArea;
}(_react.Component);

exports.default = (0, _mobxReact.observer)(TapTextArea);

/***/ }),
/* 170 */
/***/ (function(module, exports) {

module.exports = [{"country_code":"kw","address":{"addressTitle":{"en":"Tap Payments - Kuwait","ar":"تاپ للدفع الإلكتروني - الكويت"},"addressDetails":{"en":"8 Mall\nFloor no. 6, Salem Al Mubarak St,\nSalmiya, Kuwait","ar":"8 Mall\nالدورالسادس، شارع سالم المبارك\nالسالمية، الكويت "}},"phoneNumber":"+965 2292 2822"},{"country_code":"ae","address":{"addressTitle":{"en":"Tap Payments - Kuwait","ar":"تاپ للدفع الإلكتروني - الكويت"},"addressDetails":{"en":"8 Mall\nFloor no. 6, Salem Al Mubarak St,\nSalmiya, Kuwait","ar":"8 Mall\nالدورالسادس، شارع سالم المبارك\nالسالمية، الكويت "}},"phoneNumber":"+965 2292 2822"},{"country_code":"sa","address":{"addressTitle":{"en":"Tap Payments - Kuwait","ar":"تاپ للدفع الإلكتروني - الكويت"},"addressDetails":{"en":"8 Mall\nFloor no. 6, Salem Al Mubarak St,\nSalmiya, Kuwait","ar":"8 Mall\nالدورالسادس، شارع سالم المبارك\nالسالمية، الكويت "}},"phoneNumber":"+965 2292 2822"},{"country_code":"bh","address":{"addressTitle":{"en":"Tap Payments - Kuwait","ar":"تاپ للدفع الإلكتروني - الكويت"},"addressDetails":{"en":"8 Mall\nFloor no. 6, Salem Al Mubarak St,\nSalmiya, Kuwait","ar":"8 Mall\nالدورالسادس، شارع سالم المبارك\nالسالمية، الكويت "}},"phoneNumber":"+965 2292 2822"}]

/***/ }),
/* 171 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(4);

var _Banner = __webpack_require__(13);

var _Banner2 = _interopRequireDefault(_Banner);

var _BannerLayer = __webpack_require__(14);

var _BannerLayer2 = _interopRequireDefault(_BannerLayer);

var _Slider = __webpack_require__(15);

var _Slider2 = _interopRequireDefault(_Slider);

var _Separator = __webpack_require__(9);

var _Separator2 = _interopRequireDefault(_Separator);

var _ParallaxScroll = __webpack_require__(23);

var _ParallaxScroll2 = _interopRequireDefault(_ParallaxScroll);

var _pages = __webpack_require__(8);

var _pages2 = _interopRequireDefault(_pages);

var _teamMembers = __webpack_require__(172);

var _teamMembers2 = _interopRequireDefault(_teamMembers);

var _TeamMembers = __webpack_require__(173);

var _TeamMembers2 = _interopRequireDefault(_TeamMembers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AboutPage = function (_Component) {
  _inherits(AboutPage, _Component);

  function AboutPage(props) {
    _classCallCheck(this, AboutPage);

    var _this = _possibleConstructorReturn(this, (AboutPage.__proto__ || Object.getPrototypeOf(AboutPage)).call(this, props));

    _this.state = {};
    return _this;
  }

  _createClass(AboutPage, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var preferencesStore = this.props.preferencesStore;
      preferencesStore.filterJsonStringsBasedOnLanguage(_pages2.default);
      preferencesStore.filterJsonStringsBasedOnLanguage(_teamMembers2.default);
      // preferencesStore.filterJsonStringsBasedOnLanguage(teamMembers.items);
    }
  }, {
    key: 'includebreaks',
    value: function includebreaks(text) {
      var _this2 = this;

      return text.split("\n").map(function (text, key) {
        return _react2.default.createElement(
          'span',
          { key: key },
          _this2.includeLinks(text),
          _react2.default.createElement('br', null)
        );
      });
    }
  }, {
    key: 'includeLinks',
    value: function includeLinks(text) {
      return text.split(" ").map(function (text, key) {
        return text.indexOf('\\') > -1 ? _react2.default.createElement(
          _reactRouterDom.Link,
          { key: key, style: { color: '#000', textDecoration: 'underline' }, to: text.split("\\")[1] },
          text.split("\\")[0] + ' '
        ) : text + ' ';
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var preferencesStore = this.props.preferencesStore;
      var pageObj = _pages2.default.filter(function (page) {
        return page.page === 'about';
      })[0];
      var banners = [pageObj];
      return _react2.default.createElement(
        _react2.default.Fragment,
        null,
        _react2.default.createElement(
          _Slider2.default,
          {
            language: preferencesStore.language,
            oneBackground: true,
            backgroundColor: pageObj.color,
            backgroundImage: pageObj.bannerImage,
            backgroundSize: 'cover',
            backgroundPosition: 'top',
            hideOnSmall: banners.length > 1
          },
          banners.map(function (banner, key) {
            return _react2.default.createElement(
              _Banner2.default,
              {
                key: 0,
                preferencesStore: preferencesStore,
                cropped: 65 },
              _react2.default.createElement(_BannerLayer2.default, null)
            );
          })
        ),
        _react2.default.createElement(
          'div',
          { className: 'container' },
          pageObj.intro ? _react2.default.createElement(
            _react2.default.Fragment,
            null,
            _react2.default.createElement('div', { style: { height: '50px' } }),
            _react2.default.createElement(
              'h2',
              null,
              pageObj.intro
            )
          ) : null,
          pageObj.subIntro ? _react2.default.createElement(
            _react2.default.Fragment,
            null,
            _react2.default.createElement('div', { style: { height: '20px' } }),
            _react2.default.createElement(
              'h5',
              null,
              pageObj.subIntro
            )
          ) : null,
          _react2.default.createElement('div', { style: { height: '30px' } }),
          _react2.default.createElement(_Separator2.default, { width: '90%' }),
          pageObj.contentTitle ? _react2.default.createElement(
            _react2.default.Fragment,
            null,
            _react2.default.createElement('div', { style: { height: '50px' } }),
            _react2.default.createElement(
              'h5',
              null,
              pageObj.contentTitle
            )
          ) : null,
          pageObj.content ? pageObj.content.map(function (paragraph, key) {
            return _react2.default.createElement(
              'div',
              { key: key },
              _react2.default.createElement('div', { style: { height: '50px' } }),
              _react2.default.createElement(
                'b',
                null,
                _react2.default.createElement(
                  'h5',
                  null,
                  paragraph.title
                )
              ),
              _react2.default.createElement('div', { style: { height: '15px' } }),
              _react2.default.createElement(
                'h6',
                null,
                _this3.includebreaks(paragraph.paragraph)
              )
            );
          }) : null
        ),
        pageObj.subImage ? _react2.default.createElement(
          _react2.default.Fragment,
          null,
          _react2.default.createElement('div', { style: { height: '70px' } }),
          _react2.default.createElement(
            _ParallaxScroll2.default,
            {
              backgroundImage: pageObj.subImage
            },
            _react2.default.createElement(
              'div',
              null,
              _react2.default.createElement(
                'h2',
                { style: { color: '#fff' } },
                pageObj.subImageContent.title
              )
            )
          )
        ) : null,
        _react2.default.createElement(
          'div',
          { className: 'container' },
          pageObj.conclusion ? _react2.default.createElement(
            _react2.default.Fragment,
            null,
            _react2.default.createElement('div', { style: { height: '70px' } }),
            _react2.default.createElement(
              'h6',
              null,
              this.includebreaks(pageObj.conclusion)
            )
          ) : null,
          _teamMembers2.default ? _react2.default.createElement(
            _react2.default.Fragment,
            null,
            _react2.default.createElement('div', { style: { height: '70px' } }),
            _react2.default.createElement(_TeamMembers2.default, {
              title: _teamMembers2.default.title,
              teamMembers: _teamMembers2.default.members
            }),
            _react2.default.createElement('div', { style: { height: '40px' } })
          ) : null
        )
      );
    }
  }]);

  return AboutPage;
}(_react.Component);

exports.default = AboutPage;

/***/ }),
/* 172 */
/***/ (function(module, exports) {

module.exports = {"title":{"en":"We are Tap. And you’re in the right place.","ar":"نحن تاپ. حيّاك هذا مكانك."},"members":[{"image1":"https://www.tap.company/websiteImages/teamMembers/Ahmed-serious-e1459418465935.jpg","image2":"https://www.tap.company/websiteImages/teamMembers/ahmed-smile-e1459418694467.jpg","name":{"en":"Ahmed Almunayes","ar":"أحمد المنيس"},"position":{"en":"Co-founder & CGO","ar":"الرئيس التنفيذي للعمليات"}},{"image1":"https://www.tap.company/websiteImages/teamMembers/Ali-Serious-e1459418325733.jpg","image2":"https://www.tap.company/websiteImages/teamMembers/Ali-smile-e1448197058174.jpg","name":{"en":"Ali Abulhasan","ar":"علي أبوالحسن"},"position":{"en":"Co-Founder & CEO","ar":"شريك مؤسس والرئيس التنفيذي"}},{"image1":"https://www.tap.company/websiteImages/teamMembers/Mohammed-serious-e1459418209663.jpg","image2":"https://www.tap.company/websiteImages/teamMembers/Mohammed-smile-e1448357876225.jpg","name":{"en":"Mohammed Abulhasan","ar":"محمد أبوالحسن"},"position":{"en":"Co-Founder","ar":"شريك مؤسس"}},{"image1":"https://www.tap.company/websiteImages/teamMembers/ayub-serious-e1459417979145.jpg","image2":"https://www.tap.company/websiteImages/teamMembers/Ayub-smile-1.jpg","name":{"en":"Ayub Khan","ar":"أيوب خان"},"position":{"en":"Head of Security & Engineering","ar":"مدير الهندسة والأمان"}},{"image1":"https://www.tap.company/websiteImages/teamMembers/zyneb-serious-e1459417862210.jpg","image2":"https://www.tap.company/websiteImages/teamMembers/Zyneb-Smile-e1448196957147.jpg","name":{"en":"Zyneb Akouri","ar":"زينب أكوري"},"position":{"en":"Community Manager","ar":"مديرة اجتماعية"}}]}

/***/ }),
/* 173 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _TeamMember = __webpack_require__(174);

var _TeamMember2 = _interopRequireDefault(_TeamMember);

var _reactDom = __webpack_require__(11);

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TeamMembers = function (_Component) {
  _inherits(TeamMembers, _Component);

  function TeamMembers(props) {
    _classCallCheck(this, TeamMembers);

    var _this = _possibleConstructorReturn(this, (TeamMembers.__proto__ || Object.getPrototypeOf(TeamMembers)).call(this, props));

    _this.state = {};
    return _this;
  }

  _createClass(TeamMembers, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      __webpack_require__(74);
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'teamMembers', style: this.props.style },
        this.props.title ? _react2.default.createElement(
          _react2.default.Fragment,
          null,
          _react2.default.createElement(
            'h3',
            null,
            this.props.title
          ),
          _react2.default.createElement('div', { style: { height: '40px' } })
        ) : null,
        this.props.teamMembers ? _react2.default.createElement(
          _react2.default.Fragment,
          null,
          this.props.teamMembers.map(function (teamMember, key) {
            return _react2.default.createElement(_TeamMember2.default, {
              name: teamMember.name,
              position: teamMember.position,
              image1: teamMember.image1,
              image2: teamMember.image2,
              key: key
            });
          })
        ) : null
      );
    }
  }]);

  return TeamMembers;
}(_react.Component);

exports.default = TeamMembers;

/***/ }),
/* 174 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TeamMember = function (_Component) {
  _inherits(TeamMember, _Component);

  function TeamMember(props) {
    _classCallCheck(this, TeamMember);

    var _this = _possibleConstructorReturn(this, (TeamMember.__proto__ || Object.getPrototypeOf(TeamMember)).call(this, props));

    _this.state = {
      image: _this.props.image1
    };
    return _this;
  }

  _createClass(TeamMember, [{
    key: 'mouseOver',
    value: function mouseOver() {
      this.setState({ image: this.props.image2 });
    }
  }, {
    key: 'mouseOut',
    value: function mouseOut() {
      this.setState({ image: this.props.image1 });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        'div',
        { className: 'teamMember',
          onMouseOver: function onMouseOver() {
            return _this2.mouseOver();
          },
          onMouseOut: function onMouseOut() {
            return _this2.mouseOut();
          }
        },
        _react2.default.createElement(
          'div',
          { className: 'teamMemberContainer' },
          _react2.default.createElement('div', { className: 'teamMemberImage', style: { backgroundImage: 'url(' + this.state.image + ')' } }),
          _react2.default.createElement('div', { style: { height: '20px' } }),
          _react2.default.createElement(
            'h6',
            null,
            this.props.name
          ),
          _react2.default.createElement(
            'h6',
            null,
            this.props.position
          )
        )
      );
    }
  }]);

  return TeamMember;
}(_react.Component);

exports.default = TeamMember;

/***/ }),
/* 175 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _Banner = __webpack_require__(13);

var _Banner2 = _interopRequireDefault(_Banner);

var _BannerLayer = __webpack_require__(14);

var _BannerLayer2 = _interopRequireDefault(_BannerLayer);

var _Slider = __webpack_require__(15);

var _Slider2 = _interopRequireDefault(_Slider);

var _LightBox = __webpack_require__(12);

var _LightBox2 = _interopRequireDefault(_LightBox);

var _SendEmailFrom = __webpack_require__(79);

var _SendEmailFrom2 = _interopRequireDefault(_SendEmailFrom);

var _Separator = __webpack_require__(9);

var _Separator2 = _interopRequireDefault(_Separator);

var _TapButton = __webpack_require__(6);

var _TapButton2 = _interopRequireDefault(_TapButton);

var _ParallaxScroll = __webpack_require__(23);

var _ParallaxScroll2 = _interopRequireDefault(_ParallaxScroll);

var _Img = __webpack_require__(3);

var _Img2 = _interopRequireDefault(_Img);

var _pages = __webpack_require__(8);

var _pages2 = _interopRequireDefault(_pages);

var _formsFields = __webpack_require__(80);

var _formsFields2 = _interopRequireDefault(_formsFields);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var JobsPaga = function (_Component) {
  _inherits(JobsPaga, _Component);

  function JobsPaga(props) {
    _classCallCheck(this, JobsPaga);

    var _this = _possibleConstructorReturn(this, (JobsPaga.__proto__ || Object.getPrototypeOf(JobsPaga)).call(this, props));

    _this.state = {
      openLightBox: false
    };
    return _this;
  }

  _createClass(JobsPaga, [{
    key: 'openLightBoxFunction',
    value: function openLightBoxFunction() {
      this.setState({
        openLightBox: true
      });
    }
  }, {
    key: 'closeLightBoxFunction',
    value: function closeLightBoxFunction() {
      this.setState({
        openLightBox: false
      });
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      var preferencesStore = this.props.preferencesStore;
      preferencesStore.filterJsonStringsBasedOnLanguage(_pages2.default);
      preferencesStore.filterJsonStringsBasedOnLanguage(_formsFields2.default);
    }
  }, {
    key: 'includebreaks',
    value: function includebreaks(text) {
      return text.split("\n").map(function (text, key) {
        return _react2.default.createElement(
          'span',
          { key: key },
          text,
          _react2.default.createElement('br', null)
        );
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var preferencesStore = this.props.preferencesStore;
      var pageObj = _pages2.default.filter(function (page) {
        return page.page === 'jobs';
      })[0];
      var banners = [pageObj];
      var formFields = _formsFields2.default.filter(function (formFields) {
        return formFields.key === 'applyforajob';
      })[0];
      return _react2.default.createElement(
        _react2.default.Fragment,
        null,
        _react2.default.createElement(
          _LightBox2.default,
          {
            open: this.state.openLightBox,
            onClick: function onClick() {
              return _this2.closeLightBoxFunction();
            },
            dialogueBoxStyle: { width: '55%' },
            fullOnSmall: true
          },
          _react2.default.createElement('div', { style: { height: '50px' } }),
          _react2.default.createElement(_SendEmailFrom2.default, {
            title: formFields.title,
            template_id: formFields.template_id,
            fields: formFields.fields,
            successMessage: formFields.successMessage,
            successSubMessage: formFields.successSubMessage,
            buttonText: formFields.buttonText,
            buttonColor: pageObj.color,
            fieldsStyle: { width: '80%', border: '1px solid #e0e0e0' }
          }),
          _react2.default.createElement('div', { style: { height: '50px' } })
        ),
        _react2.default.createElement(
          _Slider2.default,
          {
            language: preferencesStore.language,
            oneBackground: true,
            backgroundColor: pageObj.color,
            backgroundImage: pageObj.bannerImage,
            backgroundSize: 'cover',
            backgroundPosition: 'top',
            hideOnSmall: banners.length > 1
          },
          banners.map(function (banner, key) {
            return _react2.default.createElement(
              _Banner2.default,
              {
                key: 0,
                preferencesStore: preferencesStore,
                cropped: 65 },
              _react2.default.createElement(_BannerLayer2.default, null)
            );
          })
        ),
        _react2.default.createElement(
          'div',
          { className: 'container' },
          pageObj.intro ? _react2.default.createElement(
            _react2.default.Fragment,
            null,
            _react2.default.createElement('div', { style: { height: '50px' } }),
            _react2.default.createElement(
              'h2',
              null,
              pageObj.intro
            )
          ) : null,
          pageObj.subIntro ? _react2.default.createElement(
            _react2.default.Fragment,
            null,
            _react2.default.createElement('div', { style: { height: '20px' } }),
            _react2.default.createElement(
              'h5',
              null,
              pageObj.subIntro
            )
          ) : null,
          _react2.default.createElement('div', { style: { height: '40px' } }),
          _react2.default.createElement(_Separator2.default, { width: '90%' }),
          pageObj.contentTitle ? _react2.default.createElement(
            _react2.default.Fragment,
            null,
            _react2.default.createElement('div', { style: { height: '50px' } }),
            _react2.default.createElement(
              'h5',
              null,
              pageObj.contentTitle
            )
          ) : null,
          pageObj.content ? pageObj.content.map(function (paragraph, key) {
            return _react2.default.createElement(
              'div',
              { key: key, style: { width: '80%', margin: 'auto' } },
              _react2.default.createElement('div', { style: { height: '60px' } }),
              _react2.default.createElement(_Img2.default, { src: paragraph.icon, alt: paragraph.title, style: { width: '60px' } }),
              _react2.default.createElement('div', { style: { height: '10px' } }),
              _react2.default.createElement(
                'b',
                null,
                _react2.default.createElement(
                  'h6',
                  null,
                  paragraph.title
                )
              ),
              _react2.default.createElement(
                'h6',
                null,
                _this2.includebreaks(paragraph.paragraph)
              )
            );
          }) : null
        ),
        pageObj.subImage ? _react2.default.createElement(
          _react2.default.Fragment,
          null,
          _react2.default.createElement('div', { style: { height: '110px' } }),
          _react2.default.createElement(
            _ParallaxScroll2.default,
            {
              height: '500px',
              backgroundImage: pageObj.subImage,
              withContentBackground: true
            },
            _react2.default.createElement(
              'div',
              null,
              _react2.default.createElement(
                'h2',
                null,
                pageObj.subImageContent.title
              ),
              _react2.default.createElement('div', { style: { height: '15px' } }),
              _react2.default.createElement(
                'h6',
                null,
                pageObj.subImageContent.paragraph
              ),
              _react2.default.createElement('div', { style: { height: '15px' } }),
              _react2.default.createElement(_TapButton2.default, {
                text: pageObj.subImageContent.buttonText,
                onClick: function onClick() {
                  return _this2.openLightBoxFunction();
                },
                shape: 'bordered colored',
                hoverStyle: true,
                color: pageObj.color
              })
            )
          )
        ) : null
      );
    }
  }]);

  return JobsPaga;
}(_react.Component);

exports.default = JobsPaga;

/***/ }),
/* 176 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _pages = __webpack_require__(8);

var _pages2 = _interopRequireDefault(_pages);

var _windowOrGlobal = __webpack_require__(5);

var _windowOrGlobal2 = _interopRequireDefault(_windowOrGlobal);

var _activateProduct = __webpack_require__(177);

var _activateProduct2 = _interopRequireDefault(_activateProduct);

var _Img = __webpack_require__(3);

var _Img2 = _interopRequireDefault(_Img);

var _CallToAction = __webpack_require__(20);

var _CallToAction2 = _interopRequireDefault(_CallToAction);

var _TapButton = __webpack_require__(6);

var _TapButton2 = _interopRequireDefault(_TapButton);

var _ErrorPage = __webpack_require__(18);

var _ErrorPage2 = _interopRequireDefault(_ErrorPage);

var _loader = __webpack_require__(24);

var _customLoaderStyle = __webpack_require__(179);

var _customLoaderStyle2 = _interopRequireDefault(_customLoaderStyle);

var _axios = __webpack_require__(17);

var _axios2 = _interopRequireDefault(_axios);

var _reactRouterDom = __webpack_require__(4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ActivatePage = function (_Component) {
  _inherits(ActivatePage, _Component);

  function ActivatePage(props) {
    _classCallCheck(this, ActivatePage);

    var _this = _possibleConstructorReturn(this, (ActivatePage.__proto__ || Object.getPrototypeOf(ActivatePage)).call(this, props));

    _this.state = {
      pageHeight: 0,
      response_message: '..',
      loading: true,
      loaderRotating: true,
      notFound: false,
      servererror: false
    };
    _this.updateWindowDimensions = _this.updateWindowDimensions.bind(_this);
    return _this;
  }

  _createClass(ActivatePage, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      __webpack_require__(57);
      var preferencesStore = this.props.preferencesStore;
      preferencesStore.filterJsonStringsBasedOnLanguage(_activateProduct2.default);
      var activation_id = preferencesStore.pageUrlKeys['activationid'];
      activation_id ? this.activate(activation_id) : this.setState({ notFound: true });
    }
  }, {
    key: 'setLoading',
    value: function setLoading(bool) {
      if (bool) {
        this.setState({ loading: bool, loaderRotating: bool });
      } else {
        this.setState({ loading: bool });
        setTimeout(function () {
          this.setState({ loaderRotating: bool });
        }.bind(this), 4500);
      }
    }
  }, {
    key: 'activate',
    value: function activate(activation_id) {
      var _this2 = this;

      _axios2.default.post('https://partners.payments.tap.company/api/V1.3/api/Activation/ActivateAccount?activation_id=' + activation_id + '&language_code=' + this.props.language).then(function (response) {
        return response.data;
      }).then(function (data) {
        _this2.setLoading(false);
        _this2.setState({ response_message: data.response_message });
      }).catch(function (error) {
        _this2.setLoading(false);
        _this2.setState({ servererror: true });
      });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      _windowOrGlobal2.default.addEventListener('resize', this.updateWindowDimensions);
      this.updateWindowDimensions();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _windowOrGlobal2.default.removeEventListener('resize', this.updateWindowDimensions);
    }
  }, {
    key: 'updateWindowDimensions',
    value: function updateWindowDimensions() {
      this.setState({ pageHeight: _windowOrGlobal2.default.innerHeight });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var activateProductObj = _activateProduct2.default.filter(function (obj) {
        return obj.product === _this3.props.product;
      })[0];

      return _react2.default.createElement(
        _react2.default.Fragment,
        null,
        this.state.notFound ? _react2.default.createElement(_reactRouterDom.Redirect, { to: '/notfound' }) : _react2.default.createElement(
          _react2.default.Fragment,
          null,
          this.state.servererror ? _react2.default.createElement(_ErrorPage2.default, _extends({}, this.props, { preferencesStore: this.props.preferencesStore, error: 'servererror' })) : _react2.default.createElement(
            'div',
            { className: 'activatePage', style: _extends({}, this.props.style, { height: this.state.pageHeight, backgroundColor: activateProductObj.color }) },
            _react2.default.createElement(
              'div',
              { className: 'activatePageConetent' },
              _react2.default.createElement(
                _react2.default.Fragment,
                null,
                _react2.default.createElement(
                  'div',
                  { className: this.state.loaderRotating ? 'productSquarePlaceHolder' : 'productSquarePlaceHolderglow productSquarePlaceHolder', style: {} },
                  _react2.default.createElement(_loader.Loader, {
                    toggleAnimation: this.state.loading,
                    duration: 5,
                    animationData: _customLoaderStyle2.default
                  })
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'myOpacityTransition myHeightTransition', style: { opacity: this.state.loaderRotating ? '0' : '1', maxHeight: this.state.loaderRotating ? '0' : '300px' } },
                  _react2.default.createElement('div', { style: { height: '25px' } }),
                  _react2.default.createElement(
                    'h2',
                    { className: 'activateProductMessage' },
                    this.state.response_message
                  ),
                  activateProductObj.actionType === 'sms' ? _react2.default.createElement(_CallToAction2.default, {
                    callToAction: activateProductObj,
                    country_code: this.props.country,
                    language: this.props.language,
                    color: activateProductObj.color,
                    center: true
                  }) : _react2.default.createElement(
                    _react2.default.Fragment,
                    null,
                    _react2.default.createElement('div', { style: { height: '25px' } }),
                    _react2.default.createElement(_TapButton2.default, {
                      text: activateProductObj.buttonText,
                      shape: 'bordered',
                      color: activateProductObj.color
                    })
                  )
                )
              )
            )
          )
        )
      );
    }
  }]);

  return ActivatePage;
}(_react.Component);

exports.default = ActivatePage;

/***/ }),
/* 177 */
/***/ (function(module, exports) {

module.exports = [{"product":"collect","color":"#ff0031","name":"goCollect","image":"https://www.tap.company/websiteImages/productsIcons/collect-icon.png","actionType":"sms","placeholder":{"en":"Mobile Number","ar":"رقم الهاتف"},"buttonText":{"en":"Send a download link","ar":"أرسل رابط التحميل"},"linkText":{"en":"Download the app","ar":"حمّل التطبيق "},"link":{"ios":"https://itunes.apple.com/us/app/gocollect!/id1157951837?ls=1&mt=8","android":"https://play.google.com/store/apps/details?id=tap.gocollect"}},{"product":"sell","color":"#00aff0","name":"goSell","image":"https://www.tap.company/websiteImages/productsIcons/sell-icon.png","actionType":"login","mobileMessage":{"en":"You may login to your account\nfrom a tablet or a PC!","ar":"يمكنك تسجيل الدخول إلى حسابك\n عن طريق حاسوبك أو جهازك اللوحي"},"buttonText":{"en":"Login","ar":"دخول"}},{"product":"tap","color":"#EF4123","name":"goTap","image":"https://www.tap.company/websiteImages/productsIcons/tap-icon.png","actionType":"login","mobileMessage":{"en":"You may login to your account\nfrom a tablet or a PC!","ar":"يمكنك تسجيل الدخول إلى حسابك\n عن طريق حاسوبك أو جهازك اللوحي"},"buttonText":{"en":"Login","ar":"دخول"}}]

/***/ }),
/* 178 */
/***/ (function(module, exports) {

module.exports = [{"error":"notfound","error_number":"404","error_image":"https://www.tap.company/websiteImages/errors/404.svg","error_message":{"en":"page not found","ar":"الصفحة غير موجودة"}},{"error":"servererror","error_number":"500","error_image":"https://www.tap.company/websiteImages/errors/500_black.svg","error_message":{"en":"Sorry, This is a server error, please try again later","ar":"نأسف، حدث خطأ في الخادم، الرجاء المحاولة لاحقاً"}}]

/***/ }),
/* 179 */
/***/ (function(module, exports) {

module.exports = {"v":"5.2.1","fr":29.9700012207031,"ip":0,"op":300.00001221925,"w":120,"h":120,"nm":"Comp 1","ddd":0,"assets":[],"layers":[{"ddd":0,"ind":1,"ty":4,"nm":"Shape Layer 2","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":1,"k":[{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"n":["0p833_0p833_0p167_0p107"],"t":0,"s":[0],"e":[-1080]},{"t":299.00001217852}],"ix":10},"p":{"a":0,"k":[60,60,0],"ix":2},"a":{"a":0,"k":[6.808,3.603,0],"ix":1},"s":{"a":0,"k":[78.548,78.548,100],"ix":6}},"ao":0,"shapes":[{"ty":"gr","it":[{"d":3,"ty":"el","s":{"a":0,"k":[93.23,93.23],"ix":2},"p":{"a":0,"k":[6,2],"ix":3},"nm":"Ellipse Path 1","mn":"ADBE Vector Shape - Ellipse","hd":false},{"ty":"tm","s":{"a":0,"k":0,"ix":1},"e":{"a":1,"k":[{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"n":["0p833_0p833_0p167_0p107"],"t":0,"s":[100],"e":[5]},{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"n":["0p833_0p833_0p167_0p107"],"t":135,"s":[5],"e":[5]},{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"n":["0p833_0p833_0p167_0p107"],"t":165,"s":[5],"e":[100]},{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"n":["0p833_0p833_0p167_0p107"],"t":270,"s":[100],"e":[100]},{"t":299.00001217852}],"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim","hd":false},{"ty":"st","c":{"a":0,"k":[1,1,1,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":11,"ix":5},"lc":2,"lj":1,"ml":4,"ml2":{"a":0,"k":4,"ix":8},"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"fl","c":{"a":0,"k":[1,1,1,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":true},{"ty":"tr","p":{"a":0,"k":[0.5,1.5],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[105.13,105.13],"ix":3},"r":{"a":0,"k":-2520,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Ellipse 1","np":4,"cix":2,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":300.00001221925,"st":0,"bm":0},{"ddd":0,"ind":2,"ty":4,"nm":"Shape Layer 1","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":1,"k":[{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"n":["0p833_0p833_0p167_0p107"],"t":0,"s":[0],"e":[1080]},{"t":299.00001217852}],"ix":10,"x":"var $bm_rt;\n$bm_rt = transform.rotation;"},"p":{"a":0,"k":[60,60,0],"ix":2},"a":{"a":0,"k":[2.009,9.835,0],"ix":1},"s":{"a":0,"k":[118.698,118.698,100],"ix":6}},"ao":0,"shapes":[{"ty":"gr","it":[{"d":2,"ty":"el","s":{"a":0,"k":[93.23,93.23],"ix":2},"p":{"a":0,"k":[6,2],"ix":3},"nm":"Ellipse Path 1","mn":"ADBE Vector Shape - Ellipse","hd":false},{"ty":"tm","s":{"a":0,"k":0,"ix":1},"e":{"a":1,"k":[{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"n":["0p833_0p833_0p167_0p107"],"t":0,"s":[100],"e":[5]},{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"n":["0p833_0p833_0p167_0p107"],"t":135,"s":[5],"e":[5]},{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"n":["0p833_0p833_0p167_0p107"],"t":165,"s":[5],"e":[100]},{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"n":["0p833_0p833_0p167_0p107"],"t":270,"s":[100],"e":[100]},{"t":299.00001217852}],"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim","hd":false},{"ty":"st","c":{"a":0,"k":[1,1,1,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":8,"ix":5},"lc":2,"lj":1,"ml":4,"ml2":{"a":0,"k":4,"ix":8},"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"fl","c":{"a":0,"k":[1,1,1,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":true},{"ty":"tr","p":{"a":0,"k":[-3.842,7.884],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[97.52,97.52],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Ellipse 1","np":4,"cix":2,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":300.00001221925,"st":0,"bm":0}],"markers":[]}

/***/ }),
/* 180 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _pages = __webpack_require__(8);

var _pages2 = _interopRequireDefault(_pages);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var IframePage = function (_Component) {
  _inherits(IframePage, _Component);

  function IframePage(props) {
    _classCallCheck(this, IframePage);

    return _possibleConstructorReturn(this, (IframePage.__proto__ || Object.getPrototypeOf(IframePage)).call(this, props));
  }

  _createClass(IframePage, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      __webpack_require__(65);
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {}
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {}
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var iframeSrc = _pages2.default.filter(function (page) {
        return page.slot === _this2.props.page;
      })[0].iframeSrc;
      return _react2.default.createElement('iframe', { className: 'iframePage', src: iframeSrc });
    }
  }]);

  return IframePage;
}(_react.Component);

exports.default = IframePage;

/***/ }),
/* 181 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _pages = __webpack_require__(8);

var _pages2 = _interopRequireDefault(_pages);

var _Title = __webpack_require__(10);

var _Title2 = _interopRequireDefault(_Title);

var _Separator = __webpack_require__(9);

var _Separator2 = _interopRequireDefault(_Separator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PoliciesPage = function (_Component) {
  _inherits(PoliciesPage, _Component);

  function PoliciesPage(props) {
    _classCallCheck(this, PoliciesPage);

    var _this = _possibleConstructorReturn(this, (PoliciesPage.__proto__ || Object.getPrototypeOf(PoliciesPage)).call(this, props));

    _this.state = {};
    return _this;
  }

  _createClass(PoliciesPage, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      // require('./activatePage.css');
      this.props.preferencesStore.filterJsonStringsBasedOnLanguage(_pages2.default);
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {}
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {}
  }, {
    key: 'includebreaks',
    value: function includebreaks(text) {
      return text.split("\n").map(function (text, key) {
        return _react2.default.createElement(
          'span',
          { key: key },
          text,
          _react2.default.createElement('br', null)
        );
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var pageObject = _pages2.default.filter(function (obj) {
        return obj.slot === _this2.props.page;
      })[0];
      return _react2.default.createElement(
        _react2.default.Fragment,
        null,
        pageObject ? _react2.default.createElement(
          _react2.default.Fragment,
          null,
          _react2.default.createElement(
            'div',
            { className: 'container', style: { margin: 'auto', padding: '0 17%', textAlign: 'justify' } },
            _react2.default.createElement('div', { style: { height: '150px' } }),
            _react2.default.createElement(
              'div',
              null,
              _react2.default.createElement(
                'h2',
                { style: { textAlign: 'center' } },
                pageObject.title
              ),
              _react2.default.createElement(_Separator2.default, { width: '30%' })
            ),
            _react2.default.createElement(
              'div',
              null,
              pageObject.content.map(function (contentItem) {
                return _react2.default.createElement(
                  _react2.default.Fragment,
                  null,
                  _react2.default.createElement('div', { style: { height: '40px' } }),
                  _react2.default.createElement(
                    'b',
                    null,
                    _react2.default.createElement(
                      'h5',
                      null,
                      contentItem.title
                    )
                  ),
                  contentItem.paragraph ? _react2.default.createElement(
                    'h6',
                    { style: { color: contentItem.type === 'warning' ? 'red' : '' } },
                    _this2.includebreaks(contentItem.paragraph)
                  ) : null,
                  contentItem.points ? contentItem.points.map(function (point) {
                    return _react2.default.createElement(
                      'h6',
                      { style: { color: point.type === 'warning' ? 'red' : '', marginLeft: '20px' } },
                      '• ' + point.paragraph
                    );
                  }) : null
                );
              })
            ),
            _react2.default.createElement('div', { style: { height: '80px' } })
          )
        ) : null
      );
    }
  }]);

  return PoliciesPage;
}(_react.Component);

exports.default = PoliciesPage;

/***/ }),
/* 182 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _pages = __webpack_require__(8);

var _pages2 = _interopRequireDefault(_pages);

var _windowOrGlobal = __webpack_require__(5);

var _windowOrGlobal2 = _interopRequireDefault(_windowOrGlobal);

var _paymentMethods = __webpack_require__(183);

var _paymentMethods2 = _interopRequireDefault(_paymentMethods);

var _Img = __webpack_require__(3);

var _Img2 = _interopRequireDefault(_Img);

var _ErrorPage = __webpack_require__(18);

var _ErrorPage2 = _interopRequireDefault(_ErrorPage);

var _loader = __webpack_require__(24);

var _customLoaderStyle = __webpack_require__(184);

var _customLoaderStyle2 = _interopRequireDefault(_customLoaderStyle);

var _axios = __webpack_require__(17);

var _axios2 = _interopRequireDefault(_axios);

var _reactRouterDom = __webpack_require__(4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ActivatePayment = function (_Component) {
  _inherits(ActivatePayment, _Component);

  function ActivatePayment(props) {
    _classCallCheck(this, ActivatePayment);

    var _this = _possibleConstructorReturn(this, (ActivatePayment.__proto__ || Object.getPrototypeOf(ActivatePayment)).call(this, props));

    _this.state = {
      pageHeight: 0,
      response_message: '..',
      loading: true,
      loaderRotating: true,
      notFound: false,
      servererror: false,
      paymentMethod: {}
    };
    _this.updateWindowDimensions = _this.updateWindowDimensions.bind(_this);
    return _this;
  }

  _createClass(ActivatePayment, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      __webpack_require__(58);
      var preferencesStore = this.props.preferencesStore;
      preferencesStore.filterJsonStringsBasedOnLanguage(_paymentMethods2.default);
      var access_token = preferencesStore.pageUrlKeys['access_token'];
      access_token ? this.activate(access_token) : this.setState({ notFound: true });
    }
  }, {
    key: 'setLoading',
    value: function setLoading(bool) {
      if (bool) {
        this.setState({ loading: bool, loaderRotating: bool });
      } else {
        this.setState({ loading: bool });
        setTimeout(function () {
          this.setState({ loaderRotating: bool });
        }.bind(this), 3500);
      }
    }
  }, {
    key: 'includebreaks',
    value: function includebreaks(text) {
      return text.split("\n").map(function (text, key) {
        return _react2.default.createElement(
          'span',
          { key: key },
          text,
          _react2.default.createElement('br', null)
        );
      });
    }
  }, {
    key: 'activate',
    value: function activate(enable_payment_request_token) {
      var _this2 = this;

      _axios2.default.post('https://partners.payments.tap.company/api/V1.3/api/Account/EnablePaymentOption?enable_payment_request_token=' + enable_payment_request_token).then(function (response) {
        return response.data;
      }).then(function (data) {
        if (data.response_code === '101') {
          _this2.setLoading(false);
          _this2.setState({ notFound: true });
        } else {
          _this2.setLoading(false);
          var payment_method_id = data.payment_method_id;
          var user_id = data.merchant_id;
          var email_address = data.email_address;
          var profile_name = data.profile_name;
          _this2.props.preferencesStore.setIntercomeUser(user_id, email_address, profile_name);
          _this2.setState({ paymentMethod: _paymentMethods2.default.filter(function (paymentMethod) {
              return paymentMethod.id === payment_method_id;
            })[0] });
        }
      }).catch(function (error) {
        _this2.setLoading(false);
        _this2.setState({ servererror: true });
      });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      _windowOrGlobal2.default.addEventListener('resize', this.updateWindowDimensions);
      this.updateWindowDimensions();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _windowOrGlobal2.default.removeEventListener('resize', this.updateWindowDimensions);
    }
  }, {
    key: 'updateWindowDimensions',
    value: function updateWindowDimensions() {
      this.setState({ pageHeight: _windowOrGlobal2.default.innerHeight });
    }
  }, {
    key: 'render',
    value: function render() {

      return _react2.default.createElement(
        _react2.default.Fragment,
        null,
        this.state.notFound ? _react2.default.createElement(_reactRouterDom.Redirect, { to: '/notfound' }) : _react2.default.createElement(
          _react2.default.Fragment,
          null,
          this.state.servererror ? _react2.default.createElement(_ErrorPage2.default, _extends({}, this.props, { preferencesStore: this.props.preferencesStore, error: 'servererror' })) : _react2.default.createElement(
            'div',
            { className: 'activatePaymentPage', style: { background: '#c7c7c7', height: this.state.pageHeight } },
            _react2.default.createElement('div', { className: 'activatePaymentPageBackground', style: { background: this.state.paymentMethod.background ? this.state.paymentMethod.background : '#c7c7c7', opacity: this.state.paymentMethod.background ? '1' : '0' } }),
            _react2.default.createElement(
              'div',
              { className: 'activatePaymentPageConetent' },
              _react2.default.createElement(
                _react2.default.Fragment,
                null,
                this.state.loaderRotating ? _react2.default.createElement(
                  'div',
                  { style: { width: '110px', height: '110px', margin: 'auto', padding: '15px' } },
                  _react2.default.createElement(_loader.Loader, {
                    toggleAnimation: this.state.loading,
                    duration: 5,
                    animationData: _customLoaderStyle2.default
                  })
                ) : _react2.default.createElement(
                  'div',
                  { className: this.state.loaderRotating ? 'paymentSquarePlaceHolder' : 'paymentSquarePlaceHolderglow paymentSquarePlaceHolder', style: {} },
                  _react2.default.createElement(_Img2.default, { className: 'paymentMethodImage', src: this.state.paymentMethod.image, style: { width: '100%' } })
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'myOpacityTransition1 myHeightTransition1', style: { opacity: this.state.loaderRotating ? '0' : '1', maxHeight: this.state.loaderRotating ? '0' : '300px' } },
                  _react2.default.createElement('div', { style: { height: '30px' } }),
                  _react2.default.createElement(
                    'h4',
                    { className: 'activatePaymentMessage' },
                    this.state.paymentMethod.paragraph ? this.includebreaks(this.state.paymentMethod.paragraph) : ''
                  )
                )
              )
            )
          )
        )
      );
    }
  }]);

  return ActivatePayment;
}(_react.Component);

exports.default = ActivatePayment;

/***/ }),
/* 183 */
/***/ (function(module, exports) {

module.exports = [{"name":"knet","id":"1","image":"https://www.tap.company/websiteImages/paymentMethods/knet.svg","background":"linear-gradient(to bottom, rgba(10,114,184,1) 53%, rgba(130,202,250,1) 100%)","paragraph":{"en":"We have received your request to activate KNET,\nour team will contact you as soon as possible.","ar":"لقد تلقينا طلبك بتفعيل خدمة الكي نت،\nسيتم التواصل معكم في أقرب وقت ممكن."}},{"name":"visa","id":"3","image":"https://www.tap.company/websiteImages/paymentMethods/visa.svg","background":"linear-gradient(to bottom, rgba(10,71,146,1) 53%, rgba(56,146,255,1) 100%)","paragraph":{"en":"We have received your request to activate VISA,\nour team will contact you as soon as possible.","ar":"لقد تلقينا طلبك بتفعيل خدمة الفيزا،\nسيتم التواصل معكم في أقرب وقت ممكن."}},{"name":"mastercard","id":"4","image":"https://www.tap.company/websiteImages/paymentMethods/mastercard.svg","background":"linear-gradient(to bottom, rgba(227,4,30,1) 13%, rgba(227,4,30,1) 62%, rgba(227,4,30,1) 67%, rgba(249,179,28,1) 100%)","paragraph":{"en":"We have received your request to activate MasterCard,\nour team will contact you as soon as possible.","ar":"لقد تلقينا طلبك بتفعيل خدمة الماستر كارد،\nسيتم التواصل معكم في أقرب وقت ممكن."}},{"name":"amex","id":"10","image":"https://www.tap.company/websiteImages/paymentMethods/amex.svg","background":"linear-gradient(to bottom, rgba(1,119,169,1) 53%, rgba(33,190,252,1) 100%)","paragraph":{"en":"We have received your request to activate AMEX,\nour team will contact you as soon as possible.","ar":"لقد تلقينا طلبك بتفعيل خدمة أمريكان إكسبريس،\nسيتم التواصل معكم في أقرب وقت ممكن."}}]

/***/ }),
/* 184 */
/***/ (function(module, exports) {

module.exports = {"v":"5.2.1","fr":29.9700012207031,"ip":0,"op":300.00001221925,"w":120,"h":120,"nm":"Comp 1","ddd":0,"assets":[],"layers":[{"ddd":0,"ind":1,"ty":4,"nm":"Shape Layer 2","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":1,"k":[{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"n":["0p833_0p833_0p167_0p107"],"t":0,"s":[0],"e":[-1080]},{"t":299.00001217852}],"ix":10},"p":{"a":0,"k":[60,60,0],"ix":2},"a":{"a":0,"k":[6.808,3.603,0],"ix":1},"s":{"a":0,"k":[78.548,78.548,100],"ix":6}},"ao":0,"shapes":[{"ty":"gr","it":[{"d":3,"ty":"el","s":{"a":0,"k":[93.23,93.23],"ix":2},"p":{"a":0,"k":[6,2],"ix":3},"nm":"Ellipse Path 1","mn":"ADBE Vector Shape - Ellipse","hd":false},{"ty":"tm","s":{"a":0,"k":0,"ix":1},"e":{"a":1,"k":[{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"n":["0p833_0p833_0p167_0p107"],"t":0,"s":[100],"e":[5]},{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"n":["0p833_0p833_0p167_0p107"],"t":135,"s":[5],"e":[5]},{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"n":["0p833_0p833_0p167_0p107"],"t":165,"s":[5],"e":[100]},{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"n":["0p833_0p833_0p167_0p107"],"t":270,"s":[100],"e":[100]},{"t":299.00001217852}],"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim","hd":false},{"ty":"st","c":{"a":0,"k":[1,1,1,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":11,"ix":5},"lc":2,"lj":1,"ml":4,"ml2":{"a":0,"k":4,"ix":8},"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"fl","c":{"a":0,"k":[1,1,1,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":true},{"ty":"tr","p":{"a":0,"k":[0.5,1.5],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[105.13,105.13],"ix":3},"r":{"a":0,"k":-2520,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Ellipse 1","np":4,"cix":2,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":300.00001221925,"st":0,"bm":0},{"ddd":0,"ind":2,"ty":4,"nm":"Shape Layer 1","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":1,"k":[{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"n":["0p833_0p833_0p167_0p107"],"t":0,"s":[0],"e":[1080]},{"t":299.00001217852}],"ix":10,"x":"var $bm_rt;\n$bm_rt = transform.rotation;"},"p":{"a":0,"k":[60,60,0],"ix":2},"a":{"a":0,"k":[2.009,9.835,0],"ix":1},"s":{"a":0,"k":[118.698,118.698,100],"ix":6}},"ao":0,"shapes":[{"ty":"gr","it":[{"d":2,"ty":"el","s":{"a":0,"k":[93.23,93.23],"ix":2},"p":{"a":0,"k":[6,2],"ix":3},"nm":"Ellipse Path 1","mn":"ADBE Vector Shape - Ellipse","hd":false},{"ty":"tm","s":{"a":0,"k":0,"ix":1},"e":{"a":1,"k":[{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"n":["0p833_0p833_0p167_0p107"],"t":0,"s":[100],"e":[5]},{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"n":["0p833_0p833_0p167_0p107"],"t":135,"s":[5],"e":[5]},{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"n":["0p833_0p833_0p167_0p107"],"t":165,"s":[5],"e":[100]},{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"n":["0p833_0p833_0p167_0p107"],"t":270,"s":[100],"e":[100]},{"t":299.00001217852}],"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim","hd":false},{"ty":"st","c":{"a":0,"k":[1,1,1,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":8,"ix":5},"lc":2,"lj":1,"ml":4,"ml2":{"a":0,"k":4,"ix":8},"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"fl","c":{"a":0,"k":[1,1,1,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":true},{"ty":"tr","p":{"a":0,"k":[-3.842,7.884],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[97.52,97.52],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Ellipse 1","np":4,"cix":2,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":300.00001221925,"st":0,"bm":0}],"markers":[]}

/***/ }),
/* 185 */
/***/ (function(module, exports) {

module.exports = {"plans":[{"planName":"Start","planIcon":"https://www.tap.company/websiteImages/plans/start.svg"},{"planName":"Basic","planIcon":"https://www.tap.company/websiteImages/plans/basic.svg"},{"planName":"Advanced","planIcon":"https://www.tap.company/websiteImages/plans/advanced.svg"},{"planName":"Pro","planIcon":"https://www.tap.company/websiteImages/plans/pro.svg"}],"showMoreButtonText":"show more","showLessButtonText":"show less","subscribeButtonText":"Subscribe Now","planPricing":[{"priceType":"monthly","PriceTitle":{"Start":"Free","Basic":"KD 15.00 /month","Advanced":"KD 25.00 /month","Pro":"KD 50.00 /month"},"priceDescription":{"Start":"0","Basic":"KD 180.00 billed yearly","Advanced":"KD 300.00 billed yearly","Pro":"KD 600.00 billed yearly"}},{"priceType":"annually","PriceTitle":{"Start":"Free","Basic":"KD 150.00 /year","Advanced":"KD 250.00 /year","Pro":"KD 500.00 /year"},"priceDescription":{"Start":"0","Basic":"2 months complimentary","Advanced":"2 months complimentary","Pro":"2 months complimentary"}}],"planFeatures":[{"mainFeature":"true","featureName":"Bills","featureValue":{"Start":"30","Basic":"150","Advanced":"500","Pro":"1,000"},"featureSubValue":{"Start":"Bills per Month\n\n150 Fils\non Additional Bills","Basic":"Bills per Month\n\n150 Fils\non Additional Bills","Advanced":"Bills per Month\n\n150 Fils\non Additional Bills","Pro":"Bills per Month\n\n150 Fils\non Additional Bills"}},{"mainFeature":"true","featureName":"Users","featureValue":{"Start":"1","Basic":"5","Advanced":"10","Pro":"25"},"featureSubValue":{"Start":"Users\n\nKD 3.000\nAdditional User / Month","Basic":"Users\n\nKD 3.000\nAdditional User / Month","Advanced":"Users\n\nKD 3.000\nAdditional User / Month","Pro":"Users\n\nKD 3.000\nAdditional User / Month"}},{"featureName":"Payments","featureValue":{"Start":"","Basic":"","Advanced":"","Pro":""},"subFeatures":[{"featureName":"Local Debit Cards","featureValue":{"Start":"2.75%","Basic":"2.50%","Advanced":"2.25%","Pro":"2.00%"},"featureSubValue":{"Start":"plus 100 Fils","Basic":"plus 100 Fils","Advanced":"plus 100 Fils","Pro":"plus 100 Fils"}},{"featureName":"Local Credit Cards","featureValue":{"Start":"3.75%","Basic":"3.50%","Advanced":"3.25%","Pro":"3.00%"},"featureSubValue":{"Start":"plus 100 Fils","Basic":"plus 100 Fils","Advanced":"plus 100 Fils","Pro":"plus 100 Fils"}},{"featureName":"Regional Cards","featureValue":{"Start":"3.75%","Basic":"3.50%","Advanced":"3.25%","Pro":"3.00%"},"featureSubValue":{"Start":"plus 100 Fils","Basic":"plus 100 Fils","Advanced":"plus 100 Fils","Pro":"plus 100 Fils"}},{"featureName":"Global Cards","featureValue":{"Start":"4.75%","Basic":"4.50%","Advanced":"4.25%","Pro":"4.00%"},"featureSubValue":{"Start":"plus 100 Fils","Basic":"plus 100 Fils","Advanced":"plus 100 Fils","Pro":"plus 100 Fils"}}]},{"featureName":"Send Bills","featureValue":{"Start":"","Basic":"","Advanced":"","Pro":""},"subFeatures":[{"featureName":"Share a Bill","featureValue":{"Start":"true","Basic":"true","Advanced":"true","Pro":"true"}},{"featureName":"Discounts","featureValue":{"Start":"true","Basic":"true","Advanced":"true","Pro":"true"}},{"featureName":"Select from Contacts","featureValue":{"Start":"true","Basic":"true","Advanced":"true","Pro":"true"}},{"featureName":"Copy a Bill’s Link","featureValue":{"Start":"true","Basic":"true","Advanced":"true","Pro":"true"}},{"featureName":"Send Bills Abroad","featureValue":{"Start":"false","Basic":"true","Advanced":"true","Pro":"true"}},{"featureName":"Multi-Currency","featureValue":{"Start":"false","Basic":"true","Advanced":"true","Pro":"true"}},{"featureName":"Bill Breakdown","featureValue":{"Start":"false","Basic":"true","Advanced":"true","Pro":"true"}},{"featureName":"Save a Bill","featureValue":{"Start":"false","Basic":"true","Advanced":"true","Pro":"true"}},{"featureName":"Schedule a Bill","featureValue":{"Start":"false","Basic":"true","Advanced":"true","Pro":"true"}},{"featureName":"Repeat a Bill","featureValue":{"Start":"false","Basic":"true","Advanced":"true","Pro":"true"}}]},{"featureName":"Manage Bills","featureValue":{"Start":"","Basic":"","Advanced":"","Pro":""},"subFeatures":[{"featureName":"Pending Bills","featureValue":{"Start":"true","Basic":"true","Advanced":"true","Pro":"true"}},{"featureName":"Tracking Bills","featureValue":{"Start":"true","Basic":"true","Advanced":"true","Pro":"true"}},{"featureName":"Duplicate a Bill","featureValue":{"Start":"true","Basic":"true","Advanced":"true","Pro":"true"}},{"featureName":"Send Reminders","featureValue":{"Start":"3","Basic":"Unlimited","Advanced":"Unlimited","Pro":"Unlimited"}},{"featureName":"My Payments","featureValue":{"Start":"true","Basic":"true","Advanced":"true","Pro":"true"}},{"featureName":"Receipts","featureValue":{"Start":"true","Basic":"true","Advanced":"true","Pro":"true"}},{"featureName":"Cancel a Bill","featureValue":{"Start":"true","Basic":"true","Advanced":"true","Pro":"true"}},{"featureName":"Refund a Bill","featureValue":{"Start":"true","Basic":"true","Advanced":"true","Pro":"true"}},{"featureName":"Search","featureValue":{"Start":"true","Basic":"true","Advanced":"true","Pro":"true"}},{"featureName":"View a Bill","featureValue":{"Start":"true","Basic":"true","Advanced":"true","Pro":"true"}}]},{"featureName":"Items","featureValue":{"Start":"","Basic":"","Advanced":"","Pro":""},"subFeatures":[{"featureName":"Saved Items","featureValue":{"Start":"5","Basic":"Unlimited","Advanced":"Unlimited","Pro":"Unlimited"}},{"featureName":"Inventory","featureValue":{"Start":"false","Basic":"true","Advanced":"true","Pro":"true"}}]},{"featureName":"App Features","featureValue":{"Start":"","Basic":"","Advanced":"","Pro":""},"subFeatures":[{"featureName":"Dashboard","featureValue":{"Start":"true","Basic":"true","Advanced":"true","Pro":"true"}},{"featureName":"Quick Actions","featureValue":{"Start":"true","Basic":"true","Advanced":"true","Pro":"true"}},{"featureName":"Instagram Integration","featureValue":{"Start":"true","Basic":"true","Advanced":"true","Pro":"true"}},{"featureName":"Touch ID","featureValue":{"Start":"true","Basic":"true","Advanced":"true","Pro":"true"}},{"featureName":"Face ID","featureValue":{"Start":"true","Basic":"true","Advanced":"true","Pro":"true"}},{"featureName":"In App Chat","featureValue":{"Start":"true","Basic":"true","Advanced":"true","Pro":"true"}},{"featureName":"Multiple Account Sign-In","featureValue":{"Start":"true","Basic":"true","Advanced":"true","Pro":"true"}},{"featureName":"Account Settings","featureValue":{"Start":"true","Basic":"true","Advanced":"true","Pro":"true"}}]},{"featureName":"Security","featureValue":{"Start":"","Basic":"","Advanced":"","Pro":""},"subFeatures":[{"featureName":"Risk","featureValue":{"Start":"true","Basic":"true","Advanced":"true","Pro":"true"}},{"featureName":"Protection","featureValue":{"Start":"true","Basic":"true","Advanced":"true","Pro":"true"}}]},{"featureName":"API Integration","featureValue":{"Start":"","Basic":"","Advanced":"","Pro":""},"subFeatures":[{"featureName":"Send a Bill","featureValue":{"Start":"false","Basic":"true","Advanced":"true","Pro":"true"}},{"featureName":"Check a Bill","featureValue":{"Start":"false","Basic":"true","Advanced":"true","Pro":"true"}},{"featureName":"Check on a List of Bills","featureValue":{"Start":"false","Basic":"true","Advanced":"true","Pro":"true"}}]},{"featureName":"Support","featureValue":{"Start":"","Basic":"","Advanced":"","Pro":""},"subFeatures":[{"featureName":"Online Chat","featureValue":{"Start":"Within 24 hours","Basic":"Within 3 hours","Advanced":"Wtihin 1 hour","Pro":"Instant"},"featureSubValue":{"Start":"Response Time ","Basic":"Response Time","Advanced":"Response Time","Pro":"Response Time"}},{"featureName":"Phone","featureValue":{"Start":"-","Basic":"9am to 6pm","Advanced":"9am to 12pm","Pro":"24 Hours"}},{"featureName":"Dedicated Officer","featureValue":{"Start":"-","Basic":"-","Advanced":"true","Pro":"true"}}]},{"featureName":"Settlement","featureValue":{"Start":"","Basic":"","Advanced":"","Pro":""},"subFeatures":[{"featureName":"Local Debit Cards","featureValue":{"Start":"3 Days","Basic":"3 Days","Advanced":"3 Days","Pro":"3 Days"}},{"featureName":"Local Credit Cards","featureValue":{"Start":"5 Days","Basic":"5 Days","Advanced":"5 Days","Pro":"5 Days"}},{"featureName":"Regional Cards","featureValue":{"Start":"5 Days","Basic":"5 Days","Advanced":"5 Days","Pro":"5 Days"}},{"featureName":"Global Cards","featureValue":{"Start":"5 Days","Basic":"5 Days","Advanced":"5 Days","Pro":"5 Days"}}]},{"featureName":"Refunds","featureValue":{"Start":"","Basic":"","Advanced":"","Pro":""},"subFeatures":[{"featureName":"Local Debit Cards","featureValue":{"Start":"Refund Fee(s)\nare equivalent to\nTransaction Fee(s)","Basic":"Refund Fee(s)\nare equivalent to\nTransaction Fee(s)","Advanced":"Refund Fee(s)\nare equivalent to\nTransaction Fee(s)","Pro":"Refund Fee(s)\nare equivalent to\nTransaction Fee(s)"}},{"featureName":"Local Credit Cards","featureValue":{"Start":"Refund Fee(s)\nare equivalent to\nTransaction Fee(s)","Basic":"Refund Fee(s)\nare equivalent to\nTransaction Fee(s)","Advanced":"Refund Fee(s)\nare equivalent to\nTransaction Fee(s)","Pro":"Refund Fee(s)\nare equivalent to\nTransaction Fee(s)"}},{"featureName":"Regional Cards","featureValue":{"Start":"Refund Fee(s)\nare equivalent to\nTransaction Fee(s)","Basic":"Refund Fee(s)\nare equivalent to\nTransaction Fee(s)","Advanced":"Refund Fee(s)\nare equivalent to\nTransaction Fee(s)","Pro":"Refund Fee(s)\nare equivalent to\nTransaction Fee(s)"}},{"featureName":"Global Cards","featureValue":{"Start":"Refund Fee(s)\nare equivalent to\nTransaction Fee(s)","Basic":"Refund Fee(s)\nare equivalent to\nTransaction Fee(s)","Advanced":"Refund Fee(s)\nare equivalent to\nTransaction Fee(s)","Pro":"Refund Fee(s)\nare equivalent to\nTransaction Fee(s)"}}]},{"featureName":"Commitment","featureValue":{"Start":"12 Months","Basic":"12 Months","Advanced":"12 Months","Pro":"12 Months"},"featureSubValue":{"Start":"No financial commitment during the commitment period even with any cancellation prior to the end of the commited period","Basic":"No financial commitment during the commitment period even with any cancellation prior to the end of the commited period","Advanced":"No financial commitment during the commitment period even with any cancellation prior to the end of the commited period","Pro":"No financial commitment during the commitment period even with any cancellation prior to the end of the commited period"}}]}

/***/ }),
/* 186 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchPopularRepos = fetchPopularRepos;

var _isomorphicFetch = __webpack_require__(187);

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function fetchPopularRepos() {
  var language = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'all';

  var encodedURI = encodeURI('https://api.github.com/search/repositories?q=stars:>1+language:' + language + '&sort=stars&order=desc&type=Repositories');

  return (0, _isomorphicFetch2.default)(encodedURI).then(function (data) {
    return data.json();
  }).then(function (repos) {
    return repos.items;
  }).catch(function (error) {
    console.warn(error);
    return null;
  });
}

/***/ }),
/* 187 */
/***/ (function(module, exports) {

module.exports = require("isomorphic-fetch");

/***/ }),
/* 188 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Navbar;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Navbar() {
  var languages = [{
    name: 'All',
    param: 'all'
  }, {
    name: 'JavaScript',
    param: 'javascript'
  }, {
    name: 'Ruby',
    param: 'ruby'
  }, {
    name: 'Python',
    param: 'python'
  }, {
    name: 'Java',
    param: 'java'
  }];

  return _react2.default.createElement(
    'ul',
    null,
    languages.map(function (_ref) {
      var name = _ref.name,
          param = _ref.param;
      return _react2.default.createElement(
        'li',
        { key: param },
        _react2.default.createElement(
          _reactRouterDom.NavLink,
          { activeStyle: { fontWeight: 'bold' }, to: '/popular/' + param },
          name
        )
      );
    })
  );
}

/***/ }),
/* 189 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = NoMatch;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function NoMatch() {
  return _react2.default.createElement(
    'div',
    null,
    'Four Oh Four'
  );
}

/***/ }),
/* 190 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _Img = __webpack_require__(3);

var _Img2 = _interopRequireDefault(_Img);

var _loader = __webpack_require__(24);

var _windowOrGlobal = __webpack_require__(5);

var _windowOrGlobal2 = _interopRequireDefault(_windowOrGlobal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MyLoader = function (_Component) {
  _inherits(MyLoader, _Component);

  function MyLoader(props) {
    _classCallCheck(this, MyLoader);

    var _this = _possibleConstructorReturn(this, (MyLoader.__proto__ || Object.getPrototypeOf(MyLoader)).call(this, props));

    _this.state = {
      pageHeight: ''
    };
    _this.updateWindowDimensions = _this.updateWindowDimensions.bind(_this);
    return _this;
  }

  _createClass(MyLoader, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      __webpack_require__(66);
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      _windowOrGlobal2.default.addEventListener('resize', this.updateWindowDimensions);
      this.updateWindowDimensions();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _windowOrGlobal2.default.removeEventListener('resize', this.updateWindowDimensions);
    }
  }, {
    key: 'updateWindowDimensions',
    value: function updateWindowDimensions() {
      this.setState({ pageHeight: _windowOrGlobal2.default.innerHeight });
    }
  }, {
    key: 'render',
    value: function render() {

      return _react2.default.createElement(
        'span',
        { className: 'loaderContainer fadeoutanimation', style: { height: this.state.pageHeight } },
        _react2.default.createElement(
          'div',
          { className: 'loaderImage' },
          _react2.default.createElement(_loader.Loader, {
            toggleAnimation: true,
            duration: 5
          })
        )
      );
    }
  }]);

  return MyLoader;
}(_react.Component);

exports.default = MyLoader;

/***/ }),
/* 191 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _mobxReact = __webpack_require__(7);

var _windowOrGlobal = __webpack_require__(5);

var _windowOrGlobal2 = _interopRequireDefault(_windowOrGlobal);

var _reactHelmet = __webpack_require__(192);

var _Header = __webpack_require__(193);

var _Header2 = _interopRequireDefault(_Header);

var _Footer = __webpack_require__(202);

var _Footer2 = _interopRequireDefault(_Footer);

var _leftMenuItems = __webpack_require__(210);

var _leftMenuItems2 = _interopRequireDefault(_leftMenuItems);

var _rightMenuItems = __webpack_require__(211);

var _rightMenuItems2 = _interopRequireDefault(_rightMenuItems);

var _footerMenus = __webpack_require__(212);

var _footerMenus2 = _interopRequireDefault(_footerMenus);

var _footerImages = __webpack_require__(213);

var _footerImages2 = _interopRequireDefault(_footerImages);

var _socialMedia = __webpack_require__(214);

var _socialMedia2 = _interopRequireDefault(_socialMedia);

var _languages = __webpack_require__(19);

var _languages2 = _interopRequireDefault(_languages);

var _rightsFooterMenu = __webpack_require__(215);

var _rightsFooterMenu2 = _interopRequireDefault(_rightsFooterMenu);

var _loginHeaderData = __webpack_require__(216);

var _loginHeaderData2 = _interopRequireDefault(_loginHeaderData);

var _metaTags = __webpack_require__(81);

var _metaTags2 = _interopRequireDefault(_metaTags);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// import headful from 'headful';


var Page = function (_Component) {
  _inherits(Page, _Component);

  function Page(props) {
    _classCallCheck(this, Page);

    var _this = _possibleConstructorReturn(this, (Page.__proto__ || Object.getPrototypeOf(Page)).call(this, props));

    _this.state = {
      open: 'lightBox'
    };
    return _this;
  }

  _createClass(Page, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      __webpack_require__(54)("./" + this.props.preferencesStore.language + '.css');
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      __webpack_require__(67);
      var preferencesStore = this.props.preferencesStore;
      preferencesStore.setLanguage(this.props.language);
      preferencesStore.setCountryCode(this.props.country);
      preferencesStore.filterJsonStringsBasedOnLanguage(_leftMenuItems2.default);
      preferencesStore.filterJsonStringsBasedOnLanguage(_rightMenuItems2.default);
      preferencesStore.filterJsonStringsBasedOnLanguage(_footerMenus2.default);
      preferencesStore.filterJsonStringsBasedOnLanguage(_rightsFooterMenu2.default);
      preferencesStore.filterJsonStringsBasedOnLanguage(_loginHeaderData2.default);
      preferencesStore.filterJsonStringsBasedOnLanguage(_metaTags2.default);
      preferencesStore.filterMenuBasedOnCountry(_leftMenuItems2.default);
      preferencesStore.filterMenuBasedOnCountry(_rightMenuItems2.default);
      preferencesStore.filterMenusBasedOnCountry(_footerMenus2.default);
    }
  }, {
    key: 'includebreaks',
    value: function includebreaks(text) {
      return text.split("\n").map(function (text, key) {
        return _react2.default.createElement(
          'span',
          { key: key },
          text,
          _react2.default.createElement('br', null)
        );
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var preferencesStore = this.props.preferencesStore;
      return _react2.default.createElement(
        'div',
        { className: 'page' },
        this.props.metaTag ? _react2.default.createElement(
          _reactHelmet.Helmet,
          null,
          _react2.default.createElement('meta', { property: 'og:title', content: this.props.metaTag.title }),
          _react2.default.createElement('meta', { property: 'og:image', content: this.props.metaTag.image }),
          _react2.default.createElement('meta', { name: 'og:description', content: this.props.metaTag.description })
        ) : null,
        _react2.default.createElement(_Header2.default, {
          language: preferencesStore.language,
          leftMenuItems: _leftMenuItems2.default,
          rightMenuItems: _rightMenuItems2.default,
          loginHeaderData: _loginHeaderData2.default,
          headerSpacePC: this.props.headerSpacePC,
          headerSpaceMobile: this.props.headerSpaceMobile,
          noItemsHeader: this.props.noItemsHeader,
          page: this.props.page,
          product: this.props.product
        }),
        this.props.children,
        this.props.hideFooter ? null : _react2.default.createElement(_Footer2.default, {
          footerMenus: _footerMenus2.default,
          footerImages: _footerImages2.default,
          socialMedia: _socialMedia2.default,
          language: preferencesStore.language,
          languages: _languages2.default,
          country_code: preferencesStore.country_code,
          rightsFooterMenu: _rightsFooterMenu2.default,
          noItemsFooter: this.props.noItemsFooter,
          path: this.props.match.path
        })
      );
    }
  }]);

  return Page;
}(_react.Component);

exports.default = (0, _mobxReact.observer)(Page);

/***/ }),
/* 192 */
/***/ (function(module, exports) {

module.exports = require("react-helmet");

/***/ }),
/* 193 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _windowOrGlobal = __webpack_require__(5);

var _windowOrGlobal2 = _interopRequireDefault(_windowOrGlobal);

var _Logo = __webpack_require__(194);

var _Logo2 = _interopRequireDefault(_Logo);

var _HeaderMenu = __webpack_require__(196);

var _HeaderMenu2 = _interopRequireDefault(_HeaderMenu);

var _MobileIcon = __webpack_require__(198);

var _MobileIcon2 = _interopRequireDefault(_MobileIcon);

var _LoginHeader = __webpack_require__(200);

var _LoginHeader2 = _interopRequireDefault(_LoginHeader);

var _LoginStore = __webpack_require__(201);

var _LoginStore2 = _interopRequireDefault(_LoginStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Header = function (_Component) {
  _inherits(Header, _Component);

  function Header(props) {
    _classCallCheck(this, Header);

    var _this = _possibleConstructorReturn(this, (Header.__proto__ || Object.getPrototypeOf(Header)).call(this, props));

    _this.state = {
      headeClassName: 'navigationHeader',
      headerDivClassName: 'headerDiv',
      headerMenuClassName: 'headerMenu',
      leftMenuClassName: 'leftMenu',
      rightMenuClassName: 'rightMenu',
      mobileMenuClassName: 'mobileMenu'
    };
    _this.handleScroll = _this.handleScroll.bind(_this);
    _this.openCloseMenu = _this.openCloseMenu.bind(_this);
    return _this;
  }

  _createClass(Header, [{
    key: 'getBodyScrollTop',
    value: function getBodyScrollTop() {
      var el = document.scrollingElement || document.documentElement;
      return el.scrollTop;
    }
  }, {
    key: 'handleScroll',
    value: function handleScroll() {
      if (this.getBodyScrollTop() > 100) {
        this.setState({
          headeClassName: 'navigationHeader shrinked',
          headerMenuClassName: 'headerMenu shrinked'
        });
      } else {
        this.setState({
          headeClassName: 'navigationHeader',
          headerMenuClassName: 'headerMenu'
        });
      }
    }
  }, {
    key: 'openCloseMenu',
    value: function openCloseMenu() {
      if (this.state.mobileMenuClassName === 'mobileMenu') {
        this.setState({ mobileMenuClassName: 'mobileMenu active' });
      } else {
        this.setState({ mobileMenuClassName: 'mobileMenu' });
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _windowOrGlobal2.default.removeEventListener("scroll", this.handleScroll);
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      _windowOrGlobal2.default.addEventListener("scroll", this.handleScroll);
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      __webpack_require__(64);
    }
  }, {
    key: 'mergeTwoMenus',
    value: function mergeTwoMenus(itemsArray1, itemsArray2, menuType) {
      var arr = [];
      itemsArray1.map(function (item) {
        item.action && menuType === 'mobile' ? null : arr.push(item);
      });
      itemsArray2.map(function (item) {
        item.action && menuType === 'mobile' ? null : arr.push(item);
      });
      return arr;
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        this.props.headerSpacePC ? _react2.default.createElement('div', { className: 'hidden-xs', style: { height: '100px' } }) : null,
        this.props.headerSpaceMobile ? _react2.default.createElement('div', { className: 'visible-xs', style: { height: '60px' } }) : null,
        _react2.default.createElement(
          'div',
          { className: 'header' },
          _react2.default.createElement(
            'div',
            { className: 'container' },
            _react2.default.createElement(_LoginHeader2.default, {
              loginHeaderData: this.props.loginHeaderData,
              loginStore: _LoginStore2.default,
              language: this.props.language
            })
          ),
          _react2.default.createElement(
            'div',
            { className: this.state.headeClassName },
            _react2.default.createElement(
              'div',
              { className: 'container' },
              _react2.default.createElement(
                'div',
                { className: 'center' },
                !this.props.noItemsHeader ? _react2.default.createElement(_HeaderMenu2.default, {
                  className: this.state.headerDivClassName + ' ' + this.state.headerMenuClassName + ' ' + this.state.leftMenuClassName,
                  menuItems: this.props.leftMenuItems,
                  language: this.props.language,
                  page: this.props.page,
                  product: this.props.product
                }) : null,
                _react2.default.createElement(_Logo2.default, {
                  className: this.state.headerDivClassName,
                  language: this.props.language
                }),
                !this.props.noItemsHeader ? _react2.default.createElement(_MobileIcon2.default, {
                  onClick: this.openCloseMenu
                }) : null,
                !this.props.noItemsHeader ? _react2.default.createElement(_HeaderMenu2.default, {
                  loginStore: _LoginStore2.default,
                  className: this.state.headerDivClassName + ' ' + this.state.headerMenuClassName + ' ' + this.state.rightMenuClassName,
                  menuItems: this.props.rightMenuItems,
                  language: this.props.language,
                  page: this.props.page,
                  product: this.props.product
                }) : null
              )
            )
          )
        ),
        _react2.default.createElement(_HeaderMenu2.default, {
          mobileMenu: true,
          className: this.state.mobileMenuClassName,
          menuItems: this.mergeTwoMenus(this.props.leftMenuItems, this.props.rightMenuItems, 'mobile'),
          containerClass: 'container',
          language: this.props.language
        })
      );
    }
  }]);

  return Header;
}(_react.Component);

exports.default = Header;

/***/ }),
/* 194 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _logo = __webpack_require__(195);

var _logo2 = _interopRequireDefault(_logo);

var _reactRouterDom = __webpack_require__(4);

var _Img = __webpack_require__(3);

var _Img2 = _interopRequireDefault(_Img);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Logo = function (_Component) {
  _inherits(Logo, _Component);

  function Logo() {
    _classCallCheck(this, Logo);

    return _possibleConstructorReturn(this, (Logo.__proto__ || Object.getPrototypeOf(Logo)).apply(this, arguments));
  }

  _createClass(Logo, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: this.props.className + ' lgogDiv ' },
        _react2.default.createElement(
          _reactRouterDom.Link,
          { to: '/' + this.props.language },
          _react2.default.createElement(_Img2.default, { src: _logo2.default, className: 'logo' })
        )
      );
    }
  }]);

  return Logo;
}(_react.Component);

exports.default = Logo;

/***/ }),
/* 195 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "71ce318c49bc9ef06b204ae60bcbea8f.svg";

/***/ }),
/* 196 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _MenuItem = __webpack_require__(197);

var _MenuItem2 = _interopRequireDefault(_MenuItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HeaderMenu = function (_Component) {
  _inherits(HeaderMenu, _Component);

  function HeaderMenu() {
    _classCallCheck(this, HeaderMenu);

    return _possibleConstructorReturn(this, (HeaderMenu.__proto__ || Object.getPrototypeOf(HeaderMenu)).apply(this, arguments));
  }

  _createClass(HeaderMenu, [{
    key: 'menuItemsComponentsComposer',
    value: function menuItemsComponentsComposer(items) {
      var _this2 = this;

      return items.map(function (item, key) {
        return _react2.default.createElement(_MenuItem2.default, {
          itemkey: key,
          key: key,
          item: item,
          itemsLength: items.length,
          loginStore: _this2.props.loginStore,
          language: _this2.props.language,
          page: _this2.props.page,
          product: _this2.props.product
        });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: this.props.className },
        _react2.default.createElement(
          'div',
          { className: this.props.containerClass },
          this.menuItemsComponentsComposer(this.props.menuItems)
        )
      );
    }
  }]);

  return HeaderMenu;
}(_react.Component);

exports.default = HeaderMenu;

/***/ }),
/* 197 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MenuItem = function (_Component) {
  _inherits(MenuItem, _Component);

  function MenuItem() {
    _classCallCheck(this, MenuItem);

    return _possibleConstructorReturn(this, (MenuItem.__proto__ || Object.getPrototypeOf(MenuItem)).apply(this, arguments));
  }

  _createClass(MenuItem, [{
    key: 'handelClick',
    value: function handelClick() {
      this.props.item.action ? this.props.loginStore.closeOpenLoginHeader() : null;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        'span',
        null,
        this.props.itemkey === 0 ? null : _react2.default.createElement('div', { className: 'menuItemSpace' }),
        _react2.default.createElement(
          'div',
          { className: this.props.item.action ? 'menuItem hiddenOnMobileView' : 'menuItem', onClick: function onClick() {
              return _this2.handelClick();
            } },
          _react2.default.createElement(
            _reactRouterDom.Link,
            { to: this.props.item.link, className: this.props.item.slot && (this.props.page === this.props.item.slot || this.props.product === this.props.item.slot) ? 'activeMenuItem' : '' },
            this.props.item.title
          )
        ),
        this.props.itemkey === this.props.itemsLength - 1 ? null : _react2.default.createElement('div', { className: 'menuItemSpace' })
      );
    }
  }]);

  return MenuItem;
}(_react.Component);

exports.default = MenuItem;

/***/ }),
/* 198 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _menuIcon = __webpack_require__(199);

var _menuIcon2 = _interopRequireDefault(_menuIcon);

var _Img = __webpack_require__(3);

var _Img2 = _interopRequireDefault(_Img);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MobileIcon = function (_Component) {
  _inherits(MobileIcon, _Component);

  function MobileIcon(props) {
    _classCallCheck(this, MobileIcon);

    var _this = _possibleConstructorReturn(this, (MobileIcon.__proto__ || Object.getPrototypeOf(MobileIcon)).call(this, props));

    _this.state = {
      mobileMenuClassName: 'mobileMenu'
    };
    return _this;
  }

  _createClass(MobileIcon, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'mobileIcon', onClick: this.props.onClick },
        _react2.default.createElement(_Img2.default, { src: _menuIcon2.default, className: 'menuIcon' })
      );
    }
  }]);

  return MobileIcon;
}(_react.Component);

exports.default = MobileIcon;

/***/ }),
/* 199 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "e36b31cd6fea11afcea805093500bb7f.svg";

/***/ }),
/* 200 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _mobxReact = __webpack_require__(7);

var _TapInput = __webpack_require__(21);

var _TapInput2 = _interopRequireDefault(_TapInput);

var _TapButton = __webpack_require__(6);

var _TapButton2 = _interopRequireDefault(_TapButton);

var _LightBox = __webpack_require__(12);

var _LightBox2 = _interopRequireDefault(_LightBox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LoginHeader = function (_Component) {
    _inherits(LoginHeader, _Component);

    function LoginHeader(props) {
        _classCallCheck(this, LoginHeader);

        var _this = _possibleConstructorReturn(this, (LoginHeader.__proto__ || Object.getPrototypeOf(LoginHeader)).call(this, props));

        _this.state = {
            email: '',
            password: '',
            loading: false,
            openLightBox: false
        };
        _this.saveValue = _this.saveValue.bind(_this);
        return _this;
    }

    _createClass(LoginHeader, [{
        key: 'openLightBoxFunction',
        value: function openLightBoxFunction() {
            this.setState({
                openLightBox: true
            });
        }
    }, {
        key: 'closeLightBoxFunction',
        value: function closeLightBoxFunction() {
            this.setState({
                openLightBox: false
            });
        }
    }, {
        key: 'saveValue',
        value: function saveValue(event, inputType) {
            this.setState(_defineProperty({}, inputType, event.target.value));
        }
    }, {
        key: 'handleKeyPress',
        value: function handleKeyPress(event) {
            if (event.which === 13) {
                this.login();
            }
        }
    }, {
        key: 'login',
        value: function login() {
            this.setState({ loading: true });
            this.props.loginStore.clearResponse();
            this.props.loginStore.login(this.state.email, this.state.password);
            setTimeout(function () {
                if (this.props.loginStore.redirect_url !== '') {
                    window.location.href = this.props.loginStore.redirect_url;
                } else {
                    this.openLightBoxFunction();
                }
                this.setState({ loading: false });
            }.bind(this), 2200);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            return _react2.default.createElement(
                'div',
                { className: "loginHeader " + this.props.loginStore.loginHeaderState },
                _react2.default.createElement(
                    'div',
                    { className: 'loginHeaderContainer' },
                    _react2.default.createElement(
                        'div',
                        { className: 'loginHeaderSide1' },
                        this.props.loginHeaderData.inputsPlaceholders.map(function (item, key) {
                            return _react2.default.createElement(
                                'span',
                                { key: key },
                                _react2.default.createElement(_TapInput2.default, {
                                    placeholder: item.placeholder,
                                    style: { width: '24.5%' },
                                    type: item.type,
                                    onChange: function onChange(e) {
                                        return _this2.saveValue(e, item.type);
                                    },
                                    onKeyPress: function onKeyPress(e) {
                                        return _this2.handleKeyPress(e);
                                    }
                                }),
                                _react2.default.createElement('div', { className: 'fieldsSpace' })
                            );
                        }),
                        this.props.loginHeaderData.buttonsTexts.map(function (item, key) {
                            return _react2.default.createElement(_TapButton2.default, {
                                key: key,
                                style: { width: '12%' },
                                shape: 'bordered',
                                text: item.text,
                                loading: _this2.state.loading,
                                onClick: function onClick() {
                                    return _this2.login();
                                }
                            });
                        }),
                        this.props.loginHeaderData.links.map(function (item, key) {
                            return _react2.default.createElement(
                                _react2.default.Fragment,
                                { key: key },
                                _react2.default.createElement('div', { style: { width: '2.3%', display: 'inline-block' } }),
                                _react2.default.createElement(
                                    'a',
                                    {
                                        href: item.link.indexOf('register') > -1 ? 'https://www.tap.company/' + item.link + '/?lang=' + _this2.props.language : 'https://www.tap.company/' + _this2.props.language + '/' + item.link,
                                        className: 'loginLink' },
                                    item.linkText
                                )
                            );
                        })
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'loginHeaderSide2' },
                        _react2.default.createElement('i', {
                            className: 'far fa-times-circle closeLoginHeader',
                            onClick: function onClick() {
                                return _this2.props.loginStore.closeOpenLoginHeader();
                            } })
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: "modal fade", id: 'exampleModal', tabIndex: '', role: 'dialog', 'aria-labelledby': 'exampleModalLabel', 'aria-hidden': 'true' },
                    _react2.default.createElement(
                        'div',
                        { className: 'modal-dialog', role: 'document' },
                        _react2.default.createElement(
                            'div',
                            { className: 'modal-content' },
                            _react2.default.createElement(
                                'div',
                                { className: 'modal-body' },
                                _react2.default.createElement(
                                    'button',
                                    { type: 'button', className: 'close', 'data-dismiss': 'modal' },
                                    '\xD7'
                                ),
                                this.props.loginStore.response_message
                            )
                        )
                    )
                ),
                _react2.default.createElement(
                    _LightBox2.default,
                    {
                        open: this.state.openLightBox,
                        onClick: function onClick() {
                            return _this2.closeLightBoxFunction();
                        },
                        dialogueBoxStyle: { color: '#000', width: '400px' }
                    },
                    this.props.loginStore.response_message
                )
            );
        }
    }]);

    return LoginHeader;
}(_react.Component);

exports.default = (0, _mobxReact.observer)(LoginHeader);

/***/ }),
/* 201 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _mobx = __webpack_require__(22);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LoginStore = function () {
  function LoginStore() {
    _classCallCheck(this, LoginStore);

    this.loginHeaderState = 'closed';
    this.response_code = '';
    this.response_message = '';
    this.redirect_url = '';
  }

  _createClass(LoginStore, [{
    key: 'clearResponse',
    value: function clearResponse() {
      this.response_code = '';
      this.response_message = '';
      this.redirect_url = '';
    }
  }, {
    key: 'closeOpenLoginHeader',
    value: function closeOpenLoginHeader() {
      this.loginHeaderState === 'closed' ? this.loginHeaderState = 'opened' : this.loginHeaderState = 'closed';
    }
  }, {
    key: 'login',
    value: function login(email_address, password) {
      var mypostrequest = new XMLHttpRequest();
      var this_ = this;
      mypostrequest.open("POST", "https://partners.payments.tap.company/api/v1.3/api/Account/Login", true);
      mypostrequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      mypostrequest.send('email_address=' + email_address + '&password=' + password);
      mypostrequest.onreadystatechange = function () {
        if (mypostrequest.readyState === 4) {
          if (mypostrequest.status === 200 || window.location.href.indexOf("http") === -1) {
            this_.response_code = JSON.parse(mypostrequest.responseText).response_code;
            this_.response_message = JSON.parse(mypostrequest.responseText).response_message;
            this_.redirect_url = JSON.parse(mypostrequest.responseText).redirect_url;
          } else {
            //alert("An error has occured making the request");
          }
        }
      };
    }
  }]);

  return LoginStore;
}();

(0, _mobx.decorate)(LoginStore, {
  loginHeaderState: _mobx.observable,
  response_code: _mobx.observable,
  response_message: _mobx.observable,
  redirect_url: _mobx.observable
});

var loginStore = new LoginStore();
exports.default = loginStore;

/***/ }),
/* 202 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _FooterMenus = __webpack_require__(203);

var _FooterMenus2 = _interopRequireDefault(_FooterMenus);

var _FooterImages = __webpack_require__(205);

var _FooterImages2 = _interopRequireDefault(_FooterImages);

var _SocialMedia = __webpack_require__(206);

var _SocialMedia2 = _interopRequireDefault(_SocialMedia);

var _LanguageSwitcher = __webpack_require__(207);

var _LanguageSwitcher2 = _interopRequireDefault(_LanguageSwitcher);

var _CountrySwitcher = __webpack_require__(208);

var _CountrySwitcher2 = _interopRequireDefault(_CountrySwitcher);

var _RightsFooterMenu = __webpack_require__(209);

var _RightsFooterMenu2 = _interopRequireDefault(_RightsFooterMenu);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Footer = function (_Component) {
  _inherits(Footer, _Component);

  function Footer(props) {
    _classCallCheck(this, Footer);

    var _this = _possibleConstructorReturn(this, (Footer.__proto__ || Object.getPrototypeOf(Footer)).call(this, props));

    _this.state = {
      firstSide: 'leftSide',
      secondSide: 'rightSide'
    };
    return _this;
  }

  _createClass(Footer, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      __webpack_require__(62);
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.language === 'ar') {
        this.setState({
          firstSide: 'rightSide',
          secondSide: 'leftSide'
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {

      return _react2.default.createElement(
        _react2.default.Fragment,
        null,
        _react2.default.createElement(
          'div',
          { className: 'footer' },
          !this.props.noItemsFooter ? _react2.default.createElement(
            'div',
            { className: 'footerFirstSection' },
            _react2.default.createElement(
              'div',
              { className: 'container' },
              _react2.default.createElement(
                'div',
                { className: this.state.firstSide + ' menusSide' },
                _react2.default.createElement(_FooterMenus2.default, { footerMenus: this.props.footerMenus, language: this.props.language })
              ),
              _react2.default.createElement(
                'div',
                { className: this.state.secondSide + ' imagesSide' },
                _react2.default.createElement(_FooterImages2.default, { footerImages: this.props.footerImages })
              )
            )
          ) : null,
          _react2.default.createElement(
            'div',
            { className: 'footerSecondSection', style: { border: this.props.noItemsFooter ? 'none' : '' } },
            _react2.default.createElement(
              'div',
              { className: 'container' },
              _react2.default.createElement(
                'div',
                { className: this.state.secondSide },
                _react2.default.createElement(_CountrySwitcher2.default, {
                  country_code: this.props.country_code,
                  language: this.props.language
                }),
                _react2.default.createElement(_LanguageSwitcher2.default, {
                  language: this.props.language,
                  languages: this.props.languages,
                  changeLanguage: this.props.changeLanguage,
                  path: this.props.path
                }),
                _react2.default.createElement(_SocialMedia2.default, { socialMedia: this.props.socialMedia })
              ),
              _react2.default.createElement(
                'div',
                { className: this.state.firstSide },
                _react2.default.createElement(_RightsFooterMenu2.default, {
                  rightsFooterMenu: this.props.rightsFooterMenu,
                  language: this.props.language
                })
              )
            )
          )
        )
      );
    }
  }]);

  return Footer;
}(_react.Component);

exports.default = Footer;

/***/ }),
/* 203 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _FooterMenu = __webpack_require__(204);

var _FooterMenu2 = _interopRequireDefault(_FooterMenu);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FooterMenus = function (_Component) {
  _inherits(FooterMenus, _Component);

  function FooterMenus() {
    _classCallCheck(this, FooterMenus);

    return _possibleConstructorReturn(this, (FooterMenus.__proto__ || Object.getPrototypeOf(FooterMenus)).apply(this, arguments));
  }

  _createClass(FooterMenus, [{
    key: 'menuItemsComponentsComposer',
    value: function menuItemsComponentsComposer(items) {
      var _this2 = this;

      return items.map(function (obj, key) {
        return _react2.default.createElement(_FooterMenu2.default, { key: key, title: obj.title, items: obj.items, language: _this2.props.language });
      });
    }
  }, {
    key: 'render',
    value: function render() {

      return _react2.default.createElement(
        'div',
        { className: 'footerMenus' },
        this.menuItemsComponentsComposer(this.props.footerMenus)
      );
    }
  }]);

  return FooterMenus;
}(_react.Component);

exports.default = FooterMenus;

/***/ }),
/* 204 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FooterMenu = function (_Component) {
  _inherits(FooterMenu, _Component);

  function FooterMenu(props) {
    _classCallCheck(this, FooterMenu);

    var _this = _possibleConstructorReturn(this, (FooterMenu.__proto__ || Object.getPrototypeOf(FooterMenu)).call(this, props));

    _this.state = {
      openCloseIcon: 'plus',
      active: ''
    };
    return _this;
  }

  _createClass(FooterMenu, [{
    key: 'openCloseMenu',
    value: function openCloseMenu() {
      if (this.state.openCloseIcon === 'plus') {
        this.setState({
          openCloseIcon: 'minus',
          active: 'active'
        });
      } else if (this.state.openCloseIcon === 'minus') {
        this.setState({
          openCloseIcon: 'plus',
          active: ''
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        'div',
        { className: 'footerMenu' },
        _react2.default.createElement(
          'div',
          { className: 'footerMenuTitle', onClick: function onClick() {
              return _this2.openCloseMenu();
            } },
          _react2.default.createElement(
            'div',
            { className: 'MenuTitleText' },
            _react2.default.createElement(
              'b',
              null,
              this.props.title
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'MenuTitleIcon' },
            _react2.default.createElement('i', { className: "fab fa fa-" + this.state.openCloseIcon + " fa-xs" })
          )
        ),
        _react2.default.createElement(
          'ul',
          { className: "footerMenuItems " + this.state.active },
          this.props.items.map(function (item, key) {
            return _react2.default.createElement(
              'li',
              { key: key },
              _react2.default.createElement(
                _reactRouterDom.Link,
                { to: item.link, className: 'footerLink' },
                item.title
              )
            );
          })
        )
      );
    }
  }]);

  return FooterMenu;
}(_react.Component);

exports.default = FooterMenu;

/***/ }),
/* 205 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _Img = __webpack_require__(3);

var _Img2 = _interopRequireDefault(_Img);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FooterImages = function (_Component) {
  _inherits(FooterImages, _Component);

  function FooterImages() {
    _classCallCheck(this, FooterImages);

    return _possibleConstructorReturn(this, (FooterImages.__proto__ || Object.getPrototypeOf(FooterImages)).apply(this, arguments));
  }

  _createClass(FooterImages, [{
    key: 'imagesComposer',
    value: function imagesComposer(images) {
      var returnValue = [];
      if (images.appsStores) {
        returnValue.push(images.appsStores.map(function (image, key) {
          return _react2.default.createElement(
            _react2.default.Fragment,
            { key: key },
            _react2.default.createElement('div', { className: 'imageSpace' }),
            _react2.default.createElement(_Img2.default, { className: 'footerImage appsStores', src: image })
          );
        }));
        returnValue.push(_react2.default.createElement(
          'div',
          { key: 'space1' },
          _react2.default.createElement('br', null)
        ));
      }
      if (images.paymnetMethods) {
        returnValue.push(images.paymnetMethods.map(function (image, key) {
          return _react2.default.createElement(
            _react2.default.Fragment,
            { key: key },
            _react2.default.createElement('div', { className: 'imageSpace' }),
            _react2.default.createElement(_Img2.default, { className: 'footerImage paymnetMethods', src: image })
          );
        }));
        returnValue.push(_react2.default.createElement(
          'div',
          { key: 'space2' },
          _react2.default.createElement('br', null)
        ));
      }
      if (images.securityMethods) {
        returnValue.push(images.securityMethods.map(function (image, key) {
          return _react2.default.createElement(
            _react2.default.Fragment,
            { key: key },
            _react2.default.createElement('div', { className: 'imageSpace' }),
            _react2.default.createElement(_Img2.default, { className: 'footerImage securityMethods', src: image })
          );
        }));
      }
      return returnValue;
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'footerImages' },
        this.imagesComposer(this.props.footerImages)
      );
    }
  }]);

  return FooterImages;
}(_react.Component);

exports.default = FooterImages;

/***/ }),
/* 206 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SocialMedia = function (_Component) {
  _inherits(SocialMedia, _Component);

  function SocialMedia() {
    _classCallCheck(this, SocialMedia);

    return _possibleConstructorReturn(this, (SocialMedia.__proto__ || Object.getPrototypeOf(SocialMedia)).apply(this, arguments));
  }

  _createClass(SocialMedia, [{
    key: "menuItemsComponentsComposer",
    value: function menuItemsComponentsComposer(items) {
      return items.map(function (item, key) {
        return _react2.default.createElement(
          _react2.default.Fragment,
          { key: key },
          _react2.default.createElement("div", { className: "iconSpace" }),
          _react2.default.createElement(
            "a",
            { className: "socialMediaLink footerLink", href: item.link, target: "_blank" },
            _react2.default.createElement("i", { className: "fab " + item.fontAwesomeIcon + " fa-lg" })
          )
        );
      });
    }
  }, {
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "div",
        { className: "socialMedia" },
        this.menuItemsComponentsComposer(this.props.socialMedia)
      );
    }
  }]);

  return SocialMedia;
}(_react.Component);

exports.default = SocialMedia;

/***/ }),
/* 207 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LanguageSwitcher = function (_Component) {
  _inherits(LanguageSwitcher, _Component);

  function LanguageSwitcher() {
    _classCallCheck(this, LanguageSwitcher);

    return _possibleConstructorReturn(this, (LanguageSwitcher.__proto__ || Object.getPrototypeOf(LanguageSwitcher)).apply(this, arguments));
  }

  _createClass(LanguageSwitcher, [{
    key: 'changeLanguage',
    value: function changeLanguage(newLanguage, languages) {
      var url = this.props.path;
      var arr = url.split("/");
      var currentLanguage = void 0;
      arr.map(function (r) {
        languages.filter(function (language) {
          return language.shortName === r;
        })[0] ? currentLanguage = r : null;
      });
      url = url.replace('/' + currentLanguage, '/' + newLanguage);
      return url;
    }
  }, {
    key: 'composeLanguageSwitcher',
    value: function composeLanguageSwitcher(language, languages) {
      var _this2 = this;

      if (languages.length === 2) {
        var languageChoice = {};
        for (var i = languages.length - 1; i >= 0; i--) {

          if (languages[i].shortName !== language) {
            languageChoice = languages[i];
            break;
          }
        }
        return _react2.default.createElement(
          'a',
          { className: 'footerLink choice', href: this.changeLanguage(languageChoice.shortName, this.props.languages) },
          languageChoice.name
        );
      } else if (languages.length > 2) {
        var currentLanguage = languages.filter(function (oneLanguage, key) {
          return oneLanguage.shortName === language;
        });
        return _react2.default.createElement(
          'div',
          { className: 'dropdown-toggle choice', 'data-toggle': 'dropdown', 'aria-haspopup': 'true', 'aria-expanded': 'false' },
          currentLanguage[0].name,
          _react2.default.createElement(
            'div',
            { className: 'dropdown-menu fade' },
            languages.map(function (oneLanguage, key) {
              return oneLanguage !== currentLanguage[0] ? _react2.default.createElement(
                'div',
                { key: key },
                _react2.default.createElement(
                  'a',
                  { className: 'footerLink choice', href: _this2.changeLanguage(oneLanguage.shortName, _this2.props.languages) },
                  oneLanguage.name
                )
              ) : null;
            })
          )
        );
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'languageSwitcher' },
        this.composeLanguageSwitcher(this.props.language, this.props.languages)
      );
    }
  }]);

  return LanguageSwitcher;
}(_react.Component);

exports.default = LanguageSwitcher;

/***/ }),
/* 208 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _Img = __webpack_require__(3);

var _Img2 = _interopRequireDefault(_Img);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CountrySwitcher = function (_Component) {
  _inherits(CountrySwitcher, _Component);

  function CountrySwitcher(props) {
    _classCallCheck(this, CountrySwitcher);

    var _this = _possibleConstructorReturn(this, (CountrySwitcher.__proto__ || Object.getPrototypeOf(CountrySwitcher)).call(this, props));

    _this.state = {
      countries: [],
      marginTop: {},
      openMenu: false
    };
    _this.retriveCountries = _this.retriveCountries.bind(_this);
    _this.close = _this.close.bind(_this);
    return _this;
  }

  _createClass(CountrySwitcher, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      document.addEventListener('click', this.close, false);
      this.retriveCountries(this.props.language);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      document.removeEventListener('click', this.close, false);
    }
  }, {
    key: 'retriveCountries',
    value: function retriveCountries(language) {
      var _this2 = this;

      fetch('https://partners.payments.tap.company/api/v1.3/api/Country/GetCountries?language_code=' + language).then(function (results) {
        return results.json();
      }).then(function (data) {
        _this2.setState({
          'countries': data
        });
      });
    }
  }, {
    key: 'open',
    value: function open() {
      this.setState({ openMenu: true });
    }
  }, {
    key: 'close',
    value: function close(e) {
      if (e.target.id !== 'openMenuDiv') {
        this.setState({ openMenu: false });
      }
    }
  }, {
    key: 'countrySwitcherComposer',
    value: function countrySwitcherComposer(current_country_code, countries) {
      var _this3 = this;

      if (countries.length !== 0) {
        var currentCountry = countries.filter(function (country) {
          return country.country_code.toLowerCase() === current_country_code.toLowerCase();
        });
        return _react2.default.createElement(
          'div',
          { className: 'choice' },
          _react2.default.createElement(
            'div',
            { className: this.state.openMenu ? 'countryList openList' : 'countryList closeList' },
            countries.map(function (country, key) {
              return country !== currentCountry[0] ? _react2.default.createElement(
                'div',
                { className: 'countryListItems', key: key },
                _react2.default.createElement(
                  'span',
                  null,
                  _react2.default.createElement(_Img2.default, { className: 'countryFlag', src: country.country_flag_url }),
                  _react2.default.createElement('div', { className: 'flagSpace' })
                ),
                _react2.default.createElement(
                  'a',
                  { className: 'footerLink choice', href: '/' + country.country_code.toLowerCase() + '/' + _this3.props.language },
                  country.country_name_english
                )
              ) : null;
            })
          ),
          _react2.default.createElement(
            'span',
            { id: 'openMenuDiv', onClick: function onClick() {
                return _this3.open();
              } },
            _react2.default.createElement(
              'span',
              null,
              _react2.default.createElement(_Img2.default, { className: 'countryFlag', src: currentCountry[0].country_flag_url }),
              _react2.default.createElement('div', { className: 'flagSpace' })
            ),
            currentCountry[0].country_name_english
          )
        );
      }
    }
  }, {
    key: 'render',
    value: function render() {

      return _react2.default.createElement(
        'div',
        { className: 'countrySwitcher' },
        this.countrySwitcherComposer(this.props.country_code, this.state.countries)
      );
    }
  }]);

  return CountrySwitcher;
}(_react.Component);

exports.default = CountrySwitcher;

/***/ }),
/* 209 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RightsFooterMenu = function (_Component) {
  _inherits(RightsFooterMenu, _Component);

  function RightsFooterMenu() {
    _classCallCheck(this, RightsFooterMenu);

    return _possibleConstructorReturn(this, (RightsFooterMenu.__proto__ || Object.getPrototypeOf(RightsFooterMenu)).apply(this, arguments));
  }

  _createClass(RightsFooterMenu, [{
    key: 'composeMenu',
    value: function composeMenu(menu) {
      return menu.map(function (item, key) {
        return item.link ? _react2.default.createElement(
          'span',
          { key: key, className: 'secondFooterItem' },
          _react2.default.createElement(
            _reactRouterDom.Link,
            { className: 'footerLink', to: item.link },
            item.title
          ),
          _react2.default.createElement('div', { className: 'textSpace' })
        ) : _react2.default.createElement(
          'span',
          { key: key, className: 'secondFooterItem' },
          item.title,
          _react2.default.createElement('div', { className: 'textSpace' })
        );
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'rightsFooterMenu' },
        this.composeMenu(this.props.rightsFooterMenu)
      );
    }
  }]);

  return RightsFooterMenu;
}(_react.Component);

exports.default = RightsFooterMenu;

/***/ }),
/* 210 */
/***/ (function(module, exports) {

module.exports = [{"title":{"en":"Pay","ar":"دفع"},"link":"/pay","slot":"pay","type":"product"},{"title":{"en":"Sell","ar":"بيع"},"link":"/sell","slot":"sell","type":"product"},{"title":{"en":"Collect","ar":"تحصيل"},"link":"/collect","slot":"collect","type":"product"},{"title":{"en":"API","ar":"للمطورين"},"link":"/api","slot":"api","type":"page"}]

/***/ }),
/* 211 */
/***/ (function(module, exports) {

module.exports = [{"title":{"en":"Our Story","ar":"قصتنا"},"link":"/about","slot":"about","type":"page"},{"title":{"en":"Jobs","ar":"التوظيف"},"link":"/jobs","slot":"jobs","type":"page"},{"title":{"en":"Support","ar":"المساعدة"},"link":"/support","slot":"support","type":"page"},{"title":{"en":"Sign In","ar":"دخول"},"link":"#","action":true,"type":"action"}]

/***/ }),
/* 212 */
/***/ (function(module, exports) {

module.exports = [{"title":{"en":"For Users","ar":"للمستخدم"},"items":[{"type":"product","title":{"en":"Pay","ar":"دفع"},"slot":"pay","link":"/pay"}]},{"title":{"en":"For Business","ar":"للمتاجر وأصحاب الأعمال"},"items":[{"type":"product","title":{"en":"Sell","ar":"بيع"},"slot":"sell","link":"/sell"},{"type":"product","title":{"en":"Collect","ar":"تحصيل"},"slot":"collect","link":"/collect"}]},{"title":{"en":"For Developers","ar":"للمطورين"},"items":[{"type":"page","title":{"en":"eCommerce","ar":"التجارة الالكترونية"},"slot":"api","link":"/api"},{"type":"page","title":{"en":"Documentation","ar":"دليل المبرمجين"},"slot":"developers","link":"/developers"}]},{"title":{"en":"About Tap","ar":"عن تاپ"},"items":[{"type":"page","title":{"en":"Press Info","ar":"معلومات صحفية"},"link":"/"},{"type":"page","title":{"en":"Our Story","ar":"قصتنا"},"slot":"about","link":"/about"},{"type":"page","title":{"en":"Jobs","ar":"التوظيف"},"slot":"jobs","link":"/jobs"}]},{"title":{"en":"Help","ar":"للمساعدة"},"items":[{"type":"page","title":{"en":"Support","ar":"إتصل بنا"},"slot":"jobs","link":"/support"}]}]

/***/ }),
/* 213 */
/***/ (function(module, exports) {

module.exports = {"appsStores":["https://www.tap.company/websiteImages/footerImages/ios-black.svg","https://www.tap.company/websiteImages/footerImages/google-play-badge.svg"],"paymnetMethods":["https://www.tap.company/websiteImages/footerImages/all-payment-gray-NFC.svg"],"securityMethods":["https://www.tap.company/websiteImages/footerImages/Thawte-logo.svg","https://www.tap.company/websiteImages/footerImages/Mastercard-Secure.svg","https://www.tap.company/websiteImages/footerImages/Verified-Visa.svg","https://www.tap.company/websiteImages/footerImages/amex-SafeKey.svg"]}

/***/ }),
/* 214 */
/***/ (function(module, exports) {

module.exports = [{"name":"youtube","fontAwesomeIcon":"fa-youtube-square","link":"https://www.youtube.com/channel/UCGsG95ViQdDHIFijHUYRRjw"},{"name":"facebook","fontAwesomeIcon":"fa-facebook-square","link":"https://www.facebook.com/tappayments"},{"name":"twitter","fontAwesomeIcon":"fa-twitter-square","link":"http://www.twitter.com/gotapnow"},{"name":"linkedin","fontAwesomeIcon":"fa-linkedin","link":"http://www.linkedin.com/company/tap-payments"},{"name":"instagram","fontAwesomeIcon":"fa-instagram","link":"http://www.instagram.com/tappayments"}]

/***/ }),
/* 215 */
/***/ (function(module, exports) {

module.exports = [{"title":{"en":"Copyright © 2018 Tap Payments. All rights reserved.","ar":"جميع الحقوق محفوظة @ تاپ للدفع الإلكتروني"}},{"title":{"en":"Terms & Conditions","ar":"سياسة الإستخدام"},"link":"/terms-conditions"},{"title":{"en":"Privacy Policy","ar":"سياسة الخصوصية"},"link":"/privacy-policy"}]

/***/ }),
/* 216 */
/***/ (function(module, exports) {

module.exports = {"inputsPlaceholders":[{"type":"email","placeholder":{"en":"Email Address","ar":"البريد الإلكتروني"}},{"type":"password","placeholder":{"en":"Password","ar":"رمز المرور"}}],"buttonsTexts":[{"text":{"en":"Sign In","ar":"دخول"}}],"links":[{"link":"/forgot-password","linkText":{"en":"Forgot Password?","ar":"نسيت رمز المرور؟"}},{"link":"/register","linkText":{"en":"Sign Up","ar":"سجّل"}}]}

/***/ }),
/* 217 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _mobx = __webpack_require__(22);

var _products = __webpack_require__(25);

var _products2 = _interopRequireDefault(_products);

var _partners = __webpack_require__(26);

var _partners2 = _interopRequireDefault(_partners);

var _languages = __webpack_require__(19);

var _languages2 = _interopRequireDefault(_languages);

var _axios = __webpack_require__(17);

var _axios2 = _interopRequireDefault(_axios);

var _nodeFetch = __webpack_require__(37);

var _nodeFetch2 = _interopRequireDefault(_nodeFetch);

var _reactDom = __webpack_require__(11);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _windowOrGlobal = __webpack_require__(5);

var _windowOrGlobal2 = _interopRequireDefault(_windowOrGlobal);

var _iplocation = __webpack_require__(218);

var _iplocation2 = _interopRequireDefault(_iplocation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UserPreferencesStore = function () {
  function UserPreferencesStore() {
    _classCallCheck(this, UserPreferencesStore);

    this.language = 'en';
    this.productObj = {};
    this.partnerObj = {};
    this.country_code = '';
    this.getCurrentCountryLoading = true;
    this.getAvailableCountriesLoading = true;
    this.availableCountries = [];
    this.pageUrlKeys = {};
    this.intercomUser = {};
  }

  _createClass(UserPreferencesStore, [{
    key: 'filterJsonStringsBasedOnLanguage',
    value: function filterJsonStringsBasedOnLanguage(arr) {
      var _this = this;

      if (Array.isArray(arr)) {
        arr.map(function (obj) {
          if (obj.error_message) obj.error_message = obj.error_message[_this.language] ? obj.error_message[_this.language] : obj.error_message;return null;
        });
        arr.map(function (obj) {
          if (obj.title) obj.title = obj.title[_this.language] ? obj.title[_this.language] : obj.title;return null;
        });
        arr.map(function (obj) {
          if (obj.description) obj.description = obj.description[_this.language] ? obj.description[_this.language] : obj.description;return null;
        });
        arr.map(function (obj) {
          if (obj.keyWords) obj.keyWords = obj.keyWords[_this.language] ? obj.keyWords[_this.language] : obj.keyWords;return null;
        });
        arr.map(function (obj) {
          if (obj.paragraph) obj.paragraph = obj.paragraph[_this.language] ? obj.paragraph[_this.language] : obj.paragraph;return null;
        });
        arr.map(function (obj) {
          if (obj.subtitle) obj.subtitle = obj.subtitle[_this.language] ? obj.subtitle[_this.language] : obj.subtitle;return null;
        });
        arr.map(function (obj) {
          if (obj.statisticsTitle) obj.statisticsTitle = obj.statisticsTitle[_this.language] ? obj.statisticsTitle[_this.language] : obj.statisticsTitle;return null;
        });
        arr.map(function (obj) {
          if (obj.address) obj.address.addressTitle = obj.address.addressTitle[_this.language] ? obj.address.addressTitle[_this.language] : obj.address.addressTitle;return null;
        });
        arr.map(function (obj) {
          if (obj.address) obj.address.addressDetails = obj.address.addressDetails[_this.language] ? obj.address.addressDetails[_this.language] : obj.address.addressDetails;return null;
        });
        arr.map(function (obj) {
          if (obj.contentTitle) obj.contentTitle = obj.contentTitle[_this.language] ? obj.contentTitle[_this.language] : obj.contentTitle;return null;
        });
        arr.map(function (obj) {
          if (obj.businessName) obj.businessName = obj.businessName[_this.language] ? obj.businessName[_this.language] : obj.businessName;return null;
        });
        arr.map(function (obj) {
          if (obj.shortTitle) obj.shortTitle = obj.shortTitle[_this.language] ? obj.shortTitle[_this.language] : obj.shortTitle;return null;
        });
        arr.map(function (obj) {
          if (obj.actionTitle) obj.actionTitle = obj.actionTitle[_this.language] ? obj.actionTitle[_this.language] : obj.actionTitle;return null;
        });
        arr.map(function (obj) {
          if (obj.placeholder) obj.placeholder = obj.placeholder[_this.language] ? obj.placeholder[_this.language] : obj.placeholder;return null;
        });
        arr.map(function (obj) {
          if (obj.buttonText) obj.buttonText = obj.buttonText[_this.language] ? obj.buttonText[_this.language] : obj.buttonText;return null;
        });
        arr.map(function (obj) {
          if (obj.mobileMessage) obj.mobileMessage = obj.mobileMessage[_this.language] ? obj.mobileMessage[_this.language] : obj.mobileMessage;return null;
        });
        arr.map(function (obj) {
          if (obj.subImageContent && obj.subImageContent.buttonText) obj.subImageContent.buttonText = obj.subImageContent.buttonText[_this.language] ? obj.subImageContent.buttonText[_this.language] : obj.subImageContent.buttonText;return null;
        });
        arr.map(function (obj) {
          if (obj.subImageContent && obj.subImageContent.title) obj.subImageContent.title = obj.subImageContent.title[_this.language] ? obj.subImageContent.title[_this.language] : obj.subImageContent.title;return null;
        });
        arr.map(function (obj) {
          if (obj.subImageContent && obj.subImageContent.paragraph) obj.subImageContent.paragraph = obj.subImageContent.paragraph[_this.language] ? obj.subImageContent.paragraph[_this.language] : obj.subImageContent.paragraph;return null;
        });
        arr.map(function (obj) {
          if (obj.conclusion) obj.conclusion = obj.conclusion[_this.language] ? obj.conclusion[_this.language] : obj.conclusion;return null;
        });
        arr.map(function (obj) {
          if (obj.callToAction && obj.callToAction.title) obj.callToAction.title = obj.callToAction.title[_this.language] ? obj.callToAction.title[_this.language] : obj.callToAction.title;return null;
        });
        arr.map(function (obj) {
          if (obj.callToAction && obj.callToAction.paragraph) obj.callToAction.paragraph = obj.callToAction.paragraph[_this.language] ? obj.callToAction.paragraph[_this.language] : obj.callToAction.paragraph;return null;
        });
        arr.map(function (obj) {
          if (obj.callToAction && obj.callToAction.shortTitle) obj.callToAction.shortTitle = obj.callToAction.shortTitle[_this.language] ? obj.callToAction.shortTitle[_this.language] : obj.callToAction.shortTitle;return null;
        });
        arr.map(function (obj) {
          if (obj.callToAction && obj.callToAction.shortParagraph) obj.callToAction.shortParagraph = obj.callToAction.shortParagraph[_this.language] ? obj.callToAction.shortParagraph[_this.language] : obj.callToAction.shortParagraph;return null;
        });
        arr.map(function (obj) {
          if (obj.callToAction && obj.callToAction.buttonText) obj.callToAction.buttonText = obj.callToAction.buttonText[_this.language] ? obj.callToAction.buttonText[_this.language] : obj.callToAction.buttonText;return null;
        });
        arr.map(function (obj) {
          if (obj.successMessage) obj.successMessage = obj.successMessage[_this.language] ? obj.successMessage[_this.language] : obj.successMessage;return null;
        });
        arr.map(function (obj) {
          if (obj.successSubMessage) obj.successSubMessage = obj.successSubMessage[_this.language] ? obj.successSubMessage[_this.language] : obj.successSubMessage;return null;
        });
        arr.map(function (obj) {
          if (obj.linkText) obj.linkText = obj.linkText[_this.language] ? obj.linkText[_this.language] : obj.linkText;return null;
        });
        arr.map(function (obj) {
          if (obj.block) obj.block.subtitle = obj.block.subtitle[_this.language] ? obj.block.subtitle[_this.language] : obj.block.subtitle;return null;
        });
        arr.map(function (obj) {
          if (obj.intro) obj.intro = obj.intro[_this.language] ? obj.intro[_this.language] : obj.intro;return null;
        });
        arr.map(function (obj) {
          if (obj.subIntro) obj.subIntro = obj.subIntro[_this.language] ? obj.subIntro[_this.language] : obj.subIntro;return null;
        });
        arr.map(function (obj) {
          if (obj.items) {
            obj.items.map(function (obj) {
              if (obj.title) obj.title = obj.title[_this.language] ? obj.title[_this.language] : obj.title;return null;
            });return null;
          };return null;
        });
        arr.map(function (obj) {
          if (obj.categories) {
            obj.categories.map(function (obj) {
              if (obj.categoryName) {
                obj.categoryName = obj.categoryName[_this.language] ? obj.categoryName[_this.language] : obj.categoryName;
                obj.showMoreButtonText = obj.showMoreButtonText[_this.language] ? obj.showMoreButtonText[_this.language] : obj.showMoreButtonText;
                obj.showLessButtonText = obj.showLessButtonText[_this.language] ? obj.showLessButtonText[_this.language] : obj.showLessButtonText;
                obj.items.map(function (obj) {
                  if (obj.title) obj.title = obj.title[_this.language] ? obj.title[_this.language] : obj.title;
                  if (obj.subtitle) obj.subtitle = obj.subtitle[_this.language] ? obj.subtitle[_this.language] : obj.subtitle;
                  if (obj.description) obj.description = obj.description[_this.language] ? obj.description[_this.language] : obj.description;
                  return null;
                });
              };
              return null;
            });
          };return null;
        });

        arr.map(function (obj) {
          if (obj.features) {
            obj.features.map(function (obj) {
              if (obj.title && obj.title[_this.language]) {
                obj.title = obj.title[_this.language] ? obj.title[_this.language] : obj.title;
              }return null;
            });
            obj.features.map(function (obj) {
              if (obj.paragraph && obj.paragraph[_this.language]) {
                obj.paragraph = obj.paragraph[_this.language] ? obj.paragraph[_this.language] : obj.paragraph;
              }return null;
            });
          }
        });

        arr.map(function (obj) {
          if (obj.products && obj.products[0].block) {
            obj.products.map(function (obj) {
              if (obj.block.subtitle && obj.block.subtitle[_this.language]) {
                obj.block.subtitle = obj.block.subtitle[_this.language] ? obj.block.subtitle[_this.language] : obj.block.subtitle;
              }return null;
            });
          }
        });

        arr.map(function (obj) {
          if (obj.statistics) {
            obj.statistics.map(function (obj) {
              if (obj.finalText && obj.finalText[_this.language]) {
                obj.finalText = obj.finalText[_this.language] ? obj.finalText[_this.language] : obj.finalText;
              }return null;
            });
            obj.statistics.map(function (obj) {
              if (obj.description && obj.description[_this.language]) {
                obj.description = obj.description[_this.language] ? obj.description[_this.language] : obj.description;
              }return null;
            });
          }
        });

        arr.map(function (obj) {
          if (obj.apiFeatures) {
            obj.apiFeatures.map(function (obj) {
              if (obj.title && obj.title[_this.language]) {
                obj.title = obj.title[_this.language] ? obj.title[_this.language] : obj.title;
              }return null;
            });
            obj.apiFeatures.map(function (obj) {
              if (obj.description && obj.description[_this.language]) {
                obj.description = obj.description[_this.language] ? obj.description[_this.language] : obj.description;
              }return null;
            });
            obj.apiFeatures.map(function (obj) {
              if (obj.subtitle && obj.subtitle[_this.language]) {
                obj.subtitle = obj.subtitle[_this.language] ? obj.subtitle[_this.language] : obj.subtitle;
              }return null;
            });
            obj.apiFeatures.map(function (obj) {
              if (obj.readMoreText && obj.readMoreText[_this.language]) {
                obj.readMoreText = obj.readMoreText[_this.language] ? obj.readMoreText[_this.language] : obj.readMoreText;
              }return null;
            });
          }
        });

        arr.map(function (obj) {
          if (obj.testimonials) {
            obj.testimonials.map(function (obj) {
              if (obj.qoute) obj.qoute = obj.qoute[_this.language] ? obj.qoute[_this.language] : obj.qoute;return null;
            });
            obj.testimonials.map(function (obj) {
              if (obj.name) obj.name = obj.name[_this.language] ? obj.name[_this.language] : obj.name;return null;
            });
            obj.testimonials.map(function (obj) {
              if (obj.role) obj.role = obj.role[_this.language] ? obj.role[_this.language] : obj.role;return null;
            });
            obj.testimonials.map(function (obj) {
              if (obj.businessName) obj.businessName = obj.businessName[_this.language] ? obj.businessName[_this.language] : obj.businessName;return null;
            });
          }
        });

        arr.map(function (obj) {
          if (obj.content) {
            obj.content.map(function (obj) {
              if (obj.title && obj.title[_this.language]) {
                obj.title = obj.title[_this.language] ? obj.title[_this.language] : obj.title;
              }return null;
            });
            obj.content.map(function (obj) {
              if (obj.paragraph && obj.paragraph[_this.language]) {
                obj.paragraph = obj.paragraph[_this.language] ? obj.paragraph[_this.language] : obj.paragraph;
              }return null;
            });
            obj.content.map(function (obj) {
              if (obj.points) {
                obj.points.map(function (point) {
                  if (point.paragraph && point.paragraph[_this.language]) {
                    point.paragraph = point.paragraph[_this.language] ? point.paragraph[_this.language] : point.paragraph;
                  }return null;
                });
              }return null;
            });
          }
        });

        arr.map(function (obj) {
          if (obj.fields) {
            obj.fields.map(function (obj) {
              if (obj.title) {
                obj.title = obj.title[_this.language] ? obj.title[_this.language] : obj.title;
              }return null;
            });
            //obj.fields.map(obj => {if(obj.SelectValue) {obj.SelectValue = obj.SelectValue[this.language];} return null});
            obj.fields.map(function (obj) {
              if (obj.options) {
                obj.options.map(function (option) {
                  if (option.optionValue) {
                    option.optionValue = option.optionValue[_this.language] ? option.optionValue[_this.language] : option.optionValue;
                  }return null;
                });
              }return null;
            });
          }
        });
      } else {
        if (arr.title) {
          arr.title = arr.title[this.language] ? arr.title[this.language] : arr.title;
        }
        if (arr.intro) {
          arr.intro = arr.intro[this.language] ? arr.intro[this.language] : arr.intro;
        }
        if (arr.subIntro) {
          arr.subIntro = arr.subIntro[this.language] ? arr.subIntro[this.language] : arr.subIntro;
        }
        if (arr.inputsPlaceholders) {
          arr.inputsPlaceholders.map(function (obj) {
            if (obj.placeholder) obj.placeholder = obj.placeholder[_this.language] ? obj.placeholder[_this.language] : obj.placeholder;return null;
          });
        }
        if (arr.buttonsTexts) {
          arr.buttonsTexts.map(function (obj) {
            if (obj.text) obj.text = obj.text[_this.language] ? obj.text[_this.language] : obj.text;return null;
          });
        }
        if (arr.links) {
          arr.links.map(function (obj) {
            if (obj.linkText) obj.linkText = obj.linkText[_this.language] ? obj.linkText[_this.language] : obj.linkText;return null;
          });
        }
        if (arr.name) {
          arr.name = arr.name[this.language] ? arr.name[this.language] : arr.name;
        }
        if (arr.members) {
          arr.members.map(function (item) {
            item.name[_this.language] ? item.name = item.name[_this.language] : item.name;
            item.position[_this.language] ? item.position = item.position[_this.language] : item.position;
          });
        }
      }
    }
  }, {
    key: 'setIntercomeUser',
    value: function setIntercomeUser(user_id, email_address, profile_name) {
      this.intercomUser = {
        user_id: user_id,
        email: email_address,
        name: profile_name
      };
    }
  }, {
    key: 'saveUrlKeys',
    value: function saveUrlKeys(urlKeysString) {
      var _this2 = this;

      urlKeysString = urlKeysString.replace('?', '');
      var proccessKeys = urlKeysString.split('&');
      proccessKeys.map(function (proccessKey) {
        var key = proccessKey.split('=')[0];
        var vlaue = proccessKey.split('=')[1];
        _this2.pageUrlKeys[key] = vlaue;
      });
    }
  }, {
    key: 'getProducts',
    value: function getProducts() {
      var _this3 = this;

      var newProductsList = [];
      _products2.default.map(function (product, key) {
        if (product.countries.filter(function (country) {
          return country.toLowerCase() === _this3.country_code.toLowerCase();
        }).length !== 0) {
          newProductsList.push(product);
        }
      });
      return newProductsList;
    }
  }, {
    key: 'setCountryCode',
    value: function setCountryCode(country_code) {
      country_code ? this.country_code = country_code : null;
    }
  }, {
    key: 'setLanguage',
    value: function setLanguage(language) {
      language && _languages2.default.filter(function (lang) {
        return lang.slot === language;
      })[0] ? this.language = language : null;
      this.filterJsonStringsBasedOnLanguage(_products2.default);
      this.filterJsonStringsBasedOnLanguage(_partners2.default);
    }
  }, {
    key: 'getCurrentCountry',
    value: function getCurrentCountry() {
      var _this4 = this;

      // let _this = this;
      _axios2.default.get('https://api.ipify.org?format=jsonp&callback=').then(function (res) {
        var ip = eval(res.data).ip;
        (0, _iplocation2.default)(ip).then(function (res) {
          _this4.country_code = res.countryCode.toLowerCase();
          _this4.getCurrentCountryLoading = false;
        }).catch(function (err) {
          _this4.country_code = 'kw';
          _this4.getCurrentCountryLoading = false;
        });
      }).catch(function (err) {
        _this4.country_code = 'kw';
        _this4.getCurrentCountryLoading = false;
      });
    }
  }, {
    key: 'getValueBasedOnCountryCode',
    value: function getValueBasedOnCountryCode(arr) {
      var _this5 = this;

      var result = arr.filter(function (item) {
        return item.country_code.toLowerCase() === _this5.country_code.toLowerCase();
      });
      result.length === 0 ? result = arr.filter(function (item) {
        return item.country_code.toLowerCase() === 'kw';
      }) : null;
      return result[0];
    }
  }, {
    key: 'getProduct',
    value: function getProduct(product) {
      (typeof product === 'undefined' ? 'undefined' : _typeof(product)) === 'object' && product !== null ? product = product.slot : null;
      var result = product ? _products2.default.filter(function (item) {
        return item.product.toLowerCase() === product.toLowerCase();
      })[0] : null;
      return result;
    }
  }, {
    key: 'filterMenuBasedOnCountry',
    value: function filterMenuBasedOnCountry(menu) {
      var _this6 = this;

      menu.map(function (menuObj, key) {
        if (menuObj.type === 'product') {
          var bool = false;
          var produsctss = _this6.getProducts();
          for (var i = 0; i < produsctss.length; i++) {
            if (produsctss[i].slot === menuObj.slot) {
              bool = bool || true;
            }
          }
          if (!bool) {
            menu.splice(key, 1);
          }
        }
      });
    }
  }, {
    key: 'filterMenusBasedOnCountry',
    value: function filterMenusBasedOnCountry(menus) {
      var _this7 = this;

      menus.map(function (menu, menukey) {
        menu.items.map(function (item, key) {
          if (item.type === 'product') {
            var countries = _this7.getProduct(item.slot).countries;
            countries.filter(function (country) {
              return country === _this7.country_code;
            })[0] ? null : menu.items.length === 1 ? menus.splice(menukey, 1) : menu.items.splice(key, 1);
          }
        });
      });
    }
  }, {
    key: 'getAvailableCountries',
    value: function getAvailableCountries() {
      var _this8 = this;

      (0, _nodeFetch2.default)('https://partners.payments.tap.company/api/v1.3/api/Country/GetCountries?language_code=' + this.language).then(function (results) {
        return results.json();
      }).then(function (data) {
        _this8.availableCountries = data;
      }).then(function (anything) {
        _this8.getAvailableCountriesLoading = false;
      });
    }
  }, {
    key: 'getCurrentPartner',
    value: function getCurrentPartner(partner) {
      var result = _partners2.default.filter(function (item) {
        return item.name.toLowerCase() === partner.toLowerCase();
      });
      return result[0];
    }
  }, {
    key: 'getCallToAction',
    value: function getCallToAction(callToAction, product) {
      (typeof product === 'undefined' ? 'undefined' : _typeof(product)) === 'object' && product !== null ? product = product.slot : null;
      var result = product ? callToAction.filter(function (item) {
        return item.product.toLowerCase() === product.toLowerCase();
      })[0] : null;
      return result;
    }
  }, {
    key: 'getFeatures',
    value: function getFeatures(productsFeatures, product) {
      var result = productsFeatures.filter(function (item) {
        return item.product.toLowerCase() === product.toLowerCase();
      });
      return result[0];
    }
  }, {
    key: 'getMetaTag',
    value: function getMetaTag(metaTags, pageName, windowLocationHref) {
      var result = metaTags.filter(function (item) {
        return item.pageTemplate.toLowerCase() === pageName.toLowerCase() && windowLocationHref.indexOf(item.link) > -1;
      });
      return result[0];
    }
  }]);

  return UserPreferencesStore;
}();

(0, _mobx.decorate)(UserPreferencesStore, {
  language: _mobx.observable,
  productObj: _mobx.observable,
  partnerObj: _mobx.observable,
  country_code: _mobx.observable,
  getCurrentCountryLoading: _mobx.observable,
  getAvailableCountriesLoading: _mobx.observable,
  availableCountries: _mobx.observable,
  pageUrlKeys: _mobx.observable,
  intercomUser: _mobx.observable
});

var preferencesStore = new UserPreferencesStore();
preferencesStore.getCurrentCountry();
preferencesStore.getProducts();
preferencesStore.getAvailableCountries();
exports.default = preferencesStore;

/***/ }),
/* 218 */
/***/ (function(module, exports) {

module.exports = require("iplocation");

/***/ }),
/* 219 */
/***/ (function(module, exports) {

module.exports = require("react-intercom");

/***/ }),
/* 220 */
/***/ (function(module, exports) {

module.exports = require("exenv");

/***/ })
/******/ ]);