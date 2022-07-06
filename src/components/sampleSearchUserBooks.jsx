import { useState } from "react";
import { useFetch } from "../hooks/useFetch";

export const Sample = () => {
  const { fetchdata, fetchRes } = useFetch();

  const [userBooks, setUserBooks] = useState({});
  const results = [];

  const GetUserBooks = async () => {
    for (let i = 0; i <= 100; i += 10) {
      const res = await fetchdata(`/public/books?offset=${i}`, "get");
      const resJson = await res.json();
      // console.log(resJson);
      const userBook = resJson.filter((book) => {
        return book.reviewer == "g";
      });
      console.log(userBook);
      setUserBooks(userBook);
    }
  };

  GetUserBooks();

  // async function() {
  //     for await(let res of GetUserBooks()){

  //     }
  // }

  for (let i = 0; i <= 100; i += 10) {
    // const result = GetUserBooks(i);
    console.log(i);
    // const usersBook = Object.values(result).filter

    // console.log(result);
  }

  return (
    <div>
      {Object.values(userBooks).map((result) => (
        <div className="review" key={result.id}>
          <h2 className="review-title">{result.title}</h2>
          <hr />
          <div className="review-main">
            <p>書籍内容: {result.detail}</p>
            <h3> レビュー: {result.review}</h3>
          </div>
        </div>
      ))}
    </div>
  );
};
