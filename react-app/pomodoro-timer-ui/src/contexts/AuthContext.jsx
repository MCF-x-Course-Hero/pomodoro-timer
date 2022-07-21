import { createContext, useState } from "react";
// import React, { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
     const [auth, setAuth] = useState({});

     return (
        <AuthContext.Provider value={{ auth, setAuth}}>
            {children}
        </AuthContext.Provider>
     )
}

export default AuthContext;
