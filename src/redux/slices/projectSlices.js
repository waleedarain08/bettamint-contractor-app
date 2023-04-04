import { createSlice } from "@reduxjs/toolkit";
import { PROJECT_GETALL_URL, responseHandler } from "../../utils/api_constants";
import APIServiceManager from "../../services/APIservicemanager";
const initialState = {
	projectsGetAll: null,
	loadingProjects: false,
};
const api = new APIServiceManager();
const projectSlice = createSlice({
	name: "project",
	initialState,
	reducers: {
		getProjectsRequest: (state, action) => {
			state.projectsGetAll = null;
			state.loadingProjects = true;
		},
		getProjectsSuccess: (state, action) => {
			state.projectsGetAll = action.payload;
			state.loadingProjects = false;
		},
		getProjectsFailure: (state, action) => {
			state.projectsGetAll = null;
			state.loadingProjects = false;
		},
	},
});

const { getProjectsRequest, getProjectsSuccess, getProjectsFailure } =
	projectSlice.actions;

// export const getAllProjectsAction = () => async (dispatch) => {
// 	dispatch(getProjectsRequest());
// 	try {
// 		const response = await new APIServiceManager().request(
// 			"GET",
// 			PROJECT_GETALL_URL,
// 			null,
// 			null,
// 			{
// 				Authorization:
// 					"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU2IiwibmJmIjoxNjgwNjM5NzE1LCJleHAiOjE2ODE1MDM3MTUsImlhdCI6MTY4MDYzOTcxNX0.y3UzWdIchnRh6spJrLA2_U3gU8WABjpsDTojTP4O9jE",
// 			}
// 		);
// 		const data = responseHandle(response);
// 		console.log("Projects DATA", data);
// 		if (data) {
// 			dispatch(getProjectsSuccess(data));
// 		}
// 	} catch (error) {
// 		dispatch(getProjectsFailure());
// 		console.log("ERROR", error);
// 	}
// };
export const getAllProjectsAction = () => async (dispatch) => {
	try {
		dispatch(getProjectsRequest());
		await api
			.request("GET", PROJECT_GETALL_URL, null, null, {
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
