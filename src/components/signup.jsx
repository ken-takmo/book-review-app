import { useState,useEffect } from "react"
export function SignUp(){

    const jwt = localStorage.getItem('jwt')
    const [isLogin, setIsLogin] = useState(false);
    const signinUrl = document.getElementById("login");
    const signupUrl = document.getElementById("signup")
    const booksUrl = document.getElementById("books");

    
    useEffect(() => {
        if(!jwt || jwt === "") {
            setIsLogin(false);
        }else{
            setIsLogin(true);
        }
    },[])

    async function PostData(){

        const name = document.getElementById("name").value 
        const email = document.getElementById("email").value 
        const password = document.getElementById("password").value 
        
        const body = {
            name: name,
            email: email,
            password: password
        }

        const res = await fetch('https://api-for-missions-and-railways.herokuapp.com/users', {
            method:"POST",
            headers: {
                'Content-Type':'application/json',
            },
            body: JSON.stringify(body)
        })

        const result = await res.json()
        
        
        const inputError = () => {
            if(name === "" || !name){
                alert("ユーザーネームを入力してください");
            }else if (email === "" || !email){
                alert("メールアドレスを入力してください");
            }else if (password === "" || !password) {
                alert("パスワードを入力してください");
            }else{
                alert("何らかのエラーが発生しました")
            }
        }
        
        const handleError = async (result) => {

            switch (result.ErrorCode) {
                case 400:
                    inputError();
                    break;
                case 403:
                    alert(result.ErrorMessageJP);
                    break;
                case 500:
                    alert(result.ErrorMessageJP);
                    break;
                default:
                    alert("登録");
                    break;
            }
        }

        handleError(result);
    }

    useEffect(() => {
        const urlChange = () => {
            if(isLogin){
                signinUrl.setAttribute('href',booksUrl);
                signupUrl.setAttribute('href',booksUrl);
            }else{
                booksUrl.setAttribute('href',signinUrl);
            }
        }
        urlChange()
    },[isLogin])
    
    return(
        <div>
            <div className="signup">
                <h1 className="signup-title">ユーザー作成</h1>
                <div className="signup-form">
                    <div className="signup-name">
                        <label htmlFor='name'>ユーザーネーム</label>
                        <input id='name' type="text" placeholder="ユーザーネームを入力"/>
                    </div>
                    <div className="signup-email">
                        <label htmlFor='email'>メールアドレス</label>
                        <input id='email' type="email" placeholder="メールアドレスを入力"/>
                    </div>
                    <div className="signup-password">
                        <label htmlFor='password'>パスワード</label>
                        <input id='password' type="text" placeholder="パスワードを入力"/>
                    </div>
                    <button className="signup-button" type="submit" onClick={PostData}>登録</button>
                </div>
                <a href="http://localhost:3000/signin" className="to-login">ログイン画面へ</a>
            </div>
        </div>
    )
    
}