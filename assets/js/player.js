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

/***/ "./src/client/scss/styles.scss":
/*!*************************************!*\
  !*** ./src/client/scss/styles.scss ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://cherry-music/./src/client/scss/styles.scss?");

/***/ }),

/***/ "./src/client/js/controllers/queue.js":
/*!********************************************!*\
  !*** ./src/client/js/controllers/queue.js ***!
  \********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   addMusicToQueue: () => (/* binding */ addMusicToQueue)\n/* harmony export */ });\n/* harmony import */ var _main_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../main.js */ \"./src/client/js/main.js\");\n/* harmony import */ var _painters_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../painters.js */ \"./src/client/js/painters.js\");\n/* harmony import */ var _player_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../player.js */ \"./src/client/js/player.js\");\n/* harmony import */ var _playerScreen_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../playerScreen.js */ \"./src/client/js/playerScreen.js\");\n/* harmony import */ var _playerScreenNav_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../playerScreenNav.js */ \"./src/client/js/playerScreenNav.js\");\n\n\n\n\n\nconst addMusicToQueue = async _ref => {\n  let {\n    videoId,\n    title,\n    artist,\n    albumImageUrl\n  } = _ref;\n  _player_js__WEBPACK_IMPORTED_MODULE_2__.clientPlayList.unshift({\n    videoId,\n    title,\n    artist,\n    albumImageUrl\n  });\n  _player_js__WEBPACK_IMPORTED_MODULE_2__.currentTrackState.index = 0;\n  (0,_painters_js__WEBPACK_IMPORTED_MODULE_1__.updateNextButtonStatus)();\n  (0,_painters_js__WEBPACK_IMPORTED_MODULE_1__.updatePrevButtonStatus)();\n  if (_main_js__WEBPACK_IMPORTED_MODULE_0__.iframe.player) {\n    _main_js__WEBPACK_IMPORTED_MODULE_0__.iframe.player.stopVideo();\n    const firstTrack = _player_js__WEBPACK_IMPORTED_MODULE_2__.clientPlayList[0];\n    if (firstTrack) {\n      (0,_painters_js__WEBPACK_IMPORTED_MODULE_1__.paintPlayerWithTrackInfo)();\n      (0,_playerScreen_js__WEBPACK_IMPORTED_MODULE_3__.paintPlayerScreen)();\n      _main_js__WEBPACK_IMPORTED_MODULE_0__.iframe.player.loadVideoById(firstTrack.videoId);\n    }\n  } else {\n    console.error(\"Player has not been initialized yet\");\n  }\n  (0,_playerScreenNav_js__WEBPACK_IMPORTED_MODULE_4__.paintCurrentPlaying)();\n};\n\n//# sourceURL=webpack://cherry-music/./src/client/js/controllers/queue.js?");

/***/ }),

/***/ "./src/client/js/controllers/timeline.js":
/*!***********************************************!*\
  !*** ./src/client/js/controllers/timeline.js ***!
  \***********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   isVideoPlaying: () => (/* binding */ isVideoPlaying),\n/* harmony export */   timeline: () => (/* binding */ timeline)\n/* harmony export */ });\n/* harmony import */ var _main_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../main.js */ \"./src/client/js/main.js\");\n\nconst timeline = document.getElementById(\"timeline\");\nlet isVideoPlaying = false;\nconst handleTimeLineChange = event => {\n  const {\n    target: {\n      value\n    }\n  } = event;\n  if (_main_js__WEBPACK_IMPORTED_MODULE_0__.iframe.player && _main_js__WEBPACK_IMPORTED_MODULE_0__.iframe.player.getDuration) {\n    const videoDuration = _main_js__WEBPACK_IMPORTED_MODULE_0__.iframe.player.getDuration();\n    const seekToSeconds = value / 100 * videoDuration;\n    _main_js__WEBPACK_IMPORTED_MODULE_0__.iframe.player.seekTo(seekToSeconds, true);\n  } else {\n    console.error(\"Player is not ready\");\n  }\n};\nconst handleTimeLineMouseDown = () => {\n  isVideoPlaying = _main_js__WEBPACK_IMPORTED_MODULE_0__.iframe.player.getPlayerState() === YT.PlayerState.PLAYING;\n  if (isVideoPlaying) {\n    _main_js__WEBPACK_IMPORTED_MODULE_0__.iframe.player.pauseVideo();\n    playerBoxPlayBtn.childNodes[0].classList.replace(\"fa-pause\", \"fa-play\");\n    playerScreenPlayBtn.childNodes[0].classList.replace(\"fa-pause\", \"fa-play\");\n  }\n};\nconst handleTimeLineMouseUp = () => {\n  if (isVideoPlaying) {\n    player.playVideo();\n    playerBoxPlayBtn.childNodes[0].classList.replace(\"fa-play\", \"fa-pause\");\n    playerScreenPlayBtn.childNodes[0].classList.replace(\"fa-play\", \"fa-pause\");\n  }\n};\ntimeline.addEventListener(\"input\", handleTimeLineChange);\ntimeline.addEventListener(\"mousedown\", handleTimeLineMouseDown);\ntimeline.addEventListener(\"mouseup\", handleTimeLineMouseUp);\n\n//# sourceURL=webpack://cherry-music/./src/client/js/controllers/timeline.js?");

