import * as React from "react";
import { createContext, useContext } from "react";
import { useState, useEffect } from "react";
export const SessionContext = createContext({sessionVariables:{}, sessionFunctions:{}});
import apiClient from "../Services/apiClient";

export function useSessionContext() {
  return useContext(SessionContext);
}

export const SessionContextProvidor = ({ children }) => {
  const [session, setSession] = useState({
    second: 0,
    minute: 0,
    hour: 0,
    session_type: "",
  });

  const [sessionsList, setSessionsList] = useState([]);
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSessions = async () => {
      const { data, error } = await apiClient.getSessions();

      if (data) {
        setSessionsList((sessionsList) => [...data.sessionsHistory]);
      }

      if (error) setError(error);
      setIsLoading(false);
    };

    if (isLoading) {
      fetchSessions();
    }
  }, []);

  console.log("render sessionsList", sessionsList);

  const sessionVariables = { session, sessionsList, isLoading, error };
  const sessionFunctions = {
    setSession,
    setSessionsList,
    setIsLoading,
    setError,
  };

  return (
    <SessionContext.Provider value={{ sessionVariables, sessionFunctions }}>
      {children}
    </SessionContext.Provider>
  );
};