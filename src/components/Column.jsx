import { useState } from "react";

import TaskCard from "./TaskCard";
import NewTaskForm from "./NewTaskForm.jsx";

export default function Column({ column, dispatch }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDrop = (e) => {
    e.preventDefault();
    const data = JSON.parse(e.dataTransfer.getData("text/plain"));

    if (data.fromColumnId === column.id) return;

    dispatch({
      type: "MOVE_TASK",
      payload: {
        fromColumnId: data.fromColumnId,
        toColumnId: column.id,
        taskId: data.taskId,
      },
    });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  return (
    <div className="column">
      <div className="column-header">
        <h2 className="column-title">{column.title}</h2>
        <button
          className="column-delete"
          onClick={() =>
            dispatch({
              type: "DELETE_COLUMN",
              payload: { columnId: column.id },
            })
          }
        >
          Удалить
        </button>
      </div>

      <div
        className="column-body"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {column.tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            columnId={column.id}
            dispatch={dispatch}
          />
        ))}
      </div>

      <div className="column-footer">
        <button className="primary" onClick={() => setIsModalOpen(true)}>
          + Добавить задачу
        </button>
      </div>

      {isModalOpen && (
        <div className="modal" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <NewTaskForm
              dispatch={dispatch}
              board={{ columns: [column] }}
              columnId={column.id}
              onClose={() => setIsModalOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
