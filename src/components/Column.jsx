import { useState } from "react";
import TaskCard from "./TaskCard";
import NewTaskForm from "./NewTaskForm";

export default function Column({ column, dispatch }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);

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
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  return (
    <div
      className={`column ${isDragOver ? "drag-over" : ""}`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      <div className="column-header">
        <h2 className="column-title">{column.title}</h2>
      </div>

      <div className="column-body">
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
        <button className="add-task" onClick={() => setIsModalOpen(true)}>
          Новая задача
        </button>
        <button
          className="danger"
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
