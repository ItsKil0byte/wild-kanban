import { useReducer } from "react";

import "./App.css";

/*
Базовая структура:

Board -> Columns -> Массив Columns
Column -> Id, Title, Tasks -> Массив Tasks
Task -> Id, Title, Description

Reducer:

1. Добавление Column.
2. Удаление Column.
3. Добавление Task.
4. Удаление Task.
5. Перемещение Task между Columns.

*/

// TODO: Перенести в отедльный файл.
const initialState = {
  columns: [
    {
      id: 1,
      title: "Запланировано",
      tasks: [],
    },
  ],
};

function reducer(state, action) {
  return state;
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <h1>Wild Kanban!</h1>
      <pre>{JSON.stringify(state, null, 2)}</pre>
    </>
  );
}
