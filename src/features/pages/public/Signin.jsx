import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useFetch } from "../../../hooks/useFetch";
import { useAuth } from "../../../providers/AuthContext";

export function Signin() {
  const location = useLocation();
  const { isAuth, setIsAuth } = useAuth();
  const navigate = useNavigate();
  const [emailText, setEmailText] = useState("");
  const [passwordText, setPasswordText] = useState("");
  const { fetchData, fetchRes } = useFetch();
  const from = location.state?.from?.pathname || "/books";

  const body = {
    email: emailText,
    password: passwordText,
  };

  const errorAction = () => {
    if (!emailText) {
      alert("メールアドレスを入力してください");
    } else if (!passwordText) {
      alert("パスワードを入力してください");
    } else {
      alert("メールアドレスまたはパスワードが正しくありません");
    }
  };

  const handleSignin = async () => {
    const res = await fetchData("/signin", "POST", undefined, body);
    const result = await res.json();

    const successAction = () => {
      localStorage.setItem("jwt", result.token);
      alert("ログインに成功しました！！！！");
      setIsAuth(true);
      navigate(from);
    };

    fetchRes(res, successAction, errorAction, result);
  };

  return (
    <main className="signin">
      <div className="signin-content">
        <h1 className="signin-title">ログイン</h1>
        <div className="signin-forms">
          <div className="signin-emailform">
            <label htmlFor="email">メールアドレス</label>
            <input
              type="email"
              placeholder="メールアドレスを入力"
              autoFocus
              onChange={(e) => setEmailText(e.target.value)}
            />
          </div>
          <div className="signin-passwordform">
            <label htmlFor="password">パスワード</label>
            <input
              className=""
              type="text"
              placeholder="パスワードを入力"
              onChange={(e) => setPasswordText(e.target.value)}
            />
          </div>
          <button onClick={handleSignin} className="signin-button">
            ログイン
          </button>
        </div>
        <Link to="/signup" className="signup-link">
          登録画面へ
        </Link>
      </div>
    </main>
  );
}
