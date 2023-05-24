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

/***/ "./src/client/js/loading.js":
/*!**********************************!*\
  !*** ./src/client/js/loading.js ***!
  \**********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   hideLoadingScreen: () => (/* binding */ hideLoadingScreen),\n/* harmony export */   showLoadingScreen: () => (/* binding */ showLoadingScreen)\n/* harmony export */ });\nconst showLoadingScreen = () => {\n  const loadingScreen = document.getElementById(\"loading-screen\");\n  loadingScreen.style.display = \"flex\";\n};\nconst hideLoadingScreen = () => {\n  const loadingScreen = document.getElementById(\"loading-screen\");\n  loadingScreen.style.display = \"none\";\n};\nwindow.addEventListener(\"DOMContentLoaded\", showLoadingScreen);\nwindow.addEventListener(\"load\", hideLoadingScreen);\n\n//# sourceURL=webpack://cherry-music/./src/client/js/loading.js?");

/***/ }),

/***/ "./src/client/js/player.js":
/*!*********************************!*\
  !*** ./src/client/js/player.js ***!
  \*********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   clientPlayList: () => (/* binding */ clientPlayList),\n/* harmony export */   currentTrackIndex: () => (/* binding */ currentTrackIndex),\n/* harmony export */   handleNextBtnClick: () => (/* binding */ handleNextBtnClick),\n/* harmony export */   player: () => (/* binding */ player),\n/* harmony export */   playerBox: () => (/* binding */ playerBox),\n/* harmony export */   playerBoxNextBtn: () => (/* binding */ playerBoxNextBtn),\n/* harmony export */   playerBoxPlayBtn: () => (/* binding */ playerBoxPlayBtn),\n/* harmony export */   playerReadyPromise: () => (/* binding */ playerReadyPromise),\n/* harmony export */   timeline: () => (/* binding */ timeline),\n/* harmony export */   togglePlayPauseBtn: () => (/* binding */ togglePlayPauseBtn)\n/* harmony export */ });\n/* harmony import */ var _loading_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./loading.js */ \"./src/client/js/loading.js\");\n/* harmony import */ var _playerScreen_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./playerScreen.js */ \"./src/client/js/playerScreen.js\");\n/* harmony import */ var _playerScreenNav_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./playerScreenNav.js */ \"./src/client/js/playerScreenNav.js\");\n/* harmony import */ var _util_marquee_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./util/marquee.js */ \"./src/client/js/util/marquee.js\");\n\n\n\n\nlet player;\nlet isVideoPlaying = false;\nconst musicCards = document.querySelectorAll(\"#music-card\");\nconst playerBox = document.getElementById(\"player-box\");\nconst playerBoxPlayBtn = playerBox.querySelector(\".play-btn\");\nconst playerBoxNextBtn = playerBox.querySelector(\".next-btn\");\nconst timeline = document.getElementById(\"timeline\");\nlet clientPlayList = [];\nlet currentTrackIndex = 0;\nlet playerReadyPromise = new Promise(resolve => {\n  window.onYouTubeIframeAPIReady = () => {\n    const playerElement = document.getElementById(\"youtube-player\");\n    if (playerElement) {\n      player = new YT.Player(playerElement, {\n        videoId: \"\",\n        events: {\n          onReady: event => {\n            event.target.playVideo();\n            togglePlayPauseBtn();\n            resolve();\n          },\n          onStateChange: onPlayerStateChange\n        }\n      });\n      setInterval(_playerScreen_js__WEBPACK_IMPORTED_MODULE_1__.updateProgressBar, 100);\n      (0,_loading_js__WEBPACK_IMPORTED_MODULE_0__.hideLoadingScreen)();\n    } else {\n      console.error(\"Player element not found in the DOM\");\n    }\n  };\n});\n\n// player commands\nfunction togglePlayPauseBtn() {\n  if (player && player.getPlayerState() === YT.PlayerState.PLAYING) {\n    player.pauseVideo();\n  } else {\n    player.playVideo();\n  }\n}\nfunction handleNextBtnClick() {\n  if (currentTrackIndex < clientPlayList.length - 1) {\n    currentTrackIndex++;\n    const nextTrack = clientPlayList[currentTrackIndex];\n    paintPlayerWithTrackInfo();\n    (0,_playerScreen_js__WEBPACK_IMPORTED_MODULE_1__.paintPlayerScreen)();\n    player.loadVideoById(nextTrack.videoId);\n  } else {\n    console.log(\"End of playlist reached\");\n  }\n  updateNextButtonStatus();\n}\nfunction handleTimeLineChange(event) {\n  const {\n    target: {\n      value\n    }\n  } = event;\n  if (player && player.getDuration) {\n    const videoDuration = player.getDuration();\n    const seekToSeconds = value / 100 * videoDuration;\n    player.seekTo(seekToSeconds, true);\n  } else {\n    console.error(\"Player is not ready\");\n  }\n}\nfunction handleTimeLineMouseDown() {\n  isVideoPlaying = player.getPlayerState() === YT.PlayerState.PLAYING;\n  if (isVideoPlaying) {\n    player.pauseVideo();\n    playerBoxPlayBtn.childNodes[0].classList.replace(\"fa-pause\", \"fa-play\");\n    _playerScreen_js__WEBPACK_IMPORTED_MODULE_1__.playerScreenPlayBtn.childNodes[0].classList.replace(\"fa-pause\", \"fa-play\");\n  }\n}\nfunction handleTimeLineMouseUp() {\n  if (isVideoPlaying) {\n    player.playVideo();\n    playerBoxPlayBtn.childNodes[0].classList.replace(\"fa-play\", \"fa-pause\");\n    _playerScreen_js__WEBPACK_IMPORTED_MODULE_1__.playerScreenPlayBtn.childNodes[0].classList.replace(\"fa-play\", \"fa-pause\");\n  }\n}\n\n// painters\nconst paintPlayerWithTrackInfo = () => {\n  togglePlayPauseBtn();\n  const track = clientPlayList[currentTrackIndex];\n  const albumImgArea = playerBox.querySelector(\".album-cover\");\n  const trackTitleArea = playerBox.querySelector(\".track-title-area\");\n  const artistArea = playerBox.querySelector(\".artist\");\n  albumImgArea.style.backgroundImage = `url(${track.albumImageUrl})`;\n  artistArea.textContent = track.artist;\n  trackTitleArea.innerHTML = \"\";\n  trackTitleArea.innerHTML = (0,_util_marquee_js__WEBPACK_IMPORTED_MODULE_3__.paintTitleWithMarquee)(track.title);\n};\nconst updateNextButtonStatus = () => {\n  if (clientPlayList.length <= 1 || currentTrackIndex == clientPlayList.length - 1) {\n    playerBoxNextBtn.disabled = true;\n  } else {\n    playerBoxNextBtn.disabled = false;\n  }\n};\n\n// queue functions\nconst addMusicToQueue = async _ref => {\n  let {\n    videoId,\n    title,\n    artist,\n    albumImageUrl\n  } = _ref;\n  clientPlayList.unshift({\n    videoId,\n    title,\n    artist,\n    albumImageUrl\n  });\n  currentTrackIndex = 0;\n  updateNextButtonStatus();\n  if (player) {\n    player.stopVideo();\n    const firstTrack = clientPlayList[0];\n    if (firstTrack) {\n      paintPlayerWithTrackInfo();\n      (0,_playerScreen_js__WEBPACK_IMPORTED_MODULE_1__.paintPlayerScreen)();\n      player.loadVideoById(firstTrack.videoId);\n    }\n  } else {\n    console.error(\"Player has not been initialized yet\");\n  }\n  (0,_playerScreenNav_js__WEBPACK_IMPORTED_MODULE_2__.paintCurrentPlaying)();\n};\nconst onMusicCardClick = _ref2 => {\n  let {\n    videoId,\n    title,\n    artist,\n    albumImageUrl\n  } = _ref2;\n  if (player) {\n    addMusicToQueue({\n      videoId,\n      title,\n      artist,\n      albumImageUrl\n    });\n  } else {\n    console.error(\"Player has not been initialized yet\");\n  }\n};\n\n// iframe\nconst onPlayerStateChange = event => {\n  console.log(\"playerstate\", event.data);\n  (0,_playerScreenNav_js__WEBPACK_IMPORTED_MODULE_2__.paintCurrentPlaying)();\n  if (event.data === YT.PlayerState.PLAYING) {\n    playerBoxPlayBtn.disabled = false;\n    playerBoxPlayBtn.childNodes[0].classList.replace(\"fa-play\", \"fa-pause\");\n    _playerScreen_js__WEBPACK_IMPORTED_MODULE_1__.playerScreenPlayBtn.childNodes[0].classList.replace(\"fa-play\", \"fa-pause\");\n    _playerScreen_js__WEBPACK_IMPORTED_MODULE_1__.playerScreenPlayBtn.childNodes[0].style.fontSize = \"4rem\";\n  } else if (event.data === YT.PlayerState.PAUSED) {\n    playerBoxPlayBtn.childNodes[0].classList.replace(\"fa-pause\", \"fa-play\");\n    _playerScreen_js__WEBPACK_IMPORTED_MODULE_1__.playerScreenPlayBtn.childNodes[0].classList.replace(\"fa-pause\", \"fa-play\");\n  } else if (event.data === YT.PlayerState.ENDED) {\n    handleNextBtnClick();\n  }\n};\n\n//eventListeners\nmusicCards.forEach(musicCard => {\n  const videoId = musicCard.dataset.videoid;\n  const title = musicCard.dataset.title;\n  const artist = musicCard.dataset.artist;\n  const albumImageUrl = musicCard.dataset.albumimageurl;\n  if (videoId) {\n    musicCard.addEventListener(\"click\", () => onMusicCardClick({\n      videoId,\n      title,\n      artist,\n      albumImageUrl\n    }));\n  } else {\n    console.error(\"Music card does not have a data-videoid attribute\");\n  }\n});\nplayerBoxPlayBtn.addEventListener(\"click\", togglePlayPauseBtn);\nplayerBoxNextBtn.addEventListener(\"click\", handleNextBtnClick);\ndocument.addEventListener(\"DOMContentLoaded\", () => {\n  const tag = document.createElement(\"script\");\n  tag.src = \"https://www.youtube.com/iframe_api\";\n  document.body.appendChild(tag);\n});\ntimeline.addEventListener(\"input\", handleTimeLineChange);\ntimeline.addEventListener(\"mousedown\", handleTimeLineMouseDown);\ntimeline.addEventListener(\"mouseup\", handleTimeLineMouseUp);\n\n//# sourceURL=webpack://cherry-music/./src/client/js/player.js?");

