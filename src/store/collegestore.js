import { create } from "zustand";
import {
  addCollege,
  deleteCollege,
  editCollege,
  getBatch,
  getCollege,
  getCollegeById,
} from "../api/collegeapi";

const useCollgeStore = create((set) => ({
  colleges: [],
  college: [],
  coursedetails: [],
  batches: [],
  fetchCollege: async (filter) => {
    const allData = await getCollege(filter);
    set({
      colleges: allData?.data || [],
      coursedetails:
        allData?.data?.map((college) => ({
          collegeId: college._id,
          courses: college.courseDetails || [],
        })) || [],
    });
  },

  addColleges: async (data) => {
    await addCollege(data);
  },
  fetchCollegeById: async (id) => {
    const allData = await getCollegeById(id);
    set({ college: allData?.data || [] });
  },
  deleteColleges: async (id) => {
    await deleteCollege(id);
  },
  updateCollege: async (id, data) => {
    await editCollege(id, data);
  },
  fetchBatch: async (collegeId, courseId) => {
    const allData = await getBatch(collegeId, courseId);
    set({ batches: allData?.data || [] });
  },
}));

export { useCollgeStore };
