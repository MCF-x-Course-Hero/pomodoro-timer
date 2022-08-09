import * as React from "react";
import "./MusicTab.css";
import { useState } from "react";
import ReactPlayer from "react-player";
export default function VideoPlayer({
  musicUrl = "https://youtube.com/playlist?list=PLJP5_qSxMbkI7B5W8uo_FLAtmSKwhxXLt",displayType
}) {
  return (
    <div className="about-video" style={{ display: displayType }}>


      <ReactPlayer
        className="video"
        width="320"
        url={musicUrl}
        controls
      />
    </div>
  );
}
