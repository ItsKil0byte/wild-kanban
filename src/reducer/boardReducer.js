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
        }
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
  }
}

export { reducer, initialState };
