import axios from "axios";
import { baseUrl } from "../utils/api_constants";

const API = axios.create({
  baseURL: baseUrl,
  timeout: 100000,
});

// API response handler
const handleApiResponse = (response) => {
  // console.log("API RESPONSE HANDLER--->>>", response?.data);
  // console.log("API RESPONSE OK--->>>", response?.status, response?.ok);
  if (response?.status >= 200 && response?.status < 300) {
    console.log("API ROUTE--->>>", response.request.responseURL);
    return response?.data;
  } else {
    throw new Error(response?.data || "API Error");
  }
};

// API error handler
const handleApiError = (error) => {
  console.log("API ERROR HANDLER--->>>", error?.data);
  if (error.status >= 400 && error.status < 500) {
    console.error("API ERROR:", {
      route: error.request?.responseURL,
      error: error.data?.error || error.data?.message,
    });
    if (error.data.error) {
      throw new Error(error.data?.error);
    } else {
      throw new Error(error.data.message);
    }
  } else if (error.request) {
    console.error("API Error Request:", error.request?.response);
    throw new Error("Network Error");
  } else {
    console.error("API Error Message:", error.message);
    throw new Error(error.message);
  }
};

// Reusable API call function
export const apiCall = async (
  method,
  url,
  object = null,
  token = "",
  multipart = false
) => {
  try {
    const headers = {};
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
    if (multipart) {
      headers["Content-Type"] = "multipart/form-data";
    }
    const response = await API.request({
      method,
      url,
      object,
      headers,
    });
    return handleApiResponse(response);
  } catch (error) {
    return handleApiError(error.response);
  }
};
