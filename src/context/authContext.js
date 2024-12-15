import React, { createContext, useState } from "react";
import { API } from "../utils/api_constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext } from "react";
import { apiCall } from "../services/response_handler";
import { navigate } from "../navigation/NavigationRef";

const AuthContext = createContext();

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const login = async (username, password) => {
    try {
      setLoading(true);
      const response = await apiCall(
        "POST",
        API.login + `?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`,
        null
      );
      const state = {
        isAuthenticated: true,
        token: response?.token,
        user: response?.user,
      };
      await AsyncStorage.setItem("user", JSON.stringify(state));
      setUser(state);
      return response;
    } catch (error) {
      setUser(initialState);
      setLoading(false);
      throw new Error(error.message || "Something went wrong, while logging in!");
    } finally {
      setLoading(false);
    }
  };
  const logout = async () => {
    try {
      setLoading(true);
      await AsyncStorage.removeItem("user");
      setUser(initialState);
    } catch (error) {
      console.log("LOGOUT ERROR", error);
    } finally {
      setLoading(false);
    }
  };

  const register = async (data) => {
    try {
      setLoading(true);
      const response = await apiCall("POST", API.register, data);
      if (response.status === 200) {
        navigate("Login");
        return response;
      }
    } catch (error) {
      setLoading(false);
      throw new Error(error.message || "Something went wrong, while registering!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login,
        loading,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuth };
