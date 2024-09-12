import axios from "axios";
import { toast } from "react-toastify";
import axiosInstance from "./axiosintercepter";
const baseURL = "https://akcaf-backend.onrender.com/api/v1/";
export const getLogin = async (datas) => {
  try {
    const response = await axios.post(`${baseURL}admin/login`, datas);

    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    console.error(error.response.data.message);
  }
};

export const addAdmin = async (data) => {
  try {
    const response = await axiosInstance.post(`/admin`, data);
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
export const getAdmin = async () => {
  try {
    const response = await axiosInstance.get(`/admin/list`);
    return response.data;
  } catch (error) {
    console.error(error.response.data.message);
  }
};
export const fetchListofAdminById = async (id) => {
  try {
    const response = await axiosInstance.get(`/admin/single/${id}`);
    return response.data;
  } catch (error) {
    console.error(error.response.data.message);
  }
};
