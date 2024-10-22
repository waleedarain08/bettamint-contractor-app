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

  return (
    <ProductivityContext.Provider
      value={{
        loading,
      }}
    >
      {children}
    </ProductivityContext.Provider>
  );
};

const useProductivity = () => useContext(ProductivityContext);

export { ProductivityProvider, useProductivity };
