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
    password: ""
  });


useEffect(() =>{
  axios.get('http://127.0.0.1:8000/groups/api')
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
    try{
      const res = await axios.post('http://127.0.0.1:8000/users/api/register',formData);

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

      <button type="submit">Зарегистрироваться</button>
    </form>
  );
}