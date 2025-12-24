import TaskCard from "./TaskCard.jsx";

export default function Column({ column }) {
  return (
    <div>
      <h2>{column.title}</h2>
      {column.tasks.map((task) => {
        return <TaskCard key={task.id} task={task} />;
      })}
    </div>
  );
}
