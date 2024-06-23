/* eslint-disable import/namespace */
import NoteApi from "api/NoteApi";

const NoteService = {
  getNotes: () => NoteApi.getNotes(),
  createNote: (req) => NoteApi.createNote(req),
  getUserNotes: (req) => NoteApi.getNoteUserList(req),
  getUserNoteByUserId: (id) => NoteApi.getNoteUserListById(id),
  deleteNote: (id) => NoteApi.deleteNoteById(id),
  shareNoteToUsers: (id, req) => NoteApi.shareNoteToUsers(id, req)
};
export default NoteService;
