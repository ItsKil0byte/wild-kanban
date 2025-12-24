import { useState } from "react";

export default function NewTaskForm({ dispatch, board }) {
  const [formData, setFormData] = useState({
    columnId: 0,
    title: "",
    description: "",
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        dispatch({
          type: "ADD_TASK",
          payload: {
            ...formData,
            id: Date.now(),
          },
        });
        setFormData({
          columnId: 0,
          title: "",
          description: "",
        });
      }}
    >
      <select
        name="columnId"
        value={formData.columnId}
        onChange={(e) => {
          setFormData((prev) => ({
            ...prev,
            columnId: Number(e.target.value),
          }));
        }}
      >
        <option value={0}>Выберите колонку</option>
        {board.columns.map((column) => (
          <option key={column.id} value={column.id}>
            {column.title}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Название задачи"
        value={formData.title}
        onChange={(e) => {
          setFormData((prev) => ({
            ...prev,
            title: e.target.value,
          }));
        }}
      />
      <input
        type="text"
        placeholder="Описание задачи"
        value={formData.description}
        onChange={(e) => {
          setFormData((prev) => ({
            ...prev,
            description: e.target.value,
          }));
        }}
      />
      <button
        type="submit"
        disabled={
          !formData.title || !formData.columnId || formData.title.trim() === ""
        }
      >
        Добавить задачу
      </button>
    </form>
  );
}
