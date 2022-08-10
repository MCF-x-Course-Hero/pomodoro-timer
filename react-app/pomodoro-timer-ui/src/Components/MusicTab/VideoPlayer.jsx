import * as React from "react";
import "./MusicTab.css";
import { useState } from "react";
import ReactPlayer from 'react-player/youtube'
import {useMusicContext} from "../../contexts/MusicContext"

export default function VideoPlayer({displayType}) {
  const {MusicContextVariables} = useMusicContext()
  const videoUrl = MusicContextVariables.urlForm
  console.log(1)
  return (
    <div className="video" style={{ display: displayType }}>

      <ReactPlayer
        width="410px"
        url={videoUrl}
        controls
      />
    </div>
  );
}
