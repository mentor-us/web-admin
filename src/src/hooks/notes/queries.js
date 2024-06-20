import { useQuery } from "@tanstack/react-query";

import NoteService from "service/noteService";
import { useGetUserNotesKey } from "hooks/profile/key";

// eslint-disable-next-line import/prefer-default-export
export const useGetUserNotes = (req) => {
  return useQuery({
    queryKey: useGetUserNotesKey(req),
    queryFn: () => NoteService.getUserNotes(req)
  });
};
export const useGetUserNoteByUserId = (id) => {
  return useQuery({
    queryKey: ["getUserNoteByUserId", id],
    queryFn: () => NoteService.getUserNoteByUserId(id)
  });
};
