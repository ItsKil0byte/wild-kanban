export default function TaskCard({
  task,
  columnId,
  dispatch,
  index,
  isFirst,
  isLast,
}) {
  return (
    <div
      draggable={true}
      onDragStart={(e) => {
        e.dataTransfer.setData(
          "text/plain",
          JSON.stringify({
            fromColumnId: columnId,
            fromIndex: index,
            taskId: task.id,
          })
        );
        e.dataTransfer.effectAllowed = "move";
      }}
    >
      <h3>{task.title}</h3>
      <p>{task.description}</p>

      <div>
        {!isFirst && (
          <button
            onClick={() =>
              dispatch({
                type: "MOVE_TASK",
                payload: {
                  fromColumnId: columnId,
                  toColumnId: columnId - 1,
                  taskId: task.id,
                  toIndex: 0,
                  fromIndex: index,
                },
              })
            }
          >
            ⬅️
          </button>
        )}

        {!isLast && (
          <button
            onClick={() =>
              dispatch({
                type: "MOVE_TASK",
                payload: {
                  fromColumnId: columnId,
                  toColumnId: columnId + 1,
                  taskId: task.id,
                  toIndex: 0,
                  fromIndex: index,
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
    </div>
  );
}
