import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useUser } from "./useUser";

export const Detail = () => {

    const params = useParams({});
    const navigate = useNavigate();
    const location = useLocation();

    const jwt = localStorage.getItem("jwt");
    const [content, setContent] = useState("detail");
    const number = location.state;

    const details = useUser(`/books/${Object.values(params)}`,{"Authorization": `Bearer ${jwt}`});
    
    const onDetailClick = () => {
        setContent("detail");
    }
    const onReviewClick = () => {
        setContent("review")
    }

    return(
        <main className="detail">
            <div className="detail-content">
                <div className="detail-header">
                    <h2 className="detail-title">{details.title}</h2>
                </div>
                <div className="detail-main">
                    <div className="detail-main-button">
                        <button className={content === "detail" ? "selected" : "not-selected"} onClick={onDetailClick}>書籍内容</button>
                        <button className={content === "review" ? "selected" : "not-selected"} onClick={onReviewClick}>レビュー</button>
                    </div>
                    {content === "detail" ?
                    <div className="is-detail">
                        <h3>書籍内容</h3>
                        <hr />
                        <p>{details.detail}</p>
                    </div>
                    :
                    <div className="is-review">
                        <h3>レビュー</h3>
                        <hr />
                        <p>{details.review}</p>
                    </div>
                    }
                </div>
                <div className="detail-footer">
                    <div className="author">
                        <p>投稿者 : {details.reviewer}</p>
                        {/* <p>ID:{details.id}</p> */}
                        {details.isMine &&<p>あなたの投稿です</p>}
                    </div>
                    <div className="footer-links">
                        <nav className="detail-url"><a target="_blank" href={details.url}>この本のリンク</a></nav>
                        <button className="detail-prev-button" onClick={()=> {navigate(`/books?offset=9`)}}>戻る</button>
                    </div>
                </div>
            </div>
        </main>
    )
}