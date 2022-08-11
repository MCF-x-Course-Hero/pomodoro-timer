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
      <div className="button1">
        <button
          id="btnplay"
          onClick={() => {
            handleOnSubmitIcon("https://youtu.be/jfKfPfyJRdk");
          }}
        >
          LOFI 
        </button>
        <button
          id="btnplay"
          onClick={() => {
            handleOnSubmitIcon("https://youtu.be/neV3EPgvZ3g");
          }}
        >
          JAZZ <i class="fa-solid fa-record-vinyl"></i>
        </button>
      </div>
      <div className="button2">
        <button
          id="btnplay"
          onClick={() => {
            handleOnSubmitIcon("https://youtu.be/UgHKb_7884o");
          }}
        >
          FIRE PLACE{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon icon-tabler icon-tabler-flame"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="#ffffff"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M12 12c2 -2.96 0 -7 -1 -8c0 3.038 -1.773 4.741 -3 6c-1.226 1.26 -2 3.24 -2 5a6 6 0 1 0 12 0c0 -1.532 -1.056 -3.94 -2 -5c-1.786 3 -2.791 3 -4 2z" />
          </svg>
        </button>
        <button
          id="btnplay"
          onClick={() => {
            handleOnSubmitIcon("https://youtu.be/WHPEKLQID4U");
          }}
        >
          OCEAN WAVES{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon icon-tabler icon-tabler-ripple"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="#ffffff"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M3 7c3 -2 6 -2 9 0s6 2 9 0" />
            <path d="M3 17c3 -2 6 -2 9 0s6 2 9 0" />
            <path d="M3 12c3 -2 6 -2 9 0s6 2 9 0" />
          </svg>
        </button>
      </div>
      <div className="button3">
        <button
          id="btnplay"
          onClick={() => {
            handleOnSubmitIcon("https://youtu.be/8plwv25NYRo");
          }}
        >
          RAIN{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon icon-tabler icon-tabler-cloud-rain"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="#ffffff"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M7 18a4.6 4.4 0 0 1 0 -9a5 4.5 0 0 1 11 2h1a3.5 3.5 0 0 1 0 7" />
            <path d="M11 13v2m0 3v2m4 -5v2m0 3v2" />
          </svg>
        </button>
        <button
          id="btnplay"
          onClick={() => {
            handleOnSubmitIcon("https://youtu.be/rYoZgpAEkFs");
          }}
        >
          BIRD{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon icon-tabler icon-tabler-feather"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="#ffffff"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M4 20l10 -10m0 -5v5h5m-9 -1v5h5m-9 -1v5h5m-5 -5l4 -4l4 -4" />
            <path d="M19 10c.638 -.636 1 -1.515 1 -2.486a3.515 3.515 0 0 0 -3.517 -3.514c-.97 0 -1.847 .367 -2.483 1m-3 13l4 -4l4 -4" />
          </svg>
        </button>
      </div>
    </div>
  );
}
