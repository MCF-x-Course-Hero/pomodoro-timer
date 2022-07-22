import * as React from "react";
import Timer from "../Timer/Timer";
import SidebarContainer from "../Sidebar/Sidebar";
import { SettingsContextProvider, useSettingsContext } from "../../contexts/SettingsContext";
import './App.css'

export default function AppContainer() {
  return(
  <SettingsContextProvider>
    <App />
  </SettingsContextProvider>
)}

function App() {
  console.clear();
  const { settingsStates } = useSettingsContext();
  return (
      <div className={`app ${settingsStates.session}-${settingsStates.theme}`}>
        <Timer />
        <SidebarContainer />
      </div>
  )
}
