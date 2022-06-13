import { useEffect, useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import { UseFetch } from "./useFetch";
export const Header = () => {
    const navigate = useNavigate();
    const jwt = localStorage.getItem("jwt");
    const {fetchdata} = UseFetch();
    const [userResult, setUserResult] = useState({});
    useEffect(() => {
        const LoginHeader = async() => {
            if(jwt){
                const res = await fetchdata("/users","GET", {"Authorization": `Bearer ${jwt}`});
                const result = await res.json();
                setUserResult(result);
            }
        }
        LoginHeader();
    },[jwt])

    const signout = () => {
        localStorage.removeItem("jwt");
        alert("ログアウトしました");
        navigate("/signin",{replace: true})
    }
    return(
        <header>
            {jwt ?
            <div className="container">
                <h1 className="app-name">書籍レビューアプリ</h1>
                <div className="menus">
                    <div className="userinfo">
                        <p>ユーザーネーム: {Object.values(userResult)}</p>
                        <button id="signout-buttn" onClick={signout}>ログアウト</button>
                    </div>
                    <nav className="book-links">
                        <Link to="/profile" state={{name:Object.values(userResult)}} className="link">ユーザー情報編集ページへ</Link>
                        <Link to="/new" className="link">レビュー投稿ページへ</Link>
                        <Link to="/books" className="link" >書籍一覧</Link>
                    </nav>
                </div>
            </div>:
            <div className="container">
                <h1 className="app-name">書籍レビューアプリ</h1>
                <div className="menus">
                    <nav id="header-list">
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