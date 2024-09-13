import { create } from "zustand";
import { createEvent, deleteEventById, getEventById, updateEventById } from "../api/eventapi";

const useEventStore = create((set) => ({
  events: [],
  event: [],

  fetchEventById: async (id) => {
    const allData = await getEventById(id);
    set({ event: allData?.data || [] });
  },
  addEvent: async (data) => {
    await createEvent(data);
  },

  deleteEvent: async (id) => {
    await deleteEventById(id);
  },
  updateEvent: async (id, data) => {
    await updateEventById(id, data);
  },
}));

export { useEventStore };
