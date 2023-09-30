
import { createSlice } from "@reduxjs/toolkit";
import {
  ATTENDANCE_MUSTER_URL,
  ATTENDANCE_GETALL_URL,
  ATTENDANCE_REPORT_URL,
  responseHandler,
  base_url,
  ATTENDANCE_APPROVE_URL,
} from "../../utils/api_constants";
import APIServiceManager from "../../services/APIservicemanager";
import axios from "axios";

const initialState = {
  loading: false,
  loadingMarkAttendance: false,
  error: null,
  attendanceList: null,
  attendanceMuster: null,
  attendanceApprove: null,
  attendanceReport: null,
  projectData: null,
  selectedAttendance: null,
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
    saveProjectData: (state, action) => {
      state.projectData = action.payload;
    },
    setAttendance: (state, action) => {
      state.selectedAttendance = action.payload;
    },
    markingAttendance(state, action) {
      state.loadingMarkAttendance = true;
    },
    markingAttendanceSuccess(state, action) {
      state.loadingMarkAttendance = false;
    },
    markingAttendanceFailure(state, action) {
      state.loadingMarkAttendance = false;
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
  saveProjectData,
  setAttendance,
  markingAttendance,
  markingAttendanceSuccess,
  markingAttendanceFailure,
} = attendanceSlice.actions;

export const attendanceListReducer = (state) =>
  state?.attendance?.attendanceList;
export const attendanceMusterReducer = (state) =>
  state?.attendance?.attendanceMuster;
export const attendanceApproveReducer = (state) =>
  state?.attendance?.attendanceApprove;
export const attendanceReportReducer = (state) =>
  state?.attendance?.attendanceReport;
export const projectDataReducer = (state) => state?.attendance?.projectData;
export const selectedAttendanceData = (state) =>
  state?.attendance?.selectedAttendance;
export const loadingAttendance = (state) => state?.attendance?.loading;

export const saveProjectDataAction = (data) => async (dispatch) => {
  dispatch(saveProjectData(data));
};
export const selectAttendanceAction = (data) => async (dispatch) => {
  dispatch(setAttendance(data));
};
export const removeMusterData = () => async (dispatch) => {
  dispatch(getAttendanceMusterSuccess(null));
};

export const getAllAttendanceAction =
  (token, projectId, contractorId) => async (dispatch) => {
    try {
      dispatch(getAttendanceRequest());
      await api

        .request(
          "GET",
          ATTENDANCE_GETALL_URL +
            `?projectId=${projectId}&createdBy=${contractorId || 0}`,
          null,
          {
            Authorization: token,
          }
        )
        .then((res) => {
          const data = responseHandler(res);
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
  (token, workerId, jobId) => async (dispatch) => {
    try {
      dispatch(getAttendanceMusterRequest());
      await api

        .request(
          "GET",
          ATTENDANCE_MUSTER_URL + `?workerId=${workerId}&jobId=${jobId}`,
          null,
          {
            Authorization: token,
          }
        )

        .then((res) => {
          const data = responseHandler(res);
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
  (token, jobId, workerId, dateTime, hours) => async (dispatch) => {
    try {
      dispatch(getAttendanceApproveRequest());
      await api
        .request(
          "POST",
          ATTENDANCE_APPROVE_URL +
            `?jobId=${jobId}&workerId=${workerId}&dateTime=${dateTime}&hours=${hours}`,
          null,
          {
            Authorization: token,
          }
        )
        .then((res) => {
          const data = responseHandler(res);
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

export const getAttendanceReportAction =
  (token, projectId) => async (dispatch) => {
    try {
      dispatch(getAttendanceReportRequest());
      await api

        .request(
          "GET",
          ATTENDANCE_REPORT_URL + `?projectId=${projectId}`,
          null,
          {
            Authorization: token,
          }
        )
        .then((res) => {
          const data = responseHandler(res);
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

export const markAttendance =
  (token, workerId, jobId, attendanceType) => async (dispatch) => {
    dispatch(markingAttendance());
    try {
      // if (projectId) {

      const response = await axios.post(
        `${base_url}/dashboard/Attendance/markattendance?workerId=${workerId}&jobId=${jobId}&attendanceType=${attendanceType}`,
        null,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (response?.status === 200) {
        dispatch(markingAttendanceSuccess());
      }
      if (response?.data?.error) {
        dispatch(markingAttendanceFailure(response?.data?.error));
      }

      return response;
    } catch (e) {
      dispatch(
        markingAttendanceFailure(
          "Something went wrong while marking attendance!"
        )
      );
      return e;
    }
  };
export default attendanceSlice.reducer;
