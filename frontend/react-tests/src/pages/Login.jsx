import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


export default function LoginForm() {
  const navigate = useNavigate(); 
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    group_id: "",
    password: ""
  });

  const [error, setError] = useState(""); 
  const [groups, setGroups] = useState([])


  useEffect(() => {
    axios.get("http://127.0.0.1:8000/groups/api")
    .then(res => setGroups(res.data))
    .catch(err => console.error('error',err))
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://127.0.0.1:8000/users/api/login", formData, {
        headers: { "Content-Type": "application/json" }
      });

      console.log("Ответ от сервера:", response.data);

      localStorage.setItem("token", response.data.token); 
      localStorage.setItem("user", JSON.stringify(response.data.user)); 
      window.dispatchEvent(new Event("storage"));

      navigate("/profile");
    } catch (err) {
      console.error("Ошибка входа:", err);
      setError("Неверные данные или ошибка сервера");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <h2>Авторизация</h2>

      <label>
        Имя:
        <input
          type="text"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Фамилия:
        <input
          type="text"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Группа:
        <select
          name="group_id"
          value={formData.group_id}
          onChange={handleChange}
          required
        >
          <option value="">Выберите группу</option>
          {groups.map(group => (
            <option key={group.id} value={group.id}>
              {group.name}
            </option>
          ))}
        </select>
      </label>

      <label>
        Пароль:
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </label>

      {error && <p className="error">{error}</p>}

      <button type="submit">Войти</button>
    </form>
  );
}