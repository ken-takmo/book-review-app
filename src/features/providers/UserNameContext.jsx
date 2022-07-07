import React, { createContext, useState, useEffect } from "react";
import { useUserName } from "../hooks/useUserName";

export const UserNameContext = createContext();

export const UserNameProvider = ({ children }) => {
  const jwt = localStorage.getItem("jwt");
  const [userName, setUserName] = useState("");
  const { name } = useUserName(jwt);

  useEffect(() => {
    setUserName(name);
  }, [name]);
  return (
    <UserNameContext.Provider value={{ userName, setUserName }}>
      {children}
    </UserNameContext.Provider>
  );
};
