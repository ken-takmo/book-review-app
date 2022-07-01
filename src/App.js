import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
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

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <UserNameProvider>
          <Header/>
          <Routes>
            <Route path="/" element={<Publicbooks/>}/>
            <Route path="/books" element={<Books />}/>
            <Route path="/detail/:id" element={<Detail />}/>
            <Route path="/edit/:id" element={<Edit />} />
            <Route path="/signup" element={<SignUp/>} />
            <Route path="/signin" element={<Signin/>}/>
            <Route path="/profile" element={<Profile />} />
            <Route path="/new" element={<Newbook />}/>
            <Route path="/sample" element={<Sample/>} />
          </Routes>      
        </UserNameProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
