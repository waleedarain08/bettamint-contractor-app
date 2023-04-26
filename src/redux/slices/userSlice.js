import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { base_url } from "../../utils/api_constants";

const initialState = {
  loading: false,
  error: null,
  usersList: null,
  selectedUser: null,
  counts: null,
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
    gettingCountData(state, action) {
      state.loading = true;
      state.error = null;
      state.counts = null;
    },
    gettingCountDataSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.counts = action.payload;
    },
    gettingCountDataFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.counts = null;
    },
    selectAUser: (state, action) => {
      state.selectedUser = action.payload;
    },
  },
});
const {
  gettingUsers,
  gettingUsersSuccess,
  gettingUsersFailure,
  selectAUser,
  gettingCountData,
  gettingCountDataSuccess,
  gettingCountDataFailure,
} = userSlice.actions;

export const usersListReducer = (state) => state.users.usersList;
export const countsReducer = (state) => state.users.counts;
export const loadingUsers = (state) => state.users.loading;

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

export const getCountsData = (token) => async (dispatch) => {
  dispatch(gettingCountData());
  try {
    const response = await axios.get(`${base_url}/Dashboard/stats/count`, {
      headers: {
        Authorization: token,
      },
    });
    if (response.status === 200) {
      // console.log("Dashboard countttt", response.data);
      dispatch(gettingCountDataSuccess(response.data));
    }
    return response;
  } catch (e) {
    dispatch(
      gettingCountDataFailure("Something went wrong while getting count data!")
    );
  }
};
export const pickAUser = (user) => async (dispatch) => {
  dispatch(selectAUser(user));
};

export default userSlice.reducer;
