import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { base_url } from "../../utils/api_constants";

const initialState = {
  loading: false,
  error: null,
  fieldNoteList: null,
  markingFieldNoteLoading: false,
};

const fieldNoteSlice = createSlice({
  name: "fieldNote",
  initialState,
  reducers: {
    gettingFieldNote(state, action) {
      state.loading = true;
      state.error = null;
    },
    gettingFieldNoteSuccess(state, action) {
      state.fieldNoteList = action.payload;
      state.loading = false;
      state.error = null;
    },
    gettingFieldNoteFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    markingFieldNoteAction(state, action) {
      state.markingFieldNoteLoading = true;
      state.error = null;
    },
    markingFieldNoteActionSuccess(state, action) {
      state.markingFieldNoteLoading = false;
      state.error = null;
    },
    markingFieldNoteActionFailure(state, action) {
      state.markingFieldNoteLoading = false;
      state.error = action.payload;
    },
    assigningContractorFieldNoteAction(state, action) {
      state.markingFieldNoteLoading = true;
      state.error = null;
    },
    assigningContractorFieldNoteActionSuccess(state, action) {
      state.markingFieldNoteLoading = false;
      state.error = null;
    },
    assigningContractorFieldNoteActionFailure(state, action) {
      state.markingFieldNoteLoading = false;
      state.error = action.payload;
    },
    creatingFieldNote(state, action) {
      state.loading = true;
      state.error = null;
    },
    creatingFieldNoteSuccess(state, action) {
      state.loading = false;
      state.error = null;
    },
    creatingFieldNoteFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
const {
  gettingFieldNote,
  gettingFieldNoteSuccess,
  gettingFieldNoteFailure,
  markingFieldNoteAction,
  markingFieldNoteActionSuccess,
  markingFieldNoteActionFailure,
  assigningContractorFieldNoteAction,
  assigningContractorFieldNoteActionSuccess,
  assigningContractorFieldNoteActionFailure,
  creatingFieldNote,
  creatingFieldNoteSuccess,
  creatingFieldNoteFailure,
} = fieldNoteSlice.actions;
export const fieldNoteReducer = (state) => state.fieldNote;

export const getFieldNoteList =
  (token, projectId = 0) =>
  async (dispatch) => {
    dispatch(gettingFieldNote());
    try {
      const response = await axios.get(
        projectId
          ? `${base_url}/dashboard/FieldNote/project/${projectId}`
          : `${base_url}/dashboard/FieldNote`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
    //   console.log("Response--->>>", response.data);
      if (response.status === 200) {
        dispatch(gettingFieldNoteSuccess(response.data));
      }
      return response;
    } catch (e) {
      dispatch(
        gettingFieldNoteFailure("Something went wrong while getting fieldNote!")
      );
    }
  };

export const markFieldNoteAction = (id, action) => async (dispatch) => {
  dispatch(markingFieldNoteAction());
  try {
    const response = await axios.put(
      `${base_url}/dashboard/FieldNote/action/${id}?action=${action}`
    );
    if (response.status === 200) {
      dispatch(markingFieldNoteActionSuccess(response.data));
    } else {
      dispatch(
        markingFieldNoteActionFailure(
          "Something went wrong while marking fieldNote!"
        )
      );
    }
    return response;
  } catch (e) {
    dispatch(
      markingFieldNoteActionFailure(
        "Something went wrong while marking fieldNote!"
      )
    );
  }
};

export const assignContractorFieldNote =
  (id, contractorId) => async (dispatch) => {
    dispatch(assigningContractorFieldNoteAction());
    try {
      const response = await axios.put(
        `${base_url}/dashboard/FieldNote/contractor/${id}?contractorId=${contractorId}`
      );
      if (response.status === 200) {
        dispatch(assigningContractorFieldNoteActionSuccess(response.data));
      } else {
        dispatch(
          assigningContractorFieldNoteActionFailure(
            "Something went wrong while assigning contractor!"
          )
        );
      }
      return response;
    } catch (e) {
      dispatch(
        assigningContractorFieldNoteActionFailure(
          "Something went wrong while assigning contractor!"
        )
      );
    }
  };

export const createFieldNoteEntry = (data) => async (dispatch) => {
  dispatch(creatingFieldNote());
  try {
    const response = await axios.post(`${base_url}/dashboard/FieldNote`, data, {
      headers: {
        "Content-Type": "multipart/form-data", // Set the Content-Type header to multipart/form-data
      },
    });
    if (response.status === 200) {
      dispatch(creatingFieldNoteSuccess(response.data));
    } else {
      dispatch(
        creatingFieldNoteFailure(
          "Something went wrong while creating field note!"
        )
      );
    }
    return response;
  } catch (e) {
    dispatch(
      creatingFieldNoteFailure(
        "Something went wrong while creating field note!"
      )
    );
  }
};

export default fieldNoteSlice.reducer;
