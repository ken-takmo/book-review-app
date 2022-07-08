import { useLocation, Navigate } from "react-router-dom";

export const RequireSignout = () => {
  const location = useLocation();

  alert("ログアウト後にご利用になれます。");
  return <Navigate to={-1} state={{ from: location }} />;
};