/***/ }),

/***/ "./src/client/js/loading.js":
/*!**********************************!*\
  !*** ./src/client/js/loading.js ***!
  \**********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   hideLoadingScreen: () => (/* binding */ hideLoadingScreen),\n/* harmony export */   showLoadingScreen: () => (/* binding */ showLoadingScreen)\n/* harmony export */ });\nconst showLoadingScreen = () => {\n  const loadingScreen = document.getElementById(\"loading-screen\");\n  loadingScreen.style.display = \"flex\";\n};\nconst hideLoadingScreen = () => {\n  const loadingScreen = document.getElementById(\"loading-screen\");\n  loadingScreen.style.display = \"none\";\n};\nwindow.addEventListener(\"DOMContentLoaded\", showLoadingScreen);\nwindow.addEventListener(\"load\", hideLoadingScreen);\n\n//# sourceURL=webpack://cherry-music/./src/client/js/loading.js?");

/***/ }),

/***/ "./src/client/js/main.js":
/*!*******************************!*\
  !*** ./src/client/js/main.js ***!
  \*******************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   iframe: () => (/* binding */ iframe),\n/* harmony export */   onPlayerStateChange: () => (/* binding */ onPlayerStateChange),\n/* harmony export */   playerReadyPromise: () => (/* binding */ playerReadyPromise)\n/* harmony export */ });\n/* harmony import */ var _scss_styles_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scss/styles.scss */ \"./src/client/scss/styles.scss\");\n/* harmony import */ var _loading_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./loading.js */ \"./src/client/js/loading.js\");\n/* harmony import */ var _painters_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./painters.js */ \"./src/client/js/painters.js\");\n/* harmony import */ var _player_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./player.js */ \"./src/client/js/player.js\");\n/* harmony import */ var _playerScreen_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./playerScreen.js */ \"./src/client/js/playerScreen.js\");\n/* harmony import */ var _playerScreenNav_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./playerScreenNav.js */ \"./src/client/js/playerScreenNav.js\");\n\n\n\n\n\n\nconst paintMainScreenBg = () => {\n  const backgroundGradient = document.querySelector(\".background-gradient\");\n  if (backgroundGradient) {\n    if (window.pageYOffset > 0) {\n      backgroundGradient.classList.add(\"inactive\");\n    } else {\n      backgroundGradient.classList.remove(\"inactive\");\n    }\n  }\n};\n\n//iframe\n\nlet iframe = {\n  player: null\n};\nlet playerReadyPromise = new Promise(resolve => {\n  window.onYouTubeIframeAPIReady = () => {\n    const playerElement = document.getElementById(\"youtube-player\");\n    if (playerElement) {\n      iframe.player = new YT.Player(playerElement, {\n        videoId: \"\",\n        events: {\n          onReady: event => {\n            event.target.playVideo();\n            (0,_player_js__WEBPACK_IMPORTED_MODULE_3__.togglePlayPauseBtn)();\n            resolve();\n          },\n          onStateChange: onPlayerStateChange\n        }\n      });\n      setInterval(_playerScreen_js__WEBPACK_IMPORTED_MODULE_4__.updateProgressBar, 100);\n      (0,_loading_js__WEBPACK_IMPORTED_MODULE_1__.hideLoadingScreen)();\n    } else {\n      console.error(\"Player element not found in the DOM\");\n    }\n  };\n});\nconst onPlayerStateChange = event => {\n  // console.log(\"playerstate\", event.data);\n  (0,_playerScreenNav_js__WEBPACK_IMPORTED_MODULE_5__.paintCurrentPlaying)();\n  if (event.data === YT.PlayerState.PLAYING) {\n    _player_js__WEBPACK_IMPORTED_MODULE_3__.playerBoxPlayBtn.disabled = false;\n    (0,_painters_js__WEBPACK_IMPORTED_MODULE_2__.paintToPauseBtn)();\n  } else if (event.data === YT.PlayerState.PAUSED) {\n    (0,_painters_js__WEBPACK_IMPORTED_MODULE_2__.paintToPlayBtn)();\n  } else if (event.data === YT.PlayerState.ENDED) {\n    (0,_player_js__WEBPACK_IMPORTED_MODULE_3__.handleNextBtnClick)();\n  }\n};\nwindow.addEventListener(\"scroll\", paintMainScreenBg);\n\n//# sourceURL=webpack://cherry-music/./src/client/js/main.js?");

