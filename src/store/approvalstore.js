import { create } from "zustand";
import { editApproval, getApproval } from "../api/approvalapi";
import { updateHallById } from "../api/hallBooking";

const useApprovalStore = create((set) => ({
  approvals: [],
  fetchApproval: async () => {
    const allData = await getApproval();
    set({ approvals: allData?.data || [] });
  },
  updateApproval: async (id, data) => {
    await editApproval(id, data);
  },
  updateHall: async (id, data) => {
    await updateHallById(id, data);
  },
}));

export { useApprovalStore };
