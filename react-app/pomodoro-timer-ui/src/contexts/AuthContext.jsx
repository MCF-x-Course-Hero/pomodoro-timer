import * as React from "react";
import ApiClient from "../Services/apiClient";

export const AuthContext = React.createContext();

export function useAuthContext() {
  return React.useContext(AuthContext);
}

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = React.useState({});
  const [initialized, setInitialized] = React.useState(false);
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [deleteUser, setDeleteUser] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [login, setLogin] = React.useState(true)
  const [register, setRegister ] = React.useState(false)
  const [error, setError] = React.useState({});
  const authStates = { user, initialized, isProcessing, loggedIn, error, login, register, deleteUser };
  const authSetStates = { setUser, setInitialized, setIsProcessing, setLoggedIn, setError, setLogin, setRegister, setDeleteUser };
  const authFunctions = { loginUser, signupUser, fetchUserFromToken, logoutUser };
  
  function loginUser(person) {
    setLoggedIn(true);
    setUser({ ...person });
  }

  function signupUser(person) {
    setLoggedIn(true);
    setUser({ ...person });
  }

  async function fetchUserFromToken() {
    const { data, error } = await ApiClient.fetchUserFromToken();
    if (data) setUser({ ...data.user });
    if (error) setError(error);
  }

  function logoutUser() {
    setLoggedIn(false);
    setLogin(true);
    ApiClient.setToken("null");
    localStorage.setItem("pomozone_token", "null");
    setUser({});
  }

  React.useEffect(() => {
    const token = localStorage.getItem("pomozone_token");
    if (token !== "null") {
      ApiClient.setToken(token);
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