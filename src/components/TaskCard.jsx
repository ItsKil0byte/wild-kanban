export default function TaskCard({ task, columnId, dispatch }) {
  return (
    <div
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
      <h3>{task.title}</h3>
      <p>{task.description}</p>

      <button
        onClick={() =>
          dispatch({
            type: "DELETE_TASK",
            payload: { columnId, taskId: task.id },
          })
        }
      >
        🗑️
      </button>
    </div>
  );
}