/***/ }),

/***/ "./src/client/js/painters.js":
/*!***********************************!*\
  !*** ./src/client/js/painters.js ***!
  \***********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   paintPlayerWithTrackInfo: () => (/* binding */ paintPlayerWithTrackInfo),\n/* harmony export */   paintToPauseBtn: () => (/* binding */ paintToPauseBtn),\n/* harmony export */   paintToPlayBtn: () => (/* binding */ paintToPlayBtn),\n/* harmony export */   replaceClassForButton: () => (/* binding */ replaceClassForButton),\n/* harmony export */   updateNextButtonStatus: () => (/* binding */ updateNextButtonStatus),\n/* harmony export */   updatePrevButtonStatus: () => (/* binding */ updatePrevButtonStatus)\n/* harmony export */ });\n/* harmony import */ var _player_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player.js */ \"./src/client/js/player.js\");\n/* harmony import */ var _playerScreen_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./playerScreen.js */ \"./src/client/js/playerScreen.js\");\n/* harmony import */ var _util_marquee_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./util/marquee.js */ \"./src/client/js/util/marquee.js\");\n\n\n\nconst replaceClassForButton = (button, oldClass, newClass) => {\n  button.childNodes[0].classList.replace(oldClass, newClass);\n};\nconst paintToPauseBtn = () => {\n  replaceClassForButton(_player_js__WEBPACK_IMPORTED_MODULE_0__.playerBoxPlayBtn, \"fa-play\", \"fa-pause\");\n  replaceClassForButton(_playerScreen_js__WEBPACK_IMPORTED_MODULE_1__.playerScreenPlayBtn, \"fa-play\", \"fa-pause\");\n  _playerScreen_js__WEBPACK_IMPORTED_MODULE_1__.playerScreenPlayBtn.childNodes[0].style.fontSize = \"4rem\";\n};\nconst paintToPlayBtn = () => {\n  replaceClassForButton(_player_js__WEBPACK_IMPORTED_MODULE_0__.playerBoxPlayBtn, \"fa-pause\", \"fa-play\");\n  replaceClassForButton(_playerScreen_js__WEBPACK_IMPORTED_MODULE_1__.playerScreenPlayBtn, \"fa-pause\", \"fa-play\");\n};\nconst paintPlayerWithTrackInfo = () => {\n  (0,_player_js__WEBPACK_IMPORTED_MODULE_0__.togglePlayPauseBtn)();\n  const track = _player_js__WEBPACK_IMPORTED_MODULE_0__.clientPlayList[_player_js__WEBPACK_IMPORTED_MODULE_0__.currentTrackState.index];\n  const albumImgArea = _player_js__WEBPACK_IMPORTED_MODULE_0__.playerBox.querySelector(\".album-cover\");\n  const trackTitleArea = _player_js__WEBPACK_IMPORTED_MODULE_0__.playerBox.querySelector(\".track-title-area\");\n  const artistArea = _player_js__WEBPACK_IMPORTED_MODULE_0__.playerBox.querySelector(\".artist\");\n  albumImgArea.style.backgroundImage = `url(${track.albumImageUrl})`;\n  artistArea.textContent = track.artist;\n  trackTitleArea.innerHTML = (0,_util_marquee_js__WEBPACK_IMPORTED_MODULE_2__.paintTitleWithMarquee)(track.title);\n};\nconst disableButtonConditionally = (button, deadEnd) => {\n  if (deadEnd) {\n    button.disabled = true;\n  } else {\n    button.disabled = false;\n  }\n};\nconst updateNextButtonStatus = () => {\n  const deadEnd = _player_js__WEBPACK_IMPORTED_MODULE_0__.clientPlayList.length <= 1 || _player_js__WEBPACK_IMPORTED_MODULE_0__.currentTrackState.index === _player_js__WEBPACK_IMPORTED_MODULE_0__.clientPlayList.length - 1;\n  disableButtonConditionally(_player_js__WEBPACK_IMPORTED_MODULE_0__.playerBoxNextBtn, deadEnd);\n  disableButtonConditionally(_playerScreen_js__WEBPACK_IMPORTED_MODULE_1__.playerScreenNextBtn, deadEnd);\n};\nconst updatePrevButtonStatus = () => {\n  const deadEnd = _player_js__WEBPACK_IMPORTED_MODULE_0__.currentTrackState.index === 0;\n  disableButtonConditionally(_playerScreen_js__WEBPACK_IMPORTED_MODULE_1__.playerScreenPrevBtn, deadEnd);\n};\n\n//# sourceURL=webpack://cherry-music/./src/client/js/painters.js?");

