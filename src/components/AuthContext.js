import React, {createContext, useContext, useEffect, useState} from "react";
import { Outlet } from "react-router-dom";

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider = ({children}) => {
    const jwt = localStorage.getItem("jwt");
    const [isAuth, setIsAuth] = useState(jwt);
    // return <AuthContext.Provider value={isAuth}>{children}</AuthContext.Provider>
    return <AuthContext.Provider value={[isAuth, setIsAuth]}>{children}</AuthContext.Provider>
}