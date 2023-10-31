import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { base_url } from "../../utils/api_constants";

const initialState = {
  loading: false,
  error: null,
  scopeList: [],
  scopeListDetail: [],
  unitList: [],
  boqList: [],
  boqListGC: [],
  boqProgress: null,
  boqProgressLoading: false,
  metrics: null,
  projectProgressData: null,
  projectProgressDataLoading: false,
  projectBudgetLoading: false,
  projectBudgetData: null,
  financialGraphData: null,
  financialGraphLoading: null,
};

const productivitySlice = createSlice({
  name: "productivity",
  initialState,
  reducers: {
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
    gettingUnitList(state, action) {
      state.loading = true;
      state.error = null;
    },
    gettingUnitListSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.unitList = action.payload;
    },
    gettingUnitListFailure(state, action) {
      state.loading = false;
      state.error = null;
    },

    gettingScopeListDetail(state, action) {
      state.loading = true;
      state.error = null;
    },
    gettingScopeListDetailSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.scopeListDetail = action.payload;
    },
    gettingScopeListDetailFailure(state, action) {
      state.loading = false;
      state.error = null;
    },

    addingBOQ(state, action) {
      state.loading = true;
      state.error = null;
    },
    addingBOQSuccess(state, action) {
      state.loading = false;
      state.error = null;
    },
    addingBOQFailure(state, action) {
      state.loading = false;
      state.error = null;
    },

    gettingBoqList(state, action) {
      state.loading = true;
      state.error = null;
    },
    gettingBoqListSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.boqList = action.payload;
    },
    gettingBoqListFailure(state, action) {
      state.loading = false;
      state.error = null;
    },

    gettingBoqListGC(state, action) {
      state.loading = true;
      state.error = null;
    },
    gettingBoqListGCSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.boqListGC = action.payload;
    },
    gettingBoqLisGCtFailure(state, action) {
      state.loading = false;
      state.error = null;
    },

    addingProgress(state, action) {
      state.loading = true;
      state.error = null;
    },
    addingProgressSuccess(state, action) {
      state.loading = false;
      state.error = null;
    },
    addingProgressFailure(state, action) {
      state.loading = false;
      state.error = null;
    },

    gettingBoqProgressGraph(state, action) {
      state.boqProgressLoading = true;
      state.error = null;
    },

    gettingBoqProgressGraphSuccess(state, action) {
      state.boqProgressLoading = false;
      state.error = null;
      state.boqProgress = action.payload;
    },
    gettingBoqProgressGraphFailure(state, action) {
      state.boqProgressLoading = false;
      state.error = action.payload;
      state.boqProgress = null;
    },

    gettingBoqMetrics(state, action) {
      state.boqProgressLoading = true;
      state.error = null;
    },

    gettingBoqMetricsSuccess(state, action) {
      state.boqProgressLoading = false;
      state.error = null;
      state.metrics = action.payload;
    },
    gettingBoqMetricsFailure(state, action) {
      state.boqProgressLoading = false;
      state.error = action.payload;
      state.metrics = null;
    },
    gettingBoqProgressBySOW(state, action) {
      state.projectProgressDataLoading = true;
      state.error = null;
    },

    gettingBoqProgressBySOWSuccess(state, action) {
      state.projectProgressDataLoading = false;
      state.error = null;
      state.projectProgressData = action.payload;
    },
    gettingBoqProgressBySOWFailure(state, action) {
      state.projectProgressDataLoading = false;
      state.error = action.payload;
      state.projectProgressData = null;
    },

    gettingBoqProgressBudget(state, action) {
      state.projectBudgetLoading = true;
      state.error = null;
    },

    gettingBoqProgressBudgetSuccess(state, action) {
      state.projectBudgetLoading = false;
      state.error = null;
      state.projectBudgetData = action.payload;
    },
    gettingBoqProgressBudgetFailure(state, action) {
      state.projectBudgetLoading = false;
      state.error = action.payload;
      state.projectBudgetData = null;
    },
    gettingFinancialGraphData(state, action) {
      state.financialGraphLoading = true;
      state.error = null;
    },

    gettingFinancialGraphDataSuccess(state, action) {
      state.financialGraphLoading = false;
      state.error = null;
      state.financialGraphData = action.payload;
    },
    gettingFinancialGraphDataFailure(state, action) {
      state.financialGraphLoading = false;
      state.error = action.payload;
      state.financialGraphData = null;
    },
  },
});
const {
  gettingScopeList,
  gettingScopeListSuccess,
  gettingScopeListFailure,

  gettingUnitList,
  gettingUnitListSuccess,
  gettingUnitListFailure,

  addingBOQ,
  addingBOQSuccess,
  addingBOQFailure,

  gettingScopeListDetail,
  gettingScopeListDetailSuccess,
  gettingScopeListDetailFailure,

  gettingBoqList,
  gettingBoqListSuccess,
  gettingBoqListFailure,

  gettingBoqListGC,
  gettingBoqListGCSuccess,
  gettingBoqListGCFailure,

  addingProgress,
  addingProgressSuccess,
  addingProgressFailure,

  gettingBoqProgressGraph,
  gettingBoqProgressGraphSuccess,
  gettingBoqProgressGraphFailure,

  gettingBoqMetrics,
  gettingBoqMetricsSuccess,
  gettingBoqMetricsFailure,

  gettingBoqProgressBySOW,
  gettingBoqProgressBySOWSuccess,
  gettingBoqProgressBySOWFailure,

  gettingBoqProgressBudget,
  gettingBoqProgressBudgetSuccess,
  gettingBoqProgressBudgetFailure,

  gettingFinancialGraphData,
  gettingFinancialGraphDataSuccess,
  gettingFinancialGraphDataFailure,
} = productivitySlice.actions;

