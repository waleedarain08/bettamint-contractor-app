import { createSlice } from "@reduxjs/toolkit";
import {
  PROJECT_GETALL_URL,
  UPDATE_PROJECT_URL,
  PROJECT_GETALL_SIMPLE,
  base_url,
  responseHandler,
  staticToken,
  WORKER_GETALL_URL,
  UPDATE_WORKER_URL,
  GET_SKILLS_URL,
} from "../../utils/api_constants";
import APIServiceManager from "../../services/APIservicemanager";
import axios from "axios";
const initialState = {
  loading: false,
  error: null,
  workersList: null,
  createWorkerData: null,
  skillsList: null,
};
const api = new APIServiceManager();

const workerSlice = createSlice({
  name: "workers",
  initialState,
  reducers: {
    getWorkersRequest: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    getWorkersSuccess: (state, action) => {
      state.workersList = action.payload;
      state.loading = false;
    },
    getWorkersFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateWorkerRequest: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    updateWorkerSuccess: (state, action) => {
      state.loading = false;
      state.createWorkerData = action.payload;
    },
    updateWorkerFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getSkillsRequest: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    getSkillsSuccess: (state, action) => {
      state.skillsList = action.payload;
      state.loading = false;
    },
    getSkillsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

const {
  getWorkersRequest,
  getWorkersSuccess,
  getWorkersFailure,
  updateWorkerRequest,
  updateWorkerSuccess,
  updateWorkerFailure,
  getSkillsRequest,
  getSkillsSuccess,
  getSkillsFailure,
} = workerSlice.actions;

export const workersListReducer = (state) => state?.workerSlice?.workersList;
export const skillsListReducer = (state) => state?.workerSlice?.skillsList;

// export const projectsListSimpleReducer = (state) =>
// 	state?.projectSlice?.projectsListSimple;

export const getAllWorkersAction = (projectId) => async (dispatch) => {
  try {
    dispatch(getWorkersRequest());
    await api
      .request("GET", WORKER_GETALL_URL + `?projectId=${projectId}`, null, {
        Authorization: staticToken,
      })
      .then((res) => {
        const data = responseHandler(res);
        console.log("WORKERS DATA", data);
        if (data) {
          dispatch(getWorkersSuccess(data));
        }
        // return res
      })
      .catch((error) => {
        console.log("GET WORKERS ERROR", error);
        dispatch(getWorkersFailure());
      });
  } catch (error) {
    dispatch(getWorkersFailure());
  }
};

export const updateWorkerAction =
  (data, profilePic, aadharCard) => async (dispatch) => {
    try {
      dispatch(updateWorkerRequest());
      await api
        .request("POST", UPDATE_WORKER_URL, data, {
          Authorization: staticToken,
          "Content-Type": "multipart/form-data",
          Accept: "text/plain",
        })
        .then((res) => {
          // console.log("res", res);
          const data = responseHandler(res);
          console.log("Worker create response", data);
          if (data) {
            dispatch(updateWorkerSuccess(data));
            let workerId = data.workerId;
            // formData.append('panCard', panCard);
            console.log("WORKER ID: ", workerId);
            [(1, 2)].map(async (item) => {
              if (item === 1 && aadharCard) {
                // let formData = new FormData();
                // formData.append("file", aadharCard);
                let resp = await axios.post(
                  `${base_url}/dashboard/worker/upload?workerId=${workerId}&document=IdentityCard`,
                  aadharCard,
                  {
                    headers: {
                      "Content-Type": "multipart/form-data",
                      Authorization: staticToken,
                    },
                  }
                );
                console.log("aadhar resp", resp);
              }
              if (item === 2 && profilePic) {
                // let formData = new FormData();

                // formData.append("file", profilePic);
                let resp = await axios.post(
                  `${base_url}/dashboard/worker/upload?workerId=${workerId}&document=ProfilePicture`,
                  profilePic,
                  {
                    headers: {
                      "Content-Type": "multipart/form-data",
                      Authorization: staticToken,
                    },
                  }
                );
                console.log("profile resp", resp);
              }
            });
          }
          // return res
        })
        .catch((error) => {
          console.log("WORKER ERROR", error);
          dispatch(updateWorkerFailure());
        });
    } catch (error) {
      dispatch(updateWorkerFailure());
    }
  };

export const getSkillsAction = () => async (dispatch) => {
  try {
    dispatch(getSkillsRequest());
    await api
      .request("GET", GET_SKILLS_URL, null, {
        Authorization: staticToken,
      })
      .then((res) => {
        const data = responseHandler(res);
        console.log("Skills DATA", data);
        if (data) {
          dispatch(getSkillsSuccess(data));
        }
        // return res
      })
      .catch((error) => {
        console.log("GET SKILLS ERROR", error);
        dispatch(getSkillsFailure());
      });
  } catch (error) {
    dispatch(getSkillsFailure());
  }
};
export default workerSlice.reducer;
