import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/MyTests.css";

export default function MyTests() {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedGroups, setSelectedGroups] = useState({});

  const API_GET_URL = "http://127.0.0.1:8000/tests/api/tests/mytest/result";
  const API_DELETE_URL = "http://127.0.0.1:8000/tests/api/tests/delete";

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Нет токена авторизации");
      setLoading(false);
      return;
    }

    axios
      .get(API_GET_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setTests(res.data.tests);
        setLoading(false);
      })
      .catch(() => {
        setError("Ошибка загрузки данных");
        setLoading(false);
      });
  }, []);

  const handleGroupChange = (testId, group) => {
    setSelectedGroups((prev) => ({ ...prev, [testId]: group }));
  };

  const filterByGroup = (results, group) => {
    if (!group || group === "Все") return results;
    return results.filter((r) => r.group === group);
  };

  // 🔥 Удаление теста
  const deleteTest = async (testId) => {
  if (!window.confirm("Удалить тест? Это действие необратимо.")) return;

  try {
    const token = localStorage.getItem("token");

    await axios.delete(`${API_DELETE_URL}/${testId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setTests((prev) => prev.filter((t) => t.test_id !== testId));
  } catch (err) {
    console.error(err);
    alert("Ошибка удаления теста");
  }
};

  if (loading) return <div className="loader">Загрузка...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="tests-container">
      <h1>Мои тесты</h1>

      {tests.map((test) => {
        const groups = Array.from(new Set(test.results.map((r) => r.group)));
        const selected = selectedGroups[test.test_id] || "Все";
        const filtered = filterByGroup(test.results, selected);

        return (
          <div key={test.test_id} className="test-card">
            <div className="test-header">
              <h2>{test.title}</h2>

              {/* 🔥 кнопка удаления */}
              <button
                className="delete-test-btn"
                onClick={() => deleteTest(test.test_id)}
              >
                Удалить
              </button>
            </div>

            <select
              className="group-selector"
              value={selected}
              onChange={(e) => handleGroupChange(test.test_id, e.target.value)}
            >
              <option>Все</option>
              {groups.map((g) => (
                <option key={g}>{g}</option>
              ))}
            </select>

            <table className="results-table">
              <thead>
                <tr>
                  <th>ФИО</th>
                  <th>Группа</th>
                  <th>Баллы</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((r) => (
                  <tr key={r.id}>
                    <td>{r.full_name}</td>
                    <td>{r.group}</td>
                    <td>
                      {r.score} / {r.total_questions}
                    </td>
                </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      })}
    </div>
  );
}
