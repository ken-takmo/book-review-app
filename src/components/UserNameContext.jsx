import React, { createContext, useState, useEffect } from "react";
import { useFetch } from "../hooks/useFetch";

export const UserNameContext = createContext();

export const UserNameProvider = ({children}) => {

    const {fetchdata} = useFetch();
    const jwt = localStorage.getItem("jwt")
    const [userName, setUserName] = useState("");

    useEffect(() => {
        const isLoginHeader = async() => {
            if(jwt){
                const res = await fetchdata("/users","GET", {"Authorization": `Bearer ${jwt}`});
                const result = await res.json();
                setUserName(Object.values(result));
            }
        }
        isLoginHeader();
    },[jwt]);


    return <UserNameContext.Provider value={{userName, setUserName}}>{children}</UserNameContext.Provider>
}