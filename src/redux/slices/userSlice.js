import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { base_url } from "../../utils/api_constants";

const initialState = {
  loading: false,
  error: null,
  usersList: null,
  selectedUser: null,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    gettingUsers(state, action) {
      state.loading = true;
      state.error = null;
    },
    gettingUsersSuccess(state, action) {
      state.usersList = action.payload;
      state.loading = false;
      state.error = null;
    },
    gettingUsersFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    selectAUser: (state, action) => {
      state.selectedUser = action.payload;
    },
  },
});
const { gettingUsers, gettingUsersSuccess, gettingUsersFailure, selectAUser } =
  userSlice.actions;

export const usersListReducer = (state) => state.users.usersList;

export const getUsersAction = (token) => async (dispatch) => {
  dispatch(gettingUsers());
  try {
    const response = await axios.get(`${base_url}/dashboard/User/getall`, {
      headers: {
        Authorization: token,
      },
    });
    // console.log("Users Response", response.data);
    if (response.data) {
      dispatch(gettingUsersSuccess(response.data));
    }
    return response;
  } catch (e) {
    dispatch(gettingUsersFailure("Something went wrong while getting users!"));
  }
};

export const pickAUser = (user) => async (dispatch) => {
  dispatch(selectAUser(user));
};

export default userSlice.reducer;