/***/ }),

/***/ "./src/client/js/playerScreen.js":
/*!***************************************!*\
  !*** ./src/client/js/playerScreen.js ***!
  \***************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   checkBox: () => (/* binding */ checkBox),\n/* harmony export */   paintPlayerScreen: () => (/* binding */ paintPlayerScreen),\n/* harmony export */   playerScreenNextBtn: () => (/* binding */ playerScreenNextBtn),\n/* harmony export */   playerScreenPlayBtn: () => (/* binding */ playerScreenPlayBtn),\n/* harmony export */   updateProgressBar: () => (/* binding */ updateProgressBar)\n/* harmony export */ });\n/* harmony import */ var _player_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player.js */ \"./src/client/js/player.js\");\n/* harmony import */ var _util_formatTime_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util/formatTime.js */ \"./src/client/js/util/formatTime.js\");\n/* harmony import */ var _util_marquee_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./util/marquee.js */ \"./src/client/js/util/marquee.js\");\n\n\n\nconst playerBox = document.getElementById(\"player-box\");\nconst playerScreen = document.getElementById(\"player-screen\");\nconst chevron = document.querySelector(\".fa-chevron-down\");\nconst playerScreenNextBtn = playerScreen.querySelector(\".next-btn\");\nconst playerScreenPlayBtn = playerScreen.querySelector(\".play-btn\");\nconst checkBox = document.querySelector(\"#check_box\");\nconst paintPlayerScreen = () => {\n  const {\n    videoId,\n    title,\n    artist,\n    albumImageUrl\n  } = _player_js__WEBPACK_IMPORTED_MODULE_0__.clientPlayList[_player_js__WEBPACK_IMPORTED_MODULE_0__.currentTrackIndex];\n  const albumCoverArea = playerScreen.querySelector(\".album-img\");\n  const titleArea = playerScreen.querySelector(\".track-title-area\");\n  const artistArea = playerScreen.querySelector(\".artist\");\n  albumCoverArea.src = albumImageUrl;\n  titleArea.innerHTML = (0,_util_marquee_js__WEBPACK_IMPORTED_MODULE_2__.paintTitleWithMarquee)(title);\n  artistArea.innerHTML = artist;\n};\nconst updateProgressBar = async () => {\n  await _player_js__WEBPACK_IMPORTED_MODULE_0__.playerReadyPromise;\n  if (!_player_js__WEBPACK_IMPORTED_MODULE_0__.player) {\n    return;\n  }\n  const currentTime = _player_js__WEBPACK_IMPORTED_MODULE_0__.player.getCurrentTime();\n  const duration = _player_js__WEBPACK_IMPORTED_MODULE_0__.player.getDuration();\n  const progress = currentTime / duration * 100;\n  _player_js__WEBPACK_IMPORTED_MODULE_0__.timeline.value = `${progress}`;\n  const currentTimeDisplay = document.querySelector(\".current-time\");\n  const durationDisplay = document.querySelector(\".duration\");\n  currentTimeDisplay.textContent = (0,_util_formatTime_js__WEBPACK_IMPORTED_MODULE_1__.formatTime)(currentTime);\n  durationDisplay.textContent = (0,_util_formatTime_js__WEBPACK_IMPORTED_MODULE_1__.formatTime)(duration);\n};\nconst hidePlayerBox = event => {\n  playerBox.style.transition = \"bottom 0.3s ease-out\";\n  if (event.target.checked) {\n    document.querySelector(\"#player-box\").style.bottom = \"-100%\";\n  } else {\n    document.querySelector(\"#player-box\").style.bottom = \"0\";\n  }\n};\ncheckBox.addEventListener(\"change\", hidePlayerBox);\nchevron.addEventListener(\"click\", () => {\n  playerScreen.classList.remove(\"active\");\n});\nplayerScreenPlayBtn.addEventListener(\"click\", _player_js__WEBPACK_IMPORTED_MODULE_0__.togglePlayPauseBtn);\nplayerScreenNextBtn.addEventListener(\"click\", _player_js__WEBPACK_IMPORTED_MODULE_0__.handleNextBtnClick);\nplayerBox.addEventListener(\"click\", event => {\n  if (event.target.tagName === \"I\" || event.target.parentNode.className === \"play-btn\" || event.target.parentNode.className === \"pause-btn\") {\n    return;\n  }\n  playerScreen.classList.add(\"active\");\n});\n\n//# sourceURL=webpack://cherry-music/./src/client/js/playerScreen.js?");

