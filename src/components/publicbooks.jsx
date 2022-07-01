import { useState } from "react";
import { useNavigate, useSearchParams} from "react-router-dom";
import { useGetBooks } from "./useGetBooks"
import { IsLogin } from "./isLogin";

export const Publicbooks = () => {

    const navigate = useNavigate();
    const url = "/?offset=";
    const [params] = useSearchParams();
    const [searchNumber, setSearchNumber] = useState(1);
    const [offset, setOffset] = useState(Number(params.get(`offset`) ?? 0) -1);

    const results = useGetBooks(`/public/books?offset=${offset}`);
    
    const onNextBooksChange = () => {
        if(offset === -1) {
            setOffset(offset + 11);
            navigate(`${url}${offset + 12}`);
        }else{
            setOffset(offset + 10)
            navigate(`${url}${offset + 11}`);
        }
        window.scrollTo(0, 0);
    }
    
    const onPrevBooksChange = () => {
        if(0 < offset && offset <= 10) {
            setOffset(-1)
            navigate("/")
            window.scrollTo(0, 0);
        }else if(offset === -1){
            alert("最新のレビューです")
        }else{
            setOffset(offset - 10)
            navigate(`${url}${offset - 9}`);
            window.scrollTo(0, 0);
        }
    }
    
    const searchBook = () => {
        if(String(searchNumber).match(/^\d+$/)){
            setOffset(searchNumber -1);
            navigate(`${url}${searchNumber}`);
            window.scrollTo(0, 0);
            setSearchNumber("");
        }else{
            alert("半角数字を入力してください")
        }
    }

    const requestLogin = () => {
        alert("ログイン後、レビューの詳細をご覧になれます");
        navigate("/signin");
    }
    
    IsLogin();

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
                { offset === -1 ?
                <p className="current-page">{offset + 2} 〜 {offset + 11}件目を表示</p>:
                <p className="current-page">{offset + 1} 〜 {offset + 10}件目を表示</p>
                }
                <div className="change-books">
                    <button className="prev-books-button" onClick={onPrevBooksChange}>前の10件を表示</button>
                    <button className="next-books-button" onClick={onNextBooksChange}>次の10件を表示</button>
                </div>
                <div className="search-books">
                    <label htmlFor="search">何件目から表示しますか</label>
                    <input type="text" placeholder="半角数字を入力" value={searchNumber} onChange={(e) => {setSearchNumber(e.target.value)}}/>
                    <p>件目</p>
                    <button onClick={searchBook}>表示</button>
                </div>
            </div>
        </main>
    )
}