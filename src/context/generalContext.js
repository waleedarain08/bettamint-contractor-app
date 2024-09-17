import React, { createContext, useEffect, useState } from "react";
import { API } from "../utils/api_constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext } from "react";
import { apiCall } from "../services/response_handler";
import { navigate } from "../navigation/NavigationRef";
import { useAuth } from "./authContext";

const MainContext = createContext();

const GeneralProvider = ({ children }) => {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [statsCount, setStatsCount] = useState(null);
  const [attendanceGraphData, setAttendanceGraphData] = useState(null);
  const [paymentsGraphData, setPaymentsGraphData] = useState(null);
  const [contractorsGraphData, setContractorsGraphData] = useState(null);
  const [workersSkill, setWorkersSkill] = useState(null);

  useEffect(() => {
    getProjects();
  }, [user]);

  const getProjects = async () => {
    try {
      setLoading(true);
      const response = await apiCall("GET", API.getProjects, null, user.token);
      setProjects(response);
    } catch (error) {
      throw new Error(
        error.message || "Something went wrong, while fetching products!"
      );
    } finally {
      setLoading(false);
    }
  };

  const getStatsCount = async () => {
    try {
      setLoading(true);
      const response = await apiCall(
        "GET",
        API.getStatsCount,
        null,
        user.token
      );
      setStatsCount(response);
    } catch (error) {
      throw new Error(
        error.message || "Something went wrong, while fetching stats count!"
      );
    } finally {
      setLoading(false);
    }
  };

  const getAttendanceGraphData = async (
    projectId,
    startDate,
    endDate,
    createdBy = 0
  ) => {
    try {
      setLoading(true);
      const response = await apiCall(
        "GET",
        `${API.getAttendanceGraphData}?projectId=${projectId}&startDate=${startDate}&endDate=${endDate}&createdBy=${createdBy}`,
        null,
        user.token
      );
      setAttendanceGraphData(response);
    } catch (error) {
      throw new Error(
        error.message ||
          "Something went wrong, while fetching attendance graph!"
      );
    } finally {
      setLoading(false);
    }
  };

  const getPaymentsGraphData = async (
    projectId,
    startDate,
    endDate,
    createdBy = 0
  ) => {
    try {
      setLoading(true);
      const response = await apiCall(
        "GET",
        `${API.getPaymentsGraphData}?projectId=${projectId}&startDate=${startDate}&endDate=${endDate}&createdBy=${createdBy}`,
        null,
        user.token
      );
      setPaymentsGraphData(response);
    } catch (error) {
      throw new Error(
        error.message || "Something went wrong, while fetching payments graph!"
      );
    } finally {
      setLoading(false);
    }
  };

  const getContractorsGraphData = async (
    projectId,
    startDate,
  ) => {
    try {
      setLoading(true);
      const response = await apiCall(
        "GET",
        `${API.getContractorsGraphData}?projectId=${projectId}&startDate=${startDate}`,
        null,
        user.token
      );
      setContractorsGraphData(response);
    } catch (error) {
      throw new Error(
        error.message ||
          "Something went wrong, while fetching contractors graph!"
      );
    } finally {
      setLoading(false);
    }
  };

  const getWorkersSkill = async () => {
    try {
      setLoading(true);
      const response = await apiCall("GET", `${API.getWorkersSkill}`, null, user.token);
      setWorkersSkill(response);
    } catch (error) {
      throw new Error(
        error.message || "Something went wrong, while fetching workers skill!"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <MainContext.Provider
      value={{
        loading,
        projects,
        getProjects,
        getStatsCount,
        statsCount,
        getAttendanceGraphData,
        attendanceGraphData,
        getPaymentsGraphData,
        paymentsGraphData,
        getContractorsGraphData,
        contractorsGraphData,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

const useGeneralContext = () => {
  return useContext(MainContext);
};

export { GeneralProvider, useGeneralContext };
