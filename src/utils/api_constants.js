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
export const UPDATE_PROJECT_URL = "dashboard/Project/addupdateproject";
export const ATTENDANCE_GETALL_URL = "dashboard/Attendance/getall";
export const PROJECT_GETALL_SIMPLE = "dashboard/Project/getallsimple";
export const WORKER_GETALL_URL = "Dashboard/worker";
export const UPDATE_WORKER_URL = "Dashboard/worker/addupdateworker";
export const GET_SKILLS_URL = "app/Skills";

// RESPONSE HANDLER FOR APIs
export const responseHandler = (response) => {
	if (response && response?.data && response?.status === 200) {
		return response.data;
	}
};

// GOOGLE API KEY
export const GOOGLE_API_KEY = "AIzaSyDmPu3_XheAsKf93Ab3pwbLU_ri9nmg5XM";
