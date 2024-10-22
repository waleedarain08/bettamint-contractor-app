import React, { createContext, useEffect, useState } from "react";
import { API } from "../utils/api_constants";
import { useContext } from "react";
import { apiCall } from "../services/response_handler";
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
  const [financialCount, setFinancialCount] = useState(null);
  const [workForceMetrics, setWorkForceMetrics] = useState(null);
  const [labourTurnover, setLabourTurnoverMetrics] = useState(null);
  const [labourExpense, setLabourExpenseMetrics] = useState(null);
  const [projectBudgetGraph, setProjectBudgetGraph] = useState(null);
  const [financialProgressGraph, setFinancialProgressGraph] = useState(null);
  const [skills, setSkills] = useState([]);
  const [labourContractorList, setLabourContractorList] = useState([]);
  const [project, setProject] = useState(null);
  const [scopeList, setScopeList] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (!user.token) return;
    getProjects();
    getSkills();
    getUsers();
    getLabourContractors();
    getScopeList();
    getJobs();
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

  const getContractorsGraphData = async (projectId = 0, startDate) => {
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

  const getWorkersSkill = async (startDate, endDate, projectId = 0) => {
    try {
      setLoading(true);
      const response = await apiCall(
        "GET",
        `${API.getWorkersSkill}?startDate=${startDate}&endDate=${endDate}&projectId=${projectId}`,
        null,
        user.token
      );
      setWorkersSkill(response);
    } catch (error) {
      throw new Error(
        error.message || "Something went wrong, while fetching workers skill!"
      );
    } finally {
      setLoading(false);
    }
  };

  const getFinancialCount = async (projectId = 0) => {
    try {
      setLoading(true);
      const response = await apiCall(
        "GET",
        `${API.getFinancialCount}?projectId=${projectId}`,
        null,
        user.token
      );
      setFinancialCount(response?.result);
    } catch (error) {
      throw new Error(
        error.message ||
          "Something went wrong, while fetching financial progress metrics!"
      );
    } finally {
      setLoading(false);
    }
  };

  const getWorkForce = async (projectId = 0) => {
    try {
      setLoading(true);
      const response = await apiCall(
        "GET",
        `${API.getWorkForceMetrics}?projectId=${projectId}`,
        null,
        user.token
      );
      setWorkForceMetrics(response?.result);
    } catch (error) {
      throw new Error(
        error.message ||
          "Something went wrong, while fetching workforce metrics!"
      );
    } finally {
      setLoading(false);
    }
  };

  const getLabourTurnover = async (projectId = 0, dateFilter = "") => {
    try {
      setLoading(true);
      const response = await apiCall(
        "GET",
        `${API.getLabourTurnoverMetrics}?projectId=${projectId}&filterDate=${dateFilter}`,
        null,
        user.token
      );
      setLabourTurnoverMetrics(response?.result);
    } catch (error) {
      throw new Error(
        error.message ||
          "Something went wrong, while fetching labour turnover metrics!"
      );
    } finally {
      setLoading(false);
    }
  };

  const getLabourExpense = async (projectId = 0, contractorId = 0) => {
    try {
      setLoading(true);
      const response = await apiCall(
        "GET",
        `${API.getLabourExpenseMetrics}?projectId=${projectId}&contractorId=${contractorId}`,
        null,
        user.token
      );
      setLabourExpenseMetrics(response?.result);
    } catch (error) {
      throw new Error(
        error.message ||
          "Something went wrong, while fetching labour expense metrics!"
      );
    } finally {
      setLoading(false);
    }
  };

  const getProjectBudgetData = async (projectId = 0) => {
    try {
      setLoading(true);
      const response = await apiCall(
        "GET",
        `${API.getProjectBudgetGraphData}?projectId=${projectId}`,
        null,
        user.token
      );
      setProjectBudgetGraph(response?.result);
    } catch (error) {
      throw new Error(
        error.message ||
          "Something went wrong, while fetching project budget graph!"
      );
    } finally {
      setLoading(false);
    }
  };

  const getFinancialProgress = async (projectId = 0) => {
    try {
      setLoading(true);
      const response = await apiCall(
        "GET",
        `${API.getFinancialProgressGraphData}?projectId=${projectId}`,
        null,
        user.token
      );
      setFinancialProgressGraph(response?.result);
    } catch (error) {
      throw new Error(
        error.message ||
          "Something went wrong, while fetching financial progress graph!"
      );
    } finally {
      setLoading(false);
    }
  };

  const getSkills = async () => {
    try {
      setLoading(true);
      const response = await apiCall("GET", API.getSkills, null, user.token);
      setSkills(response);
    } catch (error) {
      throw new Error(
        error.message || "Something went wrong, while fetching skills!"
      );
    } finally {
      setLoading(false);
    }
  };

  const getUsers = async () => {
    try {
      setLoading(true);
      const response = await apiCall("GET", API.getUsers, null, user.token);
      setUsers(response);
    } catch (error) {
      throw new Error(
        error.message || "Something went wrong, while fetching users!"
      );
    } finally {
      setLoading(false);
    }
  };

  const getLabourContractors = async (projectId) => {
    try {
      setLoading(true);
      let url = projectId
        ? `${API.getLabourContractors}?projectId=${projectId}`
        : API.getLabourContractors;
      const response = await apiCall("GET", url, null, user.token);
      setLabourContractorList(response);
    } catch (error) {
      throw new Error(
        error.message ||
          "Something went wrong, while fetching labour contractors!"
      );
    } finally {
      setLoading(false);
    }
  };

  const getScopeList = async () => {
    try {
      setLoading(true);
      const response = await apiCall("GET", API.getScopeList, null, user.token);
      setScopeList(response);
    } catch (error) {
      throw new Error(
        error.message || "Something went wrong, while fetching scope list!"
      );
    } finally {
      setLoading(false);
    }
  };

  const getJobs = async (contractorId = 0) => {
    try {
      const response = await apiCall(
        "GET",
        `${API.getJobs}?createdBy=${contractorId}`,
        null,
        user.token
      );
      setJobs(response);
    } catch (error) {
      throw new Error(
        error.message || "Something went wrong, while fetching jobs!"
      );
    }
  };

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
        getWorkersSkill,
        workersSkill,
        getFinancialCount,
        financialCount,
        getWorkForce,
        workForceMetrics,
        getLabourTurnover,
        labourTurnover,
        getLabourExpense,
        labourExpense,
        getProjectBudgetData,
        projectBudgetGraph,
        getFinancialProgress,
        financialProgressGraph,
        skills,
        getLabourContractors,
        labourContractorList,
        setProject,
        project,
        scopeList,
        getJobs,
        jobs,
        getUsers,
        users,
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
