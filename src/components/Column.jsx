import TaskCard from "./TaskCard.jsx";

export default function Column({ column, dispatch, isFirst, isLast }) {
  const handleDrop = (e) => {
    e.preventDefault();
    const data = JSON.parse(e.dataTransfer.getData("text/plain"));

    dispatch({
      type: "MOVE_TASK",
      payload: {
        fromColumnId: data.fromColumnId,
        toColumnId: column.id,
        taskId: data.taskId,
        fromIndex: data.fromIndex,
        toIndex: column.tasks.length,
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
      {column.tasks.map((task, index) => {
        return (
          <TaskCard
            key={task.id}
            columnId={column.id}
            task={task}
            dispatch={dispatch}
            isFirst={isFirst}
            isLast={isLast}
            index={index}
          />
        );
      })}
    </div>
  );
}
