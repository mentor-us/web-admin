import { useMutation } from "@tanstack/react-query";

import NoteService from "service/noteService";

import { useCreateNoteKey, useDeleteNoteKey, useShareNoteKey } from "./key";

// eslint-disable-next-line import/prefer-default-export
export const useCreateNoteMutation = () => {
  return useMutation({
    mutationKey: useCreateNoteKey,
    mutationFn: (req) => NoteService.createNote(req)
  });
};
export const useDeleteNoteMutation = () =>
  useMutation({
    mutationKey: useDeleteNoteKey,
    mutationFn: (noteId) => NoteService.deleteNote(noteId)
  });
export const useShareNoteMutation = () =>
  useMutation({
    // eslint-disable-next-line no-undef
    mutationKey: useShareNoteKey(id),
    mutationFn: (id, req) => NoteService.shareNoteToUsers(id, req)
  });
