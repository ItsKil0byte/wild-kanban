import { useReducer, useEffect } from "react";
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
  const savedBoard = localStorage.getItem("board");
  if (savedBoard) {
    try {
      const parsed = JSON.parse(savedBoard);
      if (parsed && Array.isArray(parsed.columns)) {
        initialState.columns = parsed.columns;
      }
    } catch (e) {
      console.error("Ошибка при парсинге сохранённой доски:", e);
    }
  }

  const [board, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    localStorage.setItem("board", JSON.stringify(board));
  }, [board]);

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">Дикий Ка(н)бан!</h1>
      </header>

      <Board board={board} dispatch={dispatch} />
    </div>
  );
}
