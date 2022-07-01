import React, {createContext, useContext, useEffect, useState} from "react";

export const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider = ({children}) => {
    const isAuth = () => {
        const jwt = localStorage.getItem("jwt");
        return jwt
    }
    return <AuthContext.Provider value={isAuth}>{children}</AuthContext.Provider>
}