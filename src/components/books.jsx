import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "./useUser";

export function Books (){
    const jwt = localStorage.getItem('jwt')
    const navigate = useNavigate();

    const [isLogin, setIsLogin] = useState(!!jwt);
    const [offset, setoffset] = useState("")
    const [userResult, setUserResult] = useState({})

    const signinUrl = document.getElementById("login");
    const signupUrl = document.getElementById("signup");
    const booksUrl = document.getElementById("books");



    const results = useUser(`/books${offset}`,{"Authorization": `Bearer ${jwt}`});
    // useEffect(() => {
    //     async function getBooks () {
    //         navigate(`${offset}`)


    //         if(!jwt) {
    //             setIsLogin(false);
    //         }else{
    //             setIsLogin(true);
    //         }

    //     }
    //     getBooks();
    // },[offset]);


    // useEffect(() => {
    //     const urlChange = () => {
    //         if(isLogin){
    //             signinUrl.setAttribute('href',booksUrl);
    //             signupUrl.setAttribute('href',booksUrl);
    //         }
    //     }
    //     urlChange()
    // },[])


    const signout = () => {
        localStorage.removeItem("jwt");
        alert("ログアウトしました");
        navigate("/signin")
    }


    useEffect(() => {
        const getUser = async() => {
            const res = await fetch("https://api-for-missions-and-railways.herokuapp.com/users",{
                method:"GET",
                headers:{
                    "Authorization":`Bearer ${jwt}`,
                }
            })
            const resJson = await res.json();
            setUserResult(resJson);
        }
        getUser();
    },[])
    console.log(results);
    
    return(
        <main className="books">
            {isLogin ?
            <div className="headers">
                <div className="userinfo">
                    <p>ユーザーネーム:{Object.values(userResult)}</p>
                    <button className="link" onClick={signout}>ログアウト</button>
                </div>
                <div className="book-links">
                    <nav>
                        <Link to={"/profile"} state={{name:Object.values(userResult)}} className="book-link">ユーザー情報編集ページへ</Link>
                        <Link to="/new" className="book-link">レビュー投稿ページへ</Link>
                    </nav>
                </div>
                <div className="search-books">
                    <label htmlFor="search" >何件目から表示しますか</label>
                    <input type="text" id="search" placeholder="半角数字を入力"/>
                    <button onClick={(e) => {setoffset(e.target.value)}}>検索</button>
                </div>
            </div>:
            <div>
                <Link to="/signin">ログインしてください</Link>
            </div>
            }
            <div className="reviews">
            {Object.values(results).map((result) => (
                <ul key={result.id}>
                    <li >タイトル: {result.title}</li>
                    <li >内容: {result.detail}</li>
                    <li > レビュー: {result.review}</li>
                    <li >投稿者: {result.reviewer}</li>
                    <li >URL: <a href={result.url} target="_blank">{result.url}</a></li>
                    <li >ID: {result.id}</li>
                    <button onClick={() => {navigate(`/detail/${result.id}`)}}>詳細</button>
                    {result.isMine &&<button onClick={() => {navigate(`/edit/${result.id}`,{state:result})}}>編集</button>}
                </ul>
            ))}
            </div>
        </main>
    )
    
    
}