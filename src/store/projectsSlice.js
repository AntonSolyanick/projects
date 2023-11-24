import { createSlice } from "@reduxjs/toolkit";

const projectsSlice = createSlice({
  name: "projects",
  initialState: [],
  reducers: {
    addNewProjectAction(state, action) {
      state.push({
        projectName: action.payload,
        queue: ["queue", "1", "2"],
        development: ["development", "aaa", "bbb"],
        done: ["done"],
      });
    },

    addNewTodoAction(state, action) {
      state.map((project) =>
        project.projectName === action.payload.projectName
          ? project.queue.push(action.payload.text)
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
      const indexOfCurTodo = project[curBoard].indexOf(action.payload.curTodo);
      const indexOfDropTodo = project[board].indexOf(action.payload.todo);

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
      const indexOfCurTodo = project[curBoard].indexOf(action.payload.curTodo);

      if (curBoard === board) {
        return;
      }

      project[curBoard].splice(indexOfCurTodo, 1);
      project[board].push(action.payload.curTodo);
    },
  },
});

export const projectsAction = projectsSlice.actions;
export default projectsSlice;
