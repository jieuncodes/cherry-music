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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   clientPlayList: () => (/* binding */ clientPlayList),\n/* harmony export */   currentTrackIndex: () => (/* binding */ currentTrackIndex),\n/* harmony export */   handleNextBtnClick: () => (/* binding */ handleNextBtnClick),\n/* harmony export */   player: () => (/* binding */ player),\n/* harmony export */   playerBox: () => (/* binding */ playerBox),\n/* harmony export */   playerBoxNextBtn: () => (/* binding */ playerBoxNextBtn),\n/* harmony export */   playerBoxPlayBtn: () => (/* binding */ playerBoxPlayBtn),\n/* harmony export */   playerReadyPromise: () => (/* binding */ playerReadyPromise),\n/* harmony export */   timeline: () => (/* binding */ timeline),\n/* harmony export */   togglePlayPauseBtn: () => (/* binding */ togglePlayPauseBtn)\n/* harmony export */ });\n/* harmony import */ var _playerScreen_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./playerScreen.js */ \"./src/client/js/playerScreen.js\");\n\nlet player;\nlet isVideoPlaying = false;\nconst musicCards = document.querySelectorAll(\"#music-card\");\nconst playerBox = document.getElementById(\"player-box\");\nconst playerBoxPlayBtn = playerBox.querySelector(\".play-btn\");\nconst playerBoxNextBtn = playerBox.querySelector(\".next-btn\");\nconst timeline = document.getElementById(\"timeline\");\nlet clientPlayList = [];\nlet currentTrackIndex = 0;\nlet playerReadyPromise = new Promise(resolve => {\n  window.onYouTubeIframeAPIReady = () => {\n    const playerElement = document.getElementById(\"youtube-player\");\n    if (playerElement) {\n      player = new YT.Player(playerElement, {\n        videoId: \"\",\n        events: {\n          onReady: event => {\n            event.target.playVideo();\n            togglePlayPauseBtn();\n            resolve();\n          },\n          onStateChange: onPlayerStateChange\n        }\n      });\n      setInterval(_playerScreen_js__WEBPACK_IMPORTED_MODULE_0__.updateProgressBar, 100);\n    } else {\n      console.error(\"Player element not found in the DOM\");\n    }\n  };\n});\n\n// player commands\nfunction togglePlayPauseBtn() {\n  console.log(\"click playbtn\");\n  if (player && player.getPlayerState() === YT.PlayerState.PLAYING) {\n    player.pauseVideo();\n  } else {\n    player.playVideo();\n  }\n}\nfunction handleNextBtnClick() {\n  if (currentTrackIndex < clientPlayList.length - 1) {\n    currentTrackIndex++;\n    const nextTrack = clientPlayList[currentTrackIndex];\n    console.log(\"currTrackIndex\", currentTrackIndex);\n    paintPlayerWithTrackInfo();\n    (0,_playerScreen_js__WEBPACK_IMPORTED_MODULE_0__.paintPlayerScreen)();\n    player.loadVideoById(nextTrack.videoId);\n  } else {\n    console.log(\"End of playlist reached\");\n  }\n  updateNextButtonStatus();\n}\nfunction handleTimeLineChange(event) {\n  const {\n    target: {\n      value\n    }\n  } = event;\n  if (player && player.getDuration) {\n    const videoDuration = player.getDuration();\n    const seekToSeconds = value / 100 * videoDuration;\n    player.seekTo(seekToSeconds, true);\n  } else {\n    console.error(\"Player is not ready\");\n  }\n}\nfunction handleTimeLineMouseDown() {\n  isVideoPlaying = player.getPlayerState() === YT.PlayerState.PLAYING;\n  if (isVideoPlaying) {\n    player.pauseVideo();\n    playerBoxPlayBtn.childNodes[0].classList.replace(\"fa-pause\", \"fa-play\");\n    _playerScreen_js__WEBPACK_IMPORTED_MODULE_0__.playerScreenPlayBtn.childNodes[0].classList.replace(\"fa-pause\", \"fa-play\");\n  }\n}\nfunction handleTimeLineMouseUp() {\n  if (isVideoPlaying) {\n    player.playVideo();\n    playerBoxPlayBtn.childNodes[0].classList.replace(\"fa-play\", \"fa-pause\");\n    _playerScreen_js__WEBPACK_IMPORTED_MODULE_0__.playerScreenPlayBtn.childNodes[0].classList.replace(\"fa-play\", \"fa-pause\");\n  }\n}\n\n// painters\nconst paintPlayerWithTrackInfo = () => {\n  togglePlayPauseBtn();\n  const track = clientPlayList[currentTrackIndex];\n  const albumImgArea = playerBox.querySelector(\".album-cover\");\n  const trackTitleArea = playerBox.querySelector(\".track-title-area\");\n  const artistArea = playerBox.querySelector(\".artist\");\n  albumImgArea.style.backgroundImage = `url(${track.albumImageUrl})`;\n  artistArea.textContent = track.artist;\n  while (trackTitleArea.firstChild) {\n    trackTitleArea.firstChild.remove();\n  }\n  const trackTitle = document.createElement(\"span\");\n  trackTitle.classList.add(\"track-title\");\n  trackTitle.textContent = track.title;\n  trackTitleArea.appendChild(trackTitle);\n\n  //marquee\n  if (trackTitleArea.clientWidth > artistArea.offsetWidth * 0.95) {\n    const cloneTitle = trackTitle.cloneNode(true);\n    trackTitle.classList.add(\"marquee-animation\");\n    cloneTitle.classList.add(\"marquee-animation\");\n    trackTitleArea.appendChild(trackTitle);\n    trackTitleArea.appendChild(cloneTitle);\n  }\n};\nconst updateNextButtonStatus = () => {\n  if (clientPlayList.length <= 1 || currentTrackIndex == clientPlayList.length - 1) {\n    playerBoxNextBtn.disabled = true;\n  } else {\n    playerBoxNextBtn.disabled = false;\n  }\n};\n\n// queue functions\nconst addMusicToQueue = async _ref => {\n  let {\n    videoId,\n    title,\n    artist,\n    albumImageUrl\n  } = _ref;\n  clientPlayList.unshift({\n    videoId,\n    title,\n    artist,\n    albumImageUrl\n  });\n  currentTrackIndex = 0;\n  updateNextButtonStatus();\n  if (player) {\n    player.stopVideo();\n    const firstTrack = clientPlayList[0];\n    if (firstTrack) {\n      paintPlayerWithTrackInfo();\n      (0,_playerScreen_js__WEBPACK_IMPORTED_MODULE_0__.paintPlayerScreen)();\n      player.loadVideoById(firstTrack.videoId);\n    }\n  } else {\n    console.error(\"Player has not been initialized yet\");\n  }\n};\nconst onMusicCardClick = _ref2 => {\n  let {\n    videoId,\n    title,\n    artist,\n    albumImageUrl\n  } = _ref2;\n  if (player) {\n    addMusicToQueue({\n      videoId,\n      title,\n      artist,\n      albumImageUrl\n    });\n  } else {\n    console.error(\"Player has not been initialized yet\");\n  }\n};\n\n// iframe\nconst onPlayerStateChange = event => {\n  console.log(\"playerstate\", event.data);\n  if (event.data === YT.PlayerState.PLAYING) {\n    playerBoxPlayBtn.disabled = false;\n    playerBoxPlayBtn.childNodes[0].classList.replace(\"fa-play\", \"fa-pause\");\n    _playerScreen_js__WEBPACK_IMPORTED_MODULE_0__.playerScreenPlayBtn.childNodes[0].classList.replace(\"fa-play\", \"fa-pause\");\n    _playerScreen_js__WEBPACK_IMPORTED_MODULE_0__.playerScreenPlayBtn.childNodes[0].style.fontSize = \"4rem\";\n  } else if (event.data === YT.PlayerState.PAUSED) {\n    playerBoxPlayBtn.childNodes[0].classList.replace(\"fa-pause\", \"fa-play\");\n    _playerScreen_js__WEBPACK_IMPORTED_MODULE_0__.playerScreenPlayBtn.childNodes[0].classList.replace(\"fa-pause\", \"fa-play\");\n  } else if (event.data === YT.PlayerState.ENDED) {\n    handleNextBtnClick();\n  }\n};\n\n//eventListeners\nmusicCards.forEach(musicCard => {\n  const videoId = musicCard.dataset.videoid;\n  const title = musicCard.dataset.title;\n  const artist = musicCard.dataset.artist;\n  const albumImageUrl = musicCard.dataset.albumimageurl;\n  if (videoId) {\n    musicCard.addEventListener(\"click\", () => onMusicCardClick({\n      videoId,\n      title,\n      artist,\n      albumImageUrl\n    }));\n  } else {\n    console.error(\"Music card does not have a data-videoid attribute\");\n  }\n});\nplayerBoxPlayBtn.addEventListener(\"click\", togglePlayPauseBtn);\nplayerBoxNextBtn.addEventListener(\"click\", handleNextBtnClick);\ndocument.addEventListener(\"DOMContentLoaded\", () => {\n  const tag = document.createElement(\"script\");\n  tag.src = \"https://www.youtube.com/iframe_api\";\n  document.body.appendChild(tag);\n});\ntimeline.addEventListener(\"input\", handleTimeLineChange);\ntimeline.addEventListener(\"mousedown\", handleTimeLineMouseDown);\ntimeline.addEventListener(\"mouseup\", handleTimeLineMouseUp);\n\n//# sourceURL=webpack://cherry-music/./src/client/js/player.js?");

