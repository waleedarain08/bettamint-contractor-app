import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { base_url } from "../../utils/api_constants";
import { navigate } from "../../navigation/NavigationRef";

const initialState = {
  loading: false,
  error: null,
  fieldNoteList: null,
  markingFieldNoteLoading: false,
  scopeList: [],
  selectedNote: null,
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
    gettingScopeList(state, action) {
      state.loading = true;
      state.error = null;
    },
    gettingScopeListSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.scopeList = action.payload;
    },
    gettingScopeListFailure(state, action) {
      state.loading = false;
      state.error = null;
    },
    deletingFieldNote(state, action) {
      state.loading = true;
      state.error = null;
    },
    deletingFieldNoteSuccess(state, action) {
      state.loading = false;
      state.error = null;
    },
    deletingFieldNoteFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    editFieldNote(state, action) {
      state.selectedNote = action.payload;
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
  deletingFieldNote,
  deletingFieldNoteSuccess,
  deletingFieldNoteFailure,
  editFieldNote,
  gettingScopeList,
  gettingScopeListSuccess,
  gettingScopeListFailure,
} = fieldNoteSlice.actions;
export const fieldNoteReducer = (state) => state.fieldNote;

export const getScopeList = (token) => async (dispatch) => {
  dispatch(gettingScopeList());
  // if (projectId) {
  const response = await axios.get(
    `${base_url}/dashboard/Productivity/getscopelist`,
    {
      headers: {
        Authorization: token,
      },
    }
  );
  if (response?.status === 200) {
    dispatch(gettingScopeListSuccess(response.data));
  } else {
    dispatch(
      gettingScopeListFailure("Something went wrong while getting scope list!")
    );
  }
  return response;
};

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

export const markFieldNoteAction = (token, id, action) => async (dispatch) => {
  dispatch(markingFieldNoteAction());
  try {
    const response = await axios.put(
      `${base_url}/dashboard/FieldNote/action/${id}?action=${action}`,
      null,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    console.log("RES", response);
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
    console.log("ERROR", e?.response);
    dispatch(
      markingFieldNoteActionFailure(
        "Something went wrong while marking fieldNote!"
      )
    );
  }
};

export const assignContractorFieldNote =
  (token, id, contractorId) => async (dispatch) => {
    dispatch(assigningContractorFieldNoteAction());
    try {
      const response = await axios.put(
        `${base_url}/dashboard/FieldNote/contractor/${id}?contractorId=${contractorId}`,
        null,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log('RESPONSE', response)
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

export const createFieldNoteEntry = (token, data) => async (dispatch) => {
  dispatch(creatingFieldNote());
  try {
    const response = await axios.post(`${base_url}/dashboard/FieldNote`, data, {
      headers: {
        Authorization: token,
        "Content-Type": "multipart/form-data",
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
    console.log("ERROR", e.response);
    dispatch(
      creatingFieldNoteFailure(
        "Something went wrong while creating field note!"
      )
    );
  }
};

export const deleteFieldNote = (token, id) => async (dispatch) => {
  dispatch(deletingFieldNote());
  try {
    const response = await axios.delete(
      `${base_url}/dashboard/FieldNote?id=${id}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    if (response.status === 200) {
      dispatch(deletingFieldNoteSuccess(response.data));
    } else {
      dispatch(
        deletingFieldNoteFailure(
          "Something went wrong while deleting field note!"
        )
      );
    }
    return response.status;
  } catch (e) {
    dispatch(
      deletingFieldNoteFailure(
        "Something went wrong while deleting field note!"
      )
    );
  }
};

export const editFieldNoteAction = (data) => async (dispatch) => {
  dispatch(editFieldNote(data));
};
export default fieldNoteSlice.reducer;
