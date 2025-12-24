export default function Column({ column }) {
  return (
    <div>
      <h2>{column.title}</h2>
      <p>Кол-во задач: {column.tasks.length}</p>
    </div>
  );
}
