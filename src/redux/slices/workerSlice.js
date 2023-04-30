import { createSlice } from "@reduxjs/toolkit";
import {
  PROJECT_GETALL_URL,
  UPDATE_PROJECT_URL,
  PROJECT_GETALL_SIMPLE,
  base_url,
  responseHandler,
  WORKER_GETALL_URL,
  UPDATE_WORKER_URL,
  GET_SKILLS_URL,
} from "../../utils/api_constants";
import APIServiceManager from "../../services/APIservicemanager";
import axios from "axios";
import { navigate } from "../../navigation/NavigationRef";
const initialState = {
  loading: false,
  error: null,
  workersList: null,
  createWorkerData: null,
  skillsList: null,
  selectedWorker: null,
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
    selectedWorkerSuccess: (state, action) => {
      state.loading = false;
      state.selectedWorker = action.payload;
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
  selectedWorkerSuccess,
} = workerSlice.actions;

export const workersListReducer = (state) => state?.workers?.workersList;
export const workerLoading = (state) => state?.workers?.loading;
export const skillsListReducer = (state) => state?.workers?.skillsList;
export const selectedWorkerReducer = (state) => state?.workers?.selectedWorker;

// export const projectsListSimpleReducer = (state) =>
// 	state?.projectSlice?.projectsListSimple;

export const selectWorkerAction = (data) => (dispatch) => {
  dispatch(selectedWorkerSuccess(data));
};

export const getAllWorkersAction =
  (token, projectId, contractorId) => async (dispatch) => {
    try {
      dispatch(getWorkersRequest());
      await api
        .request(
          "GET",
          WORKER_GETALL_URL +
            `?projectId=${projectId}&createdBy=${contractorId}`,
          null,
          {
            Authorization: token,
          }
        )
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
  (token, data, profilePicture, adharCard) => async (dispatch) => {
    dispatch(updateWorkerRequest());
    try {
      const response = await axios.post(
        `${base_url}/dashboard/worker/addupdateworker`,
        data,
        {
          headers: {
            Authorization: token,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Respinse", response);
      if (response.status === 200) {
        dispatch(updateWorkerSuccess(response.data));

        let workerId = selectedWorkerReducer
          ? selectedWorkerReducer?.workerId
          : response.data.workerId;
        // formData.append('panCard', panCard);
        [1, 2].map(async (item) => {
          if (item === 1 && adharCard) {
            let resp = await axios.post(
              `${base_url}/dashboard/worker/upload?workerId=${workerId}&document=IdentityCard`,
              adharCard,
              {
                headers: {
                  Authorization: token,
                  "Content-Type": "multipart/form-data",
                },
              }
            );
            console.log("aadhar resp", resp);
          }
          if (item === 2 && profilePicture) {
            let resp = await axios.post(
              `${base_url}/dashboard/worker/upload?workerId=${workerId}&document=ProfilePicture`,
              profilePicture,
              {
                headers: {
                  Authorization: token,
                  "Content-Type": "multipart/form-data",
                },
              }
            );
            console.log("profile resp", resp);
          }
        });
        return response;
      }
    } catch (e) {
      console.log("worker error", e.response);
      dispatch(
        updateWorkerFailure("Something went wrong while getting users!")
      );
    }
  };

export const updateWorkerActionOld =
  (token, data, profilePicture, adharCard) => async (dispatch) => {
    console.log("test");
    navigate("WorkerDetails");
    try {
      dispatch(updateWorkerRequest());
      await api
        .request("POST", UPDATE_WORKER_URL, data, {
          Authorization: token,
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
            console.log("WORKER ID: ", workerId);
            [1, 2].map(async (item) => {
              if (item === 1 && adharCard) {
                let resp = await axios.post(
                  `${base_url}/dashboard/worker/upload?workerId=${workerId}&document=IdentityCard`,
                  adharCard,
                  {
                    headers: {
                      Authorization: token,
                      "Content-Type": "multipart/form-data",
                    },
                  }
                );
                console.log("aadhar resp", resp);
              }
              if (item === 2 && profilePicture) {
                let resp = await axios.post(
                  `${base_url}/dashboard/worker/upload?workerId=${workerId}&document=ProfilePicture`,
                  profilePicture,
                  {
                    headers: {
                      Authorization: token,
                      "Content-Type": "multipart/form-data",
                    },
                  }
                );
                console.log("profile resp", resp);
              }
            });
          }
          return res;
        })
        .catch((error) => {
          console.log("WORKER ERROR", error);
          dispatch(updateWorkerFailure());
        });
    } catch (error) {
      dispatch(updateWorkerFailure());
    }
  };

export const getSkillsAction = (token) => async (dispatch) => {
  try {
    dispatch(getSkillsRequest());
    await api
      .request("GET", GET_SKILLS_URL, null, {
        Authorization: token,
      })
      .then((res) => {
        const data = responseHandler(res);
        // console.log("Skills DATA", data);
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
