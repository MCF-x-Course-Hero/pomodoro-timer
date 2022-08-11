import * as React from "react";
import { SettingsContextProvider, useSettingsContext } from "../../contexts/SettingsContext";
import { AuthContextProvider, useAuthContext } from "../../contexts/AuthContext";
import { TodoContextProvider } from "../../contexts/TodoContext";
import { MusicContextProvider } from "../../contexts/MusicContext";
import DeleteModal from "../../Components/DeleteModal/DeleteModal";
import PinnedTodo from "../PinnedTodo/PinnedTodo";
import SidebarExpanded from "../SidebarExpanded/SidebarExpanded";
import useWindowSize from "react-use/lib/useWindowSize";
import Sidebar from "../Sidebar/Sidebar"; //new sidebar
import Confetti from "react-confetti";
import Timer from "../Timer/Timer";
import './App.css'
import "@fontsource/roboto-condensed";

export default function AppContainer() {
  return(
  <SettingsContextProvider>
    <AuthContextProvider>
      <TodoContextProvider>
        <MusicContextProvider>
        <App />
        </MusicContextProvider>
      </TodoContextProvider>
    </AuthContextProvider>
  </SettingsContextProvider>
)}

function App() {
  const {width, height} = useWindowSize();
  const { settingsStates } = useSettingsContext();
  const { authStates } = useAuthContext();
  
  return (
      <div className={`app ${settingsStates.darkToggle ? `${settingsStates.session}-dark-mode` : `${settingsStates.session}-${settingsStates.theme}`}`}>
        {settingsStates.isExploding ? <Confetti
          width={width}
          height={height}
          tweenDuration={5000}
        /> : null }
        <Sidebar />
        <SidebarExpanded />
        <Timer />
        <PinnedTodo />
        {authStates.deleteUser ? <DeleteModal /> : null }
      </div>
  )
}
