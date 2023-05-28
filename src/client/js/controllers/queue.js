import { iframe } from "../main.js";
import {
  paintPlayerWithTrackInfo,
  updateNextButtonStatus,
  updatePrevButtonStatus,
} from "../painters.js";
import { clientPlayList, currentTrackState } from "../player.js";
import { paintPlayerScreen } from "../playerScreen.js";
import { paintCurrentPlaying } from "../playerScreenNav.js";

export const addMusicToQueue = async ({
  videoId,
  title,
  artist,
  albumImageUrl,
}) => {
  clientPlayList.unshift({
    videoId,
    title,
    artist,
    albumImageUrl,
  });
  currentTrackState.index = 0;
  updateNextButtonStatus();
  updatePrevButtonStatus();

  if (iframe.player) {
    iframe.player.stopVideo();
    const firstTrack = clientPlayList[0];
    if (firstTrack) {
      paintPlayerWithTrackInfo();
      paintPlayerScreen();

      iframe.player.loadVideoById(firstTrack.videoId);
    }
  } else {
    console.error("Player has not been initialized yet");
  }
  paintCurrentPlaying();
};
