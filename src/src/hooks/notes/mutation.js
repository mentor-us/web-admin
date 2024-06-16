import { useMutation } from "@tanstack/react-query";

import NoteService from "service/noteService";

import { useCreateNoteKey } from "./key";

// eslint-disable-next-line import/prefer-default-export
export const useCreateNoteMutation = () => {
  return useMutation({
    mutationKey: useCreateNoteKey,
    mutationFn: (req) => NoteService.createNote(req)
  });
};
