import { combineReducers, configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import rootReducer from "./rootReducer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistReducer } from "redux-persist";
import projectSlice from "./slices/projectSlice";
import jobSlice from "./slices/jobSlice";
import attendanceSlice from "./slices/attendanceSlice";
import workerSlice from "./slices/workerSlice";
import authSlice from "./slices/authSlice";
import userSlide from "./slices/userSlice";
import paymentSlice from "./slices/paymentSlice";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  blacklist: ["auth"],
};
const authConfig = {
  key: "auth",
  storage: AsyncStorage,
  blacklist: ["error"],
};

const reducers = combineReducers({
  auth: persistReducer(authConfig, authSlice),
  projects: projectSlice,
  jobs: jobSlice,
  attendance: attendanceSlice,
  workers: workerSlice,
  users: userSlide,
  payment: paymentSlice,
});
const persistedReducer = persistReducer(persistConfig, reducers);
const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export default store;
