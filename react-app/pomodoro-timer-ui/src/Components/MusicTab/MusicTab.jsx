import * as React from "react";
import "./MusicTab.css"
import ReactPlayer from 'react-player'
import VideoPlayer from "./VideoPlayer";
import MusicForm from "./MusicForm";
export default function MusicTab({displayType}){

  const [urlForm, setUrlForm] = React.useState("https://youtube.com/playlist?list=PLJP5_qSxMbkI7B5W8uo_FLAtmSKwhxXLt")



    return (
      <div className="music-content">
        <MusicForm urlForm={urlForm} setUrlForm={setUrlForm}/>
        <VideoPlayer musicUrl="https://youtube.com/playlist?list=PLJP5_qSxMbkI7B5W8uo_FLAtmSKwhxXLt" displayType={displayType}/>
      </div>
    )
}