import { create } from "zustand";
import {
  addMember,
  deleteMember,
  editMember,
  getMember,
  getMemberById,
  getSubscription,
  userBlock,
  userUnBlock,
} from "../api/memberapi";

const useMemberStore = create((set) => ({
  members: [],
  member: [],
  subscription: [],
  loading: false,
  refreshMember: false,
  memberStatus: "",
  memberSub: "",
  setMemStatus: (newStatus) => set({ memberStatus: newStatus }),
  setMemSub: (newSub) => set({ memberSub: newSub }),
  fetchMember: async (filter) => {
    const allData = await getMember(filter);
    set({ members: allData?.data || [] });
  },
  addMembers: async (data) => {
    await addMember(data);
  },
  deleteMembers: async (id) => {
    await deleteMember(id);
  },
  fetchMemberById: async (id) => {
    set({ loading: true });
    const allData = await getMemberById(id);
    set({ member: allData?.data || [] });
    set({ loading: false });
  },
  fetchSubscriptionById: async (id) => {
    const allData = await getSubscription(id);
    set({ subscription: allData?.data || [] });
  },
  updateMember: async (id, data) => {
    await editMember(id, data);
  },
  blockUser: async (id) => {
    await userBlock(id);
  },
  unBlockUser: async (id) => {
    await userUnBlock(id);
  },
  setRefreshMember: () =>
    set((state) => ({ refreshMember: !state.refreshMember })),
}));

export { useMemberStore };
