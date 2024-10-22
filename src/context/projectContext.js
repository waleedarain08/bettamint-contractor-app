import React, { createContext, useState } from "react";
import { API } from "../utils/api_constants";
import { useContext } from "react";
import { apiCall } from "../services/response_handler";
import { useAuth } from "./authContext";
import axios from "axios";

const ProjectContext = createContext();

const ProjectProvider = ({ children }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [allProjects, setAllProjects] = useState([]);
  const [mappingProjects, setMappingProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [labourProjects, setLabourProjects] = useState([]);

  const getAllProjects = async () => {
    try {
      setLoading(true);
      const response = await apiCall(
        "GET",
        API.getAllProjects,
        null,
        user.token
      );
      setAllProjects(response);
    } catch (error) {
      throw new Error(
        error.message || "Something went wrong, while fetching projects!"
      );
    } finally {
      setLoading(false);
    }
  };

  const getMappingProjects = async () => {
    try {
      setLoading(true);
      const response = await apiCall(
        "GET",
        API.getMappingProjects,
        null,
        user.token
      );
      setMappingProjects(response);
    } catch (error) {
      throw new Error(
        error.message ||
          "Something went wrong, while fetching mapping projects!"
      );
    } finally {
      setLoading(false);
    }
  };

  const getLabourProjects = async (projectId = 0) => {
    try {
      setLoading(true);
      const response = await apiCall(
        "POST",
        `${API.getLabourProjects}?projectId=${projectId}`,
        null,
        user.token
      );
      setLabourProjects(response);
    } catch (error) {
      throw new Error(
        error.message || "Something went wrong, while fetching labour projects!"
      );
    } finally {
      setLoading(false);
    }
  };

  const createProject = async (formData) => {
    try {
      setLoading(true);
      const response = await axios.post(API.createProject, formData, {
        headers: {
          Authorization: user?.token,
          "Content-Type": "multipart/form-data",
          Accept: "text/plain",
        },
      });
      return response;
    } catch (error) {
      throw new Error(
        error.message || "Something went wrong, while creating project!"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProjectContext.Provider
      value={{
        loading,
        allProjects,
        getAllProjects,
        mappingProjects,
        getMappingProjects,
        selectedProject,
        setSelectedProject,
        labourProjects,
        getLabourProjects,
        createProject,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

const useProject = () => useContext(ProjectContext);

export { ProjectProvider, useProject };
