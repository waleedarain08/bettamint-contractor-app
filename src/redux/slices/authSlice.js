import { createSlice } from "@reduxjs/toolkit";
import {
  base_url,
} from "../../utils/api_constants";
import axios from "axios";
const initialState = {
  loading: false,
  error: null,
  userData: null,
  token: null,
  signupData: null,
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
      state.userData = action.payload;
      state.loading = false;
    },
    userLoginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    userSignUpRequest: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    userSignUpSuccess: (state, action) => {
      state.signupData = action.payload;
      state.loading = false;
    },
    userSignUpFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    isUserLoginDone: (state, action) => {
      state.token = action.payload;
    },
    resetState: (state, action) => {
      state.token = null;
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
  userSignUpRequest,
  userSignUpSuccess,
  userSignUpFailure,
  isUserLoginDone,
  resetState,
} = authSlice.actions;

export const authToken = (state) => state?.auth?.token;
export const userData = (state) => state?.auth?.userData;
export const loading = (state) => state?.auth?.loading;

export const isUserLoginAction = () => async (dispatch) => {
  dispatch(isUserLoginDone(true));
};
export const logoutAction = () => async (dispatch) => {
  dispatch(resetState());
};

export const userLoginAction = (username, password) => async (dispatch) => {
  const url = `${base_url}/dashboard/User/Login`;

  dispatch(userLoginRequest());
  try {
    let response = await axios.post(
      `${url}?username=${username}&password=${password}`
    );
    if (response.status === 200) {
      dispatch(userLoginSuccess(response.data));
      dispatch(isUserLoginDone(response?.data?.token));
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

export const userSignupAction = (data) => async (dispatch) => {
  const url = `${base_url}/dashboard/User/Login`;

  dispatch(userLoginRequest());
  try {
    let response = await axios.post(
      `${base_url}/dashboard/Lead`, data, {
        headers: {
          "Content-Type": "application/json",
          Accept: "text/plain",
        }
      }
    );
    if (response.status === 200) {
      dispatch(userLoginSuccess(response.data));
      console.log("Signup Response", response.data);
      // dispatch(isUserLoginDone(response?.data?.token));
    } else {
      dispatch(userLoginFailure("Something went wrong!"));
    }
    return response;
  } catch (error) {
    dispatch(userLoginFailure("Something went wrong!"));
    console.log("ERROR", error.response.data);
    // if (error.status === 400) {
    //   throw new Error("Incorrect username or password");
    // }
    // throw new Error("Unable to login, Please try again later");
    return error;
  }
};

export default authSlice.reducer;
