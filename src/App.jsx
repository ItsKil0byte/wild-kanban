import { useReducer, useEffect } from "react";
import { reducer, initialState } from "./reducer/boardReducer.js";

import "./App.css";
import Board from "./components/Board.jsx";
import NewColumnForm from "./components/NewColumnForm.jsx";
import NewTaskForm from "./components/NewTaskForm.jsx";

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
    <>
      <h1>Wild Kanban!</h1>
      {/* <pre>{JSON.stringify(state, null, 2)}</pre> */}

      <Board board={board} dispatch={dispatch} />
      {/* <button onClick={addColumn}>Добавить колонку</button> */}

      <NewColumnForm dispatch={dispatch} />
      <NewTaskForm dispatch={dispatch} board={board} />

      <button
        onClick={() =>
          dispatch({
            type: "MOVE_TASK",
            payload: { fromColumnId: 1, toColumnId: 2, taskId: 1, toIndex: 0 },
          })
        }
      >
        Переместить задачу
      </button>
    </>
  );
}
