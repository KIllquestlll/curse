import { Link } from "react-router-dom";

export default function Home() {
  const tests = [
    { id: 1, title: "Тест по истории", description: "Проверь свои знания по истории." },
    { id: 2, title: "Тест по биологии", description: "Проверь знания по биологии." },
    { id: 3, title: "Тест по географии", description: "Проверь знания о странах и столицах." },
    { id: 4, title: "Тест по информатике", description: "Основы алгоритмов и программирования." },
    { id: 5, title: "Тест по физике", description: "Проверь основы механики и термодинамики." },
    { id: 6, title: "Тест по литературе", description: "Классические произведения и авторы." },
  ];

  return (
    <div className="home-container">
      <h2>Выбери тест:</h2>
      <div className="tests-grid">
        {tests.map((test) => (
          <div key={test.id} className="test-card">
            <h3>{test.title}</h3>
            <p>{test.description}</p>
            <Link to={`/test/${test.id}`}>Перейти</Link>
          </div>
        ))}
      </div>
    </div>
  );
}