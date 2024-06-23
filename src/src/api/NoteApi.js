import AxiosClient from "./AxiosClient";

const NOTE_URL = "/api/notes";

const NoteApi = {
  getNotes: () => AxiosClient.get(NOTE_URL),
  createNote: (req) => AxiosClient.post(NOTE_URL, req),
  getNoteUserList: (req) => AxiosClient.get(`${NOTE_URL}/users`, { params: req }),
  getNoteUserListById: (id) => AxiosClient.get(`${NOTE_URL}/user/${id}`),
  deleteNoteById: (id) => AxiosClient.delete(`${NOTE_URL}/${id}`),
  shareNoteToUsers: (id, req) => AxiosClient.post(`${NOTE_URL}/${id}/share`, req)
};
export default NoteApi;
