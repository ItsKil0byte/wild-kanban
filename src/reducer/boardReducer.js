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
    }
  ],
};

function reducer(state, action) {
  return state;
}

export { reducer, initialState };
