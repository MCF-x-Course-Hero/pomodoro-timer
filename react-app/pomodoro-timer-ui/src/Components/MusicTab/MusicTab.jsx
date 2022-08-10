import * as React from "react";
import "./MusicTab.css"
import ReactPlayer from 'react-player/youtube'

import VideoPlayer from "./VideoPlayer";
import MusicForm from "./MusicForm";
export default function MusicTab({displayType}){

  const [urlForm, setUrlForm] = React.useState("https://youtube.com/playlist?list=PLJP5_qSxMbkI7B5W8uo_FLAtmSKwhxXLt")

    return (
      <div className="music-tab" style={{display:displayType}}>
      <h3>Music </h3>
        <MusicForm urlForm={urlForm} setUrlForm={setUrlForm}/>
        <VideoPlayer musicUrl={urlForm} displayType={displayType}/>
      </div>
    )
}