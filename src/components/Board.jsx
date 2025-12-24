import Column from "./Column";
import NewColumnForm from "./NewColumnForm";

export default function Board({ board, dispatch }) {
  return (
    <div className="board">
      {board.columns.map((column) => (
        <Column key={column.id} column={column} dispatch={dispatch} />
      ))}
      <NewColumnForm dispatch={dispatch} />
    </div>
  );
}
