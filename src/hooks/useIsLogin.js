import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const IsLogin = (url) => {
    const jwt = localStorage.getItem("jwt");
    const navigate = useNavigate();

    useEffect(() => {
        if(jwt){
            alert("ログイン済みです。このページはログアウト後にご利用できます。");
            navigate(url);
        }
    },[]);
}