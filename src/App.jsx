import { useReducer } from "react";
import { reducer, initialState } from "./reducer/boardReducer.js";

import "./App.css";
import Board from "./components/Board.jsx";

/*
Базовая структура:

Board -> Columns -> Массив Columns
Column -> Id, Title, Tasks -> Массив Tasks
Task -> Id, Title, Description

*/

export default function App() {
  const [board, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <h1>Wild Kanban!</h1>
      {/* <pre>{JSON.stringify(state, null, 2)}</pre> */}

      <Board board={board} dispatch={dispatch} />
    </>
  );
}
