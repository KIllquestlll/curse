import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Header() {
  const [user, setUser] = useState(null); 
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser)); 
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null); 
    navigate("/");
  };

  useEffect(() => {
  const loadUser = () => {
    const storedUser = localStorage.getItem("user");
    setUser(storedUser ? JSON.parse(storedUser) : null);
  };
  
  loadUser();

  window.addEventListener("storage", loadUser);

  return () => {
    window.removeEventListener("storage", loadUser);
  };
}, []);

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
          <>
          <Link to="/loginout" className="exit" onClick={handleLogout}>Выход</Link>
          <Link to="/profile" className="login">профиль</Link>
          </>
        )}
      </div>
    </header>
  );
}