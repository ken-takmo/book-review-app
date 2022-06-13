import { useEffect, useState } from "react";
import { Link, useNavigate, } from "react-router-dom";
import { UseFetch } from "./useFetch";
export function Signin(){

    const navigate = useNavigate();
    const [emailText,setEmailText] = useState("");
    const [passwordText, setPasswordText] = useState("");
    const jwt = localStorage.getItem('jwt');
    const {fetchdata,fetchRes} = UseFetch();
    
    const body = {
        email: emailText,
        password: passwordText,
    }
    
    const onSigninClick = async () => {
        const res = await fetchdata("/signin","POST",undefined,body);
        const result = await res.json();

        const successAction = () => {
            localStorage.setItem('jwt',result.token);
            alert("ログインに成功しました！！！！書籍レビュー画面に移動します。");
            navigate("/books",{replace: true})
        }

        fetchRes(res,successAction,result);
    }
    
    // const signinUrl = document.getElementById("login");
    // const booksUrl = document.getElementById("books");

    // useEffect(() => {
    //     if(jwt){
    //         booksUrl.setAttribute("href","http://localhost:3000/books");
    //     }
    // },[jwt]);
    
    
    
    
    
    return(
        <main>
            <div className="signin">
                <h1 className="signin-title">ログイン</h1>
                <div className="signinform">
                    <div className="signin-emailform">
                        <label htmlFor="email">メールアドレス</label>
                        <input id="email" type="email" placeholder="メールアドレスを入力" onChange={(e) => setEmailText(e.target.value)}/>
                    </div>
                    <div className="signin-passwordform">
                        <label htmlFor="password">パスワード</label>
                        <input id="password" type="text"placeholder="パスワードを入力" onChange={(e) => setPasswordText(e.target.value)}/>
                    </div>
                    <button onClick={onSigninClick} className="signin-button">ログイン</button>
                </div>
                <Link to="/signup" className="to-signup">登録画面へ</Link>
            </div>
        </main>
        
    )
}