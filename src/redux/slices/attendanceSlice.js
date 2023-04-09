import { createSlice } from "@reduxjs/toolkit";
import {
	ATTENDANCE_GETALL_URL,
	responseHandler,
	staticToken,
} from "../../utils/api_constants";
import APIServiceManager from "../../services/APIservicemanager";

const initialState = {
	loading: false,
	error: null,
	attendanceList: null,
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
	},
});

const { getAttendanceRequest, getAttendanceSuccess, getAttendanceFailure } =
	attendanceSlice.actions;

export const attendanceListReducer = (state) =>
	state?.attendanceSlice?.attendanceList;

export const getAllAttendanceAction = () => async (dispatch) => {
	try {
		dispatch(getAttendanceRequest());
		await api
			.request("GET", ATTENDANCE_GETALL_URL, null, {
				Authorization:
					staticToken,
			})
			.then((res) => {
				const data = responseHandler(res);
				console.log("ATTENDANCE", data);
				if (data) {
					dispatch(getAttendanceSuccess(data));
				}
			})
			.catch((error) => {
				console.log("ERROR", error);
				dispatch(getAttendanceFailure());
			});
	} catch (error) {
		dispatch(getAttendanceFailure());
	}
};

export default attendanceSlice.reducer;
