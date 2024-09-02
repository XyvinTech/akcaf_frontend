import { create } from "zustand";
import { addAdmin, getAdmin } from "../api/adminapi";

const useAdminStore = create((set) => ({
  admins: [],
  singleAdmin: [],
  addAdmins: async (data) => {
    await addAdmin(data);
  },
  getAdmins: async () => {
    const response = await getAdmin();
    set({ admins: response.data || [] });
  },

  //   getRoleById: async (id) => {
  //     const response = await fetchListofRoleById(id);
  //     set({ singleRole: response.data || [] });
  //   },
  //   updateRole:async(id,data)=>{
  //     await editRole(id,data)
  //   }
}));

export { useAdminStore };
