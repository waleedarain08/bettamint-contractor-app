import React, { createContext, useState, useContext } from "react";
import { API, base_url } from "../utils/api_constants";
import { apiCall } from "../services/response_handler";
import { useAuth } from "./authContext";
import axios from "axios";

const FieldNoteContext = createContext();

const FieldNoteProvider = ({ children }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [fieldNoteList, setFieldNoteList] = useState(null);
  const [fieldNote, setFieldNote] = useState(null);
  const [costList, setCostList] = useState([]);

  const getFieldNoteCost = async (projectId, scopeOfWorkId, contractorId) => {
    try {
      setLoading(true);
      const response = await apiCall(
        "GET",
        `${API.getFieldNoteCosts}?projectId=${projectId}&scopeOfWorkId=${scopeOfWorkId}&contractorId=${contractorId}`,
        null,
        user.token
      );
      console.log("response----->>>>", response);
      setCostList(response.result);
      return response;
    } catch (error) {
      console.log("Error----->>>>", error);
      throw new Error(
        error.message || "Something went wrong while getting field note costs!"
      );
    } finally {
      setLoading(false);
    }
  };

  const getFieldNoteList = async (projectId = 0) => {
    try {
      setLoading(true);
      const url = projectId
        ? `${API.getFieldNotesByProject}/${projectId}`
        : API.getFieldNotes;

      const response = await apiCall("GET", url, null, user.token);
      setFieldNoteList(response);
      return response;
    } catch (error) {
      throw new Error(
        error.message || "Something went wrong while getting field notes!"
      );
    } finally {
      setLoading(false);
    }
  };

  const markFieldNote = async (id, data) => {
    try {
      setLoading(true);
      const response = await apiCall(
        "PUT",
        `${API.markFieldNoteAction}/${id}`,
        data,
        user.token,
        true
      );
      return response;
    } catch (error) {
      throw new Error(
        error.message || "Something went wrong while marking field note!"
      );
    } finally {
      setLoading(false);
    }
  };

  const verifyFieldNote = async (id) => {
    try {
      setLoading(true);
      const response = await apiCall(
        "PUT",
        `${API.verifyFieldNote}/${id}`,
        { actionVerification: true },
        user.token
      );
      return response;
    } catch (error) {
      throw new Error(
        error.message || "Something went wrong while verifying field note!"
      );
    } finally {
      setLoading(false);
    }
  };

  const assignContractorFieldNote = async (id, contractorId) => {
    try {
      setLoading(true);
      const response = await apiCall(
        "PUT",
        `${API.assignContractor}/${id}?contractorId=${contractorId}`,
        null,
        user.token
      );
      return response;
    } catch (error) {
      throw new Error(
        error.message || "Something went wrong while assigning contractor!"
      );
    } finally {
      setLoading(false);
    }
  };

  const createFieldNote = async (data) => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${base_url}/dashboard/FieldNote`,
        data,
        {
          headers: {
            Authorization: user.token,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // if (response.status === 200) {
      //   // return response.data;
      // } else {
      //   throw new Error(
      //     "Something went wrong while creating field note!"
      //   );
      // }
      return response;
    } catch (e) {
      console.log("ERROR", e.response);
      throw new Error("Something went wrong while creating field note!");
    } finally {
      setLoading(false);
    }
  };

  const deleteFieldNote = async (id) => {
    try {
      setLoading(true);
      const response = await apiCall(
        "DELETE",
        `${API.deleteFieldNote}?id=${id}`,
        null,
        user.token
      );
      return response;
    } catch (error) {
      throw new Error(
        error.message || "Something went wrong while deleting field note!"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <FieldNoteContext.Provider
      value={{
        loading,
        fieldNoteList,
        costList,
        getFieldNoteCost,
        getFieldNoteList,
        markFieldNote,
        verifyFieldNote,
        assignContractorFieldNote,
        createFieldNote,
        deleteFieldNote,
        setFieldNote,
        fieldNote,
      }}
    >
      {children}
    </FieldNoteContext.Provider>
  );
};

const useFieldNote = () => useContext(FieldNoteContext);

export { FieldNoteProvider, useFieldNote };
