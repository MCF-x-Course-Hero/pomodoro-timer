import * as React from "react";
import Timer from "../Timer/Timer";
import SidebarContainer from "../Sidebar/Sidebar";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";
import { SettingsContextProvider, useSettingsContext } from "../../contexts/SettingsContext";
import { TodoContextProvider } from "../../contexts/TodoContext";
import './App.css'
import PinnedTodo from "../PinnedTodo/PinnedTodo";
import "../PinnedTodo/PinnedTodo.css"

export default function AppContainer() {
  return(
  <SettingsContextProvider>
  <TodoContextProvider>
    <App />
  </TodoContextProvider>
  </SettingsContextProvider>
)}

function App() {
  const {width, height} = useWindowSize();
  const { settingsStates } = useSettingsContext();

  return (
      <div className={`app ${settingsStates.session}-${settingsStates.theme}`}>
        {settingsStates.isExploding ? <Confetti
          width={width}
          height={height}
          tweenDuration={5000}
        /> : null }
        {/* <PinnedTodo /> */}
        <Timer />
        <SidebarContainer />
      </div>
  )
}
