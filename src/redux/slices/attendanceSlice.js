import { createSlice } from "@reduxjs/toolkit";
import {
	ATTENDANCE_MUSTER_URL,
	ATTENDANCE_GETALL_URL,
	ATTENDANCE_REPORT_URL,
	responseHandler,
	staticToken,
} from "../../utils/api_constants";
import APIServiceManager from "../../services/APIservicemanager";

const initialState = {
	loading: false,
	error: null,
	attendanceList: null,
	attendanceMuster: null,
	attendanceApprove: null,
	attendanceReport: null,
};

const api = new APIServiceManager();
const attendanceSlice = createSlice({
	name: "attendance",
	initialState,
	reducers: {
		getAttendanceRequest: (state, action) => {
			state.loading = true;
			state.error = null;
		},
		getAttendanceSuccess: (state, action) => {
			state.attendanceList = action.payload;
			state.loading = false;
		},
		getAttendanceFailure: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
		getAttendanceMusterRequest: (state, action) => {
			state.loading = true;
			state.error = null;
		},
		getAttendanceMusterSuccess: (state, action) => {
			state.attendanceMuster = action.payload;
			state.loading = false;
		},
		getAttendanceMusterFailure: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
		getAttendanceApproveRequest: (state, action) => {
			state.loading = true;
			state.error = null;
		},
		getAttendanceApproveSuccess: (state, action) => {
			state.attendanceApprove = action.payload;
			state.loading = false;
		},
		getAttendanceApproveFailure: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
		getAttendanceReportRequest: (state, action) => {
			state.loading = true;
			state.error = null;
		},
		getAttendanceReportSuccess: (state, action) => {
			state.attendanceReport = action.payload;
			state.loading = false;
		},
		getAttendanceReportFailure: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
	},
});

const {
	getAttendanceRequest,
	getAttendanceSuccess,
	getAttendanceFailure,
	getAttendanceMusterRequest,
	getAttendanceMusterSuccess,
	getAttendanceMusterFailure,
	getAttendanceApproveRequest,
	getAttendanceApproveSuccess,
	getAttendanceApproveFailure,
	getAttendanceReportRequest,
	getAttendanceReportSuccess,
	getAttendanceReportFailure,
} = attendanceSlice.actions;

export const attendanceListReducer = (state) =>
	state?.attendanceSlice?.attendanceList;
export const attendanceMusterReducer = (state) =>
	state?.attendanceSlice?.attendanceMuster;
export const attendanceApproveReducer = (state) =>
	state?.attendanceSlice?.attendanceApprove;
export const attendanceReportReducer = (state) =>
	state?.attendanceSlice?.attendanceReport;

export const getAllAttendanceAction = (projectId) => async (dispatch) => {
	try {
		dispatch(getAttendanceRequest());
		await api

			.request("GET", ATTENDANCE_GETALL_URL + `?projectId=${projectId}`, null, {
				Authorization: staticToken,
			})
			.then((res) => {
				const data = responseHandler(res);
				console.log("ATTENDANCE", data);
				if (data) {
					dispatch(getAttendanceSuccess(data));
				}
			})
			.catch((error) => {
				console.log("ATTENDANCE ERROR", error);
				dispatch(getAttendanceFailure());
			});
	} catch (error) {
		dispatch(getAttendanceFailure());
	}
};
export const getAttendanceMusterAction =
	(workerId, jobId) => async (dispatch) => {
		try {
			dispatch(getAttendanceMusterRequest());
			await api

				.request(
					"GET",
					ATTENDANCE_MUSTER_URL + `?workerId=${workerId}&jobId=${jobId}`,
					null,
					{
						Authorization: staticToken,
					}
				)

				.then((res) => {
					const data = responseHandler(res);
					console.log("ATTENDANCE MUSTER", data);
					if (data) {
						dispatch(getAttendanceMusterSuccess(data));
					}
				})
				.catch((error) => {
					console.log("ATTENDANCE MUSTER ERROR", error);
					dispatch(getAttendanceMusterFailure());
				});
		} catch (error) {
			dispatch(getAttendanceMusterFailure());
		}
	};

export const getAttendanceApproveAction =
	(jobId, workerId) => async (dispatch) => {
		try {
			dispatch(getAttendanceApproveRequest());
			await api

				.request(
					"POST",
					ATTENDANCE_APPROVE_URL + `?jobId=${jobId}&workerId=${workerId}`,
					null,
					{
						Authorization: staticToken,
					}
				)
				.then((res) => {
					const data = responseHandler(res);
					console.log("ATTENDANCE APPROVE", data);
					if (data) {
						dispatch(getAttendanceApproveSuccess(data));
					}
				})
				.catch((error) => {
					console.log("ATTENDANCE APPROVE ERROR", error);
					dispatch(getAttendanceApproveFailure());
				});
		} catch (error) {
			dispatch(getAttendanceApproveFailure());
		}
	};

export const getAttendanceReportAction = (projectId) => async (dispatch) => {
	try {
		dispatch(getAttendanceReportRequest());
		await api

			.request("GET", ATTENDANCE_REPORT_URL + `?projectId=${projectId}`, null, {
				Authorization: staticToken,
			})
			.then((res) => {
				const data = responseHandler(res);
				console.log("ATTENDANCE REPORT", data);
				if (data) {
					dispatch(getAttendanceReportSuccess(data));
				}
			})
			.catch((error) => {
				console.log("ATTENDANCE REPORT ERROR", error);
				dispatch(getAttendanceReportFailure());
			});
	} catch (error) {
		dispatch(getAttendanceReportFailure());
	}
};

export default attendanceSlice.reducer;
