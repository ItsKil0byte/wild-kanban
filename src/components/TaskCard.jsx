export default function TaskCard({ task, columnId, dispatch }) {
  return (
    <div>
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
