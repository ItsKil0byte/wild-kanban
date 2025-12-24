import { useState } from "react";

export default function NewColumnForm({ dispatch }) {
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="column">
      <div className="column-header">
        <h2 className="column-title">Добавить колонку</h2>
      </div>

      <div className="column-body">
        <form
          className="form"
          onSubmit={(e) => {
            e.preventDefault(); // Не перезагружаем страницу
            dispatch({ type: "ADD_COLUMN", payload: { title: inputValue } });
            setInputValue(""); // Очищаем поле ввода
          }}
        >
          <div className="form-actions">
            {/* Немного схитрил и засунул поле ввода внутрь блока с кнопками */}
            <input
              type="text"
              placeholder="Название колонки"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button
              className="primary"
              type="submit"
              disabled={!inputValue || inputValue.trim() === ""}
            >
              Добавить
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
