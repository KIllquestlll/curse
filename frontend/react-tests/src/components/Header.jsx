import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const user = localStorage.getItem("user");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user"); 
    navigate("/");
  };

  return (
    <header>
      <Link to="/" className="site-title">Testify</Link>
      <div className="buttons">
        {!user && (
          <>
            <Link to="/register" className="register">Регистрация</Link>
            <Link to="/login" className="login">Авторизация</Link>
          </>
        )}
        {user && (
          <button onClick={handleLogout} className="logout">Выход</button>
        )}
      </div>
    </header>
  );
}