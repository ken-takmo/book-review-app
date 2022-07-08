import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useFetch } from "../../../hooks/useFetch";
export const Newbook = () => {
  const jwt = localStorage.getItem("jwt");
  const navigate = useNavigate();
  const { fetchData, fetchRes } = useFetch();

  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [detail, setDetail] = useState("");
  const [review, setReview] = useState("");

  const handlePostReview = async () => {
    const body = {
      title: title,
      url: url,
      detail: detail,
      review: review,
    };

    const res = await fetchData(
      "/books",
      "POST",
      { Authorization: `Bearer ${jwt}` },
      body
    );
    const result = await res.json();

    const successAction = () => {
      alert("レビューが投稿されました");
      navigate("/books");
    };

    fetchRes(res, successAction, result);
  };

  return (
    <div>
      {jwt ? (
        <main className="newbook">
          <div className="newbook-content">
            <div>
              <label htmlFor="title">タイトル</label>
              <input
                type="text"
                id="title"
                onChange={(e) => setTitle(e.target.value)}
                placeholder="タイトル"
              />
            </div>
            <div>
              <label htmlFor="url">URL</label>
              <input
                type="text"
                id="url"
                onChange={(e) => setUrl(e.target.value)}
                placeholder="URL"
              />
            </div>
            <div>
              <label htmlFor="detail">書籍内容</label>
              <textarea
                id="detail"
                rows="5"
                onChange={(e) => setDetail(e.target.value)}
                placeholder="本の内容を書いてください"
              />
            </div>
            <div>
              <label htmlFor="review">レビュー</label>
              <textarea
                rows="5"
                id="review"
                onChange={(e) => setReview(e.target.value)}
                placeholder="本のレビューを書いてください"
              />
            </div>
          </div>
          <div className="newbook-buttons">
            <button className="post-book-button" onClick={handlePostReview}>
              投稿
            </button>
            <button
              className="prev-button"
              onClick={() => {
                navigate("/books");
              }}
            >
              戻る
            </button>
          </div>
        </main>
      ) : (
        <main className="books-content">
          <Link to="/signin">ログインしてください</Link>
        </main>
      )}
    </div>
  );
};
