import { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useUserName } from "../../hooks/useUserName";
import { UserNameContext } from "../../providers/UserNameContext";
export const Profile = () => {
  const jwt = localStorage.getItem("jwt");
  const navigate = useNavigate();
  const { userName, setUserName } = useContext(UserNameContext);
  const { editProfile } = useUserName();
  const homeUrl = process.env.PUBLIC_URL;

  const [newName, setNewName] = useState("");

  useEffect(() => {
    setNewName(userName);
  }, [userName]);

  const handleEditProfile = async () => {
    const body = {
      name: newName,
    };

    const name = await editProfile(body, jwt);

    setUserName(name.name);
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
                navigate(`${homeUrl}/books`);
              }}
            >
              戻る
            </button>
          </div>
        </main>
      ) : (
        <main className="books-content">
          <Link to={`${homeUrl}/signin`}>ログインしてください</Link>
        </main>
      )}
    </div>
  );
};