export const productivityReducer = (state) => state.productivity;

export const getScopeList = (token) => async (dispatch) => {
  dispatch(gettingScopeList());
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

export const getScopeListDetail = (token, scopeId) => async (dispatch) => {
  dispatch(gettingScopeListDetail());
  // if (projectId) {
  const response = await axios.get(
    `${base_url}/dashboard/Productivity/getscopedetaillist/${scopeId}`,
    {
      headers: {
        Authorization: token,
      },
    }
  );
  if (response?.status === 200) {
    dispatch(gettingScopeListDetailSuccess(response.data));
  } else {
    dispatch(
      gettingScopeListDetailFailure(
        "Something went wrong while getting scope detail list!"
      )
    );
  }
  return response;
};

export const getUnitList = (token) => async (dispatch) => {
  dispatch(gettingUnitList());
  // if (projectId) {
  const response = await axios.get(`${base_url}/dashboard/Unit/getall`, {
    headers: {
      Authorization: token,
    },
  });
  if (response?.status === 200) {
    dispatch(gettingUnitListSuccess(response.data));
  } else {
    dispatch(
      gettingUnitListFailure("Something went wrong while getting unit list!")
    );
  }
  return response;
};

export const addBOQ = (token, listObject) => async (dispatch) => {
  dispatch(addingBOQ());
  // if (projectId) {
  const response = await axios.post(
    `${base_url}/dashboard/Productivity/addupdateboq`,
    listObject,
    {
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    }
  );
  console.log("STATUS--->>>", response);
  if (response?.status === 200) {
    dispatch(addingBOQSuccess());
  } else {
    dispatch(addingBOQFailure("Something went wrong while sending BOQ list!"));
  }
  return response;
};

export const getBOQList =
  (token, projectId = 0, contractorId = 0, pageNumber = 1, pageSize = 50) =>
  async (dispatch) => {
    dispatch(gettingBoqList());
    // if (projectId) {
    const response = await axios.get(
      `${base_url}/dashboard/Productivity/getboqremainingprogresslist?projectId=${projectId}&pageNumber=${pageNumber}&pageSize=${pageSize}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    // console.log("BOQ LIST RESPONSE--->>>", response);
    if (response?.status === 200) {
      dispatch(gettingBoqListSuccess(response?.data));
    } else {
      dispatch(
        gettingBoqListFailure("Something went wrong while getting BOQ list!")
      );
    }
    return response;
  };

export const addProgress = (token, data) => async (dispatch) => {
  dispatch(addingProgress());
  const response = await axios.post(
    `${base_url}/dashboard/Productivity/addupdateboqprogress`,
    data,
    {
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    }
  );
  if (response?.status === 200) {
    dispatch(addingProgressSuccess());
  } else {
    dispatch(
      addingProgressFailure("Something went wrong while saving BOQ progress!")
    );
  }
  return response;
};

export const getBOQListGC =
  (projectId = 0, contractorId = 0, pageNumber = 1, pageSize = 50) =>
  async (dispatch) => {
    dispatch(gettingBoqListGC());
    // if (projectId) {
    const response = await axios.get(
      `${base_url}/dashboard/Productivity/getboqlist?projectId=${projectId}&contractorId=${contractorId}&pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
    if (response?.status === 200) {
      dispatch(gettingBoqListGCSuccess(response?.data));
    } else {
      dispatch(
        gettingBoqListGCFailure(
          "Something went wrong while getting BOQ GC list!"
        )
      );
    }
    return response;
  };

export const getBOQProgress =
  (token, projectId = 0, contractorId = 0) =>
  async (dispatch) => {
    dispatch(gettingBoqProgressGraph());
    const response = await axios.get(
      `${base_url}/dashboard/Productivity/graph/boqprogress?projectId=${projectId}&contractorId=${contractorId}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    if (response?.status === 200) {
      dispatch(gettingBoqProgressGraphSuccess(response?.data));
    } else {
      dispatch(
        gettingBoqProgressGraphFailure(
          "Something went wrong while getting BOQ Progress!"
        )
      );
    }
    return response;
  };

export const getBOQMetrics =
  (token, projectId = 0) =>
  async (dispatch) => {
    dispatch(gettingBoqMetrics());
    const response = await axios.get(
      `${base_url}/dashboard/Productivity/graph/boqmetrics?projectId=${projectId}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    if (response?.status === 200) {
      dispatch(gettingBoqMetricsSuccess(response?.data.result));
    } else {
      dispatch(
        gettingBoqMetricsFailure(
          "Something went wrong while getting BOQ Progress!"
        )
      );
    }
    return response;
  };

export const getProjectProgressGraph =
  (token, projectId = 0, contractorId = 0) =>
  async (dispatch) => {
    dispatch(gettingBoqProgressBySOW());
    const response = await axios.get(
      `${base_url}/dashboard/Productivity/graph/boqprogressbysow?projectId=${projectId}&contractorId=${contractorId}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    console.log('RESPONSE--->>>', response)
    if (response?.status === 200) {
      dispatch(gettingBoqProgressBySOWSuccess(response?.data.result));
    } else {
      dispatch(
        gettingBoqProgressBySOWFailure(
          "Something went wrong while getting BOQ Progress!"
        )
      );
    }
    return response;
  };

export const getProjectBudget =
  (projectId = 0) =>
  async (dispatch) => {
    dispatch(gettingBoqProgressBudget());
    const response = await axios.get(
      `${base_url}/dashboard/Productivity/graph/costdetails?projectId=${projectId}`
    );
    if (response?.status === 200) {
      dispatch(gettingBoqProgressBudgetSuccess(response?.data.result));
    } else {
      dispatch(
        gettingBoqProgressBudgetFailure(
          "Something went wrong while getting BOQ Progress!"
        )
      );
    }
    return response;
  };

export const getFinancialProgressData =
  (projectId = 0) =>
  async (dispatch) => {
    dispatch(gettingFinancialGraphData());
    const response = await axios.get(
      `${base_url}/dashboard/Productivity/graph/costbymonth?projectId=${projectId}`
    );
    if (response?.status === 200) {
      dispatch(gettingFinancialGraphDataSuccess(response?.data.result));
    } else {
      dispatch(
        gettingFinancialGraphDataFailure(
          "Something went wrong while getting BOQ Progress!"
        )
      );
    }
    return response;
  };

export default productivitySlice.reducer;
