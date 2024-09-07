import axiosInstance from "./axiosintercepter";

export const getPayment = async () => {
  try {
    const response = await axiosInstance.get("/payment/list");
    return response.data;
  } catch (error) {
    return null;
  }
};
