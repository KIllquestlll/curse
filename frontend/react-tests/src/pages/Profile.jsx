import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Profile() {
  const API_URL = 'https://jsonplaceholder.typicode.com/users';
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get(API_URL)
      .then(res => {
        setUser(res.data[1]);
      })
      .catch(err => console.error('Ошибка загрузки:', err));
  },);

  return (
    <div className="profile-page">
      <div className="profile-card">
        <img
          src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          alt="avatar"
          className="profile-avatar"
        />
        <h2>{user.name}</h2>
        <p className="profile-email">{user.email}</p>
        <p className="profile-about">Люблю создавать проекты на React и изучать программирование.</p>
      </div>
    </div>
  );
}