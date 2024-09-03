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
  boqListGCViewMode: [],
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
    gettingBoqListGCViewMode(state, action) {
      state.loading = true;
      state.error = null;
    },
    gettingBoqListGCSuccessViewMode(state, action) {
      state.loading = false;
      state.error = null;
      state.boqListGCViewMode = action.payload?.map((item) => ({
        ...item,
        scopeOfWorkName: state.scopeList.filter(
          (scope) => scope.scopeOfWorkId === item.scopeOfWorkId
        )?.[0]?.name,
      }));
    },
    gettingBoqListGCFailureViewMode(state, action) {
      state.loading = false;
      state.error = null;
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

  gettingBoqListGCViewMode,
  gettingBoqListGCSuccessViewMode,
  gettingBoqListGCFailureViewMode,
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
  console.log("RESPONSE--->>>", response);
  // console.log("STATUS--->>>", response);
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

// export const getBOQListGC =
//   (token, projectId = 0, contractorId = 0, pageNumber = 1, pageSize = 50) =>
//   async (dispatch) => {
//     dispatch(gettingBoqListGC());
//     // if (projectId) {
//     const response = await axios.get(
//       `${base_url}/dashboard/Productivity/getboqprogresslist?projectId=${projectId}&contractorId=${contractorId}&pageNumber=${pageNumber}&pageSize=${pageSize}`,
//       {
//         headers: {
//           Authorization: token,
//         },
//       }
//     );
//     if (response?.status === 200) {
//       dispatch(gettingBoqListGCSuccess(response?.data));
//     } else {
//       dispatch(
//         gettingBoqListGCFailure(
//           "Something went wrong while getting BOQ GC list!"
//         )
//       );
//     }
//     return response;
//   };

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
    // console.log("RESPONSE--->>>", response);
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
  (token, projectId = 0) =>
  async (dispatch) => {
    dispatch(gettingBoqProgressBudget());
    const response = await axios.get(
      `${base_url}/dashboard/Productivity/graph/costdetails?projectId=${projectId}`,
      {
        headers: {
          Authorization: token,
        },
      }
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
  (token, projectId = 0) =>
  async (dispatch) => {
    dispatch(gettingFinancialGraphData());
    const response = await axios.get(
      `${base_url}/dashboard/Productivity/graph/costbymonth?projectId=${projectId}`,
      {
        headers: {
          Authorization: token,
        },
      }
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

export const verifyBOQProgress = (token, data) => async (dispatch) => {
  dispatch(gettingFinancialGraphData());
  const response = await axios.put(
    `${base_url}/dashboard/Productivity/verifyprogress`,
    data,
    {
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    }
  );
  if (response?.status === 200) {
    // dispatch(gettingFinancialGraphDataSuccess(response?.data.result));
  } else {
    dispatch(
      gettingFinancialGraphDataFailure(
        "Something went wrong while getting BOQ Progress!"
      )
    );
  }
  return response;
};

export const rejectBOQProgress = (token, data) => async (dispatch) => {
  console.log("REJECTING BOQ PROGRESS", data);
  dispatch(gettingFinancialGraphData());
  const response = await axios.put(
    `${base_url}/dashboard/Productivity/rejectprogress`,
    data,
    {
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    }
  );
  console.log("RESPONSE--->>>", response);
  if (response?.status === 200) {
    dispatch(gettingFinancialGraphDataSuccess());
  } else {
    dispatch(
      gettingFinancialGraphDataFailure(
        "Something went wrong while getting BOQ Progress!"
      )
    );
  }
  return response;
};

export const approveBOQMeasurementReason =
  (token, data) => async (dispatch) => {
    dispatch(gettingFinancialGraphData());
    const response = await axios.put(
      `${base_url}/dashboard/Productivity/approveprogressreason`,
      data,
      {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      }
    );
    if (response?.status === 200) {
      dispatch(gettingFinancialGraphDataSuccess());
    } else {
      dispatch(
        gettingFinancialGraphDataFailure(
          "Something went wrong while getting BOQ Progress!"
        )
      );
    }
    return response;
  };

export const getListOfBOQ =
  (
    token,
    projectId = 0,
    contractorId = 0,
    pageNumber = 1,
    pageSize = 50,
    sortBy = "",
    orderBy = ""
  ) =>
  async (dispatch) => {
    dispatch(gettingBoqListGC());
    // if (projectId) {
    const response = await axios.get(
      `${base_url}/dashboard/Productivity/getboqlist?projectId=${projectId}&contractorId=${contractorId}&pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}&orderBy=${orderBy}`,
      {
        headers: {
          Authorization: token,
        },
      }
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

export const getListOfBOQV2 =
  (
    token,
    projectId = 0,
    contractorId = 0,
    pageNumber = 1,
    pageSize = 50,
    sortBy = "",
    orderBy = ""
  ) =>
  async (dispatch) => {
    dispatch(gettingBoqListGCViewMode());
    // if (projectId) {
    const response = await axios.get(
      `${base_url}/dashboard/Productivity/getboqlist/v2?projectId=${projectId}&contractorId=${contractorId}&pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}&orderBy=${orderBy}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    if (response?.status === 200) {
      dispatch(
        gettingBoqListGCSuccessViewMode(
          response?.data.map((item) => ({
            ...item,
            boQs: item.boQs.map((param) => ({
              ...param,
              titles: param.titles.map((param1) => ({
                ...param1,
                totalAmount: param1.descriptions.reduce(
                  (accumulator, currentValue) =>
                    accumulator + currentValue.amount,
                  0
                ),
                totalAcutalAmount: param1.descriptions.reduce(
                  (accumulator, currentValue) =>
                    accumulator + currentValue.actualAmount,
                  0
                ),
                descriptions: param1.descriptions.map((param2) => ({
                  ...param2,
                  percentage:
                    (param2.amount / param2.actualAmount) * 100 === Infinity
                      ? 0
                      : (param2.amount / param2.actualAmount) * 100,
                })),
              })),
            })),
          }))
        )
      );

      // ({ ...item, boQs: item.boQs.map(param => ({ ...param, titles: param.titles.map(param1 => param1.descriptions.map(param2 => ({(...param2.amount / param2.actualAmount) * 100 === Infinity ? 0))})})})))));
    } else {
      dispatch(
        gettingBoqListGCFailureViewMode(
          "Something went wrong while getting BOQ GC list!"
        )
      );
    }
    return response;
  };

export const getBOQListGC =
  (
    token,
    projectId = 0,
    contractorId = 0,
    pageNumber = 1,
    pageSize = 1000,
    QualityStatusFilter = "",
    IsHistory = false,
    searchQuery = ""
  ) =>
  async (dispatch) => {
    console.log("GETTING BOQ LIST GC", projectId);
    dispatch(gettingBoqListGC());

    const url = `${base_url}/dashboard/Productivity/getboqprogresslist/v2?projectId=${projectId}&contractorId=${contractorId}&pageNumber=${pageNumber}&pageSize=${pageSize}&QualityStatusFilter=${QualityStatusFilter}&isHistory=${IsHistory}&search=${searchQuery}`;

    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: token,
        },
      });
      console.log("RESPONSE URL --->>>", response.request.responseURL);
      if (response?.status === 200) {
        dispatch(gettingBoqListGCSuccess(response?.data.result?.sowList));
      } else {
        dispatch(
          gettingBoqListGCFailure(
            "Something went wrong while getting BOQ GC list!"
          )
        );
      }
      return response;
    } catch (error) {
      console.error("Error fetching BOQ list GC:", error);
      dispatch(
        gettingBoqListGCFailure(
          "Something went wrong while getting BOQ GC list!"
        )
      );
      throw error;
    }
  };
export default productivitySlice.reducer;
