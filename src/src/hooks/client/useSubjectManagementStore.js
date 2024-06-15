import { create } from "zustand";

const useSubjectManagementStore = create((set) => ({
  columnHeaders: [
    { text: "Mã môn", textValue: "code", isShow: true },
    { text: "Tên môn", textValue: "name", isShow: true }
  ],

  setColumnHeadersx: (updatedColumn) => {
    set((state) => {
      console.log("setColumnHeaders1");
      console.log(updatedColumn);
      console.log(state.columnHeaders);

      const indexCol = state.columnHeaders.findIndex((col) => {
        return col.textValue === updatedColumn.textValue;
      });
      console.log(indexCol);

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
