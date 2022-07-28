import * as React from "react";
import apiClient from "../Services/apiClient";

const SessionContext = React.createContext();

export function useSessionContext() {
  return React.useContext(SessionContext);
}

export const SessionContextProvider = ({ children }) => {
  const [sessionsList, setSessionsList] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState();
  const [session, setSession] = React.useState({
    second: 0,
    minute: 0,
    hour: 0,
    session_type: "",
  });
  const sessionStates = { session, sessionsList, isLoading, error };
  const sessionSetStates = { setSession, setSessionsList, setIsLoading, setError }
  const sessionFunctions = {};

  React.useEffect(() => {
    const fetchSessions = async () => {
      const { data, error } = await apiClient.getSessions();
      if (data) {
        setSessionsList((s) => [...data.sessionsHistory]);
      }

      if (error) setError(error);
      setIsLoading(false);
    };

    if (isLoading) {
      fetchSessions();
    }
  }, []);

  return (
    <SessionContext.Provider value={{ sessionStates, sessionSetStates }}>
      {children}
    </SessionContext.Provider>
  );
};
