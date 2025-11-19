import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

export default function Home() {

    const [tests,SetTests] = useState([]);
    const [loading,SetLoading] = useState(true);
    const [error, SetError] = useState('');


    const API_URL = 'http://127.0.0.1:8000/tests/api/tests/summary'

    useEffect(() => {
      axios.get(API_URL)
      .then(res => {
        SetTests(res.data);
        SetLoading(false);
      })
      .catch(err => {
        SetError('Error');
        SetLoading(false)
      });
    },[]);

  return (
    <div className="home-container">
      <h2>Выбери тест:</h2>
      <div className="tests-grid">
        {tests.map((t,indedx) => (
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