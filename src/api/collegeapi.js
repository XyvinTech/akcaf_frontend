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
