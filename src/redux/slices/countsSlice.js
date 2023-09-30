import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { base_url } from "../../utils/api_constants";

const initialState = {
  loading: false,
  error: null,
  counts: null,
  workforce: null,
  mandays: null,
  workerSkill: null,
  attendanceTrendlineLoading: false,
  attendanceTrendline: null,
  contractorsStatsLoading: false,
  contractorsStats: null,
  paymentsLoading: false,
  payments: null,
};

const countsSlice = createSlice({
  name: "count",
  initialState,
  reducers: {
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
    gettingWorkforce(state, action) {
      // state.loading = true;
      state.error = null;
      state.workforce = null;
    },
    gettingWorkforceSuccess(state, action) {
      // state.loading = false;
      state.error = null;
      state.workforce = action.payload;
    },
    gettingWorkforceFailure(state, action) {
      // state.loading = false;
      state.error = action.payload;
      state.workforce = null;
    },
    gettingMandays(state, action) {
      // state.loading = true;
      state.error = null;
      state.mandays = null;
    },
    gettingMandaysSuccess(state, action) {
      // state.loading = false;
      state.error = null;
      state.mandays = action.payload;
    },
    gettingMandaysFailure(state, action) {
      // state.loading = false;
      state.error = action.payload;
      state.mandays = null;
    },
    gettingWorkerSkills(state, action) {
      // state.loading = true;
      state.error = null;
      state.workerSkill = null;
    },
    gettingWorkerSkillsSuccess(state, action) {
      // state.loading = false;
      state.error = null;
      state.workerSkill = action.payload;
    },
    gettingWorkerSkillsFailure(state, action) {
      // state.loading = false;
      state.error = action.payload;
      state.atten = null;
    },
    gettingAttendanceTrendline(state, action) {
      state.attendanceTrendlineLoading = true;
      state.error = null;
      state.attendanceTrendline = null;
    },
    gettingAttendanceTrendlineSuccess(state, action) {
      state.attendanceTrendlineLoading = false;
      state.error = null;
      state.attendanceTrendline = action.payload;
    },
    gettingAttendanceTrendlineFailure(state, action) {
      state.attendanceTrendlineLoading = false;
      state.error = action.payload;
      state.attendanceTrendline = null;
    },
    gettingContractorsStats(state, action) {
      state.contractorsStatsLoading = true;
      state.error = null;
      state.contractorsStats = null;
    },
    gettingContractorsStatsSuccess(state, action) {
      state.contractorsStatsLoading = false;
      state.error = null;
      state.contractorsStats = action.payload;
    },
    gettingContractorsStatsFailure(state, action) {
      state.contractorsStatsLoading = false;
      state.error = action.payload;
      state.contractorsStats = null;
    },

    gettingPayments(state, action) {
      state.paymentsLoading = true;
      state.error = null;
      state.payments = null;
    },
    gettingPaymentsSuccess(state, action) {
      state.paymentsLoading = false;
      state.error = null;
      state.payments = action.payload;
    },
    gettingPaymentsFailure(state, action) {
      state.paymentsLoading = false;
      state.error = action.payload;
      state.payments = null;
    },
  },
});
const {
  gettingCountData,
  gettingCountDataSuccess,
  gettingCountDataFailure,
  gettingWorkforce,
  gettingWorkforceSuccess,
  gettingWorkforceFailure,
  gettingMandays,
  gettingMandaysSuccess,
  gettingMandaysFailure,
  gettingWorkerSkills,
  gettingWorkerSkillsSuccess,
  gettingWorkerSkillsFailure,
  gettingAttendanceTrendline,
  gettingAttendanceTrendlineSuccess,
  gettingAttendanceTrendlineFailure,
  gettingContractorsStats,
  gettingContractorsStatsSuccess,
  gettingContractorsStatsFailure,
  gettingPayments,
  gettingPaymentsSuccess,
  gettingPaymentsFailure,
} = countsSlice.actions;
export const countReducer = (state) => state.count;

