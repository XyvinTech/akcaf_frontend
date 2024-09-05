import { toast } from "react-toastify";
import axiosInstance from "./axiosintercepter";

export const getGroup = async () => {
  try {
    const response = await axiosInstance.get(`/chat/list-group`);
    return response.data;
  } catch (error) {
    return null;
  }
};

export const addGroup = async (data) => {
  try {
    const response = await axiosInstance.post("/chat/create-group", data);
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
export const getGroupById = async (id) => {
  try {
    const response = await axiosInstance.get(`/chat/group-details/${id}`);
    return response.data;
  } catch (error) {
    return null;
  }
};
export const getSingleGroup = async (id) => {
    try {
      const response = await axiosInstance.get(`/chat/group/${id}`);
      return response.data;
    } catch (error) {
      return null;
    }
  };
export const deleteGroup = async (id) => {
  try {
    const response = await axiosInstance.delete(`/chat/group/${id}`);

    return response.data;
  } catch (error) {
    console.error(error.response.data.message);
  }
};

export const editGroup = async (id, data) => {
  try {
    const response = await axiosInstance.put(`/chat/group/${id}`, data);
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