/***/ }),

/***/ "./src/client/js/player.js":
/*!*********************************!*\
  !*** ./src/client/js/player.js ***!
  \*********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   clientPlayList: () => (/* binding */ clientPlayList),\n/* harmony export */   currentTrackState: () => (/* binding */ currentTrackState),\n/* harmony export */   handleNextBtnClick: () => (/* binding */ handleNextBtnClick),\n/* harmony export */   handlePrevBtnClick: () => (/* binding */ handlePrevBtnClick),\n/* harmony export */   playerBox: () => (/* binding */ playerBox),\n/* harmony export */   playerBoxNextBtn: () => (/* binding */ playerBoxNextBtn),\n/* harmony export */   playerBoxPlayBtn: () => (/* binding */ playerBoxPlayBtn),\n/* harmony export */   togglePlayPauseBtn: () => (/* binding */ togglePlayPauseBtn)\n/* harmony export */ });\n/* harmony import */ var _controllers_queue_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./controllers/queue.js */ \"./src/client/js/controllers/queue.js\");\n/* harmony import */ var _main_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./main.js */ \"./src/client/js/main.js\");\n/* harmony import */ var _painters_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./painters.js */ \"./src/client/js/painters.js\");\n/* harmony import */ var _playerScreen_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./playerScreen.js */ \"./src/client/js/playerScreen.js\");\n\n\n\n\nconsole.log(\"Script loaded\");\nconst musicCards = document.querySelectorAll(\"#music-card\");\nconst playerBox = document.getElementById(\"player-box\");\nconst playerBoxPlayBtn = playerBox.querySelector(\".play-btn\");\nconst playerBoxNextBtn = playerBox.querySelector(\".next-btn\");\nlet clientPlayList = [];\nlet currentTrackState = {\n  index: 0\n};\n\n// player commands\nfunction togglePlayPauseBtn() {\n  if (_main_js__WEBPACK_IMPORTED_MODULE_1__.iframe.player && _main_js__WEBPACK_IMPORTED_MODULE_1__.iframe.player.getPlayerState() === YT.PlayerState.PLAYING) {\n    _main_js__WEBPACK_IMPORTED_MODULE_1__.iframe.player.pauseVideo();\n  } else if (_main_js__WEBPACK_IMPORTED_MODULE_1__.iframe.player && _main_js__WEBPACK_IMPORTED_MODULE_1__.iframe.player.getPlayerState() !== YT.PlayerState.PLAYING) {\n    _main_js__WEBPACK_IMPORTED_MODULE_1__.iframe.player.playVideo();\n  }\n}\nfunction handleNextBtnClick() {\n  if (currentTrackState.index < clientPlayList.length - 1) {\n    currentTrackState.index++;\n    const nextTrack = clientPlayList[currentTrackState.index];\n    (0,_painters_js__WEBPACK_IMPORTED_MODULE_2__.paintPlayerWithTrackInfo)();\n    (0,_playerScreen_js__WEBPACK_IMPORTED_MODULE_3__.paintPlayerScreen)();\n    _main_js__WEBPACK_IMPORTED_MODULE_1__.iframe.player.loadVideoById(nextTrack.videoId);\n  } else {\n    console.log(\"End of playlist reached\");\n  }\n  (0,_painters_js__WEBPACK_IMPORTED_MODULE_2__.updateNextButtonStatus)();\n  (0,_painters_js__WEBPACK_IMPORTED_MODULE_2__.updatePrevButtonStatus)();\n}\nfunction handlePrevBtnClick() {\n  if (currentTrackState.index > 0) {\n    currentTrackState.index--;\n  } else {\n    if (prevBtn) {\n      prevBtn.disabled = true;\n    }\n    currentTrackState.index = clientPlayList.length - 1;\n  }\n  (0,_painters_js__WEBPACK_IMPORTED_MODULE_2__.paintPlayerWithTrackInfo)();\n  (0,_playerScreen_js__WEBPACK_IMPORTED_MODULE_3__.paintPlayerScreen)();\n  (0,_painters_js__WEBPACK_IMPORTED_MODULE_2__.updateNextButtonStatus)();\n  (0,_painters_js__WEBPACK_IMPORTED_MODULE_2__.updatePrevButtonStatus)();\n  _main_js__WEBPACK_IMPORTED_MODULE_1__.iframe.player.loadVideoById(clientPlayList[currentTrackState.index].videoId);\n}\nconst onMusicCardClick = _ref => {\n  let {\n    videoId,\n    title,\n    artist,\n    albumImageUrl\n  } = _ref;\n  if (_main_js__WEBPACK_IMPORTED_MODULE_1__.iframe.player) {\n    (0,_controllers_queue_js__WEBPACK_IMPORTED_MODULE_0__.addMusicToQueue)({\n      videoId,\n      title,\n      artist,\n      albumImageUrl\n    });\n  } else {\n    console.log(\"clicked music title\", title);\n    console.error(\"Player has not been initialized yet\");\n  }\n};\nmusicCards.forEach(musicCard => {\n  const videoId = musicCard.dataset.videoid;\n  const title = musicCard.dataset.title;\n  const artist = musicCard.dataset.artist;\n  const albumImageUrl = musicCard.dataset.albumimageurl;\n  if (videoId) {\n    musicCard.addEventListener(\"click\", event => {\n      onMusicCardClick({\n        videoId,\n        title,\n        artist,\n        albumImageUrl\n      });\n    });\n  } else {\n    console.error(\"Music card does not have a data-videoid attribute\");\n  }\n});\nplayerBoxPlayBtn.addEventListener(\"click\", togglePlayPauseBtn);\nplayerBoxNextBtn.addEventListener(\"click\", handleNextBtnClick);\ndocument.addEventListener(\"DOMContentLoaded\", () => {\n  const tag = document.createElement(\"script\");\n  tag.src = \"https://www.youtube.com/iframe_api\";\n  document.body.appendChild(tag);\n});\n\n//# sourceURL=webpack://cherry-music/./src/client/js/player.js?");

