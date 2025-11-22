import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

export default function Home() {

  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const API_URL = 'http://127.0.0.1:8000/tests/api/tests/summary';

  useEffect(() => {
    axios.get(API_URL)
      .then(res => {
        setTests(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError('Ошибка загрузки тестов');
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>{error}</div>;
  if (!tests.length) return <div>Тесты не найдены</div>;

  return (
    <div className="home-container">
      <h2>Выбери тест:</h2>
      <div className="tests-grid">
        {tests.map((t) => (
          <div key={t.id} className="test-card">
            <h3>{t.test_title}</h3>
            <p>{t.group_name}</p>
            <Link to={`/test/${t.id}`}>Перейти</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
