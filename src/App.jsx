import { useReducer, useEffect } from "react";
import { reducer, initialBoard } from "./reducer/boardReducer.js";

import Board from "./components/Board.jsx";

const STORAGE_KEY = "board";

export default function App() {
  const initBoard = () => {
    const savedBoard = localStorage.getItem(STORAGE_KEY);

    if (savedBoard) {
      try {
        const parsed = JSON.parse(savedBoard);
        if (parsed && Array.isArray(parsed.columns)) {
          return { initialBoard, ...parsed };
        }
      } catch (e) {
        console.error("Ошибка при парсинге сохранённой доски:", e);
      }
    }

    return initialBoard;
  };

  const [board, dispatch] = useReducer(reducer, undefined, initBoard);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(board));
  }, [board]);

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">Дикий Ка(н)бан!</h1>
      </header>

      <Board board={board} dispatch={dispatch} />

      <footer className="app-footer">
        &copy; 2025. Все права защищены бла бла бла.
      </footer>
    </div>
  );
}
