import { CLEAR_EDITOR_COMMAND, CLEAR_HISTORY_COMMAND } from "lexical";
import { create } from "zustand";

const useChatStore = create((set) => ({
  unseenMessageChannelId: new Set(),
  isReplyMessage: false,
  replyMessage: null,
  isEditMessage: false,
  editMessage: null,
  richTextRef: null,

  setRichTextRef: (ref) => set((state) => ({ ...state, richTextRef: ref })),

  setIsEditMessage: (isEditing) =>
    set((state) => ({
      ...state,
      isEditMessage: isEditing
    })),

  setEditMessage: (editMessage) =>
    set((state) => ({
      ...state,
      editMessage
    })),

  clearEditMessage: () =>
    set((state) => {
      state.richTextRef?.current?.dispatchCommand(CLEAR_EDITOR_COMMAND, undefined);
      state.richTextRef?.current?.dispatchCommand(CLEAR_HISTORY_COMMAND, undefined);

      return { ...state, isEditMessage: false, editMessage: null };
    }),

  setIsReplyMessage: (isReplying) =>
    set((state) => ({
      ...state,
      isReplyMessage: isReplying
    })),

  setReplyMessage: (replyMessage) =>
    set((state) => ({
      ...state,
      replyMessage
    })),

  clearReplyMessage: () =>
    set((state) => ({ ...state, isReplyMessage: false, replyMessage: null })),

  addUnseenMessageChannelId: (id) =>
    set((state) => {
      state.unseenMessageChannelId.add(id);
      return {
        ...state,
        unseenMessageChannelId: new Set([...state.unseenMessageChannelId])
      };
    }),

  removeUnseenMessageChannelId: (id) =>
    set((state) => {
      state.unseenMessageChannelId.delete(id);
      return {
        ...state,
        unseenMessageChannelId: new Set([...state.unseenMessageChannelId])
      };
    })
}));

export default useChatStore;