/***/ }),

/***/ "./src/client/js/playerScreen.js":
/*!***************************************!*\
  !*** ./src/client/js/playerScreen.js ***!
  \***************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   checkBox: () => (/* binding */ checkBox),\n/* harmony export */   paintPlayerScreen: () => (/* binding */ paintPlayerScreen),\n/* harmony export */   playerScreenNextBtn: () => (/* binding */ playerScreenNextBtn),\n/* harmony export */   playerScreenPlayBtn: () => (/* binding */ playerScreenPlayBtn),\n/* harmony export */   updateProgressBar: () => (/* binding */ updateProgressBar)\n/* harmony export */ });\n/* harmony import */ var _player_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player.js */ \"./src/client/js/player.js\");\n/* harmony import */ var _util_formatTime_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util/formatTime.js */ \"./src/client/js/util/formatTime.js\");\n\n\nconst playerBox = document.getElementById(\"player-box\");\nconst playerScreen = document.getElementById(\"player-screen\");\nconst chevron = document.querySelector(\".fa-chevron-down\");\nconst playerScreenNextBtn = playerScreen.querySelector(\".next-btn\");\nconst playerScreenPlayBtn = playerScreen.querySelector(\".play-btn\");\nconst checkBox = document.querySelector(\"#check_box\");\nconst paintPlayerScreen = () => {\n  const {\n    videoId,\n    title,\n    artist,\n    albumImageUrl\n  } = _player_js__WEBPACK_IMPORTED_MODULE_0__.clientPlayList[_player_js__WEBPACK_IMPORTED_MODULE_0__.currentTrackIndex];\n  const albumCoverArea = playerScreen.querySelector(\".album-img\");\n  const titleArea = playerScreen.querySelector(\".title\");\n  const artistArea = playerScreen.querySelector(\".artist\");\n  albumCoverArea.src = albumImageUrl;\n  titleArea.innerHTML = title;\n  artistArea.innerHTML = artist;\n};\nconst updateProgressBar = async () => {\n  await _player_js__WEBPACK_IMPORTED_MODULE_0__.playerReadyPromise;\n  if (!_player_js__WEBPACK_IMPORTED_MODULE_0__.player) {\n    return;\n  }\n  const currentTime = _player_js__WEBPACK_IMPORTED_MODULE_0__.player.getCurrentTime();\n  const duration = _player_js__WEBPACK_IMPORTED_MODULE_0__.player.getDuration();\n  const progress = currentTime / duration * 100;\n  _player_js__WEBPACK_IMPORTED_MODULE_0__.timeline.value = `${progress}`;\n  const currentTimeDisplay = document.querySelector(\".current-time\");\n  const durationDisplay = document.querySelector(\".duration\");\n  currentTimeDisplay.textContent = (0,_util_formatTime_js__WEBPACK_IMPORTED_MODULE_1__.formatTime)(currentTime);\n  durationDisplay.textContent = (0,_util_formatTime_js__WEBPACK_IMPORTED_MODULE_1__.formatTime)(duration);\n};\nconst hidePlayerBox = event => {\n  playerBox.style.transition = \"bottom 0.3s ease-out\";\n  if (event.target.checked) {\n    document.querySelector(\"#player-box\").style.bottom = \"-100%\";\n  } else {\n    document.querySelector(\"#player-box\").style.bottom = \"0\";\n  }\n};\ncheckBox.addEventListener(\"change\", hidePlayerBox);\nchevron.addEventListener(\"click\", () => {\n  playerScreen.classList.remove(\"active\");\n});\nplayerScreenPlayBtn.addEventListener(\"click\", _player_js__WEBPACK_IMPORTED_MODULE_0__.togglePlayPauseBtn);\nplayerScreenNextBtn.addEventListener(\"click\", _player_js__WEBPACK_IMPORTED_MODULE_0__.handleNextBtnClick);\nplayerBox.addEventListener(\"click\", event => {\n  if (event.target.tagName === \"I\" || event.target.parentNode.className === \"play-btn\" || event.target.parentNode.className === \"pause-btn\") {\n    return;\n  }\n  playerScreen.classList.add(\"active\");\n});\n\n//# sourceURL=webpack://cherry-music/./src/client/js/playerScreen.js?");

/***/ }),

/***/ "./src/client/js/util/formatTime.js":
/*!******************************************!*\
  !*** ./src/client/js/util/formatTime.js ***!
  \******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   formatTime: () => (/* binding */ formatTime)\n/* harmony export */ });\nfunction formatTime(timeInSeconds) {\n  const minutes = Math.floor(timeInSeconds / 60);\n  const seconds = Math.floor(timeInSeconds % 60);\n  const formattedMinutes = minutes < 10 ? \"0\" + minutes : minutes;\n  const formattedSeconds = seconds < 10 ? \"0\" + seconds : seconds;\n  return formattedMinutes + \":\" + formattedSeconds;\n}\n\n//# sourceURL=webpack://cherry-music/./src/client/js/util/formatTime.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
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
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/client/js/player.js");
/******/ 	
/******/ })()
;