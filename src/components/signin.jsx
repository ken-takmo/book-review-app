import { useEffect, useState } from "react";
import { Link, useNavigate, } from "react-router-dom";
import { useIsLogin } from "./useislogin";
export function Signin(){

    const navigate = useNavigate();
    const [emailText,setEmailText] = useState("");
    const [passwordText, setPasswordText] = useState("");
    const [result, setResult] = useState({});
    const [status, setStatus] = useState({});
    const signinUrl = document.getElementById("login");
    const booksUrl = document.getElementById("books");

    const body= {
        email: emailText,
        password: passwordText,
    }

    
    const signin = async() => {
        const res = await fetch("https://api-for-missions-and-railways.herokuapp.com/signin",{
            method:"POST",
            body:JSON.stringify(body)
        })
        setStatus(res);
        const resJson = await res.json();
        setResult(resJson)
    }
    
    useEffect(() => {
        
        localStorage.setItem('jwt',result.token);

        const signInError = (status) => {
            switch(status.status){
                case 200:
                    alert("ログインに成功しました！！！！書籍レビュー画面に移動します。");
                    navigate("/");
                    break;
                case 403:
                case 400:
                    alert("メールアドレス、またはパスワードが間違っています")
                    break;
                case 500:
                    alert(result.ErrorMessageJP)
                    break;
                default:
                    break;
            }
        }
        signInError(status);
    },[result]);
    
    
    // ログイン状態もカスタムフックでまとめる

    
    // if(!isLogin){
    //     booksUrl.setAttribute("href",signinUrl);
    // }else{
    //     booksUrl.setAttribute("href","http://localhost:3000/");
    //     navigate("/");
    // }
    
                
    return(
        <main>
            <div className="signin">
                <h1 className="signin-title">ログイン</h1>
                <div className="signinform">
                    <div className="signin-emailform">
                        <label htmlFor="email">メールアドレス</label>
                        <input id="email" type="email" placeholder="メールアドレスを入力" onChange={(e) => setEmailText(e.target.value)} required/>
                    </div>
                    <div className="signin-passwordform">
                        <label htmlFor="password">パスワード</label>
                        <input id="password" type="text"placeholder="パスワードを入力" onChange={(e) => setPasswordText(e.target.value)} required/>
                    </div>
                    <button onClick={signin} className="signin-button">ログイン</button>
                </div>
                <Link to="/signup" className="to-signup">登録画面へ</Link>
            </div>
        </main>
        
    )
}