import axios from "axios";
import { baseURL } from "./Endpoints";

export const axiosInstance = axios.create({ baseURL });

// Add a request interceptor
axiosInstance.interceptors.request.use(
  async function (config) {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    console.log(token);
    if (token !== null || token !== undefined) {
      config.headers["x-access-token"] = token;
    }
    return config;
  },
  function (err) {
    return Promise.reject(err);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  function (response) {
    // console.log(response);
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);
