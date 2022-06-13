import { useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import { useUser } from "./useUser";
export function Books (){
    const jwt = localStorage.getItem('jwt')
    const navigate = useNavigate();

    const [offset, setOffset] = useState("")
    const [number, setNumber] = useState("")

    
    const results = useUser(`/books${offset}`,{"Authorization": `Bearer ${jwt}`});

    const onSelectBooksChange = () => {
        setOffset(number);
        navigate(`${number}`)
    }

    
    return(
        <div>
            <main className="books">
                {jwt ? 
                <div className="search-books">
                    <label htmlFor="search" >何件目から表示しますか</label>
                    <input type="text" id="search" placeholder="半角数字を入力" onChange={(e) => setNumber("?offset=" + e.target.value)}/>
                    <button onClick={onSelectBooksChange}>検索</button>
                </div>:
                <div>
                    <Link to="/signin">ログインしてください</Link>
                </div>
                }
                <div className="reviews">
                {Object.values(results).map((result) => (
                    <ul key={result.id}>
                        <li >タイトル: {result.title}</li>
                        <li >あらすじ: {result.detail}</li>
                        <li >レビュー: {result.review}</li>
                        <li >投稿者: {result.reviewer}</li>
                        <li id="url">URL: <a href={result.url} target="_blank">{result.url}</a></li>
                        <li >ID: {result.id}</li>
                        <button onClick={() => {navigate(`/detail/${result.id}`)}}>詳細</button>
                        {result.isMine &&<button onClick={() => {navigate(`/edit/${result.id}`,{state:result})}}>編集</button>}
                    </ul>
                ))}
                </div>
            </main>

        </div>
    )
    
    
}