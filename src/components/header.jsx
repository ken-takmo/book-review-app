import { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import { Link,useLocation,useNavigate } from "react-router-dom";
import { UseFetch } from "./useFetch";

export const Header = () => {

    const navigate = useNavigate();
    const jwt = localStorage.getItem("jwt");
    const {fetchdata} = UseFetch();
    const [userResult, setUserResult] = useState({});
    // const [newUserName, setNewUserName] = useState({});

    useEffect(() => {
        const LoginHeader = async() => {
            if(jwt){
                const res = await fetchdata("/users","GET", {"Authorization": `Bearer ${jwt}`});
                const result = await res.json();
                setUserResult(result);
                console.log(result);
            }
        }
        LoginHeader();
    },[]);
    // useEffect(() => {
    //     if(userResult != newUserName){
    //         const ChangeName = async() => {
    //             const res = await fetchdata("/users","GET", {"Authorization": `Bearer ${jwt}`});
    //             const result = await res.json();
    //             console.log(result + "second");
    //             setUserResult(result)
    //         }
    //         ChangeName();
    //     }
    // },[newUserName]);
    const signout = () => {
        localStorage.removeItem("jwt");
        alert("ログアウトしました");
        navigate("/signin")
    }
    return(
        <header>
            {jwt ?
            <div className="header-container">
                <h1 className="app-name">書籍レビューアプリ</h1>
                <div className="login-menus">
                    <div className="userinfo">
                        <div className="username">ユーザーネーム: {Object.values(userResult)}</div>    
                        <div className="material-symbols-outlined" onClick={signout}><span className="discription">logout</span></div>
                    </div>
                    <nav className="links">
                        <Link to="/profile" state={{name:Object.values(userResult)}} className="link">ユーザー情報編集ページへ</Link>
                        <Link to="/new" className="link">レビュー投稿ページへ</Link>
                        <Link to="/books" className="link" >書籍一覧</Link>
                    </nav>
                </div>
            </div>:
            <div className="header-container">
                <h1 className="app-name">書籍レビューアプリ</h1>
                <div className="menus">
                    <nav className="links">
                        <Link to="/signin"  className="link">ログイン</Link>
                        <Link to="/signup"  className="link">登録</Link>
                        <Link to="/"  className="link">書籍一覧</Link>
                    </nav>
                </div>
            </div>
            }
        </header>
    )
}