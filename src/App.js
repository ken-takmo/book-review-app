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

  return (
    <div className="App">
      <BrowserRouter>
        <UserNameProvider>
          <LoadingProvider>
            <Header />
            {isAuth ? (
              <Routes>
                <Route path="/" element={<RequireSignout />} />
                <Route path="/signup" element={<RequireSignout />} />
                <Route path="/signin" element={<RequireSignout />} />
                <Route path="/books" element={<Books />} />
                <Route path="/detail/:id" element={<Detail />} />
                <Route path="/edit/:id" element={<Edit />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/new" element={<Newbook />} />
                <Route path="/sample" element={<Sample />} />
              </Routes>
            ) : (
              <Routes>
                <Route path="/" element={<Publicbooks />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/signin" element={<Signin />} />
                <Route path="/books" element={<RequireAuth />} />
                <Route path="/detail/:id" element={<RequireAuth />} />
                <Route path="/edit/:id" element={<RequireAuth />} />
                <Route path="/profile" element={<RequireAuth />} />
                <Route path="/new" element={<RequireAuth />} />
                <Route path="/sample" element={<Sample />} />
              </Routes>
            )}
          </LoadingProvider>
        </UserNameProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
