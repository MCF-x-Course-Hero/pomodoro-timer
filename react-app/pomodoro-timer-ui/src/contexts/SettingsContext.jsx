import * as React from "react";
import apiClient from "../Services/apiClient";

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
    const [error, setError] = React.useState({});
    const [isExploding, setIsExploding] = React.useState(false);
    const [timeForm, setTimeForm] = React.useState({ focusTime: 25, shortBreakTime: 5, longBreakTime: 15 })
    const settingsStates = { session, theme, pomozoneTheme, shortBreakTheme, longBreakTheme, notifToggle, darkToggle, isExploding, timeForm };
    const settingsSetStates = { setSession, setTheme, setPomozoneTheme, setShortBreakTheme, setLongBreakTheme, setNotifToggle, setDarkToggle, setIsExploding, setTimeForm };
    const settingsFunctions = { darkModeToggle, darkModeButtons, updateUserSettings, getUserSettings, addUserSettings, updateDefaultSettings }

    function darkModeButtons(mode) {
        if(mode == "default") {
            setDarkToggle(false);
            setPomozoneTheme("pdefault");
            setShortBreakTheme("sbdefault");
            setLongBreakTheme("lbdefault");
            session === "pomozone" ? setTheme("pdefault") : null;
            session === "short-break" ? setTheme("sbdefault") : null;
            session === "long-break" ? setTheme("lbdefault") : null;
        } else {
            setDarkToggle(true);
            setPomozoneTheme("dark-mode");
            setShortBreakTheme("dark-mode");
            setLongBreakTheme("dark-mode");
            setTheme("dark-mode");
        }
    }

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

    async function getUserSettings() {
        const { data, error } = await apiClient.getSettings();
        if (data) {
            setTheme(data.settings.pcolor);
            setPomozoneTheme(data.settings.pcolor);
            setShortBreakTheme(data.settings.sbcolor);
            setLongBreakTheme(data.settings.lbcolor);
            setTimeForm({
                focusTime: data.settings.ptime,
                shortBreakTime: data.settings.sbtime,
                longBreakTime: data.settings.lbtime,
            });
            setDarkToggle(data.settings.dark_mode);
            setNotifToggle(data.settings.sound_notif);
        }
        if (error) setError(error);
    }

    async function updateUserSettings() {
        const allSettings = {
            pTime: timeForm.focusTime,
            sbTime: timeForm.shortBreakTime,
            lbTime: timeForm.longBreakTime,
            pColor: pomozoneTheme,
            sbColor: shortBreakTheme,
            lbColor: longBreakTheme,
            dark_mode: darkToggle,
            sound_notif: notifToggle
        }
        const { data, error } = await apiClient.updateSettings(allSettings);
        // if (data) {
        //     console.log("updated settings", data);
        // }
        if (error) setError(error);
    }

    async function updateDefaultSettings() {
        setPomozoneTheme("pdefault");
        setShortBreakTheme("sbdefault");
        setLongBreakTheme("lbdefault");
        setTimeForm({
            focusTime: 25,
            shortBreakTime: 5,
            longBreakTime: 15
        })
        setDarkToggle(false);
        setNotifToggle(false);
        const allSettings = {
            pTime: 25,
            sbTime: 5,
            lbTime: 15,
            pColor: "pdefault",
            sbColor: "sbdefault",
            lbColor: "lbdefault",
            dark_mode: false,
            sound_notif: false
        }
        const { data, error } = await apiClient.updateSettings(allSettings);
        // if (data) {
        //     console.log("updated settings", data);
        // }
        if (error) setError(error);
    }

    async function addUserSettings() {
        const allSettings = {
            pTime: timeForm.focusTime,
            sbTime: timeForm.shortBreakTime,
            lbTime: timeForm.longBreakTime,
            pColor: pomozoneTheme,
            sbColor: shortBreakTheme,
            lbColor: longBreakTheme,
            dark_mode: darkToggle,
            sound_notif: notifToggle
        }
        const { data, error } = await apiClient.addSettings(allSettings);
        // if (data) {
        //     console.log("added settings", data);
        // }
        if (error) setError(error);
    }

    return (
        <SettingsContext.Provider value={{ settingsStates, settingsSetStates, settingsFunctions }} >
            {children}
        </SettingsContext.Provider>
    );
};