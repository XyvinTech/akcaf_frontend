import { create } from "zustand";
import { createPayment, deletePayment, getPayment } from "../api/paymentapi";

const usePaymentStore = create((set) => ({
  payments: [],

  fetchPayment: async () => {
    const allData = await getPayment();
    set({ payments: allData?.data || [] });
  },
  addPayment: async (data) => {
    await createPayment(data);
  },
  deletePayments: async (id) => {
    await deletePayment(id);
  }
}));

export { usePaymentStore };
