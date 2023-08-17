import { createSlice } from "@reduxjs/toolkit";
import {
	PROJECT_GETALL_URL,
	UPDATE_PROJECT_URL,
	PROJECT_GETALL_SIMPLE,
	base_url,
	responseHandler,
	PROJECT_FOR_MAPPING_URL,
	PROJECT_USER_LIST_URL,
} from "../../utils/api_constants";
import APIServiceManager from "../../services/APIservicemanager";
import axios from "axios";
const initialState = {
	loading: false,
	error: null,
	projectsList: null,
	createProjectData: null,
	projectsListSimple: null,
	projectsForMapping: null,
	projectListForLabour: null,
	selectedProject: null,
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
			state.projectsList = action.payload;
			state.loading = false;
		},
		getProjectsFailure: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
		updateProjectRequest: (state, action) => {
			state.loading = true;
			state.error = null;
		},
		updateProjectSuccess: (state, action) => {
			state.loading = false;
			state.createProjectData = action.payload;
		},
		updateProjectFailure: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
		getProjectsSimpleRequest: (state, action) => {
			state.loading = true;
			state.error = null;
		},
		getProjectsSimpleSuccess: (state, action) => {
			state.projectsListSimple = action.payload;
			state.loading = false;
		},
		getProjectsSimpleFailure: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
		getProjectsForMappingRequest: (state, action) => {
			state.loading = true;
			state.error = null;
		},
		getProjectsForMappingSuccess: (state, action) => {
			state.projectsForMapping = action.payload;
			state.loading = false;
		},
		getProjectsForMappingFailure: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
		getProjectForLabourRequest: (state, action) => {
			state.loading = true;
			state.error = null;
		},
		getProjectForLabourSuccess: (state, action) => {
			state.projectListForLabour = action.payload;
			state.loading = false;
		},
		getProjectForLabourFailure: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
		selectedProjectSuccess: (state, action) => {
			state.loading = false;
			state.selectedProject = action.payload;
		},
	},
});

const {
	getProjectsRequest,
	getProjectsSuccess,
	getProjectsFailure,
	updateProjectRequest,
	updateProjectSuccess,
	updateProjectFailure,
	getProjectsSimpleRequest,
	getProjectsSimpleSuccess,
	getProjectsSimpleFailure,
	getProjectsForMappingRequest,
	getProjectsForMappingSuccess,
	getProjectsForMappingFailure,
	getProjectForLabourRequest,
	getProjectForLabourSuccess,
	getProjectForLabourFailure,
	selectedProjectSuccess,
} = projectSlice.actions;

export const projectsListReducer = (state) => state?.projects?.projectsList;
export const loadingProject = (state) => state?.projects?.loading;
export const projectsListSimpleReducer = (state) =>
	state?.projects?.projectsListSimple;
export const projectsForMappingReducer = (state) =>
	state?.projects?.projectsForMapping;
export const projectsForLabourReducer = (state) =>
	state?.projects?.projectListForLabour;
export const selectedProjectReducer = (state) =>
	state?.projects?.selectedProject;

export const selectProjectAction = (data) => async (dispatch) => {
	dispatch(selectedProjectSuccess(data));
	// console.log("SELECTED PROJECT", data);
};

export const getAllProjectsAction = (token) => async (dispatch) => {
	try {
		dispatch(getProjectsRequest());
		await api
			.request("GET", PROJECT_GETALL_URL, null, {
				Authorization: token,
			})
			.then((res) => {
				const data = responseHandler(res);
				// console.log("Project DATA", data);
				if (data) {
					dispatch(getProjectsSuccess(data));
				}
				// return res
			})
			.catch((error) => {
				console.log("ERROR", error);
				dispatch(getProjectsFailure());
			});
	} catch (error) {
		dispatch(getProjectsFailure());
	}
};

export const updateProjectAction = (token, worker) => async (dispatch) => {
  dispatch(updateProjectRequest());
  try {
    const response = await axios.post(
      `${base_url}/dashboard/Project/addupdateproject`,
      worker,
      {
        headers: {
          Authorization: token,
          "Content-Type": "multipart/form-data",
          Accept: "text/plain",
        },
      }
    );

    if (response.status === 200) {
      dispatch(updateProjectSuccess(response.data));
    } else {
      dispatch(
        updateProjectFailure(
          "Something went wrong while creating/updaing project!"
        )
      );
    }
    return response;
  } catch (e) {
	console.log('PROJECT CREATE ERROR', e.response)
    dispatch(
      updateProjectFailure(
        "Something went wrong while creating/updaing project!"
      )
    );
    return e;
  }
};

export const getAllProjectsSimpleAction = (token) => async (dispatch) => {
	try {
		dispatch(getProjectsSimpleRequest());
		await api

			.request("GET", PROJECT_GETALL_SIMPLE, null, {
				Authorization: token,
			})
			.then((res) => {
				const data = responseHandler(res);
				// console.log("Project DATA Simple", data);
				if (data) {
					dispatch(getProjectsSimpleSuccess(data));
				}
				// return res
			})
			.catch((error) => {
				console.log("PROJECT ALL SIMPLE ERROR", error);
				dispatch(getProjectsSimpleFailure());
			});
	} catch (error) {
		dispatch(getProjectsSimpleFailure());
	}
};
export const getProjectsForMapping = (token) => async (dispatch) => {
	try {
		dispatch(getProjectsForMappingRequest());
		await api

			.request("GET", PROJECT_FOR_MAPPING_URL, null, {
				Authorization: token,
			})
			.then((res) => {
				const data = responseHandler(res);
				// console.log("Project MAPPING", data);
				if (data) {
					dispatch(getProjectsForMappingSuccess(data));
				}
				// return res
			})
			.catch((error) => {
				console.log("PROJECT FOR MAPPING ERROR", error);
				dispatch(getProjectsForMappingFailure());
			});
	} catch (error) {
		dispatch(getProjectsForMappingFailure());
	}
};
export const getProjectsForLabour = (token, projectId) => async (dispatch) => {
	try {
		dispatch(getProjectForLabourRequest());
		await api

			.request("POST", PROJECT_USER_LIST_URL + `?projectId=${projectId}`, null, {
				Authorization: token,
			})
			.then((res) => {
				const data = responseHandler(res);
				console.log("Project For LABOUR", data);
				if (data) {
					dispatch(getProjectForLabourSuccess(data));
				}
				// return res
			})
			.catch((error) => {
				console.log("PROJECT FOR LABOUR ERROR", error);
				dispatch(getProjectForLabourFailure());
			});
	} catch (error) {
		dispatch(getProjectForLabourFailure());
	}
};

export default projectSlice.reducer;
