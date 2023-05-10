export const base_url = "https://api-sandbox.bettamint.com/api";
export const assetsUrl = "https://api-sandbox.bettamint.com";

// export const base_url = "https://api-prod.bettamint.com/api";
// export const assetsUrl = 'https://api-prod.bettamint.com';

// MAP URL
export const mapUrl = "https://admin.bettamint.com/auth/view";

// API URL ROUTES
export const PROJECT_GETALL_URL = "dashboard/Project/getall";
export const JOB_GETALL_URL = "dashboard/Job/getall";
export const UPDATE_PROJECT_URL = "dashboard/Project/addupdateproject";
export const ATTENDANCE_GETALL_URL = "dashboard/Attendance/getbyproject";
export const PROJECT_GETALL_SIMPLE = "dashboard/Project/getallsimple";
export const PROJECT_FOR_MAPPING_URL = "dashboard/Project/getformapping";
export const PROJECT_USER_LIST_URL = "dashboard/User/project";
export const WORKER_GETALL_URL = "Dashboard/worker";
export const UPDATE_WORKER_URL = "Dashboard/worker/addupdateworker";
export const GET_SKILLS_URL = "app/Skills";
export const ATTENDANCE_MUSTER_URL = "dashboard/Attendance/mustercard";
export const ATTENDANCE_APPROVE_URL = "dashboard/Attendance/approve";
export const ATTENDANCE_REPORT_URL = "dashboard/Attendance/getbyprojectreport";
export const JOB_CREATE_URL = "dashboard/Job/createjob";
export const PAYMENT_GETALL_URL = "dashboard/Payment/history";
// RESPONSE HANDLER FOR APIs
export const responseHandler = (response) => {
	if (response && response?.data && response?.status === 200) {
		return response.data;
	}
};

// GOOGLE API KEY
export const GOOGLE_API_KEY = "AIzaSyDmPu3_XheAsKf93Ab3pwbLU_ri9nmg5XM";
