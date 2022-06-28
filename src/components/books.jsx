import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { UseGetBooks } from "./useGetBooks";
export function Books (){

    const jwt = localStorage.getItem('jwt');
    const navigate = useNavigate();
    const url = "/books?offset=";
    const [params] = useSearchParams();
    const [searchParams, setSearchParams] = useState(1);
    const [offset, setOffset] = useState(Number(params.get(`offset`) ?? 0) -1);

    const results = UseGetBooks(`/books?offset=${offset}`,{"Authorization": `Bearer ${jwt}`});
    
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
            navigate("/books")
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
        if(String(searchParams).match(/^\d+$/)){
            setOffset(searchParams -1);
            navigate(`${url}${searchParams}`);
            window.scrollTo(0, 0);
            setSearchParams("");
        }else{
            alert("半角数字を入力してください")
        }
    }

    return(
        <main className="books">
            {jwt ? 
            <div className="books-content">
                <div className="reviews">
                    {Object.values(results).map((result) => (
                    <div className="review" key={result.id}>
                        <h2 className="review-title">{result.title}</h2>
                        <hr />
                        <div className="review-main">
                            <p><span className="content1">書籍内容 :</span> {result.detail}</p>
                            <h3><span className="content2">レビュー :</span> {result.review}</h3>
                        </div>
                        <div className="review-footer">
                            <button className="review-footers" onClick={() => {navigate(`/detail/${result.id}`)}}>詳しく</button>
                            {result.isMine &&<button className="review-footers" onClick={() => {navigate(`/edit/${result.id}`,{state:result})}}>編集</button>}
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
                    <input type="text" placeholder="半角数字を入力" onChange={(e) => {setSearchParams(Number(e.target.value))}}></input>
                    <button onClick={searchBook}>表示</button>
                </div>
            </div>:
            <div className="books-content">
                <Link to="/signin">ログインしてください</Link>
            </div>
            }
        </main>
    )
}