import { useState, useEffect } from "react";

const initFormData = (columnId) => ({
  columnId: columnId || 0,
  title: "",
  description: "",
});

export default function NewTaskForm({ dispatch, columnId, onClose }) {
  const [formData, setFormData] = useState(initFormData(columnId));

  useEffect(() => {
    if (columnId) {
      setFormData((prev) => ({
        ...prev,
        columnId: columnId,
      }));
    }
  }, [columnId]);

  const handleInputChange = (field) => (e) => {
    const value = e.target.value;
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

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

    setFormData(initFormData(columnId));

    if (onClose) onClose();
  };

  const isDisabled = !formData.title.trim() || !formData.columnId;

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Название задачи"
        value={formData.title}
        onChange={handleInputChange("title")}
      />

      <input
        type="text"
        placeholder="Описание задачи"
        value={formData.description}
        onChange={handleInputChange("description")}
      />

      <div className="form-actions">
        <button className="primary" type="submit" disabled={isDisabled}>
          Добавить
        </button>
        <button type="button" onClick={onClose}>
          Отмена
        </button>
      </div>
    </form>
  );
}
