import { createStore } from "redux";

const initialState = {};

const ADD_NEW_PROJECT = "ADD_NEW_PROJECT";
const ADD_NEW_TODO = "ADD_NEW_TODO";

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_NEW_PROJECT:
      const projecct = action.payload;
      // let isProjectExist = false;
      // console.log(state);
      // for (let key of Object.keys(state)) {
      //   if (key === action.payload) {
      //     isProjectExist = !isProjectExist;
      //   }
      // }

      // return isProjectExist
      //   ? state
      //   : (state[projecct] = { name: action.payload, todos: [] });
      return (state["sa"] = { name: projecct, todos: [] });

    case ADD_NEW_TODO:
      const project = state.filter((project) => {
        return project.name === action.payload.projectName;
      })[0]; // selected projecct to add a TODO
      const indexOfProject = state.indexOf(project);
      state[indexOfProject].todos.push(action.payload.todoText);
      //сделать стэйт объектом
      return [...state];

    default:
      return state;
  }
};

export const store = createStore(reducer);

export const addNewProjectAction = (payload) => ({
  type: ADD_NEW_PROJECT,
  payload: payload,
});

export const addNewTodoAction = (payload) => ({
  type: ADD_NEW_TODO,
  payload: payload,
});
