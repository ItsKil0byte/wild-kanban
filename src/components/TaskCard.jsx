export default function TaskCard({ task, columnId, dispatch }) {
  return (
    <div
      className="task-card"
      draggable={true}
      onDragStart={(e) => {
        e.dataTransfer.setData(
          "text/plain",
          JSON.stringify({
            fromColumnId: columnId,
            taskId: task.id,
          })
        );
        e.dataTransfer.effectAllowed = "move";
      }}
    >
      <p className="task-title">{task.title}</p>
      {task.description && (
        <p className="task-description">{task.description}</p>
      )}

      <div className="task-actions">
        <button
          className="danger"
          onClick={() =>
            dispatch({
              type: "DELETE_TASK",
              payload: { columnId, taskId: task.id },
            })
          }
        >
          Удалить
        </button>
      </div>
    </div>
  );
}
