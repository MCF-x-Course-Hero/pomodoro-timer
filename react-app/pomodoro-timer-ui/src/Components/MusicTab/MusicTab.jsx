import * as React from "react";
import "./MusicTab.css"
import ReactPlayer from 'react-player'
import VideoPlayer from "./VideoPlayer";
import MusicForm from "./MusicForm";
import MusicIcon from "./MusicIcon";
export default function MusicTab({displayType}){

  const [urlForm, setUrlForm] = React.useState("https://youtube.com/playlist?list=PLJP5_qSxMbkI7B5W8uo_FLAtmSKwhxXLt")

    return (
      <div className="music-tab" style={{display:displayType}}>
        <MusicForm urlForm={urlForm} setUrlForm={setUrlForm}/>
        <VideoPlayer musicUrl={urlForm} displayType={displayType}/>
        <MusicIcon musicUrl={urlForm} setUrlForm={setUrlForm}/>
      </div>
    )
}