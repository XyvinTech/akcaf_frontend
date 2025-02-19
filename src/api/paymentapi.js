import { toast } from "react-toastify";
import axiosInstance from "./axiosintercepter";

export const getPayment = async (filter) => {
  try {
    const response = await axiosInstance.get("/payment/list", {
      params: filter,
    });
    return response.data;
  } catch (error) {
    return null;
  }
};
export const createPayment = async (data) => {
  try {
    const response = await axiosInstance.post("/payment/create", data);
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
export const deletePayment= async (id) => {
  try {
    const response = await axiosInstance.delete(`/payment/${id}`);
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};