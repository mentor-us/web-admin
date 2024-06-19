import { create } from "zustand";

const useSubjectManagementStore = create((set) => ({
  columnHeaders: [
    { text: "Mã môn", textValue: "code", isShow: true },
    { text: "Tên môn", textValue: "name", isShow: true }
  ],
  currentPageSearch: 0,
  itemsPerPage: 10,
  isSelectAll: false,
  couseData: [],
  setCourseData: (courses) => {
    set((state) => {
      if (courses) {
        const temp = [...state.couseData];
        courses.map((course) => {
          const c = temp.find((tempCourse) => tempCourse.code === course.code);
          return {
            ...course,
            isChecked: c?.isChecked ?? false
          };
        });
      }
      return { ...state, couseData: courses };
    });
  },
  setIsSelectAll: () => {
    set((state) => {
      const temp = [...state.couseData].map((course) => {
        return { ...course, isChecked: !state.isSelectAll };
      });
      return { ...state, isSelectAll: !state.isSelectAll, couseData: temp };
    });
  },
  setIsChecked: (item) => {
    set((state) => {
      const temp = [...state.couseData];
      if (item) {
        const course = temp.find((tempCourse) => tempCourse.code === item.code);
        course.isChecked = item?.isChecked ?? false;
      }
      const hasNonSelectItem = temp.find((tempCourse) => !tempCourse.isChecked);
      return { ...state, couseData: temp, isSelectAll: !hasNonSelectItem };
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

export default useSubjectManagementStore;
