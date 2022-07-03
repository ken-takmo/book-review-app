import { useLocation, Navigate, } from "react-router-dom";

export const  RequireAuth = () => {

    const location = useLocation();
  
    alert("ログイン後にご利用になれます。")
    return <Navigate to="/signin" state={{ from: location }} replace />;
}