import { toast } from "react-toastify";
import axiosInstance from "./axiosintercepter";

export const getFeed = async (filter) => {
  try {
    const response = await axiosInstance.get(`/feeds/list`, {
      params: filter,
    });
    return response.data;
  } catch (error) {
    return null;
  }
};
export const getFeedByUser = async (id) => {
  try {
    const response = await axiosInstance.get(`/feeds/user/${id}`);
    return response.data;
  } catch (error) {
    return null;
  }
};
export const editFeed = async (action, id,data) => {
  try {
    const response = await axiosInstance.put(`/feeds/single/${action}/${id}`, data);
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
