import React, { createContext, useState } from "react";
import { API, base_url, baseUrl } from "../utils/api_constants";
import { useContext } from "react";
import { apiCall } from "../services/response_handler";
import { useAuth } from "./authContext";
import axios from "axios";

const WorkerContext = createContext();

const WorkerProvider = ({ children }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [workers, setWorkers] = useState([]);
  const [selectedWorker, setSelectedWorker] = useState(null);

  const getWorkers = async (projectId = 0, contractorId = 0) => {
    try {
      setLoading(true);
      const response = await apiCall(
        "GET",
        `${API.getWorkers}?projectId=${projectId}&createdBy=${contractorId}`,
        null,
        user.token
      );
      setWorkers(response);
    } catch (error) {
      throw new Error(
        error.message || "Something went wrong, while fetching workers!"
      );
    } finally {
      setLoading(false);
    }
  };

  const createWorker = async (data, profilePicture, adharCard) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${baseUrl}/dashboard/worker/addupdateworker`,
        data,
        {
          headers: {
            Authorization: user?.token,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200) {
        let workerId = selectedWorker
          ? selectedWorker?.workerId
          : response.data.workerId;
        [1, 2].map(async (item) => {
          if (item === 1 && adharCard) {
            let resp = await axios.post(
              `${baseUrl}/dashboard/worker/upload?workerId=${workerId}&document=IdentityCard`,
              adharCard,
              {
                headers: {
                  Authorization: user?.token,
                  "Content-Type": "multipart/form-data",
                },
              }
            );
            console.log("aadhar resp", resp);
          }
          if (item === 2 && profilePicture) {
            let resp = await axios.post(
              `${baseUrl}/dashboard/worker/upload?workerId=${workerId}&document=ProfilePicture`,
              profilePicture,
              {
                headers: {
                  Authorization: user?.token,
                  "Content-Type": "multipart/form-data",
                },
              }
            );
            console.log("profile resp", resp);
          }
        });
        return response;
      }
    } catch (e) {
      console.log("worker error", e.response);
      return e;
    } finally {
      setLoading(false);
    }
  };

  return (
    <WorkerContext.Provider
      value={{
        loading,
        workers,
        getWorkers,
        selectedWorker,
        setSelectedWorker,
        createWorker,
      }}
    >
      {children}
    </WorkerContext.Provider>
  );
};

const useWorker = () => useContext(WorkerContext);

export { WorkerProvider, useWorker };
