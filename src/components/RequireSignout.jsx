import { useLocation, Navigate, useParams } from "react-router-dom";

export const  RequireSignout = () => {
    const location = useLocation();
    console.log(location);
    alert("ログアウト後にご利用になれます。")
    return <Navigate to={-1} state={{ from: location }} replace />;
}