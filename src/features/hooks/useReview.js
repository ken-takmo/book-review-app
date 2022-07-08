import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";

export const useReview = (reviewID, jwt) => {
  const navigate = useNavigate();
  const { fetchData, fetchRes } = useFetch();
  const [review, setReview] = useState({
    title: "",
    url: "",
    detail: "",
    review: "",
  });

  useEffect(() => {
    const getReview = async () => {
      const res = await fetchData(`/books/${reviewID}`, "GET", {
        Authorization: `Bearer ${jwt}`,
      });
      const result = await res.json();
      setReview(result);
    };
    getReview();
  }, [reviewID]);

  const updateReview = async (body) => {
    const res = await fetchData(
      `/books/${reviewID}`,
      "PUT",
      { Authorization: `Bearer ${jwt}` },
      body
    );
    const result = await res.json();

    const updateSuccessAction = () => {
      alert("レビュー内容が変更されました");
      navigate("/books");
    };
    fetchRes(res, updateSuccessAction, result);
  };

  const deleteReview = async () => {
    const res = await fetchData(`/books/${reviewID}`, "DELETE", {
      Authorization: `Bearer ${jwt}`,
    });

    const deleteSuccessAction = () => {
      alert("この投稿が削除されました");
      navigate("/books");
    };

    fetchRes(res, deleteSuccessAction);
  };

  return { review, updateReview, deleteReview };
};
