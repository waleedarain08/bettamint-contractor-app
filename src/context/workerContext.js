import React, { createContext, useState } from "react";
import { API, base_url } from "../utils/api_constants";
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

  // const createWorker = async (data, profilePicture, adharCard) => {
  //   try {
  //     setLoading(true);
  //     const response = await axios.post(`${API.createWorker}`, data, {
  //       headers: {
  //         Authorization: token,
  //         "Content-Type": "multipart/form-data",
  //       },
  //     });
  //     console.log("Response--->>>", response);
  //     if (response.status === 200) {
  //       // let workerId = selectedWorkerReducer
  //       //   ? selectedWorkerReducer?.workerId
  //       //   : response.data.workerId;
  //       let workerId = response?.data?.workerId;
  //       [1, 2].map(async (item) => {
  //         if (item === 1 && adharCard) {
  //           let resp = await axios.post(
  //             `${base_url}/dashboard/worker/upload?workerId=${workerId}&document=IdentityCard`,
  //             adharCard,
  //             {
  //               headers: {
  //                 Authorization: token,
  //                 "Content-Type": "multipart/form-data",
  //               },
  //             }
  //           );
  //           console.log("aadhar resp", resp);
  //         }
  //         if (item === 2 && profilePicture) {
  //           let resp = await axios.post(
  //             `${base_url}/dashboard/worker/upload?workerId=${workerId}&document=ProfilePicture`,
  //             profilePicture,
  //             {
  //               headers: {
  //                 Authorization: token,
  //                 "Content-Type": "multipart/form-data",
  //               },
  //             }
  //           );
  //           console.log("profile resp", resp);
  //         }
  //       });
  //       return response;
  //     }
  //   } catch (error) {
  //     console.log("worker error", error.response);
  //     throw new Error(
  //       error.message || "Something went wrong while getting users!"
  //     );
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const createWorker = (data, profilePicture, adharCard) => async () => {
    try {
      setLoading(true);
      const response = await axios.post(`${API.createWorker}`, data, {
        headers: {
          Authorization: token,
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Response--->>>", response);

      if (response.status === 200) {
        let workerId = response?.data?.workerId;

        const uploadPromises = [1, 2].map(async (item) => {
          if (item === 1 && adharCard) {
            try {
              let resp = await axios.post(
                `${base_url}/dashboard/worker/upload?workerId=${workerId}&document=IdentityCard`,
                adharCard,
                {
                  headers: {
                    Authorization: token,
                    "Content-Type": "multipart/form-data",
                  },
                }
              );
              console.log("aadhar resp", resp);
            } catch (uploadError) {
              console.error("Error uploading Aadhar Card:", uploadError);
            }
          }
          if (item === 2 && profilePicture) {
            try {
              let resp = await axios.post(
                `${base_url}/dashboard/worker/upload?workerId=${workerId}&document=ProfilePicture`,
                profilePicture,
                {
                  headers: {
                    Authorization: token,
                    "Content-Type": "multipart/form-data",
                  },
                }
              );
              console.log("profile resp", resp);
            } catch (uploadError) {
              console.error("Error uploading Profile Picture:", uploadError);
            }
          }
        });

        await Promise.all(uploadPromises);
        return response;
      }
    } catch (error) {
      console.log("worker error", error.response);
      throw new Error(
        error.message || "Something went wrong while creating the job!"
      );
    } finally {
      setLoading(false);
    }
  };

  // const createWorker = async (formData) => {
  //   try {
  //     setLoading(true);
  //     const response = await axios.post(`${API.createWorker}`, formData, {
  //       headers: {
  //         Authorization: user?.token,
  //         "Content-Type": "multipart/form-data",
  //       },
  //     });
  //     return response;
  //   } catch (error) {
  //     console.log("JOB ERROR", error);
  //     throw new Error(
  //       error.message || "Something went wrong, while creating job!"
  //     );
  //   } finally {
  //     setLoading(false);
  //   }
  // };

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
