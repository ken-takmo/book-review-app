import { useState,useEffect } from "react"
import { UseFetch } from "./useFetch";
import { useNavigate } from "react-router-dom";
export function SignUp(){

    const jwt = localStorage.getItem('jwt');

    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {fetchdata,fetchRes} = UseFetch()
 
    // const signinUrl = document.getElementById("login");
    // const signupUrl = document.getElementById("signup")
    // const booksUrl = document.getElementById("books");
    
    const body = {
        name: name,
        email: email,
        password: password
    }
    const onSignupClick = async() => {
        const res = await fetchdata("/users", "POST", undefined, body)
        const result = await res.json()
        const successAction = () => {
            alert("登録されました");
            navigate("/signin");
        }
        fetchRes(res,successAction,result);
    }

    // useEffect(() => {
    //     if(jwt){
    //         signinUrl.setAttribute('href',booksUrl);
    //         signupUrl.setAttribute('href',booksUrl);
    //     }
    // },[jwt])
    
    return(
        <div>
            <div className="signup">
                <h1 className="signup-title">ユーザー作成</h1>
                <div className="signup-form">
                    <div className="signup-name">
                        <label htmlFor='name'>ユーザーネーム</label>
                        <input id='name' type="text" placeholder="ユーザーネームを入力" onChange={(e) => {setName(e.target.value)}}/>
                    </div>
                    <div className="signup-email">
                        <label htmlFor='email'>メールアドレス</label>
                        <input id='email' type="email" placeholder="メールアドレスを入力" onChange={(e) => {setEmail(e.target.value)}} />
                    </div>
                    <div className="signup-password">
                        <label htmlFor='password'>パスワード</label>
                        <input id='password' type="text" placeholder="パスワードを入力" onChange={(e) => {setPassword(e.target.value)}} />
                    </div>
                    <button className="signup-button" type="submit" onClick={onSignupClick}>登録</button>
                </div>
                <br />
                <br />
                <a href="http://localhost:3000/signin" className="to-login">ログイン画面へ</a>
            </div>
        </div>
    )
    
}