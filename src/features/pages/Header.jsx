import { useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { UserNameContext } from "../providers/UserNameContext";
import { useAuth } from "../../providers/AuthContext";

export const Header = () => {
  const navigate = useNavigate();
  const { isAuth, setIsAuth } = useAuth();
  const jwt = localStorage.getItem("jwt");
  const { userName } = useContext(UserNameContext);
  const location = useLocation();
  const homeUrl = process.env.PUBLIC_URL;
  const from = location.state?.from?.pathname || `${homeUrl}/signin`;

  const signout = () => {
    localStorage.removeItem("jwt");
    alert("ログアウトしました");
    setIsAuth(false);
    navigate(from);
  };

  return (
    <header>
      {jwt ? (
        <div className="header-container">
          <h1 className="app-name">書籍レビューアプリ</h1>
          <div className="login-menus">
            <div className="userinfo">
              <div className="username">
                <i className="bi bi-person-circle"></i>
                <span className="name">{userName}</span>
              </div>
              <span
                className="material-symbols-outlined md-40"
                onClick={signout}
              >
                logout
              </span>
            </div>
            <nav className="links">
              <ul>
                <li>
                  <Link to={`${homeUrl}/profile`} className="link">
                    ユーザー情報編集
                  </Link>
                </li>
                <li>
                  <Link to={`${homeUrl}/new`} className="link">
                    レビュー投稿
                  </Link>
                </li>
                <li>
                  <Link to={`${homeUrl}/books`} className="link">
                    書籍一覧
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      ) : (
        <div className="header-container">
          <h1 className="app-name">書籍レビューアプリ</h1>
          <div className="menus">
            <nav className="links">
              <ul>
                <li>
                  <Link to={`${homeUrl}/signin`} className="link">
                    <i className="bi bi-box-arrow-in-right"></i>
                    ログイン
                  </Link>
                </li>
                <li>
                  <Link to={`${homeUrl}/signup`} className="link">
                    <i className="bi bi-person-plus-fill"></i>
                    登録
                  </Link>
                </li>
                <li>
                  <Link to={`${homeUrl}/`} className="link">
                    <i className="bi bi-book"></i>
                    書籍一覧
                  </Link>
                </li>
              </ul>
              {/* <Link to="/signin" className="link">
                <i class="bi bi-box-arrow-in-right"></i>ログイン
              </Link>
              <Link to="/signup" className="link">
                登録
              </Link>
              <Link to="/" className="link">
                書籍一覧
              </Link> */}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};
