import { useEffect, useState } from "react";
import { useNavigate, useParams , useLocation, Link} from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { useReview } from "../hooks/useReview";

export const Edit = () => {

    const jwt = localStorage.getItem("jwt");
    const params = useParams();
    const navigate = useNavigate();
    const reviewID = params.id;
    const {review, updateReview, deleteReview} = useReview(reviewID, jwt);

    const [titleText, setTitleText] = useState(review.title);
    const [urlText, setUrlText] = useState(review.url);
    const [detailText, setDetailText] = useState(review.detail);
    const [reviewText, setReviewText] = useState(review.review);

    useEffect(() => {
        setTitleText(review.title);
        setUrlText(review.url);
        setDetailText(review.detail);
        setReviewText(review.review)
    },[review])
    
  
    const body = {
        title: titleText,
        url: urlText,
        detail: detailText,
        review: reviewText,
    }

    const handleUpdateBook = () => {
        updateReview(body);
    }

    const handleDeleteReview = () => {
        deleteReview();
    }


    return(
        <div>
            {jwt ?
            <main className="edit">
                <div className="edit-forms">
                    <div className="edit-title">
                        <label htmlFor="title">タイトル</label>
                        <input type="text" id="title" value={titleText} onChange={(e) => setTitleText(e.target.value)}/>
                    </div>
                    <div className="edit-url">
                        <label htmlFor="url">URL</label>
                        <input type="text" id="url" value={urlText} onChange={(e) => setUrlText(e.target.value)}/>
                    </div>
                    <div className="edit-book-content">
                        <label htmlFor="detail">書籍内容</label>
                        <textarea type="text" id="detail" value={detailText} onChange={(e) => setDetailText(e.target.value)}/>
                    </div>
                    <div className="edit-review">
                        <label htmlFor="review">レビュー</label>
                        <textarea type="text" id="review" value={reviewText} onChange={(e) => setReviewText(e.target.value)}/>
                    </div>
                </div>
                <div className="edit-buttons">
                    <button className="repost-review-button" onClick={handleUpdateBook}>更新</button>
                    <button className="delete-review-button" onClick={handleDeleteReview}>削除</button>
                    <button className="prev-button" onClick={()=> {navigate(-1)}}>戻る</button>
                </div>
            </main>:
            <main className="books-content">
                <Link to="/signin">ログインしてください</Link>
            </main>
            }
        </div>
    )
}