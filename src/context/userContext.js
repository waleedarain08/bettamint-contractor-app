import React, { createContext, useEffect, useState } from "react";
import { API, base_url } from "../utils/api_constants";
import { useContext } from "react";
import { apiCall } from "../services/response_handler";
import { useAuth } from "./authContext";
import axios from "axios";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [features, setFeatures] = useState([]);
  const [userRights, setUserRights] = useState([]);
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    getFeatures();
    getUserRight();
    getRoles();
  }, [user]);

  const getUserRight = async () => {
    try {
      setLoading(true);
      const response = await apiCall(
        "GET",
        API.getFeatureSetV2,
        null,
        user.token
      );
      setUserRights(response);
    } catch (error) {
      throw new Error(
        error.message || "Something went wrong, while fetching features!"
      );
    } finally {
      setLoading(false);
    }
  };

  const getFeatures = async () => {
    try {
      setLoading(true);
      const response = await apiCall("GET", API.getFeatures, null, user.token);
      setFeatures(response);
    } catch (error) {
      throw new Error(
        error.message || "Something went wrong, while fetching features!"
      );
    } finally {
      setLoading(false);
    }
  };

  const getRoles = async () => {
    try {
      setLoading(true);
      const response = await apiCall("GET", API.getRoles, null, user.token);
      setRoles(response);
    } catch (error) {
      throw new Error(
        error.message || "Something went wrong, while fetching roles!"
      );
    } finally {
      setLoading(false);
    }
  };

  const createRole = async (role) => {
    try {
      setLoading(true);
      const response = await axios.post(`${base_url}/dashboard/Role`, role, {
        headers: {
          Authorization: user?.token,
        },
      });
      if (response?.status === 200) {
        console.log("response", response);
        // dispatch(creatingRolesSuccess(response));
      } else {
        console.log("response else", response);
        // dispatch(
        //   creatingRolesFailure("Something went wrong while creating roles!")
        // );
      }
      return response;
    } catch (e) {
      throw new Error(
        e?.message || "Something went wrong, while creating the role!"
      );
    } finally {
      setLoading(false);
    }
  };

  const createUser = async (user) => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${API.createUser}`,
        {
          ...user,
          userTypeId: 0,
          contractorId: 0,
        },
        {
          headers: {
            Authorization: user?.token,
          },
        }
      );

      if (response?.status === 200) {
        return response;
      } else {
        throw new Error("User already exists");
      }
    } catch (e) {
      throw new Error(
        e?.message || "Something went wrong while getting users!"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <UserContext.Provider
      value={{
        loading,
        featuresList: features,
        roles,
        userRights,
        createRole,
        createUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

const useUser = () => useContext(UserContext);

export { UserProvider, useUser };
