import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/admin.css"; 
import { Navigate } from "react-router-dom";

export default function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [groups, setGroups] = useState([]);
  const [filterRole, setFilterRole] = useState("all");
  const [filterGroup, setFilterGroup] = useState("all");
  const [UserRole, setUserRole] = useState(null);

  const API_URL = "http://127.0.0.1:8000/users/api/users"; 
  const GROUP_URL = 'http://127.0.0.1:8000/groups/api'
  const API_DELETED_USERS_URL = 'http://127.0.0.1:8000/users/api/delete'

  const token = localStorage.getItem("token");

  useEffect(() => {
    const StoredUser = JSON.parse(localStorage.getItem('user'));
    if (StoredUser) setUserRole(StoredUser.role)
  },[]);

  useEffect(() => {
    axios
      .get(API_URL, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((res) => setUsers(res.data))
      .catch((err) => console.error(err));
  }, [token]);

  useEffect(() => {
    axios
      .get(GROUP_URL)
      .then((res) => setGroups(res.data))
      .catch((err) => console.error(err));
  }, []);

  if (UserRole && UserRole !== 'admin'){
    return <Navigate to='/' replace/>;
  }

  const handleRoleChange = async (userId, newRole) => {
    try {
      await axios.patch(
        `${API_URL}/${userId}/role`,
        { role: newRole },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setUsers((prev) =>
        prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u))
      );

    } catch (err) {
      console.error(err);
      alert("Ошибка при смене роли");
    }
  };

  const handleDeleteUser = async (userId) => {
  if (!window.confirm("Вы точно хотите удалить этого пользователя? Это действие необратимо.")) return;

  try {
    await axios.delete(`${API_DELETED_USERS_URL}/${userId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    // Убираем пользователя из состояния
    setUsers((prev) => prev.filter((u) => u.id !== userId));
  } catch (err) {
    console.error(err);
    alert("Ошибка при удалении пользователя");
  }
};

  const filteredUsers = users.filter(
    (u) =>
      (filterRole === "all" || u.role === filterRole) &&
      (filterGroup === "all" || u.group.name === filterGroup)
  );

  return (
    <div className="admin-panel">
      <h1 className="admin-title">Админ-панель</h1>

      <div className="filters">
        <select
          className="filter-select"
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
        >
          <option value="all">Все роли</option>
          <option value="student">Ученик</option>
          <option value="teacher">Учитель</option>
          <option value="admin">Админ</option>
        </select>

        <select
          className="filter-select"
          value={filterGroup}
          onChange={(e) => setFilterGroup(e.target.value)}
        >
          <option value="all">Все группы</option>
          {groups.map((group) => (
            <option key={group.id} value={group.name}>
              {group.name}
            </option>
          ))}
        </select>
      </div>

      <div className="user-list">
        {filteredUsers.map((user) => (
          <div key={user.id} className="user-card">
            <div className="user-info-block">
              <h2 className="user-name">{user.first_name} {user.last_name}</h2>
              <p className="user-info">Группа: {user.group.name}</p>
            </div>

            <div className="user-role">
              <span className="role-label">Роль: {user.role}</span>
              <select
                className="role-select"
                value={user.role}
                onChange={(e) => handleRoleChange(user.id, e.target.value)}
              >
                <option value="student">Ученик</option>
                <option value="teacher">Учитель</option>
                <option value="admin">Админ</option>
              </select>

              <button
              className="delete-user-btn"
              onClick={() => handleDeleteUser(user.id)}
            >
              Удалить
            </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
