import * as React from "react";
import "./MusicTab.css";
import { useState } from "react";
import ReactPlayer from 'react-player/youtube'

export default function VideoPlayer({
  musicUrl = "https://youtube.com/playlist?list=PLJP5_qSxMbkI7B5W8uo_FLAtmSKwhxXLt",displayType
}) {
  return (
    <div className="video" style={{ display: displayType }}>

      <ReactPlayer
        width="410px"
        url={musicUrl}
        controls
      />
    </div>
  );
}
