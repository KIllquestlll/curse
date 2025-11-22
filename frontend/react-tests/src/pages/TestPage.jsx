import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import '../styles/TestPage.css';

export default function TestPage() {
  const { id } = useParams();
  const [test, setTest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [userAnswers, setUserAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const API_GET_URL = `http://127.0.0.1:8000/tests/api/tests/${id}`;
  const API_POST_URL = 'http://127.0.0.1:8000/tests/api/tests/results';

  useEffect(() => {
    axios.get(API_GET_URL)
      .then(res => setTest(res.data))
      .catch(() => setError("Тест не найден"))
      .finally(() => setLoading(false));
  }, [id]);

  const sendResultToBackend = async (finalScore) => {
    try {
      const token = localStorage.getItem("token"); 
      if (!token) throw new Error("Токен не найден");

      await axios.post(
        API_POST_URL,
        {
          test_id: test.id,
          user_answers: userAnswers,
          score: finalScore
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      console.log("Результат сохранен");
    } catch (err) {
      console.error("Ошибка отправки результата", err);
      alert("Не удалось сохранить результат");
    }
  };

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>{error}</div>;

  const handleRadioChange = (qIndex, aIndex) => {
    setUserAnswers(prev => ({
      ...prev,
      [qIndex]: [aIndex]
    }));
  };

  const handleSubmit = async () => {
    let correctCount = 0;

    test.questions.forEach((q, qIndex) => {
      const selected = userAnswers[qIndex] || [];
      const correctIndex = q.answers.findIndex(a => a.is_correct);
      if (selected[0] === correctIndex) correctCount++;
    });

    setScore(correctCount);
    setShowResult(true);

    await sendResultToBackend(correctCount);
  };

  return (
    <div className="testpage-container">
      <h1>{test.title}</h1>
      <ul className="questions-list">
        {test.questions.map((q, qIndex) => (
          <li key={qIndex} className="question-item">
            <strong>{q.text}</strong>
            <ul className="answers-list">
              {q.answers.map((a, aIndex) => {
                const isSelected = userAnswers[qIndex]?.includes(aIndex) || false;
                const correctIndex = q.answers.findIndex(x => x.is_correct);
                const isCorrect = showResult && aIndex === correctIndex;
                const isWrong = showResult && isSelected && aIndex !== correctIndex;

                return (
                  <li
                    key={aIndex}
                    className={`answer-item ${isCorrect ? "correct" : ""} ${isWrong ? "wrong" : ""}`}
                  >
                    <label>
                      <input
                        type="radio"
                        name={`question-${qIndex}`}
                        checked={isSelected}
                        disabled={showResult}
                        onChange={() => handleRadioChange(qIndex, aIndex)}
                      />
                      {a.text}
                    </label>
                  </li>
                );
              })}
            </ul>
          </li>
        ))}
      </ul>

      {!showResult && (
        <button className="submit-btn" onClick={handleSubmit}>
          Завершить тест
        </button>
      )}

      {showResult && (
        <div className="result">
          Правильных ответов: {score} из {test.questions.length}
        </div>
      )}
    </div>
  );
}
