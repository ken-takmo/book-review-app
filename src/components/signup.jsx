import { useState, useEffect } from "react";
import { useFetch } from "../hooks/useFetch";
import { Link, useNavigate } from "react-router-dom";

export function SignUp() {
  const navigate = useNavigate();
  const { fetchdata, fetchRes } = useFetch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const body = {
    name: name,
    email: email,
    password: password,
  };

  const errorAction = () => {
    if (!name) {
      alert("ユーザーネームを入力してください");
    } else if (!password) {
      alert("パスワードを入力してください");
    } else if (!email) {
      alert("メールアドレスを入力してください");
    } else {
      alert("もう一度入力し直してください");
    }
  };

  const handleSignup = async () => {
    const res = await fetchdata("/users", "POST", undefined, body);
    const result = await res.json();

    const successAction = () => {
      alert("登録されました");
      navigate("/signin");
    };

    fetchRes(res, successAction, errorAction, result);
  };

  return (
    <main className="signup">
      <div className="signup-content">
        <h1 className="signup-title">ユーザー登録</h1>
        <div className="signup-forms">
          <div className="signup-name">
            <label htmlFor="name">ユーザーネーム</label>
            <input
              type="text"
              placeholder="ユーザーネームを入力"
              autoFocus
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div className="signup-email">
            <label htmlFor="email">メールアドレス</label>
            <input
              type="email"
              placeholder="メールアドレスを入力"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="signup-password">
            <label htmlFor="password">パスワード</label>
            <input
              type="text"
              placeholder="パスワードを入力"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <button
            className="signup-button"
            type="submit"
            onClick={handleSignup}
          >
            登録
          </button>
        </div>
        <Link to="/signin" className="signin-link">
          ログイン画面へ
        </Link>
      </div>
    </main>
  );
}
