import * as React from "react";
import "./MusicTab.css"
import ReactPlayer from 'react-player/youtube'

import VideoPlayer from "./VideoPlayer";
import MusicForm from "./MusicForm";
import MusicIcon from "./MusicIcon";
export default function MusicTab({displayType}){
  
    return (
      <div className="music-tab" style={{display:displayType}}>
      <h3>Music </h3>
        <MusicForm/>
        <VideoPlayer displayType={displayType}/>
        <MusicIcon/>
      </div>
    )
}