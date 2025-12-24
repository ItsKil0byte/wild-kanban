import TaskCard from "./TaskCard.jsx";

export default function Column({ column, dispatch }) {
  return (
    <div>
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
          />
        );
      })}
    </div>
  );
}
