import { configureStore } from "@reduxjs/toolkit";
import { projectsReducer } from "../features/projects/projects.slice";
import { projectReducer } from "../features/projects/project.slice";

export const store = configureStore({
  reducer: {
    projects: projectsReducer,
    project: projectReducer,
  },
});
