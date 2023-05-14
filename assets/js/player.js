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

eval("__webpack_require__.r(__webpack_exports__);\ndocument.addEventListener('DOMContentLoaded', () => {\n  const musicCards = document.querySelectorAll(\"#music-card\");\n  const playerBox = document.getElementById('player-box');\n  const playButton = playerBox.querySelector('.play-btn');\n  const tag = document.createElement(\"script\");\n  tag.src = \"https://www.youtube.com/iframe_api\";\n  document.body.appendChild(tag);\n  let player;\n  const onPlayerReady = event => {\n    event.target.playVideo();\n  };\n  let done = false;\n  const onPlayerStateChange = event => {\n    if (event.data === YT.PlayerState.PLAYING && !done) {\n      done = true;\n    }\n  };\n  const stopVideo = () => {\n    player.stopVideo();\n  };\n  const onMusicCardClick = videoId => {\n    console.log(videoId);\n    console.log(player);\n    if (!player) {\n      console.error(\"Player has not been initialized yet\");\n      return;\n    }\n    player.loadVideoById(videoId);\n  };\n  const handlePlayBtnClick = () => {\n    console.log('', YT.PlayerState);\n    if (player.getPlayerState() === YT.PlayerState.PLAYING) {\n      playButton.innerHTML = `<i class=\"fa-solid fa-play\"></i>`;\n      player.pauseVideo();\n    } else {\n      playButton.innerHTML = `<i class=\"fa-solid fa-pause\"></i>`;\n      player.playVideo();\n    }\n  };\n  window.onYouTubeIframeAPIReady = () => {\n    const playerElement = document.getElementById(\"youtube-player\");\n    if (!playerElement) {\n      console.error(\"Player element not found in the DOM\");\n      return;\n    }\n    player = new YT.Player(playerElement, {\n      videoId: \"Xit3nVfE18M\",\n      events: {\n        onReady: onPlayerReady,\n        onStateChange: onPlayerStateChange\n      }\n    });\n  };\n  musicCards.forEach(musicCard => {\n    if (!musicCard.dataset.videoid) {\n      console.error(\"Music card does not have a data-videoid attribute\");\n      return;\n    }\n    musicCard.addEventListener(\"click\", () => {\n      onMusicCardClick(musicCard.dataset.videoid);\n    });\n  });\n  playButton.addEventListener('click', handlePlayBtnClick);\n});\n\n//# sourceURL=webpack://cherry-music/./src/client/js/player.js?");

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