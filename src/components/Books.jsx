import { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useSearchParams,} from "react-router-dom";
import { useGetBooks } from "../hooks/useGetBooks";
import { LoadingContext } from "./Loading";
export const Books = () => {

    const jwt = localStorage.getItem('jwt');
    const navigate = useNavigate();
    const baseurl = "/books?offset=";
    const {loading, setLoading} = useContext(LoadingContext);
    const [params] = useSearchParams();
    const [searchParams, setSearchParams] = useState(1);
    const [offset, setOffset] = useState(Number(params.get(`offset`) ?? 0) -1);

    const results = useGetBooks(`/books?offset=${offset}`,{"Authorization": `Bearer ${jwt}`});
    
    const handleNextBooks = () => {
        if(offset === -1) {
            setOffset(offset + 11);
            navigate(`${baseurl}${offset + 12}`);
        }else{
            setOffset(offset + 10)
            navigate(`${baseurl}${offset + 11}`);
        }
        window.scrollTo(0, 0);
    }
    
    const handlePrevBooks = () => {
        if(0 < offset && offset <= 10) {
            setOffset(-1)
            navigate("/books")
            window.scrollTo(0, 0);
        }else if(offset <= 0 ){
            alert("最新のレビューです")
        }else{
            setOffset(offset - 10)
            navigate(`${baseurl}${offset - 9}`);
            window.scrollTo(0, 0);
        }
    }
    
    const handleFindBook = () => {
        if(String(searchParams).match(/^\d+$/)){
            setOffset(searchParams -1);
            navigate(`${baseurl}${searchParams}`);
            window.scrollTo(0, 0);
            setSearchParams("");
        }else{
            alert("半角数字を入力してください")
        }
    }

    return(
        <main className="books">
            {!loading ?( 
                <div className="books-content">
                    <h1>読み込み中</h1>
                </div>
            ):(jwt  ?(
                <div className="books-content">
                    <div className="reviews">
                        {Object.values(results).map((result) => (
                        <article className="review" key={result.id}>
                            <h2 className="review-title">{result.title}</h2>
                            <hr />
                            <div className="review-main">
                                <p><span className="content1">書籍内容 :</span>{result.detail}</p>
                                <h3><span className="content2">レビュー :</span>{result.review}</h3>
                            </div>
                            <div className="review-footer">
                                <button className="review-footers" onClick={() => {navigate(`/detail/${result.id}`)}}>詳しく</button>
                                {result.isMine &&<button className="review-footers" onClick={() => {navigate(`/edit/${result.id}`,{state:result})}}>編集</button>}
                            </div>
                        </article>
                        ))}
                    </div>
                    { offset === -1 ?(
                    <p className="current-page">{offset + 2} 〜 {offset + 11}件目を表示</p>
                    ):(
                    <p className="current-page">{offset + 1} 〜 {offset + 10}件目を表示</p>
                    )}
                    <div className="change-books">
                        <button className="prev-books-button" onClick={handlePrevBooks}>前の10件を表示</button>
                        <button className="next-books-button" onClick={handleNextBooks}>次の10件を表示</button>
                    </div>
                    <div className="search-books">
                        <label htmlFor="search">何件目から表示しますか</label>
                        <input type="number" min={1} placeholder="半角数字を入力" onChange={(e) => {setSearchParams(Number(e.target.value))}}></input>
                        <button onClick={handleFindBook}>表示</button>
                    </div>
                </div>
                ):(
                <div className="books-content">
                    <Link to="/signin">ログインしてください</Link>
                </div>
            ))}
        </main>
    )
}