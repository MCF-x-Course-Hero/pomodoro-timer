import * as React from "react";

export const SidebarContext = React.createContext();

export function useSidebarContext() {
    return React.useContext(SidebarContext);
}

export const SidebarContextProvider = ({ children }) => {
    const [profileOpen, setProfileOpen] = React.useState(false);
    const [settingsOpen, setSettingsOpen] = React.useState(false);
    const [historyOpen, setHistoryOpen] = React.useState(false);
    const [listOpen, setListOpen] = React.useState(false);
    const sidebarStates = { profileOpen, settingsOpen, historyOpen, listOpen };
    //const sidebarSetStates = { setProfileOpen, setSettingsOpen, setHistoryOpen, setListOpen };
    const sidebarFunctions = { clickHistory, clickList, clickProfile, clickSettings };

    function clickProfile() {
        setHistoryOpen(false);
        setListOpen(false);
        setSettingsOpen(false);
        profileOpen ? setProfileOpen(false) : setProfileOpen(true);
    }

    function clickSettings() {
        setProfileOpen(false);
        setHistoryOpen(false);
        setListOpen(false);
        settingsOpen ? setSettingsOpen(false) : setSettingsOpen(true);
    }

    function clickList() {
        setProfileOpen(false);
        setHistoryOpen(false);
        setSettingsOpen(false);
        listOpen ? setListOpen(false) : setListOpen(true);
    }

    function clickHistory() {
        setProfileOpen(false);
        setListOpen(false);
        setSettingsOpen(false);
        historyOpen ? setHistoryOpen(false) : setHistoryOpen(true);
    }

    return(
        <SidebarContext.Provider value={{ sidebarStates, sidebarFunctions }}>
            {children}
        </SidebarContext.Provider>
    );
};