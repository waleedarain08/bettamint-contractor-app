import { createSlice } from "@reduxjs/toolkit";
import { JOB_GETALL_URL, responseHandler } from "../../utils/api_constants";
import APIServiceManager from "../../services/APIservicemanager";

const initialState = {
	loading: false,
	error: null,
	jobsList: null,
};

const api = new APIServiceManager();
const jobSlice = createSlice({
	name: "jobs",
	initialState,
	reducers: {
		getJobRequest: (state, action) => {
			state.loading = true;
			state.error = null;
		},
		getJobSuccess: (state, action) => {
			state.jobsList = action.payload;
			state.loading = false;
		},
		getJobFailure: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
	},
});

const { getJobRequest, getJobSuccess, getJobFailure } = jobSlice.actions;

export const jobsListReducer = (state) => state?.jobs?.jobsList;

export const getAllJobsAction = () => async (dispatch) => {
	try {
		dispatch(getJobRequest());
		await api
			.request("GET", JOB_GETALL_URL, null, {
				Authorization:
					"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU2IiwibmJmIjoxNjgwNjM5NzE1LCJleHAiOjE2ODE1MDM3MTUsImlhdCI6MTY4MDYzOTcxNX0.y3UzWdIchnRh6spJrLA2_U3gU8WABjpsDTojTP4O9jE",
			})
			.then((res) => {
				const data = responseHandler(res);
				// console.log("JOB DATA", data);
				if (data) {
					dispatch(getJobSuccess(data));
				}
			})
			.catch((error) => {
				console.log("ERROR", error);
				dispatch(getJobFailure());
			});
	} catch (error) {
		dispatch(getJobFailure());
	}
};
export default jobSlice.reducer;
