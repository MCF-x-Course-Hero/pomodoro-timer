import * as React from "react";
import apiClient from "../Services/apiClient";

export const AuthContext = React.createContext();

export function useAuthContext() {
  return React.useContext(AuthContext);
}

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = React.useState({});
  const [initialized, setInitialized] = React.useState(false);
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [profileOpen, setProfileOpen] = React.useState(false);
  const [settingsOpen, setSettingsOpen] = React.useState(false);
  const [historyOpen, setHistoryOpen] = React.useState(false);
  const [listOpen, setListOpen] = React.useState(false);
  const [deleteUser, setDeleteUser] = React.useState(false);
  const [sessionsList, setSessionsList] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [login, setLogin] = React.useState(true);
  const [register, setRegister ] = React.useState(false);
  const [componentName, setComponentName] = React.useState("");
  const [error, setError] = React.useState({});
  const authStates = { user, initialized, isProcessing, loggedIn, error,
                      login, register, deleteUser, sessionsList, profileOpen,
                      settingsOpen, historyOpen, listOpen, componentName };
  const authSetStates = { setUser, setInitialized, setIsProcessing, setLoggedIn,
                        setError, setLogin, setRegister, setDeleteUser, setSessionsList };
  const authFunctions = { loginUser, fetchUserFromToken, logoutUser, handleOnToggle };
  
  function loginUser(person, token) {
    setRegister(false);
    setLogin(false);
    setLoggedIn(true);
    apiClient.setToken(token);
    person ? setUser({ ...person }) : null;
  }

  async function fetchUserFromToken() {
    const { data, error } = await apiClient.fetchUserFromToken();
    if (data) setUser({ ...data.user });
    if (error) setError(error);
  }

  function logoutUser() {
    setLoggedIn(false);
    setLogin(true);
    apiClient.setToken("null");
    localStorage.setItem("pomozone_token", "null");
    setUser({});
  }

  function handleOnToggle(tabName = "") {
    if(tabName == "profile" && !profileOpen) {
      document.getElementById("profile").classList.add("active");
      document.getElementById("settings").classList.remove("active");
      document.getElementById("todo").classList.remove("active");
      document.getElementById("history").classList.remove("active");
      setProfileOpen(true);
      setHistoryOpen(false);
      setListOpen(false);
      setSettingsOpen(false);
      document.querySelector("#side-menu").style.width = "450px";
    } else if(tabName == "profile" && profileOpen) {
      setProfileOpen(false);
      document.getElementById("profile").classList.remove("active");
      document.querySelector("#side-menu").style.width = "0";
    }
    
    if (tabName == "settings" && !settingsOpen) {
      setProfileOpen(false);
      setHistoryOpen(false);
      setListOpen(false);
      setSettingsOpen(true);
      document.getElementById("profile").classList.remove("active");
      document.getElementById("settings").classList.add("active");
      document.getElementById("todo").classList.remove("active");
      document.getElementById("history").classList.remove("active");
      document.querySelector("#side-menu").style.width = "450px";
    } else if(tabName == "settings" && settingsOpen) {
      setSettingsOpen(false);
      document.getElementById("settings").classList.remove("active");
      document.querySelector("#side-menu").style.width = "0";
    }
    
    if (tabName == "history" && !historyOpen) {
      setProfileOpen(false);
      setHistoryOpen(true);
      setListOpen(false);
      setSettingsOpen(false);
      document.getElementById("profile").classList.remove("active");
      document.getElementById("settings").classList.remove("active");
      document.getElementById("todo").classList.remove("active");
      document.getElementById("history").classList.add("active");
      document.querySelector("#side-menu").style.width = "450px";
    } else if(tabName == "history" && historyOpen) {
      setHistoryOpen(false);
      document.getElementById("history").classList.remove("active");
      document.querySelector("#side-menu").style.width = "0";
    }
    
    if (tabName == "todo" && !listOpen) {
      setProfileOpen(false);
      setHistoryOpen(false);
      setListOpen(true);
      setSettingsOpen(false);
      document.getElementById("profile").classList.remove("active");
      document.getElementById("settings").classList.remove("active");
      document.getElementById("todo").classList.add("active");
      document.getElementById("history").classList.remove("active");
      document.querySelector("#side-menu").style.width = "450px"; 
    } else if (tabName == "todo" && listOpen) {
      setListOpen(false);
      document.getElementById("todo").classList.remove("active")
      document.querySelector("#side-menu").style.width = "0";
    }

    if(tabName == "") {
      document.getElementById("profile").classList.remove("active");
      document.getElementById("settings").classList.remove("active");
      document.getElementById("todo").classList.remove("active");
      document.getElementById("history").classList.remove("active");
      document.querySelector("#side-menu").style.width = "0";      
    }

    /* setting the componentName to the name tabName that was clicked. 
    This way we can conditionally render the appropraite tab based on whats clicked */
    setComponentName(tabName)
  }

  React.useEffect(() => {
    const token = localStorage.getItem("pomozone_token");
    if (token !== "null") {
      apiClient.setToken(token);
      fetchUserFromToken();
      setLoggedIn(true);
      setLogin(false);
      setRegister(false);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ authStates, authSetStates, authFunctions }} >
      {children}
    </AuthContext.Provider>
  );
};