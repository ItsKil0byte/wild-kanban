import TaskCard from "./TaskCard";

export default function Column({ column, dispatch }) {
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
    <div onDrop={handleDrop} onDragOver={handleDragOver}>
      <h2>{column.title}</h2>

      <button
        onClick={() =>
          dispatch({ type: "DELETE_COLUMN", payload: { columnId: column.id } })
        }
      >
        🗑️
      </button>

      {column.tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          columnId={column.id}
          dispatch={dispatch}
        />
      ))}
    </div>
  );
}
