import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <Link to="/" className="site-title">Testify</Link>
      <div className="buttons">
        <Link to="/register" className="register">Регистрация</Link>
        <Link to="/login" className="login">Авторизация</Link>
      </div>
    </header>
  );
}