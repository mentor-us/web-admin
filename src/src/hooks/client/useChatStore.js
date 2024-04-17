import { create } from "zustand";

const useChatStore = create((set) => ({
  unseenMessageChannelId: new Set(),

  addUnseenMessageChannelId: (id) =>
    set((state) => {
      state.unseenMessageChannelId.add(id);
      return {
        unseenMessageChannelId: new Set([...state.unseenMessageChannelId])
      };
    }),

  removeUnseenMessageChannelId: (id) =>
    set((state) => {
      state.unseenMessageChannelId.delete(id);
      return {
        unseenMessageChannelId: new Set([...state.unseenMessageChannelId])
      };
    })
}));

export default useChatStore;
