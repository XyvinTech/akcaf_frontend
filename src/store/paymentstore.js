import { create } from "zustand";
import { createPayment, getPayment } from "../api/paymentapi";

const usePaymentStore = create((set) => ({
  payments: [],

  fetchPayment: async () => {
    const allData = await getPayment();
    set({ payments: allData?.data || [] });
  },
  addPayment: async (data) => {
    await createPayment(data);
  },
}));

export { usePaymentStore };
