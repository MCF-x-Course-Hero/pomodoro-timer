import * as React from "react";
import "./MusicTab.css";
import ReactPlayer from "react-player/youtube";
import { useMusicContext } from "../../contexts/MusicContext";
import MusicForm from "./MusicForm";
import MusicIcon from "./MusicIcon";

export default function MusicTab({displayType}){
  const { MusicContextVariables } = useMusicContext();
  const urlForm  = MusicContextVariables.urlForm;
    return (
      <div className="music-tab" style={{display:displayType}}>
      <h3>Music </h3>
      <MusicForm />
      {ReactPlayer.canPlay(urlForm) ? <VideoPlayer
        key={String(urlForm)}
        displayType={displayType}
        urlForm={urlForm}
      />: <h4>Please Include a Valid YouTube URL</h4>}
      <MusicIcon />
    </div>
  );
}

export function VideoPlayer({ displayType, urlForm }) {
  const { MusicContextVariables } = useMusicContext();
  const shouldPlay = MusicContextVariables.shouldPlay;

  return (
    <div className="video" style={{ display: displayType }}>
      <ReactPlayer
      className="video-player"
        width="410px"
        url={urlForm}
        controls
        playing={shouldPlay}
      />
    </div>
  );
}
