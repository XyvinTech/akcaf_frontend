import { toast } from "react-toastify";
import axiosInstance from "./axiosintercepter";

export const collegeDropDown = async () => {
  try {
    const response = await axiosInstance.get("/college/dropdown");
    return response.data;
  } catch (error) {
    return null;
  }
};
export const getCollege = async () => {
  try {
    const response = await axiosInstance.get(`/college/list`);
    return response.data;
  } catch (error) {
    return null;
  }
};
export const addCollege = async (data) => {
  try {
    const response = await axiosInstance.post("/college", data);
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
export const getCollegeById = async (id) => {
  try {
    const response = await axiosInstance.get(`/college/single/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const deleteCollege = async (id) => {
  try {
    const response = await axiosInstance.delete(`/college/single/${id}`);

    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
export const editCollege = async (id, data) => {
  try {
    const response = await axiosInstance.put(`/college/single/${id}`, data);
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
export const getBatch = async (collegeId, courseId) => {
  try {
    const response = await axiosInstance.get(
      `/college/${collegeId}/course/${courseId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getMemberByBatch = async (collegeId, courseId, batchId) => {
  try {
    const response = await axiosInstance.get(
      `/college/${collegeId}/course/${courseId}/batch/${batchId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
