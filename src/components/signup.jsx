import { useState,useEffect } from "react"
import { UseFetch } from "./useFetch";
import { Link, useNavigate } from "react-router-dom";
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
        <main className="signup">
            <div className="signup-content">
                <h1 className="signup-title">ユーザー登録</h1>
                <div className="signup-forms">
                    <div className="signup-name">
                        <label htmlFor='name'>ユーザーネーム</label>
                        <input type="text" placeholder="ユーザーネームを入力" onChange={(e) => {setName(e.target.value)}}/>
                    </div>
                    <div className="signup-email">
                        <label htmlFor='email'>メールアドレス</label>
                        <input type="email" placeholder="メールアドレスを入力" onChange={(e) => {setEmail(e.target.value)}} />
                    </div>
                    <div className="signup-password">
                        <label htmlFor='password'>パスワード</label>
                        <input type="text" placeholder="パスワードを入力" onChange={(e) => {setPassword(e.target.value)}} />
                    </div>
                    <button className="signup-button" type="submit" onClick={onSignupClick}>登録</button>
                </div>
                <Link to="/signin" className="to-signin">ログイン画面へ</Link>
            </div>
        </main>
    )
    
}