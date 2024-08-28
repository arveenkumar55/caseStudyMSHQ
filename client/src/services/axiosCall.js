import axios from "axios";
import authHeaderService from "./authHeaderService";

const API_URL = "http://localhost:3000/";

export const getAxiosInstance = async () => {
  const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 20000,
  });

  // Alter defaults after instance has been created
  axiosInstance.defaults.headers = authHeaderService();
  // axiosInstance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

  axiosInstance.interceptors.response.use(
    function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      // console.log('response in interceptors', response)
      // sessionStorage.removeItem('user')
      // window.location.reload();
      return response;
    },
    function (error) {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      const status = error.response?.status || 500;

      if (status === 401) {
        sessionStorage.removeItem("user");
        sessionStorage.removeItem("persist:root");
        window.location.reload();
      }
      return Promise.reject(error);
    }
  );
  return axiosInstance;
};
//
//