/***/ }),

/***/ "./src/client/js/playerScreenNav.js":
/*!******************************************!*\
  !*** ./src/client/js/playerScreenNav.js ***!
  \******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   paintCurrentPlaying: () => (/* binding */ paintCurrentPlaying)\n/* harmony export */ });\n/* harmony import */ var _player_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player.js */ \"./src/client/js/player.js\");\n\nconst navArea = document.querySelector(\".player-screen__nav\");\nconst handle = navArea.querySelector(\".handle-bar\");\nconst buttons = navArea.querySelectorAll(\"button\");\nconst navBody = document.querySelector(\".nav__body\");\nconst pullUpNav = event => {\n  if (event.target !== handle) return;\n  navArea.classList.add(\"nav-active\");\n  const playerBox = document.getElementById(\"player-box\");\n  playerBox.classList.add(\"top-player\");\n  buttons[0].click();\n  handle.removeEventListener(\"click\", pullUpNav);\n  handle.addEventListener(\"click\", pushDownNav);\n};\nconst pushDownNav = event => {\n  if (event.target !== handle) return;\n  navArea.classList.remove(\"nav-active\");\n  const playerBox = document.getElementById(\"player-box\");\n  playerBox.classList.remove(\"top-player\");\n  handle.removeEventListener(\"click\", pushDownNav);\n  handle.addEventListener(\"click\", pullUpNav);\n};\nconst handleNavBtnClick = event => {\n  if (event.target.parentNode.classList[0] !== \"nav-items\") return;\n  buttons.forEach(button => {\n    button.classList.remove(\"clicked\");\n  });\n  if (event.target.classList.value == \"next-track\") {\n    mountPlayListTracks();\n  }\n  event.target.classList.add(\"clicked\");\n};\nconst paintCurrentPlaying = async () => {\n  await _player_js__WEBPACK_IMPORTED_MODULE_0__.playerReadyPromise;\n  const currentPlayingIndex = _player_js__WEBPACK_IMPORTED_MODULE_0__.currentTrackIndex;\n  const listMusicCards = document.querySelectorAll(\".playlist-music-card\");\n  if (listMusicCards) {\n    listMusicCards.forEach((card, index) => {\n      if (index == currentPlayingIndex) {\n        card.style.backgroundColor = \"#1c1c1cb0\";\n        card.style.padding = \"3rem 1.5rem 5rem 1.5rem\";\n      } else {\n        card.style.backgroundColor = \"transparent\";\n        card.style.padding = \"2rem 1.5rem 4rem 1.5rem\";\n      }\n    });\n  } else {\n    console.log(\"No playing card found at index\", currentPlayingIndex);\n  }\n};\nconst mountPlayListTracks = () => {\n  navBody.innerHTML = \"\";\n  console.log(\"cli\", _player_js__WEBPACK_IMPORTED_MODULE_0__.clientPlayList);\n  if (_player_js__WEBPACK_IMPORTED_MODULE_0__.clientPlayList.length == 0) {\n    const emptyPlayListMsg = document.createElement(\"div\");\n    const msg = document.createElement(\"span\");\n    msg.innerHTML = \"재생목록에 곡을 추가해주세요.\";\n    emptyPlayListMsg.classList.add(\"empty-playlist-div\");\n    emptyPlayListMsg.appendChild(msg);\n    navBody.appendChild(emptyPlayListMsg);\n    return;\n  }\n  const musicCardsContainer = document.createElement(\"div\");\n  musicCardsContainer.classList.add(\"music-cards-container\");\n  _player_js__WEBPACK_IMPORTED_MODULE_0__.clientPlayList.forEach((track, index) => {\n    let musicCard = document.createElement(\"div\");\n    musicCard.id = \"music-card\";\n    musicCard.classList.add(\"playlist-music-card\");\n    musicCard.dataset.videoid = track.videoId;\n    musicCard.dataset.title = track.title;\n    musicCard.dataset.artist = track.artist;\n    musicCard.dataset.albumimageurl = track.albumImageUrl;\n    let albumCover = document.createElement(\"div\");\n    albumCover.classList.add(\"album-cover\");\n    albumCover.style.backgroundImage = `url(${track.albumImageUrl})`;\n    let titleArea = document.createElement(\"div\");\n    titleArea.classList.add(\"track-title-area\");\n    let trackTitle = document.createElement(\"div\");\n    trackTitle.classList.add(\"track-title\");\n    trackTitle.textContent = track.title;\n    titleArea.appendChild(trackTitle);\n    let artist = document.createElement(\"div\");\n    artist.classList.add(\"artist\");\n    artist.textContent = track.artist;\n    let playBtn = document.createElement(\"button\");\n    playBtn.classList.add(\"play-btn\");\n    let icon = document.createElement(\"i\");\n    icon.classList.add(\"fa-solid\");\n    icon.classList.add(\"fa-ellipsis-vertical\");\n    playBtn.appendChild(icon);\n    musicCard.appendChild(albumCover);\n    musicCard.appendChild(titleArea);\n    musicCard.appendChild(artist);\n    musicCard.appendChild(playBtn);\n    musicCardsContainer.appendChild(musicCard);\n  });\n  navBody.appendChild(musicCardsContainer);\n};\nhandle.addEventListener(\"click\", pullUpNav);\nbuttons.forEach(button => {\n  button.addEventListener(\"click\", handleNavBtnClick);\n});\n\n//# sourceURL=webpack://cherry-music/./src/client/js/playerScreenNav.js?");

