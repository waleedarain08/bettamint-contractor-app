import React, { createContext, useState } from "react";
import { API, baseUrl } from "../utils/api_constants";
import { useContext } from "react";
import { apiCall } from "../services/response_handler";
import { useAuth } from "./authContext";
import axios from "axios";

const AttendanceContext = createContext();

const AttendanceProvider = ({ children }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [attendance, setAttendance] = useState([]);
  const [selectedAttendance, setSelectedAttendance] = useState(null);
  const [mustercardAttendance, setMusterCardAttendance] = useState(null);

  const getAttendance = async (
    projectId = 0,
    contractorId = 0,
    skillId = ""
  ) => {
    try {
      setLoading(true);
      const response = await apiCall(
        "GET",
        `${
          API.getAttendance
        }?projectId=${projectId}&createdBy=${contractorId}&pageNumber=${1}&pageSize=${1000}&skillId=${skillId}&sortBy=worker-name&sortOrder=${0}`,
        null,
        user.token
      );
      setAttendance(response?.result);
    } catch (error) {
      throw new Error(
        error.message || "Something went wrong, while fetching attendance!"
      );
    } finally {
      setLoading(false);
    }
  };

  const delistWorker = async (data) => {
    console.log("data", data);
    try {
      setLoading(true);
      const response = await apiCall(
        "POST",
        API.delistWorker,
        data,
        user.token
      );
      return response;
    } catch (error) {
      throw new Error(
        error.message || "Something went wrong, while delisting worker!"
      );
    } finally {
      setLoading(false);
    }
  };

  const getMusterCardAttendance = async (workerId = 0, jobId = 0) => {
    try {
      setLoading(true);
      const response = await apiCall(
        "GET",
        `${API.getAttendanceMusterCard}?workerId=${workerId}&jobId=${jobId}`,
        null,
        user.token
      );
      setMusterCardAttendance(response);
    } catch (error) {
      throw new Error(
        error.message || "Something went wrong, while fetching muster card!"
      );
    } finally {
      setLoading(false);
    }
  };

  const approveAttendance = async (
    jobId,
    workerId,
    dateTime,
    hours = 8,
    approvedAction
  ) => {
    try {
      // if (projectId) {

      const response = await axios.put(
        `${baseUrl}/dashboard/Attendance/approve-attendance`,
        {
          jobId,
          workerId,
          dateTime,
          hours,
          approvedAction,
        },
        {
          headers: {
            Authorization: user?.token,
          },
        }
      );
      return response;
    } catch (e) {
      throw new Error(
        e.message || "Something went wrong while approving attendance!"
      );
    } finally {
      setLoading(false);
    }
  };

  const markWorkerAttendance = async (data) => {
    try {
      setLoading(true);
      const response = await apiCall(
        "POST",
        `${API.markAttendance}?workerId=${data.workerId}&jobId=${data.jobId}&attendanceType=${data.attendanceType}&latitude=${data.latitude}&longitude=${data.longitude}`,
        null,
        user.token
      );
      return response;
    } catch (error) {
      throw new Error(
        error.message || "Something went wrong, while marking attendance!"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AttendanceContext.Provider
      value={{
        loading,
        attendance,
        getAttendance,
        delistWorker,
        selectedAttendance,
        setSelectedAttendance,
        mustercardAttendance,
        getMusterCardAttendance,
        approveAttendance,
        markWorkerAttendance,
      }}
    >
      {children}
    </AttendanceContext.Provider>
  );
};

const useAttendance = () => useContext(AttendanceContext);

export { AttendanceProvider, useAttendance };