/***/ }),

/***/ "./src/client/js/playerScreen.js":
/*!***************************************!*\
  !*** ./src/client/js/playerScreen.js ***!
  \***************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   checkBox: () => (/* binding */ checkBox),\n/* harmony export */   handleRepeatBtnClick: () => (/* binding */ handleRepeatBtnClick),\n/* harmony export */   handleShuffleBtnClick: () => (/* binding */ handleShuffleBtnClick),\n/* harmony export */   isRepeatOn: () => (/* binding */ isRepeatOn),\n/* harmony export */   isShuffleOn: () => (/* binding */ isShuffleOn),\n/* harmony export */   paintPlayerScreen: () => (/* binding */ paintPlayerScreen),\n/* harmony export */   playerScreenNextBtn: () => (/* binding */ playerScreenNextBtn),\n/* harmony export */   playerScreenPlayBtn: () => (/* binding */ playerScreenPlayBtn),\n/* harmony export */   playerScreenPrevBtn: () => (/* binding */ playerScreenPrevBtn),\n/* harmony export */   updateProgressBar: () => (/* binding */ updateProgressBar)\n/* harmony export */ });\n/* harmony import */ var _controllers_timeline_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./controllers/timeline.js */ \"./src/client/js/controllers/timeline.js\");\n/* harmony import */ var _main_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./main.js */ \"./src/client/js/main.js\");\n/* harmony import */ var _player_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./player.js */ \"./src/client/js/player.js\");\n/* harmony import */ var _util_formatTime_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./util/formatTime.js */ \"./src/client/js/util/formatTime.js\");\n/* harmony import */ var _util_marquee_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./util/marquee.js */ \"./src/client/js/util/marquee.js\");\n\n\n\n\n\nconst playerBox = document.getElementById(\"player-box\");\nconst playerScreen = document.getElementById(\"player-screen\");\nconst chevron = document.querySelector(\".fa-chevron-down\");\nconst playerScreenPrevBtn = document.querySelector(\".prev-btn\");\nconst playerScreenNextBtn = playerScreen.querySelector(\".next-btn\");\nconst playerScreenPlayBtn = playerScreen.querySelector(\".play-btn\");\nconst checkBox = document.querySelector(\"#check_box\");\nconst suffleBtn = document.querySelector(\".shuffle\");\nconst repeatBtn = document.querySelector(\".repeat-btn\");\nconst prevBtn = document.querySelector(\".prev-btn\");\nconst paintPlayerScreen = () => {\n  const {\n    videoId,\n    title,\n    artist,\n    albumImageUrl\n  } = _player_js__WEBPACK_IMPORTED_MODULE_2__.clientPlayList[_player_js__WEBPACK_IMPORTED_MODULE_2__.currentTrackState.index];\n  const albumCoverArea = playerScreen.querySelector(\".album-img\");\n  const titleArea = playerScreen.querySelector(\".track-title-area\");\n  const artistArea = playerScreen.querySelector(\".artist\");\n  albumCoverArea.src = albumImageUrl;\n  titleArea.innerHTML = (0,_util_marquee_js__WEBPACK_IMPORTED_MODULE_4__.paintTitleWithMarquee)(title);\n  artistArea.innerHTML = artist;\n};\nconst updateProgressBar = async () => {\n  await _main_js__WEBPACK_IMPORTED_MODULE_1__.playerReadyPromise;\n  if (!_player_js__WEBPACK_IMPORTED_MODULE_2__.player) {\n    return;\n  }\n  const currentTime = _main_js__WEBPACK_IMPORTED_MODULE_1__.iframe.player.getCurrentTime();\n  const duration = _main_js__WEBPACK_IMPORTED_MODULE_1__.iframe.player.getDuration();\n  const progress = currentTime / duration * 100;\n  _controllers_timeline_js__WEBPACK_IMPORTED_MODULE_0__.timeline.value = `${progress}`;\n  const currentTimeDisplay = document.querySelector(\".current-time\");\n  const durationDisplay = document.querySelector(\".duration\");\n  currentTimeDisplay.textContent = (0,_util_formatTime_js__WEBPACK_IMPORTED_MODULE_3__.formatTime)(currentTime);\n  durationDisplay.textContent = (0,_util_formatTime_js__WEBPACK_IMPORTED_MODULE_3__.formatTime)(duration);\n};\nconst hidePlayerBox = event => {\n  playerBox.style.transition = \"bottom 0.3s ease-out\";\n  if (event.target.checked) {\n    document.querySelector(\"#player-box\").style.bottom = \"-100%\";\n  } else {\n    document.querySelector(\"#player-box\").style.bottom = \"0\";\n  }\n};\n\n//player commands\nlet isShuffleOn = false;\nlet isRepeatOn = false;\nconst handleShuffleBtnClick = () => {\n  console.log(\"shuffle\");\n  isShuffleOn = !isShuffleOn;\n  if (isShuffleOn) {\n    _player_js__WEBPACK_IMPORTED_MODULE_2__.clientPlayList = _player_js__WEBPACK_IMPORTED_MODULE_2__.clientPlayList.sort(() => Math.random() - 0.5);\n  }\n};\nconst handleRepeatBtnClick = () => {\n  isRepeatOn = !isRepeatOn;\n  if (isRepeatOn) {\n    repeatBtn.style.color = \"rgba(216, 35, 65, 0.78)\";\n  } else {\n    repeatBtn.style.color = \"inherit\";\n  }\n};\nsuffleBtn.addEventListener(\"click\", handleShuffleBtnClick);\nrepeatBtn.addEventListener(\"click\", handleRepeatBtnClick);\nprevBtn.addEventListener(\"click\", _player_js__WEBPACK_IMPORTED_MODULE_2__.handlePrevBtnClick);\ncheckBox.addEventListener(\"change\", hidePlayerBox);\nchevron.addEventListener(\"click\", () => {\n  playerScreen.classList.remove(\"active\");\n});\nplayerScreenPlayBtn.addEventListener(\"click\", _player_js__WEBPACK_IMPORTED_MODULE_2__.togglePlayPauseBtn);\nplayerScreenNextBtn.addEventListener(\"click\", _player_js__WEBPACK_IMPORTED_MODULE_2__.handleNextBtnClick);\nplayerScreenPrevBtn.addEventListener(\"click\", _player_js__WEBPACK_IMPORTED_MODULE_2__.handlePrevBtnClick);\nplayerBox.addEventListener(\"click\", event => {\n  if (event.target.tagName === \"I\" || event.target.parentNode.className === \"play-btn\" || event.target.parentNode.className === \"pause-btn\") {\n    return;\n  }\n  playerScreen.classList.add(\"active\");\n});\n\n//# sourceURL=webpack://cherry-music/./src/client/js/playerScreen.js?");