/***/ }),

/***/ "./src/client/js/util/formatTime.js":
/*!******************************************!*\
  !*** ./src/client/js/util/formatTime.js ***!
  \******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   formatTime: () => (/* binding */ formatTime)\n/* harmony export */ });\nfunction formatTime(timeInSeconds) {\n  const minutes = Math.floor(timeInSeconds / 60);\n  const seconds = Math.floor(timeInSeconds % 60);\n  const formattedMinutes = minutes < 10 ? \"0\" + minutes : minutes;\n  const formattedSeconds = seconds < 10 ? \"0\" + seconds : seconds;\n  return formattedMinutes + \":\" + formattedSeconds;\n}\n\n//# sourceURL=webpack://cherry-music/./src/client/js/util/formatTime.js?");

/***/ }),

/***/ "./src/client/js/util/marquee.js":
/*!***************************************!*\
  !*** ./src/client/js/util/marquee.js ***!
  \***************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   paintTitleWithMarquee: () => (/* binding */ paintTitleWithMarquee)\n/* harmony export */ });\nconst musicCards = document.querySelectorAll(\"#music-card\");\nconst addMarquee = event => {\n  const trackTitleArea = event.currentTarget.querySelector(\".track-title-area\");\n  const trackTitle = trackTitleArea.querySelector(\".track-title\");\n  if (trackTitle.clientWidth > trackTitleArea.clientWidth) {\n    trackTitleArea.classList.add(\"marquee\");\n    trackTitle.classList.add(\"marquee-content\");\n    trackTitle.classList.add(\"scroll\");\n    const cloneTitle = trackTitle.cloneNode(true);\n    trackTitleArea.appendChild(cloneTitle);\n  }\n};\nconst removeMarquee = event => {\n  const trackTitleArea = event.currentTarget.querySelector(\".track-title-area\");\n  const trackTitle = trackTitleArea.querySelector(\".track-title\");\n  trackTitleArea.classList.remove(\"marquee\");\n  trackTitle.classList.remove(\"marquee-content\");\n  trackTitle.classList.remove(\"scroll\");\n  if (trackTitleArea.childNodes.length > 1) {\n    trackTitleArea.removeChild(trackTitleArea.lastChild);\n  }\n};\nmusicCards.forEach(card => {\n  card.addEventListener(\"mouseenter\", addMarquee);\n  card.addEventListener(\"mouseleave\", removeMarquee);\n});\nconst paintTitleWithMarquee = trackTitleText => {\n  const marqueeElements = `\n  <div class=\"track-title-area marquee\">\n    <div class=\"track-title marquee-content scroll\">\n      ${trackTitleText} \n    </div> \n    <div class=\"track-title marquee-content scroll\">\n      ${trackTitleText} \n    </div> \n  </div>`;\n  return marqueeElements;\n};\n\n//# sourceURL=webpack://cherry-music/./src/client/js/util/marquee.js?");

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