// export const getCountsData = () => async (dispatch) => {
//   dispatch(gettingCountData());
//   try {
//     const response = await axios.get(`${config.baseUrl}/Dashboard/stats/count`);
//     if (response.status === 200) {
//       dispatch(gettingCountDataSuccess(response.data));
//     }
//     return response;
//   } catch (e) {
//     dispatch(
//       gettingCountDataFailure("Something went wrong while getting count data!")
//     );
//   }
// };

export const getWorkeforce = (projectId) => async (dispatch) => {
  dispatch(gettingWorkforce());
  try {
    const response = await axios.get(
      `${base_url}/Dashboard/stats/workforce?projectId=${projectId}`
    );
    if (response.status === 200) {
      dispatch(gettingWorkforceSuccess(response.data));
    }
    return response;
  } catch (e) {
    dispatch(
      gettingWorkforceFailure(
        "Something went wrong while getting workforce data!"
      )
    );
  }
};
export const getMandays = (projectId) => async (dispatch) => {
  dispatch(gettingMandays());
  try {
    const response = await axios.get(
      `${base_url}/Dashboard/stats/mandays?projectId=${projectId}`
    );
    if (response.status === 200) {
      dispatch(gettingMandaysSuccess(response.data));
    }
    return response;
  } catch (e) {
    dispatch(
      gettingMandaysFailure("Something went wrong while getting mandays data!")
    );
  }
};
export const getWorkerSkills =
  (token, startDate, endDate, projectId) => async (dispatch) => {
    dispatch(gettingWorkerSkills());
    try {
      const response = await axios.get(
        `${base_url}/Dashboard/stats/workerskill?startDate=${startDate}&endDate=${endDate}&projectId=${projectId}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (response.status === 200) {
        dispatch(gettingWorkerSkillsSuccess(response.data));
      }
      return response;
    } catch (e) {
      dispatch(
        gettingWorkerSkillsFailure(
          "Something went wrong while getting workerskill data!"
        )
      );
    }
  };

export const getAttendanceTrendline =
  (token, projectId, startDate, endDate, createdBy = 0) =>
  async (dispatch) => {
    dispatch(gettingAttendanceTrendline());
    try {
      const response = await axios.get(
        `${base_url}/Dashboard/stats/attendancetrendline?projectId=${projectId}&startDate=${startDate}&endDate=${endDate}&createdBy=${createdBy}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (response.status === 200) {
        dispatch(gettingAttendanceTrendlineSuccess(response.data));
      }
      return response;
    } catch (e) {
      dispatch(
        gettingAttendanceTrendlineFailure(
          "Something went wrong while getting attendance trendline data!"
        )
      );
    }
  };

export const getContractorsStats =
  (token, projectId, startDate, endDate, createdBy = 0) =>
  async (dispatch) => {
    dispatch(gettingContractorsStats());
    try {
      const response = await axios.get(
        `${base_url}/Dashboard/stats/contractors?projectId=${projectId}&startDate=${startDate}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (response.status === 200) {
        dispatch(gettingContractorsStatsSuccess(response?.data));
      }
      return response;
    } catch (e) {
      dispatch(
        gettingContractorsStatsFailure(
          "Something went wrong while getting attendance contractors data!"
        )
      );
    }
  };

export const getPayments =
  (token, projectId, startDate, endDate, createdBy = 0) =>
  async (dispatch) => {
    dispatch(gettingPayments());
    try {
      const response = await axios.get(
        `${base_url}/Dashboard/stats/payments?projectId=${projectId}&startDate=${startDate}&endDate=${endDate}&createdBy=${createdBy}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (response.status === 200) {
        dispatch(gettingPaymentsSuccess(Object.values(response?.data)));
      }
      return response;
    } catch (e) {
      dispatch(
        gettingPaymentsFailure(
          "Something went wrong while getting attendance contractors data!"
        )
      );
    }
  };

export default countsSlice.reducer;
