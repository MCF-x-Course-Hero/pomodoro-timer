import * as React from "react";
import apiClient from "../Services/apiClient";

export const SettingsContext = React.createContext();

export function useSettingsContext() {
    return React.useContext(SettingsContext);
}

export const SettingsContextProvider = ({children}) => {
    const [userSettings, setUserSettings] = React.useState({});
    const [session, setSession] = React.useState("pomozone");
    const [theme, setTheme] = React.useState("pdefault");
    const [pomozoneTheme, setPomozoneTheme] = React.useState("pdefault");
    const [shortBreakTheme, setShortBreakTheme] = React.useState("sbdefault");
    const [longBreakTheme, setLongBreakTheme] = React.useState("lbdefault");
    const [fadeProp, setFadeProp] = React.useState({ fade: 'fade-out', fadeError: 'fade-out' });
    const [numSessions, setNumSessions] = React.useState(4);
    const [loading, setLoading] = React.useState(false);
    const [notifToggle, setNotifToggle] = React.useState(false);
    const [darkToggle, setDarkToggle] = React.useState(false);
    const [automaticTimer, setAutomaticTimer] = React.useState(false);
    const [error, setError] = React.useState({});
    const [isExploding, setIsExploding] = React.useState(false);
    const [timeForm, setTimeForm] = React.useState({ focusTime: 25, shortBreakTime: 5, longBreakTime: 15 })
    const settingsStates = { session, theme, pomozoneTheme, shortBreakTheme, longBreakTheme, notifToggle, darkToggle, isExploding, timeForm, loading, fadeProp, userSettings, automaticTimer, numSessions };
    const settingsSetStates = { setSession, setTheme, setPomozoneTheme, setShortBreakTheme, setLongBreakTheme, setNotifToggle, setDarkToggle, setIsExploding, setTimeForm, setLoading, setUserSettings, setAutomaticTimer, setNumSessions };
    const settingsFunctions = { darkModeToggle, updateUserSettings, getUserSettings, addUserSettings, updateDefaultSettings }

    function darkModeToggle() {
        setDarkToggle(!darkToggle);
        if(!darkToggle) {
            setTheme("dark-mode");
        } else {
            session === "pomozone" ? setTheme(pomozoneTheme) : null;
            session === "short-break" ? setTheme(shortBreakTheme) : null;
            session === "long-break" ? setTheme(longBreakTheme) : null;
        }
    }

    async function getUserSettings() {
        setLoading(true);
        const { data, error } = await apiClient.getSettings();
        if (data) {
            setUserSettings((s) => ({...data}));
            session === "pomozone" ? setTheme(data.settings.pcolor) : null;
            session === "short-break" ? setTheme(data.settings.sbcolor) : null;
            session === "long-break" ? setTheme(data.settings.lbcolor) : null;
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
            setAutomaticTimer(data.settings.auto_toggle);
            setNumSessions(data.settings.num_sessions);
        }
        if (error) setError(error);
        setLoading(false);
    }

    async function updateUserSettings() {
        setLoading(true);
        const allSettings = {
            pTime: timeForm.focusTime,
            sbTime: timeForm.shortBreakTime,
            lbTime: timeForm.longBreakTime,
            pColor: pomozoneTheme,
            sbColor: shortBreakTheme,
            lbColor: longBreakTheme,
            dark_mode: darkToggle,
            sound_notif: notifToggle,
            auto_toggle: automaticTimer,
            num_sessions: numSessions,
        }
        const { data, error } = await apiClient.updateSettings(allSettings);
        if (data) {
            setFadeProp({ fade: 'fade-in', fadeError: 'fade-out' });
            setTimeout(() => {
                getUserSettings();
            }, 10);
            setTimeout(() => {
                setFadeProp({ fade: 'fade-out', fadeError: 'fade-out' })
            }, 3000);
        }
        if (error) {
            setError(error);
            setFadeProp({ fade: 'fade-out', fadeError: 'fade-in' })
            setTimeout(() => {
                setFadeProp({ fade: 'fade-out', fadeError: 'fade-out' })
            }, 3000);
        }
        setLoading(false);
    }

    async function updateDefaultSettings() {
        setLoading(true);
        setPomozoneTheme("pdefault");
        setShortBreakTheme("sbdefault");
        setLongBreakTheme("lbdefault");
        session === "pomozone" ? setTheme("pdefault") : null;
        session === "short-break" ? setTheme("sbdefault") : null;
        session === "long-break" ? setTheme("lbdefault") : null;
        setTimeForm({
            focusTime: 25,
            shortBreakTime: 5,
            longBreakTime: 15
        })
        setDarkToggle(false);
        setNotifToggle(false);
        setNumSessions(4);
        setAutomaticTimer(false);
        const allSettings = {
            pTime: 25,
            sbTime: 5,
            lbTime: 15,
            pColor: "pdefault",
            sbColor: "sbdefault",
            lbColor: "lbdefault",
            dark_mode: false,
            sound_notif: false,
            auto_toggle: false,
            num_sessions: 4,
        }
        const { data, error } = await apiClient.updateSettings(allSettings);
        if (data) {
            setUserSettings((s) => ({...data}));
            setFadeProp({ fade: 'fade-in', fadeError: 'fade-out' });
            setTimeout(() => {
                getUserSettings();
            }, 10);
            setTimeout(() => {
                setFadeProp({ fade: 'fade-out', fadeError: 'fade-out' })
            }, 3000);
        }
        if (error) {
            setError(error);
            setFadeProp({ fade: 'fade-out', fadeError: 'fade-in' })
            setTimeout(() => {
                setFadeProp({ fade: 'fade-out', fadeError: 'fade-out' })
            }, 3000);
        }
        setLoading(false);
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
            sound_notif: notifToggle,
            auto_toggle: automaticTimer,
            num_sessions: numSessions,
        }
        const { data, error } = await apiClient.addSettings(allSettings);
        if(data) {
            setUserSettings((s) => ({...data}));
        }
        if (error) setError(error);
    }

    return (
        <SettingsContext.Provider value={{ settingsStates, settingsSetStates, settingsFunctions }} >
            {children}
        </SettingsContext.Provider>
    );
};