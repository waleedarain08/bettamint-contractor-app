import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { base_url } from "../../utils/api_constants";

const initialState = {
  loading: false,
  error: null,
  usersList: null,
  selectedUser: null,
  counts: null,
  rolesList: null,
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
    gettingRoles(state, action) {
      state.loading = true;
      state.error = null;
    },
    gettingRolesSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.rolesList = action.payload;
    },
    gettingRolesFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.rolesList = [];
    },
    creatingUser(state, action) {
      state.loading = true;
      state.error = null;
    },
    creatingUserSuccess(state, action) {
      state.loading = false;
      state.error = null;
    },
    creatingUserFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
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
  gettingRoles,
  gettingRolesSuccess,
  gettingRolesFailure,
  creatingUser,
  creatingUserSuccess,
  creatingUserFailure,
} = userSlice.actions;

export const usersListReducer = (state) => state.users.usersList;
export const countsReducer = (state) => state.users.counts;
export const loadingUsers = (state) => state.users.loading;
export const rolesReducer = (state) => state.users.rolesList;

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
export const getRoles = (token) => async (dispatch) => {
  dispatch(gettingRoles());
  try {
    const response = await axios.get(`${base_url}/dashboard/Role`, {
      headers: {
        Authorization: token,
      },
    });
    if (response?.status === 200) {
      dispatch(gettingRolesSuccess(response.data));
    }
    return response;
  } catch (e) {
    dispatch(gettingRolesFailure("Something went wrong while getting roles!"));
  }
};

export const createUserAction = (token, user) => async (dispatch) => {
  dispatch(creatingUser());
  try {
    const response = await axios.post(
      `${base_url}/dashboard/User/addupdateuser`,
      {
        ...user,
        userTypeId: 0,
        contractorId: 0,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );

    if (response?.status === 200) {
      dispatch(creatingUserSuccess(response.data));
      return response;
    } else {
      return { message: "User already exists" };
    }
  } catch (e) {
    console.log("e", e?.response?.data);

    dispatch(creatingUserFailure("Something went wrong while getting users!"));
    return e;
  }
};
export default userSlice.reducer;
