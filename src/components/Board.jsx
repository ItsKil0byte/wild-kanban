import Column from "./Column";

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
    </div>
  );
}
