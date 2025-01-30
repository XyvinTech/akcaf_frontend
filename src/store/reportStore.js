import { create } from "zustand";
import { getReportById, updateReportById } from "../api/reportapi";

const useReportStore = create((set) => ({
  reports: [],

  getReports: async (id) => {
    const response = await getReportById(id);
    set({ reports: response.data || [] });
  },
  updateReport: async (id, data) => {
    await updateReportById(id, data);
  },
}));

export { useReportStore };
