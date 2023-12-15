import axios from "axios";
import { ACCESS_TOKEN, API_URL } from "./constants";

export const instance = axios.create({
  baseURL: API_URL,
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem(ACCESS_TOKEN);
  config.headers.Authorization = token != null ? `Bearer ${token}` : "";
  return config;
});
