import * as React from "react";
import "./MusicTab.css";
import SpotifyPlayer from "react-spotify-player";

export default function MusicTab() {
  // size may also be a plain string using the presets 'large' or 'compact'
  const size = {
    width: "95%",
    height: 500,
  };
  const view = "list"; // or 'coverart'
  const theme = "black"; // or 'white'
  
  return (
    <div className="music-tab">
      <h1>Music</h1>
      <SpotifyPlayer
        uri="spotify:playlist:0vvXsWCC9xrXsKd4FyS8kM"
        size={size}
        view={view}
        theme={theme}
      />
    </div>
  );
}
