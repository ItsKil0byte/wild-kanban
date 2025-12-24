import { useState } from "react";

export default function NewColumnForm({ dispatch }) {
  const [inputValue, setInputValue] = useState("");

  return (
    <form
      className="form"
      onSubmit={(e) => {
        e.preventDefault(); // Не перезагружаем страницу
        dispatch({ type: "ADD_COLUMN", payload: { title: inputValue } });
        setInputValue(""); // Очищаем поле ввода
      }}
    >
      <input
        type="text"
        placeholder="Название колонки"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button className="primary" type="submit" disabled={!inputValue || inputValue.trim() === ""}>
        Добавить колонку
      </button>
    </form>
  );
}
