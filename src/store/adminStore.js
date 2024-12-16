import { create } from "zustand";
import {
  addAdmin,
  deleteAdmin,
  editAdmin,
  fetchListofAdminById,
  getAdmin,
  getAdminById,
} from "../api/adminapi";

const useAdminStore = create((set) => ({
  admins: [],
  singleAdmin: [],
  single: [],
  addAdmins: async (data) => {
    await addAdmin(data);
  },
  getAdmins: async () => {
    const response = await getAdmin();
    set({ admins: response.data || [] });
  },

  fetchAdminById: async () => {
    const response = await getAdminById();
    set({ singleAdmin: response.data || [] });
  },
  fetchSingleAdmin: async (id) => {
    const response = await fetchListofAdminById(id);
    set({ single: response.data || [] });
  },
  updateAdmin: async (id, data) => {
    await editAdmin(id, data);
  },
  deleteAdmins: async (id) => {
    await deleteAdmin(id);
  },
}));

export { useAdminStore };
