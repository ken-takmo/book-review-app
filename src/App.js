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
import { AuthContext, AuthProvider, useAuth } from "./components/AuthContext";

function App() {

  // const [isAuth, setIsAuth] = useState(false);

  // useEffect(() => {
  //   const jwt = useAuth();
  //   if(jwt){
  //     setIsAuth(true);
  //   }else{
  //     setIsAuth(false);
  //   }
  // },[]);
  const {isAuth, setIsAuth} = useAuth();
  // console.log(isAuth);

  return (
    <div className="App">
      <BrowserRouter>
        <UserNameProvider>
        <LoadingProvider>
          <Header/>
          <Routes>
            <Route path="/" element={isAuth ? <Books />:<Publicbooks/>}/>
            <Route path="/books" element={isAuth ? <Books />: <Signin/>}/>
            <Route path="/detail/:id" element={isAuth ?<Detail /> : <Signin/>}/>
            <Route path="/edit/:id" element={isAuth ? <Edit /> : <Signin/>} />
            <Route path="/signup" element={isAuth ? <Books/> : <SignUp/>} />
            <Route path="/signin" element={isAuth ? <Books/> : <Signin/>}/>
            <Route path="/profile" element={isAuth ? <Profile /> : <Signin/>} />
            <Route path="/new" element={isAuth ? <Newbook /> : <Signin/>}/>
            <Route path="/sample" element={<Sample/>} />
          </Routes>      
          </LoadingProvider>
        </UserNameProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
