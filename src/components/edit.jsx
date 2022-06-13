import { useState } from "react";
import { useNavigate, useParams , useLocation} from "react-router-dom";
import { UseFetch } from "./useFetch";
export const Edit = () => {

    const jwt = localStorage.getItem("jwt");
    const params = useParams();
    const navigate = useNavigate();
    const {fetchdata,fetchRes} = UseFetch();
    
    // 本の詳細
    const location = useLocation();
    const data = location.state;

    const [titleText, setTitleText] = useState(data.title)
    const [urlText, setUrlText] = useState(data.url)
    const [detailText, setDetailText] = useState(data.detail)
    const [reviewText, setReviewText] = useState(data.review)

    const editBooks = async () => {
        
        const body = {
            title: titleText,
            url: urlText,
            detail: detailText,
            review: reviewText,
        }

        const res = await fetchdata(`/books/${Object.values(params)}`,"PUT",{'Authorization': `Bearer ${jwt}`},body);
        const result = await res.json();

        const successAction = () => {
            alert("レビュー内容が変更されました")
            navigate("/books")
        }
        fetchRes(res,successAction,result);
    }

    const deleteBooks = async () => {
        const res = await fetchdata(`/books/${Object.values(params)}`,"DELETE",{"Authorization": `Bearer ${jwt}`},)

        const successAction = () => {
            alert("削除されました");
            navigate("/books")
        }
        fetchRes(res,successAction)
    }

    return(
        <div>
            <div>
                <h1>書籍レビュー編集ページ</h1>
            </div>
            <div>
                <div>
                    <label htmlFor="title">タイトル</label>
                    <input type="text" id="title" value={titleText} onChange={(e) => setTitleText(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="url">URL</label>
                    <input type="text" id="url" value={urlText} onChange={(e) => setUrlText(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="detail">あらすじ</label>
                    <textarea type="text" id="detail" value={detailText} onChange={(e) => setDetailText(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="review">レビュー</label>
                    <textarea type="text" id="review" value={reviewText} onChange={(e) => setReviewText(e.target.value)}/>
                </div>
            </div>
            <div>
                <button onClick={editBooks}>更新</button>
            </div>
            <br />
            <div>
                <button onClick={deleteBooks}>削除</button>
            </div>
            <br />
            <div>
                <button onClick={()=> {navigate("/books")}}>戻る</button>
            </div>
        </div>
    )
}