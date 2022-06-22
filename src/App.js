import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { SignUp } from "./components/signup";
import { Signin } from "./components/signin";
import { Books } from "./components/books";
import { Profile } from "./components/profile";
import { Newbook } from "./components/newbook";
import { Detail } from "./components/detail";
import { Edit } from "./components/edit";
import { Publicbooks } from "./components/publicbooks";
import { Header } from "./components/header";
import { Sample } from "./components/sample";
import { UserContext } from "./components/userContext";

function App() {

  const [userName, setUserName] = useState("");

  return (
    <div className="App">
      <BrowserRouter>
        <UserContext.Provider value={{userName, setUserName}}>
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
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
