import { createSlice } from "@reduxjs/toolkit";
import { PROJECT_GETALL_URL, responseHandler } from "../../utils/api_constants";
import APIServiceManager from "../../services/APIservicemanager";
const initialState = {
  loading: false,
  error: null,
  projectsList: null,
};
const api = new APIServiceManager();
const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    getProjectsRequest: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    getProjectsSuccess: (state, action) => {
      state.projectsGetAll = action.payload;
      state.loadingProjects = false;
    },
    getProjectsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

const { getProjectsRequest, getProjectsSuccess, getProjectsFailure } =
  projectSlice.actions;

  export const projectReducer = (state) => state.projects;

export const getAllProjectsAction = () => async (dispatch) => {
  try {
    dispatch(getProjectsRequest());
    await api
      .request("GET", PROJECT_GETALL_URL, null, {
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU2IiwibmJmIjoxNjgwNjM5NzE1LCJleHAiOjE2ODE1MDM3MTUsImlhdCI6MTY4MDYzOTcxNX0.y3UzWdIchnRh6spJrLA2_U3gU8WABjpsDTojTP4O9jE",
      })
      .then((res) => {
        const data = responseHandler(res);
        console.log("Project DATA", data);
        if (data) {
          dispatch(getProjectsSuccess(data));
        }
      })
      .catch((error) => {
        console.log("ERROR", error);
        dispatch(getProjectsFailure());
      });
  } catch (error) {
    dispatch(getProjectsFailure());
  }
};
export default projectSlice.reducer;
