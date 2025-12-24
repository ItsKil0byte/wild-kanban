/* 

Reducer:

1. Добавление Column.
2. Удаление Column.
3. Добавление Task.
4. Удаление Task.
5. Перемещение Task между Columns.

*/

const initialState = {
  columns: [
    {
      id: 1,
      title: "Запланировано",
      tasks: [
        {
          id: 1,
          title: "Создать макет",
          description: "Разработать макет для новой функции",
        },
      ],
    },
    {
      id: 2,
      title: "В процессе",
      tasks: [],
    },
  ],
};

function reducer(state, action) {
  switch (action.type) {
    // TODO: Подумать над улучшение генерации ID
    case "ADD_COLUMN": {
      const column = {
        id: Date.now(),
        title: action.payload.title,
        tasks: [],
      };

      return { ...state, columns: [...state.columns, column] };
    }
    case "ADD_TASK": {
      const { columnId, title, description } = action.payload;

      const task = { id: Date.now(), title, description };

      const updated = state.columns.map((column) => {
        if (column.id === columnId) {
          return { ...column, tasks: [...column.tasks, task] };
        }
        return column;
      });

      return { ...state, columns: updated };
    }
    case "DELETE_TASK": {
      const { columnId, taskId } = action.payload;

      const updated = state.columns.map((column) => {
        if (column.id === columnId) {
          return {
            ...column,
            tasks: column.tasks.filter((task) => task.id !== taskId),
          };
        }
        return column;
      });

      return { ...state, columns: updated };
    }
    case "DELETE_COLUMN": {
      const columnId = action.payload.columnId;

      const updated = state.columns.filter((column) => column.id !== columnId);

      return { ...state, columns: updated };
    }
    case "MOVE_TASK": {
      const { fromColumnId, toColumnId, taskId, toIndex, fromIndex } =
        action.payload;

      if (fromColumnId === toColumnId) {
        return {
          ...state,
          columns: state.columns.map((column) => {
            if (column.id === fromColumnId) {
              const tasks = [...column.tasks];
              if (
                fromIndex === toIndex ||
                fromIndex < 0 ||
                fromIndex >= tasks.length
              ) {
                return column;
              }

              const taskToMove = tasks[fromIndex];

              let adjustedToIndex = toIndex;
              if (fromIndex < toIndex) {
                adjustedToIndex = toIndex - 1;
              }

              tasks.splice(fromIndex, 1);
              tasks.splice(adjustedToIndex, 0, taskToMove);

              return { ...column, tasks };
            }
            return column;
          }),
        };
      }

      const updated = state.columns.map((column) => {
        if (column.id === fromColumnId) {
          return {
            ...column,
            tasks: column.tasks.filter((task) => task.id !== taskId),
          };
        } else if (column.id === toColumnId) {
          const tasks = [...column.tasks];

          tasks.splice(
            toIndex,
            0,
            state.columns
              .find((col) => col.id === fromColumnId)
              .tasks.find((task) => task.id === taskId)
          );

          return { ...column, tasks };
        }

        return column;
      });

      return { ...state, columns: updated };
    }
  }
}

export { reducer, initialState };
