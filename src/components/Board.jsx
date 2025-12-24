import Column from "./Column";

export default function Board({ board, dispatch }) {
  return (
    <div>
      {board.columns.map((column) => (
        <Column key={column.id} column={column} />
      ))}
    </div>
  );
}
