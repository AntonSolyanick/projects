import { createSlice } from "@reduxjs/toolkit";

const createDate = () => {
  const date = new Date();
  const formatedDate = `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`;
  const millisecondsDate = date.getTime();
  return {
    formatedDate,
    millisecondsDate,
  };
};

const projectsSlice = createSlice({
  name: "projects",
  initialState: [],
  reducers: {
    setProjectsFromDbAction(state, action) {
      const newState = Object.keys(action.payload).map((key, i) => {
        return { projectName: key, ...action.payload[key] };
      });
      return newState;
    },

    addNewProjectAction(state, action) {
      const date = createDate();
      state.push({
        projectName: action.payload,
        projectDate: date.formatedDate,
        milliseconds: date.millisecondsDate,
        queue: ["queue"],
        development: ["development"],
        done: ["done"],
      });
    },

    addNewTodoAction(state, action) {
      state.map((project) =>
        project.projectName === action.payload.projectName
          ? project.queue.push(action.payload.todo)
          : project.queue
      );
    },
    dropAction(state, action) {
      let indexOfProject = null;
      state.forEach((project, i) => {
        if (project.projectName === action.payload.projectName)
          indexOfProject = i;
      });

      const project = state[indexOfProject];
      const curBoard = action.payload.curBoard[0];
      const board = action.payload.board[0];
      const indexOfCurTodo = project[curBoard].findIndex((todo) => {
        if (typeof todo !== "string") {
          return todo.milliseconds === action.payload.curTodo.milliseconds;
        }
      });
      const indexOfDropTodo = project[board].findIndex((todo) => {
        if (typeof todo !== "string") {
          return todo.milliseconds === action.payload.todo.milliseconds;
        }
      });

      if (indexOfCurTodo <= indexOfDropTodo) {
        project[board].splice(indexOfDropTodo + 1, 0, action.payload.curTodo);
        project[curBoard].splice(indexOfCurTodo, 1);
      }
      if (indexOfCurTodo > indexOfDropTodo) {
        project[curBoard].splice(indexOfCurTodo, 1);
        project[board].splice(indexOfDropTodo + 1, 0, action.payload.curTodo);
      }
    },

    dropOnBoardAction(state, action) {
      let indexOfProject = null;
      state.forEach((project, i) => {
        if (project.projectName === action.payload.projectName)
          indexOfProject = i;
      });

      const project = state[indexOfProject];
      const curBoard = action.payload.curBoard[0];
      const board = action.payload.board[0];
      const indexOfCurTodo = project[curBoard].findIndex((todo) => {
        if (typeof todo !== "string") {
          return todo.milliseconds === action.payload.curTodo.milliseconds;
        }
      });

      if (curBoard === board) {
        return;
      }

      project[curBoard].splice(indexOfCurTodo, 1);
      project[board].push(action.payload.curTodo);
    },

    deleteProjectAction(state, action) {
      return state.filter((project) => project.projectName !== action.payload);
    },

    deleteTodoAction(state, action) {
      state.map((project) =>
        project.projectName === action.payload.projectName
          ? project[action.payload.titleColumn].splice(
              project[action.payload.titleColumn].indexOf(
                action.payload.todoText
              ),
              1
            )
          : project
      );
    },
  },
});

export const projectsAction = projectsSlice.actions;
export default projectsSlice;
