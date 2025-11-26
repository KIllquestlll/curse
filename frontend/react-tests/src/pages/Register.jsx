import { useEffect, useState } from "react";
import "../index.css"; 
import { useNavigate } from "react-router-dom";
import axios from "axios";


export default function RegisterForm() {
  const [groups,setGroups] = useState([]);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    group_id: "",
    password: "",
    confirm_password:"",
  });

  const API_POST_URL = 'http://127.0.0.1:8000/users/api/register'
  const API_GET_URL = 'http://127.0.0.1:8000/groups/api'

useEffect(() =>{
  axios.get(API_GET_URL)
  .then(res => setGroups(res.data))
  .catch(err => console.error('Error loading',err));
},[]);

const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit =  async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirm_password){
      alert("The passwords don't match")
      return;
    }

    try{
      const res = await axios.post(API_POST_URL,formData);

      alert(res.data.message || 'Register win')
      group_i:parseInt(formData.group_id)
      localStorage.setItem('user', JSON.stringify(res.data.user));
      localStorage.setItem('token',res.data.token)

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
        <select
        name='group_id'
        value={formData.group_id}
        onChange={handleChange}
        required
        >
          <option value="">Выбери группу</option>
          {groups.map(group =>(
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

      <label>
        Повтор Пароля:
        <input
          type="password"
          name="repeat_password"
          value={formData.confirm_password}
          onChange={e => setFormData({...formData, confirm_password: e.target.value})}
          required
        />
      </label>

      <button type="submit">Зарегистрироваться</button>
    </form>
  );
}