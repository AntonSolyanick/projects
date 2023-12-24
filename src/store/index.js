import { configureStore } from "@reduxjs/toolkit";

import projectsSlice from "./projectsSlice";
import userSlice from "./userSlice";
import modalSlice from "./modalSlice";

const store = configureStore({
  reducer: {
    projects: projectsSlice.reducer,
    user: userSlice.reducer,
    modal: modalSlice.reducer,
  },
});

export default store;
