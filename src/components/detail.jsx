import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useGetBooks } from "./useGetBooks";

export const Detail = () => {

    const params = useParams({});
    const navigate = useNavigate();
    const jwt = localStorage.getItem("jwt");
    const [content, setContent] = useState("detail");

    const details = useGetBooks(`/books/${Object.values(params)}`,{"Authorization": `Bearer ${jwt}`});
    
    const onContentChangeClick = (contentType) => {
        setContent(contentType);
    }
    
    return(
        <main className="detail">
            { jwt ?
            <div className="detail-content">
                <div className="detail-header">
                    <h2 className="detail-title">{details.title}</h2>
                </div>
                <div className="detail-main">
                    <div className="detail-main-button">
                        <button className={content === "detail" ? "selected" : "not-selected"} onClick={() => onContentChangeClick("detail")}>書籍内容</button>
                        <button className={content === "review" ? "selected" : "not-selected"} onClick={() => onContentChangeClick("review")}>レビュー</button>
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
                        {details.isMine &&<p>あなたの投稿です</p>}
                    </div>
                    <div className="footer-links">
                        <nav className="detail-url"><a target="_blank" href={details.url}>この書籍の参照リンク</a></nav>
                        <button className="detail-prev-button" onClick={()=> {navigate(-1)}}>戻る</button>
                    </div>
                </div>
            </div>:
            <div>
                <Link to="/signin">ログインしてください</Link>
            </div>
            }
        </main>
    )
}