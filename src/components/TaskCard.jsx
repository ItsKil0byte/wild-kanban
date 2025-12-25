export default function TaskCard({ task, columnId, dispatch }) {
  const handleDragStart = (e) => {
    const data = JSON.stringify({
      fromColumnId: columnId,
      taskId: task.id,
    });

    e.dataTransfer.setData("text/plain", data);
    e.dataTransfer.effectAllowed = "move";

    e.target.classList.add("dragging");
  };

  const handleDragEnd = (e) => {
    e.target.classList.remove("dragging");
  };

  const handleDeletion = () => {
    dispatch({
      type: "DELETE_TASK",
      payload: { columnId, taskId: task.id },
    });
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      className="task-card"
    >
      <h3 className="task-title">{task.title}</h3>
      <p className="task-description">{task.description}</p>

      <div className="task-actions">
        <button onClick={handleDeletion} className="danger">
          Удалить
        </button>
      </div>
    </div>
  );
}
