export default function TaskCard({ task, columnId, dispatch }) {
  const handleDragStart = (e) => {
    e.dataTransfer.setData(
      "text/plain",
      JSON.stringify({
        fromColumnId: columnId,
        taskId: task.id,
      })
    );
    e.dataTransfer.effectAllowed = "move";

    e.target.classList.add("dragging");
  };

  const handleDragEnd = (e) => {
    e.target.classList.remove("dragging");
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
        <button
          onClick={() =>
            dispatch({
              type: "DELETE_TASK",
              payload: { columnId, taskId: task.id },
            })
          }
          className="danger"
        >
          🗑️
        </button>
      </div>
    </div>
  );
}
