/* eslint-disable import/namespace */
import NoteApi from "api/NoteApi";

const NoteService = {
  getNotes: () => NoteApi.getNotes(),
  createNote: (req) => NoteApi.createNote(req),
  getUserNotes: (req) => NoteApi.getNoteUserList(req)
};
export default NoteService;
