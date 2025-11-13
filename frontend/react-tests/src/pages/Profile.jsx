import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link} from 'react-router-dom';



export default function Profile() {
  const API_URL = 'http://127.0.0.1:8000/users/api/me';
  const [user, setUser] = useState(null);

useEffect(() => {
  const token = localStorage.getItem('token');
  if (!token) return;
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
          <h2>{user.first_name} {user.last_name}</h2>
          <p className="profile-group">{user.group_id}</p>
          <p className="profile-role">{user.role}</p>   
        </div>     
      ) : (
        
        <p>Загрузка...</p>
      )}
      {user && user.role === 'admin' && (
        <div className="profile-actions">
            <Link to="/admin" className="admin-button">
              Админ панель
            </Link>
        </div>
      )}
    </div>
  );
}