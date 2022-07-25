import * as React from "react";
import Timer from "../Timer/Timer";
import SidebarContainer from "../Sidebar/Sidebar";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";
import { SettingsContextProvider, useSettingsContext } from "../../contexts/SettingsContext";
import './App.css'

export default function AppContainer() {
  return(
  <SettingsContextProvider>
    <App />
  </SettingsContextProvider>
)}

function App() {
  const {width, height} = useWindowSize();
  console.clear();
  const { settingsStates } = useSettingsContext();
  return (
      <div className={`app ${settingsStates.session}-${settingsStates.theme}`}>
        {settingsStates.isExploding ? <Confetti
          width={width}
          height={height}
          tweenDuration={5000}
        /> : null }
        <Timer />
        <SidebarContainer />
      </div>
  )
}
