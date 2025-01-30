import { toast } from "react-toastify";
import axiosInstance from "./axiosintercepter";

export const getReport = async (filter) => {
  try {
    const response = await axiosInstance.get("/report", {
      params: filter,
    });
    return response.data;
  } catch (error) {
    return null;
  }
};
export const getReportById = async (id) => {
  try {
    const response = await axiosInstance.get(`/report/single/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error caught:", error);
  }
};

export const updateReportById = async (id, data) => {
  try {
    const response = await axiosInstance.put(`/report/single/${id}`, data);
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
