import * as React from "react";
import "./MusicTab.css";

export default function MusicForm({ urlForm, setUrlForm }) {
  // create logic for url form
  return (
    <div className="music-form">
      <p>Youtube Playlist URL</p>
      <input
        className="playlistLink"
        name="playlistId"
        type="text"
        placeholder="URL"
      />
    </div>
  );
}
