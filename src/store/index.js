import { createStore } from "redux";

const initialState = [];
let counter = 1;

const ADD_NEW_PROJECT = "ADD_NEW_PROJECT";
const ADD_NEW_TODO = "ADD_NEW_TODO";
const DROP_ACTION = "DROP_ACTION";

const reducer = (state = initialState, action) => {
  const newState = [...state];
  switch (action.type) {
    case ADD_NEW_PROJECT:
      let isProjectExist = false;

      state.forEach((project) => {
        if (project.name === action.payload) {
          isProjectExist = !isProjectExist;
        }
      });
      return isProjectExist
        ? state
        : [
            ...state,
            {
              name: action.payload,
              categories: {
                queue: { title: "Queue", todos: [] },
                development: { title: "Development", todos: [] },
                done: { title: "Done", todos: [] },
              },
            },
          ];

    case ADD_NEW_TODO:
      counter++;

      newState.map((project) =>
        project.name === action.payload.projectName
          ? {
              ...project,
              categories: {
                ...project.categories,
                queue: {
                  title: "Queue",
                  todos: project.categories.queue.todos.push({
                    text: action.payload.text,
                    order: counter,
                  }),
                },
              },
            }
          : { ...project }
      );
      return [...newState];

    case DROP_ACTION:
      
        newState.map((project) =>
          project.name === action.payload.projectName
            ? project.categories.queue.todos.map((todo) => {
                if (action.payload.todo.text === todo.text)
                  return {...project, categories: {...project.categories, queue : {...project.categories.queue, project.categories.queue.todos.todo : {...todo, order: action.payload.curTodo.order}}}  };
                if (action.payload.curTodo.text === todo.text)
                  return { ...todo, order: action.payload.curTodo.order };
                else return { ...todo };
              })
            : { ...project }
        );
        // console.log(action.payload.todo.order, action.payload.todo.text);
        // console.log(action.payload.curTodo.order, action.payload.curTodo.text);
        // console.log(newState[0].categories.queue.todos);
      
      return [...newState];

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

export const dropAction = (payload) => ({
  type: DROP_ACTION,
  payload: payload,
});
