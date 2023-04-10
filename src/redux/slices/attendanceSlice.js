import { createSlice } from "@reduxjs/toolkit";
import {
	ATTENDANCE_MUSTER_URL,
	ATTENDANCE_GETALL_URL,
	responseHandler,
	staticToken,
} from "../../utils/api_constants";
import APIServiceManager from "../../services/APIservicemanager";

const initialState = {
	loading: false,
	error: null,
	attendanceList: null,
	attendanceMuster: null,
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
	},
});

const {
	getAttendanceRequest,
	getAttendanceSuccess,
	getAttendanceFailure,
	getAttendanceMusterRequest,
	getAttendanceMusterSuccess,
	getAttendanceMusterFailure,
} = attendanceSlice.actions;

export const attendanceListReducer = (state) =>
	state?.attendanceSlice?.attendanceList;
export const attendanceMusterReducer = (state) =>
	state?.attendanceSlice?.attendanceMuster;
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
					ATTENDANCE_MUSTER_URL + `?workerId=${workerId}` + `?jobId=${jobId}`,
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

export default attendanceSlice.reducer;
