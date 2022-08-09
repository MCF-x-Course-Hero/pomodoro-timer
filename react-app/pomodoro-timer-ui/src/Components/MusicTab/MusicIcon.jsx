import * as React from "react";
import "./MusicTab.css";
import { useState } from "react";
import ReactPlayer from "react-player";

export default function MusicIcon({ urlForm, setUrlForm }) {
  function handleOnSubmitIcon(url) {
    setUrlForm(url);
  }

  return (
    <div className="music-icon">
      <button
        className="btn"
        id="btnplay"
        onClick={() => {
          handleOnSubmitIcon("https://youtu.be/YAXTn0E-Zgo");
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
      {/* <button
        className="btn"
        id="btnplay"
        onClick={() => {
          handleOnSubmitIcon("https://youtu.be/WHPEKLQID4U");
        }}
      >
        OCEAN
      </button> */}
    </div>
  );
}
