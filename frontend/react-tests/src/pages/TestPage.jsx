import { useParams } from "react-router-dom";

export default function TestPage() {
  const { id } = useParams();

  return (
    <div className="form-page">
      <h2>Тест №{id}</h2>
      <p>Здесь будет содержимое теста (в разработке).</p>
    </div>
  );
}