/***/ }),

/***/ "./src/client/js/playerScreenNav.js":
/*!******************************************!*\
  !*** ./src/client/js/playerScreenNav.js ***!
  \******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   paintCurrentPlaying: () => (/* binding */ paintCurrentPlaying)\n/* harmony export */ });\n/* harmony import */ var _main_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./main.js */ \"./src/client/js/main.js\");\n/* harmony import */ var _player_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./player.js */ \"./src/client/js/player.js\");\n\n\nconst navArea = document.querySelector(\".player-screen__nav\");\nconst handle = navArea.querySelector(\".handle-bar\");\nconst buttons = navArea.querySelectorAll(\"button\");\nconst navBody = document.querySelector(\".nav__body\");\nconst pullUpNav = event => {\n  if (event.target !== handle) return;\n  navArea.classList.add(\"nav-active\");\n  const playerBox = document.getElementById(\"player-box\");\n  playerBox.classList.add(\"top-player\");\n  buttons[0].click();\n  handle.removeEventListener(\"click\", pullUpNav);\n  handle.addEventListener(\"click\", pushDownNav);\n};\nconst pushDownNav = event => {\n  if (event.target !== handle) return;\n  navArea.classList.remove(\"nav-active\");\n  const playerBox = document.getElementById(\"player-box\");\n  playerBox.classList.remove(\"top-player\");\n  handle.removeEventListener(\"click\", pushDownNav);\n  handle.addEventListener(\"click\", pullUpNav);\n};\nconst handleNavBtnClick = event => {\n  if (event.target.parentNode.classList[0] !== \"nav-items\") return;\n  buttons.forEach(button => {\n    button.classList.remove(\"clicked\");\n  });\n  if (event.target.classList.value == \"next-track\") {\n    mountPlayListTracks();\n  }\n  event.target.classList.add(\"clicked\");\n};\nconst paintCurrentPlaying = async () => {\n  await _main_js__WEBPACK_IMPORTED_MODULE_0__.playerReadyPromise;\n  const currentPlayingIndex = _player_js__WEBPACK_IMPORTED_MODULE_1__.currentTrackState.index;\n  const listMusicCards = document.querySelectorAll(\".playlist-music-card\");\n  if (listMusicCards) {\n    listMusicCards.forEach((card, index) => {\n      if (index == currentPlayingIndex) {\n        card.style.backgroundColor = \"#1c1c1cb0\";\n        card.style.padding = \"3rem 1.5rem 5rem 1.5rem\";\n      } else {\n        card.style.backgroundColor = \"transparent\";\n        card.style.padding = \"2rem 1.5rem 4rem 1.5rem\";\n      }\n    });\n  } else {\n    console.log(\"No playing card found at index\", currentPlayingIndex);\n  }\n};\nconst mountPlayListTracks = () => {\n  navBody.innerHTML = \"\";\n  if (_player_js__WEBPACK_IMPORTED_MODULE_1__.clientPlayList.length == 0) {\n    const emptyPlayListMsg = document.createElement(\"div\");\n    const msg = document.createElement(\"span\");\n    msg.innerHTML = \"재생목록에 곡을 추가해주세요.\";\n    emptyPlayListMsg.classList.add(\"empty-playlist-div\");\n    emptyPlayListMsg.appendChild(msg);\n    navBody.appendChild(emptyPlayListMsg);\n    return;\n  }\n  const musicCardsContainer = document.createElement(\"div\");\n  musicCardsContainer.classList.add(\"music-cards-container\");\n  _player_js__WEBPACK_IMPORTED_MODULE_1__.clientPlayList.forEach((track, index) => {\n    let musicCard = document.createElement(\"div\");\n    musicCard.id = \"music-card\";\n    musicCard.classList.add(\"playlist-music-card\");\n    musicCard.dataset.videoid = track.videoId;\n    musicCard.dataset.title = track.title;\n    musicCard.dataset.artist = track.artist;\n    musicCard.dataset.albumimageurl = track.albumImageUrl;\n    let albumCover = document.createElement(\"div\");\n    albumCover.classList.add(\"album-cover\");\n    albumCover.style.backgroundImage = `url(${track.albumImageUrl})`;\n    let titleArea = document.createElement(\"div\");\n    titleArea.classList.add(\"track-title-area\");\n    let trackTitle = document.createElement(\"div\");\n    trackTitle.classList.add(\"track-title\");\n    trackTitle.textContent = track.title;\n    titleArea.appendChild(trackTitle);\n    let artist = document.createElement(\"div\");\n    artist.classList.add(\"artist\");\n    artist.textContent = track.artist;\n    let playBtn = document.createElement(\"button\");\n    playBtn.classList.add(\"play-btn\");\n    let icon = document.createElement(\"i\");\n    icon.classList.add(\"fa-solid\");\n    icon.classList.add(\"fa-ellipsis-vertical\");\n    playBtn.appendChild(icon);\n    musicCard.appendChild(albumCover);\n    musicCard.appendChild(titleArea);\n    musicCard.appendChild(artist);\n    musicCard.appendChild(playBtn);\n    musicCardsContainer.appendChild(musicCard);\n  });\n  navBody.appendChild(musicCardsContainer);\n  paintCurrentPlaying();\n};\nhandle.addEventListener(\"click\", pullUpNav);\nbuttons.forEach(button => {\n  button.addEventListener(\"click\", handleNavBtnClick);\n});\n\n//# sourceURL=webpack://cherry-music/./src/client/js/playerScreenNav.js?");

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