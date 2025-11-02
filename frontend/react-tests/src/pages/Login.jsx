export default function Login() {
  return (
    <div className="form-page">
      <h2>Авторизация</h2>
      <form>
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Пароль" required />
        <button type="submit">Войти</button>
      </form>
    </div>
  );
}