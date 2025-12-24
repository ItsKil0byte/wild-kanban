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
      tasks: [],
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
    case "ADD_COLUMN": {
      const column = {
        id: Date.now(), // TODO: Подумать над улучшение генерации ID
        title: action.payload.title,
        tasks: [],
      };

      return { ...state, columns: [...state.columns, column] };
    }
  }
}

export { reducer, initialState };
