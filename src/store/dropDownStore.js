import { create } from "zustand";
import { collegeDropDown } from "../api/collegeapi";
import { fetchRole } from "../api/roleManagementapi";
import { userData } from "../assets/json/TableData";
import { getuser } from "../api/dropDownapi";

const useDropDownStore = create((set) => ({
  college: [],
  role: [],
  user: [],
  fetchListofCollege: async () => {
    const allData = await collegeDropDown();
    set({ college: allData?.data || [] });
  },
  fetchListofRole: async () => {
    const allData = await fetchRole();
    set({ role: allData?.data || [] });
  },
  fetchListofUser: async () => {
    const allData = await getuser();
    set({ user: allData?.data || [] });
  },
}));

export { useDropDownStore };
