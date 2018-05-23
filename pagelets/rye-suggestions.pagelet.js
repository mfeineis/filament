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
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/pagelet.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../../../rye-pagelet/src/index.js":
/*!*******************************************************************!*\
  !*** /home/dev/workspace/playground/rye/rye-pagelet/src/index.js ***!
  \*******************************************************************/
/*! exports provided: define */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "define", function() { return define; });
/* global Rye */
// FIXME: Maybe we should add "rye-core" as an explicit but external dependency?

const define = (name, factory) => {
    console.log("rye-pagelet.index name", name, "factory", factory);

    if (typeof name !== "string" || !/rye-[\w]+/.test(name)) {
        throw new Error("Pagelet name is not defined or invalid.");
    }

    if (typeof factory !== "function" || factory.length < 1) {
        throw new Error([
            "Pagelet factory should receive at least one 'rootNode' dependency."
        ].join(" "));
    }

    Rye.define(name, [], () => factory);
};



/***/ }),

/***/ "./src/pagelet.js":
/*!************************!*\
  !*** ./src/pagelet.js ***!
  \************************/
/*! exports provided: PAGELET_NAME, factory */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PAGELET_NAME", function() { return PAGELET_NAME; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "factory", function() { return factory; });
/* harmony import */ var rye_pagelet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rye-pagelet */ "../../../rye-pagelet/src/index.js");


const PAGELET_NAME = "rye-suggestions";

const factory = root => {
    const document = root.ownerDocument;
    //root.innerHTML = "<pre>rye-suggestions bla</pre>";

    const it = document.createElement("div");
    it.setAttribute("data-pagelet", "true");
    it.innerHTML = "<pre>rye-suggestions</pre>";

    const one = document.createElement("span");
    one.setAttribute("data-id", "1");

    const two = document.createElement("span");
    two.setAttribute("data-id", "2");

    const nodes = [it, one, two];
    nodes.forEach(node => root.appendChild(node));

    //root.parentNode.replaceChild(it, root);

    //nodes.reverse().forEach(node => (
    //    it.parentNode.insertBefore(node, it.nextSibling)
    //));
};

Object(rye_pagelet__WEBPACK_IMPORTED_MODULE_0__["define"])(PAGELET_NAME, factory);


/***/ })

/******/ });
//# sourceMappingURL=rye-suggestions.pagelet.js.map?8b6298c7afec7