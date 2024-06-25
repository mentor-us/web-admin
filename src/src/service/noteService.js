/* eslint-disable import/namespace */
import NoteApi from "api/NoteApi";

const NoteService = {
  getNotes: () => NoteApi.getNotes(),
  createNote: (req) => NoteApi.createNote(req),
  getUserNotes: (req) => NoteApi.getNoteUserList(req),
  getUserNoteByUserId: (id) => NoteApi.getNoteUserListById(id),
  deleteNote: (id) => NoteApi.deleteNoteById(id),
  shareNoteToUsers: (req) => NoteApi.shareNoteToUsers(req),
  getNoteById: (id) => NoteApi.getNoteById(id),
  editNoteById: (req) => NoteApi.editNoteById(req)
};
export default NoteService;
