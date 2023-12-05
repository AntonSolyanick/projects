import { configureStore } from "@reduxjs/toolkit";

import projectsSlice from "./projectsSlice";
import userSlice from "./userSlice";

const store = configureStore({
  reducer: {
    projects: projectsSlice.reducer,
    user: userSlice.reducer,
  },
});

export default store;
