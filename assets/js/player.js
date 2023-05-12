/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/client/js/player.js":
/*!*********************************!*\
  !*** ./src/client/js/player.js ***!
  \*********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\nlet player;\nfunction onYouTubeIframeAPIReady() {\n  player = new YT.Player(\"player\", {\n    height: \"390\",\n    width: \"640\",\n    videoId: \"Xit3nVfE18M\",\n    events: {\n      onReady: onPlayerReady,\n      onStateChange: onPlayerStateChange\n    }\n  });\n}\nfunction onMusicCardClick(videoId) {\n  player.loadVideoById(videoId);\n}\nconst musicCards = document.getElementsByClassName(\"music-card\");\nconsole.log(\"music\", musicCards);\nfor (var i = 0; i < musicCards.length; i++) {\n  musicCards[i].addEventListener(\"click\", function () {\n    onMusicCardClick(this.dataset.videoId);\n  });\n}\n\n//# sourceURL=webpack://cherry-music/./src/client/js/player.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/client/js/player.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;