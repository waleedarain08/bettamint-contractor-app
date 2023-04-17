import { createSlice } from "@reduxjs/toolkit";
import {
  JOB_GETALL_URL,
  responseHandler,
  staticToken,
  JOB_CREATE_URL,
  base_url,
} from "../../utils/api_constants";
import APIServiceManager from "../../services/APIservicemanager";
import axios from "axios";

const initialState = {
  loading: false,
  error: null,
  jobsList: null,
  createJobData: null,
  selectedJob: null,
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
    selectedJobSuccess: (state, action) => {
      state.selectedJob = action.payload;
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
  selectedJobSuccess,
} = jobSlice.actions;

export const jobsListReducer = (state) => state?.jobs?.jobsList;
export const loadingJobs = (state) => state?.jobs?.loading;
export const createJobReducer = (state) => state?.jobs?.createJobData;
export const selectedJobReducer = (state) => state?.jobs?.selectedJob;

export const selectedJobAction = (data) => async (dispatch) => {
  dispatch(selectedJobSuccess(data));
};

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

export const createJobAction = (token, worker) => async (dispatch) => {
  dispatch(createJobRequest());
  try {
    const response = await axios.post(
      `${base_url}/dashboard/Job/createjob`,
      worker,
      {
        headers: {
          Authorization: token,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log("JOB API HIT", response.data);
    if (response.status === 200) {
      dispatch(createJobSuccess(response.data));
    } else {
      dispatch(
        createJobFailure("Something went wrong while creating/updaing project!")
      );
    }
    return response;
  } catch (e) {
    console.log("JOB ERROR", e);
    dispatch(
      createJobFailure("Something went wrong while creating/updaing project!")
    );
    return e;
  }
};
// export const createJobAction = (data) => async (dispatch) => {
// 	try {
// 		dispatch(createJobRequest());
// 		await api

// 			.request("POST", JOB_CREATE_URL, data, {
// 				Authorization: staticToken,
// 			})
// 			.then((res) => {
// 				const data = responseHandler(res);
// 				console.log("JOB DATA", data);
// 				if (data) {
// 					dispatch(createJobSuccess(data));
// 				}
// 			})
// 			.catch((error) => {
// 				console.log("JOB ERROR", error);
// 				dispatch(createJobFailure());
// 			});
// 	} catch (error) {
// 		dispatch(createJobFailure());
// 	}
// };

export default jobSlice.reducer;
