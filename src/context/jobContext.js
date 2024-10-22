import React, { createContext, useState } from "react";
import { API } from "../utils/api_constants";
import { useContext } from "react";
import { apiCall } from "../services/response_handler";
import { useAuth } from "./authContext";
import axios from "axios";

const JobContext = createContext();

const JobProvider = ({ children }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);

  const getJobs = async (contractorId = 0) => {
    try {
      setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  const completeJob = async (jobId) => {
    try {
      setLoading(true);
      const response = await apiCall(
        "POST",
        `${API.completeJob}?jobId=${jobId}`,
        null,
        user.token
      );
      return response;
    } catch (error) {
      throw new Error(
        error.message || "Something went wrong, while completing job!"
      );
    } finally {
      setLoading(false);
    }
  };

  const createJob = async (formData) => {
    try {
      setLoading(true);
      const response = await axios.post(`${API.createJob}`, formData, {
        headers: {
          Authorization: user?.token,
          "Content-Type": "multipart/form-data",
        },
      });
      return response;
    } catch (error) {
      console.log("JOB ERROR", error);
      throw new Error(
        error.message || "Something went wrong, while creating job!"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <JobContext.Provider
      value={{
        loading,
        getJobs,
        jobs,
        selectedJob,
        setSelectedJob,
        completeJob,
        createJob,
      }}
    >
      {children}
    </JobContext.Provider>
  );
};

const useJob = () => useContext(JobContext);

export { JobProvider, useJob };
