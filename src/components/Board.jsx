export default function Board({ board, dispatch }) {
  return (
    <div>
      {board.columns.map((column) => (
        <div key={column.id}>
          {column.title} - {column.tasks.length}
        </div>
      ))}
    </div>
  );
}
