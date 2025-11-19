import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function TestPage() {
  const { id } = useParams();
  const [test, setTest] = useState(null);
  const [loading, setLoading] = useState(true);

  console.log("ID from params:", id);

  useEffect(() => {
    if (!id) return;
    axios.get(`http://127.0.0.1:8000/tests/api/tests/${id}`)
      .then(res => {
        setTest(res.data);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!test) return <div>Test not found</div>;

  return (
    <div>
      <h1>{test.title}</h1>

      <ul>
        {test.questions.map((q, i) => (
          <li key={i}>
            <strong>{q.text}</strong>
            <ul>
              {q.answers.map((a, j) => (
                <li key={j}>
                  {a.text} {a.is_correct ? "(correct)" : ""}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}