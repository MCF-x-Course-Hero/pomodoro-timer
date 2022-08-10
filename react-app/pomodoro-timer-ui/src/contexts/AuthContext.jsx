import * as React from "react";
import apiClient from "../Services/apiClient";
import { useSettingsContext } from "./SettingsContext";

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
  const [aboutOpen, setAboutOpen] = React.useState(false);
  const [musicOpen, setMusicOpen] = React.useState(false)
  const [deleteUser, setDeleteUser] = React.useState(false);
  const [sessionsList, setSessionsList] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [login, setLogin] = React.useState(true);
  const [register, setRegister] = React.useState(false);
  const [error, setError] = React.useState({});
  const [active, setActive] = React.useState("");
  const [componentName, setComponentName] = React.useState("");
  const { settingsFunctions, settingsStates, settingsSetStates } =
    useSettingsContext();
  const authStates = {
    user,
    initialized,
    isProcessing,
    loggedIn,
    error,
    login,
    register,
    deleteUser,
    sessionsList,
    profileOpen,
    settingsOpen,
    historyOpen,
    listOpen,
    aboutOpen,
    componentName,
    active,
    musicOpen
  };
  const authSetStates = {
    setUser,
    setInitialized,
    setIsProcessing,
    setLoggedIn,
    setError,
    setLogin,
    setRegister,
    setDeleteUser,
    setSessionsList,
    setActive,
  };
  const authFunctions = {
    loginUser,
    registerUser,
    fetchUserFromToken,
    logoutUser,
    handleOnToggle,
    darkModeButton,
  };

  function loginUser(person, token) {
    setRegister(false);
    setLogin(false);
    setLoggedIn(true);
    apiClient.setToken(token);
    settingsFunctions.getUserSettings();
    person ? setUser({ ...person }) : null;
  }

  function registerUser(person, token) {
    setRegister(false);
    setLogin(false);
    setLoggedIn(true);
    apiClient.setToken(token);
    person ? setUser({ ...person }) : null;
  }

  async function fetchUserFromToken() {
    const { data, error } = await apiClient.fetchUserFromToken();
    if (data) {
      setUser({ ...data.user });
      settingsFunctions.getUserSettings();
    }
    if (error) setError(error);
  }

  function logoutUser() {
    setLoggedIn(false);
    setLogin(true);
    apiClient.setToken("null");
    localStorage.setItem("pomozone_token", "null");
    setUser({});
    settingsSetStates.setUserSettings({});
  }

  function darkModeButton(mode) {
    if(mode == "default") {
        settingsSetStates.setDarkToggle(false);
        if (loggedIn) {
          settingsSetStates.setPomozoneTheme(settingsStates.userSettings.settings.pcolor);
          settingsSetStates.setShortBreakTheme(settingsStates.userSettings.settings.sbcolor);
          settingsSetStates.setLongBreakTheme(settingsStates.userSettings.settings.lbcolor);
          settingsStates.session === "pomozone" ? settingsSetStates.setTheme(settingsStates.userSettings.settings.pcolor) : null;
          settingsStates.session === "short-break" ? settingsSetStates.setTheme(settingsStates.userSettings.settings.sbcolor) : null;
          settingsStates.session === "long-break" ? settingsSetStates.setTheme(settingsStates.userSettings.settings.lbcolor) : null;
        } else {
          settingsStates.session === "pomozone" ? settingsSetStates.setTheme(settingsStates.pomozoneTheme) : null;
          settingsStates.session === "short-break" ? settingsSetStates.setTheme(settingsStates.shortBreakTheme) : null;
          settingsStates.session === "long-break" ? settingsSetStates.setTheme(settingsStates.longBreakTheme) : null;
        }
    } else {
        settingsSetStates.setDarkToggle(true);
        settingsSetStates.setTheme("dark-mode");
    }
  }

  function handleOnToggle(tabName = "") {
    if (tabName == "profile" && !profileOpen) {
      setProfileOpen(true);
      setHistoryOpen(false);
      setListOpen(false);
      setSettingsOpen(false);
      // setMusicOpen(false)
      
    } else if (tabName == "profile" && profileOpen) {
      setProfileOpen(false);
    }
    
    if (tabName == "settings" && !settingsOpen) {
      setProfileOpen(false);
      setHistoryOpen(false);
      setAboutOpen(false);
      setListOpen(false);
      setSettingsOpen(true);
      // setMusicOpen(false)
    } else if (tabName == "settings" && settingsOpen) {
      setSettingsOpen(false);
      document.getElementById("settings").classList.remove("active");
    }

    if (tabName == "history" && !historyOpen) {
      setProfileOpen(false);
      setAboutOpen(false);
      setHistoryOpen(true);
      setListOpen(false);
      setSettingsOpen(false);
      // setMusicOpen(false)

    } else if (tabName == "history" && historyOpen) {
      setHistoryOpen(false);
    }

    if (tabName == "todo" && !listOpen) {
      setProfileOpen(false);
      setHistoryOpen(false);
      setAboutOpen(false);
      setListOpen(true);
      setSettingsOpen(false);
      // setMusicOpen(false)

    } else if (tabName == "todo" && listOpen) {
      setListOpen(false);
    }

    if (tabName == "about" && !aboutOpen) {
      setProfileOpen(false);
      setHistoryOpen(false);
      setSettingsOpen(false);
      setListOpen(false);
      setAboutOpen(true);
      // setMusicOpen(false)

    } else if (tabName == "about" && aboutOpen) {
      setAboutOpen(false);
    }
    if (!musicOpen) {
      setMusicOpen(true)
      setProfileOpen(false);
      setHistoryOpen(false);
      setSettingsOpen(false);
      setListOpen(false);
      setAboutOpen(false);
    }

    /* setting the componentName to the name tabName that was clicked. 
    This way we can conditionally render the appropraite tab based on whats clicked */
    setComponentName(tabName);
    setActive((active)=>active === tabName ? "" : tabName);
  }

  React.useEffect(() => {
    const token = localStorage.getItem("pomozone_token");
    if (token !== "null" && token !== null) {
      apiClient.setToken(token);
      fetchUserFromToken();
      setLoggedIn(true);
      setLogin(false);
      setRegister(false);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ authStates, authSetStates, authFunctions }}>
      {children}
    </AuthContext.Provider>
  );
};
