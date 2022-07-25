import React, { createContext, useState, useEffect, useContext } from "react";
import ApiClient from "../Services/apiClient";


export const AuthContext = createContext();

export function useAuthContext() {
  return useContext(AuthContext);
}

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [initialized, setInitialized] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState({});

  function loginUser(person) {
    setLoggedIn(true);
    setUser({ ...person.user });
  }

  function signupUser(person) {
    setLoggedIn(true);
    setUser(person);
  }

  async function fetchUserFromToken() {
    const { data, error } = await ApiClient.fetchUserFromToken();
    if (data) setUser(data.user);
    if (error) setError(error);
  }

  function logoutUser() {
    console.log(user);
    setLoggedIn(false);
    ApiClient.setToken(null);
    localStorage.setItem(this.tokenName, "");
    setUser({});
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      console.log("setting token");
      ApiClient.setToken(token);
      fetchUserFromToken();
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        error,
        setError,
        user,
        setUser,
        initialized,
        setInitialized,
        isProcessing,
        setIsProcessing,
        loginUser,
        signupUser,
        fetchUserFromToken,
        logoutUser,
        loggedIn,
        setLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};