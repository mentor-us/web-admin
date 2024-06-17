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
      return { ...state, isSelectAll: !state.isSelectAll };
    });
  },
  setIsChecked: (item) => {
    set((state) => {
      console.log("setIsChecked");
      const temp = [...state.couseData];
      console.log(temp);
      if (item) {
        const course = temp.find((tempCourse) => tempCourse.code === item.code);
        course.isChecked = item?.isChecked ?? false;
        console.log(temp);
      }
      const hasNonSelectItem = temp.find((tempCourse) => !tempCourse.isChecked);
      return { ...state, couseData: temp, isSelectAll: !hasNonSelectItem };
    });
  },
  setItemsPerPage: (number) => {
    set((state) => {
      return { ...state, currentPageSearch: number };
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
        console.log(updatedColumnHeaders);

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
