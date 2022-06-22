import { useContext, useEffect, useState } from "react"
import { UserContext } from "./userContext";

export const Sample = () => {
    const {userName, setUserName} = useContext(UserContext);
    
    return(
        <main>
            <p>{userName}</p>
            <button onClick={() => setUserName("change user name")}>change</button>
        </main>
    )
}