import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UseFetch } from "./useFetch";
export const Newbook = () => {

    const jwt = localStorage.getItem("jwt")
    const navigate = useNavigate();
    const {fetchdata,fetchRes} = UseFetch();

    const [title, setTitle] = useState("");
    const [url, setUrl] = useState("");
    const [detail, setDetail] = useState("");
    const [review, setReview] = useState("");

    const postBook = async() => {

        const body = {
            title: title,
            url: url,
            detail: detail,
            review: review,
        }

        const res = await fetchdata("/books","POST",{'Authorization': `Bearer ${jwt}`},body)

        const result = await res.json();

        const successAction = () => {
            alert("レビューが投稿されました");
            navigate("/books");
        }

        fetchRes(res,successAction,result);
    }

    return(
        <div>
            <div>
                <h1>書籍レビュー投稿ページ</h1>
            </div>
            <div>
                <h2>タイトル、URL、あらすじ、レビューを書いてください。</h2>
                <div>
                    <label htmlFor="title">タイトル</label>
                    <input type="text" id="title" onChange={e => setTitle(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="url">URL</label>
                    <input type="text" id="url" onChange={e => setUrl(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="detail">あらすじ</label>
                    <textarea id="detail" rows="5" onChange={e => setDetail(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="review">レビュー</label>
                    <textarea rows="5" id="review" onChange={e => setReview(e.target.value)}/>
                </div>
                <div>
                    <button onClick={postBook}>作成</button>
                </div>
            </div>
            <br />
            <button onClick={() => {navigate("/books")}}>戻る</button>
        </div>
    )
}