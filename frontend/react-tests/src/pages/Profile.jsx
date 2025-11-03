export default function Profile() {

  const user = {
    name: "Егор Шевкинов",
    email: "example@gmail.com",
    about: "Люблю создавать проекты на React и изучать программирование.",
    avatar:
      "https://cdn-icons-png.flaticon.com/512/3135/3135715.png", // временный аватар
      
  };

  return (
    <div className="profile-page">
      <div className="profile-card">
        <img src={user.avatar} alt="avatar" className="profile-avatar" />
        <h2>{user.name}</h2>
        <p className="profile-email">{user.email}</p>
        <p className="profile-about">{user.about}</p>
        <button className="profile-edit">Редактировать профиль</button>
      </div>
    </div>
  );
}
