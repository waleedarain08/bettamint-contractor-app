import { createSlice } from "@reduxjs/toolkit";
import {
  ATTENDANCE_MUSTER_URL,
  ATTENDANCE_GETALL_URL,
  responseHandler,
  staticToken,
  base_url,
} from "../../utils/api_constants";
import APIServiceManager from "../../services/APIservicemanager";
import axios from "axios";
const initialState = {
  loading: false,
  error: null,
  userData: null,
  isUserLogin: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userLoginRequest: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    userLoginSuccess: (state, action) => {
      state.attendanceList = action.payload;
      state.loading = false;
    },
    userLoginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    isUserLoginDone: (state, action) => {
      state.isUserLogin = action.payload;
    },
    resetState: (state, action) => {
      state.isUserLogin = false;
      state.error = null;
      state.loading = false;
      state.userData = null;
    },
  },
});

const {
  userLoginRequest,
  userLoginSuccess,
  userLoginFailure,
  isUserLoginDone,
  resetState,
} = authSlice.actions;

export const authToken = (state) => state?.auth?.isUserLogin;
export const loading = (state) => state?.auth?.loading;

export const isUserLoginAction = () => async (dispatch) => {
  dispatch(isUserLoginDone(true));
};
export const logoutAction = () => async (dispatch) => {
  dispatch(resetState());
};

export const userLoginAction = (username, password) => async (dispatch) => {
  const url = `${base_url}/dashboard/User/Login`;

  //   let userCred = null;
  dispatch(userLoginRequest());
  try {
    let response = await axios.post(
      `${url}?username=${username}&password=${password}`
    );
    console.log("Auth Response", response);
    if (response.status === 200) {
      dispatch(userLoginSuccess(response.data));
      dispatch(isUserLoginDone(true));
    } else {
      dispatch(userLoginFailure("Something went wrong!"));
    }
    return response;
  } catch (error) {
    dispatch(userLoginFailure("Something went wrong!"));
    console.log("ERROR", error.status);
    // if (error.status === 400) {
    //   throw new Error("Incorrect username or password");
    // }
    // throw new Error("Unable to login, Please try again later");
    return error;
  }
};

export default authSlice.reducer;
