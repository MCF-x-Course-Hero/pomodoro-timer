import * as React from "react";
import { Link } from "react-router-dom";
import "./AboutTab.css";

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
        <p>
          The Pomodoro Technique uses a timer to break down work into intervals,
          traditionally 25 minutes in length, separated by three short breaks. Each
          interval is known as a pomodoro. After the fourth pomodoro session, you go into a long break. 
        </p>
      </div>
      {/* <div className="app-features">
        <h2>Features</h2>
        <ul>
          <li>
            Customizable and responsive design - dark mode, selection of color
            themes, sound notifications, and set custom times
          </li>
          <li>Displays the tasks marked as complete/incomplete by the user</li>
          <li>Provides work/break session history separated by days</li>
          <li>
            Option to add task and provides you with the ability to pin,
            complete and delete your task
          </li>
          <li>
            Includes user profile - can register and login to view and keep
            track of past and current progress
          </li>
        </ul>
      </div> */}
      <div className="our-team">
        <p>Developed by{" "}
          <a href="https://github.com/mariamconde">
            Mariam Conde
          </a>
          {", "}
          <a href="https://github.com/ShehabMohsen">
            Shehab Mohsen
          </a>
          {", "}
          <a href="https://github.com/JoseMario3">
            Jose Folgar
          </a>
        </p>
        <p>Check out our{" "}
          <a href="https://github.com/MCF-x-Course-Hero/pomodoro-timer">
            Github Repository
          </a>
        </p>
      </div>
    </div>
  );
}
