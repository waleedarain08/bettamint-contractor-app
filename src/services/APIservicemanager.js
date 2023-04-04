import axios from "axios";
import { base_url } from "../utils/api_constants";
// import { store } from "../redux/reducers";
// import {showMessage} from 'react-native-flash-message';
import AsyncStorage from "@react-native-async-storage/async-storage";

const host = base_url;
const apiUrl = host; // + "/api";
// const storeState = store.getState();

const dataVerbs = ["POST", "PUT", "DELETE"];
// const token = storeState.auth.token ? storeState.auth.token : null;
// let token = null;
// AsyncStorage.getItem('userToken').then(value => token=value);

const defaultConfig = {
	authenticate: true,
	silent: false,
	token: null,
};

export default class APIServiceManager {
	constructor(config) {
		this.config = {
			...defaultConfig,
			...config,
		};
		this.primaryHeaders = {
			Accept: "application/json",
		};
		if (this.config.authenticate) {
			// this.primaryHeaders['Authorization'] = `Bearer ${this.config.token}`;
			this.primaryHeaders["Content-Type"] = "application/json";
		}
	}

	request = async (method, route, data = {}, additionalHeaders = {}) => {
		let token = JSON.parse(await AsyncStorage.getItem("userToken"));

		const accessToken = token ? token : null;

		// this.primaryHeaders['Authorization'] = `Bearer ${accessToken}`;
		return new Promise((resolve, reject) => {
			let apiCall;
			route = this.clean(route);
			method = method.toUpperCase();
			const value = dataVerbs.indexOf(method);
			console.log("VALUE", value);
			switch (value) {
				case 0:
					console.log("header", {
						...this.primaryHeaders,
						...additionalHeaders,
					});
					console.log("ROUTE", apiUrl + "/" + route);
					apiCall = axios(apiUrl + "/" + route, {
						method: "post",
						headers: {
							...this.primaryHeaders,
							...additionalHeaders,
						},
						data: data,
						timeout: 10000,
					});
					break;
				case 1:
					apiCall = axios(apiUrl + "/" + route, {
						method: "PUT",
						headers: {
							...this.primaryHeaders,
							...additionalHeaders,
						},
						data: data,
						timeout: 10000,
					});
					break;

				case 2:
					apiCall = axios.delete(apiUrl + "/" + route.split("/")[0], {
						params: { id: route.split("/")[1] },
						headers: {
							...this.primaryHeaders,
							...additionalHeaders,
						},
						redirect: "follow",
					});

				default:
					console.log("ROUTE", apiUrl + "/" + route);
					apiCall = axios(apiUrl + "/" + route, {
						method,
						headers: {
							...this.primaryHeaders,
							...additionalHeaders,
						},
						params: data,
					});
					break;
			}
			apiCall
				.then((response) => {
					resolve(response);
				})
				.catch((error) => {
					console.log("error in service", error);
					if (error.response) {
						if (error.response.status === 400) {
							// this.forceLogin();
							// alert(JSON.stringify(error.response))
							reject({
								error: error?.response?.data?.message,
								code: error.response.status,
								offline: false,
							});
							return;
						}
						if (error.response.status === 401) {
							this.forceLogin();
							reject({
								error: error?.response?.data?.message,
								code: error.response.status,
								offline: false,
							});
							return;
						}
						if (error.response.status === 404) {
							// showMessage({
							//   message:
							//     "404 Not Found: The server can not find the requested data.",
							//   type: 'danger'
							// });
							reject({
								error: error?.response?.data?.message,
								code: error.response.status,
								offline: false,
							});
							return;
						}
						if (error.response.status === 500) {
							// showMessage({
							//   message:
							//     "500 Internal Server Error: The request was not completed. The server met an unexpected condition.",
							//   type:'danger'
							// });
							reject({
								error: error?.response?.data?.message,
								code: error.response.status,
								offline: false,
							});
							return;
						}
						if (error.response.status === 401) {
							// showMessage({
							//   message: "You have been logged out. Please log in again.",
							// });
							reject({
								error: error?.response?.data?.message,
								code: error.response.status,
								offline: false,
							});
							return;
						}
						console.log("this.config.silent");
						if (!this.config.silent) {
							if (
								error.response.status === 422 &&
								typeof error.response.data.message !== "undefined"
							) {
								errors = error.response.data.error;
							}
							reject({
								error: error?.response?.data?.message,
								code: error.response.status,
								offline: false,
							});
						}
					} else {
						reject({
							error: "Oops! No Internet Connection",
							code: 500,
						});
					}
				});

			return this;
		});
	};

	forceLogin = () => {
		// Destroy all local data and force the user to log in
		// store.dispatch(getAccessToken());
	};

	clean = (urlSegment) => {
		urlSegment = urlSegment.endsWith("/")
			? urlSegment.slice(0, -1)
			: urlSegment;
		urlSegment = urlSegment.startsWith("/") ? urlSegment.slice(1) : urlSegment;
		return urlSegment;
	};
}
