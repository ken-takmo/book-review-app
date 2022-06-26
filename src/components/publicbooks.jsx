import { useEffect, useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import { UseGetBooks } from "./useGetBooks"
import { UseFetch } from "./useFetch";

export const Publicbooks = () => {

    const navigate = useNavigate();
    const [offset, setOffset] = useState("");
    const [number, setNumber] = useState(0);
    const [searchNumber, setSearchNumber] = useState("");
    const [minCurrentPage, setMinCurrentPage] = useState(1);
    const [maxCurrentPage, setMaxCurrentPage] = useState(10);

    const results = UseGetBooks(`/public/books${offset}`);

    useEffect(() => {
        setOffset(`?offset=${number}`);
        navigate(`?offset=${number + 1}`);

        if(number === 0){
            setMinCurrentPage(1);
            setMaxCurrentPage(10);
        }else{
            setMinCurrentPage(number + 1);
            setMaxCurrentPage(number + 10);
        }

        window.scrollTo(0, 0);

    },[number])

    const onNextBooksChange = () => {
        setNumber(number + 10);
    }

    const onPrevBooksChange = () => {
        if(0 < number && number < 10) {
            setNumber(0);
        }else if(number === 0){
            alert("最新のレビューです")
        }else{
            setNumber(number - 10);
        }
    }

    const searchBook = () => {
        setNumber(Number(searchNumber) - 1);
        setSearchNumber("");
    }

    const requestLogin = () => {
        alert("ログイン後、レビューの詳細をご覧になれます");
        navigate("/signin");
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
                            <button className="review-footers" onClick={requestLogin}>詳細</button>
                        </div>
                    </div>
                    ))}
                </div>
                <p className="current-page">{minCurrentPage} 〜 {maxCurrentPage}件</p>
                <div className="change-books">
                    <button className="prev-books-button" onClick={onPrevBooksChange}>前の10件を表示</button>
                    <button className="next-books-button" onClick={onNextBooksChange}>次の10件を表示</button>
                </div>
                <div className="search-books">
                    <label htmlFor="search">何件目から表示しますか</label>
                    <input type="text" placeholder="半角数字を入力" value={searchNumber} onChange={(e) => {setSearchNumber(e.target.value)}}/>
                    <button onClick={searchBook}>表示</button>
                </div>
            </div>
        </main>
    )
}