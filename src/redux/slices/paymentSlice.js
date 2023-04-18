import { createSlice } from "@reduxjs/toolkit";
import {
	PAYMENT_GETALL_URL,
	responseHandler,
} from "../../utils/api_constants";
import APIServiceManager from "../../services/APIservicemanager";

const initialState = {
	loading: false,
	error: null,
	paymentsList: null,
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
			state.paymentsList = action.payload;
			state.loading = false;
		},
		getPaymentFailure: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
	},
});

const { getPaymentRequest, getPaymentSuccess, getPaymentFailure } =
	paymentSlice.actions;

export const paymentsListReducer = (state) => state?.paymentSlice?.paymentsList;
export const loadingPayments = (state) => state?.paymentSlice?.loading;
export const getPaymentsAction = (token) => async (dispatch) => {
	try {
		dispatch(getPaymentRequest());
		await api
			.request("GET", PAYMENT_GETALL_URL, null, {
				Authorization: token,
			})
			.then((res) => {
				const data = responseHandler(res);
				// console.log("Payment DATA", data);
				if (data) {
					dispatch(getPaymentSuccess(data));
				}
			})
			.catch((error) => {
				console.log("ERROR", error);
				dispatch(getPaymentFailure());
			});
	} catch (error) {
		dispatch(getPaymentFailure());
	}
};

export default paymentSlice.reducer;
