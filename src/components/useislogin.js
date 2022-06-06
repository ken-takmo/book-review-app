import { useEffect, useState } from "react"

export const useIsLogin = () => {
    const [isLogin, setIsLogin] = useState(false);
    const jwt = localStorage.getItem('jwt');
    if(jwt){
        setIsLogin(true);
    }
    return isLogin;
}