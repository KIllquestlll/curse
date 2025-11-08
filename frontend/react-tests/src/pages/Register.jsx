import { useState } from "react";
import "../index.css"; 
import { useNavigate } from "react-router-dom";
import axios from "axios";


export default function RegisterForm() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    group: "",
    password: ""
  });

const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit =  async (e) => {
    e.preventDefault();
    try{
      const res = await axios.post('http://127.0.0.1:8000/users/api/register',formData);

      alert(res.data.message || 'Register win')

      localStorage.setItem('user',formData.first_name)

      navigate('/profile')
    }catch(err){
      console.log(err);
      alert(err.response?.data?.detail || 'Error')
    }
  };

  return (
    <form onSubmit={handleSubmit} className="register-form">
      <h2>Регистрация</h2>

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
        <input
          type="text"
          name="group"
          value={formData.group}
          onChange={handleChange}
        />
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

      <button type="submit">Зарегистрироваться</button>
    </form>
  );
}