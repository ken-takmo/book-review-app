import { useState, useEffect } from "react";
import { Link, useNavigate, useParams, useLocation} from "react-router-dom";
import { UseGetBooks } from "./useGetBooks";
export function Books (){

    const jwt = localStorage.getItem('jwt');
    const navigate = useNavigate();

    // detailコンポーネントから前ページのクエリパラメータを受け取る
    const location = useLocation();
    const prevNumber = location.state;

    // 受け取ったクエリパラメータをstateで管理
    const [prevPage, setPrevPage] = useState(0);


    const [offset, setOffset] = useState("");
    const [number, setNumber] = useState(0);
    const [searchNumber, setSearchNumber] = useState(0);
    const [minCurrentPage, setMinCurrentPage] = useState(1);
    const [maxCurrentPage, setMaxCurrentPage] = useState(10);

    const results = UseGetBooks(`/books${offset}`,{"Authorization": `Bearer ${jwt}`});


    // クエリパラメータをnumberに代入
    useEffect(() => {
        if(prevNumber){
            setP(prevNumber);
        }
    },[prevNumber])

    useEffect(() => {
        setNumber(prevPage);
    },[prevPage])

    
    useEffect(() => {
        
        setOffset(`?offset=${number}`);
        navigate(`?offset=${number + 1} `)

        if(number === 0 ){
            setMinCurrentPage(1);
            setMaxCurrentPage(10);
        }else{
            setMinCurrentPage(number + 1);
            setMaxCurrentPage(number + 10);
        }
        window.scrollTo(0, 0);
        
    },[number]);
    
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
        if(String(searchNumber).match(/^\d+$/)){
            setNumber(Number(searchNumber) - 1);
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
                            <p >書籍内容: {result.detail}</p>
                            <h3 >レビュー: {result.review}</h3>
                        </div>
                        <div className="review-footer">
                            <button className="review-footers" onClick={() => {navigate(`/detail/${result.id}`,{state:number})}}>詳しく</button>
                            {result.isMine &&<button className="review-footers" onClick={() => {navigate(`/edit/${result.id}`,{state:result})}}>編集</button>}
                        </div>
                    </div>
                    ))}
                </div>
                <p className="current-page">{minCurrentPage} 〜 {maxCurrentPage}件目を表示</p>
                <div className="change-books">
                    <button className="prev-books-button" onClick={onPrevBooksChange}>前の10件を表示</button>
                    <button className="next-books-button" onClick={onNextBooksChange}>次の10件を表示</button>
                </div>
                <div className="search-books">
                    <label htmlFor="search">何件目から表示しますか</label>
                    <input type="text" placeholder="半角数字を入力" onChange={(e) => {setSearchNumber(e.target.value)}}/>
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