import { create } from "zustand";
import {
  addCollege,
  deleteCollege,
  editCollege,
  getBatch,
  getCollege,
  getCollegeById,
  getMemberByBatch,
} from "../api/collegeapi";

const useCollgeStore = create((set,get) => ({
  colleges: [],
  college: [],
  coursedetails: [],
  batches: [],
  totalCount: 0,
  rowPerSize: 10,
  pageNo: 1,
  pageInc: () => {
    const { pageNo, totalCount, rowPerSize } = get();
    const totalPages = Math.ceil(totalCount / rowPerSize);

    if (pageNo < totalPages) {
      set({ pageNo: pageNo + 1 });
    }
  },
  pageDec: () => {
    const { pageNo } = get();
    if (pageNo > 1) {
      set({ pageNo: pageNo - 1 });
    }
  },
  rowChange: (value) => {
    set({ rowPerSize: value });
  },
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
    set({ totalCount: allData?.totalCount || 0 });
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
  getMember: async (collegeId, courseId,batchId) => {
    const allData = await getMemberByBatch(collegeId, courseId,batchId);
    set({ batches: allData?.data || [] });
  },

}));

export { useCollgeStore };
