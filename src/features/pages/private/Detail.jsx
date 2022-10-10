import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useReview } from "../../hooks/useReview";

export const Detail = () => {
  const navigate = useNavigate();
  const params = useParams({});
  const reviewID = params.id;
  const jwt = localStorage.getItem("jwt");
  const [content, setContent] = useState("detail");
  const { review } = useReview(reviewID, jwt);
  const homeUrl = process.env.PUBLIC_URL;

  function handleContentChange(contentType) {
    setContent(contentType);
  }

  return (
    <main className="detail">
      {jwt ? (
        <div className="detail-content">
          <div className="detail-header">
            <h2 className="detail-title">{review.title}</h2>
          </div>
          <div className="detail-main">
            <div className="detail-main-button">
              <button
                className={content === "detail" ? "selected" : "not-selected"}
                onClick={() => handleContentChange("detail")}
              >
                書籍内容
              </button>
              <button
                className={content === "review" ? "selected" : "not-selected"}
                onClick={() => handleContentChange("review")}
              >
                レビュー
              </button>
            </div>
            {content === "detail" ? (
              <div className="is-detail">
                <h3>書籍内容</h3>
                <hr />
                <p>{review.detail}</p>
              </div>
            ) : (
              <div className="is-review">
                <h3>レビュー</h3>
                <hr />
                <p>{review.review}</p>
              </div>
            )}
          </div>
          <div className="detail-footer">
            <div className="author">
              <p>投稿者 : {review.reviewer}</p>
              {review.isMine && <p>あなたの投稿です</p>}
            </div>
            <div className="footer-links">
              <nav className="detail-url">
                <a target="_blank" href={review.url}>
                  この書籍の参照リンク
                </a>
              </nav>
              <button
                className="detail-prev-button"
                onClick={() => {
                  navigate(-1);
                }}
              >
                戻る
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <Link to={`${homeUrl}/signin`}>ログインしてください</Link>
        </div>
      )}
    </main>
  );
};
