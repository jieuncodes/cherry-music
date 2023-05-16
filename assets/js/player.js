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

eval("__webpack_require__.r(__webpack_exports__);\nlet player;\nconst musicCards = document.querySelectorAll(\"#music-card\");\nconst playerBox = document.getElementById(\"player-box\");\nconst playButton = playerBox.querySelector(\".play-btn\");\nconst nextButton = playerBox.querySelector(\".next-btn\");\nlet clientPlayList = [];\nlet currentTrackIndex = 0;\nconst paintPlayerWithTrackInfo = () => {\n  playButton.innerHTML = '<i class=\"fa-solid fa-pause\"></i>';\n  const track = clientPlayList[currentTrackIndex];\n  const albumImgArea = playerBox.querySelector(\".album-cover\");\n  const trackTitleArea = playerBox.querySelector(\".track-title\");\n  const artistArea = playerBox.querySelector(\".artist\");\n  albumImgArea.style.backgroundImage = `url(${track.albumImage})`;\n  trackTitleArea.innerHTML = track.title;\n  artistArea.innerHTML = track.artist;\n};\nconst handlePlayBtnClick = () => {\n  if (player && player.getPlayerState() === YT.PlayerState.PLAYING | player.getPlayerState() === -1) {\n    player.pauseVideo();\n    playButton.innerHTML = '<i class=\"fa-solid fa-play\"></i>';\n  } else if (player && player.getPlayerState() === YT.PlayerState.PAUSED) {\n    player.playVideo();\n    playButton.innerHTML = '<i class=\"fa-solid fa-pause\"></i>';\n  }\n};\nconst handleNextBtnClick = () => {\n  console.log('click');\n  if (currentTrackIndex < clientPlayList.length - 1) {\n    currentTrackIndex++;\n    const nextTrack = clientPlayList[currentTrackIndex];\n    paintPlayerWithTrackInfo();\n    player.loadVideoById(nextTrack.videoId);\n  } else {\n    console.log(\"End of playlist reached\");\n  }\n};\nconst addMusicToQueue = async _ref => {\n  let {\n    videoId,\n    title,\n    artist,\n    albumImage\n  } = _ref;\n  try {\n    const response = await fetch(`/queue/${videoId}`, {\n      method: \"POST\",\n      headers: {\n        \"Content-Type\": \"application/json\"\n      }\n    });\n    if (!response.ok) {\n      console.error(\"Error!!\");\n      return;\n    }\n  } catch (error) {\n    console.error(\"Fetch failed\");\n  }\n  clientPlayList.unshift({\n    videoId,\n    title,\n    artist,\n    albumImage\n  });\n  currentTrackIndex = 0;\n  if (player) {\n    player.stopVideo();\n    const firstTrack = clientPlayList[0];\n    if (firstTrack) {\n      paintPlayerWithTrackInfo();\n      player.loadVideoById(firstTrack.videoId);\n    }\n  } else {\n    console.error(\"Player has not been initialized yet\");\n  }\n};\nconst onMusicCardClick = _ref2 => {\n  let {\n    videoId,\n    title,\n    artist,\n    albumImage\n  } = _ref2;\n  if (player) {\n    addMusicToQueue({\n      videoId,\n      title,\n      artist,\n      albumImage\n    });\n  } else {\n    console.error(\"Player has not been initialized yet\");\n  }\n};\nmusicCards.forEach(musicCard => {\n  const videoId = musicCard.dataset.videoid;\n  const title = musicCard.dataset.title;\n  const artist = musicCard.dataset.artist;\n  const albumImage = musicCard.dataset.albumimage;\n  if (videoId) {\n    musicCard.addEventListener(\"click\", () => onMusicCardClick({\n      videoId,\n      title,\n      artist,\n      albumImage\n    }));\n  } else {\n    console.error(\"Music card does not have a data-videoid attribute\");\n  }\n});\nconst onPlayerStateChange = event => {\n  if (event.data === YT.PlayerState.ENDED) {\n    handleNextBtnClick();\n    if (nextVideo) {\n      player.loadVideoById(nextVideo.videoId);\n    }\n  }\n};\n\n//eventListeners\n\nplayButton.addEventListener(\"click\", handlePlayBtnClick);\nnextButton.addEventListener(\"click\", handleNextBtnClick);\ndocument.addEventListener(\"DOMContentLoaded\", () => {\n  const tag = document.createElement(\"script\");\n  tag.src = \"https://www.youtube.com/iframe_api\";\n  document.body.appendChild(tag);\n  window.onYouTubeIframeAPIReady = () => {\n    const playerElement = document.getElementById(\"youtube-player\");\n    if (playerElement) {\n      player = new YT.Player(playerElement, {\n        videoId: \"Xit3nVfE18M\",\n        events: {\n          onReady: event => event.target.playVideo(),\n          onStateChange: onPlayerStateChange\n        }\n      });\n    } else {\n      console.error(\"Player element not found in the DOM\");\n    }\n  };\n});\n\n//# sourceURL=webpack://cherry-music/./src/client/js/player.js?");

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