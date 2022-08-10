import * as React from "react";
import "./MusicTab.css";
import { useMusicContext } from "../../contexts/MusicContext";

export default function MusicIcon() {
  const { MusicContextVariables } = useMusicContext();
  const handleOnSubmitUrl = MusicContextVariables.handleOnSubmitUrl;
  const handleUrlInputChange = MusicContextVariables.handleUrlInputChange;
  const url = MusicContextVariables.url;
  const handleOnSubmitIcon = MusicContextVariables.handleOnSubmitIcon;

  return (
    <div className="music-icon">
      <button
        className="btn"
        id="btnplay"
        onClick={() => {
          handleOnSubmitIcon("https://youtu.be/jfKfPfyJRdk");
        }}
      >
        LOFI
      </button>
      <button
        className="btn"
        id="btnplay"
        onClick={() => {
          handleOnSubmitIcon("https://youtu.be/UgHKb_7884o");
        }}
      >
        FIRE PLACE
      </button>
      <button
        className="btn"
        id="btnplay"
        onClick={() => {
          handleOnSubmitIcon("https://youtu.be/WHPEKLQID4U");
        }}
      >
        OCEAN WAVES
      </button>
      <button
        className="btn"
        id="btnplay"
        onClick={() => {
          handleOnSubmitIcon("https://youtu.be/8plwv25NYRo");
        }}
      >
        RAIN
      </button>
      <button
        className="btn"
        id="btnplay"
        onClick={() => {
          handleOnSubmitIcon("https://youtu.be/neV3EPgvZ3g");
        }}
      >
        JAZZ
      </button>
      <button
        className="btn"
        id="btnplay"
        onClick={() => {
          handleOnSubmitIcon("https://youtu.be/rYoZgpAEkFs");
        }}
      >
        BIRD
      </button>
    </div>
  );
}
