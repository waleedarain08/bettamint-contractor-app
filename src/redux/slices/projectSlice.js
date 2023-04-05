import { createSlice } from "@reduxjs/toolkit";
import {
	PROJECT_GETALL_URL,
	responseHandler,
	staticToken,
} from "../../utils/api_constants";
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
			state.projectsList = action.payload;
			state.loadingProjects = false;
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
			state.error = null;
		},
		updateProjectFailure: (state, action) => {
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
} = projectSlice.actions;

export const projectsListReducer = (state) => state?.projectSlice?.projectsList;

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
			})
			.then((res) => {
				const data = responseHandler(res);
				console.log("Project create response", data);
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
export default projectSlice.reducer;
