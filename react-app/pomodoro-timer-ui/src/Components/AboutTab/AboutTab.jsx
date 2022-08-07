import * as React from "react";
import "./AboutTab.css";
import { render } from "react-dom";
import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css'

export default function AboutTab() {
  return (
    <div className="about-tab">
      <h1>About</h1>
      <div className="about-pomozone">
        <h2>What is PomoZone?</h2>
        <p>
          PomoZone is a customizable pomodoro timer with progress tracking + agenda planning to help users stay in the
          zone and increase productivity. The aim of this app is to help you
          focus on any task you are working on. This app is inspired by the Pomodoro Technique, a time
          management method developed by Francesco Cirillo.
        </p>
      </div>
      <div className="why-pomodoro">
        <h2>What is the Pomodoro Technique?</h2>
        {/* <p>
          The Pomodoro Technique uses a timer to break down work into intervals,
          traditionally 25 minutes in length, separated by three short breaks. Each
          interval is known as a pomodoro. After the fourth pomodoro session, you go into a long break. 
        </p> */}
      </div>
      <div className="about-video">
        <LiteYouTubeEmbed 
        id="ppnPGk36mMY"
        title="Barbara Oakley Benefits of The Pomodoro Technique"
        />
      </div>
      <div className="our-team">
        <p>Developed by{" "}
          <a href="https://github.com/mariamconde" target="_blank">
            Mariam Conde
          </a>
          {", "}
          <a href="https://github.com/ShehabMohsen" target="_blank">
            Shehab Mohsen
          </a>
          {", "}
          <a href="https://github.com/JoseMario3" target="_blank">
            Jose Folgar
          </a>
        </p>
        <p>Check out our{" "}
          <a href="https://github.com/MCF-x-Course-Hero/pomodoro-timer" target="_blank">
            Github Repository
          </a>
        </p>
      </div>
    </div>
  );
}
