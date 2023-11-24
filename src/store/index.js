import { configureStore } from "@reduxjs/toolkit";

import projectsSlice from "./projectsSlice";
import userSlice from "./userSlice";

// const ADD_NEW_TODO = "ADD_NEW_TODO";
// const DROP_ACTION = "DROP_ACTION";

const store = configureStore({
  reducer: {
    projects: projectsSlice.reducer,
    user: userSlice.reducer,
  },
});

// export const addNewTodoAction = (payload) => ({
//   type: ADD_NEW_TODO,
//   payload: payload,
// });

// export const dropAction = (payload) => ({
//   type: DROP_ACTION,
//   payload: payload,
// });

export default store;
