import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { STATUS } from "../../common/constants";
import { list } from "./projects.service.js";

const fetchProjects = createAsyncThunk(
  "projects/projectsFetched",
  ({ signal, limit }, { getState }) => {
    const { status } = getState().projects;
    if (status !== STATUS.loading) return;
    return list({ signal, limit });
  }
);

const initialState = {
  projects: [],
  status: STATUS.idle,
  error: null,
};

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    projectsReset(state) {
      state = initialState;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchProjects.pending, (state, action) => {
        if (state.status === STATUS.idle) {
          state.status = STATUS.loading;
        }
      })
      .addCase(fetchProjects.fulfilled, (state, { payload }) => {
        if (state.status === STATUS.loading) {
          state.status = STATUS.idle;
          state.projects = state.projects.concat(payload);
        }
      })
      .addCase(fetchProjects.rejected, (state, { error: { message } }) => {
        if (state.status === STATUS.loading) {
          state.status = STATUS.idle;
          state.error = message;
        }
      });
  },
});

const selectAllProjects = ({ projects: { projects } }) => projects;
const selectFetchProjectsStatus = ({ projects: { status } }) => status;
const { reducer: projectsReducer } = projectsSlice;
const { projectsReset } = projectsSlice.actions;

export {
  projectsReducer,
  projectsReset,
  fetchProjects,
  selectAllProjects,
  selectFetchProjectsStatus,
};
