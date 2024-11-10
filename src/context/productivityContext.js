import React, { createContext, useState } from "react";
import { API, base_url } from "../utils/api_constants";
import { useContext } from "react";
import { apiCall } from "../services/response_handler";
import { useAuth } from "./authContext";
import axios from "axios";

const ProductivityContext = createContext();

const ProductivityProvider = ({ children }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [boqProgress, setBoqProgress] = useState(null);
  const [boqMetrics, setBoqMetrics] = useState(null);
  const [projectProgressGraph, setProjectProgressGraph] = useState(null);
  const [boqList, setBoqList] = useState([]);
  const [boqListGCViewMode, setBoqListGCViewMode] = useState([]);
  const [boqListGC, setBoqListGC] = useState([]);

  const getBOQProgress = async (projectId = 0, contractorId = 0) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${base_url}/dashboard/Productivity/graph/boqprogress?projectId=${projectId}&contractorId=${contractorId}`,
        {
          headers: {
            Authorization: user.token,
          },
        }
      );
      if (response?.status === 200) {
        setBoqProgress(response?.data);
      } else {
        throw new Error("Something went wrong while getting BOQ Progress!");
      }
    } catch (error) {
      throw new Error(
        error.message || "Something went wrong while getting BOQ Progress!"
      );
    } finally {
      setLoading(false);
    }
  };

  const getBOQMetrics = async (projectId = 0) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${base_url}/dashboard/Productivity/graph/boqmetrics?projectId=${projectId}`,
        {
          headers: {
            Authorization: user.token,
          },
        }
      );
      if (response?.status === 200) {
        setBoqMetrics(response?.data.result);
      } else {
        throw new Error("Something went wrong while getting BOQ Metrics!");
      }
    } catch (error) {
      throw new Error(
        error.message || "Something went wrong while getting BOQ Metrics!"
      );
    } finally {
      setLoading(false);
    }
  };

  const getProjectProgressGraph = async (projectId = 0, contractorId = 0) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${base_url}/dashboard/Productivity/graph/boqprogressbysow?projectId=${projectId}&contractorId=${contractorId}`,
        {
          headers: {
            Authorization: user.token,
          },
        }
      );
      // console.log("RESPONSE--->>>", response);
      if (response?.status === 200) {
        setProjectProgressGraph(response?.data.result);
      } else {
        throw new Error("Something went wrong while getting BOQ Progress!");
      }
    } catch (error) {
      throw new Error(
        error.message || "Something went wrong while getting BOQ Progress!"
      );
    } finally {
      setLoading(false);
    }
  };

  const getBOQList = async (
    projectId = 0,
    contractorId = 0,
    pageNumber = 1,
    pageSize = 50
  ) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${base_url}/dashboard/Productivity/getboqremainingprogresslist?projectId=${projectId}&pageNumber=${pageNumber}&pageSize=${pageSize}`,
        {
          headers: {
            Authorization: user.token,
          },
        }
      );
      if (response?.status === 200) {
        setBoqList(response?.data);
      } else {
        throw new Error("Something went wrong while getting BOQ list!");
      }
    } catch (error) {
      throw new Error(
        error.message || "Something went wrong while getting BOQ list!"
      );
    } finally {
      setLoading(false);
    }
  };

  const addBOQ = async (listObject) => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${base_url}/dashboard/Productivity/addupdateboq`,
        listObject,
        {
          headers: {
            Authorization: user?.token,
            "Content-Type": "application/json",
          },
        }
      );
      return response;
    } catch (error) {
      throw new Error(
        error.message || "Something went wrong while sending BOQ list!"
      );
    } finally {
      setLoading(false);
    }
  };

  const getListOfBOQV2 = async (
    projectId = 0,
    contractorId = 0,
    pageNumber = 1,
    pageSize = 50,
    sortBy = "",
    orderBy = ""
  ) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${base_url}/dashboard/Productivity/getboqlist/v2?projectId=${projectId}&contractorId=${contractorId}&pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}&orderBy=${orderBy}`,
        {
          headers: {
            Authorization: user?.token,
          },
        }
      );
      if (response?.status === 200) {
        setBoqListGCViewMode(
          response?.data.map((item) => ({
            ...item,
            boQs: item.boQs.map((param) => ({
              ...param,
              titles: param.titles.map((param1) => ({
                ...param1,
                totalAmount: param1.descriptions.reduce(
                  (accumulator, currentValue) =>
                    accumulator + currentValue.amount,
                  0
                ),
                totalAcutalAmount: param1.descriptions.reduce(
                  (accumulator, currentValue) =>
                    accumulator + currentValue.actualAmount,
                  0
                ),
                descriptions: param1.descriptions.map((param2) => ({
                  ...param2,
                  percentage:
                    (param2.amount / param2.actualAmount) * 100 === Infinity
                      ? 0
                      : (param2.amount / param2.actualAmount) * 100,
                })),
              })),
            })),
          }))
        );
      } else {
        throw new Error("Something went wrong while getting BOQ GC list!");
      }
    } catch (error) {
      throw new Error(
        error.message || "Something went wrong while getting BOQ GC list!"
      );
    } finally {
      setLoading(false);
    }
  };

  const getBOQListGC = async (
    projectId = 0,
    contractorId = 0,
    pageNumber = 1,
    pageSize = 1000,
    QualityStatusFilter = "",
    IsHistory = false,
    searchQuery = ""
  ) => {
    const url = `${base_url}/dashboard/Productivity/getboqprogresslist/v2?projectId=${projectId}&contractorId=${contractorId}&pageNumber=${pageNumber}&pageSize=${pageSize}&QualityStatusFilter=${QualityStatusFilter}&isHistory=${IsHistory}&search=${searchQuery}`;

    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: user?.token,
        },
      });
      console.log("RESPONSE URL --->>>", response.request.responseURL);
      if (response?.status === 200) {
        setBoqListGC(response?.data.result?.sowList);
      } else {
        throw new Error(
          gettingBoqListGCFailure(
            "Something went wrong while getting BOQ GC list!"
          )
        );
      }
      return response;
    } catch (error) {
      console.error("Error fetching BOQ list GC:", error);
      throw new Error(
        error.message || "Something went wrong while getting BOQ GC list!"
      );
    }
  };

  return (
    <ProductivityContext.Provider
      value={{
        loading,
        boqProgress,
        boqMetrics,
        getBOQProgress,
        getBOQMetrics,
        getProjectProgressGraph,
        projectProgressGraph,
        getBOQList,
        boqList,
        addBOQ,
        boqListGCViewMode,
        getListOfBOQV2,
        boqListGC,
        getBOQListGC,
      }}
    >
      {children}
    </ProductivityContext.Provider>
  );
};

const useProductivity = () => useContext(ProductivityContext);

export { ProductivityProvider, useProductivity };
