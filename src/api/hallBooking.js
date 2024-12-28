import { toast } from "react-toastify";
import axiosInstance from "./axiosintercepter";

export const getBookings = async (filter) => {
  try {
    const response = await axiosInstance.get("/booking/list", {
      params: filter,
    });
    return response.data;
  } catch (error) {
    console.error("Error caught:", error);
  }
};
export const updateHallById = async (id, data) => {
  try {
    const response = await axiosInstance.put(`/booking/edit/${id}`, data);
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
