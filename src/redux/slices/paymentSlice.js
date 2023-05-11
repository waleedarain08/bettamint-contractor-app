import { createSlice } from "@reduxjs/toolkit";
import {
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
} = paymentSlice.actions;

export const paymentsListReducer = (state) =>
	state?.payment?.paymentsHistoryList;
export const loadingPayments = (state) => state?.payment?.loading;
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
			//   console.log("PAYMENT RESPONSE", response.data);
			if (response?.status === 200) {
				dispatch(getPaymentSuccess(response.data));
			} else {
				dispatch(
					getPaymentFailure(
						"Something went wrong while getting payment history!"
					)
				);
			}
			return response;
		} catch (e) {
			console.log("EROR", e);
			dispatch(
				getPaymentFailure("Something went wrong while getting payment history!")
			);
		}
	};
export const paymentProcess =
	(token, jobId, workerId, transactionType) => async (dispatch) => {
		dispatch(paymentProcessRequest());
		// if (projectId) {
		try {
			const response = await axios.get(
				`${base_url}/dashboard/Payment/process?jobId=${jobId}&WorkerId=${workerId}&transactionType=${transactionType}`,
				{
					headers: {
						Authorization: token,
					},
				}
			);
			//   console.log("PAYMENT RESPONSE", response.data);
			if (response?.status === 200) {
				dispatch(paymentProcessSuccess(response.data));
			} else {
				dispatch(
					paymentProcessFailure(
						"Something went wrong while processing payment!"
					)
				);
			}
			return response;
		} catch (e) {
			console.log("EROR", e);
			dispatch(
				paymentProcessFailure("Something went wrong while processing payment!")
			);
		}
	};

export default paymentSlice.reducer;
