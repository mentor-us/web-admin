/* eslint-disable no-console */
import axios from "axios";

import { ErrorAlertConfirm } from "components/SweetAlert";
import { API_URL } from "config";

const AxiosClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

AxiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    const additional = config;
    additional.headers = additional.headers ?? {};
    additional.headers.Authorization = token ? `Bearer ${token}` : "";
    return additional;
  },
  (error) => {
    // Do something with request error
    console.log(error);
    return Promise.reject(error);
  }
);

AxiosClient.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  // eslint-disable-next-line consistent-return
  (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error

    if (error.response.status === 401) {
      ErrorAlertConfirm("Phiên đăng nhập của bạn đã hết!", "Vui lòng đăng nhập lại!").then(
        (result) => {
          if (result.isConfirmed) {
            localStorage.removeItem("access_token");
            window.location.assign("/sign-in");
          }
        }
      );

      return Promise.reject(new Error(error.response.status));
    }

    return Promise.reject(error);
  }
);

export default AxiosClient;
