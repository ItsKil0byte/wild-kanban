import Column from "./Column";
import NewColumnForm from "./NewColumnForm";
import NewTaskForm from "./NewTaskForm";

export default function Board({ board, dispatch }) {
  return (
    <div className="board">
      {board.columns.map((column) => (
        <Column
          key={column.id}
          column={column}
          dispatch={dispatch}
          isFirst={column.id === 1}
          isLast={column.id === board.columns.length}
        />
      ))}
      <NewColumnForm dispatch={dispatch} />
    </div>
  );
}
