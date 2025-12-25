import { useState, useEffect } from "react";

export default function NewTaskForm({ dispatch, columnId, onClose }) {
  const [formData, setFormData] = useState({
    columnId: columnId || 0,
    title: "",
    description: "",
  });

  useEffect(() => {
    if (columnId) {
      setFormData((prev) => ({
        ...prev,
        columnId: columnId,
      }));
    }
  }, [columnId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.columnId) return;

    dispatch({
      type: "ADD_TASK",
      payload: {
        ...formData,
        id: Date.now(),
      },
    });

    setFormData({
      columnId: columnId || 0,
      title: "",
      description: "",
    });

    if (onClose) onClose();
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
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

      <div className="form-actions">
        <button
          className="primary"
          type="submit"
          disabled={
            !formData.title ||
            !formData.columnId ||
            formData.title.trim() === ""
          }
        >
          Добавить
        </button>
        <button type="button" onClick={onClose}>
          Отмена
        </button>
      </div>
    </form>
  );
}
