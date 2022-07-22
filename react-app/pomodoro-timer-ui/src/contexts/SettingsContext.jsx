import * as React from "react";

export const SettingsContext = React.createContext();

export function useSettingsContext() {
    return React.useContext(SettingsContext);
}

export const SettingsContextProvider = ({children}) => {
    const [session, setSession] = React.useState("pomozone");
    const [theme, setTheme] = React.useState("pdefault");
    const [pomozoneTheme, setPomozoneTheme] = React.useState("pdefault");
    const [shortBreakTheme, setShortBreakTheme] = React.useState("sbdefault");
    const [longBreakTheme, setLongBreakTheme] = React.useState("lbdefault");
    const [notifToggle, setNotifToggle] = React.useState(false);
    const [darkToggle, setDarkToggle] = React.useState(false);
    const settingsStates = { session, theme, pomozoneTheme, shortBreakTheme, longBreakTheme, notifToggle, darkToggle };
    const settingsSetStates = { setSession, setTheme, setPomozoneTheme, setShortBreakTheme, setLongBreakTheme, setNotifToggle, setDarkToggle };
    const settingsFunctions = { darkModeToggle }

    function darkModeToggle() {
        setDarkToggle(!darkToggle);
        if(!darkToggle) {
            setPomozoneTheme("dark-mode");
            setShortBreakTheme("dark-mode");
            setLongBreakTheme("dark-mode");
            setTheme("dark-mode");
        } else {
            setPomozoneTheme("pdefault");
            setShortBreakTheme("sbdefault");
            setLongBreakTheme("lbdefault");
            session === "pomozone" ? setTheme("pdefault") : null;
            session === "short-break" ? setTheme("sbdefault") : null;
            session === "long-break" ? setTheme("lbdefault") : null;
        }
    }

    return (
        <SettingsContext.Provider value={{ settingsStates, settingsSetStates, settingsFunctions }} >
            {children}
        </SettingsContext.Provider>
    );
};