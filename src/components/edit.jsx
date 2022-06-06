import { useState } from "react";
import { useNavigate, useParams , useLocation} from "react-router-dom";
export const Edit = () => {

    const jwt = localStorage.getItem("jwt");
    const params = useParams();
    const navigate = useNavigate();
    
    // 本の詳細
    const location = useLocation();
    const data = location.state;

    // inputの初期値　inputの値を変更
    const [titleText, setTitleText] = useState(data.title)
    const [urlText, setUrlText] = useState(data.url)
    const [detailText, setDetailText] = useState(data.detail)
    const [reviewText, setReviewText] = useState(data.review)

    const editBooks = async () => {

        const title = titleText;
        const url = document.getElementById("url").value;
        const detail = document.getElementById("detail").value;
        const review = document.getElementById("review").value;


        const body = {
            title: title,
            url: url,
            detail: detail,
            review: review,
        }

        const res = await fetch(`https://api-for-missions-and-railways.herokuapp.com/books/${Object.values(params)}`,{
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${jwt}`,
            },
            body: JSON.stringify(body),
        });
        const result = await res.json();


        const formError = () => {
            if(!title){
                alert("タイトルを入力してください");
            }else if(!url){
                alert("URLを入力してください");
            }else if(!detail){
                alert("あらすじを入力してください");
            }else if(!review){
                alert("レビューを入力してください")
            }else{
                alert("バリエーションエラー")
            }
        }
        
        const editBookError = (result) => {
            switch(result.ErrorCode){
                case 403:
                case 400:
                    formError();
                    break;
                case 500:
                    alert(result.ErrorMessageJP)
                    break;
                default:
                    alert("レビュー内容が変更されました")
                    navigate("/")
                    break;
            }
        }
        editBookError(result);
    }

    const deleteBooks = async () => {
        await fetch(`https://api-for-missions-and-railways.herokuapp.com/books/${Object.values(params)}`,{
            method:"DELETE",
            headers: {
                "Authorization": `Bearer ${jwt}`,
            }
        })
        alert("削除されました");
        navigate("/");
    }

    // input値変更 onchange
    const titleChange = (e) => {
        setTitleText(e.target.value)
    }
    const urlChange = (e) => {
        setUrlText(e.target.value)
    }
    const detailChange = (e) => {
        setDetailText(e.target.value)
    }
    const reviewChange = (e) => {
        setReviewText(e.target.value)
    }

    return(
        <div>
            <div>
                <h1>書籍レビュー編集ページ</h1>
            </div>
            <div>
                <div>
                    <label htmlFor="title">タイトル</label>
                    <input type="text" id="title" value={titleText} onChange={(e) => {titleChange(e)}}/>
                </div>
                <div>
                    <label htmlFor="url">URL</label>
                    <input type="text" id="url" value={urlText} onChange={(e) => {urlChange(e)}}/>
                </div>
                <div>
                    <label htmlFor="detail">あらすじ</label>
                    <textarea type="text" id="detail" value={detailText} onChange={(e) => {detailChange(e)}}/>
                </div>
                <div>
                    <label htmlFor="review">レビュー</label>
                    <textarea type="text" id="review" value={reviewText} onChange={(e) => {reviewChange(e)}}/>
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
                <button onClick={()=> {navigate(-1)}}>戻る</button>
            </div>
        </div>
    )
}