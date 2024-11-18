// export const base_url = "https://api-sandbox.bettamint.com/api";
// export const baseUrl = "https://api-sandbox.bettamint.com/api";
// export const assetsUrl = "https://api-sandbox.bettamint.com";

export const base_url = "https://api-prod.bettamint.com/api";
export const baseUrl = "https://api-prod.bettamint.com/api";
export const assetsUrl = "https://api-prod.bettamint.com";

// MAP URL
export const mapUrl = "https://admin.bettamint.com/auth/view";

// API URL ROUTES
export const PROJECT_GETALL_URL = "dashboard/Project/getall";
export const JOB_GETALL_URL = "dashboard/Job/getall";
export const UPDATE_PROJECT_URL = "dashboard/Project/addupdateproject";
export const ATTENDANCE_GETALL_URL = "dashboard/Attendance/getbyproject/v2";
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
export const PAYMENT_HISTORY_URL = "dashboard/Payment/process";
// RESPONSE HANDLER FOR APIs
export const responseHandler = (response) => {
  if (response && response?.data && response?.status === 200) {
    return response.data;
  }
};

// GOOGLE API KEY
export const GOOGLE_API_KEY = "AIzaSyDmPu3_XheAsKf93Ab3pwbLU_ri9nmg5XM";

// LC account :
// Bbal9644@gmail.com
// DpdME7Skc5lD0hd

// GC account :
// chiranjeevikm@k2kinfra.net
// HjmPHylNqEWF3VP

export const API = {
  // Auth Routes
  login: `${base_url}/dashboard/User/Login`,
  register: `${base_url}/dashboard/Lead`,
  // General Routes
  getProjects: `${base_url}/dashboard/Project/getallsimple`,
  getStatsCount: `${base_url}/Dashboard/stats/count`,
  getAttendanceGraphData: `${base_url}/Dashboard/stats/attendancetrendline`,
  getPaymentsGraphData: `${base_url}/Dashboard/stats/payments`,
  getContractorsGraphData: `${base_url}/Dashboard/stats/contractors`,
  getWorkersSkill: `${base_url}/Dashboard/stats/workerskill`,
  getFinancialCount: `${base_url}/Dashboard/stats/financial-progress-metrics`,
  getWorkForceMetrics: `${base_url}/Dashboard/stats/workforce-metrics`,
  getLabourTurnoverMetrics: `${base_url}/Dashboard/stats/labour-turnover-metrics`,
  getLabourExpenseMetrics: `${base_url}/Dashboard/stats/labour-expense-metrics`,
  getProjectBudgetGraphData: `${base_url}/dashboard/Productivity/graph/costdetails`,
  getFinancialProgressGraphData: `${base_url}/dashboard/Productivity/graph/costbymonth`,
  getSkills: `${base_url}/app/Skills`,
  getUsers: `${base_url}/dashboard/User/getall`,
  getLabourContractors: `${base_url}/dashboard/User/labourcontractor`,
  getScopeList: `${base_url}/dashboard/Productivity/getscopelist`,
  getUnitList: `${base_url}/dashboard/Unit/getall`,
  // Attendance Routes
  getAttendance: `${base_url}/dashboard/Attendance/getbyproject/v2`,
  getAttendanceMusterCard: `${base_url}/dashboard/Attendance/mustercard`,
  approveAttendance: `${base_url}/dashboard/Attendance/approve-attendance`,
  markAttendance: `${base_url}/dashboard/Attendance/markattendance`,
  // Worker Routes
  delistWorker: `${base_url}/dashboard/Job/delist`,
  // Job Routes
  getJobs: `${base_url}/dashboard/Job/getall`,
  completeJob: `${base_url}/dashboard/Job/complete`,
  createJob: `${base_url}/dashboard/Job/createjob`,
  // Project Routes
  getAllProjects: `${base_url}/dashboard/Project/getall`,
  getMappingProjects: `${base_url}/dashboard/Project/getformapping`,
  getLabourProjects: `${base_url}/dashboard/User/project`,
  createProject: `${base_url}/dashboard/Project/addupdateproject`,
  // Worker Routes
  getWorkers: `${base_url}/Dashboard/worker`,
  createWorker: `${base_url}/dashboard/worker/addupdateworker`,
  // Roles Routes
  getFeatureSetV2: `${base_url}/dashboard/FeatureSet/access-rights`,
  getFeatures: `${base_url}/dashboard/FeatureSet`,
  getRoles: `${base_url}/dashboard/Role`,
  createRole: `${base_url}/dashboard/Role`,
  createUser: `${base_url}/dashboard/User/addupdateuser`,
  // Field Note Routes
  getFieldNotes: `${base_url}/dashboard/FieldNote`,
  getFieldNotesByProject: `${base_url}/dashboard/FieldNote/project`,
  getFieldNoteCosts: `${base_url}/dashboard/FieldNote/getcostcodes`,
  createFieldNote: `${base_url}/dashboard/FieldNote`,
  deleteFieldNote: `${base_url}/dashboard/FieldNote`,
  markFieldNoteAction: `${base_url}/dashboard/FieldNote/action`,
  verifyFieldNote: `${base_url}/dashboard/FieldNote/verify`,
  assignContractor: `${base_url}/dashboard/FieldNote/contractor`,
};
