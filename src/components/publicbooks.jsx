import { useEffect, useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import { useUser } from "./useUser"

export const Publicbooks = () => {

    const navigate = useNavigate();

    const [offset, setOffset] = useState("");
    const [number, setNumber] = useState(0);

    
    const results = useUser(`/public/books${offset}`);

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
        <main>
            <p>ログインするとレビューの投稿、レビューの詳細閲覧ができます</p>
            <div className="books-content">
                <div className="reviews">
                    {Object.values(results).map((result) => (
                    <div className="review" key={result.id}>
                        <h2 className="review-title">{result.title}</h2>
                        <hr />
                        <div className="review-main">
                            <p>書籍内容: {result.detail}</p>
                            <h3 > レビュー: {result.review}</h3>
                        </div>
                        <div className="review-footer">
                            <nav className="review-footers"><a href={result.url} target="_blank">この書籍のリンク</a></nav>
                            <button className="review-footers" onClick={() => {navigate("/signin")}}>詳細</button>
                        </div>
                    </div>
                    ))}
                </div>
                <div className="next-books">
                    <button className="prev-books-button" onClick={onPrevBooksChange}>前の10件を表示</button>
                    <button className="next-books-button" onClick={onNextBooksChange}>次の10件を表示</button>
                </div>
            </div>
        </main>
    )
}