import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/CreateTest.css";

export default function CreateTest() {
  const [title, setTitle] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("");
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_GROUP_URL = "http://127.0.0.1:8000/groups/api";
  const API_TEST_URL = "http://127.0.0.1:8000/tests/api/test";

  const [questions, setQuestions] = useState([
    {
      text: "",
      answers: ["", "", "", ""],
      correctIndex: 0,
    },
  ]);

  // Создать тест
  const createTest = async () => {
    if (!title.trim()) {
      alert("Введите название теста");
      return;
    }

    if (!selectedGroup) {
      alert("Выберите группу");
      return;
    }

    const payload = {
      title,
      group_id: Number(selectedGroup),
      questions: questions.map((q) => ({
        text: q.text,
        answers: q.answers.map((a, i) => ({
          text: a,
          is_correct: i === q.correctIndex,
        })),
      })),
    };

    try {
      const res = await axios.post(API_TEST_URL, payload, {
        headers: { "Content-Type": "application/json" },
      });

      console.log("Ответ сервера:", res.data);
      alert("Тест успешно создан!");
    } catch (err) {
      console.error("Ошибка при создании теста:", err);
      alert("Не удалось создать тест");
    }
  };

  // Загрузка групп
  useEffect(() => {
    setLoading(true);
    axios
      .get(API_GROUP_URL)
      .then((res) => {
        setGroups(res.data);
        setError("");
      })
      .catch((err) => {
        console.error("Ошибка загрузки групп:", err);
        setError("Не удалось загрузить группы");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Добавить вопрос
  const addQuestion = () => {
    setQuestions([
      ...questions,
      { text: "", answers: ["", "", "", ""], correctIndex: 0 },
    ]);
  };

  // Обновить вопрос
  const updateQuestion = (index, field, value) => {
    const updated = [...questions];
    updated[index][field] = value;
    setQuestions(updated);
  };

  // Обновить ответ
  const updateAnswer = (qIndex, aIndex, value) => {
    const updated = [...questions];
    updated[qIndex].answers[aIndex] = value;
    setQuestions(updated);
  };

  // Удалить вопрос
  const removeQuestion = (index) => {
    if (questions.length > 1) {
      setQuestions(questions.filter((_, i) => i !== index));
    }
  };

  // Интерфейс
  return (
    <div className="ct-container">
      <h1 className="ct-title">Создать тест</h1>

      {error && <div className="ct-error">{error}</div>}

      {/* Название теста */}
      <div className="ct-block">
        <label className="ct-label">Название теста</label>
        <input
          type="text"
          placeholder="Название теста"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="ct-input"
        />
      </div>

      {/* Выбор группы */}
      <div className="ct-block">
        <label className="ct-label">Группа</label>
        {loading ? (
          <div className="ct-loading">Загрузка групп...</div>
        ) : (
          <select
            value={selectedGroup}
            onChange={(e) => setSelectedGroup(e.target.value)}
            className="ct-input"
          >
            <option value="">Выберите группу</option>
            {groups.map((group) => (
              <option key={group.id} value={group.id}>
                {group.name}
              </option>
            ))}
          </select>
        )}
      </div>

      {/* Блок вопросов */}
      <h2 className="ct-subtitle">Вопросы</h2>

      {questions.map((q, qIndex) => (
        <div key={qIndex} className="ct-question">
          <div className="ct-question-header">
            <h3 className="ct-question-title">Вопрос {qIndex + 1}</h3>

            {questions.length > 1 && (
              <button
                onClick={() => removeQuestion(qIndex)}
                className="ct-remove-btn"
                type="button"
              >
                ✕ Удалить
              </button>
            )}
          </div>

          <input
            type="text"
            placeholder="Текст вопроса"
            value={q.text}
            onChange={(e) => updateQuestion(qIndex, "text", e.target.value)}
            className="ct-input mb"
          />

          <div className="ct-answers">
            {q.answers.map((a, aIndex) => (
              <div key={aIndex} className="ct-answer-row">
                <input
                  type="text"
                  placeholder={`Вариант ${aIndex + 1}`}
                  value={a}
                  onChange={(e) => updateAnswer(qIndex, aIndex, e.target.value)}
                  className="ct-input flex"
                />

                <label className="ct-radio-label">
                  <input
                    type="radio"
                    name={`correct-${qIndex}`}
                    checked={q.correctIndex === aIndex}
                    onChange={() =>
                      updateQuestion(qIndex, "correctIndex", aIndex)
                    }
                  />
                  <span className="ct-correct">Правильный</span>
                </label>
              </div>
            ))}
          </div>
        </div>
      ))}

      <button onClick={addQuestion} className="ct-btn green">
        + Добавить вопрос
      </button>

      <button onClick={createTest} className="ct-btn blue mt">
        Создать тест
      </button>
    </div>
  );
}
