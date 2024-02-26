/* eslint-disable no-shadow */
import { config } from "@app/config";
import axios from "axios";

export const backend = axios.create({
  baseURL: config.mainBackendUrl,
  timeout: 60000,
  headers: {
    "Content-Type": "application/json",
  },
});

backend.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    config.headers.Authorization = token ? `Bearer ${token}` : undefined;

    return config;
  },
  (error) => Promise.reject(error)
);
