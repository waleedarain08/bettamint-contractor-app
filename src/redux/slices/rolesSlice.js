import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { base_url } from "../../utils/api_constants";

const initialState = {
  loading: false,
  error: null,
  rolesList: [],
  res: null,
};

const rolesSlice = createSlice({
  name: "roles",
  initialState,
  reducers: {
    creatingRoles(state, action) {
      state.loading = true;
      state.error = null;
      state.res = null;
    },
    creatingRolesSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.res = action.payload;
    },
    creatingRolesFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.res = null;
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
  },
});
const {
  creatingRoles,
  creatingRolesSuccess,
  creatingRolesFailure,
  gettingRoles,
  gettingRolesSuccess,
  gettingRolesFailure,
} = rolesSlice.actions;
export const rolesResponseReducer = (state) => state.roles;

export const createRole = (token, role) => async (dispatch) => {

  dispatch(creatingRoles());
  try {
    const response = await axios.post(`${base_url}/dashboard/Role`, role, {
      headers: {
        Authorization: token,
      },
    });
    if (response?.status === 200) {
      console.log("response", response);
      dispatch(creatingRolesSuccess(response));
    } else {
      console.log("response", response);
      dispatch(
        creatingRolesFailure("Something went wrong while creating roles!")
      );
    }

    return response;
  } catch (e) {
    // console.log('e.m', e?.message);
    console.log("e", e);
    dispatch(
      creatingRolesFailure("Something went wrong while creating roles!")
    );
  }
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

export default rolesSlice.reducer;
