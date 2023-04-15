import projectSlice from "./slices/projectSlice";
import jobSlice from "./slices/jobSlice";
import attendanceSlice from "./slices/attendanceSlice";
import workerSlice from "./slices/workerSlice";
import authSlice from "./slices/authSlice";
import paymentSlice from "./slices/paymentSlice";

const rootReducer = {
  projectSlice,
  jobSlice,
  attendanceSlice,
  workerSlice,
  paymentSlice,
};

export default rootReducer;
