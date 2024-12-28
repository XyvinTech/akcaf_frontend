import axiosInstance from "./axiosintercepter";

export const getTimes = async () => {
  try {
    const response = await axiosInstance.get("/time");
    return response.data;
  } catch (error) {
    console.error("Error caught:", error);
  }
};
export const createTime = async (data) => {
  try {
    const response = await axiosInstance.post("/time", data);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
