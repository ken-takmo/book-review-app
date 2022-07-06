import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { UserNameContext } from "../context/UserNameContext";
export const Profile = () => {
  const jwt = localStorage.getItem("jwt");
  const navigate = useNavigate();
  const { fetchdata, fetchRes } = useFetch();
  const { userName, setUserName } = useContext(UserNameContext);
  const [newName, setNewName] = useState(userName);

  const handleEditProfile = async () => {
    const body = {
      name: newName,
    };

    const res = await fetchdata(
      "/users",
      "PUT",
      { Authorization: `Bearer ${jwt}` },
      body
    );
    const result = await res.json();
    setUserName(Object.values(result));

    const successAction = () => {
      alert(`ユーザー名が${newName}に変更されました`);
      navigate("/books");
    };

    fetchRes(res, successAction, result);
  };

  return (
    <div>
      {jwt ? (
        <main className="profile">
          <div className="profile-content">
            <label htmlFor="newName">新しいユーザー名</label>
            <input
              type="text"
              id="newName"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
          </div>
          <div className="profile-buttons">
            <button className="update-button" onClick={handleEditProfile}>
              変更
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
