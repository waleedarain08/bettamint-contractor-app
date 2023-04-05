export const base_url = "https://api-sandbox.bettamint.com/api";
export const assetsUrl = "https://api-sandbox.bettamint.com";

// export const base_url = "https://api-prod.bettamint.com/api";
// export const assetsUrl = 'https://api-prod.bettamint.com';

// STATIC AUTH TOKEN
export const staticToken =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU2IiwibmJmIjoxNjgwNjM5NzE1LCJleHAiOjE2ODE1MDM3MTUsImlhdCI6MTY4MDYzOTcxNX0.y3UzWdIchnRh6spJrLA2_U3gU8WABjpsDTojTP4O9jE";

// API URL ROUTES
export const PROJECT_GETALL_URL = "dashboard/Project/getall";
export const JOB_GETALL_URL = "dashboard/Job/getall";
export const UPDATE_PROJECT_URL = "dashboard/Product/addupdateproject";

// RESPONSE HANDLER FOR APIs
export const responseHandler = (response) => {
	if (response && response?.data && response?.status === 200) {
		return response.data;
	}
};
