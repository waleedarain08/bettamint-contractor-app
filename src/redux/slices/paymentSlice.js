import { createSlice } from "@reduxjs/toolkit";
import {
  ATTENDANCE_GETALL_URL,
  PAYMENT_GETALL_URL,
  base_url,
  responseHandler,
} from "../../utils/api_constants";
import APIServiceManager from "../../services/APIservicemanager";
import axios from "axios";

const initialState = {
  loading: false,
  error: null,
  paymentsHistoryList: null,
  paymentList: null,
};

const api = new APIServiceManager();
const paymentSlice = createSlice({
  name: "payments",
  initialState,
  reducers: {
    getPaymentRequest: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    getPaymentSuccess: (state, action) => {
      state.paymentsHistoryList = action.payload;
      state.loading = false;
    },
    getPaymentFailure: (state, action) => {
      state.paymentsHistoryList = null;
      state.loading = false;
      state.error = action.payload;
    },
    getPaymentListRequest: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    getPaymentListSuccess: (state, action) => {
      state.paymentList = action.payload;
      state.loading = false;
    },
    getPaymentListFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    paymentProcessRequest: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    paymentProcessSuccess: (state, action) => {
      state.loading = false;
    },
    paymentProcessFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

const {
  getPaymentRequest,
  getPaymentSuccess,
  getPaymentFailure,
  paymentProcessRequest,
  paymentProcessSuccess,
  paymentProcessFailure,
  getPaymentListRequest,
  getPaymentListSuccess,
  getPaymentListFailure,
} = paymentSlice.actions;

export const paymentsListReducer = (state) =>
  state?.payment?.paymentsHistoryList;
export const allPaymentsListReducer = (state) => state?.payment?.paymentList;
export const loadingPayments = (state) => state?.payment?.loading;
export const errorPayment = (state) => state?.payment?.error;
export const paymentProcessListReducer = (state) =>
  state?.payment?.paymentProcessList;

export const getPaymentHistory =
  (token, projectId, startDate, endDate) => async (dispatch) => {
    dispatch(getPaymentRequest());
    // if (projectId) {
    try {
      const response = await axios.get(
        `${base_url}/dashboard/Payment/history?projectId=${projectId}&startDate=${startDate}&endDate=${endDate}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (response?.status === 200) {
        dispatch(getPaymentSuccess(response.data));
      } else {
        dispatch(
          getPaymentFailure(
            "Something went wrong while getting payment history!"
          )
        );
        dispatch(getPaymentSuccess(null));
      }
      return response;
    } catch (e) {
      console.log("EROR", e);
      dispatch(
        getPaymentFailure("Something went wrong while getting payment history!")
      );
      dispatch(getPaymentSuccess(null));
      return e;
    }
  };

export const paymentProcess =
  (token, jobId, workerId, transactionType) => async (dispatch) => {
    dispatch(paymentProcessRequest());
    try {
      const response = await axios.post(
        `${base_url}/dashboard/Payment/process?jobId=${jobId}&workerId=${workerId}&transactionType=${transactionType}`,
        null,
        {
          headers: {
            Authorization: token,
            Accept: "text/plain",
          },
        }
      );
      if (response?.status === 200) {
        dispatch(paymentProcessSuccess(response.data));
      }
    } catch (e) {
      console.log("ERROR PROCESS", e.response?.data?.error);
      // alert(e.response?.data?.error);
      dispatch(paymentProcessFailure(e.response?.data?.error));
      return e;
    }
  };

export const getAllPaymentsAction =
  (token, projectId, contractorId) => async (dispatch) => {
    try {
      dispatch(getPaymentListRequest());
      await api
        .request(
          "GET",
          ATTENDANCE_GETALL_URL +
            `?projectId=${projectId}&createdBy=${contractorId || 0}`,
          null,
          {
            Authorization: token,
          }
        )
        .then((res) => {
          const data = responseHandler(res);
          if (data) {
            dispatch(getPaymentListSuccess(data));
          }
        })
        .catch((error) => {
          console.log("PAYMENT LIST ERROR", error);
          dispatch(getPaymentListFailure());
        });
    } catch (error) {
      dispatch(getPaymentListFailure());
    }
  };
export default paymentSlice.reducer;
