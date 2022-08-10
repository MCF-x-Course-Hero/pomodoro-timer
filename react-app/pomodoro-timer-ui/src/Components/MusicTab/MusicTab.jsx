import * as React from "react";
import "./MusicTab.css"
import ReactPlayer from 'react-player/youtube'
import {useMusicContext} from "../../contexts/MusicContext"
import MusicForm from "./MusicForm";
import MusicIcon from "./MusicIcon";

export default function MusicTab({displayType}){
  const { MusicContextVariables } = useMusicContext();
  const urlForm  = MusicContextVariables.urlForm;
  
    return (
      <div className="music-tab" style={{display:displayType}}>
      <h3>Music </h3>
        <MusicForm/>
        <VideoPlayer key = {String(urlForm)} displayType={displayType} urlForm={urlForm}/>
        <MusicIcon/>
      </div>
    )
}

export function VideoPlayer({ displayType, urlForm }) {

  return (
    <div className="video" style={{ display: displayType }}>
      <ReactPlayer
        width="410px"
        url={urlForm}
        controls
        playing={true}
      />
    </div>
  );
}

