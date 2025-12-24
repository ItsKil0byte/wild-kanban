export default function TaskCard({
  task,
  columnId,
  dispatch,
  isFirst,
  isLast,
}) {
  return (
    <div>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      {isFirst ? null : (
        <button
          onClick={() =>
            dispatch({
              type: "MOVE_TASK",
              payload: {
                fromColumnId: columnId,
                toColumnId: columnId - 1,
                taskId: task.id,
                toIndex: 0,
              },
            })
          }
        >
          ⬅️
        </button>
      )}
      {isLast ? null : (
        <button
          onClick={() =>
            dispatch({
              type: "MOVE_TASK",
              payload: {
                fromColumnId: columnId,
                toColumnId: columnId + 1,
                taskId: task.id,
                toIndex: 0,
              },
            })
          }
        >
          ➡️
        </button>
      )}
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
