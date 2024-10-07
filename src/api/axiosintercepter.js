import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://akcafconnect.com/api/v1/",
});
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("4ZbQwXtY8uVrN5mP7kL3JhF6");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
