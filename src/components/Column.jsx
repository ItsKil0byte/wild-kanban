import TaskCard from "./TaskCard.jsx";

export default function Column({ column, dispatch, isFirst, isLast }) {
  return (
    <div
      onDrop={(e) => {
        const data = JSON.parse(e.dataTransfer.getData("text/plain"));
        dispatch({
          type: "MOVE_TASK",
          payload: {
            fromColumnId: data.fromColumnId,
            toColumnId: column.id,
            taskId: data.taskId,
            toIndex: column.tasks.length,
          },
        });
      }}
      onDragOver={(e) => {
        e.preventDefault();
      }}
    >
      <h2>{column.title}</h2>
      <button
        onClick={() =>
          dispatch({ type: "DELETE_COLUMN", payload: { columnId: column.id } })
        }
      >
        🗑️
      </button>
      {column.tasks.map((task) => {
        return (
          <TaskCard
            key={task.id}
            columnId={column.id}
            task={task}
            dispatch={dispatch}
            isFirst={isFirst}
            isLast={isLast}
          />
        );
      })}
    </div>
  );
}
