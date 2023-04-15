import { createSlice } from "@reduxjs/toolkit";
import {
	PROJECT_GETALL_URL,
	UPDATE_PROJECT_URL,
	PROJECT_GETALL_SIMPLE,
	base_url,
	responseHandler,
	staticToken,
} from "../../utils/api_constants";
import APIServiceManager from "../../services/APIservicemanager";
const initialState = {
	loading: false,
	error: null,
	projectsList: null,
	createProjectData: null,
	projectsListSimple: null,
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
} = projectSlice.actions;

export const projectsListReducer = (state) => state?.projects?.projectsList;
export const loadingProject = (state) => state?.projects?.loading;
export const projectsListSimpleReducer = (state) =>
	state?.projects?.projectsListSimple;

export const getAllProjectsAction = () => async (dispatch) => {
	try {
		dispatch(getProjectsRequest());
		await api
			.request("GET", PROJECT_GETALL_URL, null, {
				Authorization: staticToken,
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

export const updateProjectAction = (projectData) => async (dispatch) => {
	try {
		dispatch(updateProjectRequest());
		await api
			.request("POST", UPDATE_PROJECT_URL, projectData, {
				Authorization: staticToken,
				"Content-Type": "multipart/form-data",
				Accept: "text/plain",
			})
			.then((res) => {
				// console.log("res", res);
				const data = responseHandler(res);
				// console.log("Project create response", data);
				if (data) {
					dispatch(updateProjectSuccess(data));
				}
				// return res
			})
			.catch((error) => {
				console.log("ERROR", error);
				dispatch(updateProjectFailure());
			});
	} catch (error) {
		dispatch(updateProjectFailure());
	}
};

export const getAllProjectsSimpleAction = () => async (dispatch) => {
	try {
		dispatch(getProjectsSimpleRequest());
		await api

			.request("GET", PROJECT_GETALL_SIMPLE, null, {
				Authorization: staticToken,
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

export default projectSlice.reducer;
