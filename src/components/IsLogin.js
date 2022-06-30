import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const IsLogin = () => {
    const jwt = localStorage.getItem("jwt");
    const navigate = useNavigate();

    useEffect(() => {
        if(jwt){
            alert("ログイン済みです");
            navigate("/books");
        }
    },[])
}