import { useReducer } from "react";
import { reducer, initialState } from "./reducer/boardReducer.js";

import "./App.css";

/*
Базовая структура:

Board -> Columns -> Массив Columns
Column -> Id, Title, Tasks -> Массив Tasks
Task -> Id, Title, Description

*/

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <h1>Wild Kanban!</h1>
      <pre>{JSON.stringify(state, null, 2)}</pre>
    </>
  );
}
