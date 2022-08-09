import * as React from "react";
import "./MusicTab.css"
import ReactPlayer from 'react-player'

export default function MusicTab({displayType}){


    return (

        <div className="about-video" style = {{display:displayType}}>
        <ReactPlayer className="video"
          width="320"
          url="https://youtube.com/playlist?list=PLJP5_qSxMbkI7B5W8uo_FLAtmSKwhxXLt"
          allowFullScreen
          controls
        />
      </div>
    )
}