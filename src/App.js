import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SignUp } from "./features/pages/public/Signup";
import { Signin } from "./features/pages/public/Signin";
import { Books } from "./features/pages/private/Books";
import { Profile } from "./features/pages/private/Profile";
import { Newbook } from "./features/pages/private/Newbook";
import { Detail } from "./features/pages/private/Detail";
import { Edit } from "./features/pages/private/Edit";
import { Publicbooks } from "./features/pages/public/Publicbooks";
import { Header } from "./features/pages/Header";
import { Sample } from "./features/pages/sampleSearchUserBooks";
import { UserNameProvider } from "./features/providers/UserNameContext";
import { LoadingProvider } from "./features/providers/Loading";
import { useAuth } from "./providers/AuthContext";
import { RequireAuth } from "./features/pages/public/RequireAuth";
import { RequireSignout } from "./features/pages/private/RequireSignout";

function App() {
  const { isAuth, setIsAuth } = useAuth();
  const homeUrl = process.env.PUBLIC_URL;
  return (
    <div className="App">
      <BrowserRouter>
        <UserNameProvider>
          <LoadingProvider>
            <Header />
            {isAuth ? (
              <Routes>
                <Route path={`${homeUrl}/`} element={<RequireSignout />} />
                <Route
                  path={`${homeUrl}/signin`}
                  element={<RequireSignout />}
                />
                <Route
                  path={`${homeUrl}/signin`}
                  element={<RequireSignout />}
                />
                <Route path={`${homeUrl}/books`} element={<Books />} />
                <Route path={`${homeUrl}/detail/:id`} element={<Detail />} />
                <Route path={`${homeUrl}/edit/:id`} element={<Edit />} />
                <Route path={`${homeUrl}/profile`} element={<Profile />} />
                <Route path={`${homeUrl}/new`} element={<Newbook />} />
                <Route path={`${homeUrl}/sample`} element={<Sample />} />
              </Routes>
            ) : (
              <Routes>
                <Route path={`${homeUrl}/`} element={<Publicbooks />} />
                <Route path={`${homeUrl}/signup`} element={<SignUp />} />
                <Route path={`${homeUrl}/signin`} element={<Signin />} />
                <Route path={`${homeUrl}/books`} element={<RequireAuth />} />
                <Route
                  path={`${homeUrl}/detail/:id`}
                  element={<RequireAuth />}
                />
                <Route path={`${homeUrl}/edit/:id`} element={<RequireAuth />} />
                <Route path={`${homeUrl}/profile`} element={<RequireAuth />} />
                <Route path={`${homeUrl}/new`} element={<RequireAuth />} />
                <Route path={`${homeUrl}/sample`} element={<Sample />} />
              </Routes>
            )}
          </LoadingProvider>
        </UserNameProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
