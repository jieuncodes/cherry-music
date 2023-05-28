import { iframe, playerReadyPromise, state } from "../main.js";
import {
  paintPlayerWithTrackInfo,
  updateNextButtonStatus,
  updatePrevButtonStatus,
} from "../painters.js";
import { paintPlayerScreen } from "../playerScreen.js";
import { paintCurrentPlaying } from "../playerScreenNav.js";

export const stopAndPlayFirst = () => {
  console.log("sap");
  console.log("cl", state.client.playlist);
  console.log("play the first music. id : ", state.client.playlist[0].videoId);
  if (iframe.player) {
    iframe.player.stopVideo();
    const firstTrack = state.client.playlist[0];
    if (firstTrack) {
      paintPlayerWithTrackInfo();
      paintPlayerScreen();

      iframe.player.loadVideoById(firstTrack.videoId);
    }
  }
};

export const addMusicToQueue = async ({
  videoId,
  title,
  artist,
  albumImageUrl,
}) => {
  console.log("Before unshift in addMusicToQueue", state.client.playlist);

  state.client.playlist = [
    {
      videoId,
      title,
      artist,
      albumImageUrl,
    },
    ...state.client.playlist,
  ];
  console.log("After unshift in addMusicToQueue", state.client.playlist);

  state.currentTrackState.index = 0;
  updateNextButtonStatus();
  updatePrevButtonStatus();

  try {
    stopAndPlayFirst();
  } catch (error) {
    console.error("Player has not been initialized yet", error);
  }
  paintCurrentPlaying();
};
