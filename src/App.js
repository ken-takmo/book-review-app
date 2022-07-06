import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useOutletContext } from 'react-router-dom';
import { SignUp } from "./components/Signup";
import { Signin } from "./components/Signin";
import { Books } from "./components/Books";
import { Profile } from "./components/Profile";
import { Newbook } from "./components/Newbook";
import { Detail } from "./components/Detail";
import { Edit } from "./components/Edit";
import { Publicbooks } from "./components/Publicbooks";
import { Header } from "./components/Header";
import { Sample } from "./components/sampleSearchUserBooks";
import { UserNameProvider } from "./components/UserNameContext";
import { LoadingProvider } from "./components/Loading";
import { useAuth } from "./components/AuthContext";
import {RequireAuth} from "./components/RequireAuth"
import { RequireSignout } from "./components/RequireSignout";

function App() {

  const {isAuth, setIsAuth} = useAuth();

  return (
    <div className="App">
      <BrowserRouter>
        <UserNameProvider>
        <LoadingProvider>
          <Header/>
          {isAuth?(
          <Routes>
            <Route path="/" element={<RequireSignout />}/>
            <Route path="/signup" element={<RequireSignout /> } />
            <Route path="/signin" element={<RequireSignout/>}/>
            <Route path="/books" element={<Books />}/>
            <Route path="/detail/:id" element={<Detail />}/>
            <Route path="/edit/:id" element={<Edit />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/new" element={<Newbook />}/>
            <Route path="/sample" element={<Sample/>} />
          </Routes>
          ):(
          <Routes>
            <Route path="/" element={<Publicbooks />}/>
            <Route path="/signup" element={<SignUp/> } />
            <Route path="/signin" element={<Signin/>}/>
            <Route path="/books" element={<RequireAuth />}/>
            <Route path="/detail/:id" element={<RequireAuth />}/>
            <Route path="/edit/:id" element={<RequireAuth />} />
            <Route path="/profile" element={<RequireAuth />} />
            <Route path="/new" element={<RequireAuth />}/>
            <Route path="/sample" element={<Sample/>} />
          </Routes>
          )
          }
          </LoadingProvider>
        </UserNameProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
