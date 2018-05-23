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

/***/ "./src/pagelet.js":
/*!************************!*\
  !*** ./src/pagelet.js ***!
  \************************/
/*! exports provided: PAGELET_NAME, pageletFactory */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PAGELET_NAME", function() { return PAGELET_NAME; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pageletFactory", function() { return pageletFactory; });
// FIXME: It may be better to have an explicit module to define the pagelet instead
//        of the webpack loader magic.

const PAGELET_NAME = "rye-suggestions";

const pageletFactory = root => {
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



if (typeof PAGELET_NAME !== "string" || !/rye-[\w]+/.test(PAGELET_NAME)) {
    throw new Error("PAGELET_NAME is not defined or invalid.");
}

if (typeof pageletFactory !== "function" || pageletFactory.length < 1) {
    throw new Error([
        "pageletFactory should receive at least one 'rootNode' dependency."
    ].join(" "));
}

Rye.define(PAGELET_NAME, [], () => pageletFactory);

    

/***/ })

/******/ });
//# sourceMappingURL=rye-suggestions.pagelet.js.map?32c2cb75d5b6b