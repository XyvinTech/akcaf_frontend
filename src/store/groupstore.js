import { create } from "zustand";
import { addGroup, getGroup } from "../api/groupapi";

const useGroupStore = create((set) => ({
  groups: [],

  fetchGroup: async (filter) => {
    const allData = await getGroup(filter);
    set({ groups: allData?.data || [] });
  },
  addGroups: async (data) => {
    await addGroup(data);
  },
}));

export { useGroupStore };
