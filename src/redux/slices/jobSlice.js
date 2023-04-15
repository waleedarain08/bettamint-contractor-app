import { createSlice } from "@reduxjs/toolkit";
import {
	JOB_GETALL_URL,
	responseHandler,
	staticToken,
	JOB_CREATE_URL,
} from "../../utils/api_constants";
import APIServiceManager from "../../services/APIservicemanager";

const initialState = {
	loading: false,
	error: null,
	jobsList: null,
	createJobData: null,
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
		createJobRequest: (state, action) => {
			state.loading = true;
			state.error = null;
		},
		createJobSuccess: (state, action) => {
			state.createJobData = action.payload;
			state.loading = false;
		},
		createJobFailure: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
	},
});

const {
	getJobRequest,
	getJobSuccess,
	getJobFailure,
	createJobRequest,
	createJobSuccess,
	createJobFailure,
} = jobSlice.actions;

export const jobsListReducer = (state) => state?.jobSlice?.jobsList;
export const createJobReducer = (state) => state?.jobSlice?.createJobData;

export const getAllJobsAction = () => async (dispatch) => {
	try {
		dispatch(getJobRequest());
		await api
			.request("GET", JOB_GETALL_URL, null, {
				Authorization: staticToken,
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

export const createJobAction = (data) => async (dispatch) => {
	try {
		dispatch(createJobRequest());
		await api

			.request("POST", JOB_CREATE_URL, data, {
				Authorization: staticToken,
			})
			.then((res) => {
				const data = responseHandler(res);
				// console.log("JOB DATA", data);
				if (data) {
					dispatch(createJobSuccess(data));
				}
			})
			.catch((error) => {
				console.log("ERROR", error);
				dispatch(createJobFailure());
			});
	} catch (error) {
		dispatch(createJobFailure());
	}
};

export default jobSlice.reducer;
