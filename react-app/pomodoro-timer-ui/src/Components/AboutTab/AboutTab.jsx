import * as React from "react";
import "./AboutTab.css";

export default function AboutTab() {
  return (
    <div className="about-tab">
      <h2>About</h2>
      <div className="about-pomozone">
        <h2>What is PomoZone?</h2>
        <p>
          Many people find it difficult to stay focused while completing tasks,
          especially for several hours at a time. PomoZone is a customizable
          progress tracker + agenda pomodoro timer to help with staying in the
          zone and increase productivity. The aim of this app is to help you
          focus on any task you are working on, such as studying, writing, or
          coding. This app is inspired by Pomodoro Technique which is a time
          management method developed by Francesco Cirillo.
        </p>
      </div>
      <div className="why-pomodoro">
        <h2>What is the Pomodoro Techniqque?</h2>
        <p>
          The Pomodoro Technique uses a timer to break down work into intervals,
          traditionally 25 minutes in length, separated by short breaks. Each
          interval is known as a pomodoro.
        </p>
      </div>
      <div className="why-pomozone">
        <h2>Why should I use PomoZone?</h2>
        <p>
          Because most pomodoro timers lack user profiles. PomoZone aimed to
          ensure the ability for the user to keep track of their progress from
          anywhere at any time. Aditionally, PomoZone emphasizes minimalism, and
          functionality so that the user may be rid of distractions. To further
          enhance this experience, one of the defining features for this app we
          plan to implement is the use of background music/ambience.
        </p>
      </div>
      <div className="app-features">
        <h2>Features</h2>
        <ul>
          <li>
            Customizable and responsive design - dark mode, selection of color
            themes, sound notifications, and set custom times
          </li>
          <li>Displays the tasks marked as complete/incomplete by the user</li>
          <li>Provides work/break session history seperated by days</li>
          <li>
            Option to add task and provides you with the ability to pin,
            complete and delete your task
          </li>
          <li>
            Includes user profile - can register and login to view and keep
            track of past and current progress
          </li>
        </ul>
      </div>
    </div>
  );
}
