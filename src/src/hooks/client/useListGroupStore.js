import { create } from "zustand";

const useListGroupStore = create((set) => ({
  selectedGroupId: "",

  setSelectedGroupId: (selectedGroupId) =>
    set((state) => ({
      ...state,
      selectedGroupId
    })),

  clearSelectedGroupId: () =>
    set((state) => {
      return { ...state, selectedGroupId: "" };
    })
}));

export default useListGroupStore;
