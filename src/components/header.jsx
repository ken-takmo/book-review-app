import {  useContext, useEffect } from "react";
import { Link,useNavigate, useLocation } from "react-router-dom";
import { UserNameContext } from "./UserNameContext";
import { useFetch } from "../hooks/useFetch";
import { useAuth } from "./AuthContext";

export const Header = () => {

    const navigate = useNavigate();
    const {isAuth, setIsAuth} = useAuth();
    const jwt = localStorage.getItem("jwt");
    const {fetchdata} = useFetch();
    const {userName, setUserName} = useContext(UserNameContext);
    const location = useLocation();
    const from = location.state?.from?.pathname || "/signin";

    useEffect(() => {
        const isLoginHeader = async() => {
            if(jwt){
                const res = await fetchdata("/users","GET", {"Authorization": `Bearer ${jwt}`});
                const result = await res.json();
                setUserName(Object.values(result));
            }
        }
        isLoginHeader();
    },[jwt]);

    const signout = () => {
        localStorage.removeItem("jwt");
        alert("ログアウトしました");
        setIsAuth(false);
        navigate(from)
    }
    
    return(
        <header>
            {jwt ?
            <div className="header-container">
                <h1 className="app-name">書籍レビューアプリ</h1>
                <div className="login-menus">
                    <div className="userinfo">
                        <div className="username">ユーザーネーム: <span className="name">{userName}</span></div> 
                        <span className="material-symbols-outlined md-40" onClick={signout}>logout</span>
                    </div>
                    <nav className="links">
                        <Link to="/profile" className="link">ユーザー情報編集</Link>
                        <Link to="/new" className="link">レビュー投稿</Link>
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