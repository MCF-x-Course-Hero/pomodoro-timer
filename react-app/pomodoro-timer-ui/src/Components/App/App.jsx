import * as React from "react";
import { SettingsContextProvider, useSettingsContext } from "../../contexts/SettingsContext";
import { AuthContextProvider, useAuthContext } from "../../contexts/AuthContext";
import { TodoContextProvider } from "../../contexts/TodoContext";
import DeleteModal from "../../Components/DeleteModal/DeleteModal";
import SidebarExpanded from "../SidebarExpanded/SidebarExpanded";
import useWindowSize from "react-use/lib/useWindowSize";
import Sidebar from "../Sidebar/Sidebar"; //new sidebar
import Confetti from "react-confetti";
import Timer from "../Timer/Timer";
import './App.css'
import "@fontsource/roboto-condensed";


export default function AppContainer() {
  return(
  <AuthContextProvider>
    <SettingsContextProvider>
      <TodoContextProvider>
        <App />
      </TodoContextProvider>
    </SettingsContextProvider>
  </AuthContextProvider>
)}

function App() {
  const {width, height} = useWindowSize();
  const { settingsStates } = useSettingsContext();
  const { authStates } = useAuthContext();
  
  return (
      <div className={`app ${settingsStates.session}-${settingsStates.theme}`}>
        {settingsStates.isExploding ? <Confetti
          width={width}
          height={height}
          tweenDuration={5000}
        /> : null }
        <Sidebar />
        <SidebarExpanded />
        <Timer />
        {authStates.deleteUser ? <DeleteModal /> : null }
      </div>
  )
}
