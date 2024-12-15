import React, { createContext, useState } from "react";
import { baseUrl } from "../utils/api_constants";
import { useContext } from "react";
import { useAuth } from "./authContext";
import axios from "axios";

const PaymentContext = createContext();

const PaymentProvider = ({ children }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [paymentsHistoryList, setPaymentsHistoryList] = useState([]);

  const paymentProcess = async (jobId, workerId, transactionType) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${baseUrl}/dashboard/Payment/process?jobId=${jobId}&workerId=${workerId}&transactionType=${transactionType}`,
        null,
        {
          headers: {
            Authorization: user?.token,
            Accept: "text/plain",
          },
        }
      );

      return response;
    } catch (e) {
      throw new Error(e);
    } finally {
      setLoading(false);
    }
  };

  const getPaymentHistory = async (projectId, startDate, endDate) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${baseUrl}/dashboard/Payment/history?projectId=${projectId}&startDate=${startDate}&endDate=${endDate}`,
        {
          headers: {
            Authorization: user?.token,
          },
        }
      );
      if (response?.status === 200) {
        setPaymentsHistoryList(response.data);
      }
      return response;
    } catch (e) {
      setPaymentsHistoryList([]);
      throw new Error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PaymentContext.Provider
      value={{
        loading,
        paymentProcess,
        paymentsHistoryList,
        getPaymentHistory,
      }}
    >
      {children}
    </PaymentContext.Provider>
  );
};

const usePayment = () => useContext(PaymentContext);

export { PaymentProvider, usePayment };
