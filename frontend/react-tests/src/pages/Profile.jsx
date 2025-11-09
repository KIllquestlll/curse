import axios from 'axios';
import { useEffect, useState } from 'react';




export default function Profile() {
  const API_URL = 'http://127.0.0.1:8000/users/api/me';
  const [user, setUser] = useState(null);

useEffect(() => {
  const token = localStorage.getItem('token');
  axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  .then(res => setUser(res.data))
  .catch(err => console.error('Ошибка загрузки:', err));
}, []);

return (
  <div className="profile-page">
    {user ? (
      <div className="profile-card">
        <img
          src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          alt="avatar"
          className="profile-avatar"
        />
        <h2>{user.first_name}{user.last_name}</h2>
        <p className="profile-email">{user.group}</p>
        <p className="profile-about">Люблю создавать проекты на React и изучать программирование.</p>
      </div>
    ) : (
      <p>Загрузка...</p>
    )}
  </div>
);}
