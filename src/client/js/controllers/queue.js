import { playerReadyPromise, setState, state } from "../main.js";
import {
  paintPlayerWithTrackInfo,
  updateNextButtonStatus,
  updatePrevButtonStatus,
} from "../painters.js";
import { paintPlayerScreen } from "../playerScreen.js";
import { paintCurrentPlaying } from "../playerScreenNav.js";

export const stopAndPlayFirst = async () => {
  console.log("sap");
  console.log("from sap clientPlaylist", state.clientPlaylist);
  await playerReadyPromise;
  if (state.iframePlayer) {
    const iframeNewState = state.iframePlayer.stopVideo();
    setState({ iframePlayer: iframeNewState }); //?
    const firstTrack = state.clientPlaylist[0];

    console.log("firstTrack", firstTrack);
    if (firstTrack) {
      console.log("firstTrack exist the id=", firstTrack.videoId);
      paintPlayerWithTrackInfo();
      paintPlayerScreen();
      state.iframePlayer.loadVideoById(firstTrack.videoId);
    } else {
      console.log("Fail get the first track");
    }
  } else {
    console.log("no state.iframePlayer yet");
  }
};

export const addMusicToQueue = async ({
  videoId,
  title,
  artist,
  albumImageUrl,
}) => {
  const newTrack = { videoId, title, artist, albumImageUrl };
  const newClientPlaylist = [newTrack, ...state.clientPlaylist];
  setState({ clientPlaylist: newClientPlaylist, currQueueIndex: 0 });

  updateNextButtonStatus();
  updatePrevButtonStatus();

  try {
    stopAndPlayFirst();
  } catch (error) {
    console.error("Player has not been initialized yet", error);
  }

  paintCurrentPlaying();
};
