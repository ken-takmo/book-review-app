import { useLocation, Navigate } from "react-router-dom";

export const RequireSignout = () => {
  const homeUrl = process.env.PUBLIC_URL;
  const location = useLocation();
  console.log(location.pathname);
  if (location.pathname === `${homeUrl}/`) {
    return <Navigate to={`${homeUrl}/books`} />;
  } else {
    alert("ログアウト後にご利用になれます。");
    return <Navigate to={`${homeUrl}/`} />;
  }
};
