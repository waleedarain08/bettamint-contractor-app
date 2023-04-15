import projectSlice from "./slices/projectSlice";
import jobSlice from "./slices/jobSlice";
import attendanceSlice from "./slices/attendanceSlice";
import workerSlice from "./slices/workerSlice";
import authSlice from "./slices/authSlice";

const rootReducer = {
  projectSlice,
  jobSlice,
  attendanceSlice,
  workerSlice,
  authSlice,
};

export default rootReducer;
