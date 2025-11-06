

export default function Register() {
  return (
    <div className="form-page">
      <h2>Регистрация</h2>
      <form>
        <input type="text" placeholder="Имя пользователя" required />
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Пароль" required />
        <button type="submit">Зарегистрироваться</button>
      </form>
    </div>
  );
}