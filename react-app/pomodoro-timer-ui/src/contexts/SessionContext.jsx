import * as React from "react";
import { createContext, useContext } from "react";
import { useState, useEffect } from "react";
export const SessionContext = createContext();
import apiClient from "../Services/apiClient";
export function useSessionContext() {
  return useContext(SessionContext);
}

export const SessionContextProvidor = ({ children }) => {
    const [session, setSession] = useState({
        second:0,
        minute:0,
        hour:0,
        session_type:"",
    })
    
    const [sessionsList, setSessionsList] = useState([])
    const [error, setError] = useState()
    const [isLoading, setIsLoading] = useState(true)
    
    
    
    useEffect(()=>{
        const fetchSessions = async () => {
            const {data, error} = await apiClient.getSessions()
            if (data) setSessionsList(data)
            if (error) setError(error)
            setIsLoading(false)
        }

        if (isLoading) {
            console.log(123)
            fetchSessions()
            console.log("sessions", sessionsList)
        }
    },[])
    
 
    const sessionVariabls = {session, sessionsList, isLoading};
    const sessionFunction = {setSession, setSessionsList};



  return (
    <SessionContext.Provider value={{ sessionVariabls, sessionFunction }}>
      {children}
    </SessionContext.Provider>
  );
};
