const initialBoard = {
  columns: [
    {
      id: 1,
      title: "To Do",
      tasks: [
        { id: 1, title: "Задача 1", description: "Описание задачи 1" },
        { id: 2, title: "Задача 2", description: "Описание задачи 2" },
      ],
    },
    {
      id: 2,
      title: "In Progress",
      tasks: [{ id: 3, title: "Задача 3", description: "Описание задачи 3" }],
    },
    {
      id: 3,
      title: "Done",
      tasks: [],
    },
  ],
};

const updateColumn = (columns, columnId, updateFn) => {
  return columns.map((c) => {
    if (c.id === columnId) {
      return { ...c, ...updateFn(c) };
    }
    return c;
  });
};

const findTask = (columns, taskId) => {
  for (const column of columns) {
    const task = column.tasks.find((t) => t.id === taskId);
    if (task) {
      return { task, columnId: column.id };
    }
  }
  return null;
};

function reducer(state = initialBoard, action) {
  switch (action.type) {
    case "ADD_COLUMN": {
      const column = {
        id: Date.now(),
        title: action.payload.title,
        tasks: [],
      };

      return { ...state, columns: [...state.columns, column] };
    }
    case "DELETE_COLUMN": {
      const columnId = action.payload.columnId;

      const updated = state.columns.filter((c) => c.id !== columnId);

      return { ...state, columns: updated };
    }
    case "ADD_TASK": {
      const { columnId, title, description } = action.payload;

      const task = { id: Date.now(), title, description };

      const updated = updateColumn(state.columns, columnId, (c) => ({
        tasks: [...c.tasks, task],
      }));

      return { ...state, columns: updated };
    }
    case "DELETE_TASK": {
      const { columnId, taskId } = action.payload;

      const updated = updateColumn(state.columns, columnId, (c) => ({
        tasks: c.tasks.filter((t) => t.id !== taskId),
      }));

      return { ...state, columns: updated };
    }
    case "MOVE_TASK": {
      const { fromColumnId, toColumnId, taskId } = action.payload;

      const taskData = findTask(state.columns, taskId);

      if (!taskData) {
        return state;
      }

      const { task } = taskData;

      const updated = updateColumn(state.columns, fromColumnId, (c) => ({
        tasks: c.tasks.filter((t) => t.id !== taskId),
      }));

      const finaled = updateColumn(updated, toColumnId, (c) => ({
        tasks: [...c.tasks, task],
      }));

      return { ...state, columns: finaled };
    }
    default:
      return state;
  }
}

export { reducer, initialBoard };
