import * as React from "react";
import "./MusicTab.css";
import { useMusicContext } from "../../contexts/MusicContext";

export default function MusicIcon() {
  const { MusicContextVariables } = useMusicContext();
  const handleOnSubmitUrl = MusicContextVariables.handleOnSubmitUrl;
  const handleUrlInputChange = MusicContextVariables.handleUrlInputChange;
  const url = MusicContextVariables.url;
  const handleOnSubmitIcon = MusicContextVariables.handleOnSubmitIcon;
   
  const [activePreset, SetActivePreset] = React.useState("")

  function handleOnClickPreset(presetName){
    SetActivePreset(presetName)
  }
  console.log(activePreset)


  return (
    <div className="music-icon">
      <div className="button1">
        <button
          className={(activePreset == "lo-fi") ? "btnplay-current": "btnplay"}
          onClick={() => {
            handleOnClickPreset("lo-fi")
            handleOnSubmitIcon("https://youtu.be/jfKfPfyJRdk");
          }}
        >
          LO-FI
        </button>
        <button
          className={(activePreset == "jazz") ? "btnplay-current": "btnplay"}
          onClick={() => {
            handleOnClickPreset("jazz")
            handleOnSubmitIcon("https://youtu.be/neV3EPgvZ3g");
          }}
        >
          JAZZ
        </button>
      </div>
      <div className="button2">
        <button
          className={(activePreset == "fire-place") ? "btnplay-current": "btnplay"}
          onClick={() => {
            handleOnClickPreset("fire-place")
            handleOnSubmitIcon("https://youtu.be/UgHKb_7884o");
          }}
        >
          FIRE PLACE{" "}
        </button>
        <button
          className={(activePreset == "waves") ? "btnplay-current": "btnplay"}
          onClick={() => {

            handleOnClickPreset("waves")
            handleOnSubmitIcon("https://youtu.be/WHPEKLQID4U");
          }}
        >
          OCEAN WAVES{" "}
        </button>
      </div>
      <div className="button3">
        <button
          className={(activePreset == "rain") ? "btnplay-current": "btnplay"}
          onClick={() => {
            handleOnClickPreset("rain")
            handleOnSubmitIcon("https://youtu.be/8plwv25NYRo");
          }}
        >
          RAIN{" "}
        </button>
        <button
          className={(activePreset == "birds") ? "btnplay-current": "btnplay"}
          onClick={() => {
            
            handleOnClickPreset("birds")
            handleOnSubmitIcon("https://youtu.be/rYoZgpAEkFs");
          }}
        >
          BIRD{" "}
        </button>
      </div>
    </div>
  );
}
