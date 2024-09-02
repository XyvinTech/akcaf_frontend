import { create } from "zustand";
import { collegeDropDown } from "../api/collegeapi";
import { fetchRole } from "../api/roleManagementapi";

const useDropDownStore = create((set) => ({
  college: [],
  role: [],
  fetchListofCollege: async () => {
    const allData = await collegeDropDown();
    set({ college: allData?.data || [] });
  },
  fetchListofRole: async () => {
    const allData = await fetchRole();
    set({ role: allData?.data || [] });
  },
}));

export { useDropDownStore };
