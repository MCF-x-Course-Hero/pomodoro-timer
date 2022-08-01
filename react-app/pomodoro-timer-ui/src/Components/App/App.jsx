import * as React from "react";
import { SettingsContextProvider, useSettingsContext } from "../../contexts/SettingsContext";
import { AuthContextProvider, useAuthContext } from "../../contexts/AuthContext";
import { TodoContextProvider } from "../../contexts/TodoContext";
import './App.css'
import DeleteModal from "../../Components/DeleteModal/DeleteModal";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";
import Timer from "../Timer/Timer";
import './App.css';
import SidebarContainer from "../Sidebar/Sidebar"; //old sidebar
import Sidebar from "../Sidebar/Sidebar"; //new sidebar
import SidebarExpanded from "../SidebarExpanded/SidebarExpanded";

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

  // isOpen is a boolean value responsible for toggling big side bar on and off
  const [isOpen, setIsOpen] = React.useState(false);

  /* componentName specifies the component we want to render as the sidebar is being expanded.
  this happens in response to whatever tab button is clicked.
  */
  const [componentName, setComponentName] = React.useState("")

  function handleOnToggle(tabName = "") {
    //accepts default value since when we close the expanded view we do not pass any tabName

    if (isOpen) {
      // decreases width of "ExpandedSidebar"
      setIsOpen(false);
      document.querySelector("#side-menu").style.width = "0";
      // document.querySelector(".navbar-nav").style.marginLeft = "0";
    }
    if (!isOpen) {
      // increases width of "ExpandedSidebar"
      setIsOpen(true);
      document.querySelector("#side-menu").style.width = "35%";

      //accounts for the space taken by the smaller sidebar:
      // document.querySelector("#side-menu").style.marginLeft = "180px"; 
    }

    /* setting the componentName to the name tabName that was clicked. 
    This way we can conditionally render the appropraite tab based on whats clicked */
    setComponentName(tabName)
  }

  return (
      <div className={`app ${settingsStates.session}-${settingsStates.theme}`}>
        {settingsStates.isExploding ? <Confetti
          width={width}
          height={height}
          tweenDuration={5000}
        /> : null }
        
        <Sidebar handleOnToggle = {handleOnToggle}/>
        <SidebarExpanded handleOnToggle = {handleOnToggle} componentName = {componentName}/>
        <Timer />
        {authStates.deleteUser ? <DeleteModal /> : null }
      </div>
  )
}

