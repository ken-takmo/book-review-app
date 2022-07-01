import React, { createContext, useState, useEffect } from "react";
import { useFetch } from "./useFetch";

export const UserNameContext = createContext();

export const UserNameProvider = ({children}) => {

    const jwt = localStorage.getItem("jwt");
    const {fetchdata} = useFetch();
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