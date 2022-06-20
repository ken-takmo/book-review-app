import { useState, useEffect } from "react";
import { Link, useNavigate} from "react-router-dom";
import { useUser } from "./useUser";
export function Books (){
    const jwt = localStorage.getItem('jwt')
    const navigate = useNavigate();

    const [offset, setOffset] = useState("")
    const [number, setNumber] = useState(0)

    
    const results = useUser(`/books${offset}`,{"Authorization": `Bearer ${jwt}`});


    const onNextBooksChange = () => {
        if(number === 0) {
            setNumber(9);
        }else{
            setNumber(number + 10);
        }
    }

    useEffect(() => {
        setOffset(`?offset=${number}`)
        navigate(`?offset=${number}`);
    },[number])

    const onPrevBooksChange = () => {
        if(number === 9) {
            setNumber(0);
        }else if(number === 0){
            alert("最新のレビューです")
        }else{
            setNumber(number - 10);
        }
    }
    
    return(
        <main className="books">
            <h1>書籍レビュー一覧</h1>            
            {jwt ? 
            <div>
                <div className="reviews">
                    {Object.values(results).map((result) => (
                    <ul key={result.id}>
                        <li >タイトル: {result.title}</li>
                        <li >書籍内容: {result.detail}</li>
                        <li >レビュー: {result.review}</li>
                        <li >URL: <a href={result.url} target="_blank">{result.title}を詳しく</a></li>
                        <button onClick={() => {navigate(`/detail/${result.id}`)}}>詳細</button>
                        {result.isMine &&<button onClick={() => {navigate(`/edit/${result.id}`,{state:result})}}>編集</button>}
                    </ul>
                    ))}
                </div>
                <div className="next-books">
                    <button onClick={onPrevBooksChange}>前の10件を表示</button>
                    <button onClick={onNextBooksChange}>次の10件を表示</button>
                </div>
            </div>:
            <div>
                <Link to="/signin">ログインしてください</Link>
            </div>
            }
        </main>
    )
}