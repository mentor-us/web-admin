import { create } from "zustand";

const useGradeManagementStore = create((set) => ({
  columnHeaders: [
    { text: "Năm học", textValue: "yearName", isShow: true },
    { text: "Học kỳ", textValue: "semesterName", isShow: true },
    { text: "Mã môn", textValue: "courseCode", isShow: true },
    { text: "Tên môn", textValue: "courseName", isShow: true },
    { text: "Tên sinh viên", textValue: "studentName", isShow: true },
    { text: "Điểm", textValue: "score", isShow: true }
  ],
  currentPageSearch: 0,
  itemsPerPage: 10,
  query: "",
  isSelectAll: false,
  isSubmitSearch: false,
  gradeData: [],
  setState: (keyState, value) => {
    set((state) => {
      return { ...state, [keyState]: value };
    });
  },
  setGradeData: (grades) => {
    set((state) => {
      return { ...state, gradeData: grades };
    });
  },
  setIsSelectAll: () => {
    set((state) => {
      const temp = [...state.gradeData].map((course) => {
        return { ...course, isChecked: !state.isSelectAll };
      });
      return { ...state, isSelectAll: !state.isSelectAll, gradeData: temp };
    });
  },
  setIsChecked: (item) => {
    set((state) => {
      const temp = [...state.gradeData];
      if (item) {
        const course = temp.find((tempCourse) => tempCourse.code === item.code);
        course.isChecked = item?.isChecked ?? false;
      }
      const hasNonSelectItem = temp.find((tempCourse) => !tempCourse.isChecked);
      return { ...state, gradeData: temp, isSelectAll: !hasNonSelectItem };
    });
  },
  setItemsPerPage: (number) => {
    console.log("setItemsPerPage");
    set((state) => {
      return { ...state, itemsPerPage: number };
    });
  },
  setColumnHeadersx: (updatedColumn) => {
    set((state) => {
      const indexCol = state.columnHeaders.findIndex((col) => {
        return col.textValue === updatedColumn.textValue;
      });

      // If the column is found, update it
      if (indexCol !== -1) {
        const updatedColumnHeaders = [...state.columnHeaders];
        updatedColumnHeaders[indexCol] = { ...updatedColumn, isShow: false };

        return {
          ...state,
          columnHeaders: updatedColumnHeaders
        };
      }

      // If the column is not found, return the state unchanged
      return state;
    });
  },
  clearSelectedGroupId: () =>
    set((state) => {
      return { ...state, selectedGroupId: "" };
    })
}));

export default useGradeManagementStore;
