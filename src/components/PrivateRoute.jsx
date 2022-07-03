import { useAuth } from "./AuthContext";
import { Navigate, Route, useLocation } from "react-router-dom";

export const PrivateRoute = (children, ...rest) =>  {

    const location = useLocation();
    const {isAuth, setIsAuth} = useAuth

    return (
      <Route
        render={({ location }) =>
          isAuth ? (
            children
          ) : (
            <Navigate
              to={{
                pathname: "/signin",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
  }