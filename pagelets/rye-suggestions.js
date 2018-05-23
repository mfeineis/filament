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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/registration.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../../../rye-pagelet-registry/src/index.js":
/*!****************************************************************************!*\
  !*** /home/dev/workspace/playground/rye/rye-pagelet-registry/src/index.js ***!
  \****************************************************************************/
/*! exports provided: register */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "register", function() { return register; });
/* global Rye */
// FIXME: Maybe we should add "rye-core" as an explicit but external dependency?

const register = factory => {

    if (typeof factory !== "function" || factory.length < 1) {
        // FIXME: Better error messages! What do we need exactly?
        throw new Error([
            "It should provide a valid registration function.",
        ].join(" "));
    }

    Rye.require(["rye-core/router"], factory);
};



/***/ }),

/***/ "./src/registration.js":
/*!*****************************!*\
  !*** ./src/registration.js ***!
  \*****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var rye_pagelet_registry__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rye-pagelet-registry */ "../../../rye-pagelet-registry/src/index.js");


// FIXME: This could be generated or rather be used to generate
//        the final artifact. How do we make sure there is no
//        reference to the "real" widget in here?
Object(rye_pagelet_registry__WEBPACK_IMPORTED_MODULE_0__["register"])(({ declare }) => (

    // FIXME: Refine the API, do we need the explicit fragment with a somewhat
    //        central pagelet registry?
    declare({
        element: "rye-suggestions",
        fragment: "/pagelets/rye-suggestions.pagelet.js",
    })

));



/***/ })

/******/ });
//# sourceMappingURL=rye-suggestions.js.map?440d7d3c12922