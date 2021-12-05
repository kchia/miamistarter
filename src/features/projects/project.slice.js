import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { STATUS } from "../../common/constants";
import { read } from "./projects.service.js";

const fetchProject = createAsyncThunk(
  "project/projectFetched",
  ({ id, signal }, { getState }) => {
    const { status } = getState().project;
    if (status !== STATUS.loading) return;
    return read({ id, signal });
  }
);

const initialState = {
  project: {
    logo: "",
    images: [],
    title: "",
    tagline: "",
    description: "",
    slug: "",
    fundingGoal: 0,
    fundingRaised: 0,
    votes: [],
    voteCount: 0,
    perks: [],
    labels: [],
    solutionDescription: [],
    problemDescription: [],
    businessModelDescription: [],
    businessModelCharts: [],
    marketDescription: [],
    marketReports: [],
    team: [],
    websiteUrl: "",
    twitterUrl: "",
    whitepapers: [],
  },
  status: STATUS.idle,
  error: null,
};

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    projectReset(state) {
      state = initialState;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchProject.pending, (state, action) => {
        if (state.status === STATUS.idle) {
          state.status = STATUS.loading;
        }
      })
      .addCase(fetchProject.fulfilled, (state, { payload }) => {
        if (state.status === STATUS.loading) {
          state.status = STATUS.idle;
          state.project = payload;
        }
      })
      .addCase(fetchProject.rejected, (state, { error: { message } }) => {
        if (state.status === STATUS.loading) {
          state.status = STATUS.idle;
          state.error = message;
        }
      });
  },
});

const selectProject = ({ project: { project } }) => project;
const selectFetchProjectStatus = ({ project: { status } }) => status;
const { reducer: projectReducer } = projectSlice;
const { projectReset } = projectSlice.actions;

export {
  projectReducer,
  projectReset,
  fetchProject,
  selectProject,
  selectFetchProjectStatus,
